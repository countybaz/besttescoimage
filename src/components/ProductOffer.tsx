
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductOfferProps {
  onClaim: () => void;
}

// Define new gift card image
const GIFT_CARD_IMAGE = "/lovable-uploads/48c465c8-5422-47c8-9bad-92205156ec56.png";

const ProductOffer = ({ onClaim }: ProductOfferProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();
  
  // Preload image immediately
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = GIFT_CARD_IMAGE;
    
    // Set a shorter timeout for faster initial render
    const timeout = setTimeout(() => {
      setImageLoaded(true);
    }, 500); 
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg p-6 max-w-md mx-auto bg-white pb-20 md:pb-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Congratulations!</h3>
        <p className="text-green-600 font-medium">You've qualified for our special offer!</p>
      </div>

      <div className="mb-6">
        <div className="w-full h-48 relative rounded-md overflow-hidden">
          {!imageLoaded ? (
            <Skeleton className="w-full h-full absolute inset-0 rounded-md" />
          ) : null}
          <img 
            src={GIFT_CARD_IMAGE}
            alt="Tesco Gift Card" 
            className={`w-full h-48 object-contain rounded-md ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.1s' }}
            width="300"
            height="200"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-lg mb-2">Tesco Gift Card</h4>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-gray-700">Valid in all Tesco stores</span>
        </div>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-gray-700">Use for shopping or merchandise</span>
        </div>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-gray-700">No expiration date</span>
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

      <div className="mb-6 text-center">
        <p className="text-primary font-medium text-sm mt-1">Limited Time Offer</p>
      </div>

      <a 
        href="https://www.tapplink.co/21468/1076/image" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block w-full"
      >
        <Button 
          className={`w-full py-6 text-lg bg-primary hover:bg-red-700 shadow-md fixed bottom-4 left-0 right-0 max-w-xs mx-auto z-20 md:static md:max-w-md md:mt-6 border-2 border-red-700 ${isMobile ? 'h-16 text-xl' : ''}`}
        >
          CLAIM NOW <ArrowRight className="ml-2" />
        </Button>
      </a>

      <p className="text-xs text-center text-gray-500 mt-4">
        Limited quantity available. Offer valid while supplies last.
      </p>
    </div>
  );
};

export default ProductOffer;
