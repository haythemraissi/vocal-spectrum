import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Zap, Database } from "lucide-react";

const ModelMetrics = () => {
  const metrics = [
    {
      name: "Précision Globale",
      value: 87.3,
      description: "Performance générale sur les datasets de test",
      icon: Target,
      color: "hsl(142 76% 36%)"
    },
    {
      name: "Rappel (Recall)",
      value: 84.7,
      description: "Capacité à identifier correctement les émotions",
      icon: TrendingUp,
      color: "hsl(216 100% 50%)"
    },
    {
      name: "F1-Score",
      value: 85.9,
      description: "Mesure harmonique entre précision et rappel",
      icon: Zap,
      color: "hsl(263 70% 50%)"
    },
    {
      name: "Vitesse d'Analyse",
      value: 92.1,
      description: "Temps de traitement optimisé",
      icon: Zap,
      color: "hsl(51 100% 60%)"
    }
  ];

  const datasetInfo = [
    {
      name: "EmoDB",
      samples: "535 échantillons",
      emotions: "7 émotions",
      language: "Allemand",
      accuracy: "89.2%"
    },
    {
      name: "RAVDESS", 
      samples: "1440 échantillons",
      emotions: "8 émotions", 
      language: "Anglais",
      accuracy: "85.4%"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card className="neural-gradient text-neural-foreground">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Database className="w-8 h-8" />
            Métriques du Modèle SER
          </CardTitle>
          <CardDescription className="text-neural-foreground/80">
            Performance et statistiques du système de reconnaissance émotionnelle
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.name} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" style={{ color: metric.color }} />
                    <span className="text-sm">{metric.name}</span>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    {metric.value}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={metric.value} 
                  className="h-2 mb-2"
                  style={{
                    ['--progress-background' as any]: metric.color,
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Dataset Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {datasetInfo.map((dataset) => (
          <Card key={dataset.name}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Dataset {dataset.name}</span>
                <Badge variant="secondary">{dataset.accuracy}</Badge>
              </CardTitle>
              <CardDescription>
                Base de données d'entraînement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Échantillons</div>
                  <div className="font-medium">{dataset.samples}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Émotions</div>
                  <div className="font-medium">{dataset.emotions}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Langue</div>
                  <div className="font-medium">{dataset.language}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Précision</div>
                  <Badge variant="outline">{dataset.accuracy}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Confusion Matrix Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Matrice de Confusion - Aperçu</CardTitle>
          <CardDescription>
            Distribution des prédictions par classe d'émotion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 text-center">
            {["Happy", "Sad", "Angry", "Neutral"].map((emotion) => (
              <div key={emotion} className="space-y-2">
                <div className="text-sm font-medium">{emotion}</div>
                <div className="h-8 bg-primary/20 rounded flex items-center justify-center text-xs">
                  {Math.floor(Math.random() * 30 + 70)}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelMetrics;