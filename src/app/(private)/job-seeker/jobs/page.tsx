import { getAllActiveJobs } from "@/server-actions/jobs";
import Filters from "@/components/functional/filters";
import JobCard from "@/components/functional/job-card";
import PageTitle from "@/components/functional/page-title";
import InfoMessage from "@/components/ui/info-message";
import { IJob } from "@/interfaces";
import React from "react";

interface JobsListProps {
  searchParams: Promise<{ searchParams: Record<string, string> }>;
}

async function JobsList({ searchParams }: JobsListProps) {
  const {
    location,
    jobType,
    keywords,
    minSalary,
    maxSalary,
    experienceLevel,
  }: any = await searchParams;
  console.log("Search Params:", location, jobType);
  const jobsResponse: any = await getAllActiveJobs({
    location,
    jobType,
    keywords,
    minSalary,
    maxSalary,
    experienceLevel,
  });
  let jobs: IJob[] = [];
  if (jobsResponse.success) {
    jobs = jobsResponse.data;
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1 items-center">
        <PageTitle title="Browse Jobs" />
        <span className="text-xs text-gray-600">
          Find your next opportunity
        </span>
      </div>

      {jobs.length === 0 && (
        <InfoMessage message="No active jobs found at the moment." />
      )}

      <Filters />

      {jobs.length > 0 && (
        <div className="flex flex-col gap-5">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

export default JobsList;
