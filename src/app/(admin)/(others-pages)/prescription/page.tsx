import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PrescriptionEditor from "./PrescriptionEditor";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Doctor's Clinic | Prescription",
  description:
    "Prescription",
};

export default function Prescription() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Rx" />
      <div className="space-y-6">
        <ComponentCard title="Editor">
          <PrescriptionEditor />
        </ComponentCard>
      </div>
    </div>
  );
}
