
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, Calendar, Award, Clock, Target, ArrowLeft, BarChart3 } from 'lucide-react';

const ProgressPage = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const progressData = {
    overall: {
      totalStudyTime: 180, // minutes
      completedTopics: 8,
      averageScore: 82,
      streak: 5
    },
    weeklyStats: [
      { day: '월', minutes: 25, topics: 1 },
      { day: '화', minutes: 40, topics: 2 },
      { day: '수', minutes: 30, topics: 1 },
      { day: '목', minutes: 35, topics: 2 },
      { day: '금', minutes: 50, topics: 3 },
      { day: '토', minutes: 0, topics: 0 },
      { day: '일', minutes: 0, topics: 0 }
    ],
    topicProgress: [
      {
        id: 1,
        title: 'TCP vs UDP',
        category: '네트워크',
        progress: 100,
        score: 85,
        studyTime: 25,
        lastStudied: '2024-07-01',
        difficulty: '중급'
      },
      {
        id: 2,
        title: 'HTTP/HTTPS',
        category: '네트워크',
        progress: 100,
        score: 78,
        studyTime: 22,
        lastStudied: '2024-06-30',
        difficulty: '초급'
      },
      {
        id: 3,
        title: '캐시와 쿠키',
        category: '웹',
        progress: 75,
        score: 82,
        studyTime: 18,
        lastStudied: '2024-06-29',
        difficulty: '중급'
      },
      {
        id: 4,
        title: '데이터베이스 인덱스',
        category: '데이터베이스',
        progress: 60,
        score: 75,
        studyTime: 30,
        lastStudied: '2024-06-28',
        difficulty: '고급'
      },
      {
        id: 5,
        title: 'REST API',
        category: '웹',
        progress: 40,
        score: 0,
        studyTime: 15,
        lastStudied: '2024-06-27',
        difficulty: '중급'
      }
    ],
    achievements: [
      {
        id: 1,
        title: '첫 학습 완료',
        description: '첫 번째 주제를 완료했습니다',
        icon: '🎯',
        earned: true,
        date: '2024-06-25'
      },
      {
        id: 2,
        title: '연속 학습 3일',
        description: '3일 연속으로 학습했습니다',
        icon: '🔥',
        earned: true,
        date: '2024-06-27'
      },
      {
        id: 3,
        title: '완벽한 점수',
        description: '90점 이상을 획득했습니다',
        icon: '⭐',
        earned: false,
        date: null
      },
      {
        id: 4,
        title: '네트워크 마스터',
        description: '네트워크 관련 주제를 모두 완료했습니다',
        icon: '🌐',
        earned: false,
        date: null
      }
    ]
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '초급': return 'bg-green-900 text-green-300';
      case '중급': return 'bg-yellow-900 text-yellow-300';
      case '고급': return 'bg-red-900 text-red-300';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '네트워크': return 'bg-blue-900 text-blue-300';
      case '웹': return 'bg-purple-900 text-purple-300';
      case '데이터베이스': return 'bg-orange-900 text-orange-300';
      default: return 'bg-slate-700 text-slate-300';
    }
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
                홈으로
              </Button>
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                <div>
                  <h1 className="text-lg font-semibold text-white">학습 진도</h1>
                  <p className="text-sm text-slate-400">나의 학습 현황과 성과를 확인하세요</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">총 학습 시간</p>
                  <p className="text-2xl font-bold text-white">{Math.floor(progressData.overall.totalStudyTime / 60)}시간 {progressData.overall.totalStudyTime % 60}분</p>
                </div>
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">완료한 주제</p>
                  <p className="text-2xl font-bold text-white">{progressData.overall.completedTopics}개</p>
                </div>
                <Target className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">평균 점수</p>
                  <p className="text-2xl font-bold text-white">{progressData.overall.averageScore}점</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">연속 학습</p>
                  <p className="text-2xl font-bold text-white">{progressData.overall.streak}일</p>
                </div>
                <Award className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Activity */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800 border-slate-700 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-white">
                  <Calendar className="w-6 h-6 mr-3 text-blue-400" />
                  주간 학습 활동
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.weeklyStats.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-sm font-semibold text-slate-300">
                          {day.day}
                        </div>
                        <div>
                          <p className="text-slate-300">{day.minutes}분</p>
                          <p className="text-slate-500 text-sm">{day.topics}개 주제</p>
                        </div>
                      </div>
                      <div className="w-32">
                        <Progress value={(day.minutes / 60) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Topic Progress */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-white">
                  <Brain className="w-6 h-6 mr-3 text-blue-400" />
                  주제별 진행률
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.topicProgress.map((topic) => (
                    <div key={topic.id} className="border border-slate-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{topic.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className={getCategoryColor(topic.category)}>
                              {topic.category}
                            </Badge>
                            <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                              {topic.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-300 font-semibold">{topic.progress}%</p>
                          {topic.score > 0 && (
                            <p className="text-slate-400 text-sm">{topic.score}점</p>
                          )}
                        </div>
                      </div>
                      <Progress value={topic.progress} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm text-slate-400">
                        <span>학습 시간: {topic.studyTime}분</span>
                        <span>최근 학습: {topic.lastStudied}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-white">
                  <Award className="w-6 h-6 mr-3 text-yellow-400" />
                  성취 뱃지
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`p-4 rounded-lg border ${
                        achievement.earned 
                          ? 'border-yellow-600 bg-yellow-900/20' 
                          : 'border-slate-700 bg-slate-800/50 opacity-60'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${achievement.earned ? 'text-yellow-300' : 'text-slate-400'}`}>
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-slate-400 mt-1">{achievement.description}</p>
                          {achievement.earned && achievement.date && (
                            <p className="text-xs text-slate-500 mt-2">달성일: {achievement.date}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-8 bg-gradient-to-r from-blue-900/50 to-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-3">계속 학습하세요! 📚</h3>
              <p className="text-slate-300 mb-6">새로운 주제를 선택하거나 미완료된 주제를 계속 학습해보세요.</p>
              <div className="flex justify-center space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate('/')}>
                  <Brain className="w-4 h-4 mr-2" />
                  새 주제 시작
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Target className="w-4 h-4 mr-2" />
                  목표 설정
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressPage;
