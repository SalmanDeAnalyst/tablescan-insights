import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileVideo, CheckCircle2, AlertCircle } from 'lucide-react';
import { hygieneAPI } from '@/services/hygieneAPI';
import { toast } from 'sonner';

export const VideoUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith('video/')) {
        toast.error('Please select a valid video file');
        return;
      }
      setFile(selectedFile);
      setUploadStatus('idle');
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadStatus('idle');
    
    try {
      await hygieneAPI.uploadVideo(file, (progressValue) => {
        setProgress(progressValue);
      });
      
      setUploadStatus('success');
      toast.success('Video uploaded successfully! Analysis in progress...');
      
      // Reset after success
      setTimeout(() => {
        setFile(null);
        setProgress(0);
        setUploadStatus('idle');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 3000);
    } catch (error) {
      setUploadStatus('error');
      toast.error('Failed to upload video. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Card className="shadow-[var(--shadow-card)] transition-[var(--transition-smooth)] hover:shadow-[var(--shadow-elevated)]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          Video Upload
        </CardTitle>
        <CardDescription>
          Upload recorded footage for hygiene analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
          id="video-upload"
        />
        
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary hover:bg-secondary/50"
        >
          {file ? (
            <div className="space-y-2">
              <FileVideo className="w-12 h-12 mx-auto text-primary" />
              <p className="text-sm font-medium text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground font-mono">
                {formatFileSize(file.size)}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to select video file
              </p>
              <p className="text-xs text-muted-foreground">
                Supported formats: MP4, AVI, MOV
              </p>
            </div>
          )}
        </div>

        {file && (
          <div className="space-y-3">
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Uploading...</span>
                  <span className="font-mono font-semibold text-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
            
            {uploadStatus === 'success' && (
              <div className="flex items-center gap-2 text-sm text-success bg-success/10 p-3 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
                <span>Upload successful!</span>
              </div>
            )}
            
            {uploadStatus === 'error' && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span>Upload failed. Please try again.</span>
              </div>
            )}
            
            <Button
              onClick={handleUpload}
              disabled={uploading || uploadStatus === 'success'}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
              size="lg"
            >
              {uploading ? 'Processing...' : 'Start Analysis'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
