
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import { useSurvey } from "@/contexts/SurveyContext";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import CustomerReviews from "@/components/CustomerReviews";

const StartScreen = () => {
  const { goToNextStep } = useSurvey();
  const isMobile = useIsMobile();
  
  const handleStart = () => {
    goToNextStep();
  };
  
  return (
    <div className="max-w-md mx-auto pb-20 md:pb-0">
      <SurveyHeader 
        title="Great news! You are among the first to join our Tesco Review Program!"
      />
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/8ed959d0-c178-4017-9a6f-7d5948e568fd.png" 
            alt="Tesco Review Program" 
            className="h-24 w-auto" 
            loading="eager"
            fetchPriority="high"
          />
        </div>
        
        <p className="text-center text-lg mb-4">
          Get a <span className="text-primary font-semibold">Tesco gift card</span> with the Tesco Review Program. Simply answer 3 short questions about your shopping habits and this fantastic chance is yours!
        </p>
        
        <p className="text-center mb-6">
          Ready to earn rewards for your feedback? Click on the <span className="text-primary font-semibold">Start</span> button below.
        </p>
        
        {/* Enhanced Limited Time Offer styling */}
        <div className="text-center px-4 py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-lg border-2 border-red-300 mb-4 shadow-lg">
          <p className="text-base text-white font-semibold animate-pulse">
            ⏰ LIMITED TIME OFFER ⏰
          </p>
          <p className="text-sm text-white mt-1">
            You have 3 minutes to complete the process after clicking the button
          </p>
        </div>
      </div>

      <Button 
        onClick={handleStart} 
        className={`w-full bg-blue-500 hover:bg-blue-700 text-lg py-6 shadow-lg border-2 border-blue-700 font-bold fixed bottom-4 left-0 right-0 max-w-xs mx-auto md:static md:max-w-md z-20 ${isMobile ? 'h-16 text-xl' : ''}`}
      >
        START NOW <ArrowRight className="ml-2" />
      </Button>

      {/* Add Customer Reviews */}
      <div className="mt-8">
        <CustomerReviews />
      </div>

      {/* Add some space at the bottom */}
      <div className="h-16 md:h-10"></div>
    </div>
  );
};

export default StartScreen;
