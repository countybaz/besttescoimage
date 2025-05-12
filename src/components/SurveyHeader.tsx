
import { cn } from "@/lib/utils";

interface SurveyHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SurveyHeader = ({
  title,
  subtitle,
  className
}: SurveyHeaderProps) => {
  return (
    <div className={cn("text-center mb-6 md:mb-8", className)}>
      {title && (
        <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2 leading-tight">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="text-gray-600 text-sm md:text-base mx-auto max-w-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SurveyHeader;
