
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
    // Handle progress animation
    const progressInterval = setInterval(() => {
      setProgressValue(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    // Handle check animations with each tick appearing only after the previous one
    const savedTimer = setTimeout(() => setChecks(prev => ({ ...prev, saved: true })), 1500);
    const eligibleTimer = setTimeout(() => setChecks(prev => ({ ...prev, eligible: true })), 4000);
    const rewardsTimer = setTimeout(() => setChecks(prev => ({ ...prev, rewards: true })), 6500);

    // Set processing to false after all checks complete
    const completeTimer = setTimeout(() => {
      setIsProcessing(false);
    }, 7500);

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
          <div className={`w-6 h-6 rounded-full mt-1 mr-3 flex items-center justify-center ${checks.saved ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.saved && <Check className="h-4 w-4" />}
          </div>
          <div>
            <p className="text-lg font-bold">Sending answers..</p>
            <p className="text-gray-600">Securely transmitting your answers</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className={`w-6 h-6 rounded-full mt-1 mr-3 flex items-center justify-center ${checks.eligible ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.eligible && <Check className="h-4 w-4" />}
          </div>
          <div>
            <p className="text-lg font-bold">Verifying eligibility..</p>
            <p className="text-gray-600">Checking your answers against our criteria</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className={`w-6 h-6 rounded-full mt-1 mr-3 flex items-center justify-center ${checks.rewards ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.rewards && <Check className="h-4 w-4" />}
          </div>
          <div>
            <p className="text-lg font-bold">Almost there!</p>
            <p className="text-gray-600">only 12 gift cards available</p>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Processing</span>
          <span className="text-sm font-medium">{progressValue}%</span>
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-2 mb-6">
        {isProcessing ? "Please wait while we process your information..." : "Processing complete!"}
      </p>

      {/* Add a continue button that's clearly visible */}
      <Button 
        onClick={goToNextStep} 
        className={`w-full py-5 text-lg bg-green-600 hover:bg-green-700 shadow-lg transition-opacity ${isProcessing ? 'opacity-0' : 'opacity-100'} ${isMobile ? 'fixed bottom-4 left-0 right-0 max-w-xs mx-auto z-20' : ''}`}
        disabled={isProcessing}
      >
        Continue to Your Reward
      </Button>
    </div>
  );
};

export default Step5;
