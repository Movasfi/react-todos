import Header from "./components/Header";
import { Outlet } from 'react-router-dom';
import { useDark } from "./customHooks/useDark";
import router from "./routes";
import { AssigneeProvider } from "./customHooks/DataContext";

function App() {
  const { isDark, setIsDark } = useDark();



  return (
    <div className={`min-h-screen  ${isDark ? "bg-slate-50  text-black" : "bg-black  text-white "} `}>
      <header className="border-b border-slate-200 dark:border-slate-800 p-4">
        <Header isDark={isDark} setIsDark={setIsDark} />
      </header>

      <main className="p-8 flex flex-col gap-7 justify-center items-center">
        <AssigneeProvider>
          <Outlet />
        </AssigneeProvider>
      </main>
    </div>
  );
}

export default App;