"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormControl, FormItem, FormLabel } from "../ui/form";
import inputJson from "@/JSON/Contactform";
import { Input } from "../ui/input";
const Contactform = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      userName: "",
      phoneNumber: "",
      email: "",
      password: "",
      DateOfBirth: "",
    },
  });

  return (
    <div>
      <h3 className="text-4xl text-accent">Lets Work Together</h3>
      <p className="text-white/60">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, illum?
      </p>
      <Form>
        <form className="flex flex-col gap-6 p-10 rounded-xl bg-[#27272c]">
          {inputJson.map((v, i) => (
            <React.Fragment key={i}>
              <FormLabel>{v.name}</FormLabel>
              <FormField
                key={i}
                control={form.control}
                name={v.name}
                render={({ field }) => (
                  <FormField>
                    <FormLabel htmlfor={v.name}>{v.placeholder}</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          placeholder={field.placeholder}
                          type={field.type}
                        />
                      </div>
                    </FormControl>
                  </FormField>
                )}
              />
            </React.Fragment>
          ))}
        </form>
      </Form>
    </div>
  );
};

export default Contactform;
