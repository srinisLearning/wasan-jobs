"use client";
import { IJob } from "@/interfaces";
import dayjs from "dayjs";
const getRandomDate = () => dayjs().add(Math.floor(Math.random() * 15) + 5, 'day').format('YYYY-MM-DD');
import { Banknote, Calendar, ListCheck, Map, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function JobCard({ job }: { job: IJob }) {
  const router = useRouter();
  return (
    <div
      className="flex  flex-col gap-4 p-4 border   border-gray-400 rounded cursor-pointer hover:border-primary"
      onClick={() => router.push(`/job-seeker/jobs/${job.id}`)}
    >
      <div className="flex justify-between">
        <div>
          <h1 className="text-sm font-bold text-gray-700">{job.title}</h1>
          <h1 className="text-xs text-gray-500">Id: {job.id}</h1>
          <h1 className="text-xs text-gray-500">From : {job.recruiter.name}</h1>
        </div>
        <div className="h-max bg-blue-100 text-blue-600 border border-blue-600 px-2 py-1 rounded capitalize text-xs font-medium items-center">
          {job.job_type.replace("-", " ")}
        </div>
      </div>

      <p
        className="text-sm line-clamp-2 text-gray-500"
        dangerouslySetInnerHTML={{ __html: job.description }}
      ></p>

      <div className="flex  max-w-6xl gap-10">
        <div className="flex items-center">
          <MapPin size={14} className="text-gray-600" />
           
          <span className="text-sm text-gray-600 ml-1"><strong>Location</strong> - {job.location}</span>
        </div>

        <div className="flex items-center">
          <Banknote size={14} className="text-gray-600" />
         
          <span className="text-xs text-gray-600 ml-1">
             <strong> Salary Range </strong>  
            - &#x20B9;&nbsp;{job.min_salary} - &#x20B9;&nbsp;{job.max_salary}
          </span>
        </div>

        <div className="flex items-center">
          <Calendar size={14} className="text-gray-600" />
          <span className="text-xs text-gray-600 ml-1">
           <strong>  Last date to apply </strong> - {" "}
          {/*   {dayjs(job.last_date_to_apply).format("MMM DD YYYY")} */}
         {getRandomDate()}
          </span>
        </div>

        <div className="flex items-center">
          <ListCheck size={14} className="text-gray-600" />
          <span className="text-xs text-gray-600 ml-1">
            <strong>Min Experience </strong> - {job.exp_required}years
          </span>
        </div>
      </div>

      <div className="flex flex-wrap">
        {job.skills.map((skill, index) => (
          <div
            key={index}
            className="bg-gray-200 border border-gray-400 text-gray-700 px-2 py-1 rounded text-xs font-medium mr-2 mb-2"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobCard;
