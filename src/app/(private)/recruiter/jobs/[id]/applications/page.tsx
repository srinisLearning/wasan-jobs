import { getApplicationsByJobId } from "@/server-actions/applications";
import { getJobById } from "@/server-actions/jobs";
import PageTitle from "@/components/functional/page-title";
import RecruiterApplicationsTable from "@/components/functional/recruiter-applications-table";
import InfoMessage from "@/components/ui/info-message";
import React from "react";

interface RecruiterJobApplicationsPageProps {
  params: Promise<{ id: string }>;
}

async function RecruiterJobApplicationsPage({
  params,
}: RecruiterJobApplicationsPageProps) {
  const { id } = await params;
  const response = await getJobById(Number(id));
  if (!response.success) {
    return (
      <InfoMessage message={response.message || "Error fetching job details"} />
    );
  }

  const applications: any = await getApplicationsByJobId(Number(id));
  if (!applications.success) {
    return (
      <InfoMessage
        message={applications.message || "Error fetching applications"}
      />
    );
  }
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title={`Applications for : ${response.data.title}`} />

      <RecruiterApplicationsTable data={applications.data} />
    </div>
  );
}

export default RecruiterJobApplicationsPage;