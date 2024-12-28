"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { Card } from "./ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const formSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters",
  }),
});

export default function LoginForm() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.email === "demo@example.com" && values.password === "demo123") {
      setIsLoading(true);
      setTimeout(() => {
        router.push("/all-notes");
      }, 2000);
    } else {
      toast.error("Invalid credentials");
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 5000);
  };

  return (
    <>
      <Card className="absolute top-12 left-4 p-4 bg-blue-50 border-blue-200">
        <div className="text-sm text-blue-800">
          <div className="font-medium mb-2">Login Credentials</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Email: demo@example.com</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-blue-700 hover:text-blue-900 hover:bg-blue-100"
                onClick={() => copyToClipboard("demo@example.com")}
              >
                {copiedText === "demo@example.com" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Password: demo123</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-blue-700 hover:text-blue-900 hover:bg-blue-100"
                onClick={() => copyToClipboard("demo123")}
              >
                {copiedText === "demo123" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <motion.div
        className="w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center text-sm mb-8">
          Please enter your details to sign in
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jack@gmail.com"
                      {...field}
                      className="h-11 px-4 rounded-xl border-gray-200 
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                      transition-all duration-200 bg-white/60"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      className="h-11 px-4 rounded-xl border-gray-200 
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                      transition-all duration-200 bg-white/60"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500 text-sm" />
                </FormItem>
              )}
            />
            <motion.div
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              className="pt-2"
            >
              <Button
                type="submit"
                className={`w-full h-11 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 
          text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 
          focus:ring-4 focus:ring-blue-200 transition-all duration-200 
          shadow-lg shadow-blue-500/25 ${
            isLoading ? "cursor-not-allowed" : ""
          }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </motion.div>
                ) : (
                  "Login"
                )}
              </Button>
            </motion.div>
          </form>
        </Form>
      </motion.div>
    </>
  );
}
