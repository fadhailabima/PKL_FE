import axios from "axios";

export type Admin = {
  idadmin: string;
  nama: string;
  handphone: string;
  status: string;
  user_id: number;
  alamat?: string;
  email?: string;
  foto?: string;
  image_url?: string;
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

export type Count = {
  jumlah_rak: number;
  jumlah_produk: number;
  jumlah_user: number;
  jumlah_transaksi: number;
};

export const getCount = async (token: string): Promise<Count> => {
  try {
    const response = await axios.get("http://localhost:8000/api/getStatistik", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("ini response", response);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Terjadi kesalahan dalam mendapatkan data admin`);
  }
};

export const updateProfile = async (token: string, alamat: string, email: string, handphone: string, foto: File | null) => {
  try {
    const formData = new FormData();
    formData.append("alamat", alamat);
    formData.append("email", email);
    formData.append("handphone", handphone);

    if (foto) {
      formData.append("foto", foto);
    }

    const response = await axios.post(
      "http://localhost:8000/api/updateProfile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Server responded with status code ${response.status}`);
    }

    return response.data;
  } catch (error: any) {
    if (error instanceof Error) {
      console.error('Error updating profile:', error.message);
      throw new Error(`Terjadi kesalahan dalam memperbarui profil: ${error.message}`);
    } else {
      // Handle the case where error is not an Error object
      throw new Error('An unknown error occurred.');
    }
  }
};

export type Karyawan = {
  idkaryawan: string;
  nama: string;
  handphone: string;
  status: string;
  user_id: number;
  alamat?: string;
  email?: string;
  foto?: string;
};

export type User = {
  id: number;
  username: string;
  admin: Admin;
  karyawan: Karyawan;
  level: string;
};

export const getUser = async (token: string): Promise<User[]> => {
  try {
    const response = await axios.get("http://localhost:8000/api/manageUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data.users);

    return response.data.users;
  } catch (error) {
    console.log(error);
    throw new Error(`Terjadi kesalahan dalam mendapatkan data user`);
  }
};

export const deleteUser = async (token: string, id: number) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/deleteUser/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const changeStatus = async (
  token: string,
  id: number,
  status: string
) => {
  try {
    console.log("status", status);
    const response = await axios.post(
      `http://localhost:8000/api/changeStatus/${id}`,
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};
