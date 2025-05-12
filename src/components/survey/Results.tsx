
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSurvey } from "@/contexts/SurveyContext";
import ProductOffer from "@/components/ProductOffer";
import SurveyHeader from "@/components/SurveyHeader";
import { useToast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

// Define gift card image path - using the new Tesco logo
const GIFT_CARD_IMAGE = "/lovable-uploads/97c4bef3-f4c4-40cd-83d7-ba4789efbe7e.png";

const Results = () => {
  const { toast } = useToast();
  const [showingOffer, setShowingOffer] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();

  // Immediately start loading the image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = GIFT_CARD_IMAGE;
    
    // Ultra-fast timeout for immediate display even if image is still loading
    const timeout = setTimeout(() => {
      setImageLoaded(true);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, []);

  const handleClaim = () => {
    toast({
      title: "Offer Claimed!",
      description: "Thank you! Check your email for next steps.",
      duration: 5000,
    });
  };

  return (
    <div className="max-w-md mx-auto px-4">
      {!showingOffer ? (
        <>
          <SurveyHeader 
            title="Congratulations!" 
            subtitle="Fantastic news! Your participation is confirmed. Continue to the next step to receive your Tesco gift card:"
            className="mb-4"
          />
          
          <div className="mb-4 space-y-3">
            {/* Tesco Gift Card Image */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex justify-center">
              <div className="w-[280px]">
                <AspectRatio ratio={16/9}>
                  {!imageLoaded ? (
                    <Skeleton className="w-full h-full rounded-md" />
                  ) : (
                    <img 
                      src={GIFT_CARD_IMAGE}
                      alt="Tesco Gift Card" 
                      className="rounded-md object-contain w-full h-full" 
                      loading="eager"
                      width="280"
                      height="158"
                    />
                  )}
                </AspectRatio>
              </div>
            </div>
            
            {/* Red promotional text */}
            <div className="text-center px-3 py-2 bg-red-50 rounded-lg border border-red-100">
              <p className="text-primary font-medium text-sm">
                Share your thoughts and get rewarded! Claim your Tesco gift card today!
              </p>
            </div>
          </div>
          
          {/* Process Steps */}
          <div className="my-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">How it works:</h3>
            <ol className="text-xs text-gray-600 space-y-2 pl-5 list-decimal">
              <li><span className="font-medium">Confirm your delivery details:</span> Confirm where the exclusive Tesco gift card should be delivered. Answer our sponsored questions and provide your delivery address.</li>
              <li><span className="font-medium">Unlock your DOUBLE reward:</span> Complete our sponsored deals. Each deal that you complete will increase your reward.</li>
              <li><span className="font-medium">Prepare for the reveal:</span> Your gift card will be delivered to your home. Delivery is guaranteed within 5 days after the completion of the process.</li>
              <li><span className="font-medium">Don't forget</span> to confirm your participation by email.</li>
            </ol>
          </div>
          
          {/* Fixed CTA button for mobile */}
          <div>
            <a 
              href="https://www.tapplink.co/21468/1084/image" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full"
            >
              <Button 
                className={`w-full bg-primary hover:bg-red-700 py-6 text-lg font-bold border-2 border-red-700 shadow-lg fixed bottom-4 left-0 right-0 max-w-xs mx-auto z-20 md:static md:max-w-md ${isMobile ? 'h-16 text-xl' : ''}`}
              >
                CLAIM NOW <ArrowRight className="ml-2" />
              </Button>
            </a>
          </div>
          
          <p className="text-sm text-center text-gray-500 mt-4 pb-16">
            Limited time offer. Your reward is reserved for the time shown in the timer.
          </p>
        </>
      ) : (
        <ProductOffer onClaim={handleClaim} />
      )}
    </div>
  );
};

export default Results;
