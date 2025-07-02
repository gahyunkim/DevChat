
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  BarChart,
  Target,
  Award,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

const SkillTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1시간
  const [results, setResults] = useState<any>(null);

  // Mock questions data
  const questions = [
    {
      id: 1,
      category: '네트워크',
      difficulty: '초급',
      question: 'TCP와 UDP의 가장 큰 차이점은 무엇인가요?',
      options: [
        'TCP는 연결 지향적이고, UDP는 비연결 지향적이다',
        'TCP는 더 빠르고, UDP는 더 느리다',
        'TCP는 암호화되고, UDP는 암호화되지 않는다',
        'TCP는 웹에서만 사용되고, UDP는 게임에서만 사용된다'
      ],
      correct: 0,
      explanation: 'TCP는 연결을 설정한 후 데이터를 전송하는 연결 지향적 프로토콜이고, UDP는 연결 설정 없이 데이터를 전송하는 비연결 지향적 프로토콜입니다.'
    },
    {
      id: 2,
      category: '운영체제',
      difficulty: '중급',
      question: '프로세스와 스레드의 차이점으로 올바른 것은?',
      options: [
        '프로세스는 메모리를 공유하지만 스레드는 독립적이다',
        '프로세스는 독립적인 메모리 공간을 가지고, 스레드는 메모리를 공유한다',
        '프로세스와 스레드는 동일한 개념이다',
        '스레드가 프로세스보다 더 많은 메모리를 사용한다'
      ],
      correct: 1,
      explanation: '프로세스는 독립적인 메모리 공간을 가지며, 스레드는 같은 프로세스 내에서 메모리 공간을 공유합니다.'
    },
    {
      id: 3,
      category: '데이터베이스',
      difficulty: '중급',
      question: '데이터베이스 인덱스의 주요 목적은 무엇인가요?',
      options: [
        '데이터를 압축하여 저장 공간을 절약',
        '데이터의 무결성을 보장',
        '검색 속도를 향상',
        '데이터를 암호화'
      ],
      correct: 2,
      explanation: '인덱스는 데이터베이스에서 특정 데이터를 빠르게 찾기 위한 자료구조로, 검색 성능을 크게 향상시킵니다.'
    },
    {
      id: 4,
      category: '자료구조',
      difficulty: '초급',
      question: '스택(Stack)의 특징으로 올바른 것은?',
      options: [
        'FIFO (First In, First Out) 구조',
        'LIFO (Last In, First Out) 구조',
        '임의의 위치에서 삽입/삭제 가능',
        '정렬된 상태를 유지'
      ],
      correct: 1,
      explanation: '스택은 LIFO(Last In, First Out) 구조로, 마지막에 들어간 데이터가 가장 먼저 나오는 자료구조입니다.'
    },
    {
      id: 5,
      category: '알고리즘',
      difficulty: '고급',
      question: '퀵 정렬의 평균 시간 복잡도는?',
      options: [
        'O(n)',
        'O(n log n)',
        'O(n²)',
        'O(log n)'
      ],
      correct: 1,
      explanation: '퀵 정렬의 평균 시간 복잡도는 O(n log n)입니다. 최악의 경우 O(n²)이지만, 일반적으로는 매우 효율적인 정렬 알고리즘입니다.'
    }
  ];

  // Timer effect
  useEffect(() => {
    if (testStarted && !testCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleTestComplete();
    }
  }, [testStarted, testCompleted, timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    setTestStarted(true);
    setAnswers(new Array(questions.length).fill(''));
  };

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!answers[currentQuestion]) {
      toast.error('답변을 선택해주세요!');
      return;
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleTestComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleTestComplete = () => {
    setTestCompleted(true);
    
    // Calculate results
    let correct = 0;
    const categoryScores: { [key: string]: { correct: number, total: number } } = {};
    
    questions.forEach((question, index) => {
      const isCorrect = parseInt(answers[index]) === question.correct;
      if (isCorrect) correct++;
      
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = { correct: 0, total: 0 };
      }
      categoryScores[question.category].total++;
      if (isCorrect) categoryScores[question.category].correct++;
    });

    const score = Math.round((correct / questions.length) * 100);
    const level = score >= 90 ? 'Expert' : score >= 70 ? 'Advanced' : score >= 50 ? 'Intermediate' : 'Beginner';
    
    setResults({
      score,
      correct,
      total: questions.length,
      level,
      categoryScores,
      timeUsed: 3600 - timeLeft
    });
  };

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <div className="border-b border-slate-700 bg-slate-800/80 backdrop-blur">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="text-slate-300 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
              <div className="flex items-center space-x-3">
                <Brain className="w-6 h-6 text-purple-400" />
                <div>
                  <h1 className="text-lg font-semibold text-white">CS 실력 테스트</h1>
                  <p className="text-sm text-slate-400">당신의 실제 CS 지식 수준을 측정해보세요</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">CS 종합 실력 테스트</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              네트워크, 운영체제, 데이터베이스, 자료구조, 알고리즘 등 CS 전반에 대한 
              종합적인 실력을 측정하고 개인 맞춤 학습 방향을 제시합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Clock className="w-5 h-5 mr-2 text-blue-400" />
                  테스트 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">문제 수:</span>
                  <span className="text-white">{questions.length}문제</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">제한 시간:</span>
                  <span className="text-white">60분</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">난이도:</span>
                  <span className="text-white">초급~고급 혼합</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">평가 기준:</span>
                  <span className="text-white">정답률 기반</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Target className="w-5 h-5 mr-2 text-green-400" />
                  평가 영역
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {['네트워크', '운영체제', '데이터베이스', '자료구조', '알고리즘'].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-slate-300">{category}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button onClick={handleStartTest} size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Brain className="w-5 h-5 mr-2" />
              테스트 시작하기
            </Button>
            <p className="text-xs text-slate-400 mt-2">
              테스트 시작 후에는 중단할 수 없습니다. 충분한 시간을 확보한 후 시작해주세요.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (testCompleted && results) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <div className="border-b border-slate-700 bg-slate-800/80 backdrop-blur">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="text-slate-300 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                메인으로
              </Button>
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-yellow-400" />
                <div>
                  <h1 className="text-lg font-semibold text-white">테스트 결과</h1>
                  <p className="text-sm text-slate-400">당신의 CS 실력 분석 결과입니다</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* 전체 점수 */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{results.score}</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-white">실력 등급: {results.level}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {results.correct}/{results.total} 문제 정답 ({results.score}점)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-400">{results.correct}</p>
                      <p className="text-sm text-slate-400">정답</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-400">{results.total - results.correct}</p>
                      <p className="text-sm text-slate-400">오답</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-400">{Math.floor(results.timeUsed / 60)}분</p>
                      <p className="text-sm text-slate-400">소요시간</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 영역별 분석 */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <BarChart className="w-5 h-5 mr-2" />
                    영역별 성과 분석
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(results.categoryScores).map(([category, score]: [string, any]) => {
                      const percentage = Math.round((score.correct / score.total) * 100);
                      return (
                        <div key={category}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-300">{category}</span>
                            <span className="text-sm text-slate-400">{score.correct}/{score.total} ({percentage}%)</span>
                          </div>
                          <Progress value={percentage} className="bg-slate-700" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* 문제별 리뷰 */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">문제별 상세 리뷰</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {questions.map((question, index) => {
                      const isCorrect = parseInt(answers[index]) === question.correct;
                      return (
                        <div key={question.id} className="border border-slate-700 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            {isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400 mt-1" />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                                  {question.category}
                                </Badge>
                                <Badge variant={question.difficulty === '고급' ? 'destructive' : question.difficulty === '중급' ? 'default' : 'secondary'}>
                                  {question.difficulty}
                                </Badge>
                              </div>
                              <p className="text-white mb-2">{question.question}</p>
                              <p className="text-sm text-slate-400 mb-2">
                                정답: {question.options[question.correct]}
                              </p>
                              <p className="text-sm text-slate-300">{question.explanation}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 사이드바 - 추천 학습 */}
            <div className="space-y-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                    추천 학습 계획
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(results.categoryScores)
                    .sort(([,a]: [string, any], [,b]: [string, any]) => (a.correct/a.total) - (b.correct/b.total))
                    .slice(0, 3)
                    .map(([category, score]: [string, any]) => (
                      <div key={category}>
                        <p className="text-sm font-medium text-slate-300">{category} 집중 학습</p>
                        <p className="text-xs text-slate-400 mb-2">
                          현재 {Math.round((score.correct / score.total) * 100)}% 수준
                        </p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full border-slate-600 text-slate-300"
                          onClick={() => navigate(`/chat?topic=${category}`)}
                        >
                          {category} 학습하기
                        </Button>
                      </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">다음 액션</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => navigate('/goals')}
                  >
                    학습 목표 설정하기
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-600 text-slate-300"
                    onClick={() => window.location.reload()}
                  >
                    테스트 다시 보기
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-600 text-slate-300"
                    onClick={() => navigate('/chat')}
                  >
                    AI 면접 연습하기
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header with timer */}
      <div className="border-b border-slate-700 bg-slate-800/80 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Brain className="w-6 h-6 text-purple-400" />
                <div>
                  <h1 className="text-lg font-semibold text-white">CS 실력 테스트</h1>
                  <p className="text-sm text-slate-400">문제 {currentQuestion + 1} / {questions.length}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">{formatTime(timeLeft)}</span>
              </div>
              <div className="w-32">
                <Progress value={progress} className="bg-slate-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                {question.category}
              </Badge>
              <Badge variant={question.difficulty === '고급' ? 'destructive' : question.difficulty === '중급' ? 'default' : 'secondary'}>
                {question.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-xl text-white">{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={answers[currentQuestion]} 
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="text-slate-300 cursor-pointer flex-1 p-3 rounded-lg border border-slate-700 hover:border-slate-600 hover:bg-slate-700/50"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="border-slate-600 text-slate-300"
              >
                이전 문제
              </Button>
              <Button 
                onClick={handleNext}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {currentQuestion === questions.length - 1 ? '테스트 완료' : '다음 문제'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkillTest;
