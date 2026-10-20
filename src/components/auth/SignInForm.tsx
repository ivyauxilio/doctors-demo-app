"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/hooks/useAuth";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchUser } from "@/store/slices/userSlice";

export default function SignInForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.fire({ title: "Logging in...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    const res = await login(email, password, dispatch);

    Swal.close();

    if (res.success) {
      // ✅ redirect after login success
      await dispatch(fetchUser());
      router.replace("/"); // use replace so that going "back" doesn't return to login
    } else {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: res.message || "Please try again",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-md mx-auto">
      <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
        Sign In
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Enter your email and password to sign in!
      </p>

      <form onSubmit={handleLogin} className="mt-6 space-y-6">
        <div>
          <Label>Email <span className="text-error-500">*</span></Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label>Password <span className="text-error-500">*</span></Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox checked={isChecked} onChange={setIsChecked} />
          <span className="text-sm text-gray-600 dark:text-gray-400">Keep me logged in</span>
        </div>
        <Button type="submit" className="w-full">Sign in</Button>
      </form>
    </div>
  );
}
