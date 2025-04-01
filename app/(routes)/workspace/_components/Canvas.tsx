"use client";
import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { FILE } from "../../dashboard/_components/DashboardTable";
import { useWorkspace } from "@/app/_context/WorkspaceContext";

type CanvasProps = {
  fileId: string;
  fileData: FILE;
  forwardedRef?: React.ForwardedRef<any>;
};

const Canvas = ({ fileId, fileData, scale = 1 }: CanvasProps & { scale?: number }) => {
  const { canvasContent, setCanvasContent } = useWorkspace();
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);

  // Initialize with saved content or file data
  useEffect(() => {
    if (excalidrawAPI) {
      const initialData = canvasContent || 
        (fileData?.whiteboard ? JSON.parse(fileData.whiteboard) : []);
      excalidrawAPI.updateScene({ elements: initialData });
    }
  }, [fileId, excalidrawAPI]);

  return (
    <div 
      className="transition-transform duration-300 ease-in-out"
      style={{
        transform: `scale(${scale})`, 
        transformOrigin: 'top left',
        width: `${100/scale}%`,
        height: `${100/scale}%`
      }}
    >
      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        theme="dark"
        onChange={(elements) => setCanvasContent(elements)}
        UIOptions={{
          canvasActions: {
            export: false,
            loadScene: false,
            saveAsImage: false,
          },
        }}
      >
        <MainMenu>
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.Help />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>
        <WelcomeScreen>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.ToolbarHint />
          <WelcomeScreen.Hints.HelpHint />
        </WelcomeScreen>
      </Excalidraw>
    </div>
  );
};

export default Canvas;
