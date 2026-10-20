"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/icons";

interface EcommerceMetricsProps {
  total: number | null;
  today_total: number | null;
}

// export const EcommerceMetrics = () => {
export const EcommerceMetrics: React.FC<EcommerceMetricsProps> = ({ total, today_total }) => {  
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-red-200 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-2">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Patients
            </span>

          </div>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {total}
            </h4>
          {/* <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-2">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Walk-in Today
            </span>
          </div>
           <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {today_total}
            </h4>

          {/* <Badge color="error">
            <ArrowDownIcon className="text-error-500" />
            9.05%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
