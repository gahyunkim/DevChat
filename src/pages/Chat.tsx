
import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Send, ArrowLeft, Lightbulb, BookOpen, Award, Volume2, Mic } from 'lucide-react';
import { toast } from 'sonner';

const Chat = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Array<{id: number, type: 'user' | 'ai', content: string, timestamp: Date}>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const persona = searchParams.get('persona');
  const topicId = searchParams.get('topic');

  const topics = {
    '1': { title: 'TCP vs UDP', description: '네트워크 프로토콜의 핵심 차이점' },
    '2': { title: 'HTTP/HTTPS', description: '웹 통신의 기본 원리와 보안' },
    '3': { title: '캐시와 쿠키', description: '웹 저장소의 종류와 활용' }
  };

  const currentTopic = topics[topicId as keyof typeof topics];

  const personaConfigs = {
    beginner: {
      name: '전공 취준생',
      color: 'blue',
      initialMessage: `안녕하세요! 오늘은 ${currentTopic?.title}에 대해 이야기해볼까요? 먼저 간단한 질문부터 시작해보겠습니다.\n\n${currentTopic?.title}의 가장 큰 차이점이 무엇이라고 생각하시나요?`
    },
    nonmajor: {
      name: '비전공 취준생', 
      color: 'green',
      initialMessage: `안녕하세요! 비전공자분께 맞춰 쉽게 설명해드릴게요. 오늘은 ${currentTopic?.title}을 함께 알아보죠!\n\n혹시 ${currentTopic?.title}에 대해 들어보신 적이 있나요? 아는 만큼만 편하게 말씀해주세요.`
    },
    junior: {
      name: '주니어 개발자',
      color: 'purple', 
      initialMessage: `안녕하세요! 실전 면접처럼 진행해보겠습니다. 오늘 주제는 ${currentTopic?.title}입니다.\n\n면접관이라고 생각하고 답변해주세요: ${currentTopic?.title}의 차이점을 구체적인 예시와 함께 설명해보실 수 있나요?`
    }
  };

  const currentPersona = personaConfigs[persona as keyof typeof personaConfigs];

  useEffect(() => {
    if (currentPersona) {
      setMessages([{
        id: 1,
        type: 'ai',
        content: currentPersona.initialMessage,
        timestamp: new Date()
      }]);
    }
  }, [persona, topicId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateAIResponse = async (userMessage: string) => {
    // 실제 구현에서는 OpenAI API 호출
    const responses = {
      beginner: [
        "좋은 시작이네요! 하지만 몇 가지 중요한 개념이 빠져있어요.\n\n✅ 잘 언급한 부분:\n- 기본적인 차이점 인식\n\n❌ 보완할 부분:\n- 신뢰성과 연결 지향성\n- 순서 보장과 흐름 제어\n- 사용 사례의 구체적 예시\n\n더 구체적으로 TCP의 '연결 지향성'이 무엇을 의미하는지 설명해보실 수 있나요?",
        "훌륭합니다! 이번에는 훨씬 체계적으로 답변해주셨네요.\n\n✅ 개선된 부분:\n- 3-way handshake 언급\n- 신뢰성에 대한 이해\n- 구체적인 활용 사례\n\n🎯 면접 팁:\n이 정도 수준이면 면접에서 좋은 평가를 받을 수 있어요. 다음에는 UDP의 장점도 함께 언급하면 더욱 완벽할 것 같아요!"
      ],
      nonmajor: [
        "아주 좋아요! 기본 개념은 잘 이해하고 계시네요.\n\n🔍 더 쉽게 설명하면:\nTCP는 택배처럼 '확실히 전달'되는 방식이고, UDP는 일반 우편처럼 '빠르지만 보장은 없는' 방식이에요.\n\n📝 한 줄로 요약해보세요:\n\"TCP는 ___하고, UDP는 ___하다\"",
        "완벽해요! 이제 개념이 확실히 정리되셨네요.\n\n🎯 퀴즈 시간:\n1. 카카오톡 메시지는 TCP와 UDP 중 어느 것을 사용할까요?\n2. 유튜브 동영상 스트리밍은 어떨까요?\n\n이유도 함께 설명해보세요!"
      ],
      junior: [
        "실무 경험이 느껴지는 답변이네요! 하지만 면접관 입장에서 몇 가지 더 듣고 싶은 부분이 있어요.\n\n💼 실무 관점에서 추가 질문:\n1. 회사에서 API 통신 시 왜 HTTP(TCP 기반)를 주로 사용하나요?\n2. 실시간 채팅 기능 구현 시 WebSocket과 HTTP의 차이점은?\n3. 성능상 UDP가 유리한 상황을 실제 서비스 예시로 설명해보세요.",
        "훌륭한 답변입니다! 실무 경험과 이론적 지식이 잘 결합된 답변이에요.\n\n🏆 면접 평가:\n- 기술적 정확성: ⭐⭐⭐⭐⭐\n- 실무 연결성: ⭐⭐⭐⭐⭐\n- 커뮤니케이션: ⭐⭐⭐⭐\n\n💡 추가 면접 대비:\n다음에는 '네트워크 보안'이나 'RESTful API' 주제로 연습해보시는 것을 추천드려요!"
      ]
    };

    const personaResponses = responses[persona as keyof typeof responses] || responses.beginner;
    return personaResponses[Math.min(messages.filter(m => m.type === 'user').length - 1, personaResponses.length - 1)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // AI 응답 생성
      const aiResponse = await generateAIResponse(inputValue);
      
      setTimeout(() => {
        const aiMessage = {
          id: messages.length + 2,
          type: 'ai' as const,
          content: aiResponse,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);

        // 피드백 표시
        setCurrentFeedback({
          strengths: ['기본 개념 이해', '논리적 구조'],
          improvements: ['구체적 예시 필요', '실무 연결성 보완'],
          score: 75,
          nextTopics: ['HTTP/HTTPS', '네트워크 보안']
        });
        setShowFeedback(true);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast.error('응답 생성 중 오류가 발생했습니다.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentPersona || !currentTopic) {
    return <div>페이지를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
              <div className="flex items-center space-x-3">
                <Brain className="w-6 h-6 text-blue-500" />
                <div>
                  <h1 className="text-lg font-semibold">{currentTopic.title}</h1>
                  <p className="text-sm text-gray-600">{currentPersona.name} 모드</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{currentPersona.name}</Badge>
              <Button variant="ghost" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                개념 카드
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 채팅 영역 */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Brain className="w-5 h-5 mr-2 text-blue-500" />
                  AI 면접관과의 대화
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* 메시지 영역 */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        {message.type === 'ai' && (
                          <div className="flex items-center justify-end mt-2 space-x-2">
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              <Volume2 className="w-3 h-3 mr-1" />
                              읽기
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                          <span className="text-sm text-gray-600">AI가 답변을 생각하고 있습니다...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* 입력 영역 */}
                <div className="border-t pt-4">
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <Textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="답변을 입력하세요... (Enter로 전송)"
                        className="min-h-[60px] resize-none"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isLoading}
                        size="sm"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mic className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 피드백 카드 */}
            {showFeedback && currentFeedback && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Award className="w-5 h-5 mr-2 text-yellow-500" />
                    실시간 피드백
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">전체 점수</span>
                      <Badge variant="secondary">{currentFeedback.score}점</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${currentFeedback.score}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-green-600 mb-2">✅ 잘한 점</h4>
                    <ul className="text-sm space-y-1">
                      {currentFeedback.strengths.map((strength: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-orange-600 mb-2">🔧 개선할 점</h4>
                    <ul className="text-sm space-y-1">
                      {currentFeedback.improvements.map((improvement: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 다음 추천 주제 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  다음 추천 주제
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['HTTP/HTTPS', '데이터베이스 인덱스', '캐싱 전략'].map((topic, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => toast.success(`${topic} 주제로 이동합니다!`)}
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 학습 통계 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">오늘의 학습</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">대화 횟수</span>
                    <Badge variant="secondary">{messages.filter(m => m.type === 'user').length}회</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">학습 시간</span>
                    <Badge variant="secondary">12분</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">완료한 주제</span>
                    <Badge variant="secondary">1개</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
