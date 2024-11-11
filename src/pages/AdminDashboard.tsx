"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Sidebar from "./Sidebar";
import DashboardTab from "./DashboardTab";
import StudentsTab from "./StudentsTab";
import EvaluationTab from "./EvaluationTab";
import NotificationsTab from "./NotificationsTab.tsx";
import AdminTab from "./AdminTab";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import CreateExamTab from "./CreateExamTab"; // Importar CreateExamTab

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    if (location.state?.message) {
      //alert(location.state.message); // Muestra el mensaje de inicio de sesión exitoso
    }
  }, [location]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebarIfMobile = () => {
    if (windowWidth < 1024) setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/login");
    closeSidebarIfMobile();
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen bg-gray-100">
      <Button
        variant="ghost"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebarIfMobile={closeSidebarIfMobile}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
      />

      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsContent value="dashboard">
            <DashboardTab />
          </TabsContent>
          <TabsContent value="students">
            <StudentsTab />
          </TabsContent>
          <TabsContent value="evaluation">
            <EvaluationTab />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
          <TabsContent value="admin">
            <AdminTab />
          </TabsContent>
          <TabsContent value="createExam">
            <CreateExamTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
