import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Printer, 
  Download, 
  Calendar, 
  User, 
  Building2, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Send,
  Briefcase,
  Paperclip,
  Edit,
  Save
} from 'lucide-react';
import { VanBanDen, CanBo } from '../data/mockData';

interface ChiTietVanBanDenModalProps {
  vanBan: VanBanDen | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: VanBanDen['trangThai'], ghiChu?: string) => void;
  onCreateTask: (vb: VanBanDen) => void;
  onCreateOutgoingDoc: (vb: VanBanDen) => void;
  canBoList: CanBo[];
}

export const ChiTietVanBanDenModal: React.FC<ChiTietVanBanDenModalProps> = ({
  vanBan,
  onClose,
  onUpdateStatus,
  onCreateTask,
  onCreateOutgoingDoc,
  canBoList
}) => {
  if (!vanBan) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(vanBan.trangThai);
  const [ghiChuText, setGhiChuText] = useState(vanBan.ghiChu || '');

  const handleSave = () => {
    onUpdateStatus(vanBan.id, selectedStatus, ghiChuText);
    setIsEditing(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Mới tiếp nhận':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Đã phân công':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Đang xử lý':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Chờ duyệt/ký':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Hoàn thành':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Quá hạn':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-4xl max-h-[92vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-teal-800 text-sm">
                  {vanBan.id}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(vanBan.trangThai)}`}>
                  {vanBan.trangThai}
                </span>
                {vanBan.canhBaoHan === 'Sắp hạn' && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                    Sắp hạn ({vanBan.soNgayConLai} ngày)
                  </span>
                )}
                {vanBan.canhBaoHan === 'Quá hạn' && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
                    Quá hạn ({Math.abs(vanBan.soNgayConLai)} ngày)
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Chi tiết văn bản đến
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="In phiếu xử lý văn bản"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Trích yếu nổi bật */}
          <div className="p-4 bg-teal-50/50 border border-teal-100 rounded-xl">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block mb-1">
              Trích yếu / Nội dung chính:
            </span>
            <p className="text-sm font-semibold text-slate-900 leading-relaxed">
              {vanBan.trichYeu}
            </p>
          </div>

          {/* Grid thông tin chi tiết */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50/60 p-5 rounded-xl border border-slate-200">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Số / Ký hiệu:</span>
              <span className="text-xs font-bold text-slate-800">{vanBan.soKyHieu}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Mã VB đến:</span>
              <span className="text-xs font-mono font-bold text-teal-700">{vanBan.id}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Ngày văn bản:</span>
              <span className="text-xs text-slate-800 font-medium">{vanBan.ngayVanBan}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Ngày đến:</span>
              <span className="text-xs text-slate-800 font-medium">{vanBan.ngayDen}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Cơ quan ban hành:</span>
              <span className="text-xs font-bold text-slate-800">{vanBan.coQuanBanHanh}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Loại văn bản:</span>
              <span className="text-xs text-slate-800 font-medium">{vanBan.loaiVanBan}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Lĩnh vực:</span>
              <span className="text-xs text-slate-800 font-medium">{vanBan.linhVuc}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Độ khẩn / Độ mật:</span>
              <span className="text-xs font-semibold text-rose-700">{vanBan.doKhan} • {vanBan.doMat}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">BGH giao xử lý:</span>
              <span className="text-xs font-bold text-slate-800">{vanBan.lanhDaoGiao}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Tổ chuyên môn / Bộ phận:</span>
              <span className="text-xs font-bold text-slate-800">{vanBan.donViChuTri}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Giáo viên / Phụ trách:</span>
              <span className="text-xs font-bold text-teal-800">{vanBan.canBoChuTri}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Hạn xử lý:</span>
              <span className="text-xs font-bold text-slate-900">{vanBan.hanXuLy}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Phối hợp thực hiện:</span>
              <span className="text-xs text-slate-700">
                {vanBan.canBoPhoiHop && vanBan.canBoPhoiHop.length > 0
                  ? vanBan.canBoPhoiHop.join(', ')
                  : 'Không'}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Kết quả xử lý:</span>
              <span className="text-xs font-medium text-slate-800">{vanBan.ketQuaXuLy || 'Chưa có'}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Mã việc liên quan:</span>
              <span className="text-xs font-mono font-bold text-indigo-700">
                {vanBan.maViecLienQuan || 'Chưa liên kết'}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">VB đi trả lời:</span>
              <span className="text-xs font-mono font-bold text-emerald-700">
                {vanBan.vbDiTraLoi || 'Chưa có'}
              </span>
            </div>
          </div>

          {/* Cập nhật trạng thái & Ghi chú */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Trạng thái điều hành & Ghi chú xử lý:
              </span>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 text-xs text-teal-700 hover:text-teal-800 font-semibold"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Cập nhật tiến độ</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 px-3 py-1 bg-teal-600 text-white rounded-lg text-xs font-semibold hover:bg-teal-700 transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Lưu</span>
                  </button>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs text-slate-600 block mb-1">Chuyển trạng thái:</label>
                  <select
                    value={selectedStatus}
                    onChange={(e: any) => setSelectedStatus(e.target.value)}
                    className="w-full sm:w-64 p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:border-teal-500"
                  >
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
                <div>
                  <label className="text-xs text-slate-600 block mb-1">Ghi chú xử lý:</label>
                  <textarea
                    value={ghiChuText}
                    onChange={(e) => setGhiChuText(e.target.value)}
                    rows={2}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-600 italic">
                {vanBan.ghiChu || 'Chưa có ghi chú xử lý nào.'}
              </p>
            )}
          </div>

          {/* File đính kèm */}
          <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Tệp đính kèm văn bản:
            </span>
            <div className="flex flex-wrap gap-2">
              {(vanBan.fileDinhKem && vanBan.fileDinhKem.length > 0 ? vanBan.fileDinhKem : ['VanBan_BanGoc.pdf']).map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 shadow-2xs hover:border-teal-400 transition-colors"
                >
                  <Paperclip className="w-3.5 h-3.5 text-teal-600" />
                  <span className="font-medium">{file}</span>
                  <button
                    onClick={() => alert(`Đang tải file ${file}...`)}
                    className="p-1 text-slate-400 hover:text-teal-700"
                    title="Tải về"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onCreateTask(vanBan);
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 rounded-lg text-xs font-semibold transition-colors shadow-2xs"
            >
              <Briefcase className="w-3.5 h-3.5 text-teal-700" />
              <span>Giao việc cho giáo viên</span>
            </button>

            <button
              onClick={() => {
                onCreateOutgoingDoc(vanBan);
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 rounded-lg text-xs font-semibold transition-colors shadow-2xs"
            >
              <Send className="w-3.5 h-3.5 text-emerald-700" />
              <span>Soạn VB đi phúc đáp</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
