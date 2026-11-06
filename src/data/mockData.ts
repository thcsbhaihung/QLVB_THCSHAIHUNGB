export interface CanBo {
  id: string; // CB001, CB002...
  hoTen: string;
  chucVu: string;
  donVi: string;
  sdt: string;
  email: string;
  trangThai: 'Đang công tác' | 'Kiêm nhiệm' | 'Nghỉ phép';
  vaiTro: 'Ban Giám hiệu' | 'Tổ trưởng' | 'Giáo viên' | 'Nhân viên';
  avatar?: string;
}

export interface VanBanDen {
  id: string; // VBD-2026-006, DEN-0013...
  soKyHieu: string; // 152/PGDĐT-GDTrH
  ngayVanBan: string; // 16/03/2026
  ngayDen: string; // 17/03/2026
  coQuanBanHanh: string; // Phòng GD&ĐT, Sở GD&ĐT, UBND huyện...
  loaiVanBan: string; // Kế hoạch, Công văn, Hướng dẫn, Quyết định...
  linhVuc: string; // Chuyên môn & Dạy học, Khảo thí & Đánh giá...
  doKhan: 'Thường' | 'Khẩn' | 'Thượng khẩn' | 'Hỏa tốc';
  doMat: 'Thường' | 'Mật' | 'Tối mật' | 'Tuyệt mật';
  lanhDaoGiao: string; // Hiệu trưởng, Phó Hiệu trưởng (Chuyên môn)
  donViChuTri: string; // Tổ Toán - Tin học, Tổ Văn phòng...
  canBoChuTri: string; // Phạm Thu Hà, Đỗ Minh Khang...
  canBoPhoiHop: string[]; // ['Nguyễn Hoài Nam', 'Trịnh Văn Sơn']
  hanXuLy: string; // 15/04/2026
  trangThai: 'Mới tiếp nhận' | 'Chưa phân công' | 'Đã phân công' | 'Đang xử lý' | 'Chờ phối hợp' | 'Chờ duyệt/ký' | 'Đã báo cáo' | 'Hoàn thành' | 'Quá hạn';
  ketQuaXuLy?: string; // Kế hoạch triển khai, Đề thi, Báo cáo...
  maViecLienQuan?: string; // CV-2026-006
  vbDiTraLoi?: string; // 24/BC-THCS
  canhBaoHan: 'Trong hạn' | 'Sắp hạn' | 'Quá hạn' | 'Hoàn thành';
  soNgayConLai: number; // 7, -2...
  trichYeu: string;
  ghiChu?: string;
  fileDinhKem?: string[];
}

export interface VanBanDi {
  id: string; // VBD-2026-007
  soKyHieu: string; // 24/BC-THCS
  ngaySoan: string; // 31/03/2026
  ngayPhatHanh?: string; // 03/04/2026
  hanPhatHanh: string; // 03/04/2026
  trichYeu: string;
  nguoiKy: string; // Hiệu trưởng, Phó Hiệu trưởng
  chucVuNguoiKy?: string;
  donViSoan: string; // Ban Giám hiệu, Tổ Toán - Tin, Tổ Văn phòng
  nguoiSoan: string; // Nguyễn Văn An, Trần Thị Mai
  loaiVanBan: string; // Báo cáo, Kế hoạch, Quyết định, Tờ trình
  linhVuc: string; // Chuyên môn & Dạy học, Khảo thí...
  doKhan: 'Thường' | 'Khẩn' | 'Thượng khẩn' | 'Hỏa tốc';
  doMat: 'Thường' | 'Mật' | 'Tối mật';
  trangThai: 'Dự thảo' | 'Chờ góp ý' | 'Chờ ký' | 'Đã ký' | 'Đã phát hành' | 'Thu hồi';
  vbDenLienQuan?: string; // VBD-2026-006
  soBanLuu?: number;
  noiNhan?: string; // Phòng GD&ĐT, Các tổ chuyên môn, BGH
  fileDinhKem?: string[];
}

export interface CongViec {
  id: string; // CV-2026-010
  noiDung: string;
  nguonViec: 'Văn bản đến' | 'Chỉ đạo Ban Giám hiệu' | 'Kế hoạch năm học' | 'Nhiệm vụ Đội & Phong trào';
  maVbLienQuan?: string; // VBD-2026-010
  soKyHieuVbLienQuan?: string; // 89/SGDĐT-GDTrH
  linhVuc: string;
  mucDoUuTien: 'Thấp' | 'Trung bình' | 'Cao' | 'Khẩn';
  lanhDaoGiao: string; // Hiệu trưởng, Phó Hiệu trưởng
  donViChuTri: string; // Tổ Toán - Tin học
  canBoChuTri: string; // Phạm Thu Hà
  canBoPhoiHop?: string[];
  ngayGiao: string; // 29/03/2026
  hanHoanThanh: string; // 12/04/2026
  ngayHoanThanhThucTe?: string;
  phanTramHoanThanh: number; // 25, 70, 85, 100
  trangThai: 'Mới tiếp nhận' | 'Đã phân công' | 'Đang xử lý' | 'Chờ phối hợp' | 'Chờ duyệt' | 'Hoàn thành' | 'Quá hạn';
  ketQuaDauRa: string; // Báo cáo, Đề thi & Ma trận, Danh sách học bạ...
  soKyHieuVbTraLoi?: string;
  canhBaoHan: 'Trong hạn' | 'Sắp hạn' | 'Quá hạn' | 'Hoàn thành';
  soNgayConLai: number;
  ghiChu?: string;
  fileDinhKem?: string[];
}

export const INITIAL_CAN_BO: CanBo[] = [
  {
    id: 'CB001',
    hoTen: 'Nguyễn Văn An',
    chucVu: 'Hiệu trưởng',
    donVi: 'Ban Giám hiệu',
    sdt: '0912345601',
    email: 'hieutruong@thcs.edu.vn',
    trangThai: 'Đang công tác',
    vaiTro: 'Ban Giám hiệu'
  },
  {
    id: 'CB002',
    hoTen: 'Trần Thị Mai',
    chucVu: 'Phó Hiệu trưởng (Chuyên môn)',
    donVi: 'Ban Giám hiệu',
    sdt: '0912345602',
    email: 'phomai.cm@thcs.edu.vn',
    trangThai: 'Đang công tác',
    vaiTro: 'Ban Giám hiệu'
  },
  {
    id: 'CB003',
    hoTen: 'Lê Quốc Bảo',
    chucVu: 'Phó Hiệu trưởng (CSVC & Bán trú)',
    donVi: 'Ban Giám hiệu',
    sdt: '0912345603',
    email: 'baolq.csvc@thcs.edu.vn',
    trangThai: 'Đang công tác',
    vaiTro: 'Ban Giám hiệu'
  },
  {
    id: 'CB004',
    hoTen: 'Phạm Thu Hà',
    chucVu: 'Tổ trưởng Tổ Toán - Tin',
    donVi: 'Tổ Toán - Tin học',
    sdt: '0912345604',
    email: 'hapt.toantin@thcs.edu.vn',
    trangThai: 'Đang công tác',
    vaiTro: 'Tổ trưởng'
  },
  {
    id: 'CB005',
    hoTen: 'Đỗ Minh Khang',
    chucVu: 'Giáo viên Tin học (Phụ trách CNTT & CSDL ngành)',
    donVi: 'Tổ Toán - Tin học',
    sdt: '0912345605',
    email: 'khangdm.it@thcs.edu.vn',
    trangThai: 'Đang công tác',
    vaiTro: 'Giáo viên'
  },
  {
    id: 'CB006',
    hoTen: 'Vũ Thị Lan',
    chucVu: 'Nhân viên Văn thư - Thủ quỹ',
    donVi: 'Tổ Văn phòng - Kế toán - Y tế',
    sdt: '0912345606',
    email: 'vanthu@thcs.edu.vn',
    trangThai: 'Đang công tác',
    vaiTro: 'Nhân viên'
  },
  {
    id: 'CB007',
    hoTen: 'Nguyễn Hoài Nam',
    chucVu: 'Tổ trưởng Tổ Ngữ văn',
    donVi: 'Tổ Ngữ văn',
    sdt: '0912345607',
    email: 'namnh.van@thcs.edu.vn',
    trangThai: 'Đang công tác',
    vaiTro: 'Tổ trưởng'
  },
  {
    id: 'CB008',
    hoTen: 'Bùi Thị Hạnh',
    chucVu: 'Kế toán trường học',
    donVi: 'Tổ Văn phòng - Kế toán - Y tế',
    sdt: '0912345608',
    email: 'ketoan@thcs.edu.vn',
    trangThai: 'Đang công tác',
    vaiTro: 'Nhân viên'
  },
  {
    id: 'CB009',
    hoTen: 'Trịnh Văn Sơn',
    chucVu: 'Tổ trưởng Tổ KHTN (Hóa - Sinh - Địa)',
    donVi: 'Tổ Khoa học Tự nhiên',
    sdt: '0912345609',
    email: 'sontv.khtn@thcs.edu.vn',
    trangThai: 'Đang công tác',
    vaiTro: 'Tổ trưởng'
  },
  {
    id: 'CB010',
    hoTen: 'Hoàng Thị Yến',
    chucVu: 'Nhân viên Y tế học đường',
    donVi: 'Tổ Văn phòng - Kế toán - Y tế',
    sdt: '0912345610',
    email: 'yte@thcs.edu.vn',
    trangThai: 'Đang công tác',
    vaiTro: 'Nhân viên'
  },
  {
    id: 'CB011',
    hoTen: 'Nguyễn Thanh Phúc',
    chucVu: 'Giáo viên Giáo dục Thể chất - Tổng phụ trách Đội',
    donVi: 'Đoàn Thanh niên - Đội TNTP',
    sdt: '0912345611',
    email: 'phucnt.tpt@thcs.edu.vn',
    trangThai: 'Kiêm nhiệm',
    vaiTro: 'Giáo viên'
  },
  {
    id: 'CB012',
    hoTen: 'Phan Thị Đức',
    chucVu: 'Nhân viên Thiết bị - Thư viện',
    donVi: 'Tổ Văn phòng - Kế toán - Y tế',
    sdt: '0912345612',
    email: 'thuvien@thcs.edu.vn',
    trangThai: 'Đang công tác',
    vaiTro: 'Nhân viên'
  }
];

export const INITIAL_VAN_BAN_DEN: VanBanDen[] = [
  {
    id: 'VBD-2026-006',
    soKyHieu: '36/KH-UBND',
    ngayVanBan: '16/03/2026',
    ngayDen: '17/03/2026',
    coQuanBanHanh: 'UBND xã',
    loaiVanBan: 'Kế hoạch',
    linhVuc: 'Khảo thí & Đánh giá học sinh',
    doKhan: 'Khẩn',
    doMat: 'Thường',
    lanhDaoGiao: 'Phó Hiệu trưởng (Chuyên môn)',
    donViChuTri: 'Tổ Toán - Tin học',
    canBoChuTri: 'Phạm Thu Hà',
    canBoPhoiHop: ['Nguyễn Hoài Nam', 'Đỗ Minh Khang'],
    hanXuLy: '08/04/2026',
    trangThai: 'Đang xử lý',
    ketQuaXuLy: 'Đề thi & Ma trận kiểm tra',
    maViecLienQuan: 'CV-2026-006',
    vbDiTraLoi: '24/BC-THCS',
    canhBaoHan: 'Trong hạn',
    soNgayConLai: 7,
    trichYeu: 'Kế hoạch phối hợp tổ chức kỳ thi thử tuyển sinh vào lớp 10 THPT và hỗ trợ học sinh ôn thi trên địa bàn xã.',
    ghiChu: 'Đã hoàn thành phân công giáo viên ra đề thi môn Toán và Ngữ văn theo cấu trúc mới.',
    fileDinhKem: ['KH_36_UBND_KhaoThiLop10.pdf']
  },
  {
    id: 'DEN-0013',
    soKyHieu: 'VB879302',
    ngayVanBan: '05/04/2026',
    ngayDen: '07/04/2026',
    coQuanBanHanh: 'UBND xã',
    loaiVanBan: 'Tờ trình',
    linhVuc: 'Cơ sở vật chất & Thiết bị dạy học',
    doKhan: 'Thường',
    doMat: 'Thường',
    lanhDaoGiao: 'Hiệu trưởng',
    donViChuTri: 'Ban Giám hiệu',
    canBoChuTri: 'Lê Quốc Bảo',
    canBoPhoiHop: ['Phan Thị Đức'],
    hanXuLy: '30/04/2026',
    trangThai: 'Mới tiếp nhận',
    ketQuaXuLy: 'Tờ trình đề xuất',
    maViecLienQuan: '',
    canhBaoHan: 'Trong hạn',
    soNgayConLai: 23,
    trichYeu: 'Đề xuất danh mục sửa chữa, nâng cấp trang thiết bị phòng tin học và phòng thực hành STEM từ ngân sách xã.',
    ghiChu: 'Chờ họp Ban Giám hiệu rà soát thực trạng kho thiết bị cùng cán bộ địa chính - xã hội xã.',
    fileDinhKem: ['ToTrinh_TB_Stem_2026.docx']
  },
  {
    id: 'VBD-2026-010',
    soKyHieu: '28/HD-VHXH',
    ngayVanBan: '28/03/2026',
    ngayDen: '29/03/2026',
    coQuanBanHanh: 'Phòng Văn hóa - Xã hội xã',
    loaiVanBan: 'Công văn',
    linhVuc: 'Chuyên môn & Dạy học',
    doKhan: 'Thường',
    doMat: 'Thường',
    lanhDaoGiao: 'Hiệu trưởng',
    donViChuTri: 'Tổ Khoa học Tự nhiên',
    canBoChuTri: 'Trịnh Văn Sơn',
    canBoPhoiHop: ['Phạm Thu Hà'],
    hanXuLy: '12/04/2026',
    trangThai: 'Chờ duyệt/ký',
    ketQuaXuLy: 'Kế hoạch sinh hoạt chuyên môn',
    maViecLienQuan: 'CV-2026-010',
    vbDiTraLoi: '15/QĐ-THCS',
    canhBaoHan: 'Sắp hạn',
    soNgayConLai: 2,
    trichYeu: 'Hướng dẫn phối hợp tổ chức ngày hội Khoa học kỹ thuật - STEM và chuyển đổi số học đường tại địa bàn xã.',
    ghiChu: 'Tổ KHTN đã hoàn thành giáo án chuyên đề cụm trường, chờ BGH duyệt lịch tổ chức.',
    fileDinhKem: ['CV_28_VHXH_STEM_Xa.pdf']
  },
  {
    id: 'VBD-2026-008',
    soKyHieu: '19/HD-UBND',
    ngayVanBan: '25/03/2026',
    ngayDen: '26/03/2026',
    coQuanBanHanh: 'UBND xã',
    loaiVanBan: 'Hướng dẫn',
    linhVuc: 'Chuyển đổi số & CSDL ngành',
    doKhan: 'Khẩn',
    doMat: 'Thường',
    lanhDaoGiao: 'Phó Hiệu trưởng (Chuyên môn)',
    donViChuTri: 'Tổ Toán - Tin học',
    canBoChuTri: 'Đỗ Minh Khang',
    canBoPhoiHop: ['Vũ Thị Lan'],
    hanXuLy: '10/04/2026',
    trangThai: 'Đang xử lý',
    ketQuaXuLy: 'Báo cáo số hóa học bạ',
    maViecLienQuan: 'CV-2026-008',
    canhBaoHan: 'Sắp hạn',
    soNgayConLai: 1,
    trichYeu: 'Rà soát dữ liệu cư dân, định danh VNeID của học sinh và tích hợp dữ liệu giáo dục với CSDL xã.',
    ghiChu: 'Đã hoàn thành 70% số lượng lớp; đang phối hợp với công an xã rà soát mã định danh khối 6 và khối 7.',
    fileDinhKem: ['HD_19_UBND_CSDL_VNeID.pdf']
  },
  {
    id: 'VBD-2026-007',
    soKyHieu: '14/KH-TYT',
    ngayVanBan: '21/03/2026',
    ngayDen: '22/03/2026',
    coQuanBanHanh: 'Trạm Y tế xã',
    loaiVanBan: 'Kế hoạch',
    linhVuc: 'Y tế học đường & An toàn trường học',
    doKhan: 'Thường',
    doMat: 'Thường',
    lanhDaoGiao: 'Phó Hiệu trưởng (CSVC & Bán trú)',
    donViChuTri: 'Tổ Văn phòng - Kế toán - Y tế',
    canBoChuTri: 'Hoàng Thị Yến',
    canBoPhoiHop: ['Nguyễn Thanh Phúc'],
    hanXuLy: '06/04/2026',
    trangThai: 'Đang xử lý',
    ketQuaXuLy: 'Danh sách học sinh tiêm chủng',
    maViecLienQuan: 'CV-2026-006',
    canhBaoHan: 'Trong hạn',
    soNgayConLai: 4,
    trichYeu: 'Phối hợp triển khai chiến dịch tiêm vắc xin Uốn ván - Bạch hầu (Td) và khám mắt học đường cho học sinh khối 7 tại trường.',
    ghiChu: 'Đã phát phiếu xin ý kiến phụ huynh và lập danh sách khám sàng lọc.',
    fileDinhKem: ['KH_14_TYT_TiemChungTd.pdf']
  },
  {
    id: 'VBD-2026-009',
    soKyHieu: '52/UBND-VHXH',
    ngayVanBan: '15/03/2026',
    ngayDen: '16/03/2026',
    coQuanBanHanh: 'UBND xã',
    loaiVanBan: 'Công văn',
    linhVuc: 'Cơ sở vật chất & Thiết bị dạy học',
    doKhan: 'Thường',
    doMat: 'Thường',
    lanhDaoGiao: 'Hiệu trưởng',
    donViChuTri: 'Ban Giám hiệu',
    canBoChuTri: 'Lê Quốc Bảo',
    canBoPhoiHop: ['Bùi Thị Hạnh'],
    hanXuLy: '31/03/2026',
    trangThai: 'Hoàn thành',
    ketQuaXuLy: 'Báo cáo kiểm kê',
    maViecLienQuan: '',
    vbDiTraLoi: '07/TTr-THCS',
    canhBaoHan: 'Hoàn thành',
    soNgayConLai: 0,
    trichYeu: 'Khảo sát nhu cầu duy tu, chống dột dãy phòng học và hệ thống quạt mát mùa hè tại trường.',
    ghiChu: 'Đã gửi báo cáo tổng hợp hiện trạng về UBND xã xem xét phân bổ kinh phí.',
    fileDinhKem: ['CV_52_UBND_CSVC_TruongHoc.pdf']
  },
  {
    id: 'VBD-2026-005',
    soKyHieu: '09/KH-ĐTN',
    ngayVanBan: '18/03/2026',
    ngayDen: '19/03/2026',
    coQuanBanHanh: 'Xã đoàn',
    loaiVanBan: 'Kế hoạch',
    linhVuc: 'Công tác Đội & Phong trào thiếu nhi',
    doKhan: 'Khẩn',
    doMat: 'Thường',
    lanhDaoGiao: 'Hiệu trưởng',
    donViChuTri: 'Đoàn Thanh niên - Đội TNTP',
    canBoChuTri: 'Nguyễn Thanh Phúc',
    canBoPhoiHop: [],
    hanXuLy: '28/03/2026',
    trangThai: 'Quá hạn',
    ketQuaXuLy: 'Danh sách kết nạp Đoàn',
    maViecLienQuan: 'CV-2026-002',
    canhBaoHan: 'Quá hạn',
    soNgayConLai: -5,
    trichYeu: 'Kế hoạch liên tịch giữa Xã đoàn và Liên đội trường tổ chức Ngày hội thanh thiếu nhi, kết nạp Đoàn viên mới lớp 9.',
    ghiChu: 'Chưa nộp danh sách chuẩn y kết nạp về Ban Chấp hành Xã đoàn do thiếu ảnh thẻ của 8 học sinh.',
    fileDinhKem: ['KH_09_XaDoan_ThangThanhNien.pdf']
  },
  {
    id: 'VBD-2026-003',
    soKyHieu: '18/HD-VHXH',
    ngayVanBan: '09/03/2026',
    ngayDen: '10/03/2026',
    coQuanBanHanh: 'Phòng Văn hóa - Xã hội xã',
    loaiVanBan: 'Hướng dẫn',
    linhVuc: 'Thi đua - Khen thưởng',
    doKhan: 'Thường',
    doMat: 'Thường',
    lanhDaoGiao: 'Hiệu trưởng',
    donViChuTri: 'Ban Giám hiệu',
    canBoChuTri: 'Trần Thị Mai',
    canBoPhoiHop: ['Vũ Thị Lan'],
    hanXuLy: '25/03/2026',
    trangThai: 'Hoàn thành',
    ketQuaXuLy: 'Báo cáo cơ quan văn hóa',
    maViecLienQuan: '',
    vbDiTraLoi: '18/KH-THCS',
    canhBaoHan: 'Hoàn thành',
    soNgayConLai: 0,
    trichYeu: 'Hướng dẫn bình xét danh hiệu Cơ quan - Đơn vị đạt chuẩn văn hóa và gia đình học tập tiêu biểu năm 2026.',
    ghiChu: 'Hội đồng thi đua nhà trường đã hoàn thiện hồ sơ đề nghị công nhận Đơn vị văn hóa gửi về xã.',
    fileDinhKem: ['HD_18_VHXH_DonViVanHoa.pdf']
  },
  {
    id: 'VBD-2026-002',
    soKyHieu: '41/TB-UBND',
    ngayVanBan: '04/03/2026',
    ngayDen: '05/03/2026',
    coQuanBanHanh: 'UBND xã',
    loaiVanBan: 'Thông báo',
    linhVuc: 'Bồi dưỡng HSG & Phụ đạo HS yếu',
    doKhan: 'Thường',
    doMat: 'Thường',
    lanhDaoGiao: 'Phó Hiệu trưởng (Chuyên môn)',
    donViChuTri: 'Tổ Ngữ văn',
    canBoChuTri: 'Nguyễn Hoài Nam',
    canBoPhoiHop: ['Phạm Thu Hà'],
    hanXuLy: '20/03/2026',
    trangThai: 'Hoàn thành',
    ketQuaXuLy: 'Danh sách khen thưởng khuyến học',
    canhBaoHan: 'Hoàn thành',
    soNgayConLai: 0,
    trichYeu: 'Thông báo xét trao học bổng Quỹ Khuyến học xã cho học sinh đạt giải cao và học sinh vượt khó học giỏi.',
    ghiChu: 'Trường đã lập danh sách 16 học sinh tiêu biểu gửi Hội đồng Khuyến học xã.',
    fileDinhKem: ['TB_41_UBND_QuyKhuyenHoc.pdf']
  },
  {
    id: 'VBD-2026-001',
    soKyHieu: '15/KH-UBND',
    ngayVanBan: '01/03/2026',
    ngayDen: '02/03/2026',
    coQuanBanHanh: 'UBND xã',
    loaiVanBan: 'Kế hoạch',
    linhVuc: 'Phổ cập giáo dục - Xóa mù chữ',
    doKhan: 'Thường',
    doMat: 'Thường',
    lanhDaoGiao: 'Hiệu trưởng',
    donViChuTri: 'Tổ Toán - Tin học',
    canBoChuTri: 'Đỗ Minh Khang',
    canBoPhoiHop: ['Vũ Thị Lan'],
    hanXuLy: '15/03/2026',
    trangThai: 'Hoàn thành',
    ketQuaXuLy: 'Hồ sơ phổ cập',
    vbDiTraLoi: '',
    canhBaoHan: 'Hoàn thành',
    soNgayConLai: 0,
    trichYeu: 'Kế hoạch rà soát và duy trì công tác phổ cập giáo dục THCS trên địa bàn toàn xã năm 2026.',
    ghiChu: 'Ban Chỉ đạo Phổ cập xã đã kiểm tra thực tế, ghi nhận kết quả vững chắc.',
    fileDinhKem: ['KH_15_UBND_PhoCapGD.pdf']
  }
];

export const INITIAL_VAN_BAN_DI: VanBanDi[] = [
  {
    id: 'VBD-2026-007',
    soKyHieu: '24/BC-THCS',
    ngaySoan: '31/03/2026',
    ngayPhatHanh: '03/04/2026',
    hanPhatHanh: '03/04/2026',
    trichYeu: 'Báo cáo đánh giá giữa học kỳ II và công tác bồi dưỡng học sinh giỏi lớp 9 cấp tỉnh.',
    nguoiKy: 'Hiệu trưởng',
    chucVuNguoiKy: 'Nguyễn Văn An',
    donViSoan: 'Ban Giám hiệu',
    nguoiSoan: 'Trần Thị Mai',
    loaiVanBan: 'Báo cáo',
    linhVuc: 'Khảo thí & Đánh giá học sinh',
    doKhan: 'Thường',
    doMat: 'Thường',
    trangThai: 'Đã phát hành',
    vbDenLienQuan: 'VBD-2026-006',
    soBanLuu: 3,
    noiNhan: 'UBND xã, Phòng Văn hóa - Xã hội xã, Các tổ chuyên môn',
    fileDinhKem: ['BC_24_DanhGiaGiuaKyII.pdf']
  },
  {
    id: 'VBD-2026-003',
    soKyHieu: '18/KH-THCS',
    ngaySoan: '30/03/2026',
    ngayPhatHanh: '',
    hanPhatHanh: '02/04/2026',
    trichYeu: 'Kế hoạch tổ chức ôn tập và kiểm tra định kỳ học kỳ II năm học 2025 - 2026.',
    nguoiKy: 'Hiệu trưởng',
    chucVuNguoiKy: 'Nguyễn Văn An',
    donViSoan: 'Ban Giám hiệu',
    nguoiSoan: 'Trần Thị Mai',
    loaiVanBan: 'Kế hoạch',
    linhVuc: 'Chuyên môn & Dạy học',
    doKhan: 'Thường',
    doMat: 'Thường',
    trangThai: 'Chờ ký',
    vbDenLienQuan: 'VBD-2026-003',
    soBanLuu: 5,
    noiNhan: 'Toàn thể giáo viên, Ban đại diện CMHS',
    fileDinhKem: ['KH_18_OnTapKiemTra_Draft.pdf']
  },
  {
    id: 'VBD-2026-005',
    soKyHieu: '07/TTr-THCS',
    ngaySoan: '21/03/2026',
    ngayPhatHanh: '',
    hanPhatHanh: '04/04/2026',
    trichYeu: 'Tờ trình xin cấp kinh phí sửa chữa hệ thống mạng Internet và máy tính phòng tin học số 2.',
    nguoiKy: 'Hiệu trưởng',
    chucVuNguoiKy: 'Nguyễn Văn An',
    donViSoan: 'Tổ Văn phòng - Kế toán - Y tế',
    nguoiSoan: 'Bùi Thị Hạnh',
    loaiVanBan: 'Tờ trình',
    linhVuc: 'Cơ sở vật chất & Thiết bị dạy học',
    doKhan: 'Thường',
    doMat: 'Thường',
    trangThai: 'Dự thảo',
    vbDenLienQuan: 'VBD-2026-009',
    soBanLuu: 2,
    noiNhan: 'UBND xã, Bộ phận Kế toán - Ngân sách xã',
    fileDinhKem: ['TTr_SuaChuaPhongMayTin.docx']
  },
  {
    id: 'VBD-2026-010',
    soKyHieu: '15/QĐ-THCS',
    ngaySoan: '30/03/2026',
    ngayPhatHanh: '',
    hanPhatHanh: '05/04/2026',
    trichYeu: 'Quyết định thành lập Hội đồng ra đề và coi kiểm tra giữa học kỳ II năm học 2025 - 2026.',
    nguoiKy: 'Hiệu trưởng',
    chucVuNguoiKy: 'Nguyễn Văn An',
    donViSoan: 'Ban Giám hiệu',
    nguoiSoan: 'Vũ Thị Lan',
    loaiVanBan: 'Quyết định',
    linhVuc: 'Khảo thí & Đánh giá học sinh',
    doKhan: 'Thường',
    doMat: 'Thường',
    trangThai: 'Đã ký',
    vbDenLienQuan: 'VBD-2026-010',
    soBanLuu: 4,
    noiNhan: 'Các thành viên Hội đồng, BGH',
    fileDinhKem: ['QD_15_HoiDongCoiThi.pdf']
  },
  {
    id: 'VBD-2026-004',
    soKyHieu: '12/TB-THCS',
    ngaySoan: '20/03/2026',
    ngayPhatHanh: '22/03/2026',
    hanPhatHanh: '22/03/2026',
    trichYeu: 'Thông báo lịch họp phụ huynh học sinh giữa học kỳ II và phối hợp giáo dục nề nếp học sinh.',
    nguoiKy: 'Hiệu trưởng',
    chucVuNguoiKy: 'Nguyễn Văn An',
    donViSoan: 'Ban Giám hiệu',
    nguoiSoan: 'Vũ Thị Lan',
    loaiVanBan: 'Thông báo',
    linhVuc: 'Chuyên môn & Dạy học',
    doKhan: 'Thường',
    doMat: 'Thường',
    trangThai: 'Đã phát hành',
    soBanLuu: 3,
    noiNhan: 'Giáo viên chủ nhiệm, Ban đại diện CMHS 16 lớp',
    fileDinhKem: ['TB_12_HopPhuHuynh.pdf']
  },
  {
    id: 'VBD-2026-002',
    soKyHieu: '09/KH-THCS',
    ngaySoan: '15/03/2026',
    ngayPhatHanh: '16/03/2026',
    hanPhatHanh: '16/03/2026',
    trichYeu: 'Kế hoạch tổ chức các hoạt động kỷ niệm 95 năm Ngày thành lập Đoàn TNCS Hồ Chí Minh.',
    nguoiKy: 'Hiệu trưởng',
    chucVuNguoiKy: 'Nguyễn Văn An',
    donViSoan: 'Đoàn Thanh niên - Đội TNTP',
    nguoiSoan: 'Nguyễn Thanh Phúc',
    loaiVanBan: 'Kế hoạch',
    linhVuc: 'Công tác Đội & Phong trào thiếu nhi',
    doKhan: 'Thường',
    doMat: 'Thường',
    trangThai: 'Đã phát hành',
    soBanLuu: 5,
    noiNhan: 'Xã đoàn, Chi đoàn trường, Liên đội, BGH',
    fileDinhKem: ['KH_09_KyNiem26_3.pdf']
  },
  {
    id: 'VBD-2026-001',
    soKyHieu: '05/BC-THCS',
    ngaySoan: '05/03/2026',
    ngayPhatHanh: '08/03/2026',
    hanPhatHanh: '08/03/2026',
    trichYeu: 'Báo cáo công tác y tế học đường, phòng chống dịch bệnh mùa xuân và an toàn trường học.',
    nguoiKy: 'Phó Hiệu trưởng',
    chucVuNguoiKy: 'Lê Quốc Bảo',
    donViSoan: 'Tổ Văn phòng - Kế toán - Y tế',
    nguoiSoan: 'Hoàng Thị Yến',
    loaiVanBan: 'Báo cáo',
    linhVuc: 'Y tế học đường & An toàn trường học',
    doKhan: 'Thường',
    doMat: 'Thường',
    trangThai: 'Đã phát hành',
    soBanLuu: 3,
    noiNhan: 'UBND xã, Phòng Văn hóa - Xã hội xã, Trạm Y tế xã',
    fileDinhKem: ['BC_05_YTeHocDuong.pdf']
  }
];

export const INITIAL_CONG_VIEC: CongViec[] = [
  {
    id: 'CV-2026-010',
    noiDung: 'Nộp ma trận, bản đặc tả và đề kiểm tra định kỳ học kỳ II môn Toán và Ngữ văn',
    nguonViec: 'Chỉ đạo Ban Giám hiệu',
    maVbLienQuan: 'VBD-2026-010',
    soKyHieuVbLienQuan: '89/SGDĐT-GDTrH',
    linhVuc: 'Khảo thí & Đánh giá học sinh',
    mucDoUuTien: 'Cao',
    lanhDaoGiao: 'Phó Hiệu trưởng (Chuyên môn)',
    donViChuTri: 'Tổ Toán - Tin học',
    canBoChuTri: 'Phạm Thu Hà',
    canBoPhoiHop: ['Nguyễn Hoài Nam', 'Trần Thị Mai'],
    ngayGiao: '29/03/2026',
    hanHoanThanh: '12/04/2026',
    phanTramHoanThanh: 25,
    trangThai: 'Đang xử lý',
    ketQuaDauRa: 'Đề thi & Ma trận đặc tả',
    soKyHieuVbTraLoi: '15/QĐ-THCS',
    canhBaoHan: 'Trong hạn',
    soNgayConLai: 4,
    ghiChu: 'Đã hoàn thành dự thảo ma trận môn Toán 9, đang phản biện đề Ngữ văn.'
  },
  {
    id: 'CV-2026-008',
    noiDung: 'Cập nhật và hoàn thiện học bạ điện tử, điểm số giữa kỳ trên hệ thống VnEdu/CSDL ngành',
    nguonViec: 'Văn bản đến',
    maVbLienQuan: 'VBD-2026-008',
    soKyHieuVbLienQuan: '45/PGDĐT-CNTT',
    linhVuc: 'Chuyển đổi số & CSDL ngành',
    mucDoUuTien: 'Cao',
    lanhDaoGiao: 'Hiệu trưởng',
    donViChuTri: 'Tổ Toán - Tin học',
    canBoChuTri: 'Đỗ Minh Khang',
    canBoPhoiHop: ['Vũ Thị Lan'],
    ngayGiao: '26/03/2026',
    hanHoanThanh: '10/04/2026',
    phanTramHoanThanh: 70,
    trangThai: 'Đang xử lý',
    ketQuaDauRa: 'Học bạ điện tử số hóa',
    soKyHieuVbTraLoi: '',
    canhBaoHan: 'Sắp hạn',
    soNgayConLai: 2,
    ghiChu: 'Khối 8 và khối 9 đã đồng bộ 100%, còn khối 6 đang rà soát mã định danh.'
  },
  {
    id: 'CV-2026-006',
    noiDung: 'Lập danh sách học sinh khối 7 tiêm vắc xin Td và gửi giấy đồng thuận phụ huynh',
    nguonViec: 'Văn bản đến',
    maVbLienQuan: 'VBD-2026-007',
    soKyHieuVbLienQuan: '33/TTYT-YTCC',
    linhVuc: 'Y tế học đường & An toàn trường học',
    mucDoUuTien: 'Trung bình',
    lanhDaoGiao: 'Phó Hiệu trưởng (CSVC)',
    donViChuTri: 'Tổ Văn phòng - Kế toán - Y tế',
    canBoChuTri: 'Hoàng Thị Yến',
    canBoPhoiHop: ['Nguyễn Thanh Phúc'],
    ngayGiao: '22/03/2026',
    hanHoanThanh: '08/04/2026',
    phanTramHoanThanh: 50,
    trangThai: 'Đang xử lý',
    ketQuaDauRa: 'Danh sách tiêm chủng & Phiếu đồng thuận',
    soKyHieuVbTraLoi: '',
    canhBaoHan: 'Trong hạn',
    soNgayConLai: 7,
    ghiChu: 'Thu được 145/160 phiếu đồng thuận từ các lớp 7A, 7B, 7C, 7D.'
  },
  {
    id: 'CV-2026-002',
    noiDung: 'Hoàn thiện hồ sơ minh chứng đề nghị kết nạp Đoàn cho 45 đội viên ưu tú khối 9',
    nguonViec: 'Nhiệm vụ Đội & Phong trào',
    maVbLienQuan: 'VBD-2026-005',
    soKyHieuVbLienQuan: '18/HĐ-ĐTN',
    linhVuc: 'Công tác Đội & Phong trào thiếu nhi',
    mucDoUuTien: 'Khẩn',
    lanhDaoGiao: 'Hiệu trưởng',
    donViChuTri: 'Đoàn Thanh niên - Đội TNTP',
    canBoChuTri: 'Nguyễn Thanh Phúc',
    canBoPhoiHop: [],
    ngayGiao: '19/03/2026',
    hanHoanThanh: '31/03/2026',
    phanTramHoanThanh: 85,
    trangThai: 'Quá hạn',
    ketQuaDauRa: 'Nghị quyết kết nạp Đoàn',
    canhBaoHan: 'Quá hạn',
    soNgayConLai: -5,
    ghiChu: 'Cần bổ sung sổ đoàn và ảnh 3x4 của 8 em học sinh lớp 9C.'
  },
  {
    id: 'CV-2026-012',
    noiDung: 'Tổ chức hoạt động ngoại khóa trải nghiệm thực tế tìm hiểu lịch sử địa phương cho khối 6',
    nguonViec: 'Kế hoạch năm học',
    maVbLienQuan: '',
    linhVuc: 'Chuyên môn & Dạy học',
    mucDoUuTien: 'Thấp',
    lanhDaoGiao: 'Hiệu trưởng',
    donViChuTri: 'Tổ Ngữ văn',
    canBoChuTri: 'Nguyễn Hoài Nam',
    canBoPhoiHop: ['Nguyễn Thanh Phúc'],
    ngayGiao: '14/03/2026',
    hanHoanThanh: '18/03/2026',
    ngayHoanThanhThucTe: '18/03/2026',
    phanTramHoanThanh: 100,
    trangThai: 'Hoàn thành',
    ketQuaDauRa: 'Báo cáo thu hoạch trải nghiệm',
    soKyHieuVbTraLoi: '',
    canhBaoHan: 'Hoàn thành',
    soNgayConLai: 0,
    ghiChu: 'Buổi học tập trải nghiệm tại đền liệt sĩ huyện đã diễn ra an toàn, ý nghĩa.'
  },
  {
    id: 'CV-2026-001',
    noiDung: 'Tập huấn giáo viên sử dụng thiết bị phòng học thông minh và màn hình tương tác',
    nguonViec: 'Chỉ đạo Ban Giám hiệu',
    maVbLienQuan: '',
    linhVuc: 'Chuyển đổi số & CSDL ngành',
    mucDoUuTien: 'Cao',
    lanhDaoGiao: 'Phó Hiệu trưởng (Chuyên môn)',
    donViChuTri: 'Tổ Toán - Tin học',
    canBoChuTri: 'Đỗ Minh Khang',
    canBoPhoiHop: ['Phan Thị Đức'],
    ngayGiao: '16/03/2026',
    hanHoanThanh: '28/03/2026',
    ngayHoanThanhThucTe: '28/03/2026',
    phanTramHoanThanh: 100,
    trangThai: 'Hoàn thành',
    ketQuaDauRa: 'Biên bản tập huấn',
    soKyHieuVbTraLoi: '24/BC-THCS',
    canhBaoHan: 'Hoàn thành',
    soNgayConLai: 0,
    ghiChu: '100% giáo viên các tổ đã thực hành thành thạo phần mềm soạn bài giảng.'
  }
];

export const DANH_MUC_DON_VI = [
  'Ban Giám hiệu',
  'Tổ Toán - Tin học',
  'Tổ Khoa học Tự nhiên',
  'Tổ Ngữ văn',
  'Tổ Lịch sử - Địa lý - GDCD',
  'Tổ Ngoại ngữ (Tiếng Anh)',
  'Tổ Nghệ thuật - Giáo dục Thể chất',
  'Tổ Văn phòng - Kế toán - Y tế',
  'Đoàn Thanh niên - Đội TNTP',
  'Ban Thanh tra nhân dân',
  'Ban đại diện Cha mẹ học sinh'
];

export const DANH_MUC_LOAI_VB = [
  'Công văn',
  'Kế hoạch giáo dục',
  'Quyết định',
  'Thông báo',
  'Hướng dẫn chuyên môn',
  'Tờ trình',
  'Báo cáo sơ kết / tổng kết',
  'Lịch công tác tuần / tháng',
  'Biên bản kiểm tra chuyên môn',
  'Phân công chuyên môn / TKB'
];

export const DANH_MUC_LINH_VUC = [
  'Chuyên môn & Dạy học',
  'Khảo thí & Đánh giá học sinh',
  'Bồi dưỡng HSG & Phụ đạo HS yếu',
  'Chuyển đổi số & CSDL ngành',
  'Công tác Đội & Phong trào thiếu nhi',
  'Y tế học đường & An toàn trường học',
  'Cơ sở vật chất & Thiết bị dạy học',
  'Tài chính - Học phí - Chính sách HS',
  'Thi đua - Khen thưởng',
  'Phổ cập giáo dục - Xóa mù chữ'
];

export const DANH_MUC_CO_QUAN_BAN_HANH = [
  'UBND xã',
  'Phòng Văn hóa - Xã hội xã',
  'Xã đoàn',
  'Trạm Y tế xã',
  'Công an xã',
  'Hội Khuyến học xã',
  'Ban đại diện Cha mẹ học sinh'
];
