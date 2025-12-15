"use server";

import supabaseConfig from "@/config/supabase-config";
import { IApplication } from "@/interfaces";
import { sendEmail } from "@/utils/send-email";

export const createApplication = async (payload: Partial<IApplication>) => {
  try {
    const insertApplication = await supabaseConfig
      .from("applications")
      .insert([payload]);
    if (insertApplication.error) {
      throw new Error(insertApplication.error.message);
    }
    return {
      success: true,
      message: "Application created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getApplicationsByJobSeekerId = async (jobSeekerId: number) => {
  try {
    const applicationsResponse = await supabaseConfig
      .from("applications")
      .select("* , job:jobs(*)")
      .eq("job_seeker_id", jobSeekerId)
      .order("created_at", { ascending: false });
    if (applicationsResponse.error) {
      throw new Error(applicationsResponse.error.message);
    }
    return {
      success: true,
      data: applicationsResponse.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getApplicationsByJobId = async (jobId: number) => {
  try {
    const applicationsResponse = await supabaseConfig
      .from("applications")
      .select(
        "* , job:jobs(*) , job_seeker:user_profiles!applications_job_seeker_id_fkey(name , id , email )"
      )
      .eq("job_id", jobId)
      .order("created_at", { ascending: false });
    if (applicationsResponse.error) {
      throw new Error(applicationsResponse.error.message);
    }
    return {
      success: true,
      data: applicationsResponse.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getApplicationsByRecruiterId = async (recruiterId: number) => {
  try {
    const applicationsResponse = await supabaseConfig
      .from("applications")
      .select(
        "* , job:jobs(*) , job_seeker:user_profiles!applications_job_seeker_id_fkey(name , id , email)"
      )
      .eq("recruiter_id", recruiterId)
      .order("created_at", { ascending: false });
    if (applicationsResponse.error) {
      throw new Error(applicationsResponse.error.message);
    }

    console.log("applicationsResponse.data", applicationsResponse.data);

    return {
      success: true,
      data: applicationsResponse.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateApplicationStatus = async ({
  applicationId,
  newStatus,
  email,
  name,
}: {
  applicationId: number;
  newStatus: string;
  email: string;
  name: string;
}) => {
  try {
    const updateApplication = await supabaseConfig
      .from("applications")
      .update({ status: newStatus })
      .eq("id", applicationId);
    if (updateApplication.error) {
      throw new Error(updateApplication.error.message);
    }

    // email notification logic can be added here
    let emailBody: any = {
      email,
      subjectLine: "Application Status Updated",
    };

    if (newStatus === "shortlisted") {
      emailBody.content = `<p>Dear ${name},</p>
      <p>Congratulations! You have been shortlisted for the next round of interviews. We will be in touch with further details.</p>
      <p>Best regards,<br/>Next Job Board Team</p>`;
    } else if (newStatus === "rejected") {
      emailBody.content = `<p>Dear ${name},</p>
      <p>We appreciate your interest in the position. After careful consideration, we regret to inform you that we will not be moving forward with your application.</p>
      <p>We wish you all the best in your job search.</p>
      <p>Best regards,<br/>Next Job Board Team</p>`;
    }

    await sendEmail(emailBody);

    return {
      success: true,
      message: "Application status updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
