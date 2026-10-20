import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Doctor's Clinic",
  description:
    "Patients Information",
};

export default function Patients() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Patients" />
      <div className="space-y-6">
        <ComponentCard title="List of Patients">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
