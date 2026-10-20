import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import LogsPage from "./usersLog"
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Doctor's Clinic | User's Log",
  description:
    "User's Log",
};

export default function MedicalCertificate() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Logs" />
      <div className="space-y-6">
        <ComponentCard title="Activity Logs">
          <LogsPage />
        </ComponentCard>
      </div>
    </div>
  );
}
