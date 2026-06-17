import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import dayjs from "dayjs";

import { jobs } from "@/data";


export default function TableDemo() {
  return (
    <Table className="mt-5 max-w-3xl mx-auto border-x-2 border-dotted border-primary caption-top px-3">
      <TableCaption className="text-3xl font-extrabold text-primary text-center">Recent Jobs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[600px] text-center">Title</TableHead>
          <TableHead className="w-[300px] text-center">Location</TableHead>
          <TableHead className="w-[300px] text-center">Job Type</TableHead>
          <TableHead className="w-[300px] text-center">Last Date To Apply</TableHead>
          
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.title}>
            <TableCell className="w-[600px] text-center font-bold">{job.title}</TableCell>
            <TableCell className="w-[300px] text-center">{job.location}</TableCell>
            <TableCell className="w-[300px] text-center">{job.job_type.toUpperCase()}</TableCell>
            <TableCell className="w-[300px] text-center">{job.last_date_to_apply}</TableCell>
           
          </TableRow>
        ))}
      </TableBody>
    
    </Table>
  )
}
