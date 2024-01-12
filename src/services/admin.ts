import axios from "axios";

export type Admin = {
  nama: string;
  handphone: string;
  status: string;
  user_id: number;
  alamat?: string;
  email?: string;
  foto?: string;
};
export const getAdmin = async (token: string): Promise<Admin> => {
  try {
    const response = await axios.get("http://localhost:8000/api/getadmin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data.admin);

    return response.data.admin;
  } catch (error) {
    console.log(error);
    throw new Error(`Terjadi kesalahan dalam mendapatkan data admin`);
  }
};
