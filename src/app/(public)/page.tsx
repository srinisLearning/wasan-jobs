import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import HomeJobCard from "@/components/functional/home-job-card";
import WavesComponent from "@/components/functional/waves-compent";

function Homepage() {
  return (
    <div>
      <div className="px-20 flex justify-between py-5 bg-primary my-5">
        <h1 className="font-bold text-2xl text-white">Wasan Jobs</h1>

        <Button variant={"outline"}>
          <Link href={"/login"}>Login</Link>
        </Button>
      </div>

      <div className="col-span-1 flex flex-col items-center justify-center w-full">
        <div className="col-span-1 flex justify-center">
          <Image
            width={1800}
            height={500}
            src={"/jobs_img_3a.png"}
            alt="hero"
            className="object-contain h-96 box-border-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-primary text-4xl font-bold!">
            Find Your Dream Job Today
          </h1>
          <div className="flex flex-col gap-3 text-sm font-semibold text-gray-600 max-w-6xl text-justify">
            <strong>
              Welcome to Wasan Jobs Board — Your Gateway to Endless Career
              Opportunities
            </strong>
            <p>
              At Wasan Jobs, We make job searching simple, efficient, and
              rewarding. Whether you’re a recent graduate eager to begin your
              professional journey or an experienced professional looking for a
              fresh challenge, our platform connects you with thousands of job
              opportunities across multiple industries.
            </p>
            <p>
              Explore a wide range of listings from top employers who are
              actively seeking talented and motivated individuals like you. Our
              user-friendly interface allows you to browse, filter, and apply
              for jobs quickly — saving time while increasing your chances of
              landing your dream role. You can also upload your resume, track
              your applications, and receive personalized job recommendations
              based on your skills and interests.
            </p>
            <p>
              For employers, Next-Hire offers a streamlined solution to find the
              right candidates faster. Post your job openings effortlessly,
              manage applications with ease, and connect with professionals who
              are genuinely passionate about growing with your organization.
            </p>
          </div>

         
        </div>
      </div>
      <div>
        
      </div>
      <div> <HomeJobCard /></div>

      <div className="flex justify-center my-10">
         <Button className="w-full">
            <Link href={"/register"}>Get Started</Link>
          </Button>

      </div>

      <div>
        <WavesComponent />
      </div>
    
      
    </div>
  );
}

export default Homepage;
