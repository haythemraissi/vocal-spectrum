import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioUpload from "@/components/AudioUpload";
import EmotionResults from "@/components/EmotionResults";
import ModelMetrics from "@/components/ModelMetrics";
import { Brain, Mic, BarChart3, Waves } from "lucide-react";
import heroImage from "@/assets/hero-neural.jpg";

const Index = () => {
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleAnalysisComplete = (results: any) => {
    setAnalysisResults(results);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 text-center text-white space-y-6 px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-primary animate-pulse-neural" />
            <Waves className="w-10 h-10 text-neural-glow animate-float" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
            SER System
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Système de Reconnaissance des Émotions Vocales
          </p>
          
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            Analysez les émotions dans la voix humaine grâce à l'intelligence artificielle
            basée sur les datasets EmoDB et RAVDESS
          </p>
          
          <Button variant="neural" size="xl" className="mt-6">
            <Mic className="w-5 h-5 mr-2" />
            Commencer l'Analyse
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="analyze" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 max-w-lg mx-auto">
            <TabsTrigger value="analyze" className="flex items-center gap-2">
              <Mic className="w-4 h-4" />
              Analyser
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Résultats
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Métriques
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="space-y-8">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold">Analyse Audio</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Uploadez un fichier audio ou enregistrez votre voix pour détecter les émotions
                exprimées dans le discours.
              </p>
            </div>
            
            <AudioUpload onAnalysisComplete={handleAnalysisComplete} />
            
            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    IA Avancée
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Modèle d'apprentissage profond entraîné sur EmoDB et RAVDESS
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Waves className="w-5 h-5 text-neural" />
                    7 Émotions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Détection de joie, tristesse, colère, peur, neutralité, surprise, dégoût
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <BarChart3 className="w-5 h-5 text-success" />
                    87% Précision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Performance élevée validée sur des datasets de référence
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-8">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold">Résultats d'Analyse</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Visualisation détaillée des émotions détectées dans votre fichier audio
              </p>
            </div>
            
            {analysisResults ? (
              <EmotionResults results={analysisResults} />
            ) : (
              <Card className="max-w-2xl mx-auto">
                <CardContent className="text-center py-12">
                  <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucune analyse disponible</h3>
                  <p className="text-muted-foreground mb-4">
                    Commencez par analyser un fichier audio dans l'onglet "Analyser"
                  </p>
                  <Button variant="outline" onClick={() => {
                    const tab = document.querySelector('[value="analyze"]') as HTMLElement;
                    tab?.click();
                  }}>
                    Aller à l'analyse
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="metrics" className="space-y-8">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold">Métriques du Modèle</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Performance et statistiques détaillées du système SER
              </p>
            </div>
            
            <ModelMetrics />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Index;