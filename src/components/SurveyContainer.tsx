
import { useEffect } from "react";
import { useSurvey } from "@/contexts/SurveyContext";
import SurveyProgress from "@/components/SurveyProgress";
import StartScreen from "@/components/survey/StartScreen";
import Step1 from "@/components/survey/Step1";
import Step2 from "@/components/survey/Step2";
import Step3 from "@/components/survey/Step3";
import Step5 from "@/components/survey/Step5";
import Results from "@/components/survey/Results";
import RejectionPage from "@/components/survey/RejectionPage";
import Timer from "@/components/Timer";
import CustomerReviews from "@/components/CustomerReviews";
import { useIsMobile } from "@/hooks/use-mobile";

const SurveyContainer = () => {
  const { currentStep, totalSteps, goToNextStep } = useSurvey();
  const isMobile = useIsMobile();

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-8">
      {/* Timer only visible during active survey steps (not on start screen) */}
      {currentStep > 0 && currentStep < totalSteps && <Timer minutes={3} />}
      
      {/* Progress bar only shown during active survey steps */}
      {currentStep > 0 && currentStep < totalSteps && (
        <SurveyProgress currentStep={currentStep} totalSteps={totalSteps - 1} />
      )}
      
      {/* Survey steps */}
      {currentStep === 0 && <StartScreen />}
      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step3 />}
      {currentStep === 4 && <Step5 />}
      {currentStep === 5 && <Results />}
      {currentStep === 6 && <RejectionPage />}
      
      {/* Customer Reviews - shown in all steps except start screen and rejection page */}
      {currentStep !== 0 && currentStep !== 6 && <CustomerReviews />}
      
      {/* Add padding at the bottom for mobile fixed buttons */}
      {isMobile && <div className="h-24"></div>}
    </div>
  );
};

export default SurveyContainer;
