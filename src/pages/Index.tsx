
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageCircle, TrendingUp, Users, ArrowRight, BookOpen, Target, Award } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  // 오늘의 추천 주제
  const todaysTopics = [
    { 
      id: 1, 
      title: 'TCP vs UDP', 
      description: '네트워크 프로토콜의 핵심 차이점',
      difficulty: '중급',
      estimatedTime: '15분'
    },
    { 
      id: 2, 
      title: 'HTTP/HTTPS', 
      description: '웹 통신의 기본 원리와 보안',
      difficulty: '초급',
      estimatedTime: '12분'
    },
    { 
      id: 3, 
      title: '캐시와 쿠키', 
      description: '웹 저장소의 종류와 활용',
      difficulty: '중급',
      estimatedTime: '18분'
    }
  ];

  const personas = [
    {
      id: 'beginner',
      title: '전공 취준생',
      description: '기본 지식을 재밌게 공부하고 싶은 분',
      icon: BookOpen,
      color: 'bg-blue-500',
      features: ['매일 꾸준히 학습', '현재 실력 확인', '면접 연습', '정확한 CS 정보']
    },
    {
      id: 'nonmajor',
      title: '비전공 취준생',
      description: '기초부터 차근차근 배우고 싶은 분',
      icon: Target,
      color: 'bg-green-500',
      features: ['쉬운 설명', '퀴즈 기반 학습', '단계별 진행', '기초 개념 정리']
    },
    {
      id: 'junior',
      title: '주니어 개발자',
      description: '실전 면접 감각을 키우고 싶은 분',
      icon: Award,
      color: 'bg-purple-500',
      features: ['면접 질문 훈련', '실무 연결', '피드백 제공', '말하기 연습']
    }
  ];

  const handleTopicSelect = (topic: any) => {
    if (!selectedPersona) {
      alert('먼저 페르소나를 선택해주세요!');
      return;
    }
    navigate(`/chat?persona=${selectedPersona}&topic=${topic.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">DevChat</h1>
                <p className="text-sm text-gray-600">AI와 함께하는 CS 면접 준비</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                내 진도
              </Button>
              <Button variant="ghost" size="sm">
                <Users className="w-4 h-4 mr-2" />
                히스토리
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 페르소나 선택 */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">어떤 학습자이신가요?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              당신의 학습 스타일에 맞춰 AI가 최적화된 학습 경험을 제공합니다
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {personas.map((persona) => {
              const Icon = persona.icon;
              return (
                <Card 
                  key={persona.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    selectedPersona === persona.id 
                      ? 'ring-2 ring-blue-500 shadow-xl transform -translate-y-1' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedPersona(persona.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${persona.color} rounded-xl mx-auto mb-4 flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{persona.title}</CardTitle>
                    <CardDescription className="text-base">{persona.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {persona.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 오늘의 추천 주제 */}
        {selectedPersona && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">오늘의 추천 주제</h2>
              <p className="text-gray-600">
                AI가 당신의 학습 수준에 맞춰 선별한 오늘의 CS 주제를 선택해보세요
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {todaysTopics.map((topic) => (
                <Card 
                  key={topic.id}
                  className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
                  onClick={() => handleTopicSelect(topic)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
                          {topic.title}
                        </CardTitle>
                        <CardDescription className="text-base mb-4">
                          {topic.description}
                        </CardDescription>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:transform group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant={topic.difficulty === '초급' ? 'default' : 'secondary'}>
                          {topic.difficulty}
                        </Badge>
                        <span className="text-sm text-gray-500">{topic.estimatedTime}</span>
                      </div>
                      <MessageCircle className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                <Brain className="w-5 h-5 mr-2" />
                AI와 대화 시작하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
