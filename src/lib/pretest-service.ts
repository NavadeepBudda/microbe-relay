import { 
  generateUserId, 
  createPretestSession, 
  savePretestResponse, 
  completePretestSession,
  getPretestQuestions,
  PretestQuestion
} from './supabase'

export interface PretestSessionData {
  sessionId: string
  userId: string
  startTime: Date
  responses: Map<number, PretestResponseData>
}

export interface PretestResponseData {
  questionNumber: number
  userAnswer: string
  correctAnswer: string
  responseTime: number
  timestamp: Date
}

class PretestService {
  private session: PretestSessionData | null = null
  private questions: PretestQuestion[] = []

  async initializeSession(): Promise<PretestSessionData> {
    try {
      // Load questions from database
      this.questions = await getPretestQuestions()
      
      // Generate session data
      const userId = generateUserId()
      const sessionId = await createPretestSession(userId)
      
      this.session = {
        sessionId,
        userId,
        startTime: new Date(),
        responses: new Map()
      }

      console.log('Pretest session initialized:', { sessionId, userId })
      return this.session
    } catch (error) {
      console.error('Failed to initialize pretest session:', error)
      throw error
    }
  }

  async saveResponse(questionNumber: number, userAnswer: string, responseTimeMs: number): Promise<void> {
    if (!this.session) {
      throw new Error('No active pretest session')
    }

    try {
      // Find the correct answer from our questions
      const question = this.questions.find(q => q.question_number === questionNumber)
      if (!question) {
        throw new Error(`Question ${questionNumber} not found`)
      }

      const correctAnswer = question.correct_answer
      const responseTimeSeconds = Math.round(responseTimeMs / 1000)

      // Save to database
      await savePretestResponse(
        this.session.sessionId,
        this.session.userId,
        questionNumber,
        userAnswer,
        correctAnswer,
        responseTimeSeconds
      )

      // Store locally for session management
      const responseData: PretestResponseData = {
        questionNumber,
        userAnswer,
        correctAnswer,
        responseTime: responseTimeSeconds,
        timestamp: new Date()
      }
      
      this.session.responses.set(questionNumber, responseData)

      console.log('Pretest response saved:', { questionNumber, userAnswer, responseTimeSeconds })
    } catch (error) {
      console.error('Failed to save pretest response:', error)
      throw error
    }
  }

  async completeSession(): Promise<void> {
    if (!this.session) {
      throw new Error('No active pretest session')
    }

    try {
      await completePretestSession(this.session.sessionId)
      console.log('Pretest session completed:', this.session.sessionId)
    } catch (error) {
      console.error('Failed to complete pretest session:', error)
      throw error
    }
  }

  getCurrentSession(): PretestSessionData | null {
    return this.session
  }

  getQuestions(): PretestQuestion[] {
    return this.questions
  }

  // Map the card responses to question numbers and standardize answers
  mapCardResponseToStandardAnswer(cardNumber: number, cardData: any): string {
    console.log('Mapping card response:', { cardNumber, cardData })
    
    switch (cardNumber) {
      case 1:
        // Card 1: N2O Response - extract the N2O guess
        const data1 = typeof cardData === 'string' ? JSON.parse(cardData) : cardData
        const answer1 = data1.n2oGuess || data1.response
        console.log('Card 1 answer:', answer1)
        // Capitalize first letter to match database format
        return answer1.charAt(0).toUpperCase() + answer1.slice(1).toLowerCase()
      
      case 2:
        // Card 2: Pathway Dominance - convert step ID to number
        const stepMapping: Record<string, string> = {
          'NO3': '1',
          'NO2': '2', 
          'N2O': '3',
          'N2': '4'
        }
        const answer2 = stepMapping[cardData] || cardData
        console.log('Card 2 answer:', answer2)
        return answer2
      
      case 3:
        // Card 3: Pulse Response - convert choice ID to full text
        const pulseMapping: Record<string, string> = {
          'spike': 'Spikes briefly',
          'same': 'Stays the same',
          'drop': 'Drops temporarily'
        }
        const answer3 = pulseMapping[cardData] || cardData
        console.log('Card 3 answer:', answer3)
        return answer3
      
      default:
        return String(cardData)
    }
  }
}

// Export singleton instance
export const pretestService = new PretestService()