"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllActiveJobs } from "@/server-actions/jobs";
import { IJob } from "@/interfaces";
import { useState, useEffect } from "react";


export default function TableDemo() {
  const [jobs, setJobs] = useState<IJob[]>([]);

  useEffect(() => {
    getAllActiveJobs({}).then((res) => {
      if (res.success && res.data) {
        setJobs(res.data);
      }
    });
  }, []);

  return (
    <Table className="mt-5 max-w-3xl mx-auto border-x-2 border-dotted border-primary caption-top px-3">
      <TableCaption className="text-3xl font-extrabold text-primary text-center mb-4">Recent Jobs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center">Job ID</TableHead>
          <TableHead className="w-[500px] text-center">Title</TableHead>
          <TableHead className="w-[300px] text-center">Location</TableHead>
          <TableHead className="w-[300px] text-center">Job Type</TableHead>
          <TableHead className="w-[300px] text-center">Skill Set</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="w-[100px] text-center">{job.id}</TableCell>
            <TableCell className="w-[500px] text-center font-bold">{job.title}</TableCell>
            <TableCell className="w-[300px] text-center">{job.location}</TableCell>
            <TableCell className="w-[300px] text-center">{job.job_type.toUpperCase()}</TableCell>
            <TableCell className="w-[300px] text-center">{job.skills.slice(0, 3).join(", ")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
