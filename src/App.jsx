// src/App.jsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx"; {/* Componente de Login */}
import Index from "./pages/Index.jsx"; {/* pagina Principal/Contenedor */} {/* pagina/contenedor */}
import Foro from "./pages/Foro.jsx";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>  {/* Aca importo componentes de shadcn */}
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/foro" element={<Login />}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
