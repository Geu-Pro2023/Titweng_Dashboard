import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GlobalSearch } from "@/components/ui/global-search";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useTranslation } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { t, currentLang } = useTranslation();
  const currentDate = new Date().toLocaleDateString(currentLang === 'ar' ? "ar-SD" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-gradient-to-r from-background/95 to-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
          {t('dashboard')}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground hidden md:block font-medium">{currentDate}</span>
        
        <GlobalSearch />
        <LanguageToggle />
        <ThemeToggle />
        
        <Button variant="ghost" size="icon" className="relative transition-all duration-200 hover:scale-110">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white animate-pulse">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="transition-all duration-200 hover:scale-110">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-sm">
            <DropdownMenuLabel>Admin User</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="transition-colors hover:bg-accent/50">Profile</DropdownMenuItem>
            <DropdownMenuItem className="transition-colors hover:bg-accent/50">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive transition-colors hover:bg-destructive/10">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};