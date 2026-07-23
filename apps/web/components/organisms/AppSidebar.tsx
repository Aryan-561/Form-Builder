"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileSpreadsheet, LayoutTemplate, BarChart2, Inbox } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import Logo from "../logo/logo";
import { UserMenu } from "./UserMenu";
import { PlanUsageCard } from "./PlanUsageCard";
import { useGetPlan, useMe } from "~/hooks/use-user";
import { CreateFormButton } from "../create-form-button";

const navItems = [
  { title: "Dashboard", url: "/d", icon: LayoutDashboard },
  { title: "My Forms", url: "/f", icon: FileSpreadsheet },
  { title: "Submissions", url: "/s", icon: Inbox },
  { title: "Templates", url: "/t", icon: LayoutTemplate },
  { title: "Analytics", url: "/a", icon: BarChart2 },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { data: userData } = useMe();
  const { data: userPlan } = useGetPlan();

  const currentUser = {
    name: userData?.fullName || "John Doe",
    email: userData?.email || "john@example.com",
    plan: userPlan?.plan || "free",
    credits: userPlan?.credits ?? 100,
    usedForms: 2, // Hardcoded for now until forms data is available
    maxForms: 3,
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="pt-3 border-b">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-center">
            <Logo
              size={32}
              titleClassName="group-data-[collapsible=icon]:hidden"
              className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 px-2"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="mb-4">
                <CreateFormButton className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground font-semibold shadow-sm justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2 gap-2" />
              </SidebarMenuItem>

              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url || pathname.startsWith(item.url + "/")}
                    className="font-medium"
                  >
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="pb-4 px-2 space-y-4">
        <div className="group-data-[collapsible=icon]:hidden">
          <PlanUsageCard
            plan={currentUser.plan as "free" | "pro"}
            usedForms={currentUser.usedForms}
            maxForms={currentUser.maxForms}
            credits={currentUser.credits}
          />
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu
              name={currentUser.name}
              email={currentUser.email}
              plan={currentUser.plan}
              credits={currentUser.credits}
              usedForms={currentUser.usedForms}
              maxForms={currentUser.maxForms}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
