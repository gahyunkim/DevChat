import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageCircle, TrendingUp, Users, ArrowRight, BookOpen, Target, Award } from 'lucide-react';
import ConceptCard from '@/components/ConceptCard';

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

  // Mock data for detailed concept cards
  const conceptsData = {
    '1': {
      id: '1',
      title: 'TCP vs UDP',
      description: '네트워크 프로토콜의 핵심 차이점을 학습하고 각각의 특징과 사용 사례를 이해합니다.',
      difficulty: '중급',
      estimatedTime: '15분',
      category: '네트워크',
      keyPoints: [
        'TCP의 연결 지향적 특성과 3-way handshake',
        'UDP의 비연결형 특성과 빠른 전송',
        '신뢰성 vs 속도의 트레이드오프',
        '각 프로토콜의 적절한 사용 사례'
      ],
      prerequisites: ['네트워크 기초', 'OSI 7계층'],
      examples: ['HTTP/HTTPS (TCP)', 'DNS 쿼리 (UDP)', '동영상 스트리밍 (UDP)', '파일 전송 (TCP)']
    },
    '2': {
      id: '2',
      title: 'HTTP/HTTPS',
      description: '웹 통신의 기본 원리와 보안 메커니즘을 이해하고 실무에서의 활용법을 학습합니다.',
      difficulty: '초급',
      estimatedTime: '12분',
      category: '웹',
      keyPoints: [
        'HTTP 프로토콜의 기본 구조와 특징',
        'HTTPS와 SSL/TLS 암호화',
        'HTTP 메서드와 상태 코드',
        '쿠키와 세션의 역할'
      ],
      prerequisites: ['TCP/IP 기초'],
      examples: ['웹 브라우징', 'REST API', '웹 서비스', 'AJAX 통신']
    },
    '3': {
      id: '3',
      title: '캐시와 쿠키',
      description: '웹 저장소의 종류와 각각의 특징, 그리고 성능 최적화를 위한 캐싱 전략을 학습합니다.',
      difficulty: '중급',
      estimatedTime: '18분',
      category: '웹',
      keyPoints: [
        '브라우저 캐시와 서버 캐시의 차이',
        '쿠키의 구조와 보안 설정',
        'localStorage와 sessionStorage',
        '캐시 무효화와 버전 관리'
      ],
      prerequisites: ['HTTP 기초', '웹 브라우저 동작 원리'],
      examples: ['CDN 캐싱', '브라우저 캐시', '세션 관리', '사용자 선호 설정']
    }
  };

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

  const handleTopicSelect = (topicId: string) => {
    if (!selectedPersona) {
      alert('먼저 페르소나를 선택해주세요!');
      return;
    }
    navigate(`/chat?persona=${selectedPersona}&topic=${topicId}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/80 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">DevChat</h1>
                <p className="text-sm text-slate-400">AI와 함께하는 CS 면접 준비</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/progress')} className="text-slate-300 hover:text-white">
                <TrendingUp className="w-4 h-4 mr-2" />
                내 진도
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/history')} className="text-slate-300 hover:text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
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
            <h2 className="text-3xl font-bold text-white mb-3">어떤 학습자이신가요?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              당신의 학습 스타일에 맞춰 AI가 최적화된 학습 경험을 제공합니다
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {personas.map((persona) => {
              const Icon = persona.icon;
              return (
                <Card 
                  key={persona.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-slate-800 border-slate-700 hover:border-slate-600 ${
                    selectedPersona === persona.id 
                      ? 'ring-2 ring-blue-500 shadow-xl transform -translate-y-1 border-blue-500' 
                      : ''
                  }`}
                  onClick={() => setSelectedPersona(persona.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${persona.color} rounded-xl mx-auto mb-4 flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">{persona.title}</CardTitle>
                    <CardDescription className="text-base text-slate-400">{persona.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {persona.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-slate-400">
                          <div className="w-1.5 h-1.5 bg-slate-500 rounded-full mr-3" />
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
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-3">오늘의 추천 주제</h2>
              <p className="text-slate-400">
                AI가 당신의 학습 수준에 맞춰 선별한 오늘의 CS 주제를 선택해보세요
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {Object.values(conceptsData).map((concept) => (
                <ConceptCard
                  key={concept.id}
                  concept={concept}
                  onClick={() => handleTopicSelect(concept.id)}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
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
