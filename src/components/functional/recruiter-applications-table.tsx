"use client";
import { IApplication } from "@/interfaces";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InfoMessage from "../ui/info-message";
import {
  applicationsStatuses,
  getApplicationStatusClass,
  jobStatuses,
} from "@/constants";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { Eye, List } from "lucide-react";
import CoverLetterModal from "./cover-letter-modal";
import { updateApplicationStatus } from "@/server-actions/applications";
import toast from "react-hot-toast";

function RecruiterApplicationsTable({
  data,
  showJobTitle,
}: {
  data: IApplication[];
  showJobTitle?: boolean;
}) {
  const [selectedApplication, setSelectedApplication] = React.useState<
    IApplication | undefined
  >(undefined);
  const [openCoverLetterModal, setOpenCoverLetterModal] =
    React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [localData, setLocalData] = React.useState<IApplication[]>(data);

  const onStatusChange = async (
    application: IApplication,
    newStatus: string
  ) => {
    setLoading(true);
    const response = await updateApplicationStatus({
      applicationId: application.id,
      newStatus,
      email: application.job_seeker!.email,
      name: application.job_seeker!.name,
    });
    if (response.success) {
      toast.success("Application status updated successfully");
      const updatedData = localData.map((app) => {
        if (app.id === application.id) {
          return { ...app, status: newStatus };
        }
        return app;
      });
      setLocalData(updatedData);
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };
  const columns = [
    "Id",
    "Applicant Name",
    "Email",
    "Location",
    "Type",
    "Applied On",
    "Status",
    "Actions",
  ];

  if (showJobTitle) {
    columns.splice(3, 0, "Job Title");
  }

  return (
    <div className="flex flex-col gap-5">
      {data.length === 0 && <InfoMessage message="No applications found." />}

      {data.length > 0 && (
        <div>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-200">
                {columns.map((column) => (
                  <TableHead key={column} className="font-bold">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {localData.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.id}</TableCell>
                  <TableCell>{application.job_seeker!.name}</TableCell>

                  <TableCell>{application.job_seeker!.email}</TableCell>
                  {showJobTitle && (
                    <TableCell>{application.job!.title}</TableCell>
                  )}
                  <TableCell>{application.job!.location}</TableCell>
                  <TableCell>{application.job!.job_type}</TableCell>
                  <TableCell>
                    {dayjs(application.created_at).format(
                      "MMM DD , YYYY hh:mm A"
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="py-2">
                      <select
                        className="border p-2 border-gray-400 rounded"
                        value={application.status}
                        onChange={(e) =>
                          onStatusChange(application, e.target.value)
                        }
                      >
                        {applicationsStatuses.map((status) => (
                          <option
                            key={status.value}
                            value={status.value}
                            className="text-sm"
                          >
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-5">
                      <Button
                        className="flex items-center justify-center border border-gray-300"
                        variant={"outline"}
                        onClick={() => {
                          setSelectedApplication(application);
                          setOpenCoverLetterModal(true);
                        }}
                      >
                        <Eye size={14} />
                         cover letter
                      </Button>

                      <Button
                        className="flex items-center justify-center border border-gray-300"
                        variant={"outline"}
                        onClick={() => {
                          window.open(application.resume_url, "_blank");
                        }}
                      >
                        <List size={14} />
                        Resume
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {selectedApplication && (
        <CoverLetterModal
          open={openCoverLetterModal}
          setOpen={setOpenCoverLetterModal}
          title={`Cover Letter for ${selectedApplication.job!.title}`}
          content={selectedApplication.cover_letter}
        />
      )}
    </div>
  );
}

export default RecruiterApplicationsTable;