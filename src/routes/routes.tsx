import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import Transaction from "@/pages/transaction";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transaction" element={<Transaction />} />
    </Routes>
  );
}

export default AppRoutes;
