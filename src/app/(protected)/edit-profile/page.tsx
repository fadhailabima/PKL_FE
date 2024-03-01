"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getAdmin, Admin, updateProfile } from "@/services/admin";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function editProfile() {
  const router = useRouter();
  const [data, setData] = useState<Admin | null>(null);
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [handphone, setHandphone] = useState("");
  const [foto, setFoto] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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

  const handleUpdate = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false); // Reset error state before each submission
    setShowSuccessAlert(false); // Reset success state before each submission

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found.");
        // Handle case where token is not available
        return;
      }

      console.log("ini token", token);

      const updated = await updateProfile(
        token,
        alamat,
        email,
        handphone,
        foto ?? null
      );
      console.log("Profile updated successfully", updated);

      setShowSuccessAlert(true); // Set success state only when update is successful

      setTimeout(() => {
        // Pindahkan router.push ke dalam setTimeout
        router.push("/profile");
      }, 1000);
    } catch (error: any) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );

      // Set error state with the error message from the backend
      setError(error.response?.data?.message || error.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoto(e.target.files?.[0]);
  };
  return (
    <div
      className="mt-2 bg-white p-2 shadow rounded-lg"
      style={{ width: "60%", margin: "0 auto", height: "60vh" }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-gray-500 text-lg font-semibold pb-1">
          Edit Profil
        </h2>
        <div>
          <Link href="/profile">
            <Icon
              icon="iconamoon:arrow-left-5-circle-fill"
              className="h-9 w-9 flex items-center justify-center text-center"
            />
          </Link>
        </div>
      </div>
      <div className="my-0.5"></div>
      <div className="bg-gradient-to-r from-green-300 to-green-500 h-px mb-2"></div>
      <div className="text-base flex items-center justify-center">
        <div className="mb-48 mr-8">
          <Avatar className="max-w-xs w-40 h-40 items-center">
            <AvatarImage src={data?.image_url} alt="@shadcn" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
        <form
          className="flex-column justify-items-start"
          encType="multipart/form-data"
          onSubmit={(e) => handleUpdate(e)}
        >
          <div className="mb-6 flex items-center">
            <label className="mr-5 text-sm font-medium text-gray-600">
              Nama:
            </label>
            <Input
              className="p-1"
              placeholder={data?.nama}
              value={data?.nama}
              disabled
            />
          </div>
          <div className="mb-6 flex items-center">
            <label className="mr-3 text-sm font-medium text-gray-600">
              Alamat:
            </label>
            <Input
              className="p-1"
              placeholder={data?.alamat || "Masukkan Alamat"}
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
          </div>
          <div className="mb-6 flex items-center">
            <label className="mr-6 text-sm font-medium text-gray-600">
              Email:
            </label>
            <Input
              className="p-1"
              placeholder={data?.email || "Masukkan Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 flex items-center">
            <label className="mr-2 text-sm font-medium text-gray-600">
              No.Handphone:
            </label>
            <Input
              className="p-1"
              placeholder={data?.handphone || "Masukkan Nomor Handphone"}
              value={handphone}
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
              onChange={handleFileChange}
            />
          </div>
          <div>
            <Button
              className="w-full mt-6 mb-3 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Gagal Update</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {showSuccessAlert && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Update Succesfull</AlertTitle>
                <AlertDescription>
                  Your account has been updated successfully.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
