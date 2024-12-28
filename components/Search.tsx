"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./ui/input";

export default function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setSearchTerm(value);
    router.push(`?filter=${encodeURIComponent(value)}`);
  };

  return (
    <Input
      type="text"
      placeholder="Search by title or tags..."
      className="text-xs w-[15vw]"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
}
