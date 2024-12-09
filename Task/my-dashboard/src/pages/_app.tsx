import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: any) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}
