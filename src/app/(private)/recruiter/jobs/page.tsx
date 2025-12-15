"use client";
import { deleteJobById, getJobsOfRecruiter } from "@/server-actions/jobs";
import PageTitle from "@/components/functional/page-title";
import { Button } from "@/components/ui/button";
import InfoMessage from "@/components/ui/info-message";
import Spinner from "@/components/ui/spinner";
import { IJob } from "@/interfaces";
import useUsersStore, { IUsersStore } from "@/store/users-store";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import Link from "next/link";
import React, { use } from "react";
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
import { useRouter } from "next/navigation";
import { jobStatuses, jobStatusesClasses } from "@/constants";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function RecruiterJobsPage() {
  const [jobs, setJobs] = React.useState<IJob[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<boolean>(false);
  const [jobToDelete, setJobToDelete] = React.useState<number | null>(null);
  const { user }: IUsersStore = useUsersStore() as IUsersStore;
  const router = useRouter();
  const fetchJobs = async () => {
    setLoading(true);
    const response: any = await getJobsOfRecruiter(user?.id!);
    if (response.success) {
      setJobs(response.data);
    }
    setLoading(false);
  };

  const deleteJobHandler = async (jobId: number) => {
    const response: any = await deleteJobById(jobId);
    if (response.success) {
      toast.success(response.message);
      fetchJobs();
    } else {
      toast.error(response.message);
    }
  };

  React.useEffect(() => {
    if (user) {
      fetchJobs();
    }
  }, [user]);

  const columns = [
    "Id",
    "Job Title",
    "Location",
    "Type",
    "Posted On",
    "Status",
    "Actions",
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <PageTitle title="Jobs" />
        <Button className="flex items-center gap-1">
          <Plus size={14} />
          <Link href="/recruiter/jobs/add">Post New Job</Link>
        </Button>
      </div>

      {loading && <Spinner parentHeight="200px" />}

      {!loading && jobs.length === 0 && (
        <InfoMessage message="No jobs posted yet." />
      )}

      {!loading && jobs.length > 0 && (
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
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.id}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.job_type}</TableCell>
                  <TableCell>
                    {dayjs(job.created_at).format("MMM DD , YYYY hh:mm A")}
                  </TableCell>
                  <TableCell>
                    <div className={jobStatusesClasses[job.status]}>
                      {job.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          router.push(`/recruiter/jobs/${job.id}/applications`);
                        }}
                      >
                        <Eye size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setJobToDelete(job.id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (jobToDelete) {
                  deleteJobHandler(jobToDelete);
                  setDeleteDialogOpen(false);
                  setJobToDelete(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default RecruiterJobsPage;