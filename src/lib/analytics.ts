// Simple analytics for tracking student learning progress

interface AnalyticsEvent {
  event: string;
  data?: Record<string, any>;
  timestamp: Date;
}

// Simple console-based analytics for development/testing
// In production, this could send to a real analytics service
export const trackEvent = (event: string, data?: Record<string, any>) => {
  const analyticsEvent: AnalyticsEvent = {
    event,
    data,
    timestamp: new Date()
  };
  
  // For now, just log to console with clear formatting
  console.log(`📊 [Analytics] ${event}`, data || '');
  
  // In a real implementation, you might:
  // - Send to Google Analytics
  // - Send to a custom learning analytics API  
  // - Store in local storage for offline-first analytics
  // - Send to learning management system (LMS)
};

// Pre-defined analytics events for the Meet the Relay page
export const analytics = {
  // Page events
  pageOpen: () => trackEvent('meet-the-relay:page-open'),
  
  // Food level interactions  
  foodLevelChange: (level: number, band: string) => 
    trackEvent('meet-the-relay:food-level-change', { level, band }),
    
  // Band discovery events
  bandEntered: (bandName: string) => 
    trackEvent('meet-the-relay:band-entered', { band: bandName }),
    
  // Learning milestone events
  exploredBothExtremes: () => 
    trackEvent('meet-the-relay:explored-both-extremes'),
    
  // Onboarding events
  onboardingStarted: () => 
    trackEvent('meet-the-relay:onboarding-started'),
    
  onboardingCompleted: () => 
    trackEvent('meet-the-relay:onboarding-completed'),
    
  onboardingSkipped: () => 
    trackEvent('meet-the-relay:onboarding-skipped'),
    
  // Interaction events
  sliderInteraction: (value: number) => 
    trackEvent('meet-the-relay:slider-interaction', { value })
};