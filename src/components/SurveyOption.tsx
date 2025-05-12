
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface SurveyOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

const SurveyOption = ({ label, selected, onClick, className }: SurveyOptionProps) => {
  return (
    <Button
      type="button"
      variant={selected ? "default" : "outline"}
      className={cn(
        "w-full p-4 h-auto justify-between text-left flex items-center gap-4 transition-all",
        selected ? "border-2 border-primary bg-red-50 text-red-800 shadow-sm" : "border border-gray-200",
        className
      )}
      onClick={onClick}
    >
      <span className="font-medium text-base">{label}</span>
      {selected && <Check className="h-5 w-5 text-primary" />}
    </Button>
  );
};

export default SurveyOption;
