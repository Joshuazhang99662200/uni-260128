import React, { useState, useRef, useEffect } from "react";
import {
  Home,
  Bell,
  User,
  Play,
  Rocket,
  Calendar,
  Lock,
  ChevronRight,
  BarChart3,
  Building2,
  Users,
  Headphones,
  Sparkles,
  Quote,
  TrendingUp,
  ShieldCheck,
  PieChart,
  ExternalLink,
  PlayCircle,
  Heart,
  Share2,
  MessageCircle,
  MoreHorizontal,
  Radio,
  ReceiptText,
  IdCard,
  FileSearch,
  MessageSquareText,
  Settings,
  ShieldAlert,
  LogOut,
  LayoutGrid,
  FileText,
  MonitorPlay,
  Zap,
  Info,
  ListOrdered,
  ChevronLeft,
  CheckCircle2,
  PenTool,
  Lightbulb,
  Cpu,
  MessageSquare,
  Send,
  UserPlus,
  FileEdit,
  ClipboardList,
  X,
  FileUp,
  History,
  Video,
  Clock,
  Check,
  Ticket,
  Mail,
  Activity,
  Target,
  HelpCircle,
  Briefcase,
  Layers,
  Globe,
  Copy,
  ChevronDown,
  UserCog,
  ArrowRight,
  AlertCircle,
  Wrench,
  Minus,
  Plus,
  FolderGit2,
  FileStack,
  Wallet,
  CreditCard,
  Loader2,
  FileBadge,
  ScrollText,
  ToggleRight,
  ToggleLeft,
  QrCode,
  Gift,
  Link,
  RefreshCw,
  Ban,
  WifiOff,
  Megaphone,
  FileCheck,
  Newspaper,
  CheckCheck,
  XCircle,
  FileWarning,
  RefreshCcw,
  Download,
  GraduationCap,
  PlaySquare,
  ShoppingBag,
  Pause,
  Crown,
  SkipBack,
  SkipForward,
  Banknote,
  Landmark,
  FileSignature,
} from "lucide-react";

// --- 样式定义 ---
const BRAND_GRADIENT_TEXT =
  "bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent";
const BRAND_BTN_GRADIENT =
  "bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400";
const CYAN_BLUE_GRADIENT = "bg-gradient-to-br from-cyan-400 to-blue-600";
const LOVABLE_GRADIENT_FAINT =
  "bg-[linear-gradient(90deg,#ffffff_0%,#eff6ff_30%,#e0e7ff_60%,#fce7f3_100%)]";

// --- 工具函数：复制文本 ---
const handleCopyText = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Copy failed", err);
  }
  document.body.removeChild(textarea);
};

const App = () => {
  // --- 全局状态管理 ---
  const [activeTab, setActiveTab] = useState("首页");
  const [homeView, setHomeView] = useState("default");
  const [profileView, setProfileView] = useState("default");
  const [dynamicView, setDynamicView] = useState("default");
  const [genericTitle, setGenericTitle] = useState("");

  // 全局 UI 控制
  const [showCS, setShowCS] = useState(false);
  const [showLiveBooking, setShowLiveBooking] = useState(false);
  const [showTicketCheckModal, setShowTicketCheckModal] = useState(false);
  const [showBookingSuccessModal, setShowBookingSuccessModal] = useState(false);
  const [showBookingFailureModal, setShowBookingFailureModal] = useState(false);
  const [showBookingRecords, setShowBookingRecords] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [showBookingDetail, setShowBookingDetail] = useState(null);

  // 核心数据
  const [ticketCount, setTicketCount] = useState(0);
  const [energyCount, setEnergyCount] = useState(9700);
  const [unreadCount, setUnreadCount] = useState(2);

  // 诊断流程状态
  const [diagStep, setDiagStep] = useState("idle");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [hasPaidPlanB, setHasPaidPlanB] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [hasNewReport, setHasNewReport] = useState(false);

  // --- 发票与兑换中心状态 ---
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [redeemModalState, setRedeemModalState] = useState({
    visible: false,
    type: "",
    title: "",
    desc: "",
    data: null,
  });
  const [myGeneratedCodes, setMyGeneratedCodes] = useState([
    {
      id: 1,
      time: "2023-10-24 14:30",
      code: "HFDH-GXZS-001",
      amount: 1000,
      status: "已使用",
    },
  ]);
  const [myRedeemedCodes, setMyRedeemedCodes] = useState([
    {
      id: 101,
      time: "2023-11-01 09:20",
      code: "VIP666",
      reward: "直播券 x1",
      status: "已兑换",
    },
  ]);

  // --- 消息数据 ---
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "asset",
      title: "邀请好友奖励到账",
      content: "您成功邀请了一位好友注册，获得 +30 能量奖励，请查收。",
      amount: "+30",
      time: "10:30",
      fullTime: "2025-12-30 10:30",
      read: false,
    },
    {
      id: 2,
      type: "asset",
      title: "兑换码核销成功",
      content: "您使用兑换码 NEWYEAR2025 成功兑换 299 能量。",
      amount: "+299",
      time: "昨天",
      fullTime: "2025-12-29 18:45",
      read: false,
    },
    {
      id: 3,
      type: "service",
      title: "Plan B 深度诊断报告已生成",
      content:
        "您提交的《智能出行平台商业计划书》诊断报告已完成，点击查看详情及优化建议。",
      time: "12-28",
      fullTime: "2025-12-28 14:20",
      read: false,
    },
    {
      id: 4,
      type: "system",
      title: "系统维护通知",
      content:
        "为了提供更好的服务，系统将于本周六凌晨 02:00 - 04:00 进行停机维护，请提前做好准备。",
      time: "12-25",
      fullTime: "2025-12-25 09:00",
      read: true,
    },
    {
      id: 5,
      type: "content",
      title: "直播预告：投资人教你写BP",
      content:
        "本周六晚8点，资深投资人在线直播，手把手教你打造打动投资人的商业计划书。",
      time: "12-20",
      fullTime: "2025-12-20 16:00",
      read: true,
    },
  ]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    setUnreadCount(messages.filter((m) => !m.read).length);
  }, [messages]);

  const markAllAsRead = () => {
    setMessages((prev) => prev.map((msg) => ({ ...msg, read: true })));
  };

  const handleMessageClick = (msg) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
    );
    setSelectedMessage(msg);
  };

  // ==========================================
  // 0. 通用组件
  // ==========================================

  // ... existing DebugConfigurator ...
  const DebugConfigurator = () => (
    <div className="fixed bottom-6 left-6 z-[2000] animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-2xl w-64 text-white">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
          <div className="flex items-center gap-2 text-cyan-400">
            <Wrench size={16} />
            <span className="text-xs font-black tracking-widest uppercase">
              原型调试器
            </span>
          </div>
          <span className="bg-cyan-600 px-1.5 py-0.5 rounded text-[8px] font-bold">
            V1.1.9
          </span>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase">
              <span>直播券控制</span>
              <span
                className={
                  ticketCount > 0 ? "text-emerald-400" : "text-orange-400"
                }
              >
                当前: {ticketCount} 张
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
              <button
                onClick={() => setTicketCount(Math.max(0, ticketCount - 1))}
                className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-lg"
              >
                <Minus size={14} />
              </button>
              <div className="flex-1 text-center font-mono font-black">
                {ticketCount}
              </div>
              <button
                onClick={() => setTicketCount(ticketCount + 1)}
                className="w-8 h-8 flex items-center justify-center bg-cyan-600 rounded-lg"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase">
              <span>能量余额控制</span>
              <span className="text-amber-400">{energyCount} pts</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
              <button
                onClick={() => setEnergyCount(Math.max(0, energyCount - 1000))}
                className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-lg"
              >
                <Minus size={14} />
              </button>
              <div className="flex-1 text-center font-mono font-black text-xs">
                {energyCount}
              </div>
              <button
                onClick={() => setEnergyCount(energyCount + 1000)}
                className="w-8 h-8 flex items-center justify-center bg-amber-600 rounded-lg"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-700 space-y-2">
            {diagStep === "diagnosing" && (
              <button
                onClick={() => {
                  setDiagStep("result");
                  setHasNewReport(true);
                }}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-[10px] font-bold text-white flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={12} /> 强制完成诊断
              </button>
            )}
            <button
              onClick={() => setDiagStep("failed")}
              className="w-full py-2 bg-red-900/50 hover:bg-red-900 border border-red-800 rounded-xl text-[10px] font-bold text-red-200 flex items-center justify-center gap-2"
            >
              <FileWarning size={12} /> 强制诊断失败
            </button>
            <button
              onClick={() => setShowLiveBooking(true)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-[10px] font-bold text-slate-300 flex items-center justify-center gap-2"
            >
              <ExternalLink size={12} /> 强制唤起日历(Level 3)
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ... existing DraggableCustomerService ...
  const DraggableCustomerService = ({ onClick }) => {
    const [position, setPosition] = useState({ x: 310, y: 600 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartOffset = useRef({ x: 0, y: 0 });
    const hasMoved = useRef(false);

    const handleStart = (clientX, clientY) => {
      setIsDragging(true);
      hasMoved.current = false;
      dragStartOffset.current = {
        x: clientX - position.x,
        y: clientY - position.y,
      };
    };

    const onMouseDown = (e) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    };
    const onTouchStart = (e) => {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    };

    useEffect(() => {
      const handleMove = (clientX, clientY) => {
        const newX = clientX - dragStartOffset.current.x;
        const newY = clientY - dragStartOffset.current.y;
        if (
          Math.abs(newX - position.x) > 2 ||
          Math.abs(newY - position.y) > 2
        ) {
          hasMoved.current = true;
        }
        setPosition({ x: newX, y: newY });
      };
      const handleEnd = () => {
        setIsDragging(false);
        setPosition((prevPos) => {
          const parentWidth = 393;
          const selfWidth = 56;
          const margin = 16;
          const threshold = parentWidth / 2;
          let finalX = prevPos.x;
          let finalY = prevPos.y;
          if (prevPos.x + selfWidth / 2 < threshold) {
            finalX = margin;
          } else {
            finalX = parentWidth - selfWidth - margin;
          }
          if (finalY < 80) finalY = 80;
          if (finalY > 750) finalY = 750;
          return { x: finalX, y: finalY };
        });
      };
      const onMouseMove = (e) => {
        if (!isDragging) return;
        handleMove(e.clientX, e.clientY);
      };
      const onTouchMove = (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      };
      if (isDragging) {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", handleEnd);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchend", handleEnd);
      }
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", handleEnd);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", handleEnd);
      };
    }, [isDragging]);

    return (
      <div
        className="absolute z-50 shadow-2xl rounded-full cursor-move"
        style={{
          left: position.x,
          top: position.y,
          transition: isDragging
            ? "none"
            : "left 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28), top 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)",
          touchAction: "none",
        }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onClick={() => {
          if (!hasMoved.current) onClick();
        }}
      >
        <div
          className={`w-14 h-14 rounded-full flex flex-col items-center justify-center border-2 border-white active:scale-90 transition-transform shadow-lg ${CYAN_BLUE_GRADIENT}`}
        >
          <Headphones size={22} className="text-white mb-0.5" />
          <span className="text-[9px] text-white font-black leading-none">
            客服
          </span>
        </div>
      </div>
    );
  };

  const SubPageLayout = ({
    children,
    blobColor1 = "bg-blue-400",
    blobColor2 = "bg-purple-400",
  }) => (
    <div className="flex-col h-full bg-white relative overflow-hidden animate-in slide-in-from-right duration-300 flex">
      <div
        className={`absolute top-[-10%] right-[-20%] w-[90%] h-[45%] ${blobColor1} rounded-full blur-[80px] opacity-40 pointer-events-none mix-blend-multiply`}
      ></div>
      <div
        className={`absolute top-[-10%] left-[-20%] w-[80%] h-[45%] ${blobColor2} rounded-full blur-[80px] opacity-40 pointer-events-none mix-blend-multiply`}
      ></div>
      <div className="absolute top-[30%] left-0 w-full h-full bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-white/40 backdrop-blur-[1px] pointer-events-none"></div>
      <div className="relative z-10 flex flex-col h-full">{children}</div>
    </div>
  );

  const CopyWeChatButton = ({ wechatId, label = "复制微信号" }) => (
    <button
      onClick={() => handleCopyText(wechatId)}
      className="w-full py-3 bg-orange-50 text-orange-600 rounded-xl text-[11px] font-black flex items-center justify-center gap-1.5 active:bg-orange-100 transition-colors border border-orange-100 shadow-sm"
    >
      <Copy size={14} /> {label}
    </button>
  );

  const PlusButton = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  );

  // --- 1. 预约与客服系统 ---
  // ... existing TicketCheckModal, LiveBookingPage, BookingRecordsPage, CustomerServicePage code ...
  const TicketCheckModal = ({
    onClose,
    onProceed,
    count,
    onNavigateToBP,
    onViewRecords,
  }) => (
    <div className="absolute inset-0 z-[100] flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full rounded-t-[32px] p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom duration-300 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 shadow-sm">
              <Calendar size={24} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-black text-slate-900 leading-tight">
                创业导师连线预约
              </h3>
              <span className="text-[10px] font-bold text-slate-400 tracking-wide">
                ONLINE CONSULTING
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-100 rounded-full text-slate-400 hover:bg-slate-200 active:scale-90 transition-all"
          >
            <X size={20} />
          </button>
        </div>
        <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-slate-600">
              当前可用直播券
            </span>
            <span
              className={`text-2xl font-black ${
                count > 0 ? "text-slate-900" : "text-slate-400"
              }`}
            >
              {count}{" "}
              <span className="text-xs text-slate-400 font-bold">张</span>
            </span>
          </div>
          {count === 0 && (
            <div className="bg-orange-50 border border-orange-200/60 rounded-xl p-3 flex items-start gap-3">
              <div className="mt-0.5 text-orange-500 shrink-0">
                <AlertCircle
                  size={18}
                  fill="currentColor"
                  className="text-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[11px] font-black text-orange-600/90">
                  温馨提示：尚未取得预约资格
                </h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                  请先使用【BP诊断Agent】进行深度诊断，购买“深度商业优化建议书”后可获赠直播预约资格。
                </p>
              </div>
            </div>
          )}
          {count > 0 && (
            <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-3 flex items-start gap-3">
              <CheckCircle2
                size={18}
                fill="currentColor"
                className="text-emerald-500 mt-0.5 shrink-0"
              />
              <p className="text-[10px] text-emerald-700 font-bold mt-0.5">
                您当前拥有预约资格，可直接进行时段选择。
              </p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onNavigateToBP}
            className="py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl text-sm font-black shadow-lg shadow-indigo-200 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Rocket size={18} /> 获取资格
          </button>
          {count > 0 ? (
            <button
              onClick={onProceed}
              className="py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              立即预约 <ChevronRight size={18} />
            </button>
          ) : (
            <button
              disabled
              className="py-4 bg-slate-200 text-slate-500 border border-slate-300/50 rounded-2xl text-sm font-black cursor-not-allowed flex items-center justify-center gap-2"
            >
              【直播权益不足】 <Lock size={16} />
            </button>
          )}
        </div>
        <button
          onClick={onViewRecords}
          className="w-full mt-6 py-2 text-emerald-600 text-sm font-bold active:opacity-70 transition-all flex items-center justify-center"
        >
          管理我的预约记录
        </button>
        <div className="mt-4 mx-auto w-1/3 h-1.5 bg-slate-100 rounded-full"></div>
      </div>
    </div>
  );

  const LiveBookingPage = ({ onClose }) => {
    // Note: To save space, using existing LiveBookingPage logic.
    // Assuming no changes needed here based on user request.
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonthIdx, setCurrentMonthIdx] = useState(0);
    const [selectedMentor, setSelectedMentor] = useState(0);
    const mentors = [
      {
        id: 0,
        name: "赵总",
        title: "人工智能赛道",
        intro: "专注AI与大数据赛道投资，10年经验",
        avatar:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
      },
      {
        id: 1,
        name: "张总",
        title: "半导体赛道",
        intro: "深耕硬科技与芯片领域，主导多起并购",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
      },
      {
        id: 2,
        name: "魏总",
        title: "消费赛道",
        intro: "新消费品牌孵化专家，擅长品牌定位",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      },
      {
        id: 3,
        name: "林总",
        title: "医疗健康",
        intro: "医学博士背景，专注生物医药早期投资",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
      },
      {
        id: 4,
        name: "孙总",
        title: "企业服务",
        intro: "SaaS与企业服务领域资深投资人",
        avatar:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
      },
    ];
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const generateCalendarDays = (year, month) => {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayOfWeek = new Date(year, month, 1).getDay();
      const days = [];
      for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
      for (let i = 1; i <= daysInMonth; i++) {
        const thisDate = new Date(year, month, i);
        const isPast =
          thisDate <
          new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const isFull = i % 4 === 0;
        days.push({ day: i, full: isFull, past: isPast, dateObj: thisDate });
      }
      return days;
    };
    const monthsToRender = [
      { year: currentYear, month: currentMonth },
      {
        year: currentMonth === 11 ? currentYear + 1 : currentYear,
        month: (currentMonth + 1) % 12,
      },
    ];
    const monthNames = [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ];
    const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
    const currentRenderMonth = monthsToRender[currentMonthIdx];
    const days = generateCalendarDays(
      currentRenderMonth.year,
      currentRenderMonth.month
    );

    return (
      <div className="absolute inset-0 bg-slate-50 z-[90] flex flex-col animate-in slide-in-from-right duration-300">
        <div className="bg-white px-4 pt-12 pb-3 flex items-center border-b border-slate-50 sticky top-0 z-20 shadow-sm">
          <button
            onClick={onClose}
            className="mr-3 p-2 rounded-xl bg-slate-50 text-slate-800 active:scale-90 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-black text-sm text-slate-900 tracking-tight">
            创业导师直播诊断预约
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
          <div className="bg-orange-50 px-4 py-2 flex items-center justify-between border-b border-orange-100">
            <div className="flex items-center gap-2">
              <AlertCircle
                size={14}
                className="text-orange-500 animate-pulse"
              />
              <span className="text-[10px] font-bold text-orange-700">
                3月15日场次当前可约，快来抢占名额！
              </span>
            </div>
            <ChevronRight size={14} className="text-orange-400" />
          </div>
          <div className="p-4">
            <section className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-3 bg-blue-600 rounded-full"></div>
                <h3 className="text-xs font-bold text-slate-700">
                  选择您的创业导师
                </h3>
              </div>
              <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-1 px-1 py-4">
                {mentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    onClick={() => setSelectedMentor(mentor.id)}
                    className={`flex-shrink-0 w-36 p-4 rounded-3xl border transition-all cursor-pointer relative flex flex-col items-center text-center gap-3 ${
                      selectedMentor === mentor.id
                        ? "border-blue-500 bg-white shadow-xl ring-2 ring-blue-100 scale-105 z-10"
                        : "border-slate-100 bg-white/80 grayscale-[0.5]"
                    }`}
                  >
                    {selectedMentor === mentor.id && (
                      <div className="absolute top-2 right-2 text-blue-600">
                        <CheckCircle2
                          size={18}
                          fill="currentColor"
                          className="text-white"
                        />
                      </div>
                    )}
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-slate-50 shadow-md"
                    />
                    <div className="w-full">
                      <h4
                        className={`text-sm font-black mb-1.5 ${
                          selectedMentor === mentor.id
                            ? "text-slate-900"
                            : "text-slate-700"
                        }`}
                      >
                        {mentor.name}
                      </h4>
                      <span className="block text-[9px] text-white bg-blue-600 px-2 py-0.5 rounded-full font-bold truncate mb-2 mx-auto w-fit shadow-sm">
                        {mentor.title}
                      </span>
                      <p className="text-[9px] text-slate-400 leading-tight line-clamp-3 h-9 px-1">
                        {mentor.intro}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <div className="h-2 bg-slate-50 -mx-4 mb-6 border-y border-slate-100/50"></div>
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-lg font-black text-slate-900">
                {currentRenderMonth.year}年{" "}
                {monthNames[currentRenderMonth.month]}
              </h3>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setCurrentMonthIdx(0)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    currentMonthIdx === 0
                      ? "bg-white shadow-sm text-slate-900"
                      : "text-slate-400"
                  }`}
                >
                  当月
                </button>
                <button
                  onClick={() => setCurrentMonthIdx(1)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    currentMonthIdx === 1
                      ? "bg-white shadow-sm text-slate-900"
                      : "text-slate-400"
                  }`}
                >
                  下月
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 mb-2">
              {weekDays.map((d) => (
                <div
                  key={d}
                  className="text-center text-[10px] font-bold text-slate-400"
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-3 gap-x-1">
              {days.map((d, i) => {
                if (!d) return <div key={i}></div>;
                const isSelected =
                  selectedDate &&
                  selectedDate.getTime() === d.dateObj.getTime();
                let cellClass =
                  "h-14 rounded-xl flex flex-col items-center justify-center border transition-all relative overflow-hidden ";
                let dayTextClass = "text-sm font-bold ";
                let statusEl = null;
                if (d.past) {
                  cellClass +=
                    "bg-slate-50 border-transparent opacity-40 cursor-not-allowed";
                  dayTextClass += "text-slate-300";
                } else if (d.full) {
                  cellClass +=
                    "bg-slate-50 border-slate-100 cursor-pointer active:scale-95";
                  dayTextClass += "text-slate-400";
                  statusEl = (
                    <span className="text-[8px] font-bold text-slate-400 mt-0.5">
                      已满
                    </span>
                  );
                } else {
                  if (isSelected) {
                    cellClass +=
                      "bg-blue-600 border-blue-600 shadow-md shadow-blue-200 scale-105 z-10";
                    dayTextClass += "text-white";
                    statusEl = (
                      <span className="text-[8px] font-bold text-blue-100 mt-0.5">
                        选中
                      </span>
                    );
                  } else {
                    cellClass +=
                      "bg-white border-slate-100 hover:border-blue-200 active:scale-95 cursor-pointer";
                    dayTextClass += "text-slate-700";
                    statusEl = (
                      <span className="text-[8px] font-bold text-emerald-500 mt-0.5">
                        可约
                      </span>
                    );
                  }
                }
                return (
                  <div
                    key={i}
                    onClick={() => !d.past && setSelectedDate(d.dateObj)}
                    className={cellClass}
                  >
                    <span className={dayTextClass}>{d.day}</span>
                    {statusEl}
                  </div>
                );
              })}
            </div>
          </div>
          {selectedDate && (
            <div className="px-4 animate-in slide-in-from-bottom-4 fade-in duration-300">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-lg">
                <h4 className="text-xs font-black text-slate-800 mb-3 flex items-center gap-2">
                  <Clock size={14} className="text-blue-500" />{" "}
                  {selectedDate.getDate()}日 可选时段
                </h4>
                {selectedDate.getDate() % 4 === 0 ? (
                  <div className="py-4 text-center">
                    <p className="text-xs font-bold text-slate-400">
                      该日期名额已抢光，请尝试其他日期
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-3 rounded-xl border border-blue-100 bg-blue-50 text-blue-700 text-xs font-bold active:scale-95 transition-all flex flex-col items-center gap-1">
                      <span>13:00 - 13:30</span>
                      <span className="text-[8px] opacity-70">剩余 1</span>
                    </button>
                    <button className="py-3 rounded-xl border border-slate-100 bg-white text-slate-600 text-xs font-bold active:scale-95 transition-all hover:border-blue-200 flex flex-col items-center gap-1">
                      <span>13:40 - 14:10</span>
                      <span className="text-[8px] opacity-70">剩余 1</span>
                    </button>
                  </div>
                )}
                <p className="mt-4 text-[10px] text-slate-400 leading-relaxed">
                  注：提交预约即视为同意BP公开演示，并授权国信合创Lab在直播、切片回放等场景使用您的肖像，且授权内容仅限平台宣传展示
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 p-4 pb-8 flex z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
          <button
            onClick={() => {
              const timeSlot = "10:00 - 10:30";
              const bookingDate = selectedDate
                ? `${selectedDate.getFullYear()}-${String(
                    selectedDate.getMonth() + 1
                  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
                    2,
                    "0"
                  )}`
                : "";
              setBookingInfo({
                mentorName: mentors[selectedMentor].name,
                mentorTitle: mentors[selectedMentor].title,
                bookingDate: bookingDate,
                timeSlot: timeSlot,
              });
              setShowBookingSuccessModal(true);
              const now = new Date();
              const nowStr = `${now.getFullYear()}-${String(
                now.getMonth() + 1
              ).padStart(2, "0")}-${String(now.getDate()).padStart(
                2,
                "0"
              )} ${String(now.getHours()).padStart(2, "0")}:${String(
                now.getMinutes()
              ).padStart(2, "0")}`;
              setMessages((prev) => [
                {
                  id: Date.now(),
                  type: "service",
                  title: "直播预约成功",
                  content: `您已成功预约 ${mentors[selectedMentor].name} 的1V1直播诊断`,
                  time: nowStr,
                  read: false,
                  link: {
                    type: "booking",
                    mentorName: mentors[selectedMentor].name,
                    mentorTitle: mentors[selectedMentor].title,
                    bookingDate: bookingDate,
                    timeSlot: timeSlot,
                  },
                },
                ...prev,
              ]);
            }}
            disabled={!selectedDate || selectedDate.getDate() % 4 === 0}
            className={`w-full py-3.5 rounded-xl text-xs font-black text-white shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${
              selectedDate && selectedDate.getDate() % 4 !== 0
                ? "bg-slate-900 shadow-slate-200"
                : "bg-slate-300 shadow-none cursor-not-allowed"
            }`}
          >
            <Check size={16} /> 确认预约
          </button>
        </div>
        {/* 预约成功弹窗 */}
        {showBookingSuccessModal && (
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 to-white z-[100] flex flex-col animate-in slide-in-from-right duration-300 overflow-hidden">
            <div className="absolute top-[-10%] right-[-20%] w-[90%] h-[45%] bg-emerald-200 rounded-full blur-[80px] opacity-40 pointer-events-none"></div>
            <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[45%] bg-teal-100 rounded-full blur-[80px] opacity-40 pointer-events-none"></div>
            <div className="relative z-20 px-4 pt-12 pb-3 flex items-center">
              <button
                onClick={() => {
                  setShowBookingSuccessModal(false);
                  onClose();
                }}
                className="mr-3 p-2 rounded-xl bg-white/80 text-slate-800 active:scale-90 transition-all shadow-sm border border-white"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="font-black text-sm text-slate-900 tracking-tight">
                预约确认
              </h2>
            </div>
            <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-6">
              <div className="flex flex-col items-center text-center pt-8 pb-8">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-emerald-400 to-teal-500 shadow-xl shadow-emerald-200">
                  <Check size={44} className="text-white" strokeWidth={3} />
                </div>
                <h3 className="text-xl font-black text-slate-900">预约成功</h3>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
                    <UserPlus size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">
                      添加小助理微信
                    </p>
                    <p className="text-[11px] text-slate-400">
                      完成预约确认流程
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                    <p className="text-sm font-bold text-slate-700 tracking-wide">
                      guoxinhc_01
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyText("guoxinhc_01")}
                    className="px-4 py-3 bg-slate-900 text-white rounded-xl text-xs font-black flex items-center gap-1.5 active:scale-95 transition-all shadow-md"
                  >
                    <Copy size={14} /> 复制
                  </button>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-[11px] font-bold text-slate-500 mb-3 flex items-center gap-1.5">
                  <Info size={12} /> 预约须知
                </p>
                <div className="space-y-2.5">
                  <p className="text-[11px] text-slate-600 leading-relaxed pl-3 border-l-2 border-emerald-400">
                    请在
                    <span className="font-bold text-slate-800">24小时内</span>
                    添加小助理微信，超时未完成将自动释放名额，直播权益原路退回。
                  </p>
                  <p className="text-[11px] text-slate-600 leading-relaxed pl-3 border-l-2 border-amber-400">
                    如需改期，请提前
                    <span className="font-bold text-slate-800">24小时</span>
                    联系小助理办理；届时未满24小时则无法受理改期，且直播权益不予退还。
                  </p>
                </div>
              </div>
            </div>
            <div className="relative z-20 p-4 pb-8 bg-white border-t border-slate-100">
              <button
                onClick={() => {
                  setShowBookingSuccessModal(false);
                  onClose();
                }}
                className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
              >
                <Check size={14} /> 我知道了
              </button>
            </div>
          </div>
        )}
        {/* 预约失败弹窗 */}
        {showBookingFailureModal && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-in fade-in">
            <div className="bg-white rounded-[32px] p-6 w-full max-w-xs shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-red-400 to-rose-500 shadow-lg shadow-red-200">
                <X size={40} className="text-white" strokeWidth={3} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">
                预约失败
              </h3>
              <p className="text-xs text-slate-500 mb-6 px-2 leading-relaxed">
                预约失败，请重试
              </p>
              <div className="w-full space-y-2">
                <button
                  onClick={() => setShowBookingFailureModal(false)}
                  className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
                >
                  <RefreshCw size={14} /> 重新预约
                </button>
                <button
                  onClick={() => {
                    setShowBookingFailureModal(false);
                    onClose();
                  }}
                  className="w-full py-3 bg-slate-100 text-slate-500 rounded-xl text-xs font-bold active:scale-95 transition-all"
                >
                  返回首页
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const BookingRecordsPage = ({ onClose }) => {
    // ... existing BookingRecordsPage code ...
    const bookingRecords = messages.filter(
      (msg) => msg.link?.type === "booking"
    );
    return (
      <div className="absolute inset-0 bg-slate-50 z-[90] flex flex-col animate-in slide-in-from-right duration-300">
        <div className="bg-white px-4 pt-12 pb-3 flex items-center border-b border-slate-50 sticky top-0 z-20 shadow-sm">
          <button
            onClick={onClose}
            className="mr-3 p-2 rounded-xl bg-slate-50 text-slate-800 active:scale-90 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-black text-sm text-slate-900 tracking-tight">
            预约记录
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookingRecords.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Calendar size={32} className="text-slate-300" />
              </div>
              <h3 className="text-sm font-bold text-slate-500 mb-2">
                暂无预约记录
              </h3>
              <p className="text-xs text-slate-400">您还没有预约过直播诊断</p>
            </div>
          ) : (
            bookingRecords.map((record) => (
              <div
                key={record.id}
                onClick={() => setShowBookingDetail(record.link)}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-100 shrink-0">
                    <Video size={22} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-black text-slate-800 truncate">
                        {record.link?.mentorName} · 1V1直播诊断
                      </h4>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full shrink-0 ml-2">
                        已预约
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">
                      {record.link?.mentorTitle}
                    </p>
                    <div className="flex items-center gap-4 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {record.link?.bookingDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {record.link?.timeSlot}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    预约时间: {record.time}
                  </span>
                  <span className="text-[10px] text-blue-500 font-bold flex items-center gap-1">
                    查看详情 <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 pb-8 bg-white border-t border-slate-100">
          <div className="mb-4 pb-4 border-b border-dashed border-slate-200">
            <p className="text-[11px] font-bold text-slate-500 mb-2">
              预约须知：
            </p>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              1. 如需调整预约信息，请联系客服办理
            </p>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              2. 预约仅支持修改一次，暂不支持取消
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              setShowTicketCheckModal(true);
            }}
            className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
          >
            <Calendar size={16} /> 预约新的直播诊断
          </button>
        </div>
      </div>
    );
  };

  const CustomerServicePage = ({ onClose }) => {
    // ... existing CustomerServicePage code ...
    const [messages, setMessages] = useState([
      { type: "robot", content: "您好！我是您的专属BP诊断顾问。" },
      { type: "robot", content: "请问有什么可以帮您？" },
    ]);
    const [inputValue, setInputValue] = useState("");
    const quickQuestions = [
      "BP诊断需要多久出结果？",
      "如何预约投行大咖直播连线？",
      "如何联系投资人？",
      "想找人工咨询",
    ];
    const sendMessage = (text) => {
      if (!text.trim()) return;
      const newMessages = [...messages, { type: "user", content: text }];
      setMessages(newMessages);
      setInputValue("");
      setTimeout(() => {
        let reply = "感谢您的咨询，人工客服暂时忙碌，稍后会为您解答。";
        if (text.includes("上传"))
          reply =
            "您可以在首页点击“BP诊断Agent”按钮，进入页面后点击底部“选择文件上传”即可支持PDF格式文件。";
        if (text.includes("多久"))
          reply = "通常情况下，AI 智能诊断报告会在 3-5 分钟内生成完毕。";
        if (text.includes("投资人"))
          reply =
            "您可以预约我们的“直播连线”服务，或者在获取高分报告后，通过我们的一键投递功能触达合作机构。";
        setMessages((prev) => [...prev, { type: "robot", content: reply }]);
      }, 800);
    };
    const handleTransferToHuman = () =>
      setMessages((prev) => [...prev, { type: "human_card", content: "" }]);

    return (
      <div className="absolute inset-0 bg-slate-50 z-[90] flex flex-col animate-in slide-in-from-bottom duration-300">
        <div className="bg-white px-5 pt-14 pb-4 flex items-center justify-between border-b border-slate-100 shadow-sm z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 -ml-2 hover:bg-slate-50 rounded-full active:scale-90 transition-all"
            >
              <ChevronLeft size={24} className="text-slate-800" />
            </button>
            <div className="flex flex-col">
              <h2 className="font-black text-base text-slate-900 flex items-center gap-1">
                中智飞{" "}
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse ml-1"></div>
                <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1 rounded tracking-tight">
                  ONLINE SUPPORT
                </span>
              </h2>
              <span className="text-[10px] text-slate-400">
                官方认证 · 24小时在线
              </span>
            </div>
          </div>
          <MoreHorizontal size={20} className="text-slate-400" />
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          <div className="text-center text-[10px] text-slate-300 py-2">
            今天 14:32
          </div>
          {messages.map((msg, idx) =>
            msg.type === "human_card" ? (
              <div
                key={idx}
                className="flex justify-start animate-in fade-in slide-in-from-left-2 w-full pr-10"
              >
                <div className="flex items-start gap-2 w-full">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 border border-slate-100">
                    <Headphones size={16} className="text-white" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm w-full">
                    <h3 className="text-sm font-black text-slate-800 mb-1">
                      联系人工客服
                    </h3>
                    <p className="text-[10px] text-slate-500 mb-3">
                      请通过微信联系我们：
                    </p>
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3">
                      <span className="text-sm font-bold text-slate-900 ml-1">
                        IamgxhcZZF
                      </span>
                    </div>
                    <CopyWeChatButton wechatId="IamgxhcZZF" />
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={idx}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    msg.type === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-slate-100 ${
                      msg.type === "user" ? "bg-slate-200" : "bg-blue-600"
                    }`}
                  >
                    {msg.type === "user" ? (
                      <User size={16} className="text-slate-500" />
                    ) : (
                      <Headphones size={16} className="text-white" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                      msg.type === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            )
          )}
          {messages.length < 5 && (
            <div className="pl-10 mt-2 space-y-2">
              <p className="text-[10px] text-slate-400 ml-1">您可能想问：</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="px-3 py-1.5 bg-white border border-blue-100 text-blue-600 text-[11px] font-medium rounded-full shadow-sm active:scale-95 transition-transform"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="bg-white p-4 pb-8 border-t border-slate-100 flex items-center gap-3">
          <button
            onClick={handleTransferToHuman}
            className="flex flex-col items-center gap-0.5 text-slate-400 active:text-blue-600 active:scale-95 transition-all mr-1"
          >
            <UserCog size={20} />
            <span className="text-[9px] font-bold">转人工</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
            <PlusButton />
          </div>
          <div className="flex-1 bg-slate-50 rounded-full px-4 py-2.5 flex items-center">
            <input
              type="text"
              className="bg-transparent w-full text-sm outline-none placeholder-slate-400 text-slate-700"
              placeholder="输入您的问题..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(inputValue)}
            />
          </div>
          <button
            onClick={() => sendMessage(inputValue)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-md ${
              inputValue.trim()
                ? "bg-blue-600 text-white"
                : "bg-slate-200 text-white"
            }`}
          >
            <Send size={16} className={inputValue.trim() ? "ml-0.5" : ""} />
          </button>
        </div>
      </div>
    );
  };

  // --- 2. BP诊断全链路 ---
  // ... existing FilePickerModal, ParsingView, PlanSelectionView, PaymentModal, DiagnosingView, ResultView, DiagnosisFailedView, DiagnosisLanding, DiagnosisFlowManager code ...
  const FilePickerModal = ({ onSelect, onClose }) => (
    <div className="absolute inset-0 z-[60] bg-black/60 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[32px] p-6 h-[80%] flex flex-col animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-black text-slate-900">选择文档上传</h3>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full">
            <X size={20} className="text-slate-400" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-3">
          {[
            "智能医疗影像项目BP_v1.pdf",
            "新能源电池回收计划书.pdf",
            "跨境电商SaaS融资计划.docx",
            "AIGC教育平台商业计划.pdf",
          ].map((file, i) => (
            <div
              key={i}
              onClick={() => onSelect(file)}
              className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rose-500 shadow-sm">
                <FileText size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800 truncate">
                  {file}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  2.4 MB · 刚刚
                </p>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-slate-200"></div>
            </div>
          ))}
          <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-2">
            <FolderGit2 size={24} />
            <span className="text-xs font-bold">浏览手机文件</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ParsingView = ({ onComplete }) => {
    useEffect(() => {
      const timer = setTimeout(onComplete, 2500);
      return () => clearTimeout(timer);
    }, []);
    return (
      <div className="absolute inset-0 z-[50] bg-white flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FileSearch size={32} className="text-cyan-500 animate-pulse" />
          </div>
        </div>
        <h3 className="text-xl font-black mb-2 tracking-tight text-slate-800">
          正在解析 BP 结构...
        </h3>
        <p className="text-xs text-slate-400 font-medium">
          AI 引擎正在提取关键商业要素
        </p>
        <div className="w-64 h-1 bg-slate-100 rounded-full mt-8 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 animate-[loading_2s_ease-in-out_infinite] w-full origin-left"></div>
        </div>
      </div>
    );
  };

  const PlanSelectionView = ({ onSelectPlan }) => (
    <div className="absolute inset-0 z-[50] bg-slate-50 flex flex-col animate-in fade-in">
      <div className="px-5 pt-12 pb-4 flex items-center shrink-0">
        <button
          onClick={() => setDiagStep("idle")}
          className="p-2 rounded-full bg-white border border-slate-100 text-slate-600"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="ml-3 font-black text-lg text-slate-900">
          定制您的诊断方案
        </h2>
      </div>
      <div className="flex-1 px-5 pb-8 flex flex-col gap-4 overflow-hidden">
        <div
          onClick={() => onSelectPlan("A")}
          className="flex-[3] bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm relative overflow-hidden group active:scale-[0.98] transition-all cursor-pointer flex flex-col justify-center"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="text-2xl">📑</div>
              <div>
                <h3 className="text-sm font-black text-slate-800">
                  初步诊断报告
                </h3>
                <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-1.5 rounded">
                  Base基础版
                </span>
              </div>
            </div>
            <div className="text-slate-900 font-black text-xl">免费</div>
          </div>
          <ul className="space-y-1.5 pl-1">
            <li className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
              <CheckCircle2 size={12} className="text-slate-300" />{" "}
              BP结构完整性体检
            </li>
            <li className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
              <CheckCircle2 size={12} className="text-slate-300" />{" "}
              基础排版规范性建议
            </li>
            <li className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
              <CheckCircle2 size={12} className="text-slate-300" />{" "}
              关键信息缺失提醒
            </li>
          </ul>
        </div>
        <div
          onClick={() => onSelectPlan("B")}
          className="flex-[7] rounded-[32px] p-6 shadow-2xl shadow-blue-100/50 active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden group flex flex-col"
        >
          <div
            className={`absolute inset-0 scale-150 blur-3xl opacity-80 ${LOVABLE_GRADIENT_FAINT}`}
          ></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="bg-slate-900 text-white px-2 py-0.5 rounded text-[10px] font-black tracking-wide">
                  PLUS版
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  深度商业优化建议书
                </h3>
              </div>
              <div className="text-slate-900 font-black text-3xl">¥299</div>
            </div>
            <div className="flex-1">
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-xs font-medium text-slate-600">
                  <div className="mt-0.5 p-1 bg-purple-100 rounded-lg text-purple-600">
                    <Sparkles size={14} />
                  </div>
                  <span className="leading-relaxed">
                    商业逻辑深度质询与拆解，重构核心故事线
                  </span>
                </li>
                <li className="flex items-start gap-3 text-xs font-medium text-slate-600">
                  <div className="mt-0.5 p-1 bg-indigo-100 rounded-lg text-indigo-600">
                    <ShieldAlert size={14} />
                  </div>
                  <span className="leading-relaxed">
                    模拟投资人视角，精准识别项目潜在风险与缺陷
                  </span>
                </li>
                <li className="flex items-start gap-3 text-xs font-medium text-slate-600">
                  <div className="mt-0.5 p-1 bg-blue-100 rounded-lg text-blue-600">
                    <Rocket size={14} />
                  </div>
                  <span className="leading-relaxed">
                    提供具体的优化策略与估值提升指引
                  </span>
                </li>
                <li className="flex items-start gap-3 text-xs font-medium text-slate-600">
                  <div className="mt-0.5 p-1 bg-pink-100 rounded-lg text-pink-500">
                    <Video size={14} />
                  </div>
                  <span className="leading-relaxed">
                    <span className="font-bold text-slate-800">赠送权益：</span>
                    资深创业导师 1v1 直播连线资格 (30分钟)
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative mt-auto">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setDiagStep("idle");
                  setActiveTab("我的");
                  setProfileView("energy");
                }}
                className="absolute -top-4 -right-2 -translate-y-full flex flex-col items-center animate-bounce z-20 cursor-pointer hover:scale-110 transition-transform"
              >
                <div className="bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap flex items-center gap-1">
                  做任务，赢免费 <ArrowRight size={10} className="ml-0.5" />
                </div>
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-red-500"></div>
              </div>
              <button className="w-full py-4 rounded-2xl bg-white text-pink-600 text-sm font-black shadow-lg hover:bg-slate-50 transition-colors">
                立即升级诊断
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PaymentModal = ({ onClose, onPay }) => {
    const [method, setMethod] = useState("cash");
    const price = 299;
    const energyRate = 100;
    const maxDeductible = Math.min(price, energyCount / energyRate);
    const energyUsed =
      method === "energy"
        ? price * energyRate
        : method === "combo"
        ? maxDeductible * energyRate
        : 0;
    const cashToPay =
      method === "energy"
        ? 0
        : method === "combo"
        ? price - maxDeductible
        : price;
    const canFullEnergy = energyCount >= price * energyRate;

    return (
      <div className="absolute inset-0 z-[70] bg-black/60 backdrop-blur-sm flex flex-col justify-end animate-in fade-in">
        <div className="bg-white rounded-t-[32px] p-6 animate-in slide-in-from-bottom duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-slate-900">确认支付</h3>
            <button onClick={onClose} className="p-2 bg-slate-100 rounded-full">
              <X size={20} />
            </button>
          </div>
          <div className="mb-6 p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
            <span className="text-sm font-bold text-slate-600">
              深度商业优化建议书
            </span>
            <span className="text-lg font-black text-slate-900">¥299.00</span>
          </div>
          <div className="space-y-3 mb-8">
            <div
              onClick={() => setMethod("cash")}
              className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer ${
                method === "cash"
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <MessageCircle size={18} fill="white" />
                </div>
                <span className="text-sm font-bold text-slate-800">
                  微信支付
                </span>
              </div>
              {method === "cash" && (
                <CheckCircle2
                  size={20}
                  className="text-blue-600"
                  fill="currentColor"
                />
              )}
            </div>
            <div
              onClick={() => canFullEnergy && setMethod("energy")}
              className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer ${
                method === "energy"
                  ? "border-amber-500 bg-amber-50"
                  : "border-slate-100"
              } ${!canFullEnergy && "opacity-50 grayscale"}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white">
                  <Zap size={18} fill="white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800">
                    全额能量兑换
                  </span>
                  <span className="text-[10px] text-slate-400">
                    余额 {energyCount} pts {canFullEnergy ? "" : "(余额不足)"}
                  </span>
                </div>
              </div>
              {method === "energy" && (
                <CheckCircle2
                  size={20}
                  className="text-amber-600"
                  fill="currentColor"
                />
              )}
            </div>
            <div
              onClick={() => energyCount > 0 && setMethod("combo")}
              className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer ${
                method === "combo"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-slate-100"
              } ${energyCount <= 0 && "opacity-50"}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white">
                  <Layers size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800">
                    能量抵扣 + 现金
                  </span>
                  <span className="text-[10px] text-slate-400">
                    自动抵扣最大额度
                  </span>
                </div>
              </div>
              {method === "combo" && (
                <CheckCircle2
                  size={20}
                  className="text-indigo-600"
                  fill="currentColor"
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-xs font-bold text-slate-500">实付金额</span>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-900">
                ¥{cashToPay.toFixed(2)}
              </span>
              {energyUsed > 0 && (
                <p className="text-[10px] text-amber-500 font-bold">
                  + {energyUsed} pts
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => onPay(cashToPay, energyUsed)}
            className={`w-full py-4 rounded-2xl text-white text-sm font-black shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${
              method === "energy" ? "bg-amber-500" : "bg-slate-900"
            }`}
          >
            {method === "energy" ? "确认兑换" : "立即支付"}
          </button>
        </div>
      </div>
    );
  };

  const DiagnosingView = () => {
    const stages = [
      "文档解析中...",
      "市场规模分析...",
      "竞争对手分析...",
      "商业模式分析...",
      "财务与融资分析...",
      "报告渲染中...",
    ];
    const [currentStageIdx, setCurrentStageIdx] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentStageIdx((prev) => (prev + 1) % stages.length);
      }, 800);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="flex-1 bg-white relative overflow-hidden flex flex-col items-center justify-center py-10 animate-in fade-in">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/50 to-white z-10"></div>
          <div className="grid grid-cols-4 gap-2 opacity-30 animate-pulse transform scale-150 rotate-12">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-blue-100 rounded-lg border border-blue-200"
              ></div>
            ))}
          </div>
        </div>
        <div className="relative z-20 flex flex-col items-center w-full">
          <div className="w-24 h-24 rounded-full border-4 border-cyan-100 flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <MonitorPlay size={40} className="text-cyan-500" />
          </div>
          <div className="space-y-4 w-64">
            {stages.map((stage, idx) => {
              const isActive = idx === currentStageIdx;
              const isPast = idx < currentStageIdx;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 transition-all duration-300 ${
                    isActive
                      ? "scale-110 opacity-100 pl-4"
                      : "opacity-30 scale-95"
                  }`}
                >
                  {isActive ? (
                    <Loader2 size={16} className="text-cyan-500 animate-spin" />
                  ) : (
                    <div
                      className={`w-4 h-4 rounded-full ${
                        isPast ? "bg-blue-600" : "bg-slate-200"
                      }`}
                    ></div>
                  )}
                  <span
                    className={`text-sm font-bold ${
                      isActive ? "text-slate-800" : "text-slate-400"
                    }`}
                  >
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative z-20 w-full px-6 mt-10 grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setDiagStep("idle");
              setActiveTab("我的");
              setProfileView("projects");
            }}
            className="flex flex-col items-center justify-center py-4 bg-slate-50 border border-slate-100 rounded-2xl active:scale-95 transition-all group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-50 mb-1 group-hover:scale-110 transition-transform">
              <FileText size={18} className="text-blue-600" />
            </div>
            <span className="text-[10px] font-bold text-slate-600">
              我的报告
            </span>
          </button>
          <button
            onClick={() => {
              setDiagStep("idle");
              setActiveTab("我的");
              setProfileView("energy");
            }}
            className="relative flex flex-col items-center justify-center py-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-100 rounded-2xl active:scale-95 transition-all group"
          >
            <div className="absolute -top-3 -right-2 bg-red-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full border border-white shadow-sm animate-bounce z-10 whitespace-nowrap">
              做任务赢免费
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-orange-50 mb-1 group-hover:scale-110 transition-transform">
              <Zap size={18} className="text-orange-500 fill-orange-500" />
            </div>
            <span className="text-[10px] font-bold text-slate-600">
              能量中心
            </span>
          </button>
        </div>
      </div>
    );
  };

  const ResultView = () => (
    <div className="flex-1 bg-slate-50 flex flex-col animate-in slide-in-from-right">
      <div className="bg-white px-4 pt-12 pb-3 flex items-center border-b border-slate-50 sticky top-0 z-10">
        <button
          onClick={() => {
            setDiagStep("idle");
            setHomeView("default");
          }}
          className="mr-3 p-2 rounded-xl bg-slate-50 text-slate-800 active:scale-90 transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="font-black text-sm text-slate-900 tracking-tight">
          诊断报告结果
        </h2>
      </div>
      <div className="bg-white px-5 pt-6 pb-6 border-b border-slate-100 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm animate-bounce">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="text-xl font-black text-slate-900">诊断已完成</h2>
        <p className="text-xs text-slate-500 mt-1">
          根据您的套餐，已生成以下报告
        </p>
      </div>
      <div className="flex-1 p-5 space-y-4 overflow-y-auto">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800">
                初步诊断报告
              </h3>
              <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                已生成
              </span>
            </div>
          </div>
          <button className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg group-hover:bg-slate-200">
            查看
          </button>
        </div>
        <div
          className={`p-5 rounded-2xl border shadow-sm relative overflow-hidden transition-all ${
            hasPaidPlanB
              ? "bg-white border-purple-100"
              : "bg-slate-100 border-transparent grayscale-[0.8]"
          }`}
        >
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                  hasPaidPlanB ? "bg-purple-600" : "bg-slate-400"
                }`}
              >
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-800">
                  深度商业优化建议书
                </h3>
                {!hasPaidPlanB && (
                  <span className="text-[10px] text-slate-400 font-bold mt-1 inline-block">
                    未解锁
                  </span>
                )}
              </div>
            </div>
            {hasPaidPlanB ? (
              <button className="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-lg shadow-md shadow-purple-200">
                查看
              </button>
            ) : (
              <Lock size={20} className="text-slate-400" />
            )}
          </div>
          {hasPaidPlanB && (
            <div className="bg-purple-50 rounded-xl p-3 flex items-center gap-3">
              <Video size={16} className="text-purple-600" />
              <span className="text-[10px] font-bold text-purple-700">
                含直播连线权益 (已到账)
              </span>
            </div>
          )}
          {!hasPaidPlanB && (
            <div className="mt-3">
              <button
                onClick={() => {
                  setDiagStep("planning");
                  setSelectedPlan(null);
                }}
                className="w-full py-2 bg-slate-800 text-white text-xs font-bold rounded-lg"
              >
                去升级解锁
              </button>
            </div>
          )}
        </div>
        <div
          className="mt-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg text-white relative overflow-hidden group cursor-pointer active:scale-95 transition-all"
          onClick={() => setShowLiveBooking(true)}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="flex items-center gap-3 z-10">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
              <Calendar size={20} className="text-orange-400" />
            </div>
            <div>
              <div className="text-[10px] text-slate-300 font-bold mb-0.5">
                直播连线权益
              </div>
              <div className="text-sm font-black flex items-center gap-1">
                您有{" "}
                <span className="text-orange-400 text-lg">{ticketCount}</span>{" "}
                次预约资格
              </div>
            </div>
          </div>
          <div className="z-10 bg-orange-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
            立即预约 <ChevronRight size={10} />
          </div>
        </div>
      </div>
      <div className="p-5 pb-8 bg-white border-t border-slate-100">
        <button
          onClick={() => {
            setDiagStep("idle");
            setHomeView("default");
          }}
          className="w-full py-3.5 border border-slate-200 text-slate-600 font-bold text-sm rounded-2xl active:scale-95 transition-all"
        >
          返回首页
        </button>
      </div>
    </div>
  );

  const DiagnosisFailedView = () => (
    <div className="flex-1 bg-slate-50 flex flex-col animate-in slide-in-from-right h-full relative">
      <div className="bg-white px-4 pt-12 pb-3 flex items-center border-b border-slate-50 sticky top-0 z-10 shrink-0">
        <button
          onClick={() => setDiagStep("idle")}
          className="mr-3 p-2 rounded-xl bg-slate-50 text-slate-800 active:scale-90 transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="font-black text-sm text-slate-900 tracking-tight">
          诊断失败
        </h2>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8 -mt-10">
        <div className="w-28 h-28 bg-red-50 rounded-[32px] flex items-center justify-center mb-8 shadow-xl shadow-red-100/50 border border-red-100 animate-in zoom-in duration-300">
          <FileWarning size={48} className="text-red-500 drop-shadow-sm" />
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-3 text-center tracking-tight">
          诊断失败
        </h3>
        <p className="text-xs text-slate-500 text-center leading-relaxed font-medium max-w-[260px]">
          检测到您上传的文档似乎不是一份完整的BP，无法提取有效信息，请重新上传正确BP后再试
        </p>
      </div>
      <div className="p-5 pb-10 bg-white border-t border-slate-100 space-y-3 shrink-0 relative z-20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => setDiagStep("picking")}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-black flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-slate-200"
        >
          <RefreshCw size={16} /> 重新上传
        </button>
        <button
          onClick={() => {
            setDiagStep("idle");
            setHomeView("default");
          }}
          className="w-full py-4 bg-slate-50 text-slate-600 border border-slate-200 rounded-2xl text-sm font-bold active:scale-95 transition-all hover:bg-slate-100"
        >
          返回首页
        </button>
      </div>
    </div>
  );

  const DiagnosisLanding = () => (
    <div className="flex flex-col h-full bg-white font-sans animate-in slide-in-from-right duration-300">
      <div className="bg-white px-4 pt-12 pb-3 flex items-center border-b border-slate-50 sticky top-0 z-10">
        <button
          onClick={() => setHomeView("default")}
          className="mr-3 p-2 rounded-xl bg-slate-50 text-slate-800 active:scale-90"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="font-black text-sm text-slate-900 tracking-tight">
          Uni 1.0 BP诊断Agent
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-6 flex flex-col">
        <div className="mt-4 mb-8">
          <button
            onClick={() => {
              setDiagStep("picking");
              setHasPaidPlanB(false);
            }}
            className="w-full h-[140px] rounded-[32px] bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl shadow-blue-200 flex flex-col items-center justify-center group active:scale-[0.98] transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50"></div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform">
              <FileUp size={24} className="text-white" />
            </div>
            <h3 className="text-base font-black text-white tracking-wide">
              选择BP文件上传
            </h3>
            <p className="text-blue-100 text-[9px] mt-0.5 font-medium opacity-80">
              (支持 PDF 格式)
            </p>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-10">
          <button
            onClick={() => {
              setActiveTab("我的");
              setProfileView("projects");
            }}
            className="py-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 text-xs font-bold flex flex-col items-center justify-center gap-2 active:scale-95 transition-all hover:bg-slate-100 hover:border-slate-200 relative"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-indigo-500 border border-slate-50">
              <History size={18} />
            </div>
            诊断记录
            {hasNewReport && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-sm animate-pulse">
                新报告
              </div>
            )}
          </button>
          <button
            onClick={() => setShowTicketCheckModal(true)}
            className="py-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 text-xs font-bold flex flex-col items-center justify-center gap-2 active:scale-95 transition-all hover:bg-slate-100 hover:border-slate-200"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-500 border border-slate-50">
              <Video size={18} />
            </div>
            预约直播
          </button>
        </div>
        <div className="mt-3 space-y-5 pb-8">
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100/50">
            <h4 className="text-[10px] font-black text-amber-600 mb-1.5 flex items-center gap-1.5">
              <Info size={12} className="fill-amber-600/20" /> 注意事项
            </h4>
            <p className="text-[9px] text-amber-700/70 leading-relaxed font-medium">
              报告获取时间约 20 分钟，诊断完成后 Uni Agent
              会通过短信与服务号形式同时通知您。
            </p>
          </div>
          <div className="space-y-2 px-1">
            <h4 className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
              免责声明
            </h4>
            <div className="text-[8px] text-slate-400 leading-relaxed space-y-2 text-justify">
              <p>
                1.
                Agent生成内容完全由AI自动生成，信息内容来源于用户上传文件与全网信息，模型经过工程手段调优后仍可能存在幻觉，国信合创与Uni项目组不对内容真实性进行任何保证，诊断内容仅供用户参考。
              </p>
              <p>
                2.
                用户上传文件经过严格保密，仅用于模型分析，未经用户授权不会用于任何商业目的。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DiagnosisFlowManager = () => {
    if (diagStep === "picking")
      return (
        <FilePickerModal
          onSelect={(f) => {
            setUploadedFile(f);
            setDiagStep("parsing");
          }}
          onClose={() => setDiagStep("idle")}
        />
      );
    if (diagStep === "parsing")
      return <ParsingView onComplete={() => setDiagStep("planning")} />;
    if (diagStep === "planning")
      return (
        <PlanSelectionView
          onSelectPlan={(plan) => {
            setSelectedPlan(plan);
            if (plan === "A") {
              setHasPaidPlanB(false);
              setDiagStep("diagnosing");
            } else {
              setDiagStep("paying");
            }
          }}
        />
      );
    if (diagStep === "paying")
      return (
        <PaymentModal
          onClose={() => setDiagStep("planning")}
          onPay={(cash, energy) => {
            setEnergyCount((prev) => prev - energy);
            setHasPaidPlanB(true);
            setTicketCount((prev) => prev + 1);
            setDiagStep("diagnosing");
          }}
        />
      );
    if (diagStep === "diagnosing") return <DiagnosingView />;
    if (diagStep === "result") return <ResultView />;
    if (diagStep === "failed") return <DiagnosisFailedView />;
    return <DiagnosisLanding />;
  };

  // --- 3. 子页面组件 ---

  const AgencyPage = () => {
    const [agencyView, setAgencyView] = useState("dashboard"); // dashboard, history, detail
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // Mock Data
    const agencyStats = {
      currentMonthReferrals: 15,
      currentMonthPending: "4,500.00",
      totalSettled: "128,400.00",
    };

    const settlementHistory = [
      {
        id: "TX_20240210_001",
        bank_transaction_id: "2024021000000012345678",
        payer: "国信合创(杭州)科技有限公司",
        payee: "张三 (6222 **** **** 8888)",
        amount: "12,400.00",
        time: "2024-02-10 14:30:22",
        status: "success",
      },
      {
        id: "TX_20240110_056",
        bank_transaction_id: "2024011000000087654321",
        payer: "国信合创(杭州)科技有限公司",
        payee: "张三 (6222 **** **** 8888)",
        amount: "8,200.00",
        time: "2024-01-10 09:15:10",
        status: "success",
      },
      {
        id: "TX_20231210_112",
        bank_transaction_id: "2023121000000011223344",
        payer: "国信合创(杭州)科技有限公司",
        payee: "张三 (6222 **** **** 8888)",
        amount: "15,600.00",
        time: "2023-12-10 16:45:00",
        status: "success",
      },
    ];

    const handleViewDetail = (tx) => {
      setSelectedTransaction(tx);
      setAgencyView("detail");
    };

    // View 1: 仪表盘 Dashboard
    if (agencyView === "dashboard") {
      return (
        <SubPageLayout blobColor1="bg-indigo-100" blobColor2="bg-blue-100">
          <div className="px-5 pt-14 pb-4 flex items-center border-b border-transparent">
            <button
              onClick={() => setProfileView("default")}
              className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="font-black text-base text-slate-800 tracking-tight">
              代理与协议中心
            </h2>
          </div>
          <div className="flex-1 px-5 py-6 overflow-y-auto pb-24 flex flex-col">
            {/* Top: Status Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[24px] p-5 mb-6 text-white shadow-xl shadow-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h3 className="text-lg font-black mb-1">成为代理合伙人</h3>
                  <p className="text-xs text-slate-400 font-medium">
                    共建生态，共享收益
                  </p>
                </div>
                <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1">
                  <CheckCircle2 size={12} /> 已签约
                </div>
              </div>
            </div>

            {/* Middle: Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-28">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                  <UserPlus size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold mb-0.5">
                    本月拉新数量
                  </div>
                  <div className="text-xl font-black text-slate-800">
                    {agencyStats.currentMonthReferrals}{" "}
                    <span className="text-xs font-bold text-slate-400">人</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-28">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mb-2">
                  <Clock size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold mb-0.5">
                    本月待结算
                  </div>
                  <div className="text-xl font-black text-orange-500">
                    <span className="text-xs">¥</span>
                    {agencyStats.currentMonthPending}
                  </div>
                </div>
              </div>
            </div>

            {/* Total Settled & History Link */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mb-8 relative overflow-hidden">
              <div
                className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-bl-[100px] -mr-4 -mt-4 opacity-50`}
              ></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Banknote size={16} />
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    累计结算金额
                  </span>
                </div>
                <div
                  className={`text-3xl font-black ${BRAND_GRADIENT_TEXT} mb-4`}
                >
                  ¥ {agencyStats.totalSettled}
                </div>
                <button
                  onClick={() => setAgencyView("history")}
                  className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline underline-offset-4"
                >
                  查询历史流水记录 <ChevronRight size={12} />
                </button>
              </div>
            </div>

            {/* Bottom: Protocols */}
            <div className="mt-auto space-y-3">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <FileSignature size={20} className="text-slate-400" />
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-700">
                    用户服务协议
                  </div>
                  <div className="text-[10px] text-slate-400">已同意并签署</div>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <ShieldCheck size={20} className="text-slate-400" />
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-700">
                    隐私政策
                  </div>
                  <div className="text-[10px] text-slate-400">已同意并签署</div>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            </div>
          </div>
        </SubPageLayout>
      );
    }

    // View 2: 历史流水列表 History List
    if (agencyView === "history") {
      return (
        <SubPageLayout blobColor1="bg-blue-100" blobColor2="bg-cyan-100">
          <div className="px-5 pt-14 pb-4 flex items-center border-b border-transparent">
            <button
              onClick={() => setAgencyView("dashboard")}
              className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="font-black text-base text-slate-800 tracking-tight">
              结算流水记录
            </h2>
          </div>
          <div className="flex-1 px-5 py-4 overflow-y-auto">
            <div className="space-y-3">
              {settlementHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleViewDetail(item)}
                  className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm active:scale-[0.98] transition-all cursor-pointer group hover:border-blue-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                        结算
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900">
                          ¥ {item.amount}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {item.time.split(" ")[0]}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        打款成功
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                    <span className="text-[10px] text-slate-400">
                      流水号: {item.id}
                    </span>
                    <ChevronRight
                      size={14}
                      className="text-slate-300 group-hover:text-blue-400 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest">
              仅展示近半年记录
            </div>
          </div>
        </SubPageLayout>
      );
    }

    // View 3: 交易详情 Detail
    if (agencyView === "detail" && selectedTransaction) {
      return (
        <SubPageLayout blobColor1="bg-slate-100" blobColor2="bg-white">
          <div className="px-5 pt-14 pb-4 flex items-center border-b border-transparent">
            <button
              onClick={() => setAgencyView("history")}
              className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="font-black text-base text-slate-800 tracking-tight">
              交易详情
            </h2>
          </div>
          <div className="flex-1 px-5 py-6 overflow-y-auto">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 relative overflow-hidden border border-slate-100">
              {/* Receipt Header */}
              <div className="flex flex-col items-center border-b border-dashed border-slate-200 pb-6 mb-6">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-4 ring-4 ring-emerald-50/50">
                  <Check size={32} strokeWidth={3} />
                </div>
                <h3 className="text-sm font-bold text-slate-500 mb-1">
                  交易金额
                </h3>
                <div className="text-4xl font-black text-slate-900 tracking-tight">
                  <span className="text-2xl align-top mr-1">¥</span>
                  {selectedTransaction.amount}
                </div>
              </div>

              {/* Receipt Body */}
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                    银行流水号 (Bank Transaction ID)
                  </label>
                  <div className="text-xs font-mono font-bold text-slate-700 bg-slate-50 p-2 rounded-lg break-all select-all">
                    {selectedTransaction.bank_transaction_id}
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <label className="text-[11px] font-bold text-slate-500">
                    付款方
                  </label>
                  <div className="text-[11px] font-bold text-slate-900 text-right max-w-[60%]">
                    {selectedTransaction.payer}
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <label className="text-[11px] font-bold text-slate-500">
                    收款方
                  </label>
                  <div className="text-[11px] font-bold text-slate-900 text-right max-w-[60%]">
                    {selectedTransaction.payee}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-slate-500">
                    交易时间
                  </label>
                  <div className="text-[11px] font-bold text-slate-900 font-mono">
                    {selectedTransaction.time}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-slate-500">
                    状态
                  </label>
                  <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    交易成功
                  </div>
                </div>
              </div>

              {/* Receipt Footer Decoration */}
              <div className="absolute top-0 left-0 w-full h-2 bg-[url('https://www.transparenttextures.com/patterns/saw-tooth.png')] opacity-10"></div>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-[url('https://www.transparenttextures.com/patterns/saw-tooth.png')] opacity-10 rotate-180"></div>
            </div>

            <div className="mt-8 flex justify-center">
              <button className="flex items-center gap-2 text-slate-400 text-xs font-bold active:text-blue-600 transition-colors">
                <Download size={14} /> 下载电子回单
              </button>
            </div>
          </div>
        </SubPageLayout>
      );
    }

    return null; // Fallback
  };

  const GenericSubPage = ({ title }) => (
    <SubPageLayout blobColor1="bg-slate-200" blobColor2="bg-gray-100">
      <div className="px-5 pt-14 pb-4 flex items-center border-b border-transparent">
        <button
          onClick={() => setProfileView("default")}
          className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="font-black text-base text-slate-800 tracking-tight">
          {title}
        </h2>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center pb-32 opacity-50">
        <div className="w-24 h-24 bg-white/80 backdrop-blur rounded-full flex items-center justify-center mb-6 shadow-xl shadow-slate-100 border border-white">
          <Settings size={36} className="text-slate-300" />
        </div>
        <h3 className="text-sm font-bold text-slate-700 mb-2">功能建设中</h3>
        <p className="text-xs text-slate-400">
          程序员正在连夜开发 {title} 模块...
        </p>
      </div>
    </SubPageLayout>
  );

  // ... existing FeedbackPage, MyProjectsPage, SharePosterPage, EcoServicePage, EnergyBillPage, EnergyPage, MessageCenterPage, RedeemHistoryPage, RedemptionHistoryPage, RedeemCenterPage, InvoiceDetailPage, InvoiceCenterPage, LiveEssencePage, VideoArea, FeedbackMarquee, HomeContent, DynamicContent, MyProfileContent, renderContent, return block ...
  const FeedbackPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("report_logic");
    const [feedbackText, setFeedbackText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const categories = [
      {
        id: "report_logic",
        label: "逻辑策略",
        icon: <TrendingUp size={16} />,
        placeholder: "我觉得优化建议不够落地...",
      },
      {
        id: "report_data",
        label: "财务数据",
        icon: <FileText size={16} />,
        placeholder: "市场规模测算逻辑太保守...",
      },
      {
        id: "report_tone",
        label: "措辞表达",
        icon: <PenTool size={16} />,
        placeholder: "描述太技术化，希望通俗点...",
      },
      {
        id: "feature_new",
        label: "功能需求",
        icon: <Lightbulb size={16} />,
        placeholder: "希望增加新功能...",
      },
      {
        id: "feature_ui",
        label: "体验优化",
        icon: <Cpu size={16} />,
        placeholder: "界面操作不方便...",
      },
      {
        id: "other",
        label: "其他吐槽",
        icon: <MessageSquare size={16} />,
        placeholder: "请畅所欲言...",
      },
    ];
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!selectedCategory || !feedbackText.trim()) return;
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setFeedbackText("");
        }, 3000);
      }, 1500);
    };
    return (
      <SubPageLayout blobColor1="bg-blue-400" blobColor2="bg-cyan-300">
        <div className="px-5 pt-14 pb-6 flex flex-col shrink-0">
          <button
            onClick={() => setProfileView("default")}
            className="self-start mb-6 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black flex items-center gap-2 text-slate-900 tracking-tight">
              <Sparkles size={22} className="text-blue-500 fill-blue-200" />{" "}
              反馈中心
            </h1>
            <p className="text-slate-500 text-xs mt-2 font-medium ml-1">
              帮助我们进化，提供更精准的BP诊断
            </p>
          </div>
        </div>
        <div className="flex-1 px-5 overflow-y-auto pb-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center h-full pb-20">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-blue-100/50 border border-white">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-lg font-black text-slate-800">反馈已收到</h3>
              <button
                onClick={() => setProfileView("default")}
                className="mt-8 text-slate-400 text-xs font-bold bg-slate-50 px-4 py-2 rounded-full"
              >
                返回个人中心
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              <div className="mb-6 bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-white shadow-sm">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">
                  想聊聊哪方面？
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all active:scale-95 ${
                        selectedCategory === cat.id
                          ? "border-blue-200 bg-blue-50/50 text-blue-600 shadow-sm"
                          : "border-transparent bg-slate-50/50 text-slate-400 hover:bg-white"
                      }`}
                    >
                      {cat.icon}
                      <span className="text-[10px] font-bold">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-col flex-1 relative group">
                <div className="bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-white shadow-sm h-full flex flex-col">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">
                    您的具体建议
                  </label>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full p-0 bg-transparent text-slate-700 placeholder-slate-300 text-sm leading-relaxed resize-none focus:outline-none flex-1"
                    placeholder={
                      categories.find((c) => c.id === selectedCategory)
                        ?.placeholder || "点击输入..."
                    }
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={
                    !selectedCategory || !feedbackText.trim() || isSubmitting
                  }
                  className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-sm text-white w-full transition-all active:scale-95 ${
                    !selectedCategory || !feedbackText.trim() || isSubmitting
                      ? "bg-slate-200 text-slate-400"
                      : `${BRAND_BTN_GRADIENT} shadow-xl shadow-blue-200`
                  }`}
                >
                  {isSubmitting ? (
                    "提交中..."
                  ) : (
                    <>
                      <Send size={16} /> 提交反馈
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </SubPageLayout>
    );
  };

  const MyProjectsPage = () => {
    const projects = [
      {
        id: 1,
        type: "BP诊断",
        title: "智能医疗影像辅助系统",
        status: "已完成",
        date: "2023-10-24",
        icon: <FileText size={18} className="text-blue-500" />,
      },
      {
        id: 2,
        type: "投资人对练",
        title: "A轮融资模拟对练",
        status: "进行中",
        date: "2023-10-28",
        icon: <Users size={18} className="text-purple-500" />,
      },
      {
        id: 3,
        type: "行业研究",
        title: "新能源汽车赛道分析",
        status: "已生成",
        date: "2023-10-15",
        icon: <BarChart3 size={18} className="text-emerald-500" />,
      },
    ];
    return (
      <SubPageLayout blobColor1="bg-blue-50" blobColor2="bg-slate-100">
        <div className="px-5 pt-14 pb-4 flex items-center border-b border-transparent">
          <button
            onClick={() => setProfileView("default")}
            className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-black text-base text-slate-800 tracking-tight">
            我的报告
          </h2>
        </div>
        <div className="flex-1 px-5 py-2 overflow-y-auto">
          <div className="space-y-3">
            {projects.map((p) => (
              <div
                key={p.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 rounded">
                      {p.type}
                    </span>
                    <span
                      className={`text-[10px] font-bold ${
                        p.status === "进行中"
                          ? "text-orange-500"
                          : "text-emerald-500"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 truncate">
                    {p.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">{p.date}</p>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button className="py-3 px-6 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg active:scale-95 transition-all">
              + 创建新项目
            </button>
          </div>
        </div>
      </SubPageLayout>
    );
  };

  const SharePosterPage = () => {
    return (
      <SubPageLayout blobColor1="bg-pink-300" blobColor2="bg-purple-300">
        <div className="px-5 pt-14 pb-4 flex items-center border-b border-transparent">
          <button
            onClick={() => setProfileView("default")}
            className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-black text-base text-slate-800 tracking-tight">
            分享海报
          </h2>
        </div>
        <div className="flex-1 px-5 py-6 flex flex-col items-center overflow-y-auto">
          <div className="w-[85%] aspect-[3/5] bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl shadow-2xl p-6 flex flex-col text-white relative overflow-hidden mb-8 transform hover:rotate-1 transition-transform">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10 flex flex-col h-full items-center text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                <Rocket size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-black mb-2">国信合创 Lab</h3>
              <p className="text-xs text-white/80 font-medium mb-auto">
                专业的 BP 诊断与融资加速平台
              </p>
              <div className="w-full bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/10">
                <div className="text-[10px] text-white/70 uppercase tracking-widest mb-1">
                  邀请码
                </div>
                <div className="text-3xl font-black tracking-widest font-mono">
                  8X29V
                </div>
              </div>
              <div className="bg-white p-2 rounded-xl">
                <QrCode size={80} className="text-slate-900" />
              </div>
              <p className="text-[9px] text-white/60 mt-3">
                扫码加入 · 开启融资加速
              </p>
            </div>
          </div>
          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
            <Share2 size={18} /> 保存海报并分享
          </button>
        </div>
      </SubPageLayout>
    );
  };

  const EcoServicePage = () => {
    return (
      <SubPageLayout blobColor1="bg-blue-200" blobColor2="bg-indigo-200">
        <div className="px-5 pt-14 pb-4 flex items-center border-b border-transparent">
          <button
            onClick={() => setProfileView("default")}
            className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-black text-base text-slate-800 tracking-tight">
            生态服务
          </h2>
        </div>
        <div className="flex-1 bg-slate-50 relative">
          <div className="absolute top-0 left-0 right-0 bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded sm:rounded-md"></div>
              <span className="text-[10px] font-bold text-slate-600">
                飞书多维表格 · 服务申请
              </span>
            </div>
            <ExternalLink size={14} className="text-slate-400" />
          </div>
          <div className="w-full h-full pt-10 px-4 pb-8 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
              <div className="h-4 bg-slate-100 rounded w-1/3 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-slate-50 rounded w-1/4"></div>
                <div className="h-10 bg-slate-50 border border-slate-200 rounded-lg"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-slate-50 rounded w-1/3"></div>
                <div className="h-24 bg-slate-50 border border-slate-200 rounded-lg"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-slate-50 rounded w-1/5"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-20 bg-blue-50 border border-blue-100 rounded-lg"></div>
                  <div className="h-8 w-20 bg-slate-50 border border-slate-200 rounded-lg"></div>
                </div>
              </div>
              <div className="pt-4">
                <div className="h-12 bg-blue-600 rounded-lg w-full flex items-center justify-center text-white text-xs font-bold">
                  提交申请
                </div>
              </div>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-4">
              Powered by Feishu
            </p>
          </div>
        </div>
      </SubPageLayout>
    );
  };

  const EnergyBillPage = () => {
    const transactions = [
      {
        id: 1,
        title: "邀请好友奖励",
        time: "2023-10-28 14:30",
        amount: "+500",
        type: "income",
      },
      {
        id: 2,
        title: "BP深度诊断消耗",
        time: "2023-10-27 09:15",
        amount: "-29900",
        type: "expense",
      },
      {
        id: 3,
        title: "完善项目信息",
        time: "2023-10-26 18:20",
        amount: "+500",
        type: "income",
      },
      {
        id: 4,
        title: "每日签到",
        time: "2023-10-26 09:00",
        amount: "+50",
        type: "income",
      },
    ];
    return (
      <SubPageLayout blobColor1="bg-emerald-200" blobColor2="bg-teal-100">
        <div className="px-5 pt-14 pb-4 flex items-center border-b border-transparent">
          <button
            onClick={() => setProfileView("energy")}
            className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-black text-base text-slate-800 tracking-tight">
            能量账单
          </h2>
        </div>
        <div className="flex-1 px-5 py-2 overflow-y-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-2 border border-white shadow-sm">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">
                    {tx.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {tx.time}
                  </p>
                </div>
                <span
                  className={`text-sm font-black ${
                    tx.type === "income" ? "text-emerald-500" : "text-slate-900"
                  }`}
                >
                  {tx.amount} <span className="text-[10px]">pts</span>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
              仅展示近30天记录
            </p>
          </div>
        </div>
      </SubPageLayout>
    );
  };

  const EnergyPage = () => (
    <SubPageLayout blobColor1="bg-orange-400" blobColor2="bg-amber-300">
      <div className="px-5 pt-14 pb-6 flex flex-col shrink-0">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setProfileView("default")}
            className="text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              能量任务中心
            </h1>
            <p className="text-slate-500 text-xs font-medium mt-1">
              完成任务赚取能量，兑换更多权益
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              <Zap
                size={24}
                className="text-amber-500 fill-amber-500 animate-pulse"
              />
              <span className="text-4xl font-black text-slate-900 tracking-tighter">
                {energyCount}
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 mr-1">
              当前能量值 (pts)
            </span>
          </div>
        </div>
        <Zap
          size={140}
          className="absolute -right-10 -top-6 text-orange-500/10 rotate-12 pointer-events-none"
        />
      </div>
      <div className="flex-1 px-5 relative z-20 pb-10 overflow-y-auto">
        <div className="space-y-3">
          {[
            {
              title: "邀请5位好友",
              sub: "每成功邀请1人 +100pts",
              icon: <UserPlus size={18} />,
              bg: "bg-orange-50",
              text: "text-orange-500",
              btn: "去邀请",
              btnColor: "bg-slate-900 text-white shadow-lg shadow-slate-200",
            },
            {
              title: "完善项目信息",
              sub: "认证成为创业者 +500pts",
              icon: <FileEdit size={18} />,
              bg: "bg-blue-50",
              text: "text-blue-500",
              btn: "去完善",
              btnColor: "bg-white border border-slate-100 text-slate-900",
            },
            {
              title: "填写需求问卷",
              sub: "限时奖励 +300pts",
              icon: <ClipboardList size={18} />,
              bg: "bg-purple-50",
              text: "text-purple-500",
              btn: "去填写",
              btnColor: "bg-white border border-slate-100 text-slate-900",
            },
          ].map((task, idx) => (
            <div
              key={idx}
              className="p-4 bg-white/60 backdrop-blur-md rounded-3xl border border-white shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-11 h-11 ${task.bg} ${task.text} rounded-2xl flex items-center justify-center shadow-inner`}
                >
                  {task.icon}
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800">
                    {task.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-bold">
                    {task.sub}
                  </p>
                </div>
              </div>
              <button
                className={`px-4 py-2 text-[10px] font-black rounded-xl active:scale-95 transition-all ${task.btnColor}`}
              >
                {task.btn}
              </button>
            </div>
          ))}
        </div>
        <div className="text-center text-[10px] text-slate-300 font-bold mt-4 tracking-widest uppercase mb-16">
          更多任务即将上线...
        </div>
        <div className="absolute bottom-[12%] left-0 right-0 text-center z-30 pointer-events-none">
          <button
            onClick={() => setProfileView("energy_bill")}
            className="text-xs text-slate-400 font-bold underline underline-offset-4 hover:text-slate-600 transition-colors pointer-events-auto"
          >
            查看能量历史账单
          </button>
        </div>
      </div>
    </SubPageLayout>
  );

  const MessageCenterPage = () => {
    const sortedMessages = [...messages].sort((a, b) => {
      if (a.read === b.read) return b.id - a.id;
      return a.read ? 1 : -1;
    });
    return (
      <SubPageLayout blobColor1="bg-blue-300" blobColor2="bg-indigo-200">
        <div className="px-5 pt-12 pb-4 flex items-center justify-between border-b border-transparent">
          <div className="flex items-center">
            <button
              onClick={() => setProfileView("default")}
              className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h2 className="font-black text-base text-slate-800 tracking-tight">
                消息中心
              </h2>
              {unreadCount > 0 ? (
                <p className="text-[10px] text-blue-600 font-bold animate-pulse">
                  {unreadCount} 条未读消息
                </p>
              ) : (
                <p className="text-[10px] text-slate-400 font-medium">
                  所有消息已读
                </p>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full active:scale-95 transition-all hover:bg-blue-100"
            >
              <CheckCheck size={12} /> 全部已读
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-10 scrollbar-hide">
          {sortedMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleMessageClick(msg)}
              className={`relative p-4 rounded-2xl border transition-all cursor-pointer active:scale-[0.98] ${
                msg.read
                  ? "bg-white/60 border-slate-100 backdrop-blur-sm"
                  : "bg-white/90 border-blue-100 shadow-md shadow-blue-50"
              }`}
            >
              {!msg.read && (
                <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full ring-4 ring-red-50 animate-pulse"></div>
              )}
              <div className="flex gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${
                    msg.type === "asset"
                      ? "bg-amber-50 border-amber-100 text-amber-500"
                      : msg.type === "service"
                      ? "bg-blue-50 border-blue-100 text-blue-500"
                      : "bg-slate-50 border-slate-100 text-slate-500"
                  }`}
                >
                  {msg.type === "asset" ? (
                    <Zap size={18} />
                  ) : msg.type === "service" ? (
                    <FileText size={18} />
                  ) : (
                    <Info size={18} />
                  )}
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        msg.type === "asset"
                          ? "bg-amber-100 text-amber-700"
                          : msg.type === "service"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {msg.type === "asset"
                        ? "资产"
                        : msg.type === "service"
                        ? "服务"
                        : "通知"}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {msg.time}
                    </span>
                  </div>
                  <h4
                    className={`text-sm mb-1 truncate ${
                      msg.read
                        ? "font-bold text-slate-600"
                        : "font-black text-slate-900"
                    }`}
                  >
                    {msg.title}
                  </h4>
                  <p
                    className={`text-xs line-clamp-2 ${
                      msg.read ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {msg.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="py-6 text-center">
            <span className="text-[10px] text-slate-300">没有更多消息了</span>
          </div>
        </div>
        {selectedMessage && (
          <div className="absolute inset-0 z-50 bg-black/20 backdrop-blur-[2px] flex items-end animate-in fade-in duration-200">
            <div className="w-full bg-white rounded-t-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    selectedMessage.type === "asset"
                      ? "bg-amber-100 text-amber-600"
                      : selectedMessage.type === "service"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {selectedMessage.type === "asset" ? (
                    <Zap size={24} />
                  ) : selectedMessage.type === "service" ? (
                    <FileText size={24} />
                  ) : (
                    <Info size={24} />
                  )}
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                {selectedMessage.title}
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                {selectedMessage.fullTime}
              </p>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-sm text-slate-600 leading-relaxed mb-8">
                {selectedMessage.content}
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-black active:scale-95 transition-all"
              >
                我知道了
              </button>
            </div>
          </div>
        )}
      </SubPageLayout>
    );
  };

  const RedeemHistoryPage = () => {
    return (
      <SubPageLayout blobColor1="bg-teal-200" blobColor2="bg-emerald-200">
        <div className="px-5 pt-12 pb-4 flex items-center border-b border-transparent">
          <button
            onClick={() => setProfileView("redeem_center")}
            className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-black text-base text-slate-800 tracking-tight">
            生成记录
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 pb-8 scrollbar-hide">
          {myGeneratedCodes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 opacity-40">
              <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mb-3">
                <Zap size={24} />
              </div>
              <p className="text-xs font-bold">暂无生成记录</p>
            </div>
          ) : (
            myGeneratedCodes.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-sm overflow-hidden animate-in slide-in-from-bottom-2 fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="px-4 py-3 bg-gradient-to-r from-amber-50/50 to-transparent border-b border-amber-100/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Zap
                        size={14}
                        className="text-amber-600 fill-amber-600"
                      />
                    </div>
                    <div>
                      <div className="font-mono text-sm font-black text-slate-800 tracking-wide">
                        {item.code}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock size={10} /> {item.time}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-black text-amber-600">
                    -{item.amount} pts
                  </span>
                </div>
                <div className="px-4 py-2 bg-slate-50/50 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold">
                    {item.status}
                  </span>
                  <button
                    onClick={() => handleCopyText(item.code)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 text-white rounded-lg text-[10px] font-bold active:scale-95 transition-all"
                  >
                    <Copy size={10} /> 复制
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </SubPageLayout>
    );
  };

  const RedemptionHistoryPage = () => {
    return (
      <SubPageLayout blobColor1="bg-teal-200" blobColor2="bg-emerald-200">
        <div className="px-5 pt-12 pb-4 flex items-center border-b border-transparent">
          <button
            onClick={() => setProfileView("redeem_center")}
            className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-black text-base text-slate-800 tracking-tight">
            兑换记录
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 pb-8 scrollbar-hide">
          {myRedeemedCodes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 opacity-40">
              <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mb-3">
                <Gift size={24} />
              </div>
              <p className="text-xs font-bold">暂无兑换记录</p>
            </div>
          ) : (
            myRedeemedCodes.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-sm overflow-hidden animate-in slide-in-from-bottom-2 fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="px-4 py-3 bg-gradient-to-r from-emerald-50/50 to-transparent border-b border-emerald-100/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-mono text-sm font-black text-slate-800 tracking-wide">
                        {item.code}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock size={10} /> {item.time}
                      </div>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                    兑换成功
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-bold">
                    获得权益
                  </span>
                  <div className="flex items-center gap-1 text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">
                    <Zap size={12} />
                    <span className="text-xs font-black">{item.reward}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </SubPageLayout>
    );
  };

  const RedeemCenterPage = () => {
    // ... existing RedeemCenterPage code ...
    const [subTab, setSubTab] = useState("redeem");
    const [redeemInput, setRedeemInput] = useState("");
    const [generateInput, setGenerateInput] = useState("");

    const isRedeemActive = redeemInput.trim().length > 0;
    const isGenerateActive =
      generateInput.trim().length > 0 && parseInt(generateInput) > 0;

    const handleRedeem = () => {
      if (!isRedeemActive) return;
      if (
        redeemInput.toUpperCase().startsWith("VIP") ||
        redeemInput.toUpperCase().startsWith("HFDH")
      ) {
        setEnergyCount((c) => c + 299);
        setMyRedeemedCodes((prev) => [
          {
            id: Date.now(),
            time: "刚刚",
            code: redeemInput,
            reward: "能量 +299",
            status: "已兑换",
          },
          ...prev,
        ]);
        setRedeemModalState({
          visible: true,
          type: "redeem_success",
          title: "兑换成功",
          desc: "恭喜您获得 299 能量",
          data: null,
        });
      } else {
        setRedeemModalState({
          visible: true,
          type: "redeem_fail",
          title: "兑换失败",
          desc: "无效的兑换码或该码已失效",
          data: null,
        });
      }
      setRedeemInput("");
    };

    const handleGenerate = () => {
      if (!isGenerateActive) return;
      const amount = parseInt(generateInput);
      if (energyCount < amount) {
        setRedeemModalState({
          visible: true,
          type: "generate_fail",
          title: "生成失败",
          desc: "您的能量余额不足，生成失败。",
          data: null,
        });
      } else {
        const newCode = `HFDH-${Math.random()
          .toString()
          .substr(2, 4)
          .toUpperCase()}`;
        setEnergyCount((c) => c - amount);
        setMyGeneratedCodes((prev) => [
          {
            id: Date.now(),
            time: "刚刚",
            code: newCode,
            amount: amount,
            status: "未使用",
          },
          ...prev,
        ]);
        setRedeemModalState({
          visible: true,
          type: "generate_success",
          title: "生成成功",
          desc: "兑换码已生成，请妥善保管",
          data: newCode,
        });
      }
      setGenerateInput("");
    };

    return (
      <SubPageLayout blobColor1="bg-emerald-300" blobColor2="bg-teal-300">
        <div className="px-5 pt-12 pb-4 flex items-center border-b border-transparent">
          <button
            onClick={() => setProfileView("default")}
            className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-black text-base text-slate-800 tracking-tight">
            兑换中心
          </h2>
        </div>
        <div className="flex-1 px-5 py-4 flex flex-col overflow-y-auto">
          <div className="flex p-1 bg-slate-100 rounded-xl mb-6 shrink-0">
            <button
              onClick={() => setSubTab("redeem")}
              className={`flex-1 py-2.5 text-[11px] font-bold rounded-lg transition-all ${
                subTab === "redeem"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400"
              }`}
            >
              兑换权益
            </button>
            <button
              onClick={() => setSubTab("generate")}
              className={`flex-1 py-2.5 text-[11px] font-bold rounded-lg transition-all ${
                subTab === "generate"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400"
              }`}
            >
              生成兑换码
            </button>
          </div>
          {subTab === "redeem" ? (
            <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 border border-white shadow-sm flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 relative">
              <div className="absolute top-4 right-4 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 flex items-center gap-1">
                <Zap size={10} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-600">
                  能量余额: {energyCount}
                </span>
              </div>
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 shadow-inner">
                <Gift size={36} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                输入兑换码
              </h3>
              <p className="text-xs text-slate-500 mb-8 max-w-[200px]">
                输入您的兑换码，获取能量奖励
              </p>
              <input
                type="text"
                value={redeemInput}
                onChange={(e) => setRedeemInput(e.target.value.toUpperCase())}
                placeholder="在此输入代码 (如: VIP666)"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-4 text-center font-mono text-lg font-black text-slate-800 mb-4 outline-none focus:border-emerald-400 focus:bg-white transition-all placeholder:text-slate-300"
              />
              <button
                onClick={handleRedeem}
                disabled={!isRedeemActive}
                className={`w-full py-4 rounded-2xl font-black text-sm shadow-lg transition-all ${
                  isRedeemActive
                    ? "bg-emerald-500 text-white shadow-emerald-200 active:scale-95"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                立即兑换
              </button>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 border border-white shadow-sm flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 relative">
              <div className="absolute top-4 right-4 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100 flex items-center gap-1">
                <Zap size={10} className="text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-bold text-amber-600">
                  余额: {energyCount}
                </span>
              </div>
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-6 shadow-inner">
                <Zap size={36} className="fill-amber-600" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                权益生成
              </h3>
              <p className="text-xs text-slate-500 mb-8 max-w-[200px]">
                消耗能量生成兑换码，赠与好友使用
              </p>
              <input
                type="number"
                value={generateInput}
                onChange={(e) => setGenerateInput(e.target.value)}
                placeholder="输入生成数额 (pts)"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-4 text-center font-mono text-lg font-black text-slate-800 mb-4 outline-none focus:border-amber-400 focus:bg-white transition-all placeholder:text-slate-300"
              />
              <button
                onClick={handleGenerate}
                disabled={!isGenerateActive}
                className={`w-full py-4 rounded-2xl font-black text-sm shadow-lg transition-all ${
                  isGenerateActive
                    ? "bg-amber-500 text-white shadow-amber-200 active:scale-95"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                一键生成
              </button>
            </div>
          )}
          <div className="mt-auto mb-[15px] w-full flex gap-3">
            <button
              onClick={() => setProfileView("redemption_history")}
              className="flex-1 py-3 bg-white/50 border border-white rounded-xl text-emerald-800 text-[10px] font-bold hover:bg-white transition-all"
            >
              兑换记录
            </button>
            <button
              onClick={() => setProfileView("redeem_history")}
              className="flex-1 py-3 bg-white/50 border border-white rounded-xl text-emerald-800 text-[10px] font-bold hover:bg-white transition-all"
            >
              生成记录
            </button>
          </div>
        </div>
      </SubPageLayout>
    );
  };

  const InvoiceDetailPage = () => {
    // ... existing InvoiceDetailPage code ...
    const [pageState, setPageState] = useState("detail");
    const [formData, setFormData] = useState({
      title: selectedInvoice?.title || "",
      taxNo: selectedInvoice?.taxNo || "",
      email: selectedInvoice?.email || "",
      remark: "",
    });
    if (!selectedInvoice) return null;
    if (pageState === "reissue_success") {
      return (
        <SubPageLayout blobColor1="bg-emerald-200" blobColor2="bg-teal-100">
          <div className="px-5 pt-14 pb-4 flex items-center border-b border-transparent">
            <button
              onClick={() => setProfileView("invoice_history")}
              className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="font-black text-base text-slate-800 tracking-tight">
              申请重开结果
            </h2>
          </div>
          <div className="flex-1 px-5 py-4 overflow-y-auto">
            <div className="h-full flex flex-col items-center justify-center pb-20">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 animate-in zoom-in">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-lg font-black text-slate-800">
                重开申请已提交
              </h3>
              <p className="text-xs text-slate-400 mt-2 text-center max-w-[200px]">
                我们会尽快审核您的修改信息，并通过邮件发送新发票。
              </p>
              <button
                onClick={() => setProfileView("invoice_history")}
                className="mt-8 px-8 py-3 bg-slate-100 text-slate-600 rounded-full text-xs font-bold"
              >
                返回列表
              </button>
            </div>
          </div>
        </SubPageLayout>
      );
    }
    if (pageState === "reissue_form") {
      return (
        <SubPageLayout blobColor1="bg-indigo-200" blobColor2="bg-blue-100">
          <div className="px-5 pt-14 pb-4 flex items-center border-b border-transparent">
            <button
              onClick={() => setPageState("detail")}
              className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="font-black text-base text-slate-800 tracking-tight">
              申请重开发票
            </h2>
          </div>
          <div className="flex-1 px-5 py-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-white shadow-sm space-y-4">
                <h3 className="text-sm font-black text-slate-800 mb-2">
                  修正开票信息
                </h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 mb-1 block">
                    抬头类型
                  </label>
                  <div className="flex gap-3">
                    <button className="flex-1 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md">
                      企业单位
                    </button>
                    <button className="flex-1 py-2 bg-slate-100 text-slate-500 text-xs font-bold rounded-xl">
                      个人/非企业
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 mb-1 block">
                      发票抬头
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 mb-1 block">
                      税号
                    </label>
                    <input
                      type="text"
                      value={formData.taxNo}
                      onChange={(e) =>
                        setFormData({ ...formData, taxNo: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 mb-1 block">
                      接收邮箱
                    </label>
                    <input
                      type="text"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 mb-1 block">
                      重开原因备注
                    </label>
                    <input
                      type="text"
                      value={formData.remark}
                      onChange={(e) =>
                        setFormData({ ...formData, remark: e.target.value })
                      }
                      placeholder="例如：税号填写错误"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-300 transition-all"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-start gap-2">
                <Info size={14} className="text-orange-500 mt-0.5 shrink-0" />
                <p className="text-[10px] text-orange-700 leading-relaxed">
                  提交重开申请后，原发票将自动作废。新发票将在 1-3
                  个工作日内发出。
                </p>
              </div>
              <button
                onClick={() => setPageState("reissue_success")}
                className="w-full py-3.5 bg-slate-900 text-white rounded-2xl text-xs font-black shadow-lg mt-4 active:scale-95 transition-all"
              >
                提交重开申请
              </button>
            </div>
          </div>
        </SubPageLayout>
      );
    }
    return (
      <SubPageLayout blobColor1="bg-indigo-100" blobColor2="bg-blue-100">
        <div className="px-5 pt-14 pb-4 flex items-center border-b border-transparent">
          <button
            onClick={() => setProfileView("invoice_history")}
            className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-black text-base text-slate-800 tracking-tight">
            发票详情
          </h2>
        </div>
        <div className="flex-1 px-5 py-4 overflow-y-auto flex flex-col">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs text-slate-400 font-bold mb-1">
                  发票金额
                </p>
                <h3 className="text-3xl font-black text-slate-900">
                  ¥{selectedInvoice.amount}
                </h3>
              </div>
              <span
                className={`text-[10px] font-black px-2 py-1 rounded-lg ${
                  selectedInvoice.status === "已开票"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {selectedInvoice.status}
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-bold">
                  发票抬头
                </span>
                <span className="text-xs text-slate-900 font-bold text-right max-w-[60%] truncate">
                  {selectedInvoice.title}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-bold">税号</span>
                <span className="text-xs text-slate-900 font-bold text-right">
                  {selectedInvoice.taxNo}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-bold">
                  提交时间
                </span>
                <span className="text-xs text-slate-900 font-bold text-right">
                  {selectedInvoice.time}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-xs text-slate-500 font-bold">
                  接收邮箱
                </span>
                <span className="text-xs text-slate-900 font-bold text-right">
                  {selectedInvoice.email}
                </span>
              </div>
            </div>
          </div>
          {selectedInvoice.status === "已开票" && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="py-3 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all">
                <Mail size={16} /> 重新发送
              </button>
              <button
                onClick={() => setPageState("reissue_form")}
                className="py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <RefreshCw size={16} /> 申请重开
              </button>
            </div>
          )}
        </div>
      </SubPageLayout>
    );
  };

  const InvoiceCenterPage = () => {
    // ... existing InvoiceCenterPage code ...
    const [view, setView] = useState("landing");
    const history = [
      {
        id: 101,
        status: "已开票",
        amount: "299.00",
        title: "杭州未智科技有限公司",
        taxNo: "91330106MA2H...",
        time: "2023-10-27",
        email: "finance@uni-lab.com",
      },
      {
        id: 102,
        status: "开票中",
        amount: "99.00",
        title: "个人",
        taxNo: "-",
        time: "2023-10-28",
        email: "user@gmail.com",
      },
    ];

    if (view === "success") {
      return (
        <SubPageLayout blobColor1="bg-indigo-200" blobColor2="bg-blue-100">
          <div className="px-5 pt-14 pb-4 flex items-center border-b border-transparent">
            <button
              onClick={() => setView("landing")}
              className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="font-black text-base text-slate-800 tracking-tight">
              申请结果
            </h2>
          </div>
          <div className="flex-1 px-5 py-4 overflow-y-auto">
            <div className="h-full flex flex-col items-center justify-center pb-20">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 animate-in zoom-in">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-lg font-black text-slate-800">提交成功</h3>
              <p className="text-xs text-slate-400 mt-2">
                我们会尽快处理您的申请
              </p>
              <button
                onClick={() => setView("landing")}
                className="mt-8 px-8 py-3 bg-slate-100 text-slate-600 rounded-full text-xs font-bold"
              >
                返回首页
              </button>
            </div>
          </div>
        </SubPageLayout>
      );
    }
    if (view === "list") {
      return (
        <SubPageLayout blobColor1="bg-indigo-200" blobColor2="bg-blue-100">
          <div className="px-5 pt-14 pb-4 flex items-center border-b border-transparent">
            <button
              onClick={() => setView("landing")}
              className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="font-black text-base text-slate-800 tracking-tight">
              发票历史
            </h2>
          </div>
          <div className="flex-1 px-5 py-4 overflow-y-auto">
            <div className="space-y-3">
              {history.map((inv) => (
                <div
                  key={inv.id}
                  onClick={() => {
                    setSelectedInvoice(inv);
                    setProfileView("invoice_detail");
                  }}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-800">
                        ¥{inv.amount}
                      </h4>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded ${
                          inv.status === "已开票"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">
                      {inv.title}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] text-slate-300">
                      {inv.time}
                    </span>
                    <ChevronRight size={14} className="text-slate-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SubPageLayout>
      );
    }
    return (
      <SubPageLayout blobColor1="bg-indigo-200" blobColor2="bg-blue-100">
        <div className="px-5 pt-14 pb-4 flex items-center border-b border-transparent">
          <button
            onClick={() => setProfileView("default")}
            className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-black text-base text-slate-800 tracking-tight">
            发票管理
          </h2>
        </div>
        <div className="flex-1 px-5 py-4 overflow-y-auto flex flex-col">
          <div className="bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-white shadow-sm space-y-4 mb-6">
            <h3 className="text-sm font-black text-slate-800 mb-2">
              填写开票信息
            </h3>
            <div>
              <label className="text-[10px] font-bold text-slate-400 mb-1 block">
                抬头类型
              </label>
              <div className="flex gap-3">
                <button className="flex-1 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md">
                  企业单位
                </button>
                <button className="flex-1 py-2 bg-slate-100 text-slate-500 text-xs font-bold rounded-xl">
                  个人/非企业
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {["发票抬头", "税号", "接收邮箱", "备注信息"].map((label, i) => (
                <div key={i}>
                  <label className="text-[10px] font-bold text-slate-400 mb-1 block">
                    {label}
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-300 transition-all"
                    placeholder={`请输入${label}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3 mt-auto mb-8">
            <button
              onClick={() => setView("success")}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} /> 申请发票
            </button>
            <button
              onClick={() => setView("list")}
              className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <History size={16} /> 开票记录
            </button>
          </div>
        </div>
      </SubPageLayout>
    );
  };

  // --- 新增：实战精华与课程页面 (Folder 1 & 2 - Accordion Mode) ---
  // ... existing LiveEssencePage, VideoArea, FeedbackMarquee, HomeContent, DynamicContent, MyProfileContent code ...
  const LiveEssencePage = () => {
    // ... (Keep existing code unchanged) ...
    const [isVideosOpen, setIsVideosOpen] = useState(true);
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const [playingCourse, setPlayingCourse] = useState(null);
    const [trialEnded, setTrialEnded] = useState(false);

    // Mock Video Data (Folder 1)
    const videos = [
      {
        id: 1,
        title: "投资人如何看早期项目？",
        duration: "03:45",
        views: "1.2w",
        cover: "bg-blue-100",
      },
      {
        id: 2,
        title: "BP制作的三大误区解析",
        duration: "05:12",
        views: "8.5k",
        cover: "bg-purple-100",
      },
      {
        id: 3,
        title: "3分钟讲清楚你的商业模式",
        duration: "02:30",
        views: "2.3w",
        cover: "bg-orange-100",
      },
      {
        id: 4,
        title: "A轮融资估值逻辑揭秘",
        duration: "08:20",
        views: "5.6k",
        cover: "bg-emerald-100",
      },
      {
        id: 5,
        title: "如何寻找天使投资人",
        duration: "04:15",
        views: "3.1w",
        cover: "bg-indigo-100",
      },
      {
        id: 6,
        title: "SaaS产品定价策略",
        duration: "06:10",
        views: "1.9w",
        cover: "bg-pink-100",
      },
    ];

    // Mock Course Data (Folder 2)
    const courses = [
      {
        id: 1,
        title: "7天打造完美商业计划书",
        lessons: 12,
        price: 199,
        learners: 340,
        color: "from-blue-500 to-cyan-500",
      },
      {
        id: 2,
        title: "早期融资实战全攻略",
        lessons: 24,
        price: 399,
        learners: 128,
        color: "from-purple-500 to-pink-500",
      },
      {
        id: 3,
        title: "创始人股权设计与激励",
        lessons: 8,
        price: 99,
        learners: 890,
        color: "from-orange-500 to-amber-500",
      },
    ];

    // 播放逻辑
    const handlePlayCourse = (course) => {
      setPlayingCourse(course);
      setShowPlayer(true);
      setTrialEnded(false);

      if (!hasPaidPlanB) {
        // 模拟试看倒计时 (3秒后弹出付费引导)
        setTimeout(() => {
          setTrialEnded(true);
        }, 3000);
      }
    };

    const handlePlayVideo = (video) => {
      // 简单复用课程播放器逻辑，实际可区分
      setPlayingCourse(video);
      setShowPlayer(true);
      setTrialEnded(false);
    };

    return (
      <SubPageLayout blobColor1="bg-slate-200" blobColor2="bg-blue-200">
        <div className="px-5 pt-12 pb-2 flex items-center border-b border-transparent">
          <button
            onClick={() => {
              setDynamicView("default");
            }}
            className="mr-3 text-slate-800 bg-white/60 p-2 rounded-full hover:bg-white shadow-sm transition-all active:scale-90 border border-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-black text-base text-slate-800 tracking-tight">
            实战精华与课程
          </h2>
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto pb-24 scrollbar-hide">
          {/* Section 1: Live Highlights (Videos - TikTok Style Grid) */}
          <div className="mb-2">
            <div
              onClick={() => setIsVideosOpen(!isVideosOpen)}
              className="flex items-center justify-between px-5 py-4 bg-white/50 backdrop-blur-sm border-y border-slate-100 cursor-pointer active:bg-white/80 transition-colors"
            >
              <span className="font-black text-slate-800 flex items-center gap-2 text-sm">
                <PlaySquare size={18} className="text-blue-600" /> 直播精选
              </span>
              <ChevronRight
                size={18}
                className={`text-slate-400 transition-transform duration-300 ${
                  isVideosOpen ? "rotate-90 text-blue-500" : ""
                }`}
              />
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isVideosOpen
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {/* TikTok 风格 3列竖向网格 */}
              <div className="grid grid-cols-3 gap-0.5 px-0.5 pt-0.5">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => handlePlayVideo(video)}
                    className="relative aspect-[3/4] bg-slate-900 cursor-pointer group overflow-hidden"
                  >
                    {/* Mock Cover Image Area */}
                    <div
                      className={`absolute inset-0 ${video.cover} opacity-80 group-hover:opacity-100 transition-opacity`}
                    ></div>
                    {/* Dark Gradient Overlay for text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Play Count Overlay */}
                    <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-white drop-shadow-md">
                      <Play size={10} fill="white" />
                      <span className="text-[10px] font-bold">
                        {video.views}
                      </span>
                    </div>

                    {/* Title Overlay (Optional, keep it minimal like TikTok profile) */}
                    {/* <div className="absolute bottom-6 left-1.5 right-1.5 text-white text-[9px] font-bold line-clamp-2 leading-tight drop-shadow-md">
                      {video.title}
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Practical Courses */}
          <div className="mb-2">
            <div
              onClick={() => setIsCoursesOpen(!isCoursesOpen)}
              className="flex items-center justify-between px-5 py-4 bg-white/50 backdrop-blur-sm border-y border-slate-100 cursor-pointer active:bg-white/80 transition-colors"
            >
              <span className="font-black text-slate-800 flex items-center gap-2 text-sm">
                <GraduationCap size={18} className="text-purple-600" /> 实战课程
              </span>
              <ChevronRight
                size={18}
                className={`text-slate-400 transition-transform duration-300 ${
                  isCoursesOpen ? "rotate-90 text-purple-500" : ""
                }`}
              />
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isCoursesOpen
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-5 py-4 space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex gap-3 active:scale-[0.98] transition-transform"
                  >
                    <div
                      className={`w-20 h-24 rounded-xl bg-gradient-to-br ${course.color} shrink-0 flex flex-col items-center justify-center text-white shadow-md relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                      <GraduationCap size={24} className="relative z-10" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="text-sm font-black text-slate-800 leading-tight mb-1">
                          {course.title}
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          {course.lessons} 节课 · {course.learners} 人已学
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 flex items-center gap-1">
                          <Crown size={10} className="fill-amber-600" />{" "}
                          BP诊断权益
                        </span>
                        <button
                          onClick={() => handlePlayCourse(course)}
                          className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 active:scale-95 transition-all"
                        >
                          <PlayCircle size={10} /> 立即查看
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-4 bg-slate-50 rounded-2xl text-center">
                  <p className="text-[10px] text-slate-400">
                    更多课程敬请期待...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 模拟播放器 Modal - 白色背景版 */}
        {showPlayer && (
          <div className="absolute inset-0 z-[100] bg-white flex flex-col animate-in fade-in duration-300">
            {/* Header */}
            <div className="absolute top-0 w-full z-20 p-4 pt-12 flex justify-between items-start bg-gradient-to-b from-white/90 to-transparent">
              <button
                onClick={() => setShowPlayer(false)}
                className="p-2 bg-slate-100 rounded-full text-slate-600 active:scale-90 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
            </div>

            {/* Video Placeholder */}
            <div className="flex-1 flex items-center justify-center relative">
              {/* 模拟视频内容 */}
              <div
                className={`w-full aspect-video bg-slate-100 shadow-sm flex items-center justify-center relative`}
              >
                {!trialEnded ? (
                  <div className="flex flex-col items-center gap-2 animate-pulse">
                    <Play size={48} className="text-slate-300 fill-slate-300" />
                    <p className="text-slate-400 text-xs font-bold">
                      正在播放: {playingCourse?.title}
                    </p>
                    <p className="text-slate-300 text-[10px]">试看模式中...</p>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 z-30">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <Lock size={32} className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-black text-slate-800 mb-2">
                      试看结束
                    </h3>
                    <p className="text-xs text-slate-500 mb-8 leading-relaxed max-w-[200px]">
                      该课程为「深度BP诊断」专属权益
                      <br />
                      解锁诊断后即可观看完整版
                    </p>
                    <button
                      onClick={() => {
                        setShowPlayer(false);
                        setDynamicView("default");
                        setActiveTab("首页");
                        setHomeView("diagnosis"); // 跳转回首页诊断
                        setDiagStep("picking");
                        setDiagStep("idle");
                        setHasPaidPlanB(false);
                      }}
                      className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl text-sm font-black shadow-xl shadow-indigo-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles size={16} /> 立即解锁权益 (¥299)
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Controls (Mock) - 适配白色背景 */}
            {!trialEnded && (
              <div className="p-6 pb-12 bg-white border-t border-slate-50">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2 font-mono">
                  <span>00:12</span>
                  <span>15:30</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
                  <div className="h-full bg-blue-500 w-1/3 rounded-full"></div>
                </div>
                <div className="flex justify-between items-center text-slate-400 px-4">
                  <SkipBack
                    size={24}
                    className="active:scale-90 transition-transform"
                  />
                  <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
                    <Pause size={24} fill="currentColor" />
                  </div>
                  <SkipForward
                    size={24}
                    className="active:scale-90 transition-transform"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </SubPageLayout>
    );
  };

  const VideoArea = () => (
    <div className="px-4 pt-2 pb-2">
      <div className="relative w-full aspect-[2.5/1] bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer">
        <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="relative z-10 flex flex-col items-center gap-2 transition-transform group-active:scale-95">
            <div className="w-12 h-12 rounded-full bg-white shadow-lg shadow-blue-100 flex items-center justify-center border border-slate-100">
              <Play size={20} className="text-blue-600 fill-blue-600 ml-1" />
            </div>
            <div className="bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-slate-100">
              <p className="text-slate-600 text-[10px] font-bold tracking-wide flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-50 animate-pulse"></span>
                产品功能演示
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 z-10">
          <span className="bg-black/80 text-white text-[9px] px-2 py-0.5 rounded backdrop-blur-md font-medium">
            02:35
          </span>
        </div>
      </div>
    </div>
  );

  const FeedbackMarquee = () => {
    const row1 = [
      "💬 “用了之后投资人主动约我了！” —— @深空_Tech",
      "💬 “BP逻辑被投资人夸清晰！” —— @智链_林总",
      "💬 “3分钟诊断，省下5天修改时间！” —— @芯原_Jack",
    ];
    const row2 = [
      "💬 “融资建议非常专业！” —— @投研_张老师",
      "💬 “1V1线上咨询理顺了盈利模式！” —— @跨境_陈生",
      "💬 “Agent建议有深度！” —— @创研_Sarah",
    ];
    const MarqueeRow = ({ items, direction = "normal", speed = "50s" }) => (
      <div className="relative flex overflow-x-hidden py-1">
        <div
          className={`flex whitespace-nowrap ${
            direction === "normal"
              ? "animate-marquee"
              : "animate-marquee-reverse"
          }`}
          style={{ animationDuration: speed }}
        >
          {items.concat(items).map((text, i) => (
            <span
              key={i}
              className="mx-2 text-[10px] text-slate-500 font-medium bg-white/40 border border-slate-100/50 px-3 py-1.5 rounded-full shadow-sm"
            >
              {text}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
          .animate-marquee { animation: marquee linear infinite; }
          .animate-marquee-reverse { animation: marquee-reverse linear infinite; }
        `}</style>
      </div>
    );
    return (
      <section className="py-2 mt-2">
        <div className="flex flex-col items-center mb-4 px-1">
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-4 bg-slate-200"></div>
            <Quote
              size={12}
              className="text-slate-300 fill-slate-300 rotate-180"
            />
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center px-1">
              来自用户的真实反馈
            </h2>
            <Quote size={12} className="text-slate-300 fill-slate-300" />
            <div className="h-[1px] w-4 bg-slate-200"></div>
          </div>
        </div>
        <div className="space-y-1 relative bg-slate-50/30 py-2 overflow-hidden">
          <MarqueeRow items={row1} speed="45s" />
          <MarqueeRow items={row2} direction="reverse" speed="55s" />
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </div>
      </section>
    );
  };

  const HomeContent = () => (
    <div className="flex-1 overflow-y-auto pb-24 bg-white scrollbar-hide">
      <VideoArea />
      <div className="px-4 py-2 space-y-4">
        <section>
          <div className="flex items-center mb-3 px-1">
            <div className="w-1 h-3 bg-blue-600 rounded-full mr-2"></div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              已开放功能
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => setHomeView("diagnosis")}
              className="cursor-pointer relative overflow-hidden rounded-2xl p-4 shadow-lg active:scale-95 transition-all flex flex-col justify-between h-52 bg-gradient-to-br from-blue-600 to-indigo-700"
            >
              <div className="relative z-10">
                <div className="text-3xl">🧐</div>
                <div className="mt-4">
                  <h3 className="text-[14px] font-black text-white leading-tight">
                    - Uni 1.0 -<br />
                    BP深度诊断
                  </h3>
                  <p className="text-[10px] text-blue-100 mt-2 leading-tight">
                    投资人手把手
                    <br />
                    教你写BP
                  </p>
                </div>
              </div>
              <div className="relative z-10 w-full bg-white/20 backdrop-blur-md text-white text-xs font-black py-3 rounded-xl flex items-center justify-center border border-white/20 shadow-sm">
                立即使用 <ChevronRight size={12} className="ml-1" />
              </div>
            </div>
            <div
              onClick={() => setShowTicketCheckModal(true)}
              className="cursor-pointer relative overflow-hidden rounded-2xl p-4 shadow-lg active:scale-95 transition-all flex flex-col justify-between h-52 bg-gradient-to-br from-orange-400 to-amber-500"
            >
              <div className="relative z-10">
                <div className="text-3xl">📅</div>
                <div className="mt-4">
                  <h3 className="text-[14px] font-black text-white leading-tight">
                    投资人
                    <br />
                    直播诊断
                  </h3>
                  <p className="text-[10px] text-orange-100 mt-2 leading-tight">
                    合伙人级别投资人
                    <br />
                    30分钟1v1连线直播诊断
                  </p>
                </div>
              </div>
              <div className="relative z-10 w-full bg-white/20 backdrop-blur-md text-white text-xs font-black py-3 rounded-xl flex items-center justify-center border border-white/20 shadow-sm">
                立即预约 <Sparkles size={12} className="ml-1" />
              </div>
            </div>
          </div>
        </section>
        <FeedbackMarquee />
        <section>
          <div className="flex items-center mb-3 px-1">
            <div className="w-1 h-3 bg-slate-300 rounded-full mr-2"></div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              敬请期待
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { name: "投资人对练\nAgent", icon: <Users size={16} /> },
              { name: "上市公司服务\nAgent", icon: <Building2 size={16} /> },
              { name: "行业研究\nAgent", icon: <BarChart3 size={16} /> },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-xl p-3 flex flex-col items-center text-center border border-slate-100 relative group"
              >
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-slate-300 mb-2 border border-slate-50">
                  {item.icon}
                </div>
                <p className="text-[9px] font-bold text-slate-400 leading-tight whitespace-pre-line">
                  {item.name}
                </p>
                <div className="absolute top-1 right-1">
                  <Lock size={8} className="text-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const DynamicContent = () => (
    <div className="flex-1 overflow-y-auto pb-32 bg-slate-50/20 scrollbar-hide">
      <section className="bg-gradient-to-r from-blue-50 via-white to-indigo-50 pt-6 pb-6 shadow-sm border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#bfdbfe_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="px-6 relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
              <h2 className="text-xs font-black text-slate-800 tracking-normal uppercase">
                Uni 1.0 实时战报
              </h2>
            </div>
            <div className="bg-blue-100/50 border border-blue-200 px-1.5 py-0.5 rounded text-[8px] font-bold text-blue-600 tracking-wider">
              LIVE DATA
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-5 pl-8">
            {[
              {
                label: "创业者提交诊断",
                val: "320",
                icon: <Users size={12} className="text-blue-600" />,
              },
              {
                label: "投资人深度使用",
                val: "45",
                icon: <ShieldCheck size={12} className="text-indigo-600" />,
              },
              {
                label: "AI诊断报告生成",
                val: "580",
                icon: <Rocket size={12} className="text-blue-500" />,
              },
              {
                label: "诊断认可度",
                val: "99%",
                icon: <TrendingUp size={12} className="text-emerald-600" />,
              },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center border border-slate-100 shadow-sm">
                    {item.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-900 tracking-tighter">
                    {item.val}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-bold ml-1 opacity-80">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="px-4 py-4 space-y-4">
        <div className="grid grid-cols-2 gap-3 items-stretch">
          <section className="flex flex-col space-y-2">
            <div className="flex items-center px-1">
              <div className="w-1 h-2.5 bg-red-500 rounded-full mr-1.5"></div>
              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">
                直播实战精华
              </h3>
            </div>
            <div className="flex-1 bg-white rounded-[20px] overflow-hidden border border-slate-100 shadow-sm flex flex-col h-[240px]">
              <div className="relative w-full h-[140px] bg-slate-950 overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center opacity-70"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
                <div className="absolute inset-0 p-3 flex flex-col justify-between pointer-events-none">
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-full w-fit">
                    <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[6px] font-bold text-white">
                      SJ
                    </div>
                    <span className="text-white text-[6px] scale-90 origin-left truncate">
                      书君聊BP
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-white text-[8px] font-bold leading-tight drop-shadow-lg flex-1 mr-2">
                      投资人说：逻辑很扎实...
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-3 flex flex-col justify-center">
                <div className="flex gap-2 mb-2">
                  <div className="bg-blue-50 px-1.5 py-0.5 rounded-full">
                    <p className="text-blue-600 text-[8px] font-bold">
                      干货满满
                    </p>
                  </div>
                  <div className="bg-blue-50 px-1.5 py-0.5 rounded-full">
                    <p className="text-blue-600 text-[8px] font-bold">
                      逻辑透彻
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setDynamicView("essence")}
                  className="w-full py-2 bg-slate-50 text-slate-600 border border-slate-100 rounded-lg text-[9px] font-black flex items-center justify-center gap-1 active:bg-slate-100 transition-colors uppercase"
                >
                  查看点评与课程 <ChevronRight size={10} />
                </button>
              </div>
            </div>
          </section>
          <section className="flex flex-col space-y-2">
            <div className="flex items-center px-1">
              <div className="w-1 h-2.5 bg-blue-600 rounded-full mr-1.5"></div>
              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">
                最新动态
              </h3>
            </div>
            <div className="flex-1 bg-white rounded-[20px] border border-slate-100 shadow-sm p-4 flex flex-col justify-between h-[240px]">
              <div className="space-y-4">
                {[
                  { text: "陈总完成了BP初诊", time: "刚才" },
                  { text: "A轮投资人参与连麦", time: "2h前" },
                  { text: "第580份报告生成", time: "1d前" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2 group">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 shrink-0 group-first:bg-blue-600"></div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[9px] text-slate-600 font-bold leading-relaxed">
                        {item.text}
                      </p>
                      <span className="text-[8px] text-slate-300 font-bold uppercase">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-2 border border-blue-100 rounded-lg text-blue-600 text-[9px] font-black flex items-center justify-center gap-1 active:bg-blue-50 transition-colors">
                👉 完整动态
              </button>
            </div>
          </section>
        </div>
        <section className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
              <HelpCircle size={12} />
            </div>
            <h3 className="text-xs font-black text-slate-800">常见问题 FAQ</h3>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "诊断报告生成需要多久？",
                a: "通常需要 3-5 分钟，完成后会通过短信通知。",
              },
              {
                q: "如何获得直播连线机会？",
                a: "完成BP诊断后可获得直播券，用于预约导师时间。",
              },
              {
                q: "上传的BP文件安全吗？",
                a: "严格保密，仅用于AI分析，不会用于其他商业用途。",
              },
            ].map((faq, i) => (
              <div key={i} className="group">
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-black text-purple-500 mt-0.5">
                    Q.
                  </span>
                  <p className="text-[10px] font-bold text-slate-700 leading-relaxed">
                    {faq.q}
                  </p>
                </div>
                <div className="flex items-start gap-2 mt-1 pl-4">
                  <p className="text-[9px] text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
                {i !== 2 && (
                  <div className="h-[1px] bg-slate-50 w-full my-2"></div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const MyProfileContent = () => {
    // Router Logic
    if (profileView === "feedback") return <FeedbackPage />;
    if (profileView === "energy") return <EnergyPage />;
    if (profileView === "energy_bill") return <EnergyBillPage />;
    if (profileView === "agency") return <AgencyPage />;
    if (profileView === "projects") return <MyProjectsPage />;
    if (profileView === "invoice_history") return <InvoiceCenterPage />;
    if (profileView === "invoice_detail") return <InvoiceDetailPage />;
    if (profileView === "message_center") return <MessageCenterPage />;
    if (profileView === "redeem_center") return <RedeemCenterPage />;
    if (profileView === "redeem_history") return <RedeemHistoryPage />;
    if (profileView === "redemption_history") return <RedemptionHistoryPage />;
    if (profileView === "generic")
      return <GenericSubPage title={genericTitle} />;

    // Additional Routes
    if (profileView === "poster") return <SharePosterPage />;
    if (profileView === "eco") return <EcoServicePage />;

    return (
      <div className="flex-1 overflow-y-auto pb-32 bg-slate-50/5 scrollbar-hide">
        <section className="px-6 pt-8 pb-6 relative bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-50 shadow-inner overflow-hidden">
                <User size={36} className="text-slate-300" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-black text-slate-900 tracking-tight mb-1">
                  153 **** 1385
                </h2>
                <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full leading-none shrink-0 shadow-md flex items-center gap-1 w-fit">
                  <CheckCircle2
                    size={10}
                    fill="white"
                    className="text-blue-600"
                  />{" "}
                  金融从业者认证
                </span>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setProfileView("message_center")}
                className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 active:scale-90 transition-all shadow-sm"
              >
                <Bell size={18} className="text-slate-600" />
              </button>
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full border-2 border-white pointer-events-none flex items-center justify-center">
                  <span className="text-[9px] font-black text-white leading-none">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/20 rounded-full blur-[80px] -z-10"></div>
        </section>

        <section className="px-5 mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => setProfileView("projects")}
              className="relative h-36 rounded-2xl p-4 cursor-pointer active:scale-95 transition-all flex flex-col items-center justify-between overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-200"
            >
              <div className="bg-white px-4 py-1.5 rounded-full flex items-center justify-center gap-1 z-10 shadow-sm mt-1">
                <span className="text-sm">📚</span>
                <span className="text-[10px] font-black text-blue-600 tracking-widest">
                  我的报告
                </span>
              </div>
              <div className="flex flex-row items-baseline gap-1 z-10 mb-2">
                <span className="text-4xl font-black text-white tracking-tighter leading-none">
                  6
                </span>
                <span className="text-[9px] text-blue-100 font-bold opacity-80">
                  份
                </span>
              </div>
              <div className="absolute top-[-20%] right-[-20%] w-28 h-28 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            </div>

            <div
              onClick={() => setProfileView("energy")}
              className="relative h-36 rounded-2xl p-4 cursor-pointer active:scale-95 transition-all flex flex-col items-center justify-between overflow-hidden bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg shadow-orange-200"
            >
              <div className="bg-white px-4 py-1.5 rounded-full flex items-center justify-center gap-1 z-10 shadow-sm mt-1">
                <span className="text-sm">⚡</span>
                <span className="text-[10px] font-black text-orange-500 tracking-widest">
                  我的能量
                </span>
              </div>
              <div className="flex flex-row items-baseline gap-1 z-10 mb-2">
                <span className="text-3xl font-black text-white tracking-tighter leading-none">
                  {energyCount.toLocaleString()}
                </span>
                <span className="text-[9px] text-orange-100 font-bold opacity-80">
                  点
                </span>
              </div>
              <div className="absolute top-[-20%] right-[-20%] w-28 h-28 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            </div>
          </div>
        </section>

        <section className="px-8 mt-6 space-y-3">
          {[
            {
              label: "代理与协议中心",
              icon: <Users size={18} />,
              color: "text-blue-500",
              bg: "bg-blue-50/50",
              action: () => setProfileView("agency"),
            },
            {
              label: "发票中心",
              icon: <ReceiptText size={18} />,
              color: "text-indigo-500",
              bg: "bg-indigo-50/50",
              action: () => setProfileView("invoice_history"),
            },
            {
              label: "分享海报",
              icon: <Share2 size={18} />,
              color: "text-pink-500",
              bg: "bg-pink-50/50",
              action: () => {
                setGenericTitle("分享海报");
                setProfileView("poster");
              },
            },
            {
              label: "兑换中心",
              icon: <Gift size={18} />,
              color: "text-emerald-500",
              bg: "bg-emerald-50/50",
              action: () => setProfileView("redeem_center"),
            },
            {
              label: "生态服务",
              icon: <Globe size={18} />,
              color: "text-cyan-500",
              bg: "bg-cyan-50/50",
              action: () => {
                setGenericTitle("生态服务");
                setProfileView("eco");
              },
            },
            {
              label: "我要反馈",
              icon: <MessageSquareText size={18} />,
              color: "text-purple-500",
              bg: "bg-purple-50/50",
              action: () => setProfileView("feedback"),
            },
            {
              label: "帮助与客服",
              icon: <Headphones size={18} />,
              color: "text-slate-500",
              bg: "bg-slate-100",
              action: () => setShowCS(true),
            },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={item.action}
              className="group flex items-center justify-between py-4 px-6 bg-white rounded-[24px] border border-slate-50 shadow-sm active:bg-slate-50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center transition-transform group-active:scale-90`}
                >
                  <span className={item.color}>{item.icon}</span>
                </div>
                <span className="text-[14px] font-black text-slate-700 tracking-tight">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            </div>
          ))}
        </section>
        <section className="px-5 mt-14 pb-12 text-center opacity-20">
          <p className="text-[9px] font-black tracking-[0.4em] text-slate-400 flex items-center justify-center gap-2 uppercase">
            Version 1.1.9 · Lab
          </p>
        </section>
      </div>
    );
  };

  // ... rest of the code (renderContent, main return) ...
  const renderContent = () => {
    switch (activeTab) {
      case "首页":
        return homeView === "diagnosis" ? (
          <DiagnosisFlowManager />
        ) : (
          <HomeContent />
        );
      case "动态":
        if (dynamicView === "essence") return <LiveEssencePage />;
        return <DynamicContent />;
      case "我的":
        return <MyProfileContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="flex justify-center items-center bg-slate-200 min-h-screen py-10 antialiased font-sans">
      <div className="w-[393px] h-[852px] bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] flex flex-col relative overflow-hidden rounded-[55px] border-[10px] border-slate-900">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-[60] flex items-center justify-between px-4">
          <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
          <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
        </div>

        {!(activeTab === "首页" && homeView === "diagnosis") &&
          !(activeTab === "我的" && profileView !== "default") &&
          !(activeTab === "动态" && dynamicView !== "default") &&
          !showCS &&
          !showLiveBooking &&
          !showTicketCheckModal && (
            <header className="px-4 pt-12 pb-3 flex items-center justify-center border-b border-slate-50 bg-white sticky top-0 z-30">
              <h1 className="text-sm font-black text-slate-900 tracking-tight">
                国信合创Lab
              </h1>
            </header>
          )}

        {renderContent()}

        {showTicketCheckModal && (
          <TicketCheckModal
            onClose={() => setShowTicketCheckModal(false)}
            onProceed={() => {
              setShowTicketCheckModal(false);
              setShowLiveBooking(true);
            }}
            count={ticketCount}
            onNavigateToBP={() => {
              setShowTicketCheckModal(false);
              setHomeView("diagnosis");
            }}
            onViewRecords={() => {
              setShowTicketCheckModal(false);
              setShowBookingRecords(true);
            }}
          />
        )}

        {showLiveBooking && (
          <LiveBookingPage onClose={() => setShowLiveBooking(false)} />
        )}

        {showBookingRecords && (
          <BookingRecordsPage onClose={() => setShowBookingRecords(false)} />
        )}

        {showCS && <CustomerServicePage onClose={() => setShowCS(false)} />}

        {redeemModalState.visible && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-in fade-in">
            <div className="bg-white rounded-[32px] p-6 w-full max-w-xs shadow-2xl relative text-center animate-in zoom-in-95 duration-200">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border-4 mx-auto ${
                  redeemModalState.type.includes("success")
                    ? "bg-emerald-100 border-emerald-50 text-emerald-600"
                    : redeemModalState.type.includes("fail")
                    ? "bg-red-100 border-red-50 text-red-500"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {redeemModalState.type.includes("success") ? (
                  <Check size={32} />
                ) : (
                  <Ban size={32} />
                )}
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">
                {redeemModalState.title}
              </h3>
              <p className="text-xs text-slate-500 mb-4 px-2 leading-relaxed">
                {redeemModalState.desc}
              </p>
              {redeemModalState.type === "generate_success" &&
                redeemModalState.data && (
                  <div className="mb-4">
                    <div className="bg-slate-50 p-3 rounded-xl font-mono font-black text-xl mb-4 border border-slate-100 select-all">
                      {redeemModalState.data}
                    </div>
                    <button
                      onClick={() => {
                        handleCopyText(redeemModalState.data);
                        setRedeemModalState({
                          ...redeemModalState,
                          visible: false,
                        });
                      }}
                      className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
                    >
                      <Copy size={14} /> 一键复制
                    </button>
                  </div>
                )}
              {redeemModalState.type !== "generate_success" && (
                <button
                  onClick={() =>
                    setRedeemModalState({ ...redeemModalState, visible: false })
                  }
                  className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-black active:scale-95 transition-all hover:bg-slate-200"
                >
                  我知道了
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === "首页" &&
          homeView === "default" &&
          !showCS &&
          !showLiveBooking &&
          !showTicketCheckModal && (
            <DraggableCustomerService onClick={() => setShowCS(true)} />
          )}

        {!(activeTab === "我的" && profileView !== "default") &&
          !(activeTab === "动态" && dynamicView !== "default") &&
          !showCS &&
          !showLiveBooking &&
          !showTicketCheckModal && (
            <nav className="absolute bottom-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 flex justify-around items-center pt-3 pb-10 px-8 z-40">
              {[
                { label: "首页", icon: <Home size={24} /> },
                { label: "动态", icon: <Zap size={24} strokeWidth={1.5} /> },
                { label: "我的", icon: <User size={24} /> },
              ].map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => {
                    setActiveTab(tab.label);
                    if (tab.label === "首页") setHomeView("default");
                    if (tab.label === "我的") setProfileView("default");
                    if (tab.label === "动态") setDynamicView("default");
                  }}
                  className={`flex flex-col items-center transition-all ${
                    activeTab === tab.label
                      ? "text-blue-600 scale-110"
                      : "text-slate-400"
                  }`}
                >
                  <div
                    className={
                      activeTab === tab.label
                        ? "drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                        : ""
                    }
                  >
                    {tab.icon}
                  </div>
                  <span className="text-[10px] mt-1.5 font-black tracking-tighter">
                    {tab.label}
                  </span>
                </button>
              ))}
            </nav>
          )}

        <DebugConfigurator />

        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-200 rounded-full z-[60]"></div>
      </div>
    </div>
  );
};

export default App;
