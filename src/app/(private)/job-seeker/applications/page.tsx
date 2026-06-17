"use client";
import { IApplication } from "@/interfaces";
import React from "react";
import toast from "react-hot-toast";
import { getApplicationsByJobSeekerId } from "@/server-actions/applications";
import useUsersStore, { IUsersStore } from "@/store/users-store";
import PageTitle from "@/components/functional/page-title";
import Spinner from "@/components/ui/spinner";
import InfoMessage from "@/components/ui/info-message";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { getApplicationStatusClass } from "@/constants";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import CoverLetterModal from "@/components/functional/cover-letter-modal";

function ApplicationsPage() {
  const [applications, setApplications] = React.useState<IApplication[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { user } = useUsersStore() as IUsersStore;
  const [selectedApplication, setSelectedApplication] = React.useState<
    IApplication | undefined
  >(undefined);
  const [openCoverLetterModal, setOpenCoverLetterModal] =
    React.useState<boolean>(false);

  const fetchApplications = async () => {
    setLoading(true);
    const response: any = await getApplicationsByJobSeekerId(user!.id);
    if (response.success) {
      setApplications(response.data);
    } else {
      toast.error(response.message || "Failed to fetch applications");
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (user && user.id) {
      fetchApplications();
    }
  }, [user]);

  const columns = [
    "Job Title",
    "Location",
    "Type",
    "Applied On",
    "Status",
    "Actions",
  ];

  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="My Applications" />

      {loading && <Spinner parentHeight="200px" />}

      {!loading && applications.length === 0 && (
        <InfoMessage message="You have not applied to any jobs yet." />
      )}

      {!loading && applications.length > 0 && (
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
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.job!.title}</TableCell>
                  <TableCell>{application.job!.location}</TableCell>
                  <TableCell>{application.job!.job_type}</TableCell>
                  <TableCell>
                    {dayjs(application.created_at).format(
                      "MMM DD , YYYY hh:mm A"
                    )}
                  </TableCell>
                  <TableCell>
                    <div
                      className={getApplicationStatusClass(application.status!)}
                    >
                      {application.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      className="flex items-center justify-center border border-gray-300"
                      variant={"outline"}
                      onClick={() => {
                        setSelectedApplication(application);
                        setOpenCoverLetterModal(true);
                      }}
                    >
                      <Eye size={14} />
                      View cover letter
                    </Button>
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

export default ApplicationsPage;