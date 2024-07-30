"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "@/schema/Signup";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import signupfunction from "@/functions/signup/Function";
import signupJson from "@/JSON/Signup";
import Link from "next/link";

const Signupform = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      DateOfBirth: "",
      userName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    await signupfunction(data, toast, router, setLoading, form);
  };

  return (
    <div className="container mx-auto flex justify-center">
      <div className="bg-[#27272c] p-8 rounded-lg shadow-lg w-full max-w-2xl h-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-accent">Signup</h1>
          <p className="text-muted-foreground">
            Enter your details below to create an account
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            {signupJson.map((v, i) => (
              <FormField
                key={i}
                name={v.name}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={v.name}>{v.label}</FormLabel>
                    <FormControl>
                      <div className={`${v.type === "password" && "relative"}`}>
                        <Input
                          type={
                            v.type === "password" && showPassword
                              ? "text"
                              : v.type
                          }
                          placeholder={v.placeholder}
                          {...field}
                          id={v.name}
                          className={`w-full ${
                            v.type === "password" && "pr-10"
                          }`}
                        />
                        {v.type === "password" && (
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center px-3"
                          >
                            {showPassword ? (
                              <Eye className="text-gray-500" />
                            ) : (
                              <EyeOff className="text-gray-500" />
                            )}
                          </button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type="submit" className="col-span-2 mt-4">
              {loading ? (
                <div className="flex items-center">
                  <LoaderCircle className="mr-3 animate-spin text-white" />
                  <span>Please wait</span>
                </div>
              ) : (
                "Signup"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signupform;
