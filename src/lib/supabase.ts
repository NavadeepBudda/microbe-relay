import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jtlhdsumkzmclphdacap.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0bGhkc3Vta3ptY2xwaGRhY2FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MTk3NDEsImV4cCI6MjA3NzE5NTc0MX0.EqpahJH2m2de4OuAOlg6MwmPQtqKY8DqjseQZJw4XfE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface PretestQuestion {
  question_number: number
  question_text: string
  correct_answer: string
  question_type: string
  options?: string[]
  instructions?: string
  context?: string
  created_at?: string
}

export interface PretestSession {
  session_id?: string
  user_id: string
  correct_answers?: number
  completion_time_seconds?: number
  completed_at?: string
  created_at?: string
}

export interface PretestResponse {
  id?: string
  session_id: string
  question_number: number
  user_answer: string
  is_correct: boolean
  created_at?: string
}

// Types for posttest database
export interface PosttestQuestion {
  question_number: number
  question_text: string
  correct_answer: string
  question_type: string
  options?: string[]
  instructions?: string
  context?: string
  created_at?: string
}

export interface PosttestSession {
  session_id?: string
  user_id: string
  correct_answers?: number
  completion_time_seconds?: number
  completed_at?: string
  created_at?: string
}

export interface PosttestResponse {
  id?: string
  session_id: string
  question_number: number
  user_answer: string
  is_correct: boolean
  created_at?: string
}

export interface AssessmentComparison {
  id?: string
  user_id: string
  pretest_session_id: string
  posttest_session_id: string
  pre_score: number
  post_score: number
  improvement_points: number
  created_at?: string
}

// Generate a unique user ID for this session
export const generateUserId = (): string => {
  return crypto.randomUUID()
}

// Get all pretest questions
export const getPretestQuestions = async (): Promise<PretestQuestion[]> => {
  const { data, error } = await supabase
    .from('pretest_questions')
    .select('*')
    .order('question_number')

  if (error) {
    console.error('Error fetching pretest questions:', error)
    throw error
  }

  return data || []
}

// Create a new pretest session
export const createPretestSession = async (userId: string): Promise<string> => {
  const { data, error } = await supabase
    .from('pretest_sessions')
    .insert({
      user_id: userId
    })
    .select('session_id')
    .single()

  if (error) {
    console.error('Error creating pretest session:', error)
    throw error
  }

  return data.session_id
}

// Save a pretest response
export const savePretestResponse = async (
  sessionId: string,
  questionNumber: number,
  userAnswer: string
): Promise<void> => {
  // Get correct answer from questions table
  const { data: questionData, error: questionError } = await supabase
    .from('pretest_questions')
    .select('correct_answer')
    .eq('question_number', questionNumber)
    .single()

  if (questionError) {
    console.error('Error fetching correct answer:', questionError)
    throw questionError
  }

  const correctAnswer = questionData.correct_answer
  const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
  
  console.log('Attempting to save response:', {
    sessionId,
    questionNumber,
    userAnswer,
    correctAnswer,
    isCorrect
  })

  const { data, error } = await supabase
    .from('pretest_responses')
    .insert({
      session_id: sessionId,
      question_number: questionNumber,
      user_answer: userAnswer,
      is_correct: isCorrect
    })
    .select()

  if (error) {
    console.error('Error saving pretest response:', error)
    throw error
  }
  
  console.log('Response saved successfully:', data)
}

// Complete a pretest session (called when all questions are answered)
export const completePretestSession = async (sessionId: string): Promise<void> => {
  // Add small delay to ensure all responses are committed
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // Calculate correct answers count
  const { data: responses, error: responseError } = await supabase
    .from('pretest_responses')
    .select('is_correct')
    .eq('session_id', sessionId)

  if (responseError) {
    console.error('Error fetching responses for completion:', responseError)
    throw responseError
  }

  const correctCount = responses?.filter(r => r.is_correct).length || 0
  console.log(`Pretest completion: ${correctCount}/${responses?.length} correct responses`)

  const { error } = await supabase
    .from('pretest_sessions')
    .update({
      completed_at: new Date().toISOString(),
      correct_answers: correctCount
    })
    .eq('session_id', sessionId)

  if (error) {
    console.error('Error completing pretest session:', error)
    throw error
  }
}

// POSTTEST FUNCTIONS

// Get all posttest questions
export const getPosttestQuestions = async (): Promise<PosttestQuestion[]> => {
  const { data, error } = await supabase
    .from('posttest_questions')
    .select('*')
    .order('question_number')

  if (error) {
    console.error('Error fetching posttest questions:', error)
    throw error
  }

  return data || []
}

// Create a new posttest session
export const createPosttestSession = async (userId: string): Promise<string> => {
  const { data, error } = await supabase
    .from('posttest_sessions')
    .insert({
      user_id: userId
    })
    .select('session_id')
    .single()

  if (error) {
    console.error('Error creating posttest session:', error)
    throw error
  }

  return data.session_id
}

// Save a posttest response
export const savePosttestResponse = async (
  sessionId: string,
  questionNumber: number,
  userAnswer: string
): Promise<void> => {
  // Get correct answer from questions table
  const { data: questionData, error: questionError } = await supabase
    .from('posttest_questions')
    .select('correct_answer')
    .eq('question_number', questionNumber)
    .single()

  if (questionError) {
    console.error('Error fetching correct answer:', questionError)
    throw questionError
  }

  const correctAnswer = questionData.correct_answer
  const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
  
  console.log('Attempting to save posttest response:', {
    sessionId,
    questionNumber,
    userAnswer,
    correctAnswer,
    isCorrect
  })

  const { data, error } = await supabase
    .from('posttest_responses')
    .insert({
      session_id: sessionId,
      question_number: questionNumber,
      user_answer: userAnswer,
      is_correct: isCorrect
    })
    .select()

  if (error) {
    console.error('Error saving posttest response:', error)
    throw error
  }
  
  console.log('Posttest response saved successfully:', data)
}

// Complete a posttest session (called when all questions are answered)
export const completePosttestSession = async (sessionId: string): Promise<void> => {
  // Add small delay to ensure all responses are committed
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // Calculate correct answers count
  const { data: responses, error: responseError } = await supabase
    .from('posttest_responses')
    .select('is_correct')
    .eq('session_id', sessionId)

  if (responseError) {
    console.error('Error fetching responses for completion:', responseError)
    throw responseError
  }

  const correctCount = responses?.filter(r => r.is_correct).length || 0
  console.log(`Posttest completion: ${correctCount}/${responses?.length} correct responses`)

  const { error } = await supabase
    .from('posttest_sessions')
    .update({
      completed_at: new Date().toISOString(),
      correct_answers: correctCount
    })
    .eq('session_id', sessionId)

  if (error) {
    console.error('Error completing posttest session:', error)
    throw error
  }
}

