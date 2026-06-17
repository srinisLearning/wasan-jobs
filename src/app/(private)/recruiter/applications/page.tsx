import { getApplicationsByRecruiterId } from "@/server-actions/applications";
import { getLoggedInUser } from "@/server-actions/users";
import PageTitle from "@/components/functional/page-title";
import RecruiterApplicationsTable from "@/components/functional/recruiter-applications-table";
import InfoMessage from "@/components/ui/info-message";
import React from "react";

async function RecruiterAllApplicationsPage() {
  const userResponse = await getLoggedInUser();
  if (!userResponse.success) {
    return <InfoMessage message="Failed to load user data." />;
  }

  const recruiter = userResponse.data;
  const applicationsResponse: any = await getApplicationsByRecruiterId(recruiter.id);
  if (!applicationsResponse.success) {
    return <InfoMessage message={applicationsResponse.message || 'Failed to load'} />;
  }
  return (
    <div className="flex flex-col gap-5">
      <div>
        <PageTitle title="All Applications" />
        <p className="text-xs text-gray-600">
          View all applications for your job postings.
        </p>
      </div>

      <RecruiterApplicationsTable data={applicationsResponse.data} showJobTitle />
    </div>
  );
}

export default RecruiterAllApplicationsPage;