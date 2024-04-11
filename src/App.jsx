import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Materials from "./pages/Materials";
import Indigo from "./pages/Indigo";
import Paints from "./pages/Paints";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import PaintReceipts from "./pages/PaintReceipts";
import PaintExpenses from "./pages/PaintExpenses";
import IndigoReceipts from "./pages/IndigoReceipts";
import Account from "./pages/Account";
import IndigoExpences from "./pages/IndigoExpences";
import Others from "./pages/Others";
import OtherReceipts from "./pages/OtherReceipts";
import OtherExpenses from "./pages/OtherExpenses";
import MaterialReceipts from "./pages/MaterialReceipts";
import MaterialExpenses from "./pages/MaterialExpenses";
import ProtectedRoute from "./ui/ProtectedRoute";
import Users from "./pages/Users";
import { SearchProvider } from "./contexts/SearhContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <SearchProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="materials" element={<Materials />} />
              <Route
                path="materials/receipts/:materialReceiptId"
                element={<MaterialReceipts />}
              />
              <Route
                path="materials/expenses/:materialExpenseId"
                element={<MaterialExpenses />}
              />

              <Route path="indigo" element={<Indigo />} />
              <Route
                path="indigo/receipts/:indigoReceiptId"
                element={<IndigoReceipts />}
              />
              <Route
                path="indigo/expences/:indigoExpenseId"
                element={<IndigoExpences />}
              />

              <Route path="paints" element={<Paints />} />
              <Route
                path="paints/receipts/:paintIdReceipt"
                element={<PaintReceipts />}
              />
              <Route
                path="paints/expences/:paintIdExpense"
                element={<PaintExpenses />}
              />

              <Route path="others" element={<Others />} />
              <Route
                path="others/receipts/:otherReceiptId"
                element={<OtherReceipts />}
              />
              <Route
                path="others/expences/:otherExpenseId"
                element={<OtherExpenses />}
              />

              <Route path="users" element={<Users />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </SearchProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerSstyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
