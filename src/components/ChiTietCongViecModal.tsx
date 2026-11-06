import React, { useState } from 'react';
import { 
  X, 
  CheckSquare, 
  Printer, 
  Calendar, 
  User, 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Sliders,
  Save,
  Send
} from 'lucide-react';
import { CongViec, CanBo } from '../data/mockData';

interface ChiTietCongViecModalProps {
  congViec: CongViec | null;
  onClose: () => void;
  onUpdateProgress: (id: string, phanTram: number, trangThai: CongViec['trangThai'], ghiChu?: string) => void;
  canBoList: CanBo[];
}

export const ChiTietCongViecModal: React.FC<ChiTietCongViecModalProps> = ({
  congViec,
  onClose,
  onUpdateProgress,
  canBoList
}) => {
  if (!congViec) return null;

  const [phanTram, setPhanTram] = useState<number>(congViec.phanTramHoanThanh);
  const [trangThai, setTrangThai] = useState<CongViec['trangThai']>(congViec.trangThai);
  const [ghiChu, setGhiChu] = useState<string>(congViec.ghiChu || '');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave = () => {
    let finalStatus = trangThai;
    if (phanTram === 100) finalStatus = 'Hoàn thành';
    onUpdateProgress(congViec.id, phanTram, finalStatus, ghiChu);
    setIsEditing(false);
  };

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'Khẩn':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Cao':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Trung bình':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl max-h-[92vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-teal-800 text-sm">{congViec.id}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getPriorityBadge(congViec.mucDoUuTien)}`}>
                  Ưu tiên {congViec.mucDoUuTien}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                  {congViec.phanTramHoanThanh}% Hoàn thành
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Chi tiết nhiệm vụ chuyên môn
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Nội dung công việc */}
          <div className="p-4 bg-teal-50/50 border border-teal-100 rounded-xl">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block mb-1">
              Nội dung nhiệm vụ / Công việc:
            </span>
            <p className="text-sm font-semibold text-slate-900 leading-relaxed">
              {congViec.noiDung}
            </p>
          </div>

          {/* Grid thông tin */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50/60 p-5 rounded-xl border border-slate-200">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Mã nhiệm vụ:</span>
              <span className="text-xs font-mono font-bold text-teal-800">{congViec.id}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Nguồn nhiệm vụ:</span>
              <span className="text-xs font-semibold text-slate-800">{congViec.nguonViec}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">VB liên quan:</span>
              <span className="text-xs font-mono font-semibold text-indigo-700">
                {congViec.maVbLienQuan ? `${congViec.maVbLienQuan} (${congViec.soKyHieuVbLienQuan || ''})` : 'Không'}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Lĩnh vực:</span>
              <span className="text-xs text-slate-800 font-medium">{congViec.linhVuc}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">BGH giao việc:</span>
              <span className="text-xs font-bold text-slate-800">{congViec.lanhDaoGiao}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Tổ chuyên môn:</span>
              <span className="text-xs font-bold text-slate-800">{congViec.donViChuTri}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Giáo viên / Phụ trách:</span>
              <span className="text-xs font-bold text-teal-800">{congViec.canBoChuTri}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Phối hợp thực hiện:</span>
              <span className="text-xs text-slate-700">
                {congViec.canBoPhoiHop && congViec.canBoPhoiHop.length > 0 ? congViec.canBoPhoiHop.join(', ') : 'Không'}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Ngày giao:</span>
              <span className="text-xs text-slate-800 font-medium">{congViec.ngayGiao}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Hạn hoàn thành:</span>
              <span className="text-xs font-bold text-slate-900">{congViec.hanHoanThanh}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Kết quả đầu ra:</span>
              <span className="text-xs font-medium text-slate-800">{congViec.ketQuaDauRa}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Tình trạng hạn:</span>
              <span className={`text-xs font-bold ${
                congViec.canhBaoHan === 'Quá hạn' ? 'text-rose-600' :
                congViec.canhBaoHan === 'Sắp hạn' ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                {congViec.canhBaoHan} ({congViec.soNgayConLai >= 0 ? `Còn ${congViec.soNgayConLai} ngày` : `Trễ ${Math.abs(congViec.soNgayConLai)} ngày`})
              </span>
            </div>
          </div>

          {/* Cập nhật tiến độ % */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-600" />
                Cập nhật tiến độ hoàn thành:
              </span>
              <span className="text-base font-extrabold font-mono text-teal-800">
                {phanTram}%
              </span>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={phanTram}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setPhanTram(val);
                  if (val === 100) setTrangThai('Hoàn thành');
                  else if (val > 0) setTrangThai('Đang xử lý');
                }}
                className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>0% (Bắt đầu)</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100% (Xong)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Trạng thái:</label>
                <select
                  value={trangThai}
                  onChange={(e: any) => setTrangThai(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:border-teal-500"
                >
                  <option value="Mới tiếp nhận">Mới tiếp nhận</option>
                  <option value="Đã phân công">Đã phân công</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Chờ phối hợp">Chờ phối hợp</option>
                  <option value="Chờ duyệt">Chờ duyệt</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                  <option value="Quá hạn">Quá hạn</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Ghi chú tiến độ:</label>
                <input
                  type="text"
                  value={ghiChu}
                  onChange={(e) => setGhiChu(e.target.value)}
                  placeholder="Nhập tiến độ mới nhất..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Cập nhật lần cuối: Hôm nay
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu tiến độ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
