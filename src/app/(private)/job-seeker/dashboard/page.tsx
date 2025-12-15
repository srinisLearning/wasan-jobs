"use client";
import { getJobSeekerDashboardData } from "@/server-actions/dashboard";
import DashboardCard from "@/components/functional/dashboard-card";
import PageTitle from "@/components/functional/page-title";
import useUsersStore, { IUsersStore } from "@/store/users-store";
import React from "react";
import {
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

const initialValues = {
  total: 0,
  pending: 0,
  shortlisted: 0,
  rejected: 0,
};

function JobSeekerDashboard() {
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dashboardData, setDashboardData] = React.useState<any>(initialValues);
  const { user }: IUsersStore = useUsersStore() as IUsersStore;

  const fetchDashboardData = async () => {
    setLoading(true);
    const response = await getJobSeekerDashboardData(
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
          Overview of your job applications
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
          <Button variant={"outline"}>Clear</Button>
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
          title="Total Applications"
          value={dashboardData.total}
          icon={
            <div className="bg-blue-100 p-2 rounded border border-blue-400">
              <BarChart3 />
            </div>
          }
          color="border-blue-400 text-blue-600"
          label="Total"
        />

        <DashboardCard
          title="Pending Applications"
          value={dashboardData.pending}
          icon={
            <div className="bg-yellow-100 p-2 rounded border border-yellow-400">
              <Clock />
            </div>
          }
          color="border-yellow-400 text-yellow-600"
          label="Pending"
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

export default JobSeekerDashboard;