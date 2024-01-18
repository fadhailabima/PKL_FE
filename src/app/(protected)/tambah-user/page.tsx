"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
import { signUp } from "@/services/auth";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Profile() {
  // const [position, setPosition] = React.useState("karyawan");
  const [username, setUsername] = useState("");
  const [nama, setNama] = useState("");
  const [level, setLevel] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handlesignUp = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const res = await signUp(username, nama, level, password);
      if (res !== undefined && res !== null) {
        console.log("ini berhasil signup");
        localStorage.setItem("token", res);
        localStorage.setItem("user", JSON.stringify(res));
        router.push("/tambah-user");
      }
    } catch (error: any) {
      setError(error.message);
    }

    setShowSuccessAlert(true);

    // Reload the page after a short delay (adjust the delay if needed)
    setTimeout(() => {
      window.location.reload();
    }, 3500);
  };
  return (
    <div className="h-250 py-2 flex justify-center items-center">
      <div className="lg:w-2/5 md:w-1/2 w-2/3">
        <form className="bg-white p-10 rounded-lg shadow-lg min-w-full">
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
            Register
          </h1>
          <div>
            <label className="text-gray-800 font-semibold block my-3 text-md">
              Username
            </label>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-3 text-md">
              Nama
            </label>
            <Input
              onChange={(e) => setNama(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <label className="text-gray-800 font-semibold block my-3 text-md">
            Level
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-56 mt-2 mb-2 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans">
                Select Level
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Level User</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={level} onValueChange={setLevel}>
                <DropdownMenuRadioItem value="admin">
                  Admin
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="karyawan">
                  Petugas
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <label className="text-gray-800 font-semibold block my-3 text-md">
              Password
            </label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <Button
            className="w-full mt-6 mb-3 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
            onClick={handlesignUp}
          >
            Login
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Gagal Sign Up</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {showSuccessAlert && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Sign Up Successful</AlertTitle>
              <AlertDescription>
                Your account has been created successfully.
              </AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
