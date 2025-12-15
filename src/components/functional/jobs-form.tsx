"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { DefaultEditor } from "react-simple-wysiwyg";
import { jobStatuses, jobTypes } from "@/constants";
import { X } from "lucide-react";
import { createJob, editJobById } from "@/server-actions/jobs";
import useUsersStore, { IUsersStore } from "@/store/users-store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema: any = z.object({
  title: z
    .string()
    .min(2, { message: "Job title must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." }),
  job_type: z.string().min(1, { message: "Job type is required." }),
  min_salary: z
    .number()
    .min(0, { message: "Minimum salary must be a positive number." }),
  max_salary: z
    .number()
    .min(0, { message: "Maximum salary must be a positive number." }),
  exp_required: z
    .number()
    .min(1, { message: "Experience required is required." }),
  last_date_to_apply: z
    .string()
    .min(1, { message: "Last date to apply is required." }),
  status: z.string().min(1, { message: "Status is required." }),
});
function JobForm({
  formType = "add",
  initialValues,
}: {
  formType: "add" | "edit";
  initialValues?: any;
}) {
  const [skillsAdded, setSkillsAdded] = React.useState<string[]>(
    initialValues?.skills || []
  );
  const [skillsInputValue, setSkillsInputValue] = React.useState("");
  const [loading, setLoading] = useState(false);
  const { user }: IUsersStore = useUsersStore() as IUsersStore;
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      location: initialValues?.location || "",
      job_type: initialValues?.job_type || "",
      min_salary: initialValues?.min_salary || 0,
      max_salary: initialValues?.max_salary || 0,
      exp_required: initialValues?.exp_required || 0,
      last_date_to_apply: initialValues?.last_date_to_apply || "",
      status: initialValues?.status || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      values.skills = skillsAdded;
      let response: any = null;

      if (formType === "add") {
        response = await createJob({
          ...values,
          recruiter_id: user?.id!,
        });
      } else {
        response = await editJobById(initialValues.id, {
          ...values,
          recruiter_id: user?.id!,
        });
      }

      if (response.success) {
        toast.success(response.message);
        router.push("/recruiter/jobs");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const addSkillsHandler = () => {
    const skillsArray = skillsInputValue
      .split(",")
      .map((skill) => skill.trim());
    setSkillsAdded((prevSkills) => [...prevSkills, ...skillsArray]);
    setSkillsInputValue("");
  };

  const removeSkillHandler = (skillToRemove: string) => {
    setSkillsAdded((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <DefaultEditor
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <h1 className="text-sm">Skills</h1>
            <div className="flex gap-5 mt-1">
              <Input
                placeholder="Enter skills with comma separted"
                value={skillsInputValue}
                onChange={(e) => setSkillsInputValue(e.target.value)}
              />
              <Button
                disabled={!skillsInputValue.trim().length}
                type="button"
                onClick={addSkillsHandler}
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-5 mt-4">
              {skillsAdded.map((skill, index) => (
                <div
                  key={skill}
                  className="bg-primary px-2 py-1 rounded flex gap-2 items-center"
                >
                  <span className="text-white text-xs">{skill}</span>
                  <X
                    size={14}
                    onClick={() => removeSkillHandler(skill)}
                    className="text-white text-sm ml-1 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="job_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="min_salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Salary</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={Number(field.value)}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="max_salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Salary</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={Number(field.value)}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="exp_required"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Required (in years)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={Number(field.value)}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_date_to_apply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Date to Apply</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="mt-2" disabled={loading}>
              {formType === "add" ? "Add Job" : "Update Job"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default JobForm;