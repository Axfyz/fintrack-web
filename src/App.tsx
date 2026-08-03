import { TransactionsProvider } from "./contexts/transaction-context";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <TransactionsProvider>
      <AppRoutes />
    </TransactionsProvider>
  );
}

export default App;
