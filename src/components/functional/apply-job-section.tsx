"use client";
import { IJob } from "@/interfaces";
import React from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { uploadFile } from "@/server-actions/uploads";
import useUsersStore, { IUsersStore } from "@/store/users-store";
import { createApplication } from "@/server-actions/applications";
import { useRouter } from "next/navigation";

function ApplyJobSection({ job }: { job: IJob }) {
  const [coverLetter, setCoverLetter] = React.useState("");
  const [selectedResumeFile, setSelectedResumeFile] =
    React.useState<File | null>(null);
  const { user } = useUsersStore() as IUsersStore;
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const resumeUrlResponse = await uploadFile(selectedResumeFile!);
      if (!resumeUrlResponse.success) {
        throw new Error(resumeUrlResponse.message);
      }

      const payload: any = {
        job_id: job.id,
        job_seeker_id: user?.id,
        recruiter_id: job.recruiter_id,
        cover_letter: coverLetter,
        resume_url: resumeUrlResponse.data,
        status: "pending",
      };

      const response = await createApplication(payload);
      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success("Application submitted successfully");
      router.push("/job-seeker/applications");
    } catch (error:any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-300 p-5 flex flex-col gap-5 rounded-xl">
      <h1 className="text-lg font-bold">Apply Now</h1>

      <div className="flex flex-col gap-1">
        <label htmlFor="cover-letter" className="text-sm text-gray-600">
          Cover Letter
        </label>
        <Textarea
          id="cover-letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Enter your cover letter"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cover-letter" className="text-sm text-gray-600">
          Select Resume File
        </label>
        <Input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setSelectedResumeFile(e.target.files[0]);
            }
          }}
          id="resume-selection"
          className="bg-gray-100 hidden"
        />

        <label
          htmlFor="resume-selection"
          className="text-sm p-2 flex justify-center items-center gap-5 rounded border-2 border-dashed border-gray-400 text-gray-500 cursor-pointer"
        >
          <Upload size={12} />
          Select File
        </label>

        {selectedResumeFile && (
          <div className="text-xs text-gray-700 mt-2">
            Selected File: {selectedResumeFile.name}
          </div>
        )}
      </div>

      <Button
        className="w-full"
        disabled={!coverLetter || !selectedResumeFile || loading}
        onClick={handleSubmit}
      >
        {loading ? "Submitting..." : "Submit Application"}
      </Button>
    </div>
  );
}

export default ApplyJobSection;
