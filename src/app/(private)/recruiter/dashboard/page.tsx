"use client";
import { getRecruiterDashboardData } from "@/server-actions/dashboard";
import DashboardCard from "@/components/functional/dashboard-card";
import PageTitle from "@/components/functional/page-title";
import useUsersStore, { IUsersStore } from "@/store/users-store";
import React from "react";
import {
  Briefcase,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

const initialValues = {
  totalJobs: 0,
  applicationsReceived: 0,
  shortlisted: 0,
  rejected: 0,
};

function RecruiterDashboard() {
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dashboardData, setDashboardData] = React.useState<any>(initialValues);
  const { user }: IUsersStore = useUsersStore() as IUsersStore;

  const fetchDashboardData = async () => {
    setLoading(true);
    const response = await getRecruiterDashboardData(
      user?.id as number,
      startDate,
      endDate
    );
    if (response.success) {
      setDashboardData(response.data);
    } else {
      setDashboardData(initialValues);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (user?.id) {
      fetchDashboardData();
    }
  }, [user?.id]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <PageTitle title="Dashboard" />
        <p className="text-sm text-gray-600">
          Overview of your job postings and applications
        </p>
      </div>

      <div className="flex gap-5 items-end p-5 border rounded shadow-sm border-gray-300">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Start Date
          </label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">End Date</label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={dayjs(startDate, "YYYY-MM-DD").format("YYYY-MM-DD")}
          />
        </div>

        <div className="flex gap-5">
          <Button
            variant={"outline"}
            onClick={() => {
              setStartDate("");
              setEndDate("");
              fetchDashboardData();
            }}
          >
            Clear
          </Button>
          <Button
            onClick={fetchDashboardData}
            disabled={loading || !startDate || !endDate}
          >
            {loading ? "Loading..." : "Filter"}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard
          title="Total Jobs Posted"
          value={dashboardData.totalJobs}
          icon={
            <div className="bg-blue-100 p-2 rounded border border-blue-400">
              <Briefcase />
            </div>
          }
          color="border-blue-400 text-blue-600"
          label="Jobs"
        />

        <DashboardCard
          title="Applications Received"
          value={dashboardData.applicationsReceived}
          icon={
            <div className="bg-purple-100 p-2 rounded border border-purple-400">
              <Users />
            </div>
          }
          color="border-purple-400 text-purple-600"
          label="Applications"
        />

        <DashboardCard
          title="Shortlisted Applications"
          value={dashboardData.shortlisted}
          icon={
            <div className="bg-green-100 p-2 rounded border border-green-400">
              <CheckCircle />
            </div>
          }
          color="border-green-400 text-green-600"
          label="Shortlisted"
        />

        <DashboardCard
          title="Rejected Applications"
          value={dashboardData.rejected}
          icon={
            <div className="bg-red-100 p-2 rounded border border-red-400">
              <AlertCircle />
            </div>
          }
          color="border-red-400 text-red-600"
          label="Rejected"
        />
      </div>
    </div>
  );
}

export default RecruiterDashboard;
