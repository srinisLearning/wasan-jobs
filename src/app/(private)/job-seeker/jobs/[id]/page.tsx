import { getJobById } from "@/server-actions/jobs";
import ApplyJobSection from "@/components/functional/apply-job-section";
import InfoMessage from "@/components/ui/info-message";
import { IJob } from "@/interfaces";
import dayjs from "dayjs";
import { MapPin, Banknote, Calendar } from "lucide-react";
import React from "react";


interface JobDetailsPageProps {
  params: Promise<{ id: number }>;
}

async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;
  const jobResponse = await getJobById(id);
  if (!jobResponse.success) {
    return <InfoMessage message="Failed to load job details." />;
  }
  const job: IJob = jobResponse.data;
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-700">{job.title}</h1>
            <h1 className="text-sm text-gray-500">
              From : {job.recruiter.name}
            </h1>
          </div>
          <div className="h-max bg-blue-100 text-blue-600 border border-blue-600 px-2 py-1 rounded capitalize text-xs font-medium items-center">
            {job.job_type.replace("-", " ")}
          </div>
        </div>
        <div className="flex flex-wrap mt-3">
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

      <hr className="border border-gray-300" />

      <div className="flex justify-between">
        <div className="flex items-center">
          <MapPin size={16} className="text-gray-600" />
          <span className="text-sm text-gray-600 ml-1">{job.location}</span>
        </div>

        <div className="flex items-center">
          <Banknote size={16} className="text-gray-600" />
          <span className="text-sm text-gray-600 ml-1">
            &#x20B9;&nbsp;{job.min_salary} - &#x20B9;&nbsp;{job.max_salary}
          </span>
        </div>

        <div className="flex items-center">
          <Calendar size={16} className="text-gray-600" />
          <span className="text-sm text-gray-600 ml-1">
            Last date to apply -{" "}
            {dayjs(job.last_date_to_apply).format("MMM DD YYYY")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 border border-gray-300 p-5 rounded-xl">
          <p
            className="text-sm wysiwyg-content"
            dangerouslySetInnerHTML={{ __html: job.description }}
          ></p>
        </div>
        <div className="col-span-1">
          <ApplyJobSection job={job} />
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;
