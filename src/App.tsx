/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Headphones, 
  ChevronRight, 
  ChevronLeft, 
  Smartphone, 
  History, 
  User, 
  CreditCard, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  HelpCircle, 
  Settings, 
  Info,
  Calendar,
  Wallet,
  Clock,
  ExternalLink,
  MessageCircleQuestion,
  ShieldCheck,
  FileBadge,
  LogOut,
  Edit2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Screen = 
  | 'onboarding' 
  | 'home' 
  | 'me' 
  | 'notifications' 
  | 'payment_input' 
  | 'payment_history' 
  | 'loan_summary' 
  | 'loan_details' 
  | 'reminder_info' 
  | 'my_orders' 
  | 'loan_records'
  | 'terms'
  | 'loading';

// --- Components ---

const LoadingScreen = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
        opacity: [0, 1, 1]
      }}
      transition={{ 
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100"
    >
      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </motion.div>
  </div>
);

const Header = ({ title, onBack, rightIcon }: { title: string; onBack?: () => void; rightIcon?: React.ReactNode }) => (
  <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-10 h-14">
    <div className="flex items-center gap-3">
      {onBack && (
        <button onClick={onBack} className="p-1 -ml-1 text-gray-600">
          <ChevronLeft size={24} />
        </button>
      )}
      <h1 className="text-lg font-bold text-slate-800">{title}</h1>
    </div>
    {rightIcon && <div className="text-slate-600">{rightIcon}</div>}
  </div>
);

const BottomNav = ({ active, onChange }: { active: 'home' | 'me'; onChange: (v: 'home' | 'me') => void }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-2 px-4 z-50">
    <button 
      onClick={() => onChange('home')}
      className={`flex flex-col items-center gap-1 transition-colors ${active === 'home' ? 'text-indigo-600' : 'text-gray-400'}`}
    >
      <Wallet size={24} variant={active === 'home' ? 'bold' : 'outline'} />
      <span className="text-xs font-medium">পরিশোধ</span>
    </button>
    <button 
      onClick={() => onChange('me')}
      className={`flex flex-col items-center gap-1 transition-colors ${active === 'me' ? 'text-indigo-600' : 'text-gray-400'}`}
    >
      <User size={24} />
      <span className="text-xs font-medium">আমি</span>
    </button>
  </div>
);

// --- Content Components ---

const OnboardingScreen = ({ onStart }: { onStart: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onStart();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onStart]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-6 text-center select-none">
      <div className="mb-12">
        <h1 className="text-[28px] font-bold text-indigo-900 leading-tight mb-2">মোবাইল ফোনের কিস্তি,</h1>
        <h2 className="text-[24px] font-bold text-indigo-800 mb-4 tracking-tight">সার্ভিস ফি কম</h2>
        <div className="flex items-center justify-center gap-2">
          <span className="text-6xl font-black text-indigo-900">0.8%</span>
          <span className="text-4xl font-black text-indigo-900">মাসিক</span>
        </div>
      </div>

      <div className="relative w-full aspect-square max-w-[340px] mb-20 animate-in fade-in zoom-in duration-700">
        <img 
          src="https://img.freepik.com/free-vector/cash-delivery-concept-illustration_114360-5473.jpg" 
          alt="Illustration" 
          className="w-full h-full object-contain" 
        />
      </div>

      <div className="fixed bottom-12 left-0 right-0 px-6">
        <p className="text-gray-400 text-sm mb-4">পামপে লিমিটেড দ্বারা চালিত</p>
      </div>
      
      <button 
        onClick={onStart}
        className="absolute inset-0 z-10 w-full h-full cursor-pointer opacity-0"
      >
        Start
      </button>
    </div>
  );
};

const HomeScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="pb-20">
      <div className="p-4 flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
            <Smartphone size={24} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">হাই, RAKIBUL HASAN TOHIN</h2>
            <p className="text-xs text-gray-500">সুবিধাজনক, অনলাইন পরিশোধ পরিষেবা</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setScreen('notifications')} className="text-slate-600">
            <Bell size={24} />
          </button>
          <button className="text-slate-600">
            <Headphones size={24} />
          </button>
        </div>
      </div>

      <div className="px-4">
        <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm overflow-hidden mb-4">
          <div className="flex items-center gap-2 p-3 bg-indigo-50 border-b border-indigo-100">
             <Smartphone size={16} className="text-indigo-600" />
             <span className="text-xs font-bold text-slate-800">মোবাইল ফোন কিস্তি</span>
          </div>
          
          <div className="p-4">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-indigo-600 font-bold">TECNO</span>
                  <span className="text-xs text-slate-500">| KM9,256+8GB</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                  <span>ডিভাইসটি সক্রিয় থাকবে যতক্ষণ না:</span>
                  <Lock size={10} className="text-indigo-500" />
                  <span className="text-indigo-600 font-medium">Jun/16/2026</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=100" alt="Device" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">বর্তমান বকেয়া</p>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black text-slate-900 leading-none">TK 3,671.00</span>
                  <button className="text-slate-400"><ChevronRight size={20} /></button>
                </div>
                <p className="text-[10px] text-orange-500 mt-1">আপনি যেকোন পরিমাণের অর্থ প্রদান করতে পারবেন</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">শেষ তারিখ</p>
                <span className="text-2xl font-black text-slate-900 leading-none">16 Jun</span>
              </div>
            </div>

            <button 
              onClick={() => setScreen('payment_input')}
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl mb-4 text-center border-b-4 border-indigo-800 active:transform active:translate-y-1 active:border-b-0 transition-all"
            >
              নির্ধারিত সময়ের আগে পরিশোধ করুন
            </button>
            
            <div className="border-t border-dashed border-gray-200 pt-4 flex items-center justify-between">
              <button onClick={() => setScreen('loan_details')} className="flex items-center gap-1">
                 <span className="text-sm font-bold text-slate-700">কিস্তি ওভারভিউ</span>
                 <p className="text-[10px] text-gray-500">মোট অপিরিশোধিত</p>
              </button>
              <button onClick={() => setScreen('loan_details')} className="flex items-center gap-1 text-slate-500">
                <span className="text-xs">৬ শর্তাবলী</span>
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="flex justify-end mt-1">
               <span className="text-xs font-bold text-slate-900">TK 5,627.00</span>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Smartphone size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">পরিশোধের নির্দেশিকা</h3>
                <p className="text-xs text-slate-500">পরিশোধের নির্দেশিকা পড়তে ক্লিক করুন</p>
              </div>
            </div>
            <button className="bg-indigo-600 text-white text-[10px] px-3 py-1 rounded-full font-bold">দৃশ্য</button>
          </div>

          <div 
            onClick={() => setScreen('reminder_info')}
            className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Bell size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">পরিশোধের রিমাইন্ডার অন করুন</h3>
                <p className="text-[10px] text-slate-500 leading-tight">আপনাকে পরিশোধ করার কথা মনে কমিয়ে দেওয়ার জন্য সিস্টেম ক্যালেন্ডার রিমাইন্ডার চালু করুন</p>
              </div>
            </div>
            <button className="bg-indigo-600 text-white text-[10px] px-3 py-1 rounded-full font-bold">দৃশ্য</button>
          </div>

          <div className="flex items-center justify-around bg-white p-4 rounded-2xl border border-gray-100 mt-4">
             <div className="flex flex-col items-center gap-1">
                <Lock size={20} className="text-slate-700" />
                <span className="text-[10px] font-medium text-slate-800">ফোন লক</span>
             </div>
             <div className="flex flex-col items-center gap-1">
                <HelpCircle size={20} className="text-slate-700" />
                <span className="text-[10px] font-medium text-slate-800">সাধারণ জিজ্ঞাসা</span>
             </div>
             <div className="flex flex-col items-center gap-1">
                <Settings size={20} className="text-slate-700" />
                <span className="text-[10px] font-medium text-slate-800">কিভাবে আনলক করবেন</span>
             </div>
          </div>

          {/* Quick Survey Banner */}
          <div className="bg-indigo-50 rounded-2xl p-4 overflow-hidden relative">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-indigo-800 font-black text-lg">Quick Survey</h3>
                <p className="text-indigo-600 text-xs font-bold mb-2">Quick Questions To Help Us Improve</p>
                <button className="bg-yellow-400 text-slate-900 text-xs px-6 py-1 rounded-full font-black shadow-sm">Start</button>
              </div>
              <div className="w-16 h-16 opacity-80">
                 <FileBadge className="w-full h-full text-indigo-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationsScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const notifications = [
    { id: 0, title: 'পামপে পরিশোধ সফল', desc: 'আপনি এবার TK 15000 সফলভাবে পরিশোধ করেছেন।', date: 'May 10, 2026, 16:44', statusText: 'প্রদর্শন' },
    { id: 1, title: 'পামপে পরিশোধ সফল', desc: 'আপনি এবার TK3671 সফলভাবে পরিশোধ করেছেন।', date: 'Apr 16, 2026, 21:51', statusText: 'প্রদর্শন' },
    { id: 2, title: 'পামপে আজ (বকেয়া) পরিশোধনীয়', desc: 'আপনার TK3671.0 এর মোবাইল ফোনের কিস্তি আজ বকেয়া। পেমেন্ট করতে ক্লিক করুন।', date: 'Apr 16, 2026, 14:40', statusText: 'দেখুন' },
    { id: 3, title: 'PalmPay ঋণ পরিশোধ অনুস্মারক', desc: 'আপনার মোবাইল ফোনের কিস্তি TK3671.0 বকেয়া আসছে, অতিরিক্ত খরচ বা ঝামেলা এড়াতে অনুগ্রহ করে 16 April আগে পরিশোধ করুন। শোধ করতে ক্লিক করুন।', date: 'Apr 15, 2026, 14:37', statusText: 'প্রদর্শন' },
    { id: 4, title: 'পামপে পরিশোধ সফল', desc: 'আপনি এবার TK3671 সফলভাবে পরিশোধ করেছেন।', date: 'Mar 13, 2026, 11:17', statusText: 'প্রদর্শন' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="বিজ্ঞপ্তি" onBack={() => setScreen('home')} />
      <div className="p-4 space-y-4">
        {notifications.map(n => (
          <div key={n.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <ShieldCheck size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-sm">{n.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{n.desc}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[10px] text-gray-400">{n.date}</span>
                  <button className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                    <span>{n.statusText}</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <p className="text-center text-gray-300 text-xs py-10">--- শেষ ---</p>
      </div>
    </div>
  );
};

const PaymentInputScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [amount, setAmount] = useState('3671.00');
  const [showPicker, setShowPicker] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'bkash' | 'nagad'>('bkash');

  const handleConfirm = () => {
    setShowPicker(false);
    setScreen('payment_history');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        title="ঋণ পরিশোধ" 
        onBack={() => setScreen('home')} 
        rightIcon={<button onClick={() => setScreen('payment_history')} className="text-xs font-bold">লেনদেন</button>} 
      />
      
      <div className="p-4">
        <p className="text-sm text-slate-500 mb-2">পরিশোধের পরিমাণ</p>
        <div className="flex items-center justify-between border-b border-indigo-100 pb-2 mb-6">
          <div className="flex items-baseline gap-2">
             <span className="text-xl font-black text-slate-900">TK</span>
             <span className="text-4xl font-black text-slate-900">{amount}</span>
          </div>
          <button className="text-slate-400 p-2">
            <Edit2 size={24} />
          </button>
        </div>

        <div className="flex gap-2 mb-10">
          <button className="flex-1 bg-white border border-indigo-100 py-2 rounded-full text-xs font-bold text-slate-600">কারেন্ট TK3,671.00</button>
          <button className="flex-1 bg-gray-50 border border-gray-100 py-2 rounded-full text-xs font-bold text-slate-600">মোট TK5,627.00</button>
        </div>

        <button 
          onClick={() => setShowPicker(true)}
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl mb-4 shadow-lg shadow-indigo-100"
        >
          এখন পরিশোধ করুন
        </button>

        <button className="w-full bg-indigo-50 text-indigo-700 font-bold py-4 rounded-2xl">
          পরিশোধের সহায়তার জন্য শেয়ার করুন
        </button>
      </div>

      {/* Payment Method Bottom Sheet */}
      <AnimatePresence>
        {showPicker && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPicker(false)}
              className="fixed inset-0 bg-black/40 z-[60]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-[70] p-6 pb-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="w-8" />
                <h3 className="text-slate-800 font-bold">ঋণ পরিশোধ</h3>
                <button onClick={() => setShowPicker(false)} className="p-2 -mr-2 text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <div className="text-center mb-8">
                 <h2 className="text-4xl font-black text-indigo-600">TK {amount}</h2>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center mb-8">
                 <span className="text-sm text-slate-600">বিলের পরিমাণ</span>
                 <span className="text-sm font-bold text-slate-900">TK {amount}</span>
              </div>

              <div className="mb-6">
                 <p className="text-sm font-bold text-slate-800 mb-4">পেমেন্ট পদ্ধতি</p>
                 <div className="space-y-4">
                    <button 
                      onClick={() => setSelectedMethod('bkash')}
                      className={`w-full flex items-center justify-between p-4 bg-white border rounded-2xl active:bg-gray-50 transition-all ${selectedMethod === 'bkash' ? 'border-indigo-100 ring-1 ring-indigo-100' : 'border-gray-100'}`}
                    >
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center shadow-sm">
                            <span className="text-white font-black text-lg">b</span>
                         </div>
                         <span className="font-bold text-slate-800">Bkash</span>
                      </div>
                      {selectedMethod === 'bkash' && (
                        <div className="w-6 h-6 bg-indigo-50 rounded-full flex items-center justify-center">
                          <CheckCircle2 size={16} className="text-indigo-600" />
                        </div>
                      )}
                    </button>
                    
                    <button 
                      onClick={() => setSelectedMethod('nagad')}
                      className={`w-full flex items-center justify-between p-4 bg-white border rounded-2xl active:bg-gray-50 transition-all ${selectedMethod === 'nagad' ? 'border-indigo-100 ring-1 ring-indigo-100' : 'border-gray-100'}`}
                    >
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-sm">
                            <span className="text-white font-black text-lg">n</span>
                         </div>
                         <span className="font-bold text-slate-800">Nagad</span>
                      </div>
                      {selectedMethod === 'nagad' && (
                        <div className="w-6 h-6 bg-indigo-50 rounded-full flex items-center justify-center">
                          <CheckCircle2 size={16} className="text-indigo-600" />
                        </div>
                      )}
                    </button>
                 </div>
              </div>

              <button className="w-full py-4 flex items-center justify-between text-slate-700 hover:bg-gray-50 rounded-xl px-2 transition-colors mb-6">
                 <span className="text-xs font-bold">বিকাশ/নগদ নেই? যেকোনো ব্যাংক থেকে ট্রান্সফার করুন</span>
                 <ChevronRight size={18} className="text-gray-300" />
              </button>

              <button 
                onClick={handleConfirm}
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 active:scale-[0.98] transition-transform"
              >
                নিশ্চিত করুন
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const PaymentHistoryScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const history = [
    { id: 1, amount: '15,000.00', date: 'May 10, 2026, 04:44 PM', status: 'success', label: 'সফল' },
    { id: 5, amount: '3,671.00', date: 'Apr 16, 2026, 09:51 PM', status: 'success', label: 'সফল' },
    { id: 6, amount: '3,671.00', date: 'Apr 16, 2026, 09:49 PM', status: 'fail', label: 'ব্যর্থ হয়েছে' },
    { id: 7, amount: '3,671.00', date: 'Mar 13, 2026, 11:16 AM', status: 'success', label: 'সফল' },
    { id: 8, amount: '3,709.00', date: 'Feb 04, 2026, 09:21 PM', status: 'success', label: 'সফল' },
    { id: 9, amount: '31,678.00', date: 'Jan 16, 2026, 01:45 PM', status: 'fail', label: 'ব্যর্থ হয়েছে' },
    { id: 10, amount: '1,400.00', date: 'Jan 16, 2026, 01:39 PM', status: 'success', label: 'সফল' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header title="পরিশোধ লেনদেন" onBack={() => setScreen('payment_input')} />
      <div className="p-4 space-y-6">
        {history.map(item => (
          <div key={item.id} className="flex justify-between items-start">
            <div>
              <h3 className="font-black text-slate-800 text-lg leading-tight">TK {item.amount}</h3>
              <p className="text-xs text-gray-400">{item.date}</p>
            </div>
            <span className={`text-sm font-medium ${item.status === 'success' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const LoanSummaryScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [activeTab, setActiveTab] = useState<'plan' | 'history'>('plan');
  
  const schedule = [
    { id: 1, title: '1st মেয়াদ', date: 'Feb 16', amount: '3,709.00', status: 'paid', statusLabel: 'পরিশোধ করা' },
    { id: 2, title: '2nd মেয়াদ', date: 'Mar 16', amount: '3,671.00', status: 'paid', statusLabel: 'পরিশোধ করা' },
    { id: 3, title: '3rd মেয়াদ', date: 'Apr 16', amount: '3,671.00', status: 'paid', statusLabel: 'পরিশোধ করা' },
    { id: 4, title: '4th মেয়াদ', date: 'May 16', amount: '15,000.00', status: 'paid', statusLabel: 'পরিশোধ করা' },
    { id: 5, title: '5th মেয়াদ', date: 'Jun 16', amount: '3,671.00', status: 'unpaid', statusLabel: 'অপিরিশোধিত', principal: '3,111.00', fee: '560.00' },
    { id: 6, title: '6th মেয়াদ', date: 'Jul 16', amount: '1,956.00', status: 'unpaid', statusLabel: 'অপিরিশোধিত', principal: '1,396.00', fee: '560.00' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white p-4 pb-0">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setScreen('home')} className="p-1 -ml-1 text-gray-600">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">লোনের সংক্ষিপ্ত বিবরণ</h1>
            <p className="text-[10px] text-gray-400">TECNO POVA slim 5G Jan, 16, 2026</p>
          </div>
          <button onClick={() => setScreen('loan_details')} className="ml-auto text-xs font-bold text-slate-700">ঋণের বিবরণ</button>
        </div>

        <div className="mb-6 mt-8">
           <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">অপিরিশোধিত</span>
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">৬ শর্তাবলী বাম</span>
           </div>
           <h2 className="text-4xl font-black text-slate-900 border-b border-gray-100 pb-4 mb-4">TK 5,627.00</h2>
           <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
              <span>অপিরিশোধিত মূল অর্থ</span>
              <span className="font-bold text-slate-800">TK 4,507.00</span>
           </div>
           <div className="flex justify-between items-center text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <span>অপিরিশোধিত পরিষেবা ফি</span>
                <Info size={12} />
              </div>
              <span className="font-bold text-slate-800">TK 1,120.00</span>
           </div>
        </div>

        <div className="flex border-b border-gray-100 mb-2">
          <button 
            onClick={() => setActiveTab('plan')}
            className={`flex-1 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === 'plan' ? 'text-indigo-600 border-indigo-600' : 'text-gray-400 border-transparent'}`}
          >
            পরিশোধের পরিকল্পনা
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === 'history' ? 'text-indigo-600 border-indigo-600' : 'text-gray-400 border-transparent'}`}
          >
            পরিশোধের ইতিহাস
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {activeTab === 'plan' ? (
          <div className="space-y-4">
            <p className="text-[10px] text-gray-400">মোট ৯ পরিশোধের শর্তাবলী, অনুগ্রহ করে সময়মতো পরিশোধ করুন।</p>
            {schedule.map((item, idx) => (
              <div key={item.id} className="flex gap-4 relative">
                {idx !== schedule.length - 1 && (
                  <div className="absolute left-[5px] top-6 bottom-0 w-[1px] border-l border-dashed border-gray-300"></div>
                )}
                <div className={`w-[11px] h-[11px] rounded-full mt-1.5 z-10 ${item.status === 'paid' ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 leading-none mb-1">{item.title}</h4>
                      <p className="text-[10px] text-gray-400">বাকি আছে {item.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${item.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                          {item.statusLabel}
                        </span>
                        <span className="font-black text-slate-900">TK {item.amount}</span>
                      </div>
                      {item.status === 'unpaid' && (
                        <div className="mt-1 flex flex-col items-end">
                           <p className="text-[10px] text-gray-400">মূল অর্থ TK {item.principal}</p>
                           <p className="text-[10px] text-gray-400">পরিসেবা ফি TK {item.fee}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100">
               <div>
                  <h4 className="font-black text-slate-900">TK 15,000.00</h4>
                  <p className="text-[10px] text-gray-400">Jun 10, 2026, 4:44 PM</p>
               </div>
               <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                 <span>বিকাশ দ্বারা পরিশোধ</span>
                 <ChevronRight size={12} />
               </div>
            </div>
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100">
               <div>
                  <h4 className="font-black text-slate-900">TK 3,671.00</h4>
                  <p className="text-[10px] text-gray-400">Apr 16, 2026, 9:51 PM</p>
               </div>
               <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                 <span>বিকাশ দ্বারা পরিশোধ</span>
                 <ChevronRight size={12} />
               </div>
            </div>
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100">
               <div>
                  <h4 className="font-black text-slate-900">TK 3,671.00</h4>
                  <p className="text-[10px] text-gray-400">Mar 13, 2026, 11:17 AM</p>
               </div>
               <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                 <span>বিকাশ দ্বারা পরিশোধ</span>
                 <ChevronRight size={12} />
               </div>
            </div>
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100">
               <div>
                  <h4 className="font-black text-slate-900">TK 3,709.00</h4>
                  <p className="text-[10px] text-gray-400">Feb 4, 2026, 9:23 PM</p>
               </div>
               <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                 <span>বিকাশ দ্বারা পরিশোধ</span>
                 <ChevronRight size={12} />
               </div>
            </div>
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100">
               <div>
                  <h4 className="font-black text-slate-900">TK 1,400.00</h4>
                  <p className="text-[10px] text-gray-400">Jan 16, 2026, 1:39 PM</p>
               </div>
               <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                 <span>Guarantee</span>
                 <ChevronRight size={12} />
               </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl">আরো শোধ</button>
      </div>
    </div>
  );
}

const LoanDetailsScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="ঋণের বিবরণ" onBack={() => setScreen('loan_summary')} />
      <div className="p-4 space-y-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-black text-slate-800 text-lg mb-4">ঋণের বিবরণ</h3>
          <div className="space-y-3">
             <div className="flex justify-between text-sm text-gray-500">
                <span>ঋণের পরিমাণ</span>
                <span className="font-bold text-slate-900">TK 28,000.00</span>
             </div>
             <div className="flex justify-between text-sm text-gray-500 border-b border-gray-50 pb-2">
                <div className="flex items-center gap-1">পরিসেবা ফি <Info size={12} /></div>
                <span className="font-bold text-slate-900">TK 5,078.00</span>
             </div>
             <div className="flex justify-between text-lg font-black text-slate-900 mt-2">
                <span>মোট</span>
                <span>TK 33,078.00</span>
             </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-black text-slate-800 text-lg mb-4">অন-সাইট পেমেন্ট বিস্তারিত</h3>
          <div className="space-y-3">
             <div className="flex justify-between text-sm text-gray-500">
                <span>ডাউন পেমেন্ট</span>
                <span className="font-bold text-slate-900">TK 4,999.00</span>
             </div>
             <div className="flex justify-between text-sm text-gray-500">
                <span>ডিজিটাল ডাটা প্রসেসিং</span>
                <span className="font-bold text-slate-900">TK 305.00</span>
             </div>
             <div className="flex justify-between text-sm text-gray-500 border-b border-gray-50 pb-2">
                <span>গ্যারান্টি ডিপোজিট</span>
                <span className="font-bold text-slate-900">TK 1,400.00</span>
             </div>
             <div className="flex justify-between text-lg font-black text-slate-900 mt-2">
                <span>মোট</span>
                <span>TK 6,704.00</span>
             </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-black text-slate-800 text-lg mb-4">মৌলিক তথ্য</h3>
          <div className="space-y-3">
             <div className="flex justify-between text-sm text-gray-500 gap-4">
                <span>মোবাইল মডেল</span>
                <span className="font-bold text-slate-900 text-right">TECNO, POVA slim 5G KM9, Sky Blue, 8</span>
             </div>
             <div className="flex justify-between text-sm text-gray-500">
                <span>মোবাইলের দাম</span>
                <span className="font-bold text-slate-900">TK 32,999.00</span>
             </div>
             <div className="flex justify-between text-sm text-gray-500">
                <span>শুরু এবং শেষ সময়</span>
                <span className="font-bold text-slate-900">Jan 16, 2026 - Oct 16, 2026</span>
             </div>
             <div className="flex justify-between text-sm text-gray-500">
                <span>Lলোনের দিন</span>
                <span className="font-bold text-slate-900">274 দিন</span>
             </div>
             <div className="flex justify-between text-sm text-gray-500">
                <span>পরিসেবা ফি হার</span>
                <span className="font-bold text-slate-900">2.001%/মাস</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProfileScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="min-h-screen bg-indigo-50/30">
      <div className="p-4 flex items-center justify-between mb-4">
        <h1 className="text-2xl font-black text-slate-800">আমি</h1>
        <div className="flex items-center gap-4 text-slate-600">
          <Settings size={22} />
          <Headphones size={22} />
        </div>
      </div>

      <div className="px-4">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center mb-6">
          <div className="flex-1 flex flex-col items-center border-r border-gray-100">
             <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600 mb-2">
                <Smartphone size={20} />
             </div>
             <button onClick={() => setScreen('loan_records')} className="text-xs font-bold text-slate-800 text-center leading-tight">ঋণ <br/> রেকর্ড</button>
          </div>
          <div className="flex-1 flex flex-col items-center">
             <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-2">
                <History size={20} />
             </div>
             <button onClick={() => setScreen('payment_history')} className="text-xs font-bold text-slate-800 text-center leading-tight">পরিশোধের <br/> রেকর্ড</button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden mb-6">
           <button 
            onClick={() => setScreen('my_orders')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-50"
          >
             <div className="flex items-center gap-3 text-slate-800">
                <FileText size={20} className="text-indigo-600" />
                <span className="text-sm font-bold">আমার আদেশ</span>
             </div>
             <ChevronRight size={18} className="text-gray-300" />
           </button>
           <button 
            onClick={() => setScreen('payment_history')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
             <div className="flex items-center gap-3 text-slate-800">
                <Clock size={20} className="text-indigo-600" />
                <span className="text-sm font-bold">লেনদেনের বিবরণী</span>
             </div>
             <ChevronRight size={18} className="text-gray-300" />
           </button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden mb-6">
           <button 
            onClick={() => setScreen('reminder_info')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
           >
             <div className="flex items-center gap-3 text-slate-800">
                <Bell size={20} className="text-indigo-600" />
                <span className="text-sm font-bold">কার্যকরী পরিশোধের অনুস্মারক</span>
             </div>
             <ChevronRight size={18} className="text-gray-300" />
           </button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden mb-6">
           <button 
             onClick={() => setScreen('terms')}
             className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-50"
           >
             <div className="flex items-center gap-3 text-slate-800">
                <ShieldCheck size={20} className="text-indigo-600" />
                <span className="text-sm font-bold">শর্তাবলী&gt;</span>
             </div>
             <ChevronRight size={18} className="text-gray-300" />
           </button>
           <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
             <div className="flex items-center gap-3 text-slate-800">
                <Smartphone size={20} className="text-indigo-600" />
                <span className="text-sm font-bold">গোপনীয়তা নীতি</span>
             </div>
             <ChevronRight size={18} className="text-gray-300" />
           </button>
        </div>

        <p className="text-center text-gray-300 text-[10px] mb-10">পামপে লিমিটেড দ্বারা চালিত</p>
      </div>
    </div>
  );
}

const MyOrdersScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="আমার অর্ডার" onBack={() => setScreen('me')} />
      <div className="p-4">
        <div className="flex border-b border-gray-200 mb-6">
          <button className="flex-1 py-3 text-xs font-bold text-indigo-600 border-b-2 border-indigo-600">একনজরে সকল</button>
          <button className="flex-1 py-3 text-xs font-bold text-gray-400">প্রক্রিয়াধীন</button>
          <button className="flex-1 py-3 text-xs font-bold text-gray-400">বিতরণকৃত</button>
          <button className="flex-1 py-3 text-xs font-bold text-gray-400">বন্ধ</button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center p-2">
             <img src="https://ais.studio/favicon.ico" alt="Logo" className="w-full grayscale opacity-20" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-slate-800 text-sm">TECNO POVA slim 5G</h4>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">কিস্তি চলমান</span>
            </div>
            <p className="text-[10px] text-gray-400">ক্রয়ের ধরণ: নির্ধারিত দোকানে</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const ReminderInfoScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header title="কার্যকরী পরিশোধের অনুস্মারক" onBack={() => setScreen('home')} />
      <div className="p-4">
        <h4 className="text-sm font-bold text-slate-800 mb-4">পরিশোধের তারিখ</h4>
        
        <div className="bg-indigo-50/40 rounded-2xl p-6 flex flex-col items-center mb-8 relative border border-indigo-50 shadow-inner">
           <div className="w-24 h-24 bg-white rounded-2xl shadow-sm border border-indigo-100 flex flex-col overflow-hidden mb-6">
              <div className="h-6 bg-indigo-500 w-full"></div>
              <div className="flex-1 flex flex-col items-center justify-center">
                 <span className="text-3xl font-black text-slate-800">16th</span>
              </div>
           </div>
           <p className="text-[10px] text-gray-400 text-center leading-relaxed max-w-[280px]">
             আপনি এই তারিখের আগে পরিশোধ করলে, পরিশোধের অনুস্মারক পরিসেবা ট্রিগার করা হবে না
           </p>
        </div>

        <h3 className="font-bold text-slate-800 text-lg mb-4">কিভাবে পরিশোধ অনুস্মারক কাজ করে</h3>
        
        <div className="bg-gray-50/50 rounded-2xl p-6 space-y-6">
          <p className="text-[10px] text-gray-500 leading-relaxed">
            আপনি যদি সময়মতো শোধ না করেন, তাহলে আপনার কিস্তির মোবাইল ফোনে নিম্নলিখিত প্রভাবগুলি ঘটবে। ওভারভিউ পিরিয়ড যত বেশি হবে, প্রভাব তত বেশি হবে।
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-700">
               <MessageCircleQuestion size={18} className="text-gray-400" />
               <span className="text-xs font-medium">APP পপ-আপ উইন্ডো</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
               <ShieldCheck size={18} className="text-gray-400" />
               <span className="text-xs font-medium">মোবাইল ফোনের স্ক্রিন ওয়াটারমার্ক</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
               <Lock size={18} className="text-gray-400" />
               <span className="text-xs font-medium">মোবাইল অ্যাপ ব্যবহারের সীমাবদ্ধতা</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
               <Headphones size={18} className="text-gray-400" />
               <span className="text-xs font-medium">কল করতে অক্ষম</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const LoanRecordsScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="ঋণ রেকর্ড" onBack={() => setScreen('me')} />
      <div className="p-4">
        <div 
          onClick={() => setScreen('loan_summary')}
          className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer"
        >
          <div>
            <h4 className="font-bold text-slate-800">TECNO POVA slim 5G</h4>
            <p className="text-[10px] text-gray-400">Jan, 16, 2026, 01:39</p>
          </div>
          <div className="flex items-center gap-1">
             <span className="text-xs font-black text-orange-500">TK 5,627.00 অপিরিশোধিত</span>
             <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

const TermsAndConditionsScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header title="Terms And Conditions" onBack={() => setScreen('me')} />
      <div className="p-6 text-slate-800 space-y-6 overflow-y-auto">
        <h2 className="font-bold text-lg">PalmPay User Terms and Conditions</h2>
        
        <p className="text-sm leading-relaxed text-gray-600">
          PalmPay Limited is a company incorporated in Bangladesh under the Companies Act 1994 (<b>"PalmPay"</b>) and is a Buy Now, Pay Later (BNPL) facility provider licensed by the Bangladesh Bank. PalmPay will provide BNPL facility through its proprietary PalmPay ecosystem, enabling eligible BNPL users to purchase smartphones and other products/services from approved retail merchants on installment.
        </p>

        <p className="text-sm leading-relaxed text-gray-600">
          This PalmPay User Terms and Conditions (<b>"Terms"</b>) as amended from time to time, represent an agreement between you (<b>"You"/"Your"</b>, or collectively with other users, <b>"User(s)"</b>) and PalmPay; and governs Your use and access to the feature within the PalmPay App.
        </p>

        <p className="text-sm leading-relaxed text-gray-600 font-medium">
          PLEASE READ THESE TERMS CAREFULLY TO ENSURE THAT YOU UNDERSTAND EACH PROVISION. IF THE TERMS ARE ACCEPTABLE TO YOU, KINDLY AGREE TO THESE TERMS IN A MANNER PROVIDED IN THE PALMPAY APP. YOU THEREFORE (1) AGREE WITH AND ACCEPT ALL THE PROVISIONS SET OUT IN THESE TERMS; AND (2) CONFIRM THAT THE PROVISIONS OF THESE TERMS, SHALL BE BINDING ON, AND ENFORCEABLE AGAINST, YOU FROM THE DATE OF ACCEPTANCE.
        </p>

        <div className="space-y-4">
          <h3 className="font-bold border-b border-gray-100 pb-2 uppercase tracking-wide text-xs text-slate-400">DEFINITIONS</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li><b>"Fees"</b> include the fees and charges imposed by PalmPay for availing the BNPL facility. The percentage or amount of Fees and detailed breakdown with description of the Fees that are applicable to You will be displayed in the PalmPay App. You agree to the Fees and subsequent amendments made from time to time on the Fees mentioned in the PalmPay App.</li>
            <li><b>"PalmPay App"</b> is the PalmPay application that can be downloaded by You through Your smartphone that will serve as the platform for Your access and use of the BNPL facility.</li>
            <li><b>"Payment Method"</b> means a third-party online method for making payment. Such Payment Method will be displayed to You on the PalmPay App for making repayment of the BNPL facility.</li>
            <li><b>"Merchant"</b> means retail shop.</li>
            <li><b>"Partner"</b> means the entity or entities that will provide products/services to You.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold border-b border-gray-100 pb-2 uppercase tracking-wide text-xs text-slate-400">BUY NOW, PAY LATER (BNPL) FACILITY</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>The BNPL facility is the process of paying back the smartphone and other products/services price along with the applicable Fees through the PalmPay App. The repayment of the BNPL facility will be made through the PalmPay App in a scheduled manner as agreed by the User and PalmPay.</li>
            <li>All the details of Your BNPL facility and repayment will be displayed on the PalmPay App for Your ease of repayment. On the date of each repayment, You will initiate the repayment request through the PalmPay App, using the preferred Payment Method. The repayment amount will include relevant Fees.</li>
            <li>The BNPL facility is solely offered by PalmPay and PalmPay will also provide the technology service & the platform for repayment.</li>
            <li>The mode for repayment of the BNPL facility including the number of installments, the outstanding balance, Fees and all relevant details necessary for You to make the repayment on time is provided in the PalmPay App.</li>
            <li>The Fees are subject to change and will be duly published on the PalmPay app.</li>
            <li>If You miss the date of repayment of Your BNPL facility, You have to pay an unlocking fee to unlock Your smartphone and continue with the BNPL facility.</li>
            <li>The smartphone shall not become Your property until full repayment of the BNPL facility. In case you fail to pay the unlocking fee mentioned above, the smartphone can be taken from You. Any amount that is already paid by You will be considered as fees/charges for the usage period and will not be refunded to You.</li>
            <li>PalmPay is not liable for the smartphone that is provided by the Merchant and other applicable products/services that are provided by the Partners.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold border-b border-gray-100 pb-2 uppercase tracking-wide text-xs text-slate-400">USE OF THE PALMPAY APP</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>You shall not use the PalmPay App or the BNPL facility in any unlawful manner, for any unlawful purpose, or in any manner inconsistent with these Terms, or act fraudulently or maliciously. This includes but not limited to hacking into or inserting malicious programs, including viruses, or harmful data, into the PalmPay App, or any operating system.</li>
            <li>PalmPay shall not be responsible if anyone using Your PalmPay App and other information fraudulently enters the PalmPay App and commits any fraudulent activity through the PalmPay App.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold border-b border-gray-100 pb-2 uppercase tracking-wide text-xs text-slate-400">HOW WE TREAT YOUR USER INFORMATION</h3>
          <p className="text-sm text-gray-600">
            PalmPay respects and are committed to protecting Your privacy. You understand that by accessing or using PalmPay App, You consent to the collection, use and disclosure of your information for the purpose of the BNPL facility only as set out in the <b>Privacy Policy</b>.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold border-b border-gray-100 pb-2 uppercase tracking-wide text-xs text-slate-400">OWNERSHIP OF INTELLECTUAL PROPERTY RIGHTS TO THE CONTENT</h3>
          <p className="text-sm text-gray-600">
            You acknowledge and agree that the content, including, without limitation, text, software, music, sound, photographs, video, graphics, images, logos, button icons, editorial content, notices, design, compilation, magnetic translation, digital conversion, software (including, without limitation, HTML-based computer programs), other materials and information presented to You through the PalmPay App or other matters related to the BNPL facility (collectively <b>"Content"</b>), are protected under applicable copyrights, trademarks and other proprietary (including but not limited to intellectual property) rights. You are only permitted to use this Content as expressly authorized by PalmPay. You do not acquire ownership rights to any Content viewed through the PalmPay App or website or any express or implied license to our intellectual property or the intellectual property of our licensors. Use of the Content other than as expressly permitted by these Terms are strictly prohibited. The posting of information or materials on the PalmPay App or website does not constitute a waiver of any right in such information and materials.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold border-b border-gray-100 pb-2 uppercase tracking-wide text-xs text-slate-400">THIRD PARTY LINKS AND RESOURCES</h3>
          <p className="text-sm text-gray-600">
            Where the PalmPay App contains links to other sites and resources provided by third parties, these links are provided for Your information only. PalmPay has no control over the contents of those websites or resources and accept no responsibility for them or for any loss or damage that may arise from Your use of them.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold border-b border-gray-100 pb-2 uppercase tracking-wide text-xs text-slate-400">CONSENT</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>You acknowledge that PalmPay can process Your personal data, including but not limited to name, mobile number, parent's name, date of birth, National Identification number and address.</li>
            <li>You hereby give explicit consent that PalmPay may use and process Your personal data for the purpose of the BNPL facility only.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold border-b border-gray-100 pb-2 uppercase tracking-wide text-xs text-slate-400">INDEMNITIES THAT APPLY</h3>
          <p className="text-sm text-gray-600 italic">
            In addition to any other indemnity clause provided in these Terms, You agree to indemnify, hold harmless and reimburse PalmPay, its affiliates, its agents, licensors, suppliers, contractors and third-party service providers, and their respective employees, members, officers and directors, (Collectively <b>"Indemnified Parties"</b>) from and against any and all claims, losses, suits, damages (actual and consequential), obligations, penalties, any losses arising out of the loss or theft of Your information and personal data on the PalmPay App or Your smartphone or from unauthorized or fraudulent transactions associated with your PalmPay account, fines, liabilities, settlements, costs or debt, and expenses (including, without limitation, court costs and reasonable attorneys' fees) (<b>"Losses"</b>) arising from or in any way connected to any third-party claims relating to Your use of the BNPL facility, violation of these Terms, applicable law or any third-party rights, or Your fraud or wilful misconduct. This defense and indemnification obligation will survive any termination of these Terms and Your use of the BNPL facility.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold border-b border-gray-100 pb-2 uppercase tracking-wide text-xs text-slate-400">BREACH</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>In case of Your breach of any of these Terms, You irrevocably grant PalmPay consent (or any third party that PalmPay may engage) to remind You <b>about</b> such breach and urge you to remedy such breach in person or by phone call, emails, push notifications, post, internet or through other means, or any other method in accordance with applicable laws of Bangladesh.</li>
            <li>You may be contacted by third party to remind You of any missed repayment of Your BNPL facility or any violation of the BNPL facility. For the purpose of so doing, You grant PalmPay consent to disclose Your breach of this Terms to such third party.</li>
            <li>If the PalmPay App is used for fraudulent activities, including but not limited to arbitrage and fraudulent transactions, PalmPay reserves the right to immediately suspend or withdraw Your PalmPay account.</li>
            <li>PalmPay reserve the right to immediately suspend or withdraw Your PalmPay App if PalmPay has reasonable grounds to believe that there may be a breach of security, PalmPay suspects unauthorised or fraudulent use or PalmPay is required by law to do so.</li>
            <li>If a fraudulent activity is associated with the operation of Your PalmPay App, You agree that PalmPay has the right to apply restrictions to Your PalmPay App and report to appropriate law enforcement agencies.</li>
            <li>The suspension or closure of Your PalmPay App or PalmPay account does not relieve Your liability to repay Your BNPL facility fully to PalmPay.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold border-b border-gray-100 pb-2 uppercase tracking-wide text-xs text-slate-400">CHANGING THESE TERMS</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>PalmPay <b>may</b> from time to time update these Terms or the PalmPay App. This may be done through a notification on the PalmPay App. Depending on the nature of the update, You may not be able to use the BNPL facility until you have downloaded or streamed the latest version of the PalmPay App and accepted any updated version of these Terms, if any. You have the right to decline the updated version of these Terms. If You reject the updated version of these Terms or PalmPay App, You may not be able to access the features in the PalmPay App.</li>
            <li>PalmPay will take all reasonable measures to notify You of any such changes and publish any amendments of these Terms and indicate the date of publication and therefore the date of any applicable amendment.</li>
            <li>If You are unable to make repayment due to any upgradation and/or technical error in the PalmPay App, You can make repayment through the Payment Method using an alternative access channel. Please contact PalmPay's customer support under such circumstances.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold border-b border-gray-100 pb-2 uppercase tracking-wide text-xs text-slate-400">OTHER CONSIDERATIONS</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>Governing Law. These Terms are made under and will be governed by and construed in accordance with the laws of Bangladesh.</li>
            <li>Dispute Resolution. Should any dispute, claim or controversy arise between You and PalmPay, concerning the Terms, You and PalmPay shall attempt to resolve the dispute by amicable settlement. This entails one party inviting the other party in writing to meet, to resolve the dispute within thirty (30) days from the date of the written invitation. If the dispute cannot be resolved by such amicable settlement, the dispute shall be finally resolved by arbitration. Arbitration shall be held at Dhaka and conducted in the English language in accordance with the rules provided under Bangladesh Arbitration Act, 2001.</li>
            <li>No Waiver. PalmPay's failure to exercise or enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.</li>
            <li>Severability. If any provisions of the Terms are found by a court of competent jurisdiction to be invalid, the invalidity of such provision shall not affect the legality, enforceability or validity of the remaining provisions which shall remain in full force and effect.</li>
            <li>Assignment. PalmPay expressly reserves the right to assign, delegate and transfer these Terms and its rights and obligations under these Terms in part or as a whole and including without limitation, to a subsidiary, affiliate, successor or any third-party whatsoever without Your consent. You shall not transfer, assign or delegate these Terms, or your rights, obligations in any manner whatsoever under these Terms, to any person or entity without our prior written approval from PalmPay.</li>
            <li>Entire Agreement. These Terms and any other notices published by PalmPay, shall constitute the entire agreement between PalmPay and You with respect to the BNPL facility.</li>
            <li>No Authority. You hereby acknowledge and agree that You are not an employee, agent, partner or joint venture of PalmPay, and You do not have any authority of any kind to bind PalmPay in any respect whatsoever.</li>
            <li>Force Majeure. Neither You nor PalmPay shall be liable to each other for any delay or failure to perform its obligations under these Terms as a result of revolution or other civil disorders; belligerent aggression by an enemy; strikes; lack of available resources from persons other than the parties to these Terms; labour disputes; electrical equipment or system availability delay or failure; fires; floods; acts of God; government or regulatory intervention; or, without limiting the foregoing, any other causes not within its control, and which by the exercise of reasonable diligence it is unable to prevent, whether of the class of causes hereinbefore enumerated or not.</li>
          </ul>
        </div>

        <div className="space-y-4 pt-6 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Customer Support</p>
          <div className="text-sm space-y-2">
             <p>Hotline: <span className="font-bold text-slate-900">09611678534</span></p>
             <div>
                <p className="text-gray-500 mb-1">Whatsapp:</p>
                <div className="grid grid-cols-2 gap-2 font-bold text-slate-900">
                   <span>01332543155</span>
                   <span>01335095124</span>
                   <span>01329656084</span>
                   <span>01329656079</span>
                </div>
             </div>
          </div>
        </div>

        <p className="text-center text-gray-300 text-[10px] py-10">পামপে লিমিটেড দ্বারা চালিত</p>
      </div>
    </div>
  );
}

// --- Main App ---

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('loading');
  const [activeTab, setActiveTab] = useState<'home' | 'me'>('home');

  useEffect(() => {
    if (currentScreen === 'loading') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  useEffect(() => {
    // If we switch tabs, update the screen
    if (activeTab === 'home') setCurrentScreen('home');
    if (activeTab === 'me') setCurrentScreen('me');
  }, [activeTab]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding': return <OnboardingScreen onStart={() => setCurrentScreen('home')} />;
      case 'home': return <HomeScreen setScreen={setCurrentScreen} />;
      case 'me': return <ProfileScreen setScreen={setCurrentScreen} />;
      case 'notifications': return <NotificationsScreen setScreen={setCurrentScreen} />;
      case 'payment_input': return <PaymentInputScreen setScreen={setCurrentScreen} />;
      case 'payment_history': return <PaymentHistoryScreen setScreen={setCurrentScreen} />;
      case 'loan_summary': return <LoanSummaryScreen setScreen={setCurrentScreen} />;
      case 'loan_details': return <LoanDetailsScreen setScreen={setCurrentScreen} />;
      case 'reminder_info': return <ReminderInfoScreen setScreen={setCurrentScreen} />;
      case 'my_orders': return <MyOrdersScreen setScreen={setCurrentScreen} />;
      case 'loan_records': return <LoanRecordsScreen setScreen={setCurrentScreen} />;
      case 'terms': return <TermsAndConditionsScreen setScreen={setCurrentScreen} />;
      case 'loading': return <LoadingScreen />;
      default: return <HomeScreen setScreen={setCurrentScreen} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative font-sans">
      <AnimatePresence mode="wait">
        <motion.div
           key={currentScreen}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           transition={{ duration: 0.2 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {(currentScreen === 'home' || currentScreen === 'me') && (
        <BottomNav active={activeTab} onChange={setActiveTab} />
      )}
    </div>
  );
}
