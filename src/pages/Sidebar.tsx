import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Bell,
  User,
  LogOut,
  //FilePlus,
  ClipboardCheck, // Importar icono de examen
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  closeSidebarIfMobile: () => void;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

export default function Sidebar({
  isOpen,
  closeSidebarIfMobile,
  setActiveTab,
  handleLogout,
}: SidebarProps) {
  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-blue-600 text-white p-6 overflow-y-auto transition-transform duration-300 ease-in-out`}
    >
      <nav className="space-y-8">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("dashboard");
            closeSidebarIfMobile();
          }}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("students");
            closeSidebarIfMobile();
          }}
        >
          <Users className="mr-2 h-4 w-4" /> Estudiantes
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("evaluation");
            closeSidebarIfMobile();
          }}
        >
          <ClipboardList className="mr-2 h-4 w-4" /> Evaluación
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("notifications");
            closeSidebarIfMobile();
          }}
        >
          <Bell className="mr-2 h-4 w-4" /> Notificaciones
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("admin");
            closeSidebarIfMobile();
          }}
        >
          <User className="mr-2 h-4 w-4" /> Administrador
        </Button>

        {/* Nuevo botón para "Crear Exámenes" con icono */}
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("createExam");
            closeSidebarIfMobile();
          }}
        >
          <ClipboardCheck className="mr-2 h-4 w-4" /> Crear Exámenes
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
        </Button>
      </nav>
    </aside>
  );
}
