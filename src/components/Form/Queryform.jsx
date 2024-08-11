import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "../ui/use-toast";
import schema from "@/schema/Query";
import { LoaderCircle } from "lucide-react";
import queryFormfunction from "@/functions/Queryform/Function";
import { useRouter } from "next/navigation";
import QueryForm from "@/JSON/Queryform"; // Importing JSON array

const Queryform = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      queryDescription: "",
      querySubject: "",
      projectType: "",
      techStack: "",
    },
  });

  const formSubmit = async (data) => {
    await queryFormfunction(data, toast, setLoading, form, router);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <Form {...form}>
        <form
          className="flex flex-col gap-6 p-6 bg-[#27272c] rounded-xl sm:p-10"
          onSubmit={form.handleSubmit(formSubmit)}
        >
          <h3 className="text-3xl sm:text-4xl text-accent">
            Let's Work Together
          </h3>
          <p className="text-white/60 text-base sm:text-lg">
            We're excited to collaborate with you on your next project. Please
            fill out the form below with your project details and queries, and
            we'll get back to you as soon as possible.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {QueryForm.map((v, i) => (
              <FormField
                key={i}
                name={v.inputname} // 'name' should correspond with 'inputname' in your JSON
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={v.inputname}>{v.label}</FormLabel>

                    {v.type === "textarea" && (
                      <FormControl>
                        <Textarea
                          className="h-[200px]"
                          placeholder={v.placeholder}
                          {...field}
                        />
                      </FormControl>
                    )}

                    {v.type === "select" && (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="w-full"
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={v.placeholder} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {v.options?.map((option, index) => (
                            <SelectItem key={index} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {v.type !== "textarea" && v.type !== "select" && (
                      <FormControl>
                        <Input
                          type={v.stype}
                          placeholder={v.placeholder}
                          {...field}
                        />
                      </FormControl>
                    )}

                    {/* Add FormMessage here for each form item */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <Button
            size="md"
            className="mt-4 max-w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <LoaderCircle className="mr-3 animate-spin text-white" />
                <span>Please wait</span>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Queryform;
