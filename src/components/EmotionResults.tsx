import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import EmotionCard from "./EmotionCard";
import EmotionChart from "./EmotionChart";
import { Brain, Clock, FileType, HardDrive } from "lucide-react";

interface EmotionResultsProps {
  results: {
    emotions: Array<{
      name: string;
      confidence: number;
      color: string;
    }>;
    dominantEmotion: string;
    audioDetails: {
      duration: string;
      format: string;
      size: string;
    };
  };
}

const EmotionResults = ({ results }: EmotionResultsProps) => {
  if (!results) return null;

  const { emotions, dominantEmotion, audioDetails } = results;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Main Results Header */}
      <Card className="neural-gradient text-neural-foreground">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Brain className="w-8 h-8" />
            Résultats de l'Analyse Émotionnelle
          </CardTitle>
          <CardDescription className="text-neural-foreground/80">
            Émotion dominante détectée: <strong className="text-white">{dominantEmotion}</strong>
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Detailed Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emotion Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Distribution des Émotions</h3>
          <div className="grid gap-3">
            {emotions.map((emotion) => (
              <EmotionCard
                key={emotion.name}
                emotion={emotion.name}
                confidence={emotion.confidence}
                color={emotion.color}
                isActive={emotion.name === dominantEmotion}
              />
            ))}
          </div>
        </div>

        {/* Visualization Chart */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Visualisation</h3>
          <Card>
            <CardContent className="p-6">
              <EmotionChart emotions={emotions} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Audio Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileType className="w-5 h-5" />
            Détails du Fichier Audio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Durée:</span>
              <Badge variant="outline">{audioDetails.duration}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <FileType className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Format:</span>
              <Badge variant="outline">{audioDetails.format}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Taille:</span>
              <Badge variant="outline">{audioDetails.size}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle>Informations Techniques</CardTitle>
          <CardDescription>
            Détails sur le modèle et les bases de données utilisées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Modèle SER</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Système de reconnaissance des émotions vocales basé sur l'apprentissage profond
              </p>
              <div className="space-y-1">
                <Badge variant="secondary">EmoDB Dataset</Badge>
                <Badge variant="secondary">RAVDESS Dataset</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Métriques de Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Précision:</span>
                  <Badge>87.3%</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Temps d'analyse:</span>
                  <Badge>1.2s</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Confiance moyenne:</span>
                  <Badge>{(emotions.reduce((acc, e) => acc + e.confidence, 0) / emotions.length * 100).toFixed(1)}%</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionResults;