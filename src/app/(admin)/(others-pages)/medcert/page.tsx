import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Medical from "./MedicalEditor";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Doctor's Clinic | Medical Certificate",
  description:
    "Medical Certificate",
};

export default function MedicalCertificate() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Medical Certificate" />
      <div className="space-y-6">
        <ComponentCard title="Editor">
          <Medical />
        </ComponentCard>
      </div>
    </div>
  );
}
