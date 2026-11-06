import React from 'react';
import { 
  FileText, 
  Send, 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  PlusCircle,
  School,
  Calendar,
  User,
  TrendingUp,
  BarChart3,
  GraduationCap
} from 'lucide-react';
import { VanBanDen, VanBanDi, CongViec, CanBo } from '../data/mockData';

interface DashboardViewProps {
  vbDenList: VanBanDen[];
  vbDiList: VanBanDi[];
  congViecList: CongViec[];
  canBoList: CanBo[];
  onOpenVbDen: (vb: VanBanDen) => void;
  onOpenCongViec: (cv: CongViec) => void;
  onNavigateTab: (tab: string) => void;
  onOpenAddVbDen: () => void;
  onOpenAddVbDi: () => void;
  onOpenAddCongViec: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  vbDenList,
  vbDiList,
  congViecList,
  canBoList,
  onOpenVbDen,
  onOpenCongViec,
  onNavigateTab,
  onOpenAddVbDen,
  onOpenAddVbDi,
  onOpenAddCongViec
}) => {
  const totalVbDen = vbDenList.length;
  const totalVbDi = vbDiList.length;
  const totalCongViec = congViecList.length;
  const vbChoKy = vbDiList.filter(v => v.trangThai === 'Chờ ký' || v.trangThai === 'Dự thảo').length + 
                  vbDenList.filter(v => v.trangThai === 'Chờ duyệt/ký').length;
  const congViecDangXuLy = congViecList.filter(c => c.trangThai === 'Đang xử lý').length;
  const congViecSapHan = congViecList.filter(c => c.canhBaoHan === 'Sắp hạn').length;
  const congViecQuaHan = congViecList.filter(c => c.trangThai === 'Quá hạn' || c.canhBaoHan === 'Quá hạn').length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Overview Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
          <span>Tổng quan điều hành nhà trường</span>
          <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
            Năm học 2025 - 2026
          </span>
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Theo dõi điều hành văn bản chỉ đạo của Sở/Phòng GD&ĐT, văn bản phát hành và tiến độ chuyên môn các tổ bộ môn.
        </p>
      </div>

      {/* KPI Counters Grid for School */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div 
          onClick={() => onNavigateTab('vb-den')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-teal-400 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase">VB đến trường</span>
            <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-800 group-hover:text-teal-700 transition-colors">
            {totalVbDen}
          </div>
          <div className="text-[11px] text-teal-600 mt-1 font-medium flex items-center gap-1">
            <span>Sở / Phòng / UBND</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => onNavigateTab('vb-di')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-400 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase">VB đi nhà trường</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Send className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-800 group-hover:text-emerald-700 transition-colors">
            {totalVbDi}
          </div>
          <div className="text-[11px] text-emerald-600 mt-1 font-medium flex items-center gap-1">
            <span>Kế hoạch & Báo cáo</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => onNavigateTab('cong-viec')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-indigo-400 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Nhiệm vụ chuyên môn</span>
            <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CheckSquare className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-800 group-hover:text-indigo-700 transition-colors">
            {totalCongViec}
          </div>
          <div className="text-[11px] text-indigo-600 mt-1 font-medium flex items-center gap-1">
            <span>Tiến độ giáo viên</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => onNavigateTab('vb-di')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-purple-400 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Chờ BGH duyệt ký</span>
            <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-800 group-hover:text-purple-700 transition-colors">
            {vbChoKy}
          </div>
          <div className="text-[11px] text-purple-600 mt-1 font-medium flex items-center gap-1">
            <span>Ký số & ban hành</span>
          </div>
        </div>

        <div 
          onClick={() => onNavigateTab('cong-viec')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Đang thực hiện</span>
            <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-800 group-hover:text-amber-700 transition-colors">
            {congViecDangXuLy}
          </div>
          <div className="text-[11px] text-amber-600 mt-1 font-medium flex items-center gap-1">
            <span>{congViecSapHan} việc sắp hạn</span>
          </div>
        </div>

        <div 
          onClick={() => onNavigateTab('cong-viec')}
          className="bg-white p-4 rounded-xl border border-rose-200 shadow-2xs hover:border-rose-400 hover:shadow-xs transition-all cursor-pointer group bg-rose-50/20"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-rose-600 uppercase">Nhiệm vụ trễ hạn</span>
            <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-rose-700">
            {congViecQuaHan}
          </div>
          <div className="text-[11px] text-rose-600 mt-1 font-bold flex items-center gap-1">
            <span>Đôn đốc giáo viên</span>
          </div>
        </div>
      </div>

      {/* 3 Shortcut Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={onOpenAddVbDen}
          className="p-4 bg-gradient-to-r from-teal-50 to-white border border-teal-200/80 rounded-xl flex items-center justify-between cursor-pointer hover:border-teal-400 shadow-2xs hover:shadow-xs transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                Tiếp nhận văn bản đến
              </div>
              <p className="text-[11px] text-slate-500">
                Vào sổ công văn chỉ đạo từ Sở GD, Phòng GD, UBND
              </p>
            </div>
          </div>
          <PlusCircle className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
        </div>

        <div 
          onClick={onOpenAddVbDi}
          className="p-4 bg-gradient-to-r from-emerald-50 to-white border border-emerald-200/80 rounded-xl flex items-center justify-between cursor-pointer hover:border-emerald-400 shadow-2xs hover:shadow-xs transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                Soạn văn bản đi trường
              </div>
              <p className="text-[11px] text-slate-500">
                Kế hoạch giáo dục, quyết định coi thi, tờ trình BGH
              </p>
            </div>
          </div>
          <PlusCircle className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
        </div>

        <div 
          onClick={onOpenAddCongViec}
          className="p-4 bg-gradient-to-r from-cyan-50 to-white border border-cyan-200/80 rounded-xl flex items-center justify-between cursor-pointer hover:border-cyan-400 shadow-2xs hover:shadow-xs transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-700 text-white flex items-center justify-center shadow-xs">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
                Giao việc tổ chuyên môn
              </div>
              <p className="text-[11px] text-slate-500">
                Phân công ra đề thi, nộp học bạ, bồi dưỡng HSG
              </p>
            </div>
          </div>
          <PlusCircle className="w-5 h-5 text-cyan-700 group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* Main Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Văn bản đến mới nhất (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-800">
                Văn bản chỉ đạo tiếp nhận mới nhất
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('vb-den')}
              className="text-xs text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1"
            >
              <span>Xem tất cả ({vbDenList.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-3">Mã VB</th>
                  <th className="py-2.5 px-3">Số/Ký hiệu</th>
                  <th className="py-2.5 px-3">Cơ quan ban hành</th>
                  <th className="py-2.5 px-3">Trích yếu</th>
                  <th className="py-2.5 px-3">Phụ trách</th>
                  <th className="py-2.5 px-3">Hạn xử lý</th>
                  <th className="py-2.5 px-3 text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vbDenList.slice(0, 6).map((vb) => (
                  <tr 
                    key={vb.id}
                    onClick={() => onOpenVbDen(vb)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-teal-700">
                      {vb.id}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-700 whitespace-nowrap">
                      {vb.soKyHieu}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 font-medium whitespace-nowrap">
                      {vb.coQuanBanHanh}
                    </td>
                    <td className="py-2.5 px-3 text-slate-800 max-w-[200px] truncate font-medium" title={vb.trichYeu}>
                      {vb.trichYeu}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 font-medium whitespace-nowrap">
                      {vb.canBoChuTri}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                      {vb.hanXuLy}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        vb.trangThai === 'Hoàn thành' ? 'bg-emerald-50 text-emerald-700' :
                        vb.trangThai === 'Quá hạn' ? 'bg-rose-50 text-rose-700' :
                        vb.trangThai === 'Chờ duyệt/ký' ? 'bg-purple-50 text-purple-700' :
                        vb.trangThai === 'Đang xử lý' ? 'bg-amber-50 text-amber-700' :
                        'bg-blue-50 text-blue-700'
                      }`}>
                        {vb.trangThai}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Nhiệm vụ chuyên môn cần đôn đốc (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <h3 className="text-sm font-bold text-slate-800">
                  Nhiệm vụ chuyên môn cần chú ý
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('cong-viec')}
                className="text-xs text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1"
              >
                <span>Xem tất cả ({congViecList.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {congViecList.slice(0, 4).map((cv) => (
                <div 
                  key={cv.id}
                  onClick={() => onOpenCongViec(cv)}
                  className="p-3.5 hover:bg-slate-50 cursor-pointer transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-slate-800">{cv.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      cv.trangThai === 'Quá hạn' ? 'bg-rose-100 text-rose-800' :
                      cv.canhBaoHan === 'Sắp hạn' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {cv.trangThai === 'Quá hạn' ? 'Quá hạn (-5 ngày)' : `Hạn nộp: ${cv.hanHoanThanh}`}
                    </span>
                  </div>

                  <p className="text-xs text-slate-800 font-semibold line-clamp-1">
                    {cv.noiDung}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                    <span>Phụ trách: <strong className="text-slate-800">{cv.canBoChuTri}</strong></span>
                    <span className="font-bold text-teal-700">{cv.phanTramHoanThanh}% HT</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        cv.trangThai === 'Quá hạn' ? 'bg-rose-500' :
                        cv.phanTramHoanThanh === 100 ? 'bg-emerald-500' : 'bg-teal-600'
                      }`}
                      style={{ width: `${cv.phanTramHoanThanh}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <button
              onClick={() => onNavigateTab('bao-cao')}
              className="text-xs text-teal-700 hover:text-teal-800 font-semibold inline-flex items-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Xem biểu đồ phân tích chuyên môn & báo cáo kỳ học</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
