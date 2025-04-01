"use client";
import React, { createContext, useContext, useState } from "react";
import { FILE } from "../types/file";

type WorkspaceContextType = {
  documentContent: any;
  setDocumentContent: (content: any) => void;
  canvasContent: any;
  setCanvasContent: (content: any) => void;
  fileData: FILE | null;
  setFileData: (file: FILE) => void;
};

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [documentContent, setDocumentContent] = useState<any>(null);
  const [canvasContent, setCanvasContent] = useState<any>(null);
  const [fileData, setFileData] = useState<FILE | null>(null);

  console.log('WorkspaceContext state:', {
    documentContent,
    canvasContent,
    fileData
  });

  return (
    <WorkspaceContext.Provider
      value={{
        documentContent,
        setDocumentContent,
        canvasContent,
        setCanvasContent,
        fileData,
        setFileData
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};
