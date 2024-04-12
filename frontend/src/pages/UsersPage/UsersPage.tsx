import { notification } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { getUsers, getUser, getLogs } from "../../lib/api";
import Dashboard from "@/components/Dashboard";
import { ActionLog, UserInfo } from "@/lib/interfaces";

const UsersPage = () => {
  const createColumn = (name: string, selector: (row: any) => any) => ({
    name,
    selector,
    sortable: true,
  });

  const queryClient = useQueryClient();

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const { data: logs } = useQuery({
    queryKey: ["logs"],
    queryFn: getLogs,
  });

  const columns = [
    createColumn("Név", (userInfo: UserInfo) => userInfo.name),
    createColumn("Email", (userInfo: UserInfo) => userInfo.email),
    createColumn("Role", (userInfo: UserInfo) => userInfo.role),
    {
      name: "Műveletek",
      cell: (userInfo: UserInfo) => {
        return (
          <div className="flex gap-1">
            {/* <CustomButton
              className="transition-colors duration-200 border-2 border-black rounded-lg p-1 bg-red-600 hover:bg-red-500 active:bg-red-400"
              defaultStyle={false}
              svg={<TrashIcon width={24} height={24} />}
              onClick={() => {
                if (userInfo.id === user?.id) {
                  notification.error({
                    message: "Hiba",
                    description: "A saját fiókod nem törölheted",
                  });
                } else if (user?.role !== "admin") {
                  notification.error({
                    message: "Hiba",
                    description: "Csak admin törölhet felhasználói fiókot!",
                  });
                } else {
                  setUserToDelete(userInfo);
                }
              }}
            ></CustomButton> */}
          </div>
        );
      },
    },
  ];

  const logColumns = [
    createColumn("Név", (actionLog: ActionLog) => actionLog.username),
    createColumn("Tevékenység", (actionLog: ActionLog) => actionLog.action),

    createColumn("Leírás", (actionLog: ActionLog) => (
      <div title={actionLog.description}>
        {actionLog.description.length > 40
          ? `${actionLog.description.substring(0, 40)}...`
          : actionLog.description}
      </div>
    )),
    createColumn("Dátum", (actionLog: ActionLog) => {
      const date = new Date(actionLog.created_at);
      return date.toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    }),
  ];

  return (
    <Dashboard>
      <div className="flex flex-col sm:flex-row gap-20">
        <div className="sm:w-[50%]">
          <DataTable
            title={
              <span>
                <span className="align-middle pr-1">Felhasználók</span>
                {/* <CustomButton
                  defaultStyle={false}
                  className="relative float-right rounded-lg transition-colors duration-200 bg-[#FF7B00] border-2 border-black p-1 hover:bg-[#FF7B00]/80 active:bg-[#FF7B00]/60"
                  text="Új felhasználó"
                  svg={<PlusIcon width={24} height={24} />}
                  onClick={() => {
                    if (user && user.role === "admin") {
                      setAddUser(true);
                    } else {
                      notification.error({
                        message: "Hiba",
                        description:
                          "Csak admin felhasználó hozhat létre új felhasználói fiókot",
                      });
                    }
                  }}
                /> */}
              </span>
            }
            columns={columns}
            data={users || []}
            pagination
            paginationComponentOptions={{
              noRowsPerPage: false,
              rangeSeparatorText: "tól-ig",
              selectAllRowsItem: true,
              selectAllRowsItemText: "Összes",
              rowsPerPageText: "Sorok száma:",
            }}
          />
        </div>
        <div className="sm:w-[50%]">
          <DataTable
            title={
              <span>
                <span className="align-middle pr-1">Logok</span>
              </span>
            }
            columns={logColumns}
            data={logs || []}
            pagination
            paginationComponentOptions={{
              noRowsPerPage: false,
              rangeSeparatorText: "tól-ig",
              selectAllRowsItem: true,
              selectAllRowsItemText: "Összes",
              rowsPerPageText: "Sorok száma:",
            }}
            customStyles={{
              cells: {
                style: {
                  paddingLeft: "5px", // or whatever space you need
                  paddingRight: "5px",
                },
              },
            }}
          />
        </div>
      </div>
      {/* {addUser ? (
        <AddUserModal
          returnFunction={() => {
            setAddUser(false);
          }}
        />
      ) : null} */}
      {/* {userToDelete ? (
        <ConfirmModal
          title={`Biztos törölni akarod: ${userToDelete.name}`}
          onConfirm={async () => {
            try {
              const userId = userToDelete.id;
              if (typeof userId === "number") {
                await deleteUserMutation.mutateAsync(userId);
              }
              notification.success({
                message: "Sikeres törlés",
                description: "A felhasználó sikeresen törölve",
              });
            } catch (error) {
              console.log(error, "error");
              notification.error({
                message: "Sikertelen törlés",
                description: "A felhasználó törlése sikertelen",
              });
            }
            setUserToDelete(null);
          }}
          onCancel={() => setUserToDelete(null)}
        />
      ) : null} */}
    </Dashboard>
  );
};

export default UsersPage;
