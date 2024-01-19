"use client";

import Image from "next/image";
import { FaLock, FaUser } from "react-icons/fa";
import { login } from "../services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type } from "os";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      if (res) {
        console.log("ini berhasil login");
        localStorage.setItem("token", res.token);
        localStorage.setItem("level", res.level);
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
      <div className="flex shadow-md">
        <div
          className="bg-green-300 flex flex-wrap content-center justify-center rounded-l-md"
          style={{ width: "24rem", height: "32rem" }}
        >
          <div className="w-72">
            <h1 className="text-xl font-semibold">Selamat Datang</h1>
            <small className="text-gray-400">Silahkan Login</small>

            <form className="mt-4">
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Username
                </label>
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  type="username"
                  placeholder="Enter your username"
                />
              </div>

              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Password
                </label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="*****"
                />
              </div>
              <div className="mb-3">
                <Button onClick={handleLogin}>Sign in</Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          </div>
        </div>

        <div
          className="flex flex-wrap content-center justify-center rounded-r-md"
          style={{ width: "24rem", height: "32rem" }}
        >
          <img
            className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md"
            src="saprotan.jpg"
            alt="Login Banner"
          />
        </div>
      </div>
    </div>
  );
}
