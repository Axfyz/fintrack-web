import { Toaster } from "./components/ui/sonner";
import { TransactionsProvider } from "./contexts/transaction-context";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <TransactionsProvider>
      <AppRoutes />
      <Toaster position="top-right" richColors />
    </TransactionsProvider>
  );
}

export default App;
