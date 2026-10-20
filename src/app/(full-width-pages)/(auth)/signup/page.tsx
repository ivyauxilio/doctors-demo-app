import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor's Clinic | SignUp Page",
  description:
    "SignUp Page",
};

export default function SignUp() {
  return <SignUpForm />;
}
