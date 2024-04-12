import Dashboard from "../components/Dashboard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeSettings, getUser } from "../lib/api";
import { notification } from "antd";
import { useState } from "react";

function Settings() {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
  };
  const [settingForm, setSettingForm] = useState(initialValues);

  const changeSettingMutation = useMutation(
    ({ name, email }: { name: string; email: string }) => {
      return changeSettings(name, email);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleCancel = () => setSettingForm(initialValues);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(settingForm, "settingForm");
    try {
      await changeSettingMutation.mutateAsync({
        name: settingForm.name,
        email: settingForm.email,
      });
      notification.success({
        message: "Sikeres mentés",
        description: "A beállítások sikeresen mentve",
      });
    } catch (error) {
      console.log(error, "error");
      notification.error({
        message: "Hiba",
        description: "A beállítások mentése sikertelen",
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <Dashboard>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h1>
            {/* <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p> */}

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      value={settingForm.name}
                      onChange={(e) =>
                        setSettingForm({ ...settingForm, name: e.target.value })
                      }
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      value={settingForm.email}
                      onChange={(e) =>
                        setSettingForm({
                          ...settingForm,
                          email: e.target.value,
                        })
                      }
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleCancel}
          >
            Mégse
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Mentés
          </button>
        </div>
      </form>
    </Dashboard>
  );
}

export default Settings;
