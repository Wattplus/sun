import { AppRoutes } from "./AppRoutes";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
      <Toaster />
    </>
  );
}

export default App;