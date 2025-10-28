// Test file to debug pretest flow
import { pretestService } from './pretest-service'

export async function testPretestFlow() {
  console.log('Starting pretest flow test...')
  
  try {
    // Initialize session
    const session = await pretestService.initializeSession()
    console.log('Session created:', session)
    
    // Test each card response
    const testResponses = [
      { cardNumber: 1, data: { foodLevel: 50, n2oGuess: 'medium' } },
      { cardNumber: 2, data: 'NO3' },
      { cardNumber: 3, data: 'spike' }
    ]
    
    for (const test of testResponses) {
      const standardAnswer = pretestService.mapCardResponseToStandardAnswer(test.cardNumber, test.data)
      console.log(`Card ${test.cardNumber}: ${JSON.stringify(test.data)} -> ${standardAnswer}`)
      
      await pretestService.saveResponse(test.cardNumber, standardAnswer, 2000) // 2 second response time
    }
    
    // Complete session
    await pretestService.completeSession()
    console.log('Session completed!')
    
  } catch (error) {
    console.error('Test failed:', error)
  }
}

// Call this function in browser console: testPretestFlow()
(window as any).testPretestFlow = testPretestFlow