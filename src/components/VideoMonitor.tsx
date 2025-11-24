import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Signal } from 'lucide-react';

export const VideoMonitor = () => {
  const [isLive] = useState(true);

  return (
    <Card className="overflow-hidden shadow-[var(--shadow-card)] transition-[var(--transition-smooth)] hover:shadow-[var(--shadow-elevated)]">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Live Monitoring
          </CardTitle>
          <Badge 
            variant={isLive ? "default" : "secondary"}
            className="flex items-center gap-1.5 bg-gradient-to-r from-primary to-accent"
          >
            <Signal className="w-3 h-3 animate-pulse" />
            {isLive ? 'LIVE' : 'OFFLINE'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border border-border">
          {/* Placeholder for video stream - replace with actual video element */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
            <div className="text-center space-y-2">
              <Activity className="w-12 h-12 mx-auto text-muted-foreground animate-pulse" />
              <p className="text-sm text-muted-foreground font-mono">
                Waiting for stream...
              </p>
              <p className="text-xs text-muted-foreground">
                YOLO detection output will appear here
              </p>
            </div>
          </div>
          
          {/* Overlay info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex items-center justify-between text-white text-sm">
              <div className="font-mono">
                <span className="opacity-75">FPS:</span> <span className="font-semibold">30</span>
              </div>
              <div className="font-mono">
                <span className="opacity-75">Detections:</span> <span className="font-semibold">0</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Tables Detected</p>
            <p className="text-2xl font-bold text-foreground font-mono">0</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Occupied</p>
            <p className="text-2xl font-bold text-foreground font-mono">0</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Cleaning</p>
            <p className="text-2xl font-bold text-accent font-mono">0</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
