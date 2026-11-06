import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  Building2, 
  CheckCircle2, 
  Briefcase,
  UserCheck
} from 'lucide-react';
import { CanBo, CongViec, DANH_MUC_DON_VI } from '../data/mockData';

interface CanBoViewProps {
  canBoList: CanBo[];
  congViecList: CongViec[];
  onOpenAddModal: () => void;
}

export const CanBoView: React.FC<CanBoViewProps> = ({
  canBoList,
  congViecList,
  onOpenAddModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [donViFilter, setDonViFilter] = useState('all');
  const [chucVuFilter, setChucVuFilter] = useState('all');

  const filteredList = useMemo(() => {
    return canBoList.filter(cb => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        cb.id.toLowerCase().includes(query) ||
        cb.hoTen.toLowerCase().includes(query) ||
        cb.chucVu.toLowerCase().includes(query) ||
        cb.sdt.includes(query) ||
        cb.email.toLowerCase().includes(query);

      const matchesDonVi = donViFilter === 'all' || cb.donVi === donViFilter;
      const matchesChucVu = chucVuFilter === 'all' || cb.chucVu === chucVuFilter;

      return matchesSearch && matchesDonVi && matchesChucVu;
    });
  }, [canBoList, searchQuery, donViFilter, chucVuFilter]);

  const uniqueChucVu = Array.from(new Set(canBoList.map(c => c.chucVu)));

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
            Hồ sơ Cán bộ - Giáo viên - Nhân viên
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Danh sách Ban Giám hiệu, Tổ trưởng bộ môn, Giáo viên giảng dạy, Nhân viên nhà trường.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm CB-GV mới</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo mã GV/CB, họ tên, chức vụ, tổ bộ môn, SĐT..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={donViFilter}
              onChange={(e) => setDonViFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-teal-500"
            >
              <option value="all">Tất cả tổ chuyên môn / bộ phận</option>
              {DANH_MUC_DON_VI.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={chucVuFilter}
              onChange={(e) => setChucVuFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-teal-500"
            >
              <option value="all">Tất cả chức vụ / nhiệm vụ</option>
              {uniqueChucVu.map(cv => <option key={cv} value={cv}>{cv}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Officials Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Danh sách nhân sự nhà trường ({filteredList.length})
          </span>
          {(donViFilter !== 'all' || chucVuFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => { setDonViFilter('all'); setChucVuFilter('all'); setSearchQuery(''); }}
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
                <th className="py-3 px-4">Mã CB/GV</th>
                <th className="py-3 px-4">Họ và tên</th>
                <th className="py-3 px-4">Chức vụ / Kiêm nhiệm</th>
                <th className="py-3 px-4">Tổ chuyên môn / Phòng</th>
                <th className="py-3 px-4">Số điện thoại</th>
                <th className="py-3 px-4">Email liên hệ</th>
                <th className="py-3 px-4">Việc phụ trách</th>
                <th className="py-3 px-4 text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((cb) => {
                const assignedTasks = congViecList.filter(c => c.canBoChuTri === cb.hoTen);
                const pendingTasks = assignedTasks.filter(c => c.trangThai === 'Đang xử lý').length;

                return (
                  <tr key={cb.id} className="hover:bg-slate-50/90 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-teal-800 whitespace-nowrap">
                      {cb.id}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center">
                          {cb.hoTen.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900">{cb.hoTen}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800 whitespace-nowrap">
                      {cb.chucVu}
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium whitespace-nowrap">
                      {cb.donVi}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600 whitespace-nowrap">
                      {cb.sdt}
                    </td>
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                      {cb.email}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                        {assignedTasks.length} việc ({pendingTasks} đang làm)
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                        cb.trangThai === 'Đang công tác' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        cb.trangThai === 'Kiêm nhiệm' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-slate-50 text-slate-700 border-slate-200'
                      }`}>
                        {cb.trangThai}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
