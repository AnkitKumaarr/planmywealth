import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Sidebar({
  isOpen,
  setIsOpen,
  pathname,
  handlePathChange,
}) {
  const { user } = useAuth();
  const menuItemsUser = [
    { title: "Overview", icon: "📊", path: "dashboard" },
    { title: "Reports", icon: "📈", path: "reports" },
    { title: "Documents", icon: "📁", path: "documents" },
    { title: "Quotations", icon: "💰", path: "quotations" },
    { title: "Account", icon: "🤵", path: "account" },
  ];
  const menuItemsManager = [
    { title: "Overview", icon: "📊", path: "dashboard" },
    { title: "Reports", icon: "📈", path: "reports" },
    { title: "Documents", icon: "📁", path: "documents" },
    { title: "Quotations", icon: "💰", path: "quotations" },
    { title: "Refer", icon: "🔊", path: "refer" },
    { title: "Your Referrals", icon: "🔗", path: "your-referrals" },
    { title: "Partial Information", icon: "📋", path: "partial-information" },
    { title: "Account", icon: "🤵", path: "account" },
  ];

  const menuItemsAdmin = [
    { title: "Overview", icon: "📊", path: "dashboard" },
    { title: "Reports", icon: "📈", path: "reports" },
    { title: "Documents", icon: "📁", path: "documents" },
    { title: "Quotations", icon: "💰", path: "quotations" },
    { title: "Refer", icon: "🔊", path: "refer" },
    { title: "Your Referrals", icon: "🔗", path: "your-referrals" },
    { title: "Partial Information", icon: "📋", path: "partial-information" },
    { title: "Add Advisor", icon: "👨", path: "add-advisor" },
    { title: "Account", icon: "🤵", path: "account" },
  ];

  const menuItems =
    user?.role === "admin"
      ? menuItemsAdmin
      : user?.role === "manager"
      ? menuItemsManager
      : menuItemsUser;

  return (
    <aside
      className={`fixed left-0 h-[calc(100vh-64px)] bg-white shadow-lg z-30
        w-64 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 lg:z-0`}
    >
      <div className="h-full overflow-y-auto">
        <div className="py-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              className={`flex items-center px-6 py-3 cursor-pointer transition-colors
                hover:bg-gray-50 active:bg-gray-100
                ${
                  pathname === item.path
                    ? "bg-green-50 text-green-600 font-semibold"
                    : "text-gray-700"
                }`}
              onClick={() => {
                handlePathChange(item.path);
                localStorage.setItem("pmwcurrentPath", item.path);
                if (window.innerWidth < 1024) {
                  setIsOpen(false);
                }
              }}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              <span className="text-sm">{item.title}</span>
            </a>
          ))}
        </div>
        <div className="absolute bottom-6 left-6 space-y-4">
          <Link href={"/"} className="flex items-center text-green-600">
            <span className="mr-2">←</span> Go Back
          </Link>
        </div>
      </div>
    </aside>
  );
}
