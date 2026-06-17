"use client";
import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobTypes, experienceLevels } from "@/constants";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const initialData = {
  keywords: "",
  location: "",
  jobType: "",
  minSalary: 0,
  maxSalary: 0,
  experienceLevel: "",
};

function Filters() {
  const [filters, setFilters] = React.useState(initialData);
  const router = useRouter();

  const onFilter = () => {
    // put all the filters in query params and navigate
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'undefined') {
        queryParams.append(key, value.toString());
      }
    });
    router.push(`/job-seeker/jobs?${queryParams.toString()}`);
  };

  const onClear = () => {
    setFilters(initialData);
    router.push(`/job-seeker/jobs`);
  };

  return (
    <div className="flex gap-5 p-3 max-w-4xl mx-auto border border-gray-300 rounded items-end">
      <div className="flex flex-col gap-1">
        <label htmlFor="keywords" className="text-sm text-gray-600">
          Keywords
        </label>
        <Input
          placeholder="enter keywords"
          value={filters.keywords || ''}
          onChange={(e) => setFilters({ ...filters, keywords: e.target.value })}
          id="keywords"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="location" className="text-sm text-gray-600">
          Location
        </label>
        <Input
          placeholder="enter location"
          value={filters.location || ''}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          id="location"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="jobType" className="text-sm text-gray-600">
          Job Type
        </label>
        <Select
          onValueChange={(value) => setFilters({ ...filters, jobType: value })}
          value={filters.jobType || ''}
        >
          <SelectTrigger id="jobType">
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            {jobTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* <div className="flex flex-col gap-1">
        <label htmlFor="minSalary" className="text-sm text-gray-600">
          Minimum Salary
        </label>
        <Input
          type="number"
          placeholder="enter minimum salary"
          value={filters.minSalary || ""}
          onChange={(e) =>
            setFilters({ ...filters, minSalary: Number(e.target.value) })
          }
          id="minSalary"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="maxSalary" className="text-sm text-gray-600">
          Maximum Salary
        </label>
        <Input
          type="number"
          placeholder="enter maximum salary"
          value={filters.maxSalary || ""}
          onChange={(e) =>
            setFilters({ ...filters, maxSalary: Number(e.target.value) })
          }
          id="maxSalary"
        />
      </div> */}

      <div className="flex flex-col gap-1">
        <label htmlFor="experienceLevel" className="text-sm text-gray-600">
          Experience Level
        </label>
        <Select
          onValueChange={(value) =>
            setFilters({ ...filters, experienceLevel: value })
          }
          value={filters.experienceLevel || ''}
        >
          <SelectTrigger id="experienceLevel">
            <SelectValue placeholder="Select exp" />
          </SelectTrigger>
          <SelectContent>
            {experienceLevels.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-5">
        <Button onClick={onFilter}>Filter</Button>
        <Button variant="outline" onClick={() => onClear()}>
          Clear
        </Button>
      </div>
    </div>
  );
}

export default Filters;
