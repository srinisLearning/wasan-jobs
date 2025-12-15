"use client";
import { usePathname } from "next/navigation";
import React from "react";
import PrivateLayout from "./private";

function CustomLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPrivate =
    pathname.startsWith("/job-seeker") || pathname.startsWith("/recruiter");
  if (!isPrivate) {
    return (
      <>
        { children } ;
       

      </>

    ) 
  }
  return <PrivateLayout>{children}</PrivateLayout>;
}

export default CustomLayout;
