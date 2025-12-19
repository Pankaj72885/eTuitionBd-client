import { Outlet } from "react-router";
function App() {
  return (
    <div className="font-sans flex flex-col h-screen">
      <header className="bg-black text-white p-4 text-center">Header</header>
      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="bg-black text-white p-4 text-center">Footer</footer>
    </div>
  );
}

export default App;
