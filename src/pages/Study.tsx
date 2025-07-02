
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, BookOpen, CheckCircle, Clock, Target, ArrowLeft, RotateCcw } from 'lucide-react';

const Study = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  const topic = searchParams.get('topic') || '1';
  const score = parseInt(searchParams.get('score') || '75');

  const studyData = {
    '1': {
      title: 'TCP vs UDP',
      description: '네트워크 프로토콜의 핵심 차이점',
      sections: [
        {
          id: 1,
          title: 'TCP (Transmission Control Protocol)',
          content: '연결 지향적 프로토콜로, 데이터 전송의 신뢰성을 보장합니다.',
          details: [
            '3-way handshake를 통한 연결 설정',
            '순서 보장 및 오류 검출',
            '흐름 제어 및 혼잡 제어',
            '전이중 통신 지원'
          ],
          examples: ['HTTP/HTTPS', '이메일 (SMTP)', 'FTP', '텔넷']
        },
        {
          id: 2,
          title: 'UDP (User Datagram Protocol)',
          content: '비연결형 프로토콜로, 빠른 데이터 전송에 특화되어 있습니다.',
          details: [
            '연결 설정 과정 없음',
            '헤더 크기가 작음 (8바이트)',
            '브로드캐스트 및 멀티캐스트 지원',
            '실시간 통신에 적합'
          ],
          examples: ['DNS 쿼리', '동영상 스트리밍', '온라인 게임', 'DHCP']
        },
        {
          id: 3,
          title: '주요 차이점 비교',
          content: 'TCP와 UDP의 핵심 차이점을 표로 정리해보겠습니다.',
          details: [
            '신뢰성: TCP(보장) vs UDP(미보장)',
            '속도: TCP(느림) vs UDP(빠름)',
            '헤더 크기: TCP(20바이트) vs UDP(8바이트)',
            '연결 방식: TCP(연결형) vs UDP(비연결형)'
          ],
          examples: []
        }
      ]
    },
    '2': {
      title: 'HTTP/HTTPS',
      description: '웹 통신의 기본 원리와 보안',
      sections: [
        {
          id: 1,
          title: 'HTTP 기본 개념',
          content: 'HyperText Transfer Protocol의 기본 원리를 학습합니다.',
          details: [
            '클라이언트-서버 모델',
            '무상태(Stateless) 프로토콜',
            'Request-Response 구조',
            '다양한 HTTP 메서드'
          ],
          examples: ['GET', 'POST', 'PUT', 'DELETE']
        }
      ]
    },
    '3': {
      title: '캐시와 쿠키',
      description: '웹 저장소의 종류와 활용',
      sections: [
        {
          id: 1,
          title: '캐시의 개념과 종류',
          content: '웹 캐시의 기본 개념과 다양한 종류를 학습합니다.',
          details: [
            '브라우저 캐시',
            '프록시 캐시',
            'CDN 캐시',
            '캐시 무효화 전략'
          ],
          examples: ['Cache-Control', 'ETag', 'Last-Modified']
        }
      ]
    }
  };

  const currentStudy = studyData[topic as keyof typeof studyData];

  const toggleSection = (sectionId: number) => {
    setCompletedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const completionRate = (completedSections.length / currentStudy.sections.length) * 100;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/80 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/chat')} className="text-slate-300 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                대화로 돌아가기
              </Button>
              <div className="flex items-center space-x-3">
                <Brain className="w-6 h-6 text-blue-400" />
                <div>
                  <h1 className="text-lg font-semibold text-white">{currentStudy.title} 학습</h1>
                  <p className="text-sm text-slate-400">{currentStudy.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                점수: {score}점
              </Badge>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <RotateCcw className="w-4 h-4 mr-2" />
                다시 대화하기
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Progress Overview */}
        <Card className="mb-8 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-white">
              <Target className="w-6 h-6 mr-3 text-blue-400" />
              학습 진행률
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">전체 진행률</span>
                <span className="text-slate-200">{Math.round(completionRate)}%</span>
              </div>
              <Progress value={completionRate} className="h-3" />
              <div className="flex justify-between text-sm text-slate-400">
                <span>완료: {completedSections.length}개</span>
                <span>전체: {currentStudy.sections.length}개</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Study Sections */}
        <div className="space-y-6">
          {currentStudy.sections.map((section, index) => {
            const isCompleted = completedSections.includes(section.id);
            return (
              <Card key={section.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center text-lg text-white">
                        <div className="flex items-center mr-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            isCompleted ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                          </div>
                        </div>
                        {section.title}
                      </CardTitle>
                      <p className="text-slate-400 mt-2 ml-11">{section.content}</p>
                    </div>
                    <Button
                      variant={isCompleted ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSection(section.id)}
                      className={isCompleted 
                        ? "bg-green-600 hover:bg-green-700 text-white" 
                        : "border-slate-600 text-slate-300 hover:bg-slate-700"
                      }
                    >
                      {isCompleted ? '완료됨' : '학습 완료'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="ml-11 space-y-4">
                    {/* Key Points */}
                    <div>
                      <h4 className="font-semibold text-white mb-3 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-blue-400" />
                        핵심 포인트
                      </h4>
                      <ul className="space-y-2">
                        {section.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-slate-300">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Examples */}
                    {section.examples.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-white mb-3">활용 예시</h4>
                        <div className="flex flex-wrap gap-2">
                          {section.examples.map((example, idx) => (
                            <Badge key={idx} variant="outline" className="border-slate-600 text-slate-300">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Next Steps */}
        <Card className="mt-8 bg-gradient-to-r from-blue-900/50 to-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-3">학습을 마쳤습니다! 🎉</h3>
              <p className="text-slate-300 mb-6">다음 주제로 넘어가거나 다른 주제를 선택해보세요.</p>
              <div className="flex justify-center space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate('/')}>
                  <Brain className="w-4 h-4 mr-2" />
                  다른 주제 선택
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Clock className="w-4 h-4 mr-2" />
                  학습 기록 보기
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Study;
