import axios from "axios";

export const login = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:8000/api/login", {
      username: username,
      password: password,
    });

    console.log(response.data);

    if (response.data.message === "Login Berhasil") {
      return response.data.data.user;
    } else {
      throw new Error("Kombinasi username dan password tidak valid.");
    }
  } catch (error) {
    throw new Error(`Terjadi kesalahan dalam proses login`);
  }
};

export const logout = async (token) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data && response.data.message === "Logout berhasil") {
      return true; // Berhasil logout
    } else {
      throw new Error("Gagal melakukan logout");
    }
  } catch (error) {
    // Include the original error message in the thrown error
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Terjadi kesalahan dalam proses logout";
    throw new Error(errorMessage);
  }
};

export const signUp = async (token, username, nama, level, password) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/signup",
      {
        username,
        nama,
        level,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      console.log("Signup successful:", response.data.message);
    } else {
      console.error("Unexpected response:", response.data);
    }
  } catch (error) {
    console.error(
      "Error during signup:",
      error.response.data.errors || error.message
    );
  }
};

export const updateProfile = async (token, alamat, email, handphone, foto) => {
  try {
    console.log("alamat", alamat);
    console.log("email", email);
    console.log("handphone", handphone);

    const formData = new FormData();
    formData.append("alamat", alamat);
    formData.append("email", email);
    formData.append("handphone", handphone);

    if (foto) {
      formData.append("foto", foto);
    }
    if (alamat)
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
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

    return response.data;
  } catch (error) {
    throw error;
  }
};
