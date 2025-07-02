import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, ArrowLeft, Clock, MessageCircle, BarChart3, Calendar, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const History = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const historyData = [
    {
      id: 1,
      topic: 'TCP vs UDP',
      persona: '전공 취준생',
      date: '2024-07-01',
      duration: '15분',
      messageCount: 8,
      score: 85,
      status: 'completed',
      difficulty: '중급',
      category: '네트워크'
    },
    {
      id: 2,
      topic: 'HTTP/HTTPS',
      persona: '비전공 취준생',
      date: '2024-06-30',
      duration: '12분',
      messageCount: 6,
      score: 78,
      status: 'completed',
      difficulty: '초급',
      category: '웹'
    },
    {
      id: 3,
      topic: '캐시와 쿠키',
      persona: '주니어 개발자',
      date: '2024-06-29',
      duration: '18분',
      messageCount: 10,
      score: 82,
      status: 'completed',
      difficulty: '중급',
      category: '웹'
    },
    {
      id: 4,
      topic: '데이터베이스 인덱스',
      persona: '전공 취준생',
      date: '2024-06-28',
      duration: '20분',
      messageCount: 12,
      score: 75,
      status: 'incomplete',
      difficulty: '고급',
      category: '데이터베이스'
    },
    {
      id: 5,
      topic: 'REST API',
      persona: '주니어 개발자',
      date: '2024-06-27',
      duration: '10분',
      messageCount: 4,
      score: 0,
      status: 'incomplete',
      difficulty: '중급',
      category: '웹'
    },
    {
      id: 6,
      topic: '운영체제 스케줄링',
      persona: '전공 취준생',
      date: '2024-06-26',
      duration: '25분',
      messageCount: 15,
      score: 90,
      status: 'completed',
      difficulty: '고급',
      category: '운영체제'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '초급': return 'bg-green-900 text-green-300 border-green-800';
      case '중급': return 'bg-yellow-900 text-yellow-300 border-yellow-800';
      case '고급': return 'bg-red-900 text-red-300 border-red-800';
      default: return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '네트워크': return 'bg-blue-900 text-blue-300 border-blue-800';
      case '웹': return 'bg-purple-900 text-purple-300 border-purple-800';
      case '데이터베이스': return 'bg-orange-900 text-orange-300 border-orange-800';
      case '운영체제': return 'bg-cyan-900 text-cyan-300 border-cyan-800';
      default: return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  const getPersonaColor = (persona: string) => {
    switch (persona) {
      case '전공 취준생': return 'bg-blue-900 text-blue-300';
      case '비전공 취준생': return 'bg-green-900 text-green-300';
      case '주니어 개발자': return 'bg-purple-900 text-purple-300';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-900 text-green-300 border-green-800';
      case 'incomplete': return 'bg-orange-900 text-orange-300 border-orange-800';
      default: return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  const filteredHistory = historyData.filter(item => {
    const matchesSearch = item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'completed') return matchesSearch && item.status === 'completed';
    if (selectedFilter === 'incomplete') return matchesSearch && item.status === 'incomplete';
    
    return matchesSearch;
  });

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
                <MessageCircle className="w-6 h-6 text-blue-400" />
                <div>
                  <h1 className="text-lg font-semibold text-white">학습 히스토리</h1>
                  <p className="text-sm text-slate-400">지금까지의 학습 기록을 확인하세요</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 검색 및 필터 */}
        <Card className="mb-8 bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="주제나 카테고리로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <div className="flex space-x-2">
                  {[
                    { key: 'all', label: '전체' },
                    { key: 'completed', label: '완료' },
                    { key: 'incomplete', label: '미완료' }
                  ].map(filter => (
                    <Button
                      key={filter.key}
                      variant={selectedFilter === filter.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(filter.key)}
                      className={selectedFilter === filter.key 
                        ? "bg-blue-600 hover:bg-blue-700" 
                        : "border-slate-600 text-slate-800 hover:text-blue-700"
                      }
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 통계 요약 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">총 대화 수</p>
                  <p className="text-2xl font-bold text-white">{historyData.length}개</p>
                </div>
                <MessageCircle className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">완료율</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.round((historyData.filter(h => h.status === 'completed').length / historyData.length) * 100)}%
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">평균 점수</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.round(historyData.filter(h => h.score > 0).reduce((acc, h) => acc + h.score, 0) / 
                    historyData.filter(h => h.score > 0).length)}점
                  </p>
                </div>
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">총 학습 시간</p>
                  <p className="text-2xl font-bold text-white">
                    {historyData.reduce((acc, h) => acc + parseInt(h.duration), 0)}분
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 히스토리 목록 */}
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{item.topic}</h3>
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge variant="outline" className={getCategoryColor(item.category)}>
                            {item.category}
                          </Badge>
                          <Badge variant="outline" className={getDifficultyColor(item.difficulty)}>
                            {item.difficulty}
                          </Badge>
                          <Badge variant="outline" className={getPersonaColor(item.persona)}>
                            {item.persona}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(item.status)}>
                            {item.status === 'completed' ? '완료' : '미완료'}
                          </Badge>
                        </div>
                      </div>
                      {item.score > 0 && (
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">{item.score}점</div>
                          <div className="text-sm text-slate-400">최종 점수</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {item.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {item.duration}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {item.messageCount}개 메시지
                      </div>
                      <div className="flex items-center">
                        <Brain className="w-4 h-4 mr-2" />
                        {item.persona}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-slate-600 text-slate-800 hover:text-blue-700"
                    onClick={() => navigate(`/study?topic=${item.id}&score=${item.score}`)}
                  >
                    복습하기
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-slate-600 text-slate-800 hover:text-blue-700"
                    onClick={() => navigate(`/chat?persona=${item.persona.toLowerCase().replace(' ', '')}&topic=${item.id}`)}
                  >
                    다시 대화하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-12 text-center">
              <MessageCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">검색 결과가 없습니다</h3>
              <p className="text-slate-400 mb-6">다른 검색어를 시도해보거나 필터를 변경해보세요.</p>
              <Button onClick={() => {setSearchTerm(''); setSelectedFilter('all');}} className="bg-blue-600 hover:bg-blue-700">
                초기화
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <Card className="mt-8 bg-gradient-to-r from-blue-900/50 to-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-3">새로운 학습을 시작해보세요! 🚀</h3>
              <p className="text-slate-300 mb-6">다양한 CS 주제로 AI와 대화하며 면접 실력을 키워보세요.</p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate('/')}>
                <Brain className="w-4 h-4 mr-2" />
                새 대화 시작
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default History;