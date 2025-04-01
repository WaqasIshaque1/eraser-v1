"use client";
import React, { useState } from "react";
import { WorkspaceProvider } from "@/app/_context/WorkspaceContext";
import WorkSpaceHeader from "../_components/WorkSpaceHeader";
import dynamic from "next/dynamic";
import { FILE } from "../../dashboard/_components/DashboardTable";

const Editor = dynamic(() => import("../_components/Editor"), {
  ssr: false,
});

const Canvas = dynamic(() => import("../_components/Canvas"), {
  ssr: false,
});

const WorkspaceInner = ({ params }: any) => {
  const [fileData, setFileData] = useState<FILE>({
    id: params.fileId || "default",
    fileName: "Untitled Document",
    createdAt: new Date().toISOString()
  });

  const Tabs = [
    { name: "Document" },
    { name: "Both" }, 
    { name: "Canvas" }
  ];

  const [activeTab, setActiveTab] = useState(Tabs[1].name);
  const [triggerSave, setTriggerSave] = useState(false);

  // Define scaling factors
  const getScale = (component: 'editor' | 'canvas') => {
    if (activeTab === "Both") {
      return 0.85; // Slightly reduced size for split view
    }
    return 1; // Full size for single view
  };

  return (
    <div className="overflow-hidden w-full">
      <WorkSpaceHeader
        Tabs={Tabs}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        onSave={() => setTriggerSave(!triggerSave)}
        file={fileData}
      />

      {/* Document View */}
      <div style={{ 
        height: "calc(100vh - 3rem)",
        display: activeTab === "Document" ? "block" : "none" 
      }}>
        <Editor
          onSaveTrigger={triggerSave}
          fileId={params.fileId}
          fileData={fileData}
          scale={getScale('editor')}
        />
      </div>

      {/* Both View */}
      <div style={{ 
        height: "calc(100vh - 3rem)",
        display: activeTab === "Both" ? "flex" : "none",
        gap: '1rem',
        padding: '0.5rem'
      }}>
        <div style={{ flex: 1 }}>
          <Editor
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
            scale={getScale('editor')}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Canvas
            fileId={params.fileId}
            fileData={fileData}
            scale={getScale('canvas')}
          />
        </div>
      </div>

      {/* Canvas View */}
      <div style={{ 
        height: "calc(100vh - 3rem)",
        display: activeTab === "Canvas" ? "block" : "none" 
      }}>
        <Canvas
          fileId={params.fileId}
          fileData={fileData}
          scale={getScale('canvas')}
        />
      </div>
    </div>
  );
};

const Workspace = ({ params }: any) => {
  return (
    <WorkspaceProvider>
      <WorkspaceInner params={params} />
    </WorkspaceProvider>
  );
};

export default Workspace;
