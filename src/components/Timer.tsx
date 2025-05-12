
import { useEffect, useState } from "react";

interface TimerProps {
  minutes: number;
}

const Timer = ({ minutes }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Try to get the saved timer value from sessionStorage
    const savedTime = sessionStorage.getItem('timerValue');
    if (savedTime) {
      const parsedTime = parseInt(savedTime, 10);
      // Validate the saved time to ensure it's sensible
      if (!isNaN(parsedTime) && parsedTime > 0 && parsedTime <= minutes * 60) {
        return parsedTime;
      }
    }
    return minutes * 60; // Default to full time if no valid saved time
  });

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(prev => {
        const newValue = prev <= 1 ? 0 : prev - 1;
        // Save the current timer value to sessionStorage
        sessionStorage.setItem('timerValue', newValue.toString());
        return newValue;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
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
