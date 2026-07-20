import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ArrowRight, LayoutTemplate } from "lucide-react";

export interface TemplateCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export function TemplateCard({ title, description, onClick }: TemplateCardProps) {
  return (
    <Card
      onClick={onClick}
      className="group flex flex-col h-full overflow-hidden transition-all duration-200 hover:border-primary/50 hover:shadow-sm hover:-translate-y-0.5 cursor-pointer"
    >
      <div className="h-32 bg-muted flex items-center justify-center border-b transition-colors group-hover:bg-muted/80">
        <LayoutTemplate className="size-10 text-muted-foreground/30" />
      </div>
      <CardHeader className="flex-1">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-sm line-clamp-2 mt-1.5">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-0 mt-auto">
        <Button variant="secondary" className="w-full text-xs pointer-events-none">
          Use Template
          <ArrowRight className="size-3 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
