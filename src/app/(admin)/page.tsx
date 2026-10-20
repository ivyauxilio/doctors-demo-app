"use client"
import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import { useRouter } from 'next/navigation';
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
// import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import Registration from '@/components/ecommerce/RegistrationForm';
// import StatisticsChart from "@/components/ecommerce/StatisticsChart";
// import RecentOrders from "@/components/ecommerce/RecentOrders";
// import DemographicCard from "@/components/ecommerce/DemographicCard";
import { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPatients } from '@/store/slices/patientSlice';
import { RootState, AppDispatch } from '@/store/store';
import useRequireAuth from '@/hooks/useRequireAuth';

const metadata: Metadata = {
  title:
    "DR. Surgical Clinic App",
  description: "This is a doctor's clinic app for patients information",
};

export default function Ecommerce() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [search, setSearch] = useState('');
  const { isAuthenticated } = useRequireAuth();
  const { data, total,today_total, current_page, loading, error } = useSelector((state: RootState) => state.patients);


  // if (isAuthenticated === undefined) {
  //   return <div>Loading...</div>;
  // }
  // if (!isAuthenticated) {
  //   router.push('/signin');
  //   return null;
  // }

  //   useEffect(() => {
  //   // if (isAuthenticated) {
  //   dispatch(fetchPatients({ page: 1, search }));
  //   // }
  //   }, [dispatch, isAuthenticated, search]);
  // // }, [dispatch]);
  //   useEffect(() => {
  //   if (isAuthenticated === false) {
  //     router.push('/signin');
  //   } else if (isAuthenticated === true) {
  //     setAuthChecked(true);
  //   }
  // }, [isAuthenticated, router]);

    // if (!authChecked) {
    // return <div>Loading...</div>; // or a spinner
    // }
  
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics total={total} today_total={today_total} />

        {/* <MonthlySalesChart /> */}
        <Registration/>
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget data={data} />
      </div>
    </div>
  );
}
