import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  ArrowLeft, 
  BookOpen, 
  Edit, 
  Trash2, 
  Play,
  Save,
  Search,
  Filter,
  Star,
  Clock,
  Target
} from 'lucide-react';
import { toast } from 'sonner';

const CustomTopics = () => {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [newTopic, setNewTopic] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    estimatedTime: '',
    keyPoints: '',
    context: ''
  });

  // Mock data for custom topics
  const [customTopics, setCustomTopics] = useState([
    {
      id: 1,
      title: 'React Hooks 심화',
      description: 'useEffect, useCallback, useMemo 등 고급 React Hooks 사용법',
      category: '프론트엔드',
      difficulty: '중급',
      estimatedTime: '20분',
      keyPoints: ['useEffect 의존성 배열', 'useCallback 최적화', 'useMemo 메모이제이션', '커스텀 훅 생성'],
      context: 'React 함수형 컴포넌트에서 상태 관리와 사이드 이펙트를 효율적으로 처리하는 방법에 대해 깊이 있게 학습합니다.',
      createdAt: '2025-01-01',
      lastUsed: '2025-01-05',
      usageCount: 3,
      isFavorite: true
    },
    {
      id: 2,
      title: 'NoSQL vs SQL 비교',
      description: 'MongoDB와 MySQL의 차이점과 각각의 사용 사례',
      category: '데이터베이스',
      difficulty: '중급',
      estimatedTime: '25분',
      keyPoints: ['스키마 설계 차이', '확장성 비교', 'ACID vs BASE', '사용 사례 분석'],
      context: '관계형 데이터베이스와 NoSQL 데이터베이스의 근본적인 차이점을 이해하고, 프로젝트에 적합한 데이터베이스를 선택하는 기준을 학습합니다.',
      createdAt: '2024-12-28',
      lastUsed: '2025-01-03',
      usageCount: 5,
      isFavorite: false
    },
    {
      id: 3,
      title: 'Docker 컨테이너 최적화',
      description: 'Docker 이미지 크기 줄이기와 성능 최적화 기법',
      category: 'DevOps',
      difficulty: '고급',
      estimatedTime: '30분',
      keyPoints: ['멀티 스테이지 빌드', '.dockerignore 활용', '이미지 레이어 최적화', '보안 설정'],
      context: 'Docker 컨테이너를 프로덕션 환경에서 효율적으로 운영하기 위한 최적화 기법들을 실무 중심으로 학습합니다.',
      createdAt: '2024-12-25',
      lastUsed: '2025-01-02',
      usageCount: 2,
      isFavorite: true
    }
  ]);

  const categories = ['프론트엔드', '백엔드', '데이터베이스', 'DevOps', '모바일', '보안', '기타'];
  const difficulties = ['초급', '중급', '고급'];

  const handleCreateTopic = () => {
    if (!newTopic.title || !newTopic.category || !newTopic.difficulty) {
      toast.error('필수 항목을 모두 입력해주세요!');
      return;
    }

    const topic = {
      id: customTopics.length + 1,
      title: newTopic.title,
      description: newTopic.description,
      category: newTopic.category,
      difficulty: newTopic.difficulty,
      estimatedTime: newTopic.estimatedTime || '15분',
      keyPoints: newTopic.keyPoints.split('\n').filter(point => point.trim()),
      context: newTopic.context,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: null,
      usageCount: 0,
      isFavorite: false
    };

    setCustomTopics([topic, ...customTopics]);
    setNewTopic({
      title: '',
      description: '',
      category: '',
      difficulty: '',
      estimatedTime: '',
      keyPoints: '',
      context: ''
    });
    setShowCreateForm(false);
    toast.success('새로운 주제가 생성되었습니다!');
  };

  const handleDeleteTopic = (id: number) => {
    setCustomTopics(customTopics.filter(topic => topic.id !== id));
    toast.success('주제가 삭제되었습니다.');
  };

  const handleToggleFavorite = (id: number) => {
    setCustomTopics(customTopics.map(topic => 
      topic.id === id ? { ...topic, isFavorite: !topic.isFavorite } : topic
    ));
  };

  const handleStartChat = (topicId: number) => {
    const topic = customTopics.find(t => t.id === topicId);
    if (topic) {
      // Update usage stats
      setCustomTopics(customTopics.map(t => 
        t.id === topicId 
          ? { ...t, usageCount: t.usageCount + 1, lastUsed: new Date().toISOString().split('T')[0] }
          : t
      ));
      navigate(`/chat?customTopic=${topicId}`);
    }
  };

  const filteredTopics = customTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || topic.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case '고급': return 'bg-red-900 text-red-300 border-red-800';
      case '중급': return 'bg-yellow-900 text-yellow-300 border-yellow-800';
      case '초급': return 'bg-green-900 text-green-300 border-green-800';
      default: return 'bg-slate-700 text-slate-300 border-slate-600';
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
                돌아가기
              </Button>
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-green-400" />
                <div>
                  <h1 className="text-lg font-semibold text-white">커스텀 주제</h1>
                  <p className="text-sm text-slate-400">나만의 학습 주제를 만들고 관리하세요</p>
                </div>
              </div>
            </div>
            <Button onClick={() => setShowCreateForm(!showCreateForm)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              새 주제 만들기
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 주제 생성 폼 */}
        {showCreateForm && (
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">새 주제 생성</CardTitle>
              <CardDescription className="text-slate-400">
                AI와 대화할 커스텀 주제를 만들어보세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">주제 제목 *</label>
                  <Input
                    placeholder="예: React 성능 최적화"
                    value={newTopic.title}
                    onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">예상 시간</label>
                  <Input
                    placeholder="예: 20분"
                    value={newTopic.estimatedTime}
                    onChange={(e) => setNewTopic({...newTopic, estimatedTime: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-2 block">주제 설명</label>
                <Textarea
                  placeholder="이 주제에서 다룰 내용을 간단히 설명해주세요"
                  value={newTopic.description}
                  onChange={(e) => setNewTopic({...newTopic, description: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">카테고리 *</label>
                  <Select value={newTopic.category} onValueChange={(value) => setNewTopic({...newTopic, category: value})}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">난이도 *</label>
                  <Select value={newTopic.difficulty} onValueChange={(value) => setNewTopic({...newTopic, difficulty: value})}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="난이도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-2 block">주요 포인트 (줄바꿈으로 구분)</label>
                <Textarea
                  placeholder="예:&#10;React.memo 사용법&#10;useCallback과 useMemo 차이&#10;리렌더링 최적화 기법"
                  value={newTopic.keyPoints}
                  onChange={(e) => setNewTopic({...newTopic, keyPoints: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-2 block">학습 컨텍스트</label>
                <Textarea
                  placeholder="AI가 어떤 관점에서 이 주제를 다뤄야 하는지 설명해주세요"
                  value={newTopic.context}
                  onChange={(e) => setNewTopic({...newTopic, context: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  rows={3}
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleCreateTopic} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  주제 생성
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)} className="border-slate-600 text-slate-800 hover:text-blue-700">
                  취소
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 검색 및 필터 */}
        <div className="flex space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="주제 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-white"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 카테고리</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 주제 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <Card key={topic.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-white text-lg">{topic.title}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleFavorite(topic.id)}
                        className="p-1 h-6 w-6"
                      >
                        <Star className={`w-4 h-4 ${topic.isFavorite ? 'text-yellow-400 fill-current' : 'text-slate-400'}`} />
                      </Button>
                    </div>
                    <CardDescription className="text-slate-400 mb-3">
                      {topic.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                    {topic.category}
                  </Badge>
                  <Badge className={getDifficultyColor(topic.difficulty)}>
                    {topic.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {topic.estimatedTime}
                    </span>
                    <span className="flex items-center">
                      <Target className="w-3 h-3 mr-1" />
                      {topic.usageCount}회 사용
                    </span>
                  </div>

                  {topic.keyPoints.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-slate-300 mb-1">주요 포인트:</p>
                      <div className="space-y-1">
                        {topic.keyPoints.slice(0, 3).map((point, index) => (
                          <div key={index} className="flex items-center text-xs text-slate-400">
                            <div className="w-1 h-1 bg-slate-500 rounded-full mr-2" />
                            {point}
                          </div>
                        ))}
                        {topic.keyPoints.length > 3 && (
                          <p className="text-xs text-slate-500">+{topic.keyPoints.length - 3}개 더</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleStartChat(topic.id)}
                    >
                      <Play className="w-3 h-3 mr-1" />
                      시작
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-800 hover:text-blue-700">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-slate-600 text-slate-800 hover:text-blue-700"
                      onClick={() => handleDeleteTopic(topic.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">주제가 없습니다</h3>
            <p className="text-slate-400 mb-4">
              {searchQuery || filterCategory !== 'all' 
                ? '검색 조건에 맞는 주제를 찾을 수 없습니다.' 
                : '첫 번째 커스텀 주제를 만들어보세요!'}
            </p>
            {!showCreateForm && (
              <Button onClick={() => setShowCreateForm(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                주제 만들기
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTopics;
