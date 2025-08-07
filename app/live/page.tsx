"use client";
import ObjectDetection from "@/components/ObjectDetection";
import React from "react";
import { useSearchParams } from "next/navigation";

const page = () => {
  const params = useSearchParams();
  const email = params.get("email") ?? ""; // default to empty string
  const option = params.get("option") ?? "";
  const delay = params.get("delay") ?? "0";

  return (
    <main className="flex w-full flex-col items-center justify-center py-6 px-6 md:px-16 lg:px-32">
      <ObjectDetection email={email} option={option} delay={delay} />
    </main>
  );
};

export default page;
