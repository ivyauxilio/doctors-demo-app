import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Doctor's Clinic | Create User",
  description:
    "Create Account",
};

export default function MedicalCertificate() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Create Account" />
      <div className="space-y-6">
        <ComponentCard title="Front Desk User">
          <SignUpForm />
        </ComponentCard>
      </div>
    </div>
  );
}
