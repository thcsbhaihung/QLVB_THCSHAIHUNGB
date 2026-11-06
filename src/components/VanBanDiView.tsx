import React, { useState, useMemo } from 'react';
import { 
  Send, 
  Search, 
  Plus, 
  Eye, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  AlertCircle,
  Paperclip,
  Share2,
  GraduationCap
} from 'lucide-react';
import { VanBanDi } from '../data/mockData';

interface VanBanDiViewProps {
  vbDiList: VanBanDi[];
  onOpenAddModal: () => void;
  onUpdateStatus: (id: string, newStatus: VanBanDi['trangThai']) => void;
}

export const VanBanDiView: React.FC<VanBanDiViewProps> = ({
  vbDiList,
  onOpenAddModal,
  onUpdateStatus
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredList = useMemo(() => {
    return vbDiList.filter(item => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.soKyHieu.toLowerCase().includes(query) ||
        item.trichYeu.toLowerCase().includes(query) ||
        item.nguoiKy.toLowerCase().includes(query) ||
        item.donViSoan.toLowerCase().includes(query);

      const matchesStatus = statusFilter === 'all' || item.trangThai === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [vbDiList, searchQuery, statusFilter]);

  const countDuThao = vbDiList.filter(v => v.trangThai === 'Dự thảo').length;
  const countChoKy = vbDiList.filter(v => v.trangThai === 'Chờ ký').length;
  const countDaKy = vbDiList.filter(v => v.trangThai === 'Đã ký').length;
  const countDaPhatHanh = vbDiList.filter(v => v.trangThai === 'Đã phát hành').length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            <span>Văn bản đi nhà trường</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              Kế hoạch • Quyết định • Báo cáo
            </span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Soạn thảo kế hoạch giáo dục, quyết định chuyên môn, tờ trình BGH và phát hành gửi cấp trên / toàn trường.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Soạn văn bản đi mới</span>
        </button>
      </div>

      {/* Filter and Stats */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo số hiệu, trích yếu, người ký (Hiệu trưởng / PHT), tổ soạn..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Tất cả trạng thái phát hành</option>
              <option value="Dự thảo">Dự thảo</option>
              <option value="Chờ góp ý">Chờ góp ý</option>
              <option value="Chờ ký">Chờ BGH ký</option>
              <option value="Đã ký">Đã ký duyệt</option>
              <option value="Đã phát hành">Đã phát hành</option>
              <option value="Thu hồi">Thu hồi</option>
            </select>
          </div>
        </div>

        {/* Counter chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div 
            onClick={() => setStatusFilter('Dự thảo')}
            className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
              statusFilter === 'Dự thảo' ? 'bg-amber-50 border-amber-300' : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-lg font-extrabold font-mono text-amber-700">{countDuThao}</div>
            <div className="text-[11px] font-semibold text-slate-600">Dự thảo đang soạn</div>
          </div>

          <div 
            onClick={() => setStatusFilter('Chờ ký')}
            className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
              statusFilter === 'Chờ ký' ? 'bg-purple-50 border-purple-300' : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-lg font-extrabold font-mono text-purple-700">{countChoKy}</div>
            <div className="text-[11px] font-semibold text-slate-600">Trình Hiệu trưởng ký</div>
          </div>

          <div 
            onClick={() => setStatusFilter('Đã ký')}
            className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
              statusFilter === 'Đã ký' ? 'bg-blue-50 border-blue-300' : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-lg font-extrabold font-mono text-blue-700">{countDaKy}</div>
            <div className="text-[11px] font-semibold text-slate-600">Đã ký (Chờ cấp số)</div>
          </div>

          <div 
            onClick={() => setStatusFilter('Đã phát hành')}
            className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
              statusFilter === 'Đã phát hành' ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-lg font-extrabold font-mono text-emerald-700">{countDaPhatHanh}</div>
            <div className="text-[11px] font-semibold text-slate-600">Đã gửi đi / Phát hành</div>
          </div>
        </div>
      </div>

      {/* Outgoing Docs Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Sổ văn bản đi nhà trường ({filteredList.length})
          </span>
          {(statusFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => { setStatusFilter('all'); setSearchQuery(''); }}
              className="text-xs text-emerald-700 hover:underline font-semibold"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Số đi</th>
                <th className="py-3 px-4">Số/Ký hiệu</th>
                <th className="py-3 px-4">Ngày soạn</th>
                <th className="py-3 px-4 max-w-sm">Trích yếu nội dung</th>
                <th className="py-3 px-4">Người ký</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4">Hạn phát hành</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/90 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-800 whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800 whitespace-nowrap">
                    {item.soKyHieu}
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {item.ngaySoan}
                  </td>
                  <td className="py-3 px-4 text-slate-900 max-w-xs font-medium">
                    <div className="line-clamp-2" title={item.trichYeu}>
                      {item.trichYeu}
                    </div>
                    {item.vbDenLienQuan && (
                      <span className="inline-block mt-0.5 text-[10px] font-mono text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                        Báo cáo theo VB đến: {item.vbDenLienQuan}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-800 block">{item.nguoiKy}</span>
                    <span className="text-[10px] text-slate-500">{item.donViSoan}</span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      item.trangThai === 'Đã phát hành' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      item.trangThai === 'Đã ký' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      item.trangThai === 'Chờ ký' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {item.trangThai}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap font-medium">
                    {item.hanPhatHanh}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap space-x-1">
                    {item.trangThai === 'Dự thảo' && (
                      <button
                        onClick={() => onUpdateStatus(item.id, 'Chờ ký')}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
                      >
                        Trình BGH
                      </button>
                    )}
                    {item.trangThai === 'Chờ ký' && (
                      <button
                        onClick={() => onUpdateStatus(item.id, 'Đã ký')}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        Ký duyệt
                      </button>
                    )}
                    {item.trangThai === 'Đã ký' && (
                      <button
                        onClick={() => onUpdateStatus(item.id, 'Đã phát hành')}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors shadow-2xs"
                      >
                        Phát hành
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
