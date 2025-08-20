import { baseOptions } from "@/app/layout.config";
import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from "fumadocs-ui/layouts/home/navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          type: "custom",
          // only displayed on navbar, not mobile menu
          on: "nav",
          children: (
            <NavbarMenu>
              <NavbarMenuTrigger>Documentation</NavbarMenuTrigger>
              <NavbarMenuContent>
                <NavbarMenuLink href="/docs">Hello World</NavbarMenuLink>
                <NavbarMenuLink href="/docs">Hello</NavbarMenuLink>
                <NavbarMenuLink href="/docs">World</NavbarMenuLink>
              </NavbarMenuContent>
            </NavbarMenu>
          ),
        },
        // other items
      ]}
    >
      {children}
    </HomeLayout>
  );
}
