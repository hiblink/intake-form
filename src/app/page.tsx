import Sidebar from "../components/Sidebar";
import Form from "../components/Form";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen">
      {/* Fixed Sidebar */}
      <div className="md:fixed inset-y-0 left-0 md:w-1/4 z-10">
        <Sidebar />
      </div>

      {/* Form Section with new background color */}
      <div className="flex-1 md:ml-[25%] min-h-screen bg-gradient-to-br from-[#FDF6F0] to-indigo-100 flex justify-center items-start px-6 pt-6 md:pt-12 md:px-12">
        <div className="w-full md:w-4/5 lg:w-[85%]">
          <Form />
        </div>
      </div>
    </main>
  );
}