import { supabase } from './supabase'
import type {
  PretestResponse,
  PosttestResponse,
  AssessmentComparison
} from './supabase'

export interface QuestionComparison {
  questionNumber: number
  questionText: string
  preAnswer: string
  postAnswer: string
  correctAnswer: string
  wasCorrectPre: boolean
  wasCorrectPost: boolean
  status: 'mastered' | 'improved' | 'needs-review'
  explanation: string
  tip: string
}

export interface UserComparisonData {
  userId: string
  preScore: number
  postScore: number
  improvement: number
  totalQuestions: number
  questions: QuestionComparison[]
  completedAt: string
  preSessionId: string
  postSessionId: string
}

class ComparisonService {

  async findUsersPretestSession(userId: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('pretest_sessions')
        .select('session_id, completed_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)

      if (error || !data || data.length === 0) {
        console.log('No pretest session found for user:', userId)
        return null
      }

      // Return the most recent session (completed or not)
      return data[0].session_id
    } catch (error) {
      console.error('Error finding pretest session:', error)
      return null
    }
  }

  async createAssessmentComparison(
    userId: string,
    pretestSessionId: string,
    posttestSessionId: string
  ): Promise<void> {
    try {
      // Get session data with scores
      const { data: pretestSession, error: pretestError } = await supabase
        .from('pretest_sessions')
        .select('correct_answers')
        .eq('session_id', pretestSessionId)
        .single()

      if (pretestError || !pretestSession) {
        throw new Error('Failed to fetch pretest session')
      }

      const { data: posttestSession, error: posttestError } = await supabase
        .from('posttest_sessions')
        .select('correct_answers')
        .eq('session_id', posttestSessionId)
        .single()

      if (posttestError || !posttestSession) {
        throw new Error('Failed to fetch posttest session')
      }

      // Calculate scores from session totals
      const totalQuestions = 3
      const preScore = ((pretestSession.correct_answers || 0) / totalQuestions) * 100
      const postScore = ((posttestSession.correct_answers || 0) / totalQuestions) * 100
      const improvement = postScore - preScore

      // Save comparison
      const { error: comparisonError } = await supabase
        .from('assessment_comparisons')
        .insert({
          user_id: userId,
          pretest_session_id: pretestSessionId,
          posttest_session_id: posttestSessionId,
          pre_score: preScore,
          post_score: postScore,
          improvement_points: improvement
        })

      if (comparisonError) {
        throw new Error('Failed to save assessment comparison')
      }

      console.log('Assessment comparison created successfully')
    } catch (error) {
      console.error('Error creating assessment comparison:', error)
      throw error
    }
  }

  async getUserComparison(userId: string): Promise<UserComparisonData | null> {
    try {
      // Get the comparison record
      const { data: comparison, error: comparisonError } = await supabase
        .from('assessment_comparisons')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (comparisonError || !comparison) {
        console.log('No assessment comparison found for user:', userId)
        return null
      }

      // Get pretest responses
      const { data: pretestResponses, error: pretestError } = await supabase
        .from('pretest_responses')
        .select('*')
        .eq('session_id', comparison.pretest_session_id)
        .order('question_number')

      if (pretestError || !pretestResponses) {
        throw new Error('Failed to fetch pretest responses')
      }

      // Get posttest responses
      const { data: posttestResponses, error: posttestError } = await supabase
        .from('posttest_responses')
        .select('*')
        .eq('session_id', comparison.posttest_session_id)
        .order('question_number')

      if (posttestError || !posttestResponses) {
        throw new Error('Failed to fetch posttest responses')
      }

      // Get questions and metadata
      const { data: questions, error: questionsError } = await supabase
        .from('posttest_questions')
        .select('*')
        .order('question_number')

      if (questionsError || !questions) {
        throw new Error('Failed to fetch questions')
      }

      // Metadata is now consolidated in the questions table

      // Build question comparisons
      const questionComparisons: QuestionComparison[] = questions.map(question => {
        const preResponse = pretestResponses.find(r => r.question_number === question.question_number)
        const postResponse = posttestResponses.find(r => r.question_number === question.question_number)

        // Extract metadata from question's consolidated fields
        const explanation = question.context || 'Great work on this question! You\'re mastering the microbe relay concept.'
        const tip = question.instructions || 'Keep practicing to master this concept.'

        const wasCorrectPre = preResponse?.is_correct || false
        const wasCorrectPost = postResponse?.is_correct || false

        let status: 'mastered' | 'improved' | 'needs-review'
        if (wasCorrectPost) {
          status = wasCorrectPre ? 'mastered' : 'improved'
        } else {
          status = 'needs-review'
        }

        return {
          questionNumber: question.question_number,
          questionText: question.question_text,
          preAnswer: preResponse?.user_answer || '',
          postAnswer: postResponse?.user_answer || '',
          correctAnswer: question.correct_answer,
          wasCorrectPre,
          wasCorrectPost,
          status,
          explanation,
          tip
        }
      })

      // Get completion time from posttest session
      const { data: posttestSession } = await supabase
        .from('posttest_sessions')
        .select('completed_at')
        .eq('session_id', comparison.posttest_session_id)
        .single()

      return {
        userId,
        preScore: comparison.pre_score,
        postScore: comparison.post_score,
        improvement: comparison.improvement_points,
        totalQuestions: questions.length,
        questions: questionComparisons,
        completedAt: posttestSession?.completed_at || new Date().toISOString(),
        preSessionId: comparison.pretest_session_id,
        postSessionId: comparison.posttest_session_id
      }

    } catch (error) {
      console.error('Error getting user comparison:', error)
      throw error
    }
  }

  async getOrCreateUserComparison(
    userId: string,
    posttestSessionId: string
  ): Promise<UserComparisonData | null> {
    try {
      // First try to get existing comparison
      let comparison = await this.getUserComparison(userId)

      if (!comparison) {
        // Find pretest session for this user
        const pretestSessionId = await this.findUsersPretestSession(userId)

        if (!pretestSessionId) {
          console.error('No pretest session found for user to create comparison')
          return null
        }

        // Create the comparison
        await this.createAssessmentComparison(userId, pretestSessionId, posttestSessionId)

        // Fetch the newly created comparison
        comparison = await this.getUserComparison(userId)
      }

      return comparison
    } catch (error) {
      console.error('Error in getOrCreateUserComparison:', error)
      return null
    }
  }
}

export const comparisonService = new ComparisonService()