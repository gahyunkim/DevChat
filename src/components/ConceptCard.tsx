
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Target, ChevronDown, ChevronUp } from 'lucide-react';

interface ConceptCardProps {
  concept: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    estimatedTime: string;
    category: string;
    keyPoints: string[];
    prerequisites: string[];
    examples: string[];
  };
  onClick: () => void;
}

const ConceptCard = ({ concept, onClick }: ConceptCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-200 hover:shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-white mb-2">{concept.title}</CardTitle>
            <p className="text-slate-400 text-sm mb-3">{concept.description}</p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                {concept.difficulty}
              </Badge>
              <Badge variant="outline" className={getCategoryColor(concept.category)}>
                {concept.category}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {concept.estimatedTime}
            </span>
            <span className="flex items-center">
              <Target className="w-4 h-4 mr-1" />
              {concept.keyPoints.length}개 핵심 개념
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-slate-400 hover:text-white p-1"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        {isExpanded && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* Key Points */}
            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-blue-400" />
                핵심 개념
              </h4>
              <ul className="space-y-1">
                {concept.keyPoints.map((point, idx) => (
                  <li key={idx} className="text-slate-300 text-sm flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Prerequisites */}
            {concept.prerequisites.length > 0 && (
              <div>
                <h4 className="text-white font-semibold mb-2">선수 지식</h4>
                <div className="flex flex-wrap gap-1">
                  {concept.prerequisites.map((prereq, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs border-slate-600 text-slate-400">
                      {prereq}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Examples */}
            {concept.examples.length > 0 && (
              <div>
                <h4 className="text-white font-semibold mb-2">실무 예시</h4>
                <div className="flex flex-wrap gap-1">
                  {concept.examples.map((example, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs border-slate-600 text-slate-300">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <Button 
          onClick={onClick}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          학습 시작하기
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConceptCard;
