import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MessageCircle, 
  Trophy, 
  TrendingUp, 
  ArrowLeft,
  Search,
  Crown,
  Medal,
  Star,
  Flame,
  Target,
  Send
} from 'lucide-react';

const Community = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for leaderboard
  const leaderboard = [
    {
      id: 1,
      name: '김개발',
      avatar: '/placeholder.svg',
      level: 'Expert',
      score: 2850,
      streak: 25,
      completedTopics: 45,
      rank: 1,
      badges: ['TCP Master', 'Algorithm Pro', 'Database Expert']
    },
    {
      id: 2,
      name: '박코딩',
      avatar: '/placeholder.svg',
      level: 'Advanced',
      score: 2650,
      streak: 18,
      completedTopics: 38,
      rank: 2,
      badges: ['Network Ninja', 'OS Expert']
    },
    {
      id: 3,
      name: '이프로그래머',
      avatar: '/placeholder.svg',
      level: 'Advanced',
      score: 2400,
      streak: 12,
      completedTopics: 32,
      rank: 3,
      badges: ['Data Structure Master', 'React Pro']
    },
    {
      id: 4,
      name: '최개발자',
      avatar: '/placeholder.svg',
      level: 'Intermediate',
      score: 2100,
      streak: 8,
      completedTopics: 28,
      rank: 4,
      badges: ['HTTP Master']
    },
    {
      id: 5,
      name: '정코더',
      avatar: '/placeholder.svg',
      level: 'Intermediate',
      score: 1950,
      streak: 15,
      completedTopics: 24,
      rank: 5,
      badges: ['Consistency King', 'TCP Learner']
    }
  ];

  // Mock data for study groups
  const studyGroups = [
    {
      id: 1,
      name: '네트워크 마스터 그룹',
      description: '네트워크 관련 CS 지식을 함께 공부하는 그룹',
      members: 24,
      level: 'Intermediate - Advanced',
      topics: ['TCP/UDP', 'HTTP/HTTPS', 'DNS', '네트워크 보안'],
      isJoined: true
    },
    {
      id: 2,
      name: '알고리즘 스터디',
      description: '코딩 테스트 대비 알고리즘 문제 해결',
      members: 18,
      level: 'All Levels',
      topics: ['정렬', '탐색', 'DP', '그래프'],
      isJoined: false
    },
    {
      id: 3,
      name: '면접 준비 스터디',
      description: '실제 면접 경험 공유 및 모의 면접',
      members: 32,
      level: 'Beginner - Intermediate',
      topics: ['면접 팁', '프로젝트 설명', 'CS 기초'],
      isJoined: false
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      user: '김개발',
      action: 'TCP vs UDP 주제에서 95점 획득',
      time: '2분 전',
      type: 'achievement'
    },
    {
      id: 2,
      user: '박코딩',
      action: '새로운 배지 "Database Expert" 획득',
      time: '15분 전',
      type: 'badge'
    },
    {
      id: 3,
      user: '이프로그래머',
      action: '연속 학습 20일 달성',
      time: '1시간 전',
      type: 'streak'
    },
    {
      id: 4,
      user: '최개발자',
      action: '네트워크 마스터 그룹에 참여',
      time: '2시간 전',
      type: 'group'
    }
  ];

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-slate-400">#{rank}</span>;
    }
  };

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Expert': return 'bg-purple-900 text-purple-300 border-purple-800';
      case 'Advanced': return 'bg-blue-900 text-blue-300 border-blue-800';
      case 'Intermediate': return 'bg-green-900 text-green-300 border-green-800';
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
                <Users className="w-6 h-6 text-blue-400" />
                <div>
                  <h1 className="text-lg font-semibold text-white">커뮤니티</h1>
                  <p className="text-sm text-slate-400">다른 학습자들과 함께 성장하세요</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="사용자 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white w-64"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs defaultValue="leaderboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
            <TabsTrigger value="leaderboard">랭킹</TabsTrigger>
            <TabsTrigger value="groups">스터디 그룹</TabsTrigger>
            <TabsTrigger value="activities">활동 피드</TabsTrigger>
            <TabsTrigger value="chat">실시간 채팅</TabsTrigger>
          </TabsList>

          {/* 랭킹 탭 */}
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                      전체 랭킹
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      학습 점수와 활동을 기반으로 한 전체 순위입니다
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaderboard.map((user) => (
                        <div key={user.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-slate-700/50 border border-slate-700">
                          <div className="flex items-center space-x-3">
                            {getRankIcon(user.rank)}
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="bg-slate-600 text-white">
                                {user.name[0]}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-white">{user.name}</h3>
                              <Badge className={getLevelColor(user.level)}>
                                {user.level}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-slate-400">
                              <span className="flex items-center">
                                <Star className="w-3 h-3 mr-1" />
                                {user.score}점
                              </span>
                              <span className="flex items-center">
                                <Flame className="w-3 h-3 mr-1" />
                                {user.streak}일
                              </span>
                              <span className="flex items-center">
                                <Target className="w-3 h-3 mr-1" />
                                {user.completedTopics}개 완료
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex flex-wrap gap-1 mb-2">
                              {user.badges.slice(0, 2).map((badge, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-300">
                                  {badge}
                                </Badge>
                              ))}
                              {user.badges.length > 2 && (
                                <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                                  +{user.badges.length - 2}
                                </Badge>
                              )}
                            </div>
                            <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                              프로필 보기
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 사이드바 - 내 랭킹 정보 */}
              <div className="space-y-6">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">내 랭킹</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-blue-400 mb-1">#12</div>
                      <Badge className="bg-green-900 text-green-300 border-green-800">
                        Intermediate
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">총 점수</span>
                        <span className="text-white">1,680점</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">연속 학습</span>
                        <span className="text-white">4일</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">완료한 주제</span>
                        <span className="text-white">18개</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">획득 배지</span>
                        <span className="text-white">5개</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">주간 목표</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">학습 일수</span>
                          <span className="text-slate-400">4/7</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '57%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">대화 횟수</span>
                          <span className="text-slate-400">12/20</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 스터디 그룹 탭 */}
          <TabsContent value="groups" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyGroups.map((group) => (
                <Card key={group.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">{group.name}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {group.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">멤버</span>
                        <span className="text-white">{group.members}명</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">수준</span>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {group.level}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400 mb-2">주요 주제:</p>
                        <div className="flex flex-wrap gap-1">
                          {group.topics.map((topic, index) => (
                            <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        className={`w-full ${group.isJoined ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                      >
                        {group.isJoined ? '참여 중' : '참여하기'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 활동 피드 탭 */}
          <TabsContent value="activities" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  최근 활동
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 border border-slate-700 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <div className="flex-1">
                        <p className="text-white">
                          <span className="font-semibold text-blue-400">{activity.user}</span>
                          {' '}님이 {activity.action}
                        </p>
                        <p className="text-xs text-slate-400">{activity.time}</p>
                      </div>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 실시간 채팅 탭 */}
          <TabsContent value="chat" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700 h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <MessageCircle className="w-5 h-5 mr-2 text-blue-400" />
                  실시간 채팅
                </CardTitle>
                <CardDescription className="text-slate-400">
                  다른 학습자들과 실시간으로 소통하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-4 bg-slate-900 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-slate-600 text-white text-xs">김</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-slate-300">
                        <span className="font-semibold text-blue-400">김개발</span>
                        <span className="text-xs text-slate-500 ml-2">10:30</span>
                      </p>
                      <p className="text-white">TCP 3-way handshake 관련해서 질문이 있어요!</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-slate-600 text-white text-xs">박</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-slate-300">
                        <span className="font-semibold text-green-400">박코딩</span>
                        <span className="text-xs text-slate-500 ml-2">10:32</span>
                      </p>
                      <p className="text-white">어떤 부분이 궁금하신가요? 설명해드릴게요!</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-slate-600 text-white text-xs">이</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-slate-300">
                        <span className="font-semibold text-purple-400">이프로그래머</span>
                        <span className="text-xs text-slate-500 ml-2">10:35</span>
                      </p>
                      <p className="text-white">저도 궁금했던 부분이에요. 함께 공부해요!</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 bg-slate-700 border-slate-600 text-white"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
