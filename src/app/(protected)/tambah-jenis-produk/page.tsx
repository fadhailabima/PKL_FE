"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { addJenisProduk } from "@/services/produk";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function TambahJenisProduk() {
  const [jenisproduk, setJenisproduk] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleAddJenisProduk = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // get the token from local storage
      if (!token) {
        throw new Error("No token found");
      }
      const res = await addJenisProduk(token, jenisproduk);
      if (res) {
        console.log("Successfully added Product");
        router.push("/tambah-jenis-produk");
      }
    } catch (error: any) {
      setError(error.message);
    }

    setShowSuccessAlert(true);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  return (
    <div className="h-250 py-2 flex justify-center items-center">
      <div className="lg:w-2/5 md:w-1/2 w-2/3">
        <form className="bg-white p-10 rounded-lg shadow-lg min-w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-500 mt-2 text-xl text-center font-semibold pb-1">
              Tambah Jenis Produk
            </h2>
            <div>
              <Link href="/manage-jenis-produk">
                <Button className="mt-6">Back</Button>
              </Link>
            </div>
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-3 text-md">
              Jenis Produk
            </label>
            <Input
              onChange={(e) => setJenisproduk(e.target.value)}
              placeholder="Enter your product's type"
            />
          </div>
          <Button
            className="w-full mt-6 mb-3 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
            onClick={handleAddJenisProduk}
          >
            Submit
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Gagal menambahkan produk</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {showSuccessAlert && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Berhasil menambahkan produk</AlertTitle>
              <AlertDescription>Produk berhasil ditambahkan</AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
