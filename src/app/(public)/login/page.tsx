"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

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
import { userRoles } from "@/constants";
import { MoveLeft } from "lucide-react";
import { loginUser } from "@/server-actions/users";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

const formSchema: any = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  role: z.string().optional(),
});

function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "job-seeker",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const response: any = await loginUser(values);
    if (response.success) {
      toast.success("Login successful");
      const token = response.data;
      Cookie.set("token", token);
      Cookie.set("role", values.role);
      router.push(`/${values.role}/profile`);
    } else {
      toast.error(response.message || "Login failed");
    }
    setLoading(false);
  }
  return (
    <div className="bg-[#ece5d8] flex justify-center items-center h-screen">
      <div className="bg-white shadow rounded p-5 flex flex-col w-[450px]">
        <div className="flex justify-between items-center">
          <h1 className="text-primary font-bold text-lg">
            Login to your account
          </h1>
          <Button variant={"ghost"} className="flex items-center">
            <MoveLeft className="text-gray-500" />
            <Link href="/" className="text-xs">
              Home
            </Link>
          </Button>
        </div>

        <hr className="border border-gray-300 my-4" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl className="select">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {/*  {userRoles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))} */}
                        <SelectItem value="job-seeker">Job Seeker</SelectItem>
                        <SelectItem value="recruiter" disabled>
                          Recruiter
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="flex justify-center gap-1">
              <h1 className="text-sm">Don't have an account? </h1>
              <Link href="/register" className="text-sm underline">
                Register
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
