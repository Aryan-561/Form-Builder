import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  Eye, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link href="/dashboard" className="flex items-center gap-2 text-primary mb-2 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Back to Dashboard</span>
          </Link>
          <h2 className="font-sans text-3xl font-bold text-foreground">Analytics: Product Feedback Survey</h2>
          <p className="text-muted-foreground mt-1">Detailed performance breakdown for the Q3 customer satisfaction initiative.</p>
        </div>
        <div className="flex items-center gap-2 bg-card p-1 rounded-xl shadow-sm border border-border">
          <Button className="rounded-lg text-sm font-bold shadow-md">Last 30 Days</Button>
          <Button variant="ghost" className="rounded-lg text-sm font-medium text-muted-foreground">Last Quarter</Button>
          <Button variant="ghost" size="icon" className="rounded-lg text-muted-foreground">
            <Calendar className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm border-border">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Views</span>
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <Eye className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-4xl font-bold leading-none mb-2">1,248</h3>
              <p className="text-xs font-medium text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Responses</span>
              <div className="p-2 bg-secondary/50 text-secondary-foreground rounded-lg">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-4xl font-bold leading-none mb-2">852</h3>
              <p className="text-xs font-medium text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +8% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Completion Rate</span>
              <div className="p-2 bg-green-100 text-green-700 rounded-lg dark:bg-green-900/30 dark:text-green-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-4xl font-bold leading-none mb-2">68.2%</h3>
              <p className="text-xs font-medium text-destructive flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                -2.4% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Average Time</span>
              <div className="p-2 bg-muted text-muted-foreground rounded-lg">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-4xl font-bold leading-none mb-2">2m 14s</h3>
              <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                Stable across periods
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border-border">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>Where users drop off during the form flow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-foreground">1. Page Views</span>
                <span className="font-medium text-muted-foreground">1,248 (100%)</span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary/20 w-full"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-foreground">2. Started Form</span>
                <span className="font-medium text-muted-foreground">986 (79%)</span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary/50 w-[79%]"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-foreground">3. Completed Form</span>
                <span className="font-medium text-muted-foreground">852 (68.2%)</span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[68.2%]"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader>
            <CardTitle>Responses Over Time</CardTitle>
            <CardDescription>Daily response volume (Last 7 Days)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56 flex items-end justify-between gap-2 relative mt-2">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-border w-full h-px"></div>
                <div className="border-b border-border w-full h-px"></div>
                <div className="border-b border-border w-full h-px"></div>
                <div className="border-b border-border w-full h-px"></div>
              </div>
              <div className="w-full bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-sm h-[40%]" title="Mon: 120"></div>
              <div className="w-full bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-sm h-[55%]" title="Tue: 145"></div>
              <div className="w-full bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-sm h-[48%]" title="Wed: 132"></div>
              <div className="w-full bg-primary hover:bg-primary/90 transition-colors rounded-t-sm h-[75%]" title="Thu: 198"></div>
              <div className="w-full bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-sm h-[60%]" title="Fri: 160"></div>
              <div className="w-full bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-sm h-[30%]" title="Sat: 85"></div>
              <div className="w-full bg-primary/40 hover:bg-primary/50 transition-colors rounded-t-sm h-[90%]" title="Sun: 245"></div>
            </div>
            <div className="flex justify-between mt-4 text-xs font-medium text-muted-foreground">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
