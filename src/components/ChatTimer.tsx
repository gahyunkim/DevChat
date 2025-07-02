
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle } from 'lucide-react';

interface ChatTimerProps {
  onTimeUp: () => void;
  initialTime?: number; // seconds
}

const ChatTimer = ({ onTimeUp, initialTime = 600 }: ChatTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        
        // Warning when 2 minutes left
        if (prev <= 120 && !isWarning) {
          setIsWarning(true);
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp, isWarning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 60) return 'bg-red-900 text-red-300 border-red-800';
    if (timeLeft <= 120) return 'bg-yellow-900 text-yellow-300 border-yellow-800';
    return 'bg-slate-700 text-slate-300 border-slate-600';
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400">남은 시간</span>
          </div>
          <div className="flex items-center space-x-2">
            {isWarning && <AlertCircle className="w-4 h-4 text-yellow-400" />}
            <Badge variant="outline" className={getTimerColor()}>
              {formatTime(timeLeft)}
            </Badge>
          </div>
        </div>
        {isWarning && (
          <p className="text-xs text-yellow-400 mt-2">
            대화가 곧 종료됩니다. 마무리 준비를 해주세요.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatTimer;
