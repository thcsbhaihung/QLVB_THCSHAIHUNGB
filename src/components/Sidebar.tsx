import React from 'react';
import { 
  FileText, 
  Send, 
  CheckSquare, 
  Users, 
  PieChart, 
  FolderKanban, 
  Settings, 
  LayoutDashboard,
  Search,
  GraduationCap,
  LogOut,
  Shield,
  School
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  vbDenCount: number;
  vbDiCount: number;
  congViecCount: number;
  canBoCount: number;
  onQuickSearch: (query: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  vbDenCount,
  vbDiCount,
  congViecCount,
  canBoCount,
  onQuickSearch
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan nhà trường', icon: LayoutDashboard },
    { id: 'vb-den', label: 'Văn bản đến', icon: FileText, count: vbDenCount },
    { id: 'vb-di', label: 'Văn bản đi', icon: Send, count: vbDiCount },
    { id: 'cong-viec', label: 'Nhiệm vụ & Công việc', icon: CheckSquare, count: congViecCount },
    { id: 'can-bo', label: 'Cán bộ - Giáo viên', icon: Users, count: canBoCount },
    { id: 'nguoi-dung', label: 'Người dùng & Phân quyền', icon: Shield },
    { id: 'danh-muc', label: 'Tổ & Danh mục trường', icon: FolderKanban },
    { id: 'bao-cao', label: 'Báo cáo & Thống kê', icon: PieChart },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 select-none shadow-sm h-screen sticky top-0">
      <div>
        {/* Brand Header for School */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-teal-600/20">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-slate-800 text-sm tracking-tight flex items-center gap-1.5">
              <span>QLVB Trường học</span>
            </div>
            <p className="text-[11px] text-teal-700 font-semibold">
              Trường THCS • Năm học 2025-2026
            </p>
          </div>
        </div>

        {/* Quick Search */}
        <div className="p-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tra cứu số hiệu, kế hoạch, đề thi..."
              onChange={(e) => onQuickSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Menu Items */}
        <nav className="px-2 space-y-1 mt-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 shadow-sm border border-teal-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.count !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isActive
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-700 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              HT
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-800">Hiệu trưởng</div>
              <div className="text-[11px] text-slate-500">Nguyễn Văn An</div>
            </div>
          </div>

          <button
            onClick={() => alert('Đăng xuất thành công!')}
            title="Đăng xuất"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
