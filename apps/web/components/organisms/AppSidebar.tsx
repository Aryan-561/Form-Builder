"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  FileSpreadsheet,
  LayoutTemplate,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
} from "lucide-react";
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

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Forms", url: "#", icon: FileSpreadsheet },
  { title: "Templates", url: "#", icon: LayoutTemplate },
  { title: "Analytics", url: "/analytics", icon: BarChart2 },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

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
                <SidebarMenuButton
                  asChild
                  tooltip="Create New Form"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground font-semibold shadow-sm justify-center group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center"
                >
                  <Link href="/builder">
                    <Plus className="size-4 shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden">Create New Form</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
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

      <SidebarFooter className="pb-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Help Center" className="font-medium">
              <Link href="#">
                <HelpCircle className="size-4" />
                <span>Help Center</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Log Out" className="font-medium">
              <Link href="/">
                <LogOut className="size-4" />
                <span>Log Out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
