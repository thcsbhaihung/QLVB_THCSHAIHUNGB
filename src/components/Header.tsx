import React from 'react';
import { 
  Plus, 
  FileText, 
  Send, 
  CheckSquare, 
  School,
  Globe
} from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
  onOpenAddVbDen: () => void;
  onOpenAddVbDi: () => void;
  onOpenAddCongViec: () => void;
  onOpenWebAndDriveModal?: () => void;
  onResetData?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onOpenAddVbDen,
  onOpenAddVbDi,
  onOpenAddCongViec,
  onOpenWebAndDriveModal,
  onResetData
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
      <div>
        <h1 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
          <span>{title}</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {onResetData && (
          <button
            onClick={onResetData}
            title="Khôi phục lại dữ liệu mẫu trường học ban đầu"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs"
          >
            <span>Dữ liệu mẫu</span>
          </button>
        )}

        {/* Lấy VB từ Web & Drive Button */}
        {onOpenWebAndDriveModal && (
          <button
            onClick={onOpenWebAndDriveModal}
            title="Đọc và lấy văn bản tự động từ URL Web hoặc Google Drive"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100 transition-colors shadow-2xs"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span>Lấy VB từ Web & Drive</span>
          </button>
        )}

        {/* Quick Actions for School */}
        <button
          onClick={onOpenAddVbDen}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors shadow-2xs"
        >
          <FileText className="w-3.5 h-3.5 text-teal-600" />
          <span>+ Tiếp nhận VB đến</span>
        </button>

        <button
          onClick={onOpenAddVbDi}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs"
        >
          <Send className="w-3.5 h-3.5 text-emerald-600" />
          <span>+ Soạn VB đi trường</span>
        </button>

        <button
          onClick={onOpenAddCongViec}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow-sm"
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>+ Giao việc giáo viên</span>
        </button>
      </div>
    </header>
  );
};
