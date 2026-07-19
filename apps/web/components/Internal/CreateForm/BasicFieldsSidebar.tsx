import { Button } from "~/components/ui/button";
import { 
  Type, AlignLeft, Mail, KeyRound, Hash, Phone, Link2, Calendar,
  Clock, CalendarClock, CheckSquare, CircleDot, List, ListChecks,
  FileUp, Palette
} from "lucide-react";
import { FormElement } from "./types";
import { configurationOfElement } from "./config";

interface BasicFieldsSidebarProps {
  onClickElement: (elem: FormElement) => void;
}

export function BasicFieldsSidebar({ onClickElement }: BasicFieldsSidebarProps) {
  const getIconForType = (type: string) => {
    switch (type) {
      case "text": return <Type className="w-4 h-4 mr-3 text-muted-foreground" />;
      case "textarea": return <AlignLeft className="w-4 h-4 mr-3 text-muted-foreground" />;
      case "email": return <Mail className="w-4 h-4 mr-3 text-muted-foreground" />;
      case "password": return <KeyRound className="w-4 h-4 mr-3 text-muted-foreground" />;
      case "number": return <Hash className="w-4 h-4 mr-3 text-muted-foreground" />;
      case "tel": return <Phone className="w-4 h-4 mr-3 text-muted-foreground" />;
      case "url": return <Link2 className="w-4 h-4 mr-3 text-muted-foreground" />;
      case "date": return <Calendar className="w-4 h-4 mr-3 text-muted-foreground" />;
      case "time": return <Clock className="w-4 h-4 mr-3 text-muted-foreground" />;
      case "datetime-local": return <CalendarClock className="w-4 h-4 mr-3 text-muted-foreground" />;
      case "checkbox": return <CheckSquare className="w-4 h-4 mr-3 text-muted-foreground" />;
      case "radio": return <CircleDot className="w-4 h-4 mr-3 text-muted-foreground" />;
      case "select": return <List className="w-4 h-4 mr-3 text-muted-foreground" />;
      case "multiselect": return <ListChecks className="w-4 h-4 mr-3 text-muted-foreground" />;
      case "file": return <FileUp className="w-4 h-4 mr-3 text-muted-foreground" />;
      case "color": return <Palette className="w-4 h-4 mr-3 text-muted-foreground" />;
      default: return <Type className="w-4 h-4 mr-3 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-card z-50 shadow-sm">
      <div className="px-4 mb-6 flex-1 overflow-y-auto">
        <div className="space-y-2 flex flex-col relative pt-4">
          {configurationOfElement.map((elem) => {
            return (
              <Button
                className="w-full justify-start h-10 px-4 font-normal"
                variant={"outline"}
                key={elem.id}
                onClick={() => onClickElement(elem)}
              >
                {getIconForType(elem.type)}
                {elem.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
