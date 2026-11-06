import React, { useState } from 'react';
import { Shield, Key, UserCheck, Plus, CheckCircle2 } from 'lucide-react';
import { CanBo } from '../data/mockData';

interface NguoiDungViewProps {
  canBoList: CanBo[];
}

export const NguoiDungView: React.FC<NguoiDungViewProps> = ({ canBoList }) => {
  const [users, setUsers] = useState([
    { id: 'U001', username: 'hieu.truong', hoTen: 'Nguyễn Văn An', vaiTro: 'Hiệu trưởng (BGH) - Phê duyệt & Ký số', trangThai: 'Đang hoạt động', lastLogin: 'Hôm nay 08:30' },
    { id: 'U002', username: 'mai.pht', hoTen: 'Trần Thị Mai', vaiTro: 'Phó Hiệu trưởng CM - Chỉ đạo chuyên môn', trangThai: 'Đang hoạt động', lastLogin: 'Hôm nay 08:20' },
    { id: 'U003', username: 'lan.vt', hoTen: 'Vũ Thị Lan', vaiTro: 'Văn thư - Sổ văn bản đến/đi & Cấp số', trangThai: 'Đang hoạt động', lastLogin: 'Hôm nay 08:15' },
    { id: 'U004', username: 'ha.pt', hoTen: 'Phạm Thu Hà', vaiTro: 'Tổ trưởng chuyên môn (Toán - Tin)', trangThai: 'Đang hoạt động', lastLogin: '17/03/2026' },
    { id: 'U005', username: 'khang.dm', hoTen: 'Đỗ Minh Khang', vaiTro: 'Giáo viên Tin học - Quản trị CSDL & VnEdu', trangThai: 'Đang hoạt động', lastLogin: 'Hôm qua 16:45' },
    { id: 'U006', username: 'son.tv', hoTen: 'Trịnh Văn Sơn', vaiTro: 'Tổ trưởng chuyên môn (KHTN)', trangThai: 'Đang hoạt động', lastLogin: '16/03/2026' }
  ]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
          Người dùng & Phân quyền nhà trường
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Quản lý tài khoản Ban Giám hiệu duyệt ký, Tổ trưởng chuyên môn, Giáo viên giảng dạy, Văn thư.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase">
            <Shield className="w-4 h-4" />
            Ban Giám hiệu (Hiệu trưởng / PHT)
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Quyền xem toàn bộ văn bản đến/đi, phê duyệt kế hoạch giáo dục, quyết định hội đồng, ký số và giao việc cho tổ chuyên môn.
          </p>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase">
            <Key className="w-4 h-4" />
            Văn thư & Kế toán trường
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Quyền vào sổ văn bản đến từ Sở/Phòng, cấp số văn bản đi trường học, số hóa tệp PDF đính kèm, lưu trữ học bạ số.
          </p>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase">
            <UserCheck className="w-4 h-4" />
            Tổ trưởng & Giáo viên bộ môn
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nhận nhiệm vụ chuyên môn, cập nhật % tiến độ nộp đề thi, ma trận kiểm tra, đồng bộ dữ liệu học sinh lên VnEdu và báo cáo.
          </p>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Tài khoản người dùng ({users.length})
          </span>
          <button
            onClick={() => alert('Chức năng thêm người dùng: Hệ thống đồng bộ tự động từ danh sách cán bộ')}
            className="text-xs px-3 py-1 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            + Thêm tài khoản
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Mã</th>
                <th className="py-3 px-4">Tên đăng nhập</th>
                <th className="py-3 px-4">Họ và tên</th>
                <th className="py-3 px-4">Nhóm quyền</th>
                <th className="py-3 px-4">Lần đăng nhập cuối</th>
                <th className="py-3 px-4 text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-teal-800">{u.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800 font-mono">{u.username}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{u.hoTen}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{u.vaiTro}</td>
                  <td className="py-3 px-4 text-slate-500 font-medium">{u.lastLogin}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {u.trangThai}
                    </span>
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
