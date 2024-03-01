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
    <div className="p-6 bg-stone-700 min-h-screen min-w-screen flex flex-col md:flex-row flex-nowrap items-center justify-around h-full">
      <div className="w-[200px] md:w-[500px] flex flex-col gap-6 p-6">
        {/* <div className="flex flex-row items-center justify-around gap-6">
          <div>
            <img
              src="/logo/etterem-logo.svg"
              className="mx-2"
              alt="Etterem Logo"
            />
          </div>
          <div>
            <img
              src="/logo/ifjusagiszallo-logo.png"
              className="mx-2 "
              alt="Ifjusagiszallo Logo"
            />
          </div>
          <div>
            <img
              src="/logo/szabadidokozpont-logo.png"
              className=" mx-2 "
              alt="Szabadidokozpont Logo"
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-around gap-6">
          <div>
            <img
              src="/logo/latogatokozpont-logo.svg"
              className="mx-2 "
              alt="Latogatokozpont Logo"
            />
          </div>
          <div>
            <img
              src="/logo/magyarszurkek-logo.svg"
              className="mx-2 "
              alt="Magyarszurkek Logo"
            />
          </div>
        </div> */}
      </div>
      <div className="p-6 bg-orange-400 rounded-md md:w-[500px] md:h-[75vh] flex flex-col justify-center">
        <div className="text-lg text-center bold">
          <p className="">Localhost</p>
          <p>Adminisztrációs felület</p>
        </div>
        <hr className="my-6 border-black"></hr>
        <h1 className="text-3xl font-semibold text-center uppercase">
          Bejelentkezés
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              e-mail-cím
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-stone-400 focus:ring-stone-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              jelszó
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-stone-400 focus:ring-stone-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="mb-2 w-full flex justify-center">
            {/* <ReCAPTCHA
              sitekey={recapSiteKey}
              onChange={(e) => {
                setCapVal(e);
              }}
            /> */}
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide bg-emerald-950 text-white transition-colors duration-200 transform rounded-md hover:bg-emerald-900 focus:outline-none focus:bg-emerald-800">
              Bejelentkezés
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
