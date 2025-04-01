"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "./_components/DashboardHeader";
import DashboardTable from "./_components/DashboardTable";

const page = () => {
  const user = { given_name: "Demo", family_name: "User", email: "demo@example.com", picture: "https://img.freepik.com/free-vector/graphic-designer-man_78370-159.jpg" };
  return (
    <div className="text-white">
      <DashboardHeader user={user} />
      <DashboardTable />
    </div>
  );
};

export default page;
