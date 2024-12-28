import LoginForm from "@/components/LoginForm";
import React from "react";

export default function Home() {
  return (
    <div className="px-4 h-screen flex justify-center items-center w-full bg-gradient-to-br from-purple-100 via-blue-50 to-white">
      <LoginForm />
    </div>
  );
}
