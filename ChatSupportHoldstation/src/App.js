import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, CheckCircle, Clock, AlertCircle, User, Search, Send, 
  Shield, Activity, Wallet, FileText, Lock, XCircle, Smartphone, 
  MoreVertical, Battery, Wifi, Signal, ChevronLeft, Paperclip, 
  Settings, Bell, Menu, CornerDownRight, Zap
} from 'lucide-react';

// --- HOLDSTATION BRANDING ASSETS ---
const HSLogo = ({ size = 32, className = "" }) => (
  <img 
    src="https://raw.githubusercontent.com/tuancongn/Source/refs/heads/main/logo2.jpg" 
    alt="Holdstation Logo" 
    width={size} 
    height={size} 
    className={`rounded-[12px] object-cover ${className}`}
  />
);

const HSLogoText = () => (
    <div className="flex items-center space-x-2">
        <HSLogo size={28} />
        <span className="text-xl font-bold tracking-tight text-white">Holdstation<span className="text-purple-400">Support</span></span>
    </div>
);

// --- MOCK DATA ---
const INITIAL_TICKETS = [
  {
    id: 'HS-9982',
    user: 'Hùng Phạm',
    telegramId: '6230557472',
    avatar: 'HP',
    wallet: '0xa5a0...8590F',
    issueType: 'Deposit Stuck',
    chain: 'World Chain',
    status: 'processing',
    assignee: 'Me',
    priority: 'high',
    messages: [
      { id: 1, sender: 'user', text: 'Admin ơi, check giúp em lệnh nạp 500 USDC mạng World Chain với. 30p rồi chưa thấy tiền vào.', time: '10:30' },
      { id: 2, sender: 'agent', text: 'Chào Hùng, bạn gửi giúp mình TxID (Mã giao dịch) để mình kiểm tra on-chain ngay nhé.', time: '10:32' },
      { id: 3, sender: 'user', text: 'Dạ đây ạ: 0x82...99a1', time: '10:33' }
    ],
    lastTrade: { pair: 'ETH/USDC', side: 'Long', pnl: '-$120.5', leverage: '50x' },
    balance: '$1,240.50',
    riskScore: 'Low'
  },
  {
    id: 'HS-9983',
    user: 'Sarah Nguyen',
    telegramId: 'Unknown',
    avatar: 'SN',
    wallet: '0x123...ABC',
    issueType: 'KYC Issue',
    chain: 'zkSync Era',
    status: 'incoming',
    assignee: null,
    priority: 'medium',
    messages: [
      { id: 1, sender: 'system', text: 'Support session started. Queue position: 1', time: '11:00' },
      { id: 2, sender: 'user', text: 'Mình KYC báo lỗi camera không nhận diện được khuôn mặt hoài à.', time: '11:01' }
    ],
    lastTrade: { pair: 'BTC/USD', side: 'Short', pnl: '+$500.0', leverage: '20x' },
    balance: '$5,400.00',
    riskScore: 'Safe'
  }
];

// --- COMPONENT: MOBILE APP SIMULATOR (USER SIDE) ---
const MobileAppSimulator = ({ onSendMessage, messages, isTyping }) => {
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="w-[360px] h-[720px] bg-black rounded-[45px] border-[8px] border-[#1a1b1e] shadow-2xl overflow-hidden relative flex flex-col font-sans mx-auto ring-1 ring-slate-800">
      {/* iOS Status Bar */}
      <div className="bg-[#0D0E12] h-10 flex justify-between items-end px-6 pb-2 text-white text-[10px] font-bold z-10">
        <span>11:11</span>
        <div className="flex space-x-1.5 items-center">
          <Signal size={10} />
          <Wifi size={10} />
          <Battery size={10} />
        </div>
      </div>

      {/* App Header */}
      <div className="bg-[#0D0E12] px-4 py-3 flex items-center justify-between border-b border-slate-800/50 backdrop-blur-md">
        <div className="flex items-center text-white">
          <button className="p-1 hover:bg-slate-800 rounded-full mr-2 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <div>
            <div className="font-bold text-base flex items-center gap-2">
                <HSLogo size={20} /> CSKH 24/7
            </div>
            <div className="text-[10px] text-green-400 flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                Thường trả lời ngay
            </div>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-white transition-colors">
            <MoreVertical size={20} />
        </button>
      </div>

      {/* Chat Content */}
      <div className="flex-1 bg-[#050505] overflow-y-auto p-4 space-y-4 scrollbar-hide" ref={scrollRef}>
        <div className="flex justify-center my-4">
            <span className="text-[10px] text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">Hôm nay, 11:30</span>
        </div>
        
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            {msg.sender !== 'user' && msg.sender !== 'system' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white mr-2 shadow-lg shadow-purple-900/20 mt-1">
                    HS
                </div>
            )}
            
            {msg.sender === 'system' ? (
                <div className="w-full flex justify-center">
                    <span className="text-[10px] italic text-slate-500">{msg.text}</span>
                </div>
            ) : (
                <div className={`max-w-[75%] p-3.5 text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user' 
                    ? 'bg-gradient-to-tr from-purple-600 to-purple-500 text-white rounded-2xl rounded-tr-sm' 
                    : 'bg-[#1E1F25] text-slate-200 rounded-2xl rounded-tl-sm border border-slate-800'
                }`}>
                {msg.text}
                <div className={`text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-purple-200' : 'text-slate-500'}`}>
                    {msg.time}
                </div>
                </div>
            )}
          </div>
        ))}

        {isTyping && (
           <div className="flex justify-start">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white mr-2">HS</div>
              <div className="bg-[#1E1F25] p-4 rounded-2xl rounded-tl-sm border border-slate-800 flex space-x-1 items-center h-10">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
              </div>
           </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-[#0D0E12]/90 backdrop-blur-lg px-4 py-4 border-t border-slate-800/50 safe-area-bottom">
        <div className="flex items-center space-x-3 bg-[#1A1B20] p-1.5 rounded-full border border-slate-700/50 focus-within:border-purple-500/50 transition-colors">
            <button className="p-2 text-slate-400 hover:text-purple-400 transition-colors rounded-full hover:bg-slate-800">
                <Paperclip size={18} />
            </button>
            <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Nhập tin nhắn..." 
            className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-slate-500"
            />
            <button 
                onClick={handleSend} 
                disabled={!inputText.trim()}
                className={`p-2 rounded-full w-9 h-9 flex items-center justify-center transition-all ${inputText.trim() ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40 transform scale-100' : 'bg-slate-700 text-slate-500 scale-90'}`}
            >
            <Send size={16} />
            </button>
        </div>
      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-700 rounded-full"></div>
    </div>
  );
};

// --- COMPONENT: AGENT DASHBOARD (WEB ADMIN SIDE) ---
const AgentDashboard = ({ tickets, activeTicketId, onSelectTicket, onAgentReply, onClaimTicket }) => {
  const [replyText, setReplyText] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const selectedTicket = tickets.find(t => t.id === activeTicketId);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [selectedTicket?.messages]);

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;
    onAgentReply(selectedTicket.id, replyText);
    setReplyText('');
  };

  const filteredTickets = tickets.filter(t => {
      if (activeTab === 'incoming') return t.status === 'incoming';
      if (activeTab === 'processing') return t.status === 'processing';
      return true;
  });

  return (
    <div className="flex h-[750px] w-full bg-[#0B0C15] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-sans text-slate-200">
      
      {/* 1. LEFT SIDEBAR: NAVIGATION */}
      <div className="w-16 flex flex-col items-center py-6 border-r border-slate-800 bg-[#0F1016]">
        <div className="mb-8 p-2 bg-purple-900/20 rounded-xl">
             <HSLogo size={24} />
        </div>
        <nav className="flex-1 flex flex-col space-y-6 w-full items-center">
            <button className="p-3 bg-purple-600 rounded-xl text-white shadow-lg shadow-purple-900/50 transition-all hover:scale-105"><MessageSquare size={20} /></button>
            <button className="p-3 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all"><User size={20} /></button>
            <button className="p-3 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all"><Activity size={20} /></button>
            <button className="p-3 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all"><Settings size={20} /></button>
        </nav>
        <button className="mt-auto p-3 text-slate-500 hover:text-white"><Bell size={20} /></button>
        <div className="mt-4 w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 border-2 border-[#0B0C15]"></div>
      </div>

      {/* 2. TICKET LIST COLUMN */}
      <div className="w-80 border-r border-slate-800 bg-[#0F1016] flex flex-col">
        <div className="p-5 border-b border-slate-800">
           <h2 className="font-bold text-white text-lg tracking-tight mb-1">Inbox</h2>
           <div className="flex items-center text-xs text-slate-500">
             <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
             All systems operational
           </div>
        </div>
        
        {/* Search & Filter */}
        <div className="p-3">
            <div className="relative mb-3">
                <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
                <input type="text" placeholder="Search tickets..." className="w-full bg-[#1A1B23] border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-slate-600" />
            </div>
            <div className="flex bg-[#1A1B23] p-1 rounded-lg">
                {['all', 'incoming', 'processing'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 text-[10px] font-bold uppercase tracking-wider py-1.5 rounded-md transition-all ${activeTab === tab ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredTickets.map(ticket => (
            <div 
              key={ticket.id}
              onClick={() => onSelectTicket(ticket.id)}
              className={`p-4 mx-2 mb-1 rounded-xl cursor-pointer transition-all border group relative ${
                activeTicketId === ticket.id 
                ? 'bg-[#1A1B23] border-purple-500/50 shadow-lg' 
                : 'bg-transparent border-transparent hover:bg-[#1A1B23] hover:border-slate-700'
              }`}
            >
              {activeTicketId === ticket.id && <div className="absolute left-0 top-4 bottom-4 w-1 bg-purple-500 rounded-r-full"></div>}
              
              <div className="flex justify-between items-start mb-1 pl-2">
                <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${ticket.status === 'incoming' ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}></div>
                    <span className={`font-semibold text-sm ${activeTicketId === ticket.id ? 'text-white' : 'text-slate-300'}`}>{ticket.user}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">10m</span>
              </div>
              
              <div className="pl-4 text-xs text-slate-400 truncate mb-2 group-hover:text-slate-300 transition-colors">
                {ticket.messages[ticket.messages.length - 1]?.text}
              </div>
              
              <div className="pl-4 flex space-x-2">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">{ticket.chain}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">{ticket.issueType}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MAIN CHAT AREA */}
      {selectedTicket ? (
        <div className="flex-1 flex flex-col bg-[#0B0C15]">
          {/* Chat Header */}
          <div className="h-16 border-b border-slate-800 flex justify-between items-center px-6 bg-[#0B0C15]">
             <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white mr-3 border-2 border-[#0B0C15] shadow">
                    {selectedTicket.avatar}
                </div>
                <div>
                    <div className="font-bold text-white text-sm flex items-center">
                        {selectedTicket.user}
                        <a href="#" className="ml-2 text-xs font-normal text-purple-400 hover:underline flex items-center">
                            {selectedTicket.wallet.slice(0,6)}...{selectedTicket.wallet.slice(-4)}
                            <CornerDownRight size={10} className="ml-1"/>
                        </a>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center mt-0.5">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" className="w-3 h-3 mr-1 opacity-70" alt="Tele"/>
                        via App Interface
                    </div>
                </div>
             </div>
             
             {selectedTicket.status === 'incoming' ? (
                 <button 
                    onClick={() => onClaimTicket(selectedTicket.id)}
                    className="bg-purple-600 hover:bg-purple-500 text-white pl-4 pr-5 py-2 rounded-lg text-sm font-bold flex items-center shadow-lg shadow-purple-900/40 transition-all hover:scale-105"
                 >
                    <Lock size={16} className="mr-2" /> Assign to Me
                 </button>
             ) : (
                 <div className="flex items-center space-x-3">
                     <span className="text-xs text-green-400 bg-green-900/10 px-3 py-1.5 rounded-full border border-green-900/30 font-medium flex items-center">
                         <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                         Assigned to You
                     </span>
                     <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"><MoreVertical size={18}/></button>
                 </div>
             )}
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6" ref={scrollRef}>
             {/* Security Warning Banner */}
             {selectedTicket.priority === 'high' && (
                 <div className="bg-orange-900/10 border border-orange-500/20 rounded-lg p-3 flex items-start space-x-3 mb-6">
                     <AlertCircle className="text-orange-500 shrink-0" size={18} />
                     <div>
                         <h4 className="text-orange-400 text-xs font-bold uppercase mb-1">High Value Transaction Issue</h4>
                         <p className="text-slate-400 text-xs">User reported missing deposit &gt; $500. Check Paymaster logs immediately.</p>
                     </div>
                 </div>
             )}

             {selectedTicket.messages.map((msg, idx) => (
                 <div key={idx} className={`flex group ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                     {msg.sender !== 'agent' && msg.sender !== 'system' && (
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400 mr-2 mt-1">
                            {selectedTicket.avatar}
                        </div>
                     )}
                     
                     <div className={`max-w-[70%] p-4 text-sm leading-relaxed ${
                         msg.sender === 'agent' 
                         ? 'bg-purple-600 text-white rounded-2xl rounded-tr-sm shadow-md' 
                         : (msg.sender === 'system' ? 'w-full text-center text-slate-600 text-xs italic my-2' : 'bg-[#1E1F25] text-slate-200 border border-slate-700/50 rounded-2xl rounded-tl-sm')
                     }`}>
                         {msg.text}
                     </div>
                     
                     {msg.sender === 'agent' && (
                        <div className="w-8 h-8 rounded-full bg-purple-900/20 flex items-center justify-center text-xs text-purple-400 ml-2 mt-1 border border-purple-500/20">
                            Me
                        </div>
                     )}
                 </div>
             ))}
          </div>

          {/* Reply Area */}
          <div className="p-5 bg-[#0F1016] border-t border-slate-800">
              {selectedTicket.status === 'incoming' ? (
                  <div className="flex flex-col items-center justify-center py-4 text-slate-500 space-y-2 border-2 border-dashed border-slate-800 rounded-xl bg-[#1A1B23]/50">
                      <Lock size={24} className="opacity-50" />
                      <p className="text-sm">Ticket is locked. <span className="text-purple-400 font-bold cursor-pointer hover:underline" onClick={() => onClaimTicket(selectedTicket.id)}>Assign to yourself</span> to reply.</p>
                  </div>
              ) : (
                <div className="flex flex-col space-y-3">
                    {/* Canned Responses / Shortcuts */}
                    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                        <button className="whitespace-nowrap px-3 py-1 bg-[#1A1B23] hover:bg-slate-700 text-xs text-slate-400 rounded-full border border-slate-700 transition-colors">/ask_txid</button>
                        <button className="whitespace-nowrap px-3 py-1 bg-[#1A1B23] hover:bg-slate-700 text-xs text-slate-400 rounded-full border border-slate-700 transition-colors">/check_paymaster</button>
                        <button className="whitespace-nowrap px-3 py-1 bg-[#1A1B23] hover:bg-slate-700 text-xs text-slate-400 rounded-full border border-slate-700 transition-colors">/transfer_tech_team</button>
                    </div>
                    
                    <div className="relative">
                        <input 
                            className="w-full bg-[#1A1B23] border border-slate-700 rounded-xl pl-4 pr-12 py-3.5 text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
                            placeholder="Type your reply or type / for templates..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                        />
                        <button 
                            onClick={handleSendReply} 
                            disabled={!replyText.trim()}
                            className={`absolute right-2 top-2 p-1.5 rounded-lg transition-all ${replyText.trim() ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-slate-800 text-slate-600'}`}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
              )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#0B0C15] text-slate-500">
            <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <MessageSquare size={40} className="opacity-50" />
            </div>
            <p className="text-lg font-medium text-slate-400">Select a ticket from the inbox</p>
            <p className="text-sm mt-2 opacity-60">Real-time support dashboard ready</p>
        </div>
      )}

      {/* 4. RIGHT SIDEBAR: CONTEXT PANEL */}
      {selectedTicket && (
        <div className="w-72 bg-[#0F1016] border-l border-slate-800 flex flex-col p-5">
           <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">User Context</h3>
           
           {/* Wallet Card */}
           <div className="bg-gradient-to-br from-[#1A1B23] to-[#15161A] border border-slate-700 rounded-xl p-4 mb-4 shadow-lg relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Wallet size={48} />
               </div>
               <div className="flex justify-between items-start mb-2">
                   <div className="text-xs text-slate-400">Total Balance</div>
                   <div className="px-1.5 py-0.5 bg-green-900/20 border border-green-900/30 rounded text-[10px] text-green-400 font-mono">Live</div>
               </div>
               <div className="text-2xl font-bold text-white font-mono mb-1">{selectedTicket.balance}</div>
               <div className="text-[10px] text-slate-500 font-mono break-all">{selectedTicket.wallet}</div>
           </div>

           {/* Last Trade Info */}
           <div className="mb-6">
               <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-semibold text-slate-400">Last Trade (Futures)</h4>
                    <span className="text-[10px] text-slate-600">2 mins ago</span>
               </div>
               <div className="bg-[#1A1B23] border border-slate-700 rounded-lg p-3 space-y-2">
                   <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-slate-200">{selectedTicket.lastTrade.pair}</span>
                       <span className={`text-[10px] font-bold px-1.5 rounded ${selectedTicket.lastTrade.side === 'Long' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                           {selectedTicket.lastTrade.side} {selectedTicket.lastTrade.leverage}
                       </span>
                   </div>
                   <div className="flex justify-between items-center text-xs">
                       <span className="text-slate-500">PnL</span>
                       <span className={`font-mono ${selectedTicket.lastTrade.pnl.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
                           {selectedTicket.lastTrade.pnl}
                       </span>
                   </div>
               </div>
           </div>

           {/* Quick Actions */}
           <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">One-Click Actions</h3>
           <div className="space-y-2">
               <button className="w-full flex items-center px-3 py-2.5 bg-[#1A1B23] hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-slate-300 transition-colors group">
                   <Zap size={14} className="mr-2 text-yellow-500 group-hover:scale-110 transition-transform" /> Check Paymaster
               </button>
               <button className="w-full flex items-center px-3 py-2.5 bg-[#1A1B23] hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-slate-300 transition-colors group">
                   <FileText size={14} className="mr-2 text-blue-500 group-hover:scale-110 transition-transform" /> View Transaction Logs
               </button>
               <button className="w-full flex items-center px-3 py-2.5 bg-[#1A1B23] hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-slate-300 transition-colors group">
                   <Shield size={14} className="mr-2 text-purple-500 group-hover:scale-110 transition-transform" /> Verify User Device
               </button>
           </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN CONTAINER ---
const LiveSupportSystem = () => {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [activeTicketId, setActiveTicketId] = useState('HS-9983');
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  // Logic Handlers (Giữ nguyên logic cũ, chỉ thay đổi giao diện)
  const handleUserSendMessage = (text) => {
    const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const newMessage = { id: Date.now(), sender: 'user', text, time: timestamp };
    setTickets(prev => prev.map(t => t.id === 'HS-9983' ? { ...t, messages: [...t.messages, newMessage], status: t.status === 'incoming' ? 'incoming' : 'processing' } : t));
  };

  const handleAgentReply = (ticketId, text) => {
    const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const newMessage = { id: Date.now(), sender: 'agent', text, time: timestamp };
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, messages: [...t.messages, newMessage] } : t));
    
    // Giả lập hiệu ứng typing trên điện thoại khách
    if(ticketId === 'HS-9983') {
        setIsAgentTyping(true);
        setTimeout(() => setIsAgentTyping(false), 2000); // Tắt typing sau 2s để tin nhắn hiện lên (trong logic thật thì tin nhắn hiện ngay)
    }
  };

  const handleClaimTicket = (ticketId) => {
      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'processing', assignee: 'Me' } : t));
  };

  const demoTicket = tickets.find(t => t.id === 'HS-9983');

  return (
    <div className="min-h-screen bg-[#050505] p-4 md:p-8 font-sans text-slate-200">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-10 flex justify-between items-end border-b border-slate-800 pb-6">
            <div>
                <HSLogoText />
                <p className="text-slate-500 mt-2 text-sm ml-1">
                    Real-time Support Simulation Environment • <span className="text-green-500">v2.0 Stable</span>
                </p>
            </div>
            <div className="hidden md:flex space-x-4">
                <div className="text-right">
                    <div className="text-xs text-slate-500 uppercase font-bold">Average Response</div>
                    <div className="text-xl font-mono font-bold text-white">1m 32s</div>
                </div>
                <div className="text-right border-l border-slate-800 pl-4">
                    <div className="text-xs text-slate-500 uppercase font-bold">Active Agents</div>
                    <div className="text-xl font-mono font-bold text-green-400">4 Online</div>
                </div>
            </div>
        </header>

        <div className="flex flex-col xl:flex-row gap-12 items-start justify-center">
            {/* LEFT: CLIENT SIMULATOR */}
            <div className="flex flex-col items-center">
                <div className="mb-4 flex items-center space-x-2">
                    <Smartphone size={16} className="text-slate-400"/>
                    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Client View (iOS)</h3>
                </div>
                <MobileAppSimulator 
                    messages={demoTicket.messages} 
                    onSendMessage={handleUserSendMessage}
                    isTyping={isAgentTyping} // Truyền state typing xuống
                />
            </div>

            {/* RIGHT: AGENT DASHBOARD */}
            <div className="flex-1 w-full min-w-0">
                <div className="flex justify-between items-end mb-4">
                     <div className="flex items-center space-x-2">
                        <Shield size={16} className="text-purple-500"/>
                        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Agent Workspace</h3>
                     </div>
                </div>
                <AgentDashboard 
                    tickets={tickets} 
                    activeTicketId={activeTicketId}
                    onSelectTicket={setActiveTicketId}
                    onAgentReply={handleAgentReply}
                    onClaimTicket={handleClaimTicket}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default App;