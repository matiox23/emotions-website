import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPages from "./pages/login";
import AdminDashboard from "./pages/admin-view";
import ExamInterface from "./pages/exam-view";
import Register from "./pages/LoginEstudent";
import { AuthProvider } from "./pages/auth/AuthContext";
import ProtectedRoute from "./pages/auth/ProtectedRoute"; // Importa el ProtectedRoute (lo crearemos en el siguiente paso)

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthPages />} />
          <Route path="/register" element={<Register />} />

          <Route path="/home" element={ <AdminDashboard /> } />
          <Route path="/exam" element={<ExamInterface />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// function Navigation() {
//   return (
//   <Link to="/home">
//     <div>
//       <button
//         type="submit"
//         className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//       >
//         Iniciar Sesión
//       </button>
//     </div>
//   </Link>
//   )
// }
