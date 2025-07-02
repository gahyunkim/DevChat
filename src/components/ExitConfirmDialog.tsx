
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X } from 'lucide-react';

interface ExitConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmExit: () => void;
  conversationProgress: number; // 0-100
}

const ExitConfirmDialog = ({ isOpen, onClose, onConfirmExit, conversationProgress }: ExitConfirmDialogProps) => {
  const [forceExitAttempts, setForceExitAttempts] = useState(0);
  const maxForceExitAttempts = 3;

  const handleForceExit = () => {
    if (forceExitAttempts < maxForceExitAttempts - 1) {
      setForceExitAttempts(prev => prev + 1);
    } else {
      onConfirmExit();
    }
  };

  const getWarningMessage = () => {
    if (conversationProgress < 30) {
      return "대화를 시작한 지 얼마 안 됐어요! 조금 더 진행해보시는 건 어떨까요?";
    } else if (conversationProgress < 70) {
      return "대화가 절반 정도 진행됐네요. 끝까지 완주하시면 더 좋은 피드백을 받을 수 있어요!";
    } else {
      return "거의 다 끝나가고 있어요! 마지막까지 완주하시면 완전한 피드백을 받을 수 있습니다.";
    }
  };

  const getForceExitMessage = () => {
    const remaining = maxForceExitAttempts - forceExitAttempts;
    if (remaining > 1) {
      return `정말로 나가시겠어요? (${remaining}번 더 클릭하면 나갈 수 있어요)`;
    } else if (remaining === 1) {
      return "마지막 기회예요! 한 번 더 클릭하면 정말로 나가집니다.";
    }
    return "대화를 종료합니다.";
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-slate-800 border-slate-700 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <span>대화를 종료하시겠어요?</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-300">
            {getWarningMessage()}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="py-4">
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-400">진행률</span>
              <span className="text-sm text-slate-300">{conversationProgress}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${conversationProgress}%` }}
              />
            </div>
          </div>
          
          {forceExitAttempts > 0 && (
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 mt-3">
              <p className="text-red-300 text-sm">{getForceExitMessage()}</p>
            </div>
          )}
        </div>

        <AlertDialogFooter className="space-x-2">
          <AlertDialogCancel 
            onClick={onClose}
            className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
          >
            계속 대화하기
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleForceExit}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {forceExitAttempts < maxForceExitAttempts - 1 ? '나가기' : '강제 종료'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExitConfirmDialog;
