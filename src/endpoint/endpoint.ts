import axios from "axios";

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await axios.post(
      "http://192.168.1.6:3000/auth/reset-password",
      { token, newPassword }
    );
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    throw new Error("Failed to reset password");
  }
};
