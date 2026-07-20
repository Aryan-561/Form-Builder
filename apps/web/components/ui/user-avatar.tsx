import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";

export interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  className?: string;
  fallbackClassName?: string;
}

export function UserAvatar({ src, name, className, fallbackClassName }: UserAvatarProps) {
  const initials = React.useMemo(() => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [name]);

  return (
    <Avatar className={cn("size-8", className)}>
      <AvatarImage src={src || ""} alt={name || "User Avatar"} />
      <AvatarFallback className={cn("bg-muted text-muted-foreground", fallbackClassName)}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
