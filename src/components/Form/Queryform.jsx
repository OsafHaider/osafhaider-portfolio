import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import contactFormjson from "@/JSON/Contactform";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import projectTypejson from "@/JSON/Projecttype";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import contactFormfunction from "@/functions/Contactform/Function";
import { useToast } from "../ui/use-toast";
import schema from "@/schema/Query";

const Queryform = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const formSubmit = async (data) => {
    await contactFormfunction(data, toast, setLoading);
  };
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      queryDescription: "",
      querySubject: "",
      projectType: "",
      techStack: "",
    },
  });
  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl"
          onSubmit={form.handleSubmit(formSubmit)}
        >
          <h3 className="text-4xl text-accent">Lets Work Together</h3>
          <p className="text-white/60">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            quibusdam?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactFormjson.map((v, i) => (
              <React.Fragment key={i}>
                <FormField
                  key={i}
                  name={v.name}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={v.name}>{v.label}</FormLabel>
                      {v.name === "queryDescription" && (
                        <FormControl>
                          <Textarea
                            className="h-[200px]"
                            placeholder={v.placeholder}
                            {...field}
                          />
                        </FormControl>
                      )}
                      {v.name === "techStack" && (
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
                            <SelectItem value="Next.js">Next.js</SelectItem>
                            <SelectItem value="MERN Stack">
                              MERN Stack
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      {v.name === "projectType" && (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={v.placeholder} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {projectTypejson.map((v, i) => (
                              <SelectItem key={i} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {v.name === "querySubject" && (
                        <FormControl>
                          <Input
                            className="w-full"
                            placeholder={v.placeholder}
                            {...field}
                          />
                        </FormControl>
                      )}
                    </FormItem>
                  )}
                />
              </React.Fragment>
            ))}
          </div>
          <Button size="md" className="max-w-40" type="submit">
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
