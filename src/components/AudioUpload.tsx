import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, Mic, Play, Pause, FileAudio } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AudioUploadProps {
  onAnalysisComplete: (results: any) => void;
}

const AudioUpload = ({ onAnalysisComplete }: AudioUploadProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setSelectedFile(file);
        toast({
          title: "Fichier audio sélectionné",
          description: `${file.name} prêt pour l'analyse`,
        });
      } else {
        toast({
          title: "Format invalide",
          description: "Veuillez sélectionner un fichier audio valide",
          variant: "destructive",
        });
      }
    }
  };

  const analyzeAudio = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    setUploadProgress(0);

    // Simulation d'analyse
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulation de résultats d'analyse
          const mockResults = {
            emotions: [
              { name: "happy", confidence: 0.75, color: "hsl(51 100% 60%)" },
              { name: "neutral", confidence: 0.15, color: "hsl(210 11% 71%)" },
              { name: "surprise", confidence: 0.10, color: "hsl(39 100% 57%)" },
            ],
            dominantEmotion: "happy",
            audioDetails: {
              duration: "3.2s",
              format: selectedFile.type,
              size: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
            }
          };
          
          onAnalysisComplete(mockResults);
          setIsAnalyzing(false);
          setUploadProgress(0);
          
          toast({
            title: "Analyse terminée",
            description: "Résultats disponibles ci-dessous",
          });
          
          return 0;
        }
        return prev + 2;
      });
    }, 50);
  };

  const startRecording = () => {
    setIsRecording(true);
    toast({
      title: "Enregistrement démarré",
      description: "Parlez maintenant...",
    });
    
    // Simulation d'enregistrement
    setTimeout(() => {
      setIsRecording(false);
      toast({
        title: "Enregistrement terminé",
        description: "Audio enregistré avec succès",
      });
    }, 3000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <FileAudio className="w-6 h-6 text-primary" />
          Analyse d'Émotions Vocales
        </CardTitle>
        <CardDescription>
          Uploadez un fichier audio ou enregistrez votre voix pour analyser les émotions
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* File Upload */}
        <div className="space-y-4">
          <Button
            variant="upload"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-24 text-lg"
            disabled={isAnalyzing}
          >
            <Upload className="w-8 h-8 mr-3" />
            <div>
              <div>Sélectionner un fichier audio</div>
              <div className="text-sm text-muted-foreground">MP3, WAV, M4A, etc.</div>
            </div>
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          {selectedFile && (
            <div className="text-center space-y-2">
              <div className="text-sm text-muted-foreground">
                Fichier sélectionné: {selectedFile.name}
              </div>
              <Button 
                variant="neural" 
                onClick={analyzeAudio}
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? "Analyse en cours..." : "Analyser l'Émotion"}
              </Button>
            </div>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Ou</span>
          </div>
        </div>

        {/* Voice Recording */}
        <div className="text-center space-y-4">
          <Button
            variant={isRecording ? "destructive" : "secondary"}
            onClick={startRecording}
            disabled={isAnalyzing}
            className="w-full h-16 text-lg"
          >
            <Mic className={`w-6 h-6 mr-3 ${isRecording ? 'animate-pulse' : ''}`} />
            {isRecording ? "Enregistrement..." : "Enregistrer la Voix"}
          </Button>
        </div>

        {/* Progress Bar */}
        {isAnalyzing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Analyse en cours...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AudioUpload;