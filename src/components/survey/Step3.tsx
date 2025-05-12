
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import SurveyOption from "@/components/SurveyOption";
import { useSurvey } from "@/contexts/SurveyContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight } from "lucide-react";

const Step3 = () => {
  const { goToNextStep, setAnswer } = useSurvey();
  const [selected, setSelected] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleNext = () => {
    if (selected) {
      setAnswer("feedback_preference", selected);
      goToNextStep();
    }
  };

  return (
    <div className="max-w-md mx-auto pb-20 md:pb-0">
      <SurveyHeader 
        title=""
        subtitle="We're making progress!"
      />
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">What would you like to review about Tesco?</h2>
        <div className="space-y-3">
          <SurveyOption 
            label="Shopping experience" 
            selected={selected === "shopping_experience"} 
            onClick={() => setSelected("shopping_experience")}
          />
          <SurveyOption 
            label="Product quality" 
            selected={selected === "product_quality"} 
            onClick={() => setSelected("product_quality")}
          />
          <SurveyOption 
            label="Customer service" 
            selected={selected === "customer_service"} 
            onClick={() => setSelected("customer_service")}
          />
        </div>
      </div>

      <Button 
        onClick={handleNext} 
        disabled={!selected}
        className={`w-full py-6 text-lg bg-primary hover:bg-red-700 shadow-lg border-2 border-red-700 font-bold fixed bottom-4 left-0 right-0 max-w-xs mx-auto z-20 md:static md:max-w-md ${isMobile ? 'h-16 text-xl' : ''}`}
      >
        Continue <ArrowRight className="ml-1" />
      </Button>
    </div>
  );
};

export default Step3;
