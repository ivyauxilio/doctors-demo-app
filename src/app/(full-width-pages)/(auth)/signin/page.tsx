import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor's Clinic | SignIn Page",
  description:
    "SignIn Page",
};

export default function SignIn() {
  return <SignInForm />;
}
