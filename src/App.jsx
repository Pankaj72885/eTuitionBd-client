import { Outlet } from "react-router";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
function App() {
  return (
    <div className="font-sans flex flex-col h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
