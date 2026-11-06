import React, { useState, useMemo } from 'react';
import { 
  CheckSquare, 
  Search, 
  Plus, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Briefcase,
  Sliders,
  Calendar,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { CongViec } from '../data/mockData';

interface CongViecViewProps {
  congViecList: CongViec[];
  onOpenDetail: (cv: CongViec) => void;
  onOpenAddModal: () => void;
}

export const CongViecView: React.FC<CongViecViewProps> = ({
  congViecList,
  onOpenDetail,
  onOpenAddModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [hanFilter, setHanFilter] = useState('all');

  const filteredList = useMemo(() => {
    return congViecList.filter(item => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.noiDung.toLowerCase().includes(query) ||
        item.canBoChuTri.toLowerCase().includes(query) ||
        (item.maVbLienQuan && item.maVbLienQuan.toLowerCase().includes(query));

      const matchesStatus = statusFilter === 'all' || item.trangThai === statusFilter;
      const matchesHan = hanFilter === 'all' || item.canhBaoHan === hanFilter;

      return matchesSearch && matchesStatus && matchesHan;
    });
  }, [congViecList, searchQuery, statusFilter, hanFilter]);

  const countDangXuLy = congViecList.filter(c => c.trangThai === 'Đang xử lý').length;
  const countSapHan = congViecList.filter(c => c.canhBaoHan === 'Sắp hạn').length;
  const countQuaHan = congViecList.filter(c => c.canhBaoHan === 'Quá hạn' || c.trangThai === 'Quá hạn').length;
  const countHoanThanh = congViecList.filter(c => c.trangThai === 'Hoàn thành' || c.phanTramHoanThanh === 100).length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
            Nhiệm vụ & Tiến độ chuyên môn
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Theo dõi phân công BGH, tổ chuyên môn, giáo viên phụ trách, hạn nộp hồ sơ & học bạ số.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Giao việc giáo viên</span>
        </button>
      </div>

      {/* Filter and KPI chips matching video 00:24 - 00:26 */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo mã việc, nội dung, giáo viên, VB liên quan..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-teal-500"
            >
              <option value="all">Tất cả trạng thái công việc</option>
              <option value="Mới tiếp nhận">Mới tiếp nhận</option>
              <option value="Đã phân công">Đã phân công</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Chờ phối hợp">Chờ phối hợp</option>
              <option value="Chờ duyệt">Chờ duyệt</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Quá hạn">Quá hạn</option>
            </select>
          </div>

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

        {/* Counter chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div 
            onClick={() => setStatusFilter('Đang xử lý')}
            className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
              statusFilter === 'Đang xử lý' ? 'bg-amber-50 border-amber-300' : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-lg font-extrabold font-mono text-amber-700">{countDangXuLy}</div>
            <div className="text-[11px] font-semibold text-slate-600">Đang xử lý</div>
          </div>

          <div 
            onClick={() => setHanFilter('Sắp hạn')}
            className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
              hanFilter === 'Sắp hạn' ? 'bg-amber-50 border-amber-300' : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-lg font-extrabold font-mono text-amber-700">{countSapHan}</div>
            <div className="text-[11px] font-semibold text-slate-600">Sắp hạn</div>
          </div>

          <div 
            onClick={() => setHanFilter('Quá hạn')}
            className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
              hanFilter === 'Quá hạn' ? 'bg-rose-50 border-rose-300' : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-lg font-extrabold font-mono text-rose-700">{countQuaHan}</div>
            <div className="text-[11px] font-semibold text-slate-600">Quá hạn</div>
          </div>

          <div 
            onClick={() => setStatusFilter('Hoàn thành')}
            className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
              statusFilter === 'Hoàn thành' ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-lg font-extrabold font-mono text-emerald-700">{countHoanThanh}</div>
            <div className="text-[11px] font-semibold text-slate-600">Hoàn thành</div>
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Danh sách công việc ({filteredList.length})
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
                <th className="py-3 px-4">Mã việc</th>
                <th className="py-3 px-4 max-w-sm">Nội dung nhiệm vụ</th>
                <th className="py-3 px-4">Nguồn nhiệm vụ</th>
                <th className="py-3 px-4">Giáo viên / Phụ trách</th>
                <th className="py-3 px-4">Hạn hoàn thành</th>
                <th className="py-3 px-4 w-36">% Hoàn thành</th>
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
                  <td className="py-3 px-4 font-mono font-bold text-slate-800 whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="py-3 px-4 text-slate-900 max-w-xs font-semibold">
                    <div className="line-clamp-2" title={item.noiDung}>
                      {item.noiDung}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap font-medium">
                    {item.nguonViec}
                    {item.maVbLienQuan && (
                      <span className="block text-[10px] font-mono text-indigo-700">
                        {item.maVbLienQuan}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 font-semibold text-[11px] border border-teal-200">
                      {item.canBoChuTri}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-800">{item.hanHoanThanh}</span>
                    {item.canhBaoHan === 'Quá hạn' && (
                      <span className="text-[10px] text-rose-600 font-bold block">
                        Quá hạn
                      </span>
                    )}
                    {item.canhBaoHan === 'Sắp hạn' && (
                      <span className="text-[10px] text-amber-600 font-bold block">
                        Sắp hạn
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono font-bold">
                        <span className="text-teal-700">{item.phanTramHoanThanh}%</span>
                      </div>
                      <div className="w-28 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            item.trangThai === 'Quá hạn' ? 'bg-rose-500' :
                            item.phanTramHoanThanh === 100 ? 'bg-emerald-500' : 'bg-teal-600'
                          }`}
                          style={{ width: `${item.phanTramHoanThanh}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      item.trangThai === 'Hoàn thành' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      item.trangThai === 'Quá hạn' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                      item.trangThai === 'Đang xử lý' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      item.trangThai === 'Chờ duyệt' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      'bg-slate-50 text-slate-700 border-slate-200'
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
                      className="px-2.5 py-1 text-xs font-semibold bg-teal-50 text-teal-800 hover:bg-teal-100 rounded-lg transition-colors border border-teal-200"
                    >
                      Cập nhật
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
