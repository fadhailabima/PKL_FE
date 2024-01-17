"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePathname, useRouter } from "next/navigation";
import { SIDENAV_ITEMS } from "@/constants";
import { SideNavItem } from "@/types";
import { Icon } from "@iconify/react";
import { logout } from "@/services/auth";
import { Button } from "./ui/button";
import { Admin, getAdmin } from "@/services/admin";

// Menuitem dapat diambil di luar fungsi agar bisa digunakan di luar komponen
const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  // Perhatikan bahwa fungsi ini harus mengembalikan JSX
  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-xl  flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => (
                <Link
                  key={idx}
                  href={subItem.path}
                  className={`${subItem.path === pathname ? "font-bold" : ""}`}
                >
                  <span>{subItem.title}</span>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};
export default function Sidebar() {
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
    <div className="md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/profile"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-14 w-full"
        >
          <Icon
            icon="iconamoon:profile-fill"
            className="h-9 w-9 flex items-center justify-center text-center"
          />
          <span className="font-semibold text-base">{data?.nama}</span>
        </Link>
        <div className="flex flex-col space-y-5  md:px-4 ">
          <Link
            href="/dashboard"
            className="flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100"
          >
            <Icon icon="lucide:home" width="24" height="24" />
            <span className="font-semibold text-xl flex">Home</span>
          </Link>
          {SIDENAV_ITEMS.map((item, idx) => (
            <MenuItem key={idx} item={item} />
          ))}
          <Link
            href="/tambah-user
            "
            className="flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100"
          >
            <Icon icon="lucide:user-plus" width="24" height="24" />
            <span className="font-semibold text-xl flex">Tambah User</span>
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
