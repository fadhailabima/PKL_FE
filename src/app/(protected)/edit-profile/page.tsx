"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getAdmin, Admin } from "@/services/admin";
import { updateProfile } from "@/services/auth";
import { Input } from "@/components/ui/input";

export default function editProfile() {
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

  //   const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [handphone, setHandphone] = useState("");
  const [foto, setFoto] = useState<File>();

  const handleUpdate = async (
    token: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    try {
      await updateProfile(token, alamat, email, handphone, foto);
      console.log("ini berhasil update");
      router.push("/profile");
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <div
      className="mt-2 bg-white p-2 shadow rounded-lg"
      style={{ width: "50%", margin: "0 auto", height: "70vh" }}
    >
      <h2 className="text-gray-500 text-lg font-semibold pb-1">Edit Profil</h2>
      <div className="my-0.5"></div>
      <div className="bg-gradient-to-r from-green-300 to-green-500 h-px mb-2"></div>
      <div className="text-base flex items-center justify-center">
        <div className="mb-48 mr-8">
          <Avatar className="max-w-xs w-40 h-40 items-center">
            <AvatarImage src={data?.foto} alt="@shadcn" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
        <form
          className="flex-column justify-items-start"
          encType="multipart/form-data"
          method="put"
        >
          <div className="mb-6 flex items-center">
            <label className="mr-5 text-sm font-medium text-gray-600">
              Nama:
            </label>
            <Input className="p-1" placeholder={data?.nama} disabled />
          </div>
          <div className="mb-6 flex items-center">
            <label className="mr-3 text-sm font-medium text-gray-600">
              Alamat:
            </label>
            <Input
              className="p-1"
              placeholder={data?.alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
          </div>
          <div className="mb-6 flex items-center">
            <label className="mr-6 text-sm font-medium text-gray-600">
              Email:
            </label>
            <Input
              className="p-1"
              placeholder={data?.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 flex items-center">
            <label className="mr-2 text-sm font-medium text-gray-600">
              No.Handphone:
            </label>
            <Input
              className="p-1"
              placeholder={data?.handphone}
              onChange={(e) => setHandphone(e.target.value)}
            />
          </div>
          {/* Input file ditambahkan di sini */}
          <div className="mb-4 flex items-center">
            <label className="mr-2 text-sm font-medium text-gray-600">
              Foto:
            </label>
            <input
              type="file"
              id="foto"
              name="foto"
              accept="image/*"
              className="p-1"
              onChange={(e) => setFoto(e.target.files?.[0])}
            />
          </div>
          <div>
            <Button
              className="w-full mt-6 mb-3 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
              onClick={(e) => handleUpdate(localStorage.getItem("token")!, e)}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
