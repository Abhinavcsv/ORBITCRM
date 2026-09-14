import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#020617] text-white overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-8">
          <div className="min-h-full rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}

export default MainLayout;