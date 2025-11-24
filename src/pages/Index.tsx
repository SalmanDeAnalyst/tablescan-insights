import { VideoMonitor } from '@/components/VideoMonitor';
import { VideoUpload } from '@/components/VideoUpload';
import { SummaryDialog } from '@/components/SummaryDialog';
import { Shield, Activity } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Hygiene Monitor
                </h1>
                <p className="text-xs text-muted-foreground">
                  Restaurant Analysis System
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 bg-success/10 text-success px-3 py-1.5 rounded-full border border-success/20">
                <Activity className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-medium">System Active</span>
              </div>
              <SummaryDialog />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Monitor - Left Column */}
          <div className="space-y-6">
            <VideoMonitor />
          </div>

          {/* Upload Section - Right Column */}
          <div className="space-y-6">
            <VideoUpload />
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-lg p-4 shadow-[var(--shadow-card)] border border-border">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                  Today's Avg
                </p>
                <p className="text-2xl font-bold text-foreground font-mono">3.8 min</p>
                <p className="text-xs text-success mt-1">↓ 12% from yesterday</p>
              </div>
              
              <div className="bg-card rounded-lg p-4 shadow-[var(--shadow-card)] border border-border">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                  Compliance
                </p>
                <p className="text-2xl font-bold text-foreground font-mono">94%</p>
                <p className="text-xs text-success mt-1">↑ 3% from last week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by YOLO Detection • Real-time Monitoring • Automated Analysis
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
