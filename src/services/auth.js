import axios from "axios";

export const login = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:8000/api/login", {
      username: username,
      password: password,
    });

    if (response.data.message === "Login Berhasil") {
      return response.data.data.user.token;
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
