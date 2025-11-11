import { 
  generateUserId, 
  createPosttestSession, 
  savePosttestResponse, 
  completePosttestSession,
  getPosttestQuestions,
  PosttestQuestion
} from './supabase'

export interface PosttestSessionData {
  sessionId: string
  userId: string
  startTime: Date
  responses: Map<number, PosttestResponseData>
}

export interface PosttestResponseData {
  questionNumber: number
  userAnswer: string
  timestamp: Date
}

class PosttestService {
  private session: PosttestSessionData | null = null
  private questions: PosttestQuestion[] = []

  async initializeSession(existingUserId?: string): Promise<PosttestSessionData> {
    try {
      // Load questions from database
      this.questions = await getPosttestQuestions()
      
      // Use existing user ID if provided (to link with pretest), otherwise generate new one
      const userId = existingUserId || generateUserId()
      const sessionId = await createPosttestSession(userId)
      
      this.session = {
        sessionId,
        userId,
        startTime: new Date(),
        responses: new Map()
      }

      console.log('Posttest session initialized:', { sessionId, userId })
      return this.session
    } catch (error) {
      console.error('Failed to initialize posttest session:', error)
      throw error
    }
  }

  async saveResponse(questionNumber: number, userAnswer: string): Promise<void> {
    if (!this.session) {
      throw new Error('No active posttest session')
    }

    try {
      // Save to database
      await savePosttestResponse(
        this.session.sessionId,
        questionNumber,
        userAnswer
      )

      // Store locally for session management
      const responseData: PosttestResponseData = {
        questionNumber,
        userAnswer,
        timestamp: new Date()
      }
      
      this.session.responses.set(questionNumber, responseData)

      console.log('Posttest response saved:', { questionNumber, userAnswer })
    } catch (error) {
      console.error('Failed to save posttest response:', error)
      throw error
    }
  }

  async completeSession(): Promise<void> {
    if (!this.session) {
      throw new Error('No active posttest session')
    }

    try {
      await completePosttestSession(this.session.sessionId)
      console.log('Posttest session completed:', this.session.sessionId)
    } catch (error) {
      console.error('Failed to complete posttest session:', error)
      throw error
    }
  }

  getCurrentSession(): PosttestSessionData | null {
    return this.session
  }

  getQuestions(): PosttestQuestion[] {
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
        // Card 2: Pathway Dominance - map step selections to numbers
        const stepMapping: Record<string, string> = {
          'step1': '1',              // Step 1: NO₃⁻ to NO₂⁻
          'step1and2': '2',          // Steps 1&2: NO₃⁻ to N₂O  
          'step1and2and3': '3',      // Steps 1&2&3: NO₃⁻ to N₂
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
export const posttestService = new PosttestService()