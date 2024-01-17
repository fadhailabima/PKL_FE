"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAdmin, Admin } from "@/services/admin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState, useEffect } from "react";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState<Admin | null>(null);

  const getData = async (token: string) => {
    const res = await getAdmin(token);
    setData(res);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      getData(token);
    }
  }, []);
  return (
    <div className="h-full">
      <div className="border-b-2 block md:flex">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
          <div className="flex justify-between">
            <span className="text-xl font-bold block">Profile</span>
            <a
              href="#"
              className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
            >
              Edit
            </a>
          </div>
          <div className="w-full p-8 mx-2 flex justify-center">
            <Avatar className="max-w-xs w-40 h-40 items-center">
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
          <div className="pb-8">
            <span className="m-8 border-1 rounded-r px-14 py-2 w-full text-[1.2rem]">
              {data?.idadmin}
            </span>
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
          <div className="rounded  shadow p-6">
            <div className="pb-4">
              <label className="font-semibold text-gray-700 block pb-2">
                Nama
              </label>
              <span className="border-1  rounded-r px-4 py-2 w-full text-[1.2rem]">
                {data?.nama}
              </span>
            </div>
            <div className="pb-4">
              <label className="font-semibold text-gray-700 block pb-2">
                Email
              </label>
              <span className="border-1  rounded-r px-4 py-2 w-full text-[1.2rem]">
                {data?.email}
              </span>
            </div>
            <div className="pb-4">
              <label className="font-semibold text-gray-700 block pb-2">
                Alamat
              </label>
              <span className="border-1  rounded-r px-4 py-2 w-full  text-[1.2rem]">
                {data?.alamat}
              </span>
            </div>
            <div className="pb-4">
              <label className="font-semibold text-gray-700 block pb-2">
                Nomor Telepon
              </label>
              <span className="border-1  rounded-r px-4 py-2 w-full text-[1.2rem]">
                {data?.handphone}
              </span>
            </div>
            <div className="pb-4">
              <label className="font-semibold text-gray-700 block pb-2">
                Nomor Telepon
              </label>
              <span className="border-1  rounded-r px-4 py-2 w-full text-[1.2rem]">
                {data?.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
