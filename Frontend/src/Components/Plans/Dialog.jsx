import React, { useState } from "react";

export const Dialog = ({ children, open, onOpenChange }) => (
  <div className={`fixed inset-0 z-50 flex items-center justify-center ${open ? "" : "hidden"}`}>
    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => onOpenChange(false)}></div>
    <div className="relative z-10 bg-white p-4 rounded shadow-lg max-w-lg w-full">{children}</div>
  </div>
);

export const DialogTrigger = ({ children, asChild }) =>
  asChild ? children : <button onClick={() => setIsOpen(true)}>{children}</button>;

export const DialogContent = ({ children }) => <div>{children}</div>;

export const DialogHeader = ({ children }) => <div className="mb-4">{children}</div>;

export const DialogTitle = ({ children }) => <h2 className="text-xl font-bold mb-2">{children}</h2>;

export const DialogDescription = ({ children }) => <p className="text-gray-600 mb-4">{children}</p>;

export const DialogFooter = ({ children }) => <div className="mt-4 flex justify-end">{children}</div>;
