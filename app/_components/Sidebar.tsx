"use client";

import React, { useContext, useEffect, useState } from "react";
import SidebarTopButton, { Team } from "./SidebarTopButton";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import SideNavBottomMenu from "./SideNavBottomMenu";
import { toast } from "sonner";
import { FileListContext } from "../_context/FileListContext";
const Sidebar = () => {
  const user = { picture: "https://img.freepik.com/free-vector/graphic-designer-man_78370-159.jpg" };
  const [activeTeam, setActiveTeam] = useState<Team | any>();
  const [totalFiles, setTotalFiles] = useState<Number>(0);
  const [totalArchivedFiles, setTotalArchivedFiles] = useState<Number>(0);

  const { fileList, setFileList } = useContext(FileListContext);

  const onFileCreate = (fileName: string) => {
    toast.success("File created successfully (demo mode)");
    setFileList([...fileList, { fileName, id: Date.now().toString() }]);
  };

  useEffect(() => {
    // No database calls in demo mode
    setFileList([]);
  }, [activeTeam]);

  return (
    <div className="text-white h-screen hidden sm:fixed max-w-64 py-4 px-4 sm:flex border-r border-neutral-800 flex-col">
      <div className="flex-1">
        <SidebarTopButton
          user={user}
          setActiveTeamInfo={(activeTeam: Team) => setActiveTeam(activeTeam)}
        />
        <Button
          variant={"outline"}
          className="bg-gradient-to-r from-neutral-600 backdrop:blur-md to-neutral-700 border-neutral-800 w-full mt-10 text-left justify-start hover:bg-neutral-600 hover:border-neutral-700 hover:from-neutral-600 hover:to-neutral-700 hover:text-white"
        >
          <LayoutDashboard size={16} className="mr-2" />
          All files
        </Button>
      </div>

      {/* bottom layout */}
      <SideNavBottomMenu onFileCreate={onFileCreate} length={totalFiles} />
    </div>
  );
};

export default Sidebar;
