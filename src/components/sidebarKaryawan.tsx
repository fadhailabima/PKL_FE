"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { logout } from "@/services/auth";
import { Button } from "./ui/button";
import { User } from "@nextui-org/react";
import { Karyawan, getKaryawan } from "@/services/karyawan";

export default function SidebarKaryawan() {
  const router = useRouter();
  const handleDialogContinue = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        // Handle case where token is not available
        console.error("Token not found in local storage");
        return;
      }

      // Call logout function with the retrieved token
      const res = await logout(token);

      if (res) {
        console.log("Logout successful");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const [data, setData] = useState<Karyawan | null>(null);

  const getData = async (token: string) => {
    const res = await getKaryawan(token);
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
    <div className="md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-14 w-full">
          <img src="pt.png" style={{ width: "100px", height: "100px" }} />
        </div>
        <div className="flex flex-col space-y-5  md:px-4 ">
          <Link
            href="/profile-karyawan"
            className="flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100"
          >
            <Icon icon="lucide:user" width="24" height="24" />
            <span className="font-semibold text-xl flex">{data?.nama}</span>
          </Link>
          <Link
            href="/dashboard-karyawan"
            className="flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100"
          >
            <Icon icon="lucide:home" width="24" height="24" />
            <span className="font-semibold text-xl flex">Home</span>
          </Link>
          <Link
            href="/transaksi-masuk
            "
            className="flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100"
          >
            <Icon icon="lucide:plus-circle" width="24" height="24" />
            <span className="font-semibold text-xl flex">Transaksi Masuk</span>
          </Link>
          <Link
            href="/transaksi-keluar
            "
            className="flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100"
          >
            <Icon icon="lucide:folder-output" width="24" height="24" />
            <span className="font-semibold text-xl flex">Transaksi Keluar</span>
          </Link>
          <div className="flex flex-col space-y-9 w-full">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-zinc-100"
                >
                  <Icon
                    icon="lucide:arrow-left-square"
                    width="24"
                    height="24"
                  />
                  <span className="font-semibold text-xl flex">Logout</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Apakah anda yakin ingin keluar ?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDialogContinue}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
