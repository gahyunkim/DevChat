import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageCircle, TrendingUp, Users, ArrowRight, BookOpen, Target, Award, Zap, Trophy, PlusCircle } from 'lucide-react';
import ConceptCard from '@/components/ConceptCard';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

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

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersona(personaId);
    navigate(`/chat?persona=${personaId}`);
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
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/goals')} className="text-slate-300 hover:text-white">
                <Target className="w-4 h-4 mr-2" />
                목표 & 보상
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/skill-test')} className="text-slate-300 hover:text-white">
                <Trophy className="w-4 h-4 mr-2" />
                실력 테스트
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/community')} className="text-slate-300 hover:text-white">
                <Users className="w-4 h-4 mr-2" />
                커뮤니티
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/custom-topics')} className="text-slate-300 hover:text-white">
                <PlusCircle className="w-4 h-4 mr-2" />
                커스텀 주제
              </Button>
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
        {/* 실력테스트 + 개념정리 캐러셀 */}
        <div className="mb-12 flex flex-col items-center">
          <div className="w-full max-w-4xl flex items-center gap-6">
            {/* 캐러셀: 개념정리 */}
            <div className="flex-1 hidden md:block">
              <Carousel opts={{ loop: true }}>
                <CarouselContent>
                  {Object.values(conceptsData).map((concept) => (
                    <CarouselItem key={concept.id}>
                      <Card className="bg-slate-800 border border-slate-700 h-full flex flex-col justify-between">
                        <CardHeader>
                          <CardTitle className="text-white text-lg mb-1">{concept.title}</CardTitle>
                          <CardDescription className="text-slate-400 text-sm mb-2">{concept.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-2">
                            <span className="text-xs text-blue-300 font-semibold">주요 포인트</span>
                            <ul className="list-disc list-inside text-slate-300 text-xs mt-1">
                              {concept.keyPoints.map((point, idx) => (
                                <li key={idx}>{point}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {concept.examples.map((ex, idx) => (
                              <span key={idx} className="bg-slate-700 text-slate-200 rounded px-2 py-0.5 text-xs">{ex}</span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-between mt-2">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </Carousel>
            </div>
            {/* 실력테스트 카드 */}
            <div className="flex-shrink-0 w-full md:w-[340px]">
              <Card className="bg-slate-800 border border-slate-700">
                <CardHeader className="text-center py-6 flex flex-col items-center">
                  <Trophy className="w-10 h-10 text-yellow-300 mb-2 opacity-80" />
                  <h2 className="text-2xl font-bold text-white mb-1">AI 실력 테스트</h2>
                  <CardDescription className="text-base text-slate-400 mb-2">AI가 내 실력을 진단해주는 맞춤형 테스트</CardDescription>
                  <Button className="mt-2 w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-base font-semibold py-4" onClick={() => navigate('/skill-test')}>
                    실력 테스트 시작하기
                  </Button>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
        {/* 캐러셀/실력테스트와 학습자 선택 영역 구분선 */}
        <div className="w-full flex justify-center mb-12">
          <div className="h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>
        {/* 페르소나 선택 - AI 면접관과 대화 시작 강조 */}
        <div className="mb-12 pt-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">AI 면접관과 대화 시작</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              당신의 학습 스타일에 맞는 AI 면접관과 실전처럼 대화를 시작해보세요.<br />
              아래에서 자신에게 맞는 유형을 선택하면, AI가 맞춤형 질문과 피드백을 제공합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {personas.map((persona) => {
              const Icon = persona.icon;
              return (
                <Card 
                  key={persona.id}
                  className={`flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-slate-800 border-slate-700 hover:border-slate-600 ${
                    selectedPersona === persona.id 
                      ? 'ring-2 ring-blue-500 shadow-xl transform -translate-y-1 border-blue-500' 
                      : ''
                  }`}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${persona.color} rounded-xl mx-auto mb-4 flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white mb-1">{persona.title}</CardTitle>
                    <CardDescription className="text-base text-slate-400 mb-2">{persona.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <ul className="text-xs text-slate-400 mb-4 space-y-1">
                      {persona.features.map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={() => handlePersonaSelect(persona.id)}>
                      이 유형으로 AI 면접 시작
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        {/* 서비스 소개 - 미니멀 & 텍스트 중심 */}
        <div className="mb-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <Brain className="w-8 h-8 text-blue-400 mb-1" />
            <h3 className="text-lg font-semibold text-white mb-1">DevChat이란?</h3>
            <p className="text-slate-400 text-base max-w-xl mx-auto">DevChat은 AI와 함께하는 실전 면접 연습 및 CS 학습 플랫폼입니다. 실제 면접관처럼 질문하고, 답변에 대한 피드백과 점수를 제공합니다. 목표 설정, 진도 관리, 커뮤니티 등 다양한 기능으로 취업 준비를 지원합니다.</p>
            <p className="text-xs text-slate-500 mt-1">지금 바로 DevChat에서 AI와 함께 성장해보세요!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

<style>{`
  .heatmap-level-0 { fill: #232946; }
  .heatmap-level-1 { fill: #3b82f6; }
  .heatmap-level-2 { fill: #2563eb; }
  .heatmap-level-3 { fill: #1d4ed8; }
  .heatmap-level-4 { fill: #1e40af; }
  .react-calendar-heatmap .react-calendar-heatmap-weekday-label { fill: #94a3b8; font-size: 10px; }
`}</style>