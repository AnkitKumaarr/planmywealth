export default function Sidebar({
  isOpen,
  setIsOpen,
  pathname,
  handlePathChange,
}) {
  const menuItems = [
    { title: "Overview", icon: "📊", path: "dashboard" },
    { title: "Reports", icon: "📈", path: "reports" },
    { title: "Documents", icon: "📁", path: "documents" },
    { title: "Quotations", icon: "💰", path: "quotations" },
    { title: "Refer & Earn", icon: "🔊", path: "refer" },
    { title: "Account", icon: "🤵", path: "account" },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 h-full bg-white shadow-md transition-all duration-300 ${
        isOpen ? "w-64" : "w-0"
      } overflow-hidden`}
    >
      <div className="py-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            className={`flex items-center px-6 py-3 cursor-pointer ${
              pathname === item.path
                ? "bg-gray text-green-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => {
              handlePathChange(item.path);
              localStorage.setItem("pmwcurrentPath", item.path);
            }}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.title}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
