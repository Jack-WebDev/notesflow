"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { Sun } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
type Setting = {
  id: string;
  name: string;
};

export default function SettingsPanel() {
  const { setTheme, theme } = useTheme();

  const [selectedSetting, setSelectedSetting] = useState<Setting | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const menuList = [
    { id: "1", name: "Color Theme", icon: <Sun /> },
    { id: "2", name: "Change Password" },
  ];

  const handleSettingSelection = (settingId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("settingsOption", settingId);
    router.push(`?${params.toString()}`);

    setSelectedSetting(
      menuList.find((setting) => setting.id === settingId) || null
    );
  };
  return (
    <div className={`grid grid-cols-[.4fr_1.5fr] h-full px-8 gap-8 pt-4 ${theme === "dark" ? "bg-primary text-white" : "bg-white text-black"}`}>
      <div>
        {menuList.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-x-4 hover:bg-gray-700 pl-4 rounded-lg ${theme === "dark" ? "bg-primary text-white" : "bg-white text-black"}`}
            onClick={() => handleSettingSelection(item.id)}
          >
            {/* <item.icon /> */}
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {selectedSetting?.id === "1" ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full h-[84vh] p-6  text-gray-800 flex flex-col gap-6 relative border-l border-primary-foreground ${theme === "dark" ? "bg-primary text-white" : "bg-white text-black"}`}>
          <div className="grid gap-y-4 border-b border-primary-foreground pb-12">
            <h2 className="text-3xl">{selectedSetting.name}</h2>
            <h3>Choose your color theme</h3>
          </div>

          <div
            onClick={() => setTheme("light")}
            className="flex items-center gap-x-4 hover:bg-gray-700 pl-4 rounded-lg"
          >
            <Sun />
            <div>
              <h3>Light Mode</h3>
              <h4>Pick a clean and classic light theme</h4>
            </div>
          </div>
          <div
            onClick={() => setTheme("dark")}
            className="flex items-center gap-x-4 hover:bg-gray-700 pl-4 rounded-lg"
          >
            <Sun />
            <div>
              <h3>Dark Mode</h3>
              <h4>Pick a clean and classic light theme</h4>
            </div>
          </div>


        </motion.div>
      ) : (
        <>
          <div className={`flex items-center gap-x-4 text-white hover:bg-gray-700 pl-4 rounded-lg ${theme === "dark" ? "bg-primary text-white" : "bg-white text-black"}`}>
            <h2>{selectedSetting?.name}</h2>
          </div>
        </>
      )}
    </div>
  );
}
