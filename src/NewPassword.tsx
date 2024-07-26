import { useState, useEffect } from "react";
import { resetPassword } from "./endpoint/endpoint";

const NewPassword = () => {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const tokenFromUrl = new URLSearchParams(window.location.search).get(
      "token"
    );
    console.log(tokenFromUrl);
    setToken(tokenFromUrl);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.length < 6) {
      setError("Password must be at least 6 characters long");
    } else {
      if (!token) {
        setError("Invalid reset token");
        return;
      }
      try {
        await resetPassword(token, input);
        setIsSubmitted(true);
        // Password reset successful, redirect or show success message
        console.log("Password reset successful");
      } catch (error) {
        setError("You have already updated your password");
        setInput("");
      }
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-3xl font-extrabold text-center text-gray-900">
            Password Reset Successful
          </h1>
          <a href="exp://192.168.1.10:8081" className="block mt-4 text-center text-indigo-600 hover:text-indigo-500">Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          Write your new password
        </h1>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={input}
                    onChange={handleInput}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isSubmitted} // Deshabilitar el botón cuando el formulario ya se ha enviado
                >
                  Reset Password
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
