import React, { useState, useEffect } from 'react';
import { 
  X, 
  Globe, 
  HardDrive, 
  Search, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Loader2, 
  ExternalLink, 
  AlertCircle,
  Copy,
  FolderOpen,
  Sparkles,
  Download,
  Calendar,
  Building2,
  Send,
  Briefcase,
  LogOut,
  RefreshCw,
  FileCheck
} from 'lucide-react';
import { 
  VanBanDen, 
  DANH_MUC_CO_QUAN_BAN_HANH, 
  DANH_MUC_LOAI_VB, 
  DANH_MUC_LINH_VUC 
} from '../data/mockData';
import { 
  googleSignIn, 
  googleLogout, 
  listGoogleDriveFiles, 
  initAuth, 
  DriveFileItem 
} from '../services/googleDriveService';
import { User } from 'firebase/auth';

interface WebAndDriveImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportVbDen: (vb: VanBanDen) => void;
  onCreateTask?: (vb: VanBanDen) => void;
}

export const WebAndDriveImportModal: React.FC<WebAndDriveImportModalProps> = ({
  isOpen,
  onClose,
  onImportVbDen,
  onCreateTask
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'web' | 'drive'>('drive');

  // Web State
  const [webUrl, setWebUrl] = useState('');
  const [isFetchingWeb, setIsFetchingWeb] = useState(false);
  const [webError, setWebError] = useState<string | null>(null);
  const [extractedDoc, setExtractedDoc] = useState<VanBanDen | null>(null);

  // Drive State
  const [driveUrl, setDriveUrl] = useState('');
  const [isParsingDrive, setIsParsingDrive] = useState(false);
  const [driveError, setDriveError] = useState<string | null>(null);
  const [drivePreviewInfo, setDrivePreviewInfo] = useState<{
    fileId: string;
    previewUrl: string;
    embedUrl: string;
    downloadUrl: string;
    doc: VanBanDen;
  } | null>(null);

  // Google OAuth Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [myDriveFiles, setMyDriveFiles] = useState<DriveFileItem[]>([]);
  const [isLoadingDriveFiles, setIsLoadingDriveFiles] = useState(false);
  const [driveSearchQuery, setDriveSearchQuery] = useState('');

  // Listen for auth state on modal mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => {
        setCurrentUser(user);
        loadMyFiles(user);
      },
      () => {
        setCurrentUser(null);
        setMyDriveFiles([]);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    setDriveError(null);
    try {
      const result = await googleSignIn();
      setCurrentUser(result.user);
      await loadMyFiles(result.user);
    } catch (err: any) {
      setDriveError(err.message || 'Đăng nhập Google không thành công');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGoogleLogout = async () => {
    await googleLogout();
    setCurrentUser(null);
    setMyDriveFiles([]);
  };

  const loadMyFiles = async (user?: User | null, query?: string) => {
    setIsLoadingDriveFiles(true);
    try {
      const files = await listGoogleDriveFiles(query);
      setMyDriveFiles(files);
    } catch (err: any) {
      console.warn('Could not list drive files:', err);
    } finally {
      setIsLoadingDriveFiles(false);
    }
  };

  // Sample quick presets for testing
  const sampleWebLinks = [
    {
      title: 'Kế hoạch liên tịch Xã đoàn & Trường THCS tháng 4',
      url: 'https://xadoan.haiduong.gov.vn/van-ban/ke-hoach-thanh-thieu-nhi-2026'
    },
    {
      title: 'Thông báo UBND xã về công tác an toàn trường học & vệ sinh môi trường',
      url: 'https://ubndxahaihung.gov.vn/chi-dao/tb-an-toan-truong-hoc-2026'
    },
    {
      title: 'Hướng dẫn Phòng Văn hóa - Xã hội về ngày hội thể thao cơ sở',
      url: 'https://ubndxahaihung.gov.vn/van-hoa-xa-hoi/huong-dan-ngay-hoi-the-thao-hoc-duong'
    }
  ];

  const sampleDriveLinks = [
    {
      title: 'Kế hoạch phối hợp công tác giáo dục hè 2026 (PDF)',
      url: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view'
    },
    {
      title: 'Tờ trình cải tạo sân chơi bãi tập trường THCS (Docs)',
      url: 'https://docs.google.com/document/d/1u_J6MUpN5xZf5D1g9vC_w2Kq3P4_demo/edit'
    }
  ];

  // Fetch Web Document
  const handleFetchWeb = async (urlToFetch?: string) => {
    const targetUrl = urlToFetch || webUrl;
    if (!targetUrl.trim()) {
      setWebError('Vui lòng nhập địa chỉ URL trang web văn bản!');
      return;
    }

    setIsFetchingWeb(true);
    setWebError(null);
    setExtractedDoc(null);

    try {
      const res = await fetch('/api/fetch-web-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl.trim() })
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Không thể lấy dữ liệu từ URL này');
      }

      const doc: VanBanDen = {
        id: data.document.id,
        soKyHieu: data.document.soKyHieu,
        ngayVanBan: data.document.ngayVanBan,
        ngayDen: data.document.ngayDen,
        coQuanBanHanh: data.document.coQuanBanHanh || 'UBND xã',
        loaiVanBan: data.document.loaiVanBan || 'Công văn',
        linhVuc: data.document.linhVuc || 'Chuyên môn & Dạy học',
        doKhan: 'Thường',
        doMat: 'Thường',
        lanhDaoGiao: 'Hiệu trưởng',
        donViChuTri: 'Tổ Văn phòng - Kế toán - Y tế',
        canBoChuTri: 'Vũ Thị Lan',
        canBoPhoiHop: [],
        hanXuLy: data.document.hanXuLy,
        trangThai: 'Mới tiếp nhận',
        canhBaoHan: 'Trong hạn',
        soNgayConLai: 14,
        trichYeu: data.document.trichYeu,
        ghiChu: `Lấy tự động từ trang web: ${targetUrl}`,
        fileDinhKem: data.document.fileDinhKem || ['VanBan_TrichXuat_Web.pdf']
      };

      setExtractedDoc(doc);
    } catch (err: any) {
      setWebError(err.message || 'Lỗi khi trích xuất văn bản từ Web');
    } finally {
      setIsFetchingWeb(false);
    }
  };

  // Parse Drive Document Link
  const handleParseDrive = async (urlToParse?: string) => {
    const targetUrl = urlToParse || driveUrl;
    if (!targetUrl.trim()) {
      setDriveError('Vui lòng nhập link chia sẻ Google Drive hoặc ID tệp!');
      return;
    }

    setIsParsingDrive(true);
    setDriveError(null);
    setDrivePreviewInfo(null);

    try {
      const res = await fetch('/api/drive/parse-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driveUrl: targetUrl.trim() })
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Không thể nhận diện liên kết Google Drive');
      }

      const doc: VanBanDen = {
        id: data.suggestedDocument.id,
        soKyHieu: data.suggestedDocument.soKyHieu,
        ngayVanBan: data.suggestedDocument.ngayVanBan,
        ngayDen: data.suggestedDocument.ngayDen,
        coQuanBanHanh: data.suggestedDocument.coQuanBanHanh || 'UBND xã',
        loaiVanBan: data.suggestedDocument.loaiVanBan || 'Kế hoạch',
        linhVuc: data.suggestedDocument.linhVuc || 'Chuyên môn & Dạy học',
        doKhan: 'Thường',
        doMat: 'Thường',
        lanhDaoGiao: 'Hiệu trưởng',
        donViChuTri: 'Tổ Toán - Tin học',
        canBoChuTri: 'Đỗ Minh Khang',
        canBoPhoiHop: [],
        hanXuLy: data.suggestedDocument.hanXuLy,
        trangThai: 'Mới tiếp nhận',
        canhBaoHan: 'Trong hạn',
        soNgayConLai: 10,
        trichYeu: data.suggestedDocument.trichYeu,
        ghiChu: `Nhập từ Google Drive tệp ID: ${data.fileId}`,
        fileDinhKem: data.suggestedDocument.fileDinhKem || [`GoogleDrive_${data.fileId.slice(0, 8)}.pdf`]
      };

      setDrivePreviewInfo({
        fileId: data.fileId,
        previewUrl: data.previewUrl,
        embedUrl: data.embedUrl,
        downloadUrl: data.downloadUrl,
        doc
      });
    } catch (err: any) {
      setDriveError(err.message || 'Lỗi khi phân tích liên kết Google Drive');
    } finally {
      setIsParsingDrive(false);
    }
  };

  const handleSelectDriveItem = (file: DriveFileItem) => {
    const fileId = file.id;
    const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    // Auto classify by title
    let coQuan = 'UBND xã';
    const lower = file.name.toLowerCase();
    if (lower.includes('văn hóa') || lower.includes('vh-xh') || lower.includes('vhxh')) {
      coQuan = 'Phòng Văn hóa - Xã hội xã';
    } else if (lower.includes('đoàn') || lower.includes('dtn') || lower.includes('thanh niên')) {
      coQuan = 'Xã đoàn';
    }

    const doc: VanBanDen = {
      id: `VBD-DRV-${Date.now().toString().slice(-4)}`,
      soKyHieu: `${Math.floor(Math.random() * 40 + 10)}/KH-UBND`,
      ngayVanBan: new Date().toISOString().split('T')[0],
      ngayDen: new Date().toISOString().split('T')[0],
      coQuanBanHanh: coQuan,
      loaiVanBan: file.name.includes('.pdf') ? 'Kế hoạch' : 'Công văn',
      linhVuc: 'Chuyên môn & Dạy học',
      doKhan: 'Thường',
      doMat: 'Thường',
      lanhDaoGiao: 'Hiệu trưởng',
      donViChuTri: 'Tổ Toán - Tin học',
      canBoChuTri: 'Đỗ Minh Khang',
      canBoPhoiHop: [],
      hanXuLy: '2026-05-15',
      trangThai: 'Mới tiếp nhận',
      canhBaoHan: 'Trong hạn',
      soNgayConLai: 10,
      trichYeu: file.name.replace(/\.[^/.]+$/, ''),
      ghiChu: `Nhập trực tiếp từ tài khoản Google Drive: ${file.name}`,
      fileDinhKem: [file.name]
    };

    setDrivePreviewInfo({
      fileId,
      previewUrl,
      embedUrl,
      downloadUrl,
      doc
    });
  };

  const handleSaveToVbDen = (doc: VanBanDen) => {
    onImportVbDen(doc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-4xl max-h-[92vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  Thu nhận dữ liệu số
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">UBND xã • Văn hóa - Xã hội • Xã đoàn</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Lấy & Đọc văn bản từ Web và Google Drive
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 px-6 pt-2">
          <button
            onClick={() => setActiveTab('drive')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'drive'
                ? 'border-indigo-600 text-indigo-800 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-t-lg'
            }`}
          >
            <HardDrive className="w-4 h-4 text-indigo-600" />
            <span>Google Drive (Tài khoản & Liên kết)</span>
          </button>

          <button
            onClick={() => setActiveTab('web')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'web'
                ? 'border-teal-600 text-teal-800 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-t-lg'
            }`}
          >
            <Globe className="w-4 h-4 text-teal-600" />
            <span>Lấy từ trang Web (URL / Cổng TTĐT)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: GOOGLE DRIVE */}
          {activeTab === 'drive' && (
            <div className="space-y-6">
              {/* Account Sign-In / Status Bar */}
              <div className="bg-gradient-to-r from-indigo-50/80 via-white to-blue-50/80 p-4 rounded-xl border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                      <path fill="none" d="M0 0h48v48H0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">
                      {currentUser ? `Đang kết nối: ${currentUser.email || currentUser.displayName}` : 'Tài khoản Google Drive'}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {currentUser 
                        ? 'Đã liên kết thành công để duyệt tệp văn bản từ Google Drive của bạn' 
                        : 'Đăng nhập Google để tải danh sách tệp văn bản & phân công trực tiếp'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {currentUser ? (
                    <>
                      <button
                        onClick={() => loadMyFiles(currentUser, driveSearchQuery)}
                        disabled={isLoadingDriveFiles}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDriveFiles ? 'animate-spin text-indigo-600' : ''}`} />
                        <span>Làm mới tệp</span>
                      </button>
                      <button
                        onClick={handleGoogleLogout}
                        className="flex items-center gap-1 px-2.5 py-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                        title="Đăng xuất"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleGoogleLogin}
                      disabled={isSigningIn}
                      className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-pointer hover:border-slate-400"
                    >
                      {isSigningIn ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                          <span>Đang đăng nhập...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                            <path fill="none" d="M0 0h48v48H0z"/>
                          </svg>
                          <span>Đăng nhập với Google</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Connected Drive File Browser (if logged in) */}
              {currentUser && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <FolderOpen className="w-4 h-4 text-indigo-600" />
                      <span>Tệp văn bản trong Google Drive của bạn</span>
                    </label>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {myDriveFiles.length} tệp tìm thấy
                    </span>
                  </div>

                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={driveSearchQuery}
                      onChange={(e) => {
                        setDriveSearchQuery(e.target.value);
                        loadMyFiles(currentUser, e.target.value);
                      }}
                      placeholder="Tìm tệp theo tên trong Google Drive..."
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  {isLoadingDriveFiles ? (
                    <div className="py-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                      <span>Đang tải danh sách tệp từ Google Drive...</span>
                    </div>
                  ) : myDriveFiles.length > 0 ? (
                    <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                      {myDriveFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-2.5 bg-white hover:bg-indigo-50/60 border border-slate-200 rounded-lg transition-colors group text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-800 truncate">{file.name}</p>
                              <p className="text-[10px] text-slate-400">
                                {file.mimeType.split('.').pop() || 'Tài liệu'}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleSelectDriveItem(file)}
                            className="px-3 py-1 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white rounded text-[11px] font-semibold transition-colors shrink-0 cursor-pointer"
                          >
                            Chọn & Đọc
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 py-3 text-center italic">
                      Chưa tìm thấy tệp PDF hoặc tài liệu nào. Bạn cũng có thể dán link chia sẻ trực tiếp bên dưới.
                    </p>
                  )}
                </div>
              )}

              {/* Drive Link Input Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <label className="text-xs font-bold text-slate-700 block">
                  Hoặc dán đường link chia sẻ Google Drive (Docs, Sheets, PDF hoặc File ID):
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <HardDrive className="w-4 h-4 text-indigo-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={driveUrl}
                      onChange={(e) => setDriveUrl(e.target.value)}
                      placeholder="https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view..."
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => handleParseDrive()}
                    disabled={isParsingDrive}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors disabled:opacity-50 shrink-0 cursor-pointer"
                  >
                    {isParsingDrive ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Đang kết nối...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        <span>Đọc tệp Drive</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Sample Drive Links */}
                <div className="pt-2 border-t border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                    Gợi ý liên kết Google Drive mẫu:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sampleDriveLinks.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setDriveUrl(item.url);
                          handleParseDrive(item.url);
                        }}
                        className="text-left text-[11px] px-2.5 py-1 bg-white hover:bg-indigo-50 hover:border-indigo-300 text-slate-700 border border-slate-200 rounded-md transition-colors cursor-pointer"
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>

                {driveError && (
                  <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{driveError}</span>
                  </div>
                )}
              </div>

              {/* Google Drive Preview and Document Info */}
              {drivePreviewInfo && (
                <div className="space-y-4">
                  {/* Embedded Google Drive Document Viewer */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-slate-900">
                    <div className="px-4 py-2.5 bg-slate-800 text-white flex items-center justify-between text-xs">
                      <span className="font-semibold flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-indigo-400" />
                        Trình đọc tệp Google Drive (ID: {drivePreviewInfo.fileId.slice(0, 16)}...)
                      </span>
                      <a
                        href={drivePreviewInfo.previewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-[11px] text-teal-300 hover:text-white"
                      >
                        <span>Mở tab mới</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="w-full h-80 bg-slate-100 flex items-center justify-center relative">
                      <iframe
                        src={drivePreviewInfo.previewUrl}
                        title="Google Drive Document Preview"
                        className="w-full h-full border-0"
                        allow="autoplay"
                      />
                    </div>
                  </div>

                  {/* Document Card Details */}
                  <div className="bg-white border border-indigo-200 rounded-xl p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-bold text-indigo-800 uppercase tracking-wide">
                        Thông tin văn bản trích xuất từ Google Drive
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        {drivePreviewInfo.doc.id}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-indigo-50/40 p-4 rounded-xl border border-indigo-100">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-0.5">Số / Ký hiệu</span>
                        <input
                          type="text"
                          value={drivePreviewInfo.doc.soKyHieu}
                          onChange={(e) => setDrivePreviewInfo({
                            ...drivePreviewInfo,
                            doc: { ...drivePreviewInfo.doc, soKyHieu: e.target.value }
                          })}
                          className="w-full bg-white px-2 py-1 border border-slate-200 rounded text-xs font-bold text-slate-800"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-0.5">Cơ quan ban hành</span>
                        <select
                          value={drivePreviewInfo.doc.coQuanBanHanh}
                          onChange={(e) => setDrivePreviewInfo({
                            ...drivePreviewInfo,
                            doc: { ...drivePreviewInfo.doc, coQuanBanHanh: e.target.value }
                          })}
                          className="w-full bg-white px-2 py-1 border border-slate-200 rounded text-xs font-semibold text-slate-800"
                        >
                          {DANH_MUC_CO_QUAN_BAN_HANH.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>

                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-0.5">Loại văn bản</span>
                        <select
                          value={drivePreviewInfo.doc.loaiVanBan}
                          onChange={(e) => setDrivePreviewInfo({
                            ...drivePreviewInfo,
                            doc: { ...drivePreviewInfo.doc, loaiVanBan: e.target.value }
                          })}
                          className="w-full bg-white px-2 py-1 border border-slate-200 rounded text-xs font-medium text-slate-800"
                        >
                          {DANH_MUC_LOAI_VB.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Trích yếu văn bản</label>
                      <textarea
                        rows={2}
                        value={drivePreviewInfo.doc.trichYeu}
                        onChange={(e) => setDrivePreviewInfo({
                          ...drivePreviewInfo,
                          doc: { ...drivePreviewInfo.doc, trichYeu: e.target.value }
                        })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <span className="text-xs text-slate-500 font-mono">
                        ID: {drivePreviewInfo.fileId}
                      </span>

                      <div className="flex items-center gap-2">
                        {onCreateTask && (
                          <button
                            onClick={() => {
                              onImportVbDen(drivePreviewInfo.doc);
                              onCreateTask(drivePreviewInfo.doc);
                              onClose();
                            }}
                            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <Briefcase className="w-3.5 h-3.5 text-indigo-700" />
                            <span>Nhập & Giao việc ngay</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleSaveToVbDen(drivePreviewInfo.doc)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Nhập vào Sổ Văn bản đến</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WEB FETCHER */}
          {activeTab === 'web' && (
            <div className="space-y-6">
              {/* Web URL Input Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <label className="text-xs font-bold text-slate-700 block">
                  Nhập URL trang tin điện tử / thông báo / bài viết văn bản:
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Globe className="w-4 h-4 text-teal-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={webUrl}
                      onChange={(e) => setWebUrl(e.target.value)}
                      placeholder="https://ubndxahaihung.gov.vn/chi-dao/tb-an-toan-truong-hoc-2026..."
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:border-teal-600 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => handleFetchWeb()}
                    disabled={isFetchingWeb}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors disabled:opacity-50 shrink-0 cursor-pointer"
                  >
                    {isFetchingWeb ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Đang đọc...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        <span>Đọc văn bản web</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Sample Web Links */}
                <div className="pt-2 border-t border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                    Gợi ý địa chỉ văn bản xã mẫu:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sampleWebLinks.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setWebUrl(item.url);
                          handleFetchWeb(item.url);
                        }}
                        className="text-left text-[11px] px-2.5 py-1 bg-white hover:bg-teal-50 hover:border-teal-300 text-slate-700 border border-slate-200 rounded-md transition-colors cursor-pointer"
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>

                {webError && (
                  <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{webError}</span>
                  </div>
                )}
              </div>

              {/* Extracted Document Card */}
              {extractedDoc && (
                <div className="bg-white border border-teal-200 rounded-xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                        Văn bản đã bóc tách từ Web
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      {extractedDoc.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-teal-50/40 p-4 rounded-xl border border-teal-100">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-0.5">Số / Ký hiệu</span>
                      <input
                        type="text"
                        value={extractedDoc.soKyHieu}
                        onChange={(e) => setExtractedDoc({ ...extractedDoc, soKyHieu: e.target.value })}
                        className="w-full bg-white px-2 py-1 border border-slate-200 rounded text-xs font-bold text-slate-800"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-0.5">Cơ quan ban hành</span>
                      <select
                        value={extractedDoc.coQuanBanHanh}
                        onChange={(e) => setExtractedDoc({ ...extractedDoc, coQuanBanHanh: e.target.value })}
                        className="w-full bg-white px-2 py-1 border border-slate-200 rounded text-xs font-semibold text-slate-800"
                      >
                        {DANH_MUC_CO_QUAN_BAN_HANH.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-0.5">Loại văn bản</span>
                      <select
                        value={extractedDoc.loaiVanBan}
                        onChange={(e) => setExtractedDoc({ ...extractedDoc, loaiVanBan: e.target.value })}
                        className="w-full bg-white px-2 py-1 border border-slate-200 rounded text-xs font-medium text-slate-800"
                      >
                        {DANH_MUC_LOAI_VB.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-0.5">Hạn xử lý</span>
                      <input
                        type="text"
                        value={extractedDoc.hanXuLy}
                        onChange={(e) => setExtractedDoc({ ...extractedDoc, hanXuLy: e.target.value })}
                        className="w-full bg-white px-2 py-1 border border-slate-200 rounded text-xs font-bold text-rose-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Trích yếu nội dung văn bản</label>
                    <textarea
                      rows={2}
                      value={extractedDoc.trichYeu}
                      onChange={(e) => setExtractedDoc({ ...extractedDoc, trichYeu: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:bg-white"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <span className="text-xs text-slate-500 font-medium">
                      Tệp đính kèm: <strong>{extractedDoc.fileDinhKem?.[0]}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      {onCreateTask && (
                        <button
                          onClick={() => {
                            onImportVbDen(extractedDoc);
                            onCreateTask(extractedDoc);
                            onClose();
                          }}
                          className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Briefcase className="w-3.5 h-3.5 text-teal-700" />
                          <span>Nhập & Giao việc ngay</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleSaveToVbDen(extractedDoc)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Nhập vào Sổ Văn bản đến</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Hỗ trợ kết nối Google Drive (OAuth) & URL cổng thông tin UBND xã, VH-XH, Xã đoàn
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
