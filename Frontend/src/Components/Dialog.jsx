import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

export function Dialog({ children }) {
  return <RadixDialog.Root>{children}</RadixDialog.Root>;
}

export function DialogTrigger({ children, asChild }) {
  return <RadixDialog.Trigger asChild={asChild}>{children}</RadixDialog.Trigger>;
}

export function DialogContent({ children, className }) {
  return (
    <RadixDialog.Content
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 ${className}`}
    >
      {children}
    </RadixDialog.Content>
  );
}

export function DialogTitle({ children, className }) {
  return <RadixDialog.Title className={className}>{children}</RadixDialog.Title>;
}
