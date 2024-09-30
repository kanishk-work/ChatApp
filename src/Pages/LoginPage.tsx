import React, { useState } from "react";
import { LoginDetails } from "../Types/login";

interface propsType {
  loginFn: (userCredentials: LoginDetails) => void;
  loginLoading: boolean;
}

const LoginPage: React.FC<propsType> = ({ loginFn, loginLoading }) => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const userCredentials = {
    user_id: "4",
    client_email: "hr@wafer.ee",
    client_name: "Wafer",
    email: email,
    firstName: firstName,
    lastName: lastName,
    role: role,
    profile_pic_url:
      "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-309.jpg",
  };

  const handleSubmit = () => {
    if (userCredentials) {
      loginFn(userCredentials);
    } else {
      console.error("credentials missing");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center dynamic-background-color">
      <form className="flex flex-col gap-5 bg-green-600 rounded-xl p-10">
        <div className="flex items-center justify-between gap-3 w-full">
          <label htmlFor="email" className="text-slate-100">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 rounded-lg"
          />
        </div>
        <div className="flex items-center justify-between gap-3 w-full">
          <label htmlFor="firstName" className="text-slate-100">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="p-2 rounded-lg"
          />
        </div>
        <div className="flex items-center justify-between gap-3 w-full">
          <label htmlFor="lastName" className="text-slate-100">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="p-2 rounded-lg"
          />
        </div>
        <div className="flex items-center justify-between gap-3 w-full">
          <label htmlFor="role" className="text-slate-100">
            Role:
          </label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="p-2 rounded-lg"
          />
        </div>
        {loginLoading? 
          <button
          type="button"
          className="bg-green-100 rounded-lg px-4 py-2"
          disabled
        >
          Loading...
        </button>
        :
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-200 rounded-lg px-4 py-2"
        >
          Submit
        </button>
        }
      </form>
    </div>
  );
};

export default LoginPage;
