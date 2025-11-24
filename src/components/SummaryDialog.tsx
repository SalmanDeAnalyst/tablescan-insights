import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Calendar, MapPin, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { hygieneAPI, HygieneFilters } from '@/services/hygieneAPI';
import { toast } from 'sonner';

export const SummaryDialog = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<any>(null);
  const [filters, setFilters] = useState<HygieneFilters>({
    zone: '',
    startDate: '',
    endDate: '',
  });

  const handleFilterChange = (key: keyof HygieneFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      const data = await hygieneAPI.getSummary(filters);
      setSummaryData(data);
      toast.success('Summary generated successfully!');
    } catch (error) {
      toast.error('Failed to generate summary');
      console.error('Summary error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg"
        >
          <BarChart3 className="w-5 h-5 mr-2" />
          Generate Summary
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Hygiene Summary Report
          </DialogTitle>
          <DialogDescription>
            Configure filters to generate a detailed hygiene analysis report
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Filters Section */}
          <div className="bg-secondary/30 rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Filters
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zone" className="text-sm font-medium">
                  Location / Zone
                </Label>
                <Select 
                  value={filters.zone} 
                  onValueChange={(value) => handleFilterChange('zone', value)}
                >
                  <SelectTrigger id="zone">
                    <SelectValue placeholder="Select zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Zones</SelectItem>
                    <SelectItem value="dining-area-1">Dining Area 1</SelectItem>
                    <SelectItem value="dining-area-2">Dining Area 2</SelectItem>
                    <SelectItem value="bar-section">Bar Section</SelectItem>
                    <SelectItem value="outdoor-patio">Outdoor Patio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-sm font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Start Date
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-sm font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  End Date
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={handleGenerateSummary}
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-accent"
            >
              {loading ? 'Generating...' : 'Apply Filters & Generate'}
            </Button>
          </div>

          {/* Summary Results */}
          {summaryData && (
            <div className="space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                Results
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Avg. Cleaning Time</p>
                        <p className="text-3xl font-bold text-foreground font-mono">
                          {summaryData.avgCleaningTime || '4.2'}
                          <span className="text-lg text-muted-foreground ml-1">min</span>
                        </p>
                      </div>
                      <Clock className="w-8 h-8 text-primary opacity-60" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Hygiene Score</p>
                        <p className="text-3xl font-bold text-foreground font-mono">
                          {summaryData.hygieneScore || '87'}
                          <span className="text-lg text-muted-foreground ml-1">%</span>
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-accent opacity-60" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Violations</p>
                        <p className="text-3xl font-bold text-foreground font-mono">
                          {summaryData.violations || '3'}
                        </p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-warning opacity-60" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    Detailed Breakdown
                  </h4>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Total Tables Monitored:</span>
                      <span className="font-semibold">{summaryData.totalTables || '24'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Tables Cleaned On Time:</span>
                      <span className="font-semibold text-success">{summaryData.onTimeCleaning || '21'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Delayed Cleanings:</span>
                      <span className="font-semibold text-warning">{summaryData.delayedCleaning || '3'}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Reporting Period:</span>
                      <span className="font-semibold">
                        {filters.startDate || 'N/A'} to {filters.endDate || 'N/A'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
