import React, { useState } from 'react';
import { X, Layers, Plus, Sparkles } from 'lucide-react';
import { MonitoringCampaign } from '../types';

interface NewCampaignModalProps {
  onClose: () => void;
  onAddCampaign: (campaign: MonitoringCampaign) => void;
}

export const NewCampaignModal: React.FC<NewCampaignModalProps> = ({
  onClose,
  onAddCampaign,
}) => {
  const [name, setName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [excludedKeywords, setExcludedKeywords] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !keywords.trim()) return;

    const newCamp: MonitoringCampaign = {
      id: `camp-${Date.now()}`,
      name: name.trim(),
      keywords: keywords.split(',').map(s => s.trim()).filter(Boolean),
      excludedKeywords: excludedKeywords.split(',').map(s => s.trim()).filter(Boolean),
      description: description.trim() || 'Chủ đề theo dõi mới vừa tạo.',
      articleCount: 0,
      lastUpdated: 'Vừa tạo',
      active: true,
    };

    onAddCampaign(newCamp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-cyan-100 text-cyan-700 rounded-lg">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">
              Tạo Chủ Đề / Chiến Dịch Giám Sát Mới
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Tên chủ đề / Dự án cần theo dõi *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ví dụ: Quy hoạch Năng lượng Xanh Gia Lai"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Từ khóa bắt buộc tìm kiếm (phân cách bằng dấu phẩy) *
            </label>
            <input
              type="text"
              required
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="ví dụ: điện gió Gia Lai, năng lượng tái tạo, dự án Pleiku"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Từ khóa AI cần loại bỏ / Lọc nhiễu (phân cách bằng dấu phẩy)
            </label>
            <input
              type="text"
              value={excludedKeywords}
              onChange={(e) => setExcludedKeywords(e.target.value)}
              placeholder="ví dụ: rao bán quạt gió, thanh lý máy phát điện"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Mô tả ngắn gọn mục tiêu giám sát
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ghi chú thêm về mục đích theo dõi dư luận truyền thông..."
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-xs cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-cyan-600/20 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bắt đầu Quét Chủ Đề</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
