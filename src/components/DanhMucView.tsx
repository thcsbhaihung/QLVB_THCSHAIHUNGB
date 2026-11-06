import React, { useState } from 'react';
import { FolderKanban, Plus, CheckCircle2 } from 'lucide-react';
import { DANH_MUC_DON_VI, DANH_MUC_LOAI_VB, DANH_MUC_LINH_VUC } from '../data/mockData';

export const DanhMucView: React.FC = () => {
  const [donViList, setDonViList] = useState(DANH_MUC_DON_VI);
  const [loaiVbList, setLoaiVbList] = useState(DANH_MUC_LOAI_VB);
  const [linhVucList, setLinhVucList] = useState(DANH_MUC_LINH_VUC);

  const [newDonVi, setNewDonVi] = useState('');
  const [newLoaiVb, setNewLoaiVb] = useState('');
  const [newLinhVuc, setNewLinhVuc] = useState('');

  const addDonVi = () => {
    if (!newDonVi.trim()) return;
    setDonViList([...donViList, newDonVi.trim()]);
    setNewDonVi('');
  };

  const addLoaiVb = () => {
    if (!newLoaiVb.trim()) return;
    setLoaiVbList([...loaiVbList, newLoaiVb.trim()]);
    setNewLoaiVb('');
  };

  const addLinhVuc = () => {
    if (!newLinhVuc.trim()) return;
    setLinhVucList([...linhVucList, newLinhVuc.trim()]);
    setNewLinhVuc('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
          Tổ chuyên môn & Danh mục trường học
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Cấu hình Tổ Toán-Tin, KHTN, Ngữ văn, KHXH, Văn phòng - Kế toán, Đoàn - Đội, loại văn bản và lĩnh vực giáo dục.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Đơn vị */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Tổ chuyên môn & Bộ phận ({donViList.length})
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Thêm đơn vị mới..."
              value={newDonVi}
              onChange={(e) => setNewDonVi(e.target.value)}
              className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
            <button
              onClick={addDonVi}
              className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-semibold hover:bg-teal-700"
            >
              Thêm
            </button>
          </div>

          <div className="space-y-1.5 max-h-72 overflow-y-auto">
            {donViList.map((d, i) => (
              <div key={i} className="p-2 bg-slate-50 rounded-lg text-xs text-slate-800 font-medium flex items-center justify-between">
                <span>{d}</span>
                <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-1.5 py-0.5 rounded">Hoạt động</span>
              </div>
            ))}
          </div>
        </div>

        {/* Loại văn bản */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Loại văn bản ({loaiVbList.length})
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Thêm loại VB mới..."
              value={newLoaiVb}
              onChange={(e) => setNewLoaiVb(e.target.value)}
              className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
            <button
              onClick={addLoaiVb}
              className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-semibold hover:bg-teal-700"
            >
              Thêm
            </button>
          </div>

          <div className="space-y-1.5 max-h-72 overflow-y-auto">
            {loaiVbList.map((l, i) => (
              <div key={i} className="p-2 bg-slate-50 rounded-lg text-xs text-slate-800 font-medium flex items-center justify-between">
                <span>{l}</span>
                <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-1.5 py-0.5 rounded">Hoạt động</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lĩnh vực */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Lĩnh vực ({linhVucList.length})
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Thêm lĩnh vực mới..."
              value={newLinhVuc}
              onChange={(e) => setNewLinhVuc(e.target.value)}
              className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
            <button
              onClick={addLinhVuc}
              className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-semibold hover:bg-teal-700"
            >
              Thêm
            </button>
          </div>

          <div className="space-y-1.5 max-h-72 overflow-y-auto">
            {linhVucList.map((lv, i) => (
              <div key={i} className="p-2 bg-slate-50 rounded-lg text-xs text-slate-800 font-medium flex items-center justify-between">
                <span>{lv}</span>
                <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-1.5 py-0.5 rounded">Hoạt động</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
