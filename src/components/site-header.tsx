import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

interface SiteHeaderProps {
  title?: string;
}

export function SiteHeader({ title = "Dashboard" }: SiteHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4" />
      <h1 className="text-sm font-medium">{title}</h1>
    </header>
  );
}
