import React from 'react';
import { 
  Scan, 
  Bell, 
  Globe, 
  Radio, 
  Sparkles
} from 'lucide-react';
import { AlertNotification } from '../types';

interface HeaderProps {
  alerts: AlertNotification[];
  onOpenAlertsTab: () => void;
  isScanning: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  alerts,
  onOpenAlertsTab,
  isScanning,
}) => {
  const unreadAlertsCount = alerts.filter(a => !a.read).length;

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & System Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 shadow-lg shadow-cyan-500/20 text-white">
              <Scan className="w-6 h-6 animate-pulse" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  Scan Info Network
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                  <Sparkles className="w-2.5 h-2.5 mr-1" /> AI 3.6 REAL-TIME
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Globe className="w-3 h-3 text-cyan-400" />
                Hệ thống Giám sát & Tìm kiếm Dư luận Internet Tự động
              </p>
            </div>
          </div>

          {/* System Controls & Notification */}
          <div className="flex items-center justify-end gap-3">
            
            {/* Live Crawler Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
              <Radio className={`w-3.5 h-3.5 ${isScanning ? 'text-amber-400 animate-spin' : 'text-emerald-400 animate-pulse'}`} />
              <span>{isScanning ? 'Đang truy quét tin tức...' : 'Mạng lưới Crawler: Tự động 24/7'}</span>
            </div>

            {/* Notification Bell with Badge */}
            <button
              onClick={onOpenAlertsTab}
              className="relative p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 transition-colors cursor-pointer"
              title="Cảnh báo thời gian thực"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md shadow-red-500/50">
                  {unreadAlertsCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
