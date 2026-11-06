import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Send, 
  CheckSquare, 
  UserPlus, 
  Save, 
  Paperclip,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { 
  VanBanDen, 
  VanBanDi, 
  CongViec, 
  CanBo,
  DANH_MUC_DON_VI,
  DANH_MUC_LOAI_VB,
  DANH_MUC_LINH_VUC,
  DANH_MUC_CO_QUAN_BAN_HANH
} from '../data/mockData';

interface ThemModalProps {
  type: 'vb-den' | 'vb-di' | 'cong-viec' | 'can-bo' | null;
  onClose: () => void;
  onAddVbDen: (vb: VanBanDen) => void;
  onAddVbDi: (vb: VanBanDi) => void;
  onAddCongViec: (cv: CongViec) => void;
  onAddCanBo: (cb: CanBo) => void;
  canBoList: CanBo[];
  initialLinkedVb?: VanBanDen | null;
}

export const ThemModal: React.FC<ThemModalProps> = ({
  type,
  onClose,
  onAddVbDen,
  onAddVbDi,
  onAddCongViec,
  onAddCanBo,
  canBoList,
  initialLinkedVb
}) => {
  if (!type) return null;

  // VB Den form state
  const [vbdSoKyHieu, setVbdSoKyHieu] = useState('');
  const [vbdNgayVb, setVbdNgayVb] = useState('17/04/2026');
  const [vbdNgayDen, setVbdNgayDen] = useState('18/04/2026');
  const [vbdCoQuan, setVbdCoQuan] = useState('UBND xã');
  const [vbdLoai, setVbdLoai] = useState('Công văn');
  const [vbdLinhVuc, setVbdLinhVuc] = useState('Chuyên môn & Dạy học');
  const [vbdDoKhan, setVbdDoKhan] = useState<VanBanDen['doKhan']>('Thường');
  const [vbdDoMat, setVbdDoMat] = useState<VanBanDen['doMat']>('Thường');
  const [vbdLanhDaoGiao, setVbdLanhDaoGiao] = useState('Hiệu trưởng (Nguyễn Văn An)');
  const [vbdDonViChuTri, setVbdDonViChuTri] = useState(DANH_MUC_DON_VI[1] || 'Tổ Toán - Tin học');
  const [vbdCanBoChuTri, setVbdCanBoChuTri] = useState(canBoList[3]?.hoTen || 'Phạm Thu Hà');
  const [vbdHanXuLy, setVbdHanXuLy] = useState('28/04/2026');
  const [vbdTrichYeu, setVbdTrichYeu] = useState('');
  const [vbdGhiChu, setVbdGhiChu] = useState('');

  // VB Di form state
  const [vbdiSoKyHieu, setVbdiSoKyHieu] = useState('42/KH-THCS');
  const [vbdiNgaySoan, setVbdiNgaySoan] = useState('18/04/2026');
  const [vbdiHanPhatHanh, setVbdiHanPhatHanh] = useState('22/04/2026');
  const [vbdiTrichYeu, setVbdiTrichYeu] = useState(initialLinkedVb ? `Kế hoạch thực hiện theo ${initialLinkedVb.soKyHieu} về việc ${initialLinkedVb.trichYeu}` : '');
  const [vbdiNguoiKy, setVbdiNguoiKy] = useState('Hiệu trưởng (Nguyễn Văn An)');
  const [vbdiDonViSoan, setVbdiDonViSoan] = useState(DANH_MUC_DON_VI[1] || 'Tổ Toán - Tin học');
  const [vbdiLoai, setVbdiLoai] = useState('Kế hoạch');
  const [vbdiLinhVuc, setVbdiLinhVuc] = useState(initialLinkedVb?.linhVuc || 'Chuyên môn & Dạy học');
  const [vbdiVbDenLienQuan, setVbdiVbDenLienQuan] = useState(initialLinkedVb?.id || '');

  // Cong Viec form state
  const [cvNoiDung, setCvNoiDung] = useState(initialLinkedVb ? `Thực hiện nhiệm vụ theo ${initialLinkedVb.soKyHieu}: ${initialLinkedVb.trichYeu}` : '');
  const [cvNguonViec, setCvNguonViec] = useState<CongViec['nguonViec']>(initialLinkedVb ? 'Văn bản đến' : 'Chỉ đạo Ban Giám hiệu');
  const [cvMaVbLienQuan, setCvMaVbLienQuan] = useState(initialLinkedVb?.id || '');
  const [cvLinhVuc, setCvLinhVuc] = useState(initialLinkedVb?.linhVuc || 'Chuyên môn & Dạy học');
  const [cvMucDo, setCvMucDo] = useState<CongViec['mucDoUuTien']>('Cao');
  const [cvLanhDao, setCvLanhDao] = useState('Hiệu trưởng (Nguyễn Văn An)');
  const [cvDonViChuTri, setCvDonViChuTri] = useState(initialLinkedVb?.donViChuTri || 'Tổ Toán - Tin học');
  const [cvCanBoChuTri, setCvCanBoChuTri] = useState(initialLinkedVb?.canBoChuTri || canBoList[3]?.hoTen || 'Phạm Thu Hà');
  const [cvHanHoanThanh, setCvHanHoanThanh] = useState(initialLinkedVb?.hanXuLy || '25/04/2026');
  const [cvKetQuaDauRa, setCvKetQuaDauRa] = useState('Kế hoạch / Ma trận đề / Báo cáo');

  // Can Bo form state
  const [cbHoTen, setCbHoTen] = useState('');
  const [cbChucVu, setCbChucVu] = useState('Giáo viên bộ môn');
  const [cbDonVi, setCbDonVi] = useState(DANH_MUC_DON_VI[1] || 'Tổ Toán - Tin học');
  const [cbSdt, setCbSdt] = useState('0912345688');
  const [cbEmail, setCbEmail] = useState('');
  const [cbTrangThai, setCbTrangThai] = useState<CanBo['trangThai']>('Đang công tác');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === 'vb-den') {
      if (!vbdSoKyHieu || !vbdTrichYeu) {
        alert('Vui lòng điền số/ký hiệu và trích yếu văn bản đến!');
        return;
      }
      const newVbd: VanBanDen = {
        id: `VBD-2026-0${Math.floor(Math.random() * 900 + 100)}`,
        soKyHieu: vbdSoKyHieu,
        ngayVanBan: vbdNgayVb,
        ngayDen: vbdNgayDen,
        coQuanBanHanh: vbdCoQuan,
        loaiVanBan: vbdLoai,
        linhVuc: vbdLinhVuc,
        doKhan: vbdDoKhan,
        doMat: vbdDoMat,
        lanhDaoGiao: vbdLanhDaoGiao,
        donViChuTri: vbdDonViChuTri,
        canBoChuTri: vbdCanBoChuTri,
        canBoPhoiHop: [],
        hanXuLy: vbdHanXuLy,
        trangThai: 'Mới tiếp nhận',
        canhBaoHan: 'Trong hạn',
        soNgayConLai: 10,
        trichYeu: vbdTrichYeu,
        ghiChu: vbdGhiChu,
        fileDinhKem: ['VanBanDen_Scan.pdf']
      };
      onAddVbDen(newVbd);
    } else if (type === 'vb-di') {
      if (!vbdiSoKyHieu || !vbdiTrichYeu) {
        alert('Vui lòng điền số/ký hiệu và trích yếu văn bản đi!');
        return;
      }
      const newVbdi: VanBanDi = {
        id: `VBD-2026-0${Math.floor(Math.random() * 900 + 100)}`,
        soKyHieu: vbdiSoKyHieu,
        ngaySoan: vbdiNgaySoan,
        hanPhatHanh: vbdiHanPhatHanh,
        trichYeu: vbdiTrichYeu,
        nguoiKy: vbdiNguoiKy,
        chucVuNguoiKy: 'Lãnh đạo đơn vị',
        donViSoan: vbdiDonViSoan,
        nguoiSoan: 'Cán bộ tham mưu',
        loaiVanBan: vbdiLoai,
        linhVuc: vbdiLinhVuc,
        doKhan: 'Thường',
        doMat: 'Thường',
        trangThai: 'Dự thảo',
        vbDenLienQuan: vbdiVbDenLienQuan,
        soBanLuu: 3,
        fileDinhKem: ['DuThao_VanBanDi.docx']
      };
      onAddVbDi(newVbdi);
    } else if (type === 'cong-viec') {
      if (!cvNoiDung) {
        alert('Vui lòng nhập nội dung công việc!');
        return;
      }
      const newCv: CongViec = {
        id: `CV-2026-0${Math.floor(Math.random() * 900 + 100)}`,
        noiDung: cvNoiDung,
        nguonViec: cvNguonViec,
        maVbLienQuan: cvMaVbLienQuan,
        linhVuc: cvLinhVuc,
        mucDoUuTien: cvMucDo,
        lanhDaoGiao: cvLanhDao,
        donViChuTri: cvDonViChuTri,
        canBoChuTri: cvCanBoChuTri,
        canBoPhoiHop: [],
        ngayGiao: '18/04/2026',
        hanHoanThanh: cvHanHoanThanh,
        phanTramHoanThanh: 0,
        trangThai: 'Đã phân công',
        ketQuaDauRa: cvKetQuaDauRa,
        canhBaoHan: 'Trong hạn',
        soNgayConLai: 7
      };
      onAddCongViec(newCv);
    } else if (type === 'can-bo') {
      if (!cbHoTen) {
        alert('Vui lòng nhập họ tên cán bộ!');
        return;
      }
      const newCb: CanBo = {
        id: `GV0${Math.floor(Math.random() * 90 + 10)}`,
        hoTen: cbHoTen,
        chucVu: cbChucVu,
        donVi: cbDonVi,
        sdt: cbSdt,
        email: cbEmail || `${cbHoTen.toLowerCase().replace(/\s+/g, '')}@thcs-bhaihung.edu.vn`,
        trangThai: cbTrangThai,
        vaiTro: 'Giáo viên'
      };
      onAddCanBo(newCb);
    }

    onClose();
  };

  const getTitle = () => {
    switch (type) {
      case 'vb-den': return 'Tiếp nhận Văn bản đến (UBND xã / VH-XH / Xã đoàn)';
      case 'vb-di': return 'Soạn thảo Văn bản đi nhà trường (Kế hoạch / Tờ trình)';
      case 'cong-viec': return 'Phân công nhiệm vụ cho Giáo viên / Tổ bộ môn';
      case 'can-bo': return 'Thêm mới Hồ sơ Cán bộ - Giáo viên - Nhân viên';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl max-h-[92vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-xs">
              {type === 'vb-den' && <FileText className="w-4 h-4" />}
              {type === 'vb-di' && <Send className="w-4 h-4" />}
              {type === 'cong-viec' && <CheckSquare className="w-4 h-4" />}
              {type === 'can-bo' && <UserPlus className="w-4 h-4" />}
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              {getTitle()}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Văn bản đến form */}
          {type === 'vb-den' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Số / Ký hiệu *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: 36/KH-UBND"
                    value={vbdSoKyHieu}
                    onChange={(e) => setVbdSoKyHieu(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:border-teal-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Cơ quan ban hành *</label>
                  <input
                    type="text"
                    required
                    list="co-quan-list"
                    placeholder="VD: UBND xã / Phòng Văn hóa - Xã hội xã / Xã đoàn"
                    value={vbdCoQuan}
                    onChange={(e) => setVbdCoQuan(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:border-teal-500 focus:bg-white"
                  />
                  <datalist id="co-quan-list">
                    {DANH_MUC_CO_QUAN_BAN_HANH.map(c => <option key={c} value={c} />)}
                  </datalist>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Ngày văn bản</label>
                  <input
                    type="text"
                    value={vbdNgayVb}
                    onChange={(e) => setVbdNgayVb(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Ngày đến</label>
                  <input
                    type="text"
                    value={vbdNgayDen}
                    onChange={(e) => setVbdNgayDen(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Hạn xử lý *</label>
                  <input
                    type="text"
                    required
                    value={vbdHanXuLy}
                    onChange={(e) => setVbdHanXuLy(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Loại văn bản</label>
                  <select
                    value={vbdLoai}
                    onChange={(e) => setVbdLoai(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                  >
                    {DANH_MUC_LOAI_VB.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Lĩnh vực</label>
                  <select
                    value={vbdLinhVuc}
                    onChange={(e) => setVbdLinhVuc(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                  >
                    {DANH_MUC_LINH_VUC.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Đơn vị chủ trì</label>
                  <select
                    value={vbdDonViChuTri}
                    onChange={(e) => setVbdDonViChuTri(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                  >
                    {DANH_MUC_DON_VI.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Cán bộ chủ trì</label>
                  <select
                    value={vbdCanBoChuTri}
                    onChange={(e) => setVbdCanBoChuTri(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                  >
                    {canBoList.map(cb => <option key={cb.id} value={cb.hoTen}>{cb.hoTen} ({cb.chucVu})</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Trích yếu / Nội dung chính *</label>
                <textarea
                  required
                  rows={2}
                  value={vbdTrichYeu}
                  onChange={(e) => setVbdTrichYeu(e.target.value)}
                  placeholder="Nhập tóm tắt nội dung văn bản..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:border-teal-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* Văn bản đi form */}
          {type === 'vb-di' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Số / Ký hiệu *</label>
                  <input
                    type="text"
                    required
                    value={vbdiSoKyHieu}
                    onChange={(e) => setVbdiSoKyHieu(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Người ký</label>
                  <select
                    value={vbdiNguoiKy}
                    onChange={(e) => setVbdiNguoiKy(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                  >
                    <option value="Hiệu trưởng (Nguyễn Văn An)">Hiệu trưởng (Nguyễn Văn An)</option>
                    <option value="Phó Hiệu trưởng CM (Trần Thị Mai)">Phó Hiệu trưởng CM (Trần Thị Mai)</option>
                    <option value="Phó Hiệu trưởng CSVC (Lê Quốc Bảo)">Phó Hiệu trưởng CSVC (Lê Quốc Bảo)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Loại văn bản</label>
                  <select
                    value={vbdiLoai}
                    onChange={(e) => setVbdiLoai(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                  >
                    {DANH_MUC_LOAI_VB.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Hạn phát hành</label>
                  <input
                    type="text"
                    value={vbdiHanPhatHanh}
                    onChange={(e) => setVbdiHanPhatHanh(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Trích yếu nội dung *</label>
                <textarea
                  required
                  rows={2}
                  value={vbdiTrichYeu}
                  onChange={(e) => setVbdiTrichYeu(e.target.value)}
                  placeholder="Nhập trích yếu văn bản phát hành..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:border-teal-500 focus:bg-white"
                />
              </div>

              {vbdiVbDenLienQuan && (
                <div className="p-2.5 bg-teal-50 border border-teal-200 rounded-lg text-xs text-teal-800">
                  Liên kết trả lời cho VB đến: <strong className="font-mono">{vbdiVbDenLienQuan}</strong>
                </div>
              )}
            </div>
          )}

          {/* Công việc form */}
          {type === 'cong-viec' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Nội dung công việc *</label>
                <textarea
                  required
                  rows={2}
                  value={cvNoiDung}
                  onChange={(e) => setCvNoiDung(e.target.value)}
                  placeholder="Mô tả cụ thể nhiệm vụ cần thực hiện..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Nguồn nhiệm vụ</label>
                  <select
                    value={cvNguonViec}
                    onChange={(e: any) => setCvNguonViec(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                  >
                    <option value="Văn bản đến">Văn bản đến (Sở/Phòng GD&ĐT)</option>
                    <option value="Chỉ đạo Ban Giám hiệu">Chỉ đạo Ban Giám hiệu</option>
                    <option value="Kế hoạch năm học">Kế hoạch năm học</option>
                    <option value="Nhiệm vụ Đội & Phong trào">Nhiệm vụ Đội & Phong trào</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Mức độ ưu tiên</label>
                  <select
                    value={cvMucDo}
                    onChange={(e: any) => setCvMucDo(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                  >
                    <option value="Thường">Thấp</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Cao">Cao</option>
                    <option value="Khẩn">Khẩn</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Cán bộ chủ trì *</label>
                  <select
                    value={cvCanBoChuTri}
                    onChange={(e) => setCvCanBoChuTri(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                  >
                    {canBoList.map(cb => <option key={cb.id} value={cb.hoTen}>{cb.hoTen} ({cb.chucVu})</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Hạn hoàn thành *</label>
                  <input
                    type="text"
                    required
                    value={cvHanHoanThanh}
                    onChange={(e) => setCvHanHoanThanh(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Kết quả đầu ra dự kiến</label>
                <input
                  type="text"
                  value={cvKetQuaDauRa}
                  onChange={(e) => setCvKetQuaDauRa(e.target.value)}
                  placeholder="VD: Báo cáo, Kế hoạch, Biên bản..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                />
              </div>
            </div>
          )}

          {/* Cán bộ form */}
          {type === 'can-bo' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Lê Hoàng Nam"
                    value={cbHoTen}
                    onChange={(e) => setCbHoTen(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Chức vụ *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Giáo viên Tin học / Kiêm CNTT"
                    value={cbChucVu}
                    onChange={(e) => setCbChucVu(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Tổ chuyên môn / Bộ phận</label>
                  <select
                    value={cbDonVi}
                    onChange={(e) => setCbDonVi(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                  >
                    {DANH_MUC_DON_VI.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Số điện thoại</label>
                  <input
                    type="text"
                    value={cbSdt}
                    onChange={(e) => setCbSdt(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu thông tin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
