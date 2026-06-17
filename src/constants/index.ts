export const userRoles = [
  { label: "Job Seeker", value: "job-seeker" },
  { label: "Recruiter", value: "recruiter" },
];

export const jobTypes = [
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Contract", value: "contract" },
  { label: "Internship", value: "internship" },
];

export const jobStatuses = [
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" },
  { label: "Paused", value: "paused" },
];

export const jobStatusesClasses: Record<string, string> = {
  open: "py-1 px-3 bg-green-100 text-green-800 border border-green-500 rounded-md w-max uppercase text-xs font-medium",
  closed:
    "py-1 px-3 bg-red-100 text-red-800 border border-red-500 rounded-md w-max uppercase text-xs font-medium",
  paused:
    "py-1 px-3 bg-yellow-100 text-yellow-800 border border-yellow-500 rounded-md w-max uppercase text-xs font-medium",
};

export const experienceLevels = [
  { label: "1-3 years", value: "1-3" },
  { label: "3-5 years", value: "3-5" },
  { label: "5-7 years", value: "5-7" },
  { label: "7+ years", value: "7-50" },
];

export const getApplicationStatusClass = (status: string) => {
  let commonClasses =
    "py-1 px-3 border rounded-md w-max uppercase text-xs font-medium";
  switch (status) {
    case "pending":
      return `${commonClasses} bg-yellow-100 text-yellow-800 border-yellow-500`;
    case "shortlisted":
      return `${commonClasses} bg-green-100 text-green-800 border-green-500`;
    case "rejected":
      return `${commonClasses} bg-red-100 text-red-800 border-red-500`;
    default:
      return commonClasses;
  }
};


export const applicationsStatuses = [
  { label: "Pending", value: "pending" },
  { label: "Shortlisted", value: "shortlisted" },
  { label: "Rejected", value: "rejected" },
];