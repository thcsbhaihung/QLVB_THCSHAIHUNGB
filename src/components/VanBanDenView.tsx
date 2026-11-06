import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  ArrowRight, 
  Calendar, 
  AlertCircle, 
  Clock, 
  Briefcase,
  Paperclip,
  CheckCircle2,
  Eye,
  SlidersHorizontal,
  GraduationCap,
  Globe
} from 'lucide-react';
import { VanBanDen } from '../data/mockData';

interface VanBanDenViewProps {
  vbDenList: VanBanDen[];
  onOpenDetail: (vb: VanBanDen) => void;
  onOpenAddModal: () => void;
  onCreateTask: (vb: VanBanDen) => void;
  onOpenWebAndDriveModal?: () => void;
}

export const VanBanDenView: React.FC<VanBanDenViewProps> = ({
  vbDenList,
  onOpenDetail,
  onOpenAddModal,
  onCreateTask,
  onOpenWebAndDriveModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [hanFilter, setHanFilter] = useState('all');

  const filteredList = useMemo(() => {
    return vbDenList.filter(item => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.soKyHieu.toLowerCase().includes(query) ||
        item.trichYeu.toLowerCase().includes(query) ||
        item.coQuanBanHanh.toLowerCase().includes(query) ||
        item.canBoChuTri.toLowerCase().includes(query) ||
        item.donViChuTri.toLowerCase().includes(query);

      const matchesStatus = statusFilter === 'all' || item.trangThai === statusFilter;
      const matchesHan = hanFilter === 'all' || item.canhBaoHan === hanFilter;

      return matchesSearch && matchesStatus && matchesHan;
    });
  }, [vbDenList, searchQuery, statusFilter, hanFilter]);

  const countMoiTiepNhan = vbDenList.filter(v => v.trangThai === 'Mới tiếp nhận').length;
  const countChuaPhanCong = vbDenList.filter(v => v.trangThai === 'Chưa phân công').length;
  const countSapHan = vbDenList.filter(v => v.canhBaoHan === 'Sắp hạn').length;
  const countQuaHan = vbDenList.filter(v => v.canhBaoHan === 'Quá hạn' || v.trangThai === 'Quá hạn').length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            <span>Văn bản đến nhà trường</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 font-semibold border border-teal-200">
              UBND xã • Văn hóa - Xã hội • Xã đoàn
            </span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Tiếp nhận công văn chỉ đạo từ UBND xã, Phòng Văn hóa - Xã hội xã, Xã đoàn; phân công tổ chuyên môn và theo dõi hạn báo cáo.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenWebAndDriveModal && (
            <button
              onClick={onOpenWebAndDriveModal}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-xl text-xs font-semibold shadow-2xs transition-colors shrink-0"
            >
              <Globe className="w-4 h-4 text-indigo-600" />
              <span>Lấy từ Web / Drive</span>
            </button>
          )}

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Vào sổ văn bản đến mới</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo số hiệu, trích yếu, cơ quan, tổ phụ trách..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
            />
          </div>

          {/* Status Dropdown */}
          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-teal-500"
            >
              <option value="all">Tất cả trạng thái chỉ đạo</option>
              <option value="Mới tiếp nhận">Mới tiếp nhận</option>
              <option value="Chưa phân công">Chưa phân công</option>
              <option value="Đã phân công">Đã phân công</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Chờ phối hợp">Chờ phối hợp</option>
              <option value="Chờ duyệt/ký">Chờ duyệt/ký</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Quá hạn">Quá hạn</option>
            </select>
          </div>

          {/* Han filter dropdown */}
          <div className="sm:col-span-3">
            <select
              value={hanFilter}
              onChange={(e) => setHanFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-teal-500"
            >
              <option value="all">Tình trạng hạn: Tất cả</option>
              <option value="Trong hạn">Trong hạn</option>
              <option value="Sắp hạn">Sắp hạn</option>
              <option value="Quá hạn">Quá hạn</option>
            </select>
          </div>
        </div>

        {/* KPI Counter badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div 
            onClick={() => setStatusFilter('Mới tiếp nhận')}
            className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
              statusFilter === 'Mới tiếp nhận' ? 'bg-blue-50 border-blue-300' : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-lg font-extrabold font-mono text-blue-700">{countMoiTiepNhan}</div>
            <div className="text-[11px] font-semibold text-slate-600">Mới tiếp nhận</div>
          </div>

          <div 
            onClick={() => setStatusFilter('Chưa phân công')}
            className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
              statusFilter === 'Chưa phân công' ? 'bg-cyan-50 border-cyan-300' : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-lg font-extrabold font-mono text-cyan-700">{countChuaPhanCong}</div>
            <div className="text-[11px] font-semibold text-slate-600">Chưa giao tổ bộ môn</div>
          </div>

          <div 
            onClick={() => setHanFilter('Sắp hạn')}
            className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
              hanFilter === 'Sắp hạn' ? 'bg-amber-50 border-amber-300' : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-lg font-extrabold font-mono text-amber-700">{countSapHan}</div>
            <div className="text-[11px] font-semibold text-slate-600">Sắp đến hạn báo cáo</div>
          </div>

          <div 
            onClick={() => setHanFilter('Quá hạn')}
            className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
              hanFilter === 'Quá hạn' ? 'bg-rose-50 border-rose-300' : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-lg font-extrabold font-mono text-rose-700">{countQuaHan}</div>
            <div className="text-[11px] font-semibold text-slate-600">Quá hạn xử lý</div>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Sổ văn bản đến nhà trường ({filteredList.length})
          </span>
          {(statusFilter !== 'all' || hanFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => { setStatusFilter('all'); setHanFilter('all'); setSearchQuery(''); }}
              className="text-xs text-teal-700 hover:underline font-semibold"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Số đến</th>
                <th className="py-3 px-4">Số/Ký hiệu</th>
                <th className="py-3 px-4">Ngày đến</th>
                <th className="py-3 px-4 max-w-sm">Trích yếu văn bản chỉ đạo</th>
                <th className="py-3 px-4">Cơ quan ban hành</th>
                <th className="py-3 px-4">Cán bộ / GV phụ trách</th>
                <th className="py-3 px-4">Hạn báo cáo</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((item) => (
                <tr 
                  key={item.id}
                  onClick={() => onOpenDetail(item)}
                  className="hover:bg-slate-50/90 cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-4 font-mono font-bold text-teal-800 whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 whitespace-nowrap">
                    {item.soKyHieu}
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {item.ngayDen}
                  </td>
                  <td className="py-3 px-4 text-slate-900 max-w-xs font-medium">
                    <div className="line-clamp-2" title={item.trichYeu}>
                      {item.trichYeu}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium whitespace-nowrap">
                    {item.coQuanBanHanh}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 font-semibold text-[11px] border border-teal-200">
                      {item.canBoChuTri}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{item.donViChuTri}</span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-800">{item.hanXuLy}</div>
                    {item.canhBaoHan === 'Sắp hạn' && (
                      <span className="text-[10px] text-amber-600 font-bold block">
                        Còn {item.soNgayConLai} ngày
                      </span>
                    )}
                    {item.canhBaoHan === 'Quá hạn' && (
                      <span className="text-[10px] text-rose-600 font-bold block">
                        Trễ {Math.abs(item.soNgayConLai)} ngày
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      item.trangThai === 'Hoàn thành' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      item.trangThai === 'Quá hạn' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                      item.trangThai === 'Chờ duyệt/ký' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      item.trangThai === 'Đang xử lý' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      item.trangThai === 'Đã phân công' ? 'bg-cyan-50 text-cyan-700 border-cyan-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {item.trangThai}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetail(item);
                      }}
                      className="p-1.5 text-slate-400 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors mr-1"
                      title="Xem chi tiết văn bản"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCreateTask(item);
                      }}
                      className="p-1.5 text-slate-400 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Giao nhiệm vụ từ văn bản này"
                    >
                      <Briefcase className="w-4 h-4" />
                    </button>
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
