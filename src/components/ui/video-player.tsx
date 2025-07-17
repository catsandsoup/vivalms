import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings,
  SkipBack,
  SkipForward
} from "lucide-react";

interface VideoPlayerProps {
  title: string;
  duration?: string;
  onComplete?: () => void;
  className?: string;
}

export default function VideoPlayer({ 
  title, 
  duration = "0:00",
  onComplete,
  className = "" 
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control actual video playback
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Card className={`card-viva overflow-hidden ${className}`}>
      {/* Video Display Area */}
      <div className="relative aspect-video bg-black flex items-center justify-center">
        {/* Placeholder for actual video */}
        <div className="text-center text-white">
          <div className="mb-4">
            <Button
              onClick={togglePlay}
              size="lg"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full w-16 h-16"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </Button>
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-white/80 text-sm">
            Interactive video player - Click play to start
          </p>
        </div>

        {/* Video Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="w-full bg-white/20 rounded-full h-1 cursor-pointer">
              <div 
                className="bg-white h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                onClick={togglePlay}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <SkipBack size={16} />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <SkipForward size={16} />
              </Button>

              <Button
                onClick={toggleMute}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </Button>

              <span className="text-white text-sm ml-2">
                {currentTime} / {duration}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Settings size={16} />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Maximize size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4 bg-muted/30">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Duration: {duration}</span>
          <span>Quality: HD</span>
        </div>
      </div>
    </Card>
  );
}