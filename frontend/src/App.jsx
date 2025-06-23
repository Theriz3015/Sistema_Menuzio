import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
        <AppRoutes />
        <ToastContainer position="top-center" autoClose={2000}></ToastContainer>
    </>
  );
}

export default App;
