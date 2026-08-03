import { Routes, Route } from "react-router-dom";
import DashboardPage from "@/pages/dashboard-page";
import TransactionPage from "@/pages/transaction-page";
import ReportPage from "@/pages/report-page";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/transaction" element={<TransactionPage />} />
      <Route path="/report" element={<ReportPage />} />
    </Routes>
  );
}

export default AppRoutes;
