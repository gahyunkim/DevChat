
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Target, 
  Calendar, 
  Trophy, 
  Fire, 
  Star, 
  Plus,
  ArrowLeft,
  Gift,
  Zap,
  Crown
} from 'lucide-react';
import { toast } from 'sonner';

const Goals = () => {
  const navigate = useNavigate();
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', deadline: '', target: '' });

  // Mock data for goals
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'CS 기초 마스터',
      description: '네트워크, 운영체제, 데이터베이스 기본 개념 완전 이해',
      progress: 75,
      target: 100,
      deadline: '2025-02-15',
      status: 'active',
      reward: '골드 배지'
    },
    {
      id: 2,
      title: '면접 대화 30회 완주',
      description: '다양한 주제로 AI와 면접 연습 30회 완료',
      progress: 18,
      target: 30,
      deadline: '2025-01-31',
      status: 'active',
      reward: '마스터 칭호'
    },
    {
      id: 3,
      title: '연속 학습 7일',
      description: '일주일 연속으로 매일 학습하기',
      progress: 4,
      target: 7,
      deadline: '2025-01-10',
      status: 'active',
      reward: '불꽃 배지'
    }
  ]);

  // Mock data for rewards and achievements
  const rewards = {
    daily: { current: 3, max: 7, reward: '일일 보상 박스' },
    weekly: { current: 2, max: 5, reward: '주간 프리미엄 피드백' },
    monthly: { current: 1, max: 3, reward: '월간 스페셜 주제' }
  };

  const achievements = [
    { id: 1, title: '첫 대화', description: 'AI와 첫 면접 대화 완료', earned: true, icon: Star },
    { id: 2, title: '연속 3일', description: '3일 연속 학습 달성', earned: true, icon: Fire },
    { id: 3, title: '완벽한 답변', description: '90점 이상 받기', earned: false, icon: Crown },
    { id: 4, title: '주제 마스터', description: '한 주제에서 5회 연속 80점 이상', earned: false, icon: Trophy }
  ];

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.deadline) {
      toast.error('제목과 마감일은 필수입니다!');
      return;
    }

    const goal = {
      id: goals.length + 1,
      title: newGoal.title,
      description: newGoal.description,
      progress: 0,
      target: parseInt(newGoal.target) || 100,
      deadline: newGoal.deadline,
      status: 'active',
      reward: '사용자 정의 보상'
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: '', description: '', deadline: '', target: '' });
    setShowAddGoal(false);
    toast.success('새로운 목표가 추가되었습니다!');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/80 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="text-slate-300 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-blue-400" />
                <div>
                  <h1 className="text-lg font-semibold text-white">목표 & 보상</h1>
                  <p className="text-sm text-slate-400">학습 목표를 설정하고 보상을 받아보세요</p>
                </div>
              </div>
            </div>
            <Button onClick={() => setShowAddGoal(!showAddGoal)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              목표 추가
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 목표 영역 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 목표 추가 폼 */}
            {showAddGoal && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">새 목표 추가</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="목표 제목"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Textarea
                    placeholder="목표 설명"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                    <Input
                      placeholder="목표 수치 (선택)"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddGoal} className="bg-blue-600 hover:bg-blue-700">
                      목표 추가
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddGoal(false)} className="border-slate-600 text-slate-300">
                      취소
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 현재 목표들 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">현재 목표</h2>
              {goals.map((goal) => (
                <Card key={goal.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">{goal.title}</CardTitle>
                        <CardDescription className="text-slate-400 mt-1">
                          {goal.description}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                        {Math.round((goal.progress / goal.target) * 100)}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-slate-400 mb-2">
                          <span>{goal.progress} / {goal.target}</span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {goal.deadline}
                          </span>
                        </div>
                        <Progress value={(goal.progress / goal.target) * 100} className="bg-slate-700" />
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-yellow-400">
                          <Gift className="w-4 h-4 mr-1" />
                          <span className="text-sm">보상: {goal.reward}</span>
                        </div>
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                          수정
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 사이드바 - 보상 & 성취 */}
          <div className="space-y-6">
            {/* 일일/주간/월간 보상 */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Fire className="w-5 h-5 mr-2 text-orange-500" />
                  보상 진행률
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-300">일일 학습</span>
                    <span className="text-xs text-slate-400">{rewards.daily.current}/{rewards.daily.max}</span>
                  </div>
                  <Progress value={(rewards.daily.current / rewards.daily.max) * 100} className="bg-slate-700" />
                  <p className="text-xs text-slate-400 mt-1">보상: {rewards.daily.reward}</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-300">주간 목표</span>
                    <span className="text-xs text-slate-400">{rewards.weekly.current}/{rewards.weekly.max}</span>
                  </div>
                  <Progress value={(rewards.weekly.current / rewards.weekly.max) * 100} className="bg-slate-700" />
                  <p className="text-xs text-slate-400 mt-1">보상: {rewards.weekly.reward}</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-300">월간 도전</span>
                    <span className="text-xs text-slate-400">{rewards.monthly.current}/{rewards.monthly.max}</span>
                  </div>
                  <Progress value={(rewards.monthly.current / rewards.monthly.max) * 100} className="bg-slate-700" />
                  <p className="text-xs text-slate-400 mt-1">보상: {rewards.monthly.reward}</p>
                </div>
              </CardContent>
            </Card>

            {/* 성취 배지 */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  성취 배지
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={achievement.id}
                        className={`p-3 rounded-lg border text-center ${
                          achievement.earned
                            ? 'bg-yellow-900/20 border-yellow-800 text-yellow-300'
                            : 'bg-slate-700 border-slate-600 text-slate-400'
                        }`}
                      >
                        <Icon className={`w-8 h-8 mx-auto mb-2 ${achievement.earned ? 'text-yellow-400' : 'text-slate-500'}`} />
                        <h4 className="text-xs font-medium">{achievement.title}</h4>
                        <p className="text-xs opacity-80 mt-1">{achievement.description}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* 강제 학습 알림 */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Zap className="w-5 h-5 mr-2 text-purple-500" />
                  학습 알림
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">연속 학습 일수</span>
                    <Badge variant="secondary" className="bg-slate-700 text-slate-200">4일</Badge>
                  </div>
                  <p className="text-xs text-slate-400">
                    오늘 학습을 완료하지 않으면 연속 기록이 초기화됩니다!
                  </p>
                  <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => navigate('/chat')}>
                    지금 학습하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
