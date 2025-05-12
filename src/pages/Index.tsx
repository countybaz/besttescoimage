
import { SurveyProvider, useSurvey } from "@/contexts/SurveyContext";
import SurveyContainer from "@/components/SurveyContainer";
import FAQ from "@/components/FAQ";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 text-center">
      <SurveyProvider>
        <header className="shadow-sm py-2 bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 flex items-center justify-center">
            <HeaderContent />
          </div>
        </header>
        
        <main className="container mx-auto relative pt-4">
          <SurveyContainer />
        </main>
      </SurveyProvider>

      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          {/* Legal Links Section */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-800 bg-gray-100 inline-block px-4 py-2 rounded-md">Legal Links</h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/terms" className="text-primary hover:underline">Terms and Conditions</Link>
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              <Link to="/non-affiliation" className="text-primary hover:underline">Non-Affiliation Disclaimer</Link>
            </div>
          </div>
          
          {/* Legal Disclaimers */}
          <div className="text-xs text-gray-600 space-y-2">
            <p>Trade names or rights associated with all trademarks on this website are the property of their respective owners and are not associated with this promotion. This offer ends at the end of 2025.</p>
            <p>This website is not part of the Facebook website or of Facebook Inc.</p>
            <p>Furthermore, this website is not endorsed in any way by Facebook. Facebook is a trademark of Facebook, Inc.</p>
          </div>
          
          {/* Copyright */}
          <p className="text-xs text-center text-gray-500 mt-6">
            © {new Date().getFullYear()} Tesco Review Program. All rights reserved.
            <br />
            This is a limited time promotional offer. Terms and conditions apply.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Create a separate component for the header content with improved mobile styling
const HeaderContent = () => {
  const { goToStep } = useSurvey();
  const isMobile = useIsMobile();
  
  const handleLogoClick = () => {
    goToStep(0);
  };
  
  return (
    <div 
      className="flex items-center justify-between w-full md:justify-center cursor-pointer" 
      onClick={handleLogoClick}
    >
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/48c465c8-5422-47c8-9bad-92205156ec56.png" 
          alt="Tesco Review Program Logo" 
          className={`h-16 w-auto min-w-[60px] md:h-20 transition-all duration-200`}
          width="80" 
          height="80"
          loading="eager"
          fetchPriority="high"
        />
        <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-primary`}>
          Tesco Review Program
        </h1>
      </div>
      <div className="ml-2 md:ml-4">
        <FAQ />
      </div>
    </div>
  );
};

export default Index;
