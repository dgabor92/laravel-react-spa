import * as React from "react";
import { useState, useEffect } from "react";
import { logIn } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { LoginFormProps } from "@/lib/interfaces";

export default function Login() {
  let loginAttempts = 0;
  let lastLoginAttempt: number | null = null;
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginFormProps>({
    email: "",
    password: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/admin/dashboard");
    } else {
      return;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      notification.error({
        message: "Error",
        description: "Kérem töltse ki az összes mezőt!",
      });
      return;
    }
    try {
      if (lastLoginAttempt && Date.now() - lastLoginAttempt < 15 * 60 * 1000) {
        notification.error({
          message: "Error",
          description:
            "15 perc várakozási idő szükséges a következő bejelentkezés előtt.",
        });
        return;
      }
      if (loginAttempts >= 3) {
        lastLoginAttempt = Date.now();
        loginAttempts = 0;
        notification.error({
          message: "Error",
          description:
            "Túl sok sikertelen bejelentkezési kísérlet. Kérjük, próbálkozzon újra 15 perc múlva.",
        });
        return;
      }
      const response = await logIn(form.email, form.password);
      localStorage.setItem("token", response.token);
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "Hibás e-mail-cím vagy jelszó",
      });
      loginAttempts++;
    }
  };

  return (
    <div className="relative flex lg:flex-row flex-col justify-center min-h-screen overflow-hidden p-4 bg-black items-center">
      <div className="flex items-center flex-col m-auto p-2">
        {/* <img
          className="w-36 lg:w-96"
          src="vadaszlogo.jpg"
          alt="Vadász pizza logo"
        ></img> */}
        <div className="text-center text-white font-bold mt-6 text-4xl">
          Üdvözlünk!
        </div>
      </div>
      <div className="w-full p-6 rounded-md max-w-md lg:max-w-xl lg:ml-auto bg-orange-500 lg:self-stretch flex flex-col justify-center m-10">
        <div className="">
          <h1 className="text-3xl font-semibold text-center uppercase pt-10">
            Belépés
          </h1>
          <div className="flex flex-row items-center text-center">
            <hr className="border-gray-800 grow"></hr>
            <div className="p-1 text-gray-800">admin felületre</div>
            <hr className="border-gray-800 grow"></hr>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              E-mail cím
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Jelszó
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          {/* <div className="mb-2 w-full flex justify-center">
            <ReCAPTCHA
              sitekey={recapSiteKey}
              onChange={(e) => {
                setCapVal(e);
              }}
            />
          </div> */}
          <div className="mt-6">
            <button
              // disabled={!capVal}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-400"
            >
              Belépés
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
