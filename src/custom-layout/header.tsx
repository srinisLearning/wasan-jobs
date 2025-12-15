import { Button } from "@/components/ui/button";
import { IUser } from "@/interfaces";
import useUsersStore, { IUsersStore } from "@/store/users-store";
import { Menu } from "lucide-react";
import React from "react";
import SidebarMenuItems from "./sidebar-menuitems";

function Header() {
  const { user }: IUsersStore = useUsersStore() as IUsersStore;
  const [openMenuItems, setOpenMenuItems] = React.useState<boolean>(false);
  return (
    <div className="bg-primary p-5 flex justify-between items-center">
      <h1 className="text-white font-bold text-2xl">Wasan Jobs</h1>
      <div>
        <h3 className="text-white font-bold text-xl">{user?.role.toUpperCase()} DASHBOARD</h3>
      </div>

      <div className="flex gap-5 items-center">
        <h1 className="text-sm text-white font-bold">
          {user?.name.toUpperCase()} 
        </h1>
        <Button onClick={() => setOpenMenuItems(true)}>
          {" "}
          <Menu color="white" size={15} />
        </Button>
      </div>

      <SidebarMenuItems
        openMenuItems={openMenuItems}
        setOpenMenuItems={setOpenMenuItems}
        role={user?.role || ""}
      />
    </div>
  );
}

export default Header;
