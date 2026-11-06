import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { VanBanDenView } from './components/VanBanDenView';
import { VanBanDiView } from './components/VanBanDiView';
import { CongViecView } from './components/CongViecView';
import { CanBoView } from './components/CanBoView';
import { BaoCaoView } from './components/BaoCaoView';
import { NguoiDungView } from './components/NguoiDungView';
import { DanhMucView } from './components/DanhMucView';
import { ChiTietVanBanDenModal } from './components/ChiTietVanBanDenModal';
import { ChiTietCongViecModal } from './components/ChiTietCongViecModal';
import { ThemModal } from './components/ThemModal';
import { WebAndDriveImportModal } from './components/WebAndDriveImportModal';
import { 
  VanBanDen, 
  VanBanDi, 
  CongViec, 
  CanBo,
  INITIAL_VAN_BAN_DEN,
  INITIAL_VAN_BAN_DI,
  INITIAL_CONG_VIEC,
  INITIAL_CAN_BO
} from './data/mockData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  // LocalStorage state management with school v2 namespace (commune entities)
  const [vbDenList, setVbDenList] = useState<VanBanDen[]>(() => {
    try {
      const saved = localStorage.getItem('qlvb_truonghoc_v2_vb_den');
      return saved ? JSON.parse(saved) : INITIAL_VAN_BAN_DEN;
    } catch {
      return INITIAL_VAN_BAN_DEN;
    }
  });

  const [vbDiList, setVbDiList] = useState<VanBanDi[]>(() => {
    try {
      const saved = localStorage.getItem('qlvb_truonghoc_v2_vb_di');
      return saved ? JSON.parse(saved) : INITIAL_VAN_BAN_DI;
    } catch {
      return INITIAL_VAN_BAN_DI;
    }
  });

  const [congViecList, setCongViecList] = useState<CongViec[]>(() => {
    try {
      const saved = localStorage.getItem('qlvb_truonghoc_v2_cong_viec');
      return saved ? JSON.parse(saved) : INITIAL_CONG_VIEC;
    } catch {
      return INITIAL_CONG_VIEC;
    }
  });

  const [canBoList, setCanBoList] = useState<CanBo[]>(() => {
    try {
      const saved = localStorage.getItem('qlvb_truonghoc_v2_can_bo');
      return saved ? JSON.parse(saved) : INITIAL_CAN_BO;
    } catch {
      return INITIAL_CAN_BO;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('qlvb_truonghoc_v2_vb_den', JSON.stringify(vbDenList));
    } catch {}
  }, [vbDenList]);

  useEffect(() => {
    try {
      localStorage.setItem('qlvb_truonghoc_v2_vb_di', JSON.stringify(vbDiList));
    } catch {}
  }, [vbDiList]);

  useEffect(() => {
    try {
      localStorage.setItem('qlvb_truonghoc_v2_cong_viec', JSON.stringify(congViecList));
    } catch {}
  }, [congViecList]);

  useEffect(() => {
    try {
      localStorage.setItem('qlvb_truonghoc_v2_can_bo', JSON.stringify(canBoList));
    } catch {}
  }, [canBoList]);

  // Modal states
  const [selectedVbDen, setSelectedVbDen] = useState<VanBanDen | null>(null);
  const [selectedCongViec, setSelectedCongViec] = useState<CongViec | null>(null);
  const [addModalType, setAddModalType] = useState<'vb-den' | 'vb-di' | 'cong-viec' | 'can-bo' | null>(null);
  const [isWebAndDriveOpen, setIsWebAndDriveOpen] = useState(false);
  const [initialLinkedVb, setInitialLinkedVb] = useState<VanBanDen | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add Handlers
  const handleAddVbDen = (vb: VanBanDen) => {
    setVbDenList(prev => [vb, ...prev]);
    showToast(`Đã tiếp nhận văn bản đến ${vb.soKyHieu} (${vb.id}) thành công!`);
  };

  const handleAddVbDi = (vb: VanBanDi) => {
    setVbDiList(prev => [vb, ...prev]);
    showToast(`Đã lưu văn bản đi ${vb.soKyHieu} (${vb.id}) thành công!`);
  };

  const handleAddCongViec = (cv: CongViec) => {
    setCongViecList(prev => [cv, ...prev]);
    showToast(`Đã giao công việc ${cv.id} cho ${cv.canBoChuTri} thành công!`);
  };

  const handleAddCanBo = (cb: CanBo) => {
    setCanBoList(prev => [...prev, cb]);
    showToast(`Đã thêm hồ sơ cán bộ - giáo viên ${cb.hoTen} thành công!`);
  };

  // Update Status Handlers
  const handleUpdateVbDenStatus = (id: string, newStatus: VanBanDen['trangThai'], ghiChu?: string) => {
    setVbDenList(prev => prev.map(v => {
      if (v.id === id) {
        return {
          ...v,
          trangThai: newStatus,
          ghiChu: ghiChu !== undefined ? ghiChu : v.ghiChu
        };
      }
      return v;
    }));
    showToast(`Đã cập nhật trạng thái văn bản ${id} thành "${newStatus}"!`);
  };

  const handleUpdateVbDiStatus = (id: string, newStatus: VanBanDi['trangThai']) => {
    setVbDiList(prev => prev.map(v => {
      if (v.id === id) {
        return { ...v, trangThai: newStatus };
      }
      return v;
    }));
    showToast(`Đã cập nhật văn bản đi ${id} thành "${newStatus}"!`);
  };

  const handleUpdateCongViecProgress = (id: string, phanTram: number, trangThai: CongViec['trangThai'], ghiChu?: string) => {
    setCongViecList(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          phanTramHoanThanh: phanTram,
          trangThai,
          ghiChu: ghiChu !== undefined ? ghiChu : c.ghiChu,
          canhBaoHan: phanTram === 100 ? 'Hoàn thành' : c.canhBaoHan
        };
      }
      return c;
    }));
    showToast(`Đã cập nhật tiến độ công việc ${id} đạt ${phanTram}%!`);
  };

  // Create Task from Incoming Doc
  const handleCreateTaskFromVb = (vb: VanBanDen) => {
    setInitialLinkedVb(vb);
    setAddModalType('cong-viec');
  };

  // Create Outgoing Doc from Incoming Doc
  const handleCreateOutgoingDocFromVb = (vb: VanBanDen) => {
    setInitialLinkedVb(vb);
    setAddModalType('vb-di');
  };

  // Quick search handler from sidebar
  const handleQuickSearch = (query: string) => {
    if (!query) return;
    const lower = query.toLowerCase();
    const matchVbd = vbDenList.find(v => v.id.toLowerCase().includes(lower) || v.soKyHieu.toLowerCase().includes(lower) || v.trichYeu.toLowerCase().includes(lower));
    if (matchVbd) {
      setSelectedVbDen(matchVbd);
      return;
    }
    const matchCv = congViecList.find(c => c.id.toLowerCase().includes(lower) || c.noiDung.toLowerCase().includes(lower));
    if (matchCv) {
      setSelectedCongViec(matchCv);
      return;
    }
  };

  // Reset to default school demo data
  const handleResetData = () => {
    if (confirm('Khôi phục toàn bộ dữ liệu mẫu trường học (Văn bản UBND xã, VH-XH, Xã đoàn, Kế hoạch nhà trường)?')) {
      localStorage.removeItem('qlvb_truonghoc_v2_vb_den');
      localStorage.removeItem('qlvb_truonghoc_v2_vb_di');
      localStorage.removeItem('qlvb_truonghoc_v2_cong_viec');
      localStorage.removeItem('qlvb_truonghoc_v2_can_bo');
      localStorage.removeItem('qlvb_truonghoc_vb_den');
      localStorage.removeItem('qlvb_truonghoc_vb_di');
      localStorage.removeItem('qlvb_truonghoc_cong_viec');
      localStorage.removeItem('qlvb_truonghoc_can_bo');
      setVbDenList(INITIAL_VAN_BAN_DEN);
      setVbDiList(INITIAL_VAN_BAN_DI);
      setCongViecList(INITIAL_CONG_VIEC);
      setCanBoList(INITIAL_CAN_BO);
      showToast('Đã khôi phục dữ liệu mẫu nhà trường thành công!');
    }
  };

  const getPageInfo = () => {
    switch (currentTab) {
      case 'dashboard':
        return { 
          title: 'Tổng quan nhà trường', 
          subtitle: 'Trung tâm điều hành văn bản UBND xã, Phòng Văn hóa - Xã hội xã, Xã đoàn và nhiệm vụ trường học' 
        };
      case 'vb-den':
        return { 
          title: 'Sổ Văn bản đến nhà trường', 
          subtitle: 'Tiếp nhận chỉ đạo UBND xã, Phòng Văn hóa - Xã hội xã, Xã đoàn, Trạm Y tế; BGH phân công tổ chuyên môn' 
        };
      case 'vb-di':
        return { 
          title: 'Sổ Văn bản đi nhà trường', 
          subtitle: 'Kế hoạch giáo dục, quyết định thành lập hội đồng, tờ trình gửi UBND xã, báo cáo ký số' 
        };
      case 'cong-viec':
        return { 
          title: 'Nhiệm vụ & Tiến độ chuyên môn', 
          subtitle: 'Theo dõi phân công BGH, nộp ma trận đề kiểm tra, hồ sơ học bạ số, hoạt động Đoàn - Đội' 
        };
      case 'can-bo':
        return { 
          title: 'Hồ sơ Cán bộ - Giáo viên - Nhân viên', 
          subtitle: 'Ban Giám hiệu, Tổ trưởng chuyên môn, Giáo viên bộ môn, Nhân viên và nhiệm vụ phụ trách' 
        };
      case 'nguoi-dung':
        return { 
          title: 'Người dùng & Phân quyền nhà trường', 
          subtitle: 'Quản lý tài khoản Ban Giám hiệu duyệt ký, Tổ trưởng bộ môn, Giáo viên giảng dạy, Văn thư' 
        };
      case 'danh-muc':
        return { 
          title: 'Tổ chuyên môn & Danh mục dùng chung', 
          subtitle: 'Cấu hình Tổ Toán-Tin, Tổ KHTN, Tổ Ngữ văn, Tổ KHXH, Tổ Văn phòng, Đoàn - Đội' 
        };
      case 'bao-cao':
        return { 
          title: 'Báo cáo & Thống kê giáo dục', 
          subtitle: 'Tổng hợp chỉ tiêu nhiệm vụ năm học, tiến độ văn bản Sở/Phòng và phân công tổ chuyên môn' 
        };
      default:
        return { title: 'QL Văn bản Trường học', subtitle: 'Hệ thống quản lý văn bản & điều hành nhiệm vụ nhà trường' };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <div className="flex h-screen bg-[#f1f5f9] text-slate-800 font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        vbDenCount={vbDenList.length}
        vbDiCount={vbDiList.length}
        congViecCount={congViecList.length}
        canBoCount={canBoList.length}
        onQuickSearch={handleQuickSearch}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <Header
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          onOpenAddVbDen={() => { setInitialLinkedVb(null); setAddModalType('vb-den'); }}
          onOpenAddVbDi={() => { setInitialLinkedVb(null); setAddModalType('vb-di'); }}
          onOpenAddCongViec={() => { setInitialLinkedVb(null); setAddModalType('cong-viec'); }}
          onOpenWebAndDriveModal={() => setIsWebAndDriveOpen(true)}
          onResetData={handleResetData}
        />

        {/* Views */}
        <main className="flex-1 pb-12">
          {currentTab === 'dashboard' && (
            <DashboardView
              vbDenList={vbDenList}
              vbDiList={vbDiList}
              congViecList={congViecList}
              canBoList={canBoList}
              onOpenVbDen={(vb) => setSelectedVbDen(vb)}
              onOpenCongViec={(cv) => setSelectedCongViec(cv)}
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onOpenAddVbDen={() => { setInitialLinkedVb(null); setAddModalType('vb-den'); }}
              onOpenAddVbDi={() => { setInitialLinkedVb(null); setAddModalType('vb-di'); }}
              onOpenAddCongViec={() => { setInitialLinkedVb(null); setAddModalType('cong-viec'); }}
            />
          )}

          {currentTab === 'vb-den' && (
            <VanBanDenView
              vbDenList={vbDenList}
              onOpenDetail={(vb) => setSelectedVbDen(vb)}
              onOpenAddModal={() => { setInitialLinkedVb(null); setAddModalType('vb-den'); }}
              onOpenWebAndDriveModal={() => setIsWebAndDriveOpen(true)}
              onCreateTask={handleCreateTaskFromVb}
            />
          )}

          {currentTab === 'vb-di' && (
            <VanBanDiView
              vbDiList={vbDiList}
              onOpenAddModal={() => { setInitialLinkedVb(null); setAddModalType('vb-di'); }}
              onUpdateStatus={handleUpdateVbDiStatus}
            />
          )}

          {currentTab === 'cong-viec' && (
            <CongViecView
              congViecList={congViecList}
              onOpenDetail={(cv) => setSelectedCongViec(cv)}
              onOpenAddModal={() => { setInitialLinkedVb(null); setAddModalType('cong-viec'); }}
            />
          )}

          {currentTab === 'can-bo' && (
            <CanBoView
              canBoList={canBoList}
              congViecList={congViecList}
              onOpenAddModal={() => setAddModalType('can-bo')}
            />
          )}

          {currentTab === 'nguoi-dung' && (
            <NguoiDungView canBoList={canBoList} />
          )}

          {currentTab === 'danh-muc' && (
            <DanhMucView />
          )}

          {currentTab === 'bao-cao' && (
            <BaoCaoView
              vbDenList={vbDenList}
              vbDiList={vbDiList}
              congViecList={congViecList}
              canBoList={canBoList}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <ChiTietVanBanDenModal
        vanBan={selectedVbDen}
        onClose={() => setSelectedVbDen(null)}
        onUpdateStatus={handleUpdateVbDenStatus}
        onCreateTask={handleCreateTaskFromVb}
        onCreateOutgoingDoc={handleCreateOutgoingDocFromVb}
        canBoList={canBoList}
      />

      <ChiTietCongViecModal
        congViec={selectedCongViec}
        onClose={() => setSelectedCongViec(null)}
        onUpdateProgress={handleUpdateCongViecProgress}
        canBoList={canBoList}
      />

      <ThemModal
        type={addModalType}
        onClose={() => { setAddModalType(null); setInitialLinkedVb(null); }}
        onAddVbDen={handleAddVbDen}
        onAddVbDi={handleAddVbDi}
        onAddCongViec={handleAddCongViec}
        onAddCanBo={handleAddCanBo}
        canBoList={canBoList}
        initialLinkedVb={initialLinkedVb}
      />

      {/* Web & Google Drive Import Modal */}
      <WebAndDriveImportModal
        isOpen={isWebAndDriveOpen}
        onClose={() => setIsWebAndDriveOpen(false)}
        onImportVbDen={handleAddVbDen}
        onCreateTask={handleCreateTaskFromVb}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom duration-200 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
