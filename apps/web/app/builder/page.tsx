import Link from "next/link";
import { 
  ArrowLeft, 
  Type, 
  AlignLeft, 
  CheckSquare, 
  List, 
  UploadCloud, 
  Calendar, 
  Hash,
  HelpCircle,
  LogOut,
  GripVertical,
  Plus
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export default function BuilderPage() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Builder Sidebar */}
      <aside className="w-64 h-screen fixed left-0 top-0 bg-card flex flex-col py-8 z-50 border-r border-border shadow-sm">
        <div className="px-6 mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:underline font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
        </div>
        <div className="px-4 mb-6">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 px-2">Elements</h3>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group">
              <Type className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              <span className="font-sans text-sm font-medium">Short Text</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group">
              <AlignLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              <span className="font-sans text-sm font-medium">Long Text</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group">
              <CheckSquare className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              <span className="font-sans text-sm font-medium">Multiple Choice</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group">
              <List className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              <span className="font-sans text-sm font-medium">Dropdown</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group">
              <UploadCloud className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              <span className="font-sans text-sm font-medium">File Upload</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group">
              <Calendar className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              <span className="font-sans text-sm font-medium">Date</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group">
              <Hash className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              <span className="font-sans text-sm font-medium">Number</span>
            </button>
          </div>
        </div>
        <div className="mt-auto px-4 border-t border-border pt-4">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-muted-foreground">
            <HelpCircle className="w-5 h-5" />
            <span className="font-sans text-sm font-medium">Help Center</span>
          </button>
          <Link href="/" className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-muted-foreground">
            <LogOut className="w-5 h-5" />
            <span className="font-sans text-sm font-medium">Log Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Builder Canvas */}
      <main className="ml-64 flex-1 flex flex-col h-screen">
        <header className="flex justify-between items-center w-full px-8 h-16 sticky top-0 bg-background z-40 border-b border-border shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-sm">Customer Feedback 2024</h2>
            <span className="px-2 py-0.5 rounded-full bg-accent text-xs font-semibold text-muted-foreground">Saved</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="font-semibold text-muted-foreground">Preview</Button>
            <Button className="font-bold shadow-sm">Publish Form</Button>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-[800px] mx-auto pb-32">
            <div className="mb-12">
              <h1 className="font-sans text-4xl font-bold text-foreground mb-2">Customer Feedback 2024</h1>
              <p className="text-lg text-muted-foreground">Help us improve by sharing your thoughts on your recent experience.</p>
            </div>

            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-card rounded-xl p-8 shadow-sm border-2 border-transparent hover:border-border transition-all group relative">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-muted-foreground cursor-grab">
                  <GripVertical className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <label className="font-sans text-xl font-semibold text-foreground">What is your name?</label>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-muted-foreground">Required</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <Input className="py-6 bg-accent/50 text-base" placeholder="Jane Doe" />
                </div>
              </div>

              {/* Question 2 - Active State */}
              <div className="bg-card rounded-xl p-8 shadow-sm border-2 border-primary transition-all group relative ring-4 ring-primary/5">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-primary cursor-grab">
                  <GripVertical className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <label className="font-sans text-xl font-semibold text-foreground">How can we help?</label>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-muted-foreground">Required</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <Textarea className="min-h-[120px] bg-accent/50 text-base resize-none" placeholder="Tell us more about your inquiry..." />
                </div>
              </div>

              {/* Question 3 */}
              <div className="bg-card rounded-xl p-8 shadow-sm border-2 border-transparent hover:border-border transition-all group relative">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-muted-foreground cursor-grab">
                  <GripVertical className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <label className="font-sans text-xl font-semibold text-foreground">Email Address</label>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-muted-foreground">Required</span>
                      <Switch />
                    </div>
                  </div>
                  <Input type="email" className="py-6 bg-accent/50 text-base" placeholder="jane@example.com" />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 group font-bold px-8 py-6">
                <Plus className="w-5 h-5 mr-2 transition-transform group-hover:rotate-90" />
                Add Question
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
