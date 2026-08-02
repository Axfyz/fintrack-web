import { Home, Wallet, PieChart } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Transaksi", url: "/transaction", icon: Wallet },
  { title: "Laporan", url: "#", icon: PieChart },
];

const dummyUser = {
  name: "Testing",
  email: "testing@example.com",
  avatar: "",
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Wallet className="size-7 stroke-green-400" />
          <span className="font-bold">Fintrack</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={dummyUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
