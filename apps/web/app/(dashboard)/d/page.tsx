"use client";
import {
  FileText,
  MessageSquare,
  Eye,
  TrendingUp,
  PlusCircle,
  LayoutTemplate,
  MoreVertical,
  Calendar,
  Box,
  Mail,
  CalendarDays,
  ShoppingCart,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-sans text-3xl font-bold text-foreground">Good morning, Alex</h2>
          <p className="text-lg text-muted-foreground mt-1">
            Here's what's happening with your forms today.
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2 rounded-lg">
          <Calendar className="w-4 h-4" />
          Last 30 Days
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm border-border">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total Forms
              </span>
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold leading-tight">24</div>
              <div className="flex items-center gap-1 text-xs font-medium text-green-600 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+3 this month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total Responses
              </span>
              <div className="p-2 bg-secondary/50 text-secondary-foreground rounded-lg">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold leading-tight">1,284</div>
              <div className="flex items-center gap-1 text-xs font-medium text-green-600 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+12% vs last period</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total Views
              </span>
              <div className="p-2 bg-muted text-muted-foreground rounded-lg">
                <Eye className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold leading-tight">4,892</div>
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mt-1">
                <span>Stable</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Conversion Rate
              </span>
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold leading-tight">68.4%</div>
              <div className="flex items-center gap-1 text-xs font-medium text-green-600 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+2.1% spike</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm border-border">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">Response Trends</CardTitle>
                <CardDescription>Engagement over the last 7 days</CardDescription>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-xs font-medium text-primary">Responses</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-4 relative mt-4">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-border w-full h-px"></div>
                <div className="border-b border-border w-full h-px"></div>
                <div className="border-b border-border w-full h-px"></div>
                <div className="border-b border-border w-full h-px"></div>
              </div>
              <div
                className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[40%]"
                title="Mon: 120"
              ></div>
              <div
                className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[55%]"
                title="Tue: 145"
              ></div>
              <div
                className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[48%]"
                title="Wed: 132"
              ></div>
              <div
                className="flex-1 bg-primary/20 hover:bg-primary/30 transition-colors rounded-t-lg h-[75%]"
                title="Thu: 198"
              ></div>
              <div
                className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[60%]"
                title="Fri: 160"
              ></div>
              <div
                className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[30%]"
                title="Sat: 85"
              ></div>
              <div
                className="flex-1 bg-primary/40 hover:bg-primary/50 transition-colors rounded-t-lg h-[90%]"
                title="Sun: 245"
              ></div>
            </div>
            <div className="flex justify-between mt-4 text-xs font-medium text-muted-foreground px-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <button className="flex-1 group bg-primary/10 hover:bg-primary/15 border border-primary/20 p-8 rounded-2xl flex flex-col justify-between items-start overflow-hidden relative active:scale-95 transition-all text-left">
            <PlusCircle className="text-primary w-10 h-10 mb-4" />
            <div>
              <h3 className="font-sans text-xl font-bold text-foreground mb-1">
                Create Blank Form
              </h3>
              <p className="text-sm text-muted-foreground">
                Start from scratch with our drag-and-drop builder.
              </p>
            </div>
          </button>

          <button className="flex-1 group bg-card hover:bg-accent border border-border p-8 rounded-2xl flex flex-col justify-between items-start overflow-hidden relative active:scale-95 transition-all text-left">
            <LayoutTemplate className="text-muted-foreground w-10 h-10 mb-4" />
            <div>
              <h3 className="font-sans text-xl font-bold text-foreground mb-1">Browse Templates</h3>
              <p className="text-sm text-muted-foreground">
                Choose from 100+ high-converting designs.
              </p>
            </div>
          </button>
        </div>
      </div>

      <Card className="shadow-sm border-border">
        <div className="px-8 py-6 flex justify-between items-center border-b border-border">
          <h3 className="font-sans text-xl font-bold text-foreground">Recent Forms</h3>
          <Button
            variant="link"
            className="text-primary font-bold"
            onClick={() => router.push("/f")}
          >
            View All
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="px-8 py-4 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Name
              </TableHead>
              <TableHead className="px-8 py-4 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="px-8 py-4 text-xs uppercase tracking-wider font-semibold text-muted-foreground text-right">
                Responses
              </TableHead>
              <TableHead className="px-8 py-4 text-xs uppercase tracking-wider font-semibold text-muted-foreground text-right">
                Views
              </TableHead>
              <TableHead className="px-8 py-4 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Last Updated
              </TableHead>
              <TableHead className="px-8 py-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-accent/50 cursor-pointer transition-colors group">
              <TableCell className="px-8 py-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Box className="w-4 h-4" />
                  </div>
                  <span className="font-sans font-semibold">User Feedback Survey Q4</span>
                </div>
              </TableCell>
              <TableCell className="px-8 py-5">
                <Badge
                  variant="outline"
                  className="bg-green-100/50 text-green-700 border-green-200"
                >
                  Active
                </Badge>
              </TableCell>
              <TableCell className="px-8 py-5 text-right font-sans font-medium">412</TableCell>
              <TableCell className="px-8 py-5 text-right font-sans font-medium">1,240</TableCell>
              <TableCell className="px-8 py-5 text-sm text-muted-foreground">2 hours ago</TableCell>
              <TableCell className="px-8 py-5 text-right">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </TableCell>
            </TableRow>

            <TableRow className="hover:bg-accent/50 cursor-pointer transition-colors group">
              <TableCell className="px-8 py-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-sans font-semibold">Newsletter Subscription</span>
                </div>
              </TableCell>
              <TableCell className="px-8 py-5">
                <Badge
                  variant="outline"
                  className="bg-green-100/50 text-green-700 border-green-200"
                >
                  Active
                </Badge>
              </TableCell>
              <TableCell className="px-8 py-5 text-right font-sans font-medium">856</TableCell>
              <TableCell className="px-8 py-5 text-right font-sans font-medium">2,890</TableCell>
              <TableCell className="px-8 py-5 text-sm text-muted-foreground">Yesterday</TableCell>
              <TableCell className="px-8 py-5 text-right">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </TableCell>
            </TableRow>

            <TableRow className="hover:bg-accent/50 cursor-pointer transition-colors group">
              <TableCell className="px-8 py-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <span className="font-sans font-semibold">Event Registration - London</span>
                </div>
              </TableCell>
              <TableCell className="px-8 py-5">
                <Badge variant="outline" className="bg-muted text-muted-foreground">
                  Draft
                </Badge>
              </TableCell>
              <TableCell className="px-8 py-5 text-right font-sans font-medium">0</TableCell>
              <TableCell className="px-8 py-5 text-right font-sans font-medium">12</TableCell>
              <TableCell className="px-8 py-5 text-sm text-muted-foreground">
                Oct 24, 2024
              </TableCell>
              <TableCell className="px-8 py-5 text-right">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </TableCell>
            </TableRow>

            <TableRow className="hover:bg-accent/50 cursor-pointer transition-colors group">
              <TableCell className="px-8 py-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                  <span className="font-sans font-semibold">Checkout Flow Beta</span>
                </div>
              </TableCell>
              <TableCell className="px-8 py-5">
                <Badge
                  variant="outline"
                  className="bg-destructive/10 text-destructive border-destructive/20"
                >
                  Paused
                </Badge>
              </TableCell>
              <TableCell className="px-8 py-5 text-right font-sans font-medium">16</TableCell>
              <TableCell className="px-8 py-5 text-right font-sans font-medium">754</TableCell>
              <TableCell className="px-8 py-5 text-sm text-muted-foreground">
                Oct 20, 2024
              </TableCell>
              <TableCell className="px-8 py-5 text-right">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
