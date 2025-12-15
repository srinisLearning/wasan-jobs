"use server";

import supabaseConfig from "@/config/supabase-config";

export const getJobSeekerDashboardData = async (
  userId: number,
  startDate: string,
  endDate: string
) => {
  try {
    const defaultQry = supabaseConfig
      .from("applications")
      .select("id, status")
      .eq("job_seeker_id", userId)

    if (startDate && endDate) {
      defaultQry.gte("created_at", startDate).lte("created_at", endDate);
    }
    const applicationsResponse = await defaultQry;
    if (applicationsResponse.error) {
      throw new Error(applicationsResponse.error.message);
    }

    const dashboardData = {
      total: 0,
      pending: 0,
      shortlisted: 0,
      rejected: 0,
    };

    dashboardData.total = applicationsResponse.data.length;
    applicationsResponse.data.forEach((app) => {
      if (app.status === "pending") dashboardData.pending += 1;
      else if (app.status === "shortlisted") dashboardData.shortlisted += 1;
      else if (app.status === "rejected") dashboardData.rejected += 1;
    });

    return {
      success: true,
      data: dashboardData,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as any).message,
    };
  }
};

export const getRecruiterDashboardData = async (
  userId: number,
  startDate: string,
  endDate: string
) => {
  try {
    // Get jobs posted by recruiter
    const jobsQry = supabaseConfig
      .from("jobs")
      .select("id")
      .eq("recruiter_id", userId);

    if (startDate && endDate) {
      jobsQry.gte("created_at", startDate).lte("created_at", endDate);
    }

    const jobsResponse = await jobsQry;
    if (jobsResponse.error) {
      throw new Error(jobsResponse.error.message);
    }

    const jobIds = jobsResponse.data.map((job) => job.id);

    // Get applications for those jobs
    const dashboardData = {
      totalJobs: jobsResponse.data.length,
      applicationsReceived: 0,
      shortlisted: 0,
      rejected: 0,
    };

    if (jobIds.length > 0) {
      const applicationsQry = supabaseConfig
        .from("applications")
        .select("id, status")
        .in("job_id", jobIds);

      const applicationsResponse = await applicationsQry;
      if (applicationsResponse.error) {
        throw new Error(applicationsResponse.error.message);
      }

      dashboardData.applicationsReceived = applicationsResponse.data.length;

      applicationsResponse.data.forEach((app) => {
        if (app.status === "shortlisted") dashboardData.shortlisted += 1;
        else if (app.status === "rejected") dashboardData.rejected += 1;
      });
    }

    return {
      success: true,
      data: dashboardData,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as any).message,
    };
  }
};
