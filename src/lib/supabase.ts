import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface PretestQuestion {
  question_number: number
  question_text: string
  correct_answer: string
  question_type: string
  created_at?: string
  updated_at?: string
}

export interface PretestSession {
  session_id?: string
  user_id: string
  total_questions: number
  correct_answers?: number
  completion_time_seconds?: number
  completed_at?: string
  created_at?: string
  updated_at?: string
}

export interface PretestResponse {
  id?: string
  session_id: string
  user_id: string
  question_number: number
  user_answer: string
  correct_answer: string
  is_correct: boolean
  response_time_seconds?: number
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
      user_id: userId,
      total_questions: 3
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
  userId: string,
  questionNumber: number,
  userAnswer: string,
  correctAnswer: string,
  responseTimeSeconds?: number
): Promise<void> => {
  const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
  
  console.log('Attempting to save response:', {
    sessionId,
    userId,
    questionNumber,
    userAnswer,
    correctAnswer,
    isCorrect,
    responseTimeSeconds
  })

  const { data, error } = await supabase
    .from('pretest_responses')
    .insert({
      session_id: sessionId,
      user_id: userId,
      question_number: questionNumber,
      user_answer: userAnswer,
      correct_answer: correctAnswer,
      is_correct: isCorrect,
      response_time_seconds: responseTimeSeconds
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
  const { error } = await supabase
    .from('pretest_sessions')
    .update({
      completed_at: new Date().toISOString()
    })
    .eq('session_id', sessionId)

  if (error) {
    console.error('Error completing pretest session:', error)
    throw error
  }
}