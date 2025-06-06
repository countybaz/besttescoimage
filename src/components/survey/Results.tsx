
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

// Define gift card image path - using the newly uploaded Tesco gift card image
const GIFT_CARD_IMAGE = "/lovable-uploads/3019587c-e2fe-46b3-a753-6dc64e3fea79.png";

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
            {/* Tesco Gift Card Image - Updated with new image */}
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
                      fetchPriority="high"
                      width="280"
                      height="158"
                      decoding="async"
                    />
                  )}
                </AspectRatio>
              </div>
            </div>
            
            {/* Reduced emphasis on promotional box to make the button stand out more */}
            <div className="text-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-400 rounded-lg border border-red-300 shadow-md">
              <p className="text-white font-medium text-sm">
                Share your thoughts and get rewarded!
              </p>
              <p className="text-white font-bold text-base mt-1">
                Claim your Tesco gift card today!
              </p>
              <div className="mt-2 inline-block bg-white px-3 py-1 rounded-full text-xs text-red-600 font-bold border border-red-300 shadow-sm animate-pulse">
                ⏰ LIMITED TIME OFFER ⏰
              </div>
            </div>
          </div>
          
          {/* Process Steps with slightly reduced emphasis */}
          <div className="my-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <span className="bg-primary text-white rounded-full w-5 h-5 inline-flex items-center justify-center text-xs mr-2">?</span>
              How it works:
            </h3>
            <ol className="text-xs text-gray-600 space-y-2 pl-5 list-decimal">
              <li><span className="font-medium">Confirm your delivery details:</span> Confirm where the exclusive Tesco gift card should be delivered. Answer our sponsored questions and provide your delivery address.</li>
              <li><span className="font-medium">Unlock your DOUBLE reward:</span> Complete our sponsored deals. Each deal that you complete will increase your reward.</li>
              <li><span className="font-medium">Prepare for the reveal:</span> Your gift card will be delivered to your home. Delivery is guaranteed within 5 days after the completion of the process.</li>
              <li><span className="font-medium">Don't forget</span> to confirm your participation by email.</li>
            </ol>
          </div>
          
          {/* Enhanced CTA button to make it stand out more - Changed to green */}
          <div className="mb-3">
            <a 
              href="https://www.tapplink.co/21468/1076/image" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full"
            >
              <Button 
                className={`w-full bg-green-500 hover:bg-green-700 py-6 text-lg font-bold border-2 border-green-700 shadow-lg z-20 ${isMobile ? 'h-16 text-xl fixed bottom-4 left-0 right-0 max-w-xs mx-auto' : 'static max-w-md'} animate-pulse`}
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
