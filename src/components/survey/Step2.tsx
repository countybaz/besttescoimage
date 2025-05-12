
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import SurveyOption from "@/components/SurveyOption";
import { useSurvey } from "@/contexts/SurveyContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight } from "lucide-react";

const Step2 = () => {
  const { goToNextStep, setAnswer } = useSurvey();
  const [selected, setSelected] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleNext = () => {
    if (selected) {
      setAnswer("shopping_frequency", selected);
      goToNextStep();
    }
  };

  return (
    <div className="max-w-md mx-auto pb-20 md:pb-0">
      <SurveyHeader 
        title=""
        subtitle="Just a few more questions to go!"
      />
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">How often do you shop at Tesco?</h2>
        <div className="space-y-3">
          <SurveyOption 
            label="Weekly or more often" 
            selected={selected === "weekly_or_more"} 
            onClick={() => setSelected("weekly_or_more")}
          />
          <SurveyOption 
            label="Monthly" 
            selected={selected === "monthly"} 
            onClick={() => setSelected("monthly")}
          />
          <SurveyOption 
            label="Rarely or never" 
            selected={selected === "rarely"} 
            onClick={() => setSelected("rarely")}
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

export default Step2;
