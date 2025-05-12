
import { useEffect, useState } from "react";

interface TimerProps {
  minutes: number;
}

const Timer = ({ minutes }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Get the saved timer expiration timestamp
    const expiryTimestamp = sessionStorage.getItem('timerExpiry');
    
    if (expiryTimestamp) {
      // Calculate remaining time based on expiry timestamp
      const currentTime = new Date().getTime();
      const expiry = parseInt(expiryTimestamp, 10);
      const remaining = Math.max(0, Math.floor((expiry - currentTime) / 1000));
      
      // If there's still time left, return it
      if (remaining > 0 && remaining <= minutes * 60) {
        return remaining;
      }
    }
    
    // If no valid time found, set a new expiration timestamp
    const newExpiryTime = new Date().getTime() + (minutes * 60 * 1000);
    sessionStorage.setItem('timerExpiry', newExpiryTime.toString());
    return minutes * 60;
  });

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(prev => {
        const newValue = prev <= 1 ? 0 : prev - 1;
        return newValue;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [timeLeft]);

  // Save current timer state when component unmounts or on navigation
  useEffect(() => {
    const handleBeforeUnload = () => {
      const currentTime = new Date().getTime();
      const expiryTime = currentTime + (timeLeft * 1000);
      sessionStorage.setItem('timerExpiry', expiryTime.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload(); // Also save when component unmounts
    };
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate the percentage for visual indicator
  const percentageLeft = Math.floor((timeLeft / (minutes * 60)) * 100);
  const isLowTime = percentageLeft < 25; // Less than 25% time remaining

  return (
    <div className="bg-gradient-to-r from-red-100 to-red-50 border-2 border-red-300 rounded-lg p-4 text-center my-6 shadow-md">
      <p className="text-sm font-semibold text-red-700 mb-1">Time Remaining to Claim Your Reward</p>
      <div className="flex items-center justify-center space-x-2">
        <div className="text-3xl font-bold text-red-600 animate-pulse">
          {formatTime(timeLeft)}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
        <div 
          className={`h-2.5 rounded-full ${isLowTime ? 'bg-red-600 animate-pulse' : 'bg-red-500'}`} 
          style={{ width: `${percentageLeft}%` }}
        ></div>
      </div>
      
      {/* Warning text for low time */}
      {isLowTime && (
        <p className="text-xs font-medium text-red-600 mt-2 animate-pulse">
          ⚠️ Hurry! Your offer is about to expire!
        </p>
      )}
    </div>
  );
};

export default Timer;
