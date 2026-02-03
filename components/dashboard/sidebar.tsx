"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { categories, mockUser } from "@/mock-data/locations";
import { useMapsStore } from "@/store/maps-store";
import {
  BedIcon,
  Building01Icon,
  Clock01Icon,
  Coffee01Icon,
  DrinkIcon,
  Dumbbell01Icon,
  FavouriteIcon,
  Location01Icon,
  Logout01Icon,
  Restaurant01Icon,
  Settings01Icon,
  ShoppingBag01Icon,
  Tree01Icon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: "all", title: "All Locations", icon: Location01Icon, href: "/" },
  {
    id: "favorites",
    title: "Favorites",
    icon: FavouriteIcon,
    href: "/favorites",
  },
  { id: "recents", title: "Recents", icon: Clock01Icon, href: "/recents" },
];

const iconMap: Record<string, typeof Location01Icon> = {
  utensils: Restaurant01Icon,
  coffee: Coffee01Icon,
  wine: DrinkIcon,
  trees: Tree01Icon,
  landmark: Building01Icon,
  "shopping-bag": ShoppingBag01Icon,
  bed: BedIcon,
  dumbbell: Dumbbell01Icon,
};

export function LocationsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const {
    locations,
    selectedCategory,
    setSelectedCategory,
    getRecentLocations,
  } = useMapsStore();

  const favoriteCount = locations.filter((l) => l.isFavorite).length;
  const recentCount = getRecentLocations().length;

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return locations.length;
    return locations.filter((l) => l.categoryId === categoryId).length;
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="px-2.5 py-3">
        <button className="flex items-center gap-2.5 w-full hover:bg-sidebar-accent rounded-md p-1 -m-1 transition-colors shrink-0">
          <div className="flex size-7 items-center justify-center rounded-lg bg-foreground text-background shrink-0">
            <HugeiconsIcon icon={Location01Icon} className="size-4" />
          </div>
          <div className="flex items-center gap-1 group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium">Square UI - Maps</span>
          </div>
        </button>
      </SidebarHeader>

      <SidebarContent className="px-2.5">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                let badge: number | undefined;
                if (item.id === "favorites") badge = favoriteCount;
                if (item.id === "recents") badge = recentCount;
                if (item.id === "all") badge = locations.length;

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      className="h-8"
                    >
                      <HugeiconsIcon icon={item.icon} className="size-4" />
                      <span className="text-sm">{item.title}</span>
                    </SidebarMenuButton>
                    {badge !== undefined && badge > 0 && (
                      <SidebarMenuBadge>{badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-0 mt-4">
          <SidebarGroupLabel className="px-0 h-6">
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Categories
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={selectedCategory === "all"}
                  onClick={() => setSelectedCategory("all")}
                  className="h-7"
                >
                  <HugeiconsIcon icon={Location01Icon} className="size-3.5" />
                  <span className="text-sm">All</span>
                </SidebarMenuButton>
                <SidebarMenuBadge>{getCategoryCount("all")}</SidebarMenuBadge>
              </SidebarMenuItem>
              {categories.map((category) => {
                const Icon = iconMap[category.icon] || Location01Icon;
                const count = getCategoryCount(category.id);

                return (
                  <SidebarMenuItem key={category.id}>
                    <SidebarMenuButton
                      isActive={selectedCategory === category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className="h-7"
                    >
                      <HugeiconsIcon
                        icon={Icon}
                        className="size-3.5"
                        style={{ color: category.color }}
                      />
                      <span className="text-sm">{category.name}</span>
                    </SidebarMenuButton>
                    {count > 0 && <SidebarMenuBadge>{count}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button size="sm">Upgrade To Pro</Button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <SidebarMenuButton
              render={<span />}
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:cursor-pointer"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {mockUser.image ? (
                  <Image
                    src={mockUser.image}
                    alt={mockUser.name}
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                ) : (
                  <AvatarFallback className="rounded-lg">
                    {mockUser.name.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{mockUser.name}</span>
                <span className="truncate text-xs">{mockUser.email}</span>
              </div>

              <HugeiconsIcon
                icon={UnfoldMoreIcon}
                className="size-3 text-muted-foreground"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HugeiconsIcon icon={Settings01Icon} className="size-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <HugeiconsIcon icon={Logout01Icon} className="size-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
