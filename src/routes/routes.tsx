import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import Transaction from "@/pages/transaction";
import Report from "@/pages/report";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  );
}

export default AppRoutes;
