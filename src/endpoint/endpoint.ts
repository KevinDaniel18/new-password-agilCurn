import axios from "axios";

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await axios.post(
      `https://agilcurn-backend.onrender.com/auth/reset-password`,
      { token, newPassword }
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw new Error("Failed to reset password");
  }
};

export async function addMembers(email: string, projectName: string) {
  try {
    const response = await fetch(
      `${process.env.API_PRODUCTION_URL}/auth/search-by-email?email=${email}&projectName=${projectName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to search user by email");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching user by email:", error);
    throw error;
  }
}
