"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  addProduk,
  Produk,
  getProduk,
  jenisProduk,
  getJenisProduk,
} from "@/services/produk";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function TambahProduk() {
  // const [position, setPosition] = React.useState("karyawan");
  const [namaproduk, setNamaproduk] = useState("");
  const [jenisproduk, setJenisproduk] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [data, setData] = useState<Produk[] | null>(null);
  const [jenis_produk, setJenisProduk] = useState<jenisProduk[] | null>(null);

  const JenisProduk = async (token: string) => {
    const res = await getJenisProduk(token);
    setJenisProduk(res);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      JenisProduk(token);
    }
  }, []);

  const getData = async (token: string) => {
    const res = await getProduk(token);
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

  const handleAddProduk = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // get the token from local storage
      if (!token) {
        throw new Error("No token found");
      }
      const res = await addProduk(token, namaproduk, jenisproduk, value);
      if (res) {
        console.log("Successfully added Product");
        router.push("/tambah-produk");
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
              Tambah Produk
            </h2>
            <div>
              <Link href="/manage-produk">
                <Button className="mt-6">Kembali</Button>
              </Link>
            </div>
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-3 text-md">
              Nama Produk
            </label>
            <Input
              onChange={(e) => setNamaproduk(e.target.value)}
              placeholder="Masukkan Nama Produk"
            />
          </div>
          <label className="text-gray-800 font-semibold block my-3 text-md">
            Jenis Produk
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-56 mt-2 mb-2 rounded-lg px-4 py-2 text-lg tracking-wide font-semibold font-sans ${jenisproduk}`}
              >
                {jenisproduk || "Pilih Jenis Produk"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Pilih Jenis Produk</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={jenisproduk}
                onValueChange={setJenisproduk}
              >
                {jenis_produk?.map((item, index) => (
                  <DropdownMenuRadioItem key={index} value={item.jenisproduk}>
                    {item.jenisproduk}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <label className="text-gray-800 font-semibold block my-3 text-md">
              Volume Produk
            </label>
            <Input
              onChange={(e) => setValue(e.target.value)}
              placeholder="Masukkan Volume Produk"
            />
          </div>
          <Button
            className="w-full mt-6 mb-3 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
            onClick={handleAddProduk}
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
