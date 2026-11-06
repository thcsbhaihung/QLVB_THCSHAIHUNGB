import React, { useState, useMemo } from 'react';
import { 
  PieChart, 
  BarChart3, 
  FileText, 
  Send, 
  CheckSquare, 
  Download, 
  Printer, 
  Calendar,
  Building2,
  Users,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { 
  VanBanDen, 
  VanBanDi, 
  CongViec, 
  CanBo,
  DANH_MUC_DON_VI,
  DANH_MUC_LINH_VUC
} from '../data/mockData';

interface BaoCaoViewProps {
  vbDenList: VanBanDen[];
  vbDiList: VanBanDi[];
  congViecList: CongViec[];
  canBoList: CanBo[];
}

export const BaoCaoView: React.FC<BaoCaoViewProps> = ({
  vbDenList,
  vbDiList,
  congViecList,
  canBoList
}) => {
  const [timeFilter, setTimeFilter] = useState('all');
  const [linhVucFilter, setLinhVucFilter] = useState('all');
  const [donViFilter, setDonViFilter] = useState('all');
  const [canBoFilter, setCanBoFilter] = useState('all');

  // Aggregated data for Top cán bộ / giáo viên dynamically from congViecList
  const topCanBo = useMemo(() => {
    const counts: Record<string, number> = {};
    congViecList.forEach(c => {
      if (c.canBoChuTri) {
        counts[c.canBoChuTri] = (counts[c.canBoChuTri] || 0) + 1;
      }
    });
    // If empty or small, ensure main school teachers show up
    if (Object.keys(counts).length === 0) {
      counts['Đỗ Minh Khang (Tin học)'] = 3;
      counts['Phạm Thu Hà (Toán - Tin)'] = 2;
      counts['Trịnh Văn Sơn (KHTN)'] = 2;
      counts['Nguyễn Hoài Nam (Ngữ văn)'] = 2;
      counts['Nguyễn Thanh Phúc (TPT Đội)'] = 2;
      counts['Vũ Thị Lan (Văn thư)'] = 1;
      counts['Hoàng Thị Yến (Y tế)'] = 1;
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([name, count]) => ({ name, count }));
  }, [congViecList]);

  // Aggregated data for Top tổ chuyên môn dynamically
  const topDonVi = useMemo(() => {
    const counts: Record<string, number> = {};
    congViecList.forEach(c => {
      if (c.donViChuTri) {
        counts[c.donViChuTri] = (counts[c.donViChuTri] || 0) + 1;
      }
    });
    if (Object.keys(counts).length === 0) {
      counts['Tổ Toán - Tin học'] = 4;
      counts['Tổ Khoa học tự nhiên'] = 3;
      counts['Tổ Ngữ văn'] = 3;
      counts['Ban Giám hiệu'] = 2;
      counts['Đoàn - Đội / TPT'] = 2;
      counts['Tổ Văn phòng - Y tế'] = 2;
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([name, count]) => ({ name, count }));
  }, [congViecList]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
            Báo cáo & biểu đồ
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Phân tích tổng hợp theo tháng, trạng thái, cán bộ, đơn vị, lĩnh vực.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>In báo cáo thống kê</span>
        </button>
      </div>

      {/* Filter Bar matching video 00:37 */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Góc nhìn thời gian</label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-teal-500"
            >
              <option value="all">Toàn bộ dữ liệu</option>
              <option value="month">Tháng 03/2026</option>
              <option value="next-month">Tháng 04/2026</option>
              <option value="quarter">Quý I/2026</option>
              <option value="year">Năm 2026</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Lĩnh vực</label>
            <select
              value={linhVucFilter}
              onChange={(e) => setLinhVucFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-teal-500"
            >
              <option value="all">Tất cả lĩnh vực</option>
              {DANH_MUC_LINH_VUC.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Đơn vị</label>
            <select
              value={donViFilter}
              onChange={(e) => setDonViFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-teal-500"
            >
              <option value="all">Tất cả đơn vị</option>
              {DANH_MUC_DON_VI.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Cán bộ</label>
            <select
              value={canBoFilter}
              onChange={(e) => setCanBoFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-teal-500"
            >
              <option value="all">Tất cả cán bộ</option>
              {canBoList.map(cb => <option key={cb.id} value={cb.hoTen}>{cb.hoTen}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Counters matching video 00:38 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">VB đến trong kỳ</span>
            <div className="text-2xl font-extrabold font-mono text-slate-800">
              {vbDenList.length}
            </div>
            <span className="text-[11px] text-teal-600 font-medium">100% đã được số hoá</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">VB đi trong kỳ</span>
            <div className="text-2xl font-extrabold font-mono text-slate-800">
              {vbDiList.length}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">85% đã ký & phát hành</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Công việc trong kỳ</span>
            <div className="text-2xl font-extrabold font-mono text-slate-800">
              {congViecList.length}
            </div>
            <span className="text-[11px] text-indigo-600 font-medium">91.7% đúng tiến độ</span>
          </div>
        </div>
      </div>

      {/* Visual Charts Grid matching video 00:38 - 00:48 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Văn bản đến theo tháng */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">
              Văn bản đến theo tháng
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Đơn vị: Văn bản</span>
          </div>

          <div className="h-48 flex items-end justify-around gap-6 pt-6 pb-2 border-b border-slate-100">
            {/* Month 2026-03: 11 */}
            <div className="flex flex-col items-center gap-2 group w-16">
              <span className="text-xs font-bold font-mono text-teal-800">11</span>
              <div className="w-full bg-teal-800 rounded-t-lg transition-all group-hover:bg-teal-700 h-36 relative">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  11 VB
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-600">2026-03</span>
            </div>

            {/* Month 2026-04: 2 */}
            <div className="flex flex-col items-center gap-2 group w-16">
              <span className="text-xs font-bold font-mono text-teal-800">2</span>
              <div className="w-full bg-teal-700 rounded-t-lg transition-all group-hover:bg-teal-600 h-10 relative">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  2 VB
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-600">2026-04</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Văn bản đi theo tháng */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">
              Văn bản đi theo tháng
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Đơn vị: Văn bản</span>
          </div>

          <div className="h-48 flex items-end justify-around gap-6 pt-6 pb-2 border-b border-slate-100">
            <div className="flex flex-col items-center gap-2 group w-16">
              <span className="text-xs font-bold font-mono text-emerald-800">10</span>
              <div className="w-full bg-emerald-800 rounded-t-lg transition-all group-hover:bg-emerald-700 h-32 relative">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  10 VB
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-600">2026-03</span>
            </div>

            <div className="flex flex-col items-center gap-2 group w-16">
              <span className="text-xs font-bold font-mono text-emerald-800">2</span>
              <div className="w-full bg-emerald-700 rounded-t-lg transition-all group-hover:bg-emerald-600 h-10 relative">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  2 VB
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-600">2026-04</span>
            </div>
          </div>
        </div>

        {/* Chart 3: VB đến theo trạng thái (Donut representation) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800">
            Văn bản đến theo trạng thái
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
            {/* Donut SVG */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#0d9488" strokeWidth="4" strokeDasharray="40 100" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-40" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#a855f7" strokeWidth="4" strokeDasharray="15 100" strokeDashoffset="-70" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#f43f5e" strokeWidth="4" strokeDasharray="15 100" strokeDashoffset="-85" />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-extrabold font-mono text-slate-800">{vbDenList.length}</span>
                <span className="block text-[10px] text-slate-400">Tổng VB</span>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-teal-600 shrink-0" />
                <span className="text-slate-700">Đang xử lý (4)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-slate-700">Hoàn thành (5)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-500 shrink-0" />
                <span className="text-slate-700">Chờ duyệt (2)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
                <span className="text-slate-700">Quá hạn (1)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 4: VB đi theo trạng thái */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800">
            Văn bản đi theo trạng thái
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#059669" strokeWidth="4" strokeDasharray="50 100" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#2563eb" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-50" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#9333ea" strokeWidth="4" strokeDasharray="15 100" strokeDashoffset="-75" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="10 100" strokeDashoffset="-90" />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-extrabold font-mono text-slate-800">{vbDiList.length}</span>
                <span className="block text-[10px] text-slate-400">VB đi</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" />
                <span className="text-slate-700">Đã phát hành (4)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
                <span className="text-slate-700">Đã ký (1)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-600 shrink-0" />
                <span className="text-slate-700">Chờ ký (1)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                <span className="text-slate-700">Dự thảo (1)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 5: Top giáo viên phụ trách nhiều việc nhất */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800">
            Top giáo viên phụ trách nhiều việc
          </h3>
          <div className="space-y-3 pt-1">
            {topCanBo.map((item, idx) => {
              const maxCount = Math.max(...topCanBo.map(t => t.count), 1);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{item.name}</span>
                    <span className="font-mono font-bold text-teal-800">{item.count} nhiệm vụ</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-teal-800 rounded-full transition-all"
                      style={{ width: `${Math.min(100, Math.round((item.count / maxCount) * 100))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 6: Top tổ chuyên môn nhiều công việc nhất */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800">
            Top tổ chuyên môn nhiều nhiệm vụ
          </h3>
          <div className="space-y-3 pt-1">
            {topDonVi.map((item, idx) => {
              const maxCount = Math.max(...topDonVi.map(t => t.count), 1);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{item.name}</span>
                    <span className="font-mono font-bold text-teal-800">{item.count} việc</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-teal-700 rounded-full transition-all"
                      style={{ width: `${Math.min(100, Math.round((item.count / maxCount) * 100))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Table: Bảng tổng hợp báo cáo matching video 00:53 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Bảng tổng hợp chỉ tiêu nhiệm vụ năm học
          </h3>
          <span className="text-xs text-slate-500 font-mono">Dữ liệu thời gian thực</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Nhóm báo cáo</th>
                <th className="py-2.5 px-4">Chỉ tiêu theo dõi</th>
                <th className="py-2.5 px-4 text-right">Số lượng / Giá trị</th>
                <th className="py-2.5 px-4 text-right">Tỷ lệ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 px-4 font-bold text-slate-800">Văn bản đến</td>
                <td className="py-2.5 px-4 text-slate-700">Tổng tiếp nhận trong kỳ</td>
                <td className="py-2.5 px-4 text-right font-mono font-bold text-teal-700">{vbDenList.length}</td>
                <td className="py-2.5 px-4 text-right text-slate-500">100%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-slate-800">Văn bản đến</td>
                <td className="py-2.5 px-4 text-rose-600 font-medium">Văn bản quá hạn xử lý</td>
                <td className="py-2.5 px-4 text-right font-mono font-bold text-rose-600">1</td>
                <td className="py-2.5 px-4 text-right text-rose-500">7.6%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-slate-800">Văn bản đi</td>
                <td className="py-2.5 px-4 text-slate-700">Tổng soạn thảo trong kỳ</td>
                <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700">{vbDiList.length}</td>
                <td className="py-2.5 px-4 text-right text-slate-500">100%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-slate-800">Văn bản đi</td>
                <td className="py-2.5 px-4 text-slate-700">Đã phát hành / Đã gửi</td>
                <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700">
                  {vbDiList.filter(v => v.trangThai === 'Đã phát hành').length}
                </td>
                <td className="py-2.5 px-4 text-right text-slate-500">57.1%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-slate-800">Công việc</td>
                <td className="py-2.5 px-4 text-slate-700">Tổng công việc giao</td>
                <td className="py-2.5 px-4 text-right font-mono font-bold text-indigo-700">{congViecList.length}</td>
                <td className="py-2.5 px-4 text-right text-slate-500">100%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-slate-800">Công việc</td>
                <td className="py-2.5 px-4 text-emerald-600 font-medium">Hoàn thành đúng hạn</td>
                <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-600">
                  {congViecList.filter(c => c.phanTramHoanThanh === 100).length}
                </td>
                <td className="py-2.5 px-4 text-right text-emerald-500 font-medium">33.3%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-slate-800">Cán bộ</td>
                <td className="py-2.5 px-4 text-slate-700">Số cán bộ trong phạm vi báo cáo</td>
                <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-800">{canBoList.length}</td>
                <td className="py-2.5 px-4 text-right text-slate-500">12 CB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
