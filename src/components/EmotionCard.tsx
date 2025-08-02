import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface EmotionCardProps {
  emotion: string;
  confidence: number;
  color: string;
  isActive?: boolean;
}

const EmotionCard = ({ emotion, confidence, color, isActive = false }: EmotionCardProps) => {
  const getEmotionIcon = (emotion: string) => {
    const icons = {
      happy: "😊",
      sad: "😢", 
      angry: "😠",
      fear: "😨",
      neutral: "😐",
      surprise: "😲",
      disgust: "🤢"
    };
    return icons[emotion.toLowerCase() as keyof typeof icons] || "🎭";
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${isActive ? 'ring-2 ring-primary animate-pulse-neural' : ''}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getEmotionIcon(emotion)}</span>
            <span className="capitalize font-medium">{emotion}</span>
          </div>
          <Badge 
            variant={isActive ? "default" : "secondary"} 
            className={isActive ? "neural-gradient" : ""}
          >
            {(confidence * 100).toFixed(1)}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress 
            value={confidence * 100} 
            className="h-2"
            style={{
              ['--progress-background' as any]: color,
            }}
          />
          <div className="text-xs text-muted-foreground">
            Confidence: {(confidence * 100).toFixed(2)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionCard;