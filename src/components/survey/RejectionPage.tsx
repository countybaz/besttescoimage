
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import { useSurvey } from "@/contexts/SurveyContext";
import { RefreshCw } from "lucide-react";
import FAQ from "@/components/FAQ";
import { useIsMobile } from "@/hooks/use-mobile";

const RejectionPage = () => {
  const { goToStep } = useSurvey();
  const isMobile = useIsMobile();
  
  const handleTryAgain = () => {
    goToStep(0); // Go to the start screen
  };
  
  const handleLogoClick = () => {
    goToStep(0); // Go to the start screen when logo is clicked
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-center cursor-pointer mb-6" onClick={handleLogoClick}>
        <img 
          src="/lovable-uploads/97c4bef3-f4c4-40cd-83d7-ba4789efbe7e.png" 
          alt="Tesco Review Program Logo" 
          className="h-16 mr-4"
          width="64"
          height="64"
          loading="eager"
          fetchPriority="high"
        />
        <h1 className="text-xl font-bold text-primary">Tesco Review Program</h1>
        <div className="ml-4">
          <FAQ />
        </div>
      </div>
      
      <SurveyHeader 
        title="We're sorry"
        subtitle="Based on your quiz answers, you are not suitable for the requirements of this campaign."
      />
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-center mb-6">
          If you think you made a mistake and want to retake the quiz, click the button below:
        </p>
      </div>

      <Button 
        onClick={handleTryAgain} 
        className={`w-full bg-primary hover:bg-red-700 text-lg py-6 font-bold border-2 border-red-700 shadow-lg ${isMobile ? 'fixed bottom-4 left-0 right-0 max-w-xs mx-auto' : ''} md:static md:max-w-md`}
      >
        Try Again <RefreshCw className="ml-2" size={20} />
      </Button>
      
      {isMobile && <div className="h-24"></div>}
    </div>
  );
};

export default RejectionPage;
