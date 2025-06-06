
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import { useSurvey } from "@/contexts/SurveyContext";
import { Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Progress } from "@/components/ui/progress";

const Step5 = () => {
  const { goToNextStep } = useSurvey();
  const [checks, setChecks] = useState({
    saved: false,
    eligible: false,
    rewards: false,
  });
  const [progressValue, setProgressValue] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Define timing for each check to appear
    const savedCheckTime = 1500; // 1.5 seconds
    const eligibleCheckTime = 4000; // 4 seconds
    const rewardsCheckTime = 6500; // 6.5 seconds
    const completionTime = 7500; // 7.5 seconds
    
    // Progress update interval
    const progressUpdateInterval = 50; // 50ms
    const totalSteps = completionTime / progressUpdateInterval;
    const incrementPerStep = 100 / totalSteps;
    
    // Start progress animation
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress = Math.min(currentProgress + incrementPerStep, 100);
      setProgressValue(Math.floor(currentProgress));
    }, progressUpdateInterval);

    // Handle check animations sequentially
    const savedTimer = setTimeout(() => {
      setChecks(prev => ({ ...prev, saved: true }));
    }, savedCheckTime);
    
    const eligibleTimer = setTimeout(() => {
      setChecks(prev => ({ ...prev, eligible: true }));
    }, eligibleCheckTime);
    
    const rewardsTimer = setTimeout(() => {
      setChecks(prev => ({ ...prev, rewards: true }));
    }, rewardsCheckTime);

    // Set processing to false after all checks complete
    const completeTimer = setTimeout(() => {
      setIsProcessing(false);
      setProgressValue(100);
      clearInterval(progressInterval);
    }, completionTime);

    // Auto-progress after a longer delay to ensure button is visible
    const autoProgress = setTimeout(() => {
      goToNextStep();
    }, 9500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(savedTimer);
      clearTimeout(eligibleTimer);
      clearTimeout(rewardsTimer);
      clearTimeout(completeTimer);
      clearTimeout(autoProgress);
    };
  }, [goToNextStep]);

  return (
    <div className="max-w-md mx-auto">
      <SurveyHeader 
        title="Processing Results" 
        subtitle="Please wait while we analyze your responses."
      />
      
      <div className="space-y-6 mb-8 mt-6">
        <div className="flex items-start">
          <div className={`w-6 h-6 rounded-full mt-1 mr-3 flex items-center justify-center transition-colors duration-300 ${checks.saved ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.saved && <Check className="h-4 w-4" />}
          </div>
          <div>
            <p className={`text-lg font-bold transition-opacity duration-300 ${checks.saved ? 'opacity-100' : 'opacity-0'}`}>Sending answers..</p>
            <p className={`text-gray-600 transition-opacity duration-300 ${checks.saved ? 'opacity-100' : 'opacity-0'}`}>Securely transmitting your answers</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className={`w-6 h-6 rounded-full mt-1 mr-3 flex items-center justify-center transition-colors duration-300 ${checks.eligible ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.eligible && <Check className="h-4 w-4" />}
          </div>
          <div>
            <p className={`text-lg font-bold transition-opacity duration-300 ${checks.eligible ? 'opacity-100' : 'opacity-0'}`}>Verifying eligibility..</p>
            <p className={`text-gray-600 transition-opacity duration-300 ${checks.eligible ? 'opacity-100' : 'opacity-0'}`}>Checking your answers against our criteria</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className={`w-6 h-6 rounded-full mt-1 mr-3 flex items-center justify-center transition-colors duration-300 ${checks.rewards ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.rewards && <Check className="h-4 w-4" />}
          </div>
          <div>
            <p className={`text-lg font-bold transition-opacity duration-300 ${checks.rewards ? 'opacity-100' : 'opacity-0'}`}>Almost there!</p>
            <p className={`text-gray-600 transition-opacity duration-300 ${checks.rewards ? 'opacity-100' : 'opacity-0'}`}>only 12 gift cards available</p>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Processing</span>
          <span className="text-sm font-medium">{progressValue}%</span>
        </div>
        <Progress value={progressValue} className="h-2 bg-gray-200">
          <div className="h-full bg-primary" style={{ width: `${progressValue}%` }}></div>
        </Progress>
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-2 mb-6">
        {isProcessing ? "Please wait while we process your information..." : "Processing complete!"}
      </p>

      <Button 
        onClick={goToNextStep} 
        className={`w-full py-5 text-lg bg-green-600 hover:bg-green-700 shadow-lg transition-opacity duration-300 ${isProcessing ? 'opacity-0' : 'opacity-100'} ${isMobile ? 'fixed bottom-4 left-0 right-0 max-w-xs mx-auto z-20' : ''}`}
        disabled={isProcessing}
      >
        Continue to Your Reward
      </Button>
    </div>
  );
};

export default Step5;
