import React, { useState } from 'react';
import { 
  UserCheck, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  LogOut, 
  LogIn, 
  ShieldCheck, 
  User, 
  FileText, 
  Search, 
  Filter, 
  PhoneCall, 
  Calendar,
  BarChart3,
  Users,
  School,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Download,
  AlertTriangle,
  RotateCcw,
  QrCode,
  X,
  Share2
} from 'lucide-react';

// Sample Students Data
const initialStudents = [
  { id: 'S101', name: '김민준', grade: 2, room: '302호', parentName: '김철수', parentPhone: '010-1234-5678', pin: '1234' },
  { id: 'S102', name: '이서연', grade: 1, room: '205호', parentName: '이영희', parentPhone: '010-2345-6789', pin: '5678' },
  { id: 'S103', name: '박도현', grade: 3, room: '410호', parentName: '박성진', parentPhone: '010-3456-7890', pin: '9012' },
  { id: 'S104', name: '최지우', grade: 2, room: '308호', parentName: '최은경', parentPhone: '010-4567-8901', pin: '3456' },
  { id: 'S105', name: '정현우', grade: 1, room: '201호', parentName: '정동식', parentPhone: '010-5678-9012', pin: '7890' }
];

// Sample Requests Data
const initialRequests = [
  {
    id: 'REQ-001',
    studentId: 'S101',
    studentName: '김민준',
    room: '302호',
    grade: 2,
    type: '외출',
    destination: '태백시 황지동 (병원 진료 및 대형마트)',
    reason: '치과 정기 검진 및 생필품 구매',
    outTime: '2026-10-28 14:00',
    returnTime: '2026-10-28 18:30',
    date: '2026-10-28',
    month: '2026-10',
    parentName: '김철수',
    parentApproved: true,
    parentApprovedAt: '2026-10-28 10:15',
    supervisorApproved: true,
    supervisorApprovedAt: '2026-10-28 11:00',
    returned: true,
    returnConfirmedBySupervisor: true,
    status: '복귀완료'
  },
  {
    id: 'REQ-002',
    studentId: 'S102',
    studentName: '이서연',
    room: '205호',
    grade: 1,
    type: '외박',
    destination: '서울시 서초구 (자택)',
    reason: '주말 친척 결혼식 참석',
    outTime: '2026-10-31 09:00',
    returnTime: '2026-11-01 19:00',
    date: '2026-10-31',
    month: '2026-10',
    parentName: '이영희',
    parentApproved: true,
    parentApprovedAt: '2026-10-28 09:30',
    supervisorApproved: true,
    supervisorApprovedAt: '2026-10-28 10:00',
    returned: false,
    returnConfirmedBySupervisor: false,
    status: '승인완료'
  },
  {
    id: 'REQ-003',
    studentId: 'S103',
    studentName: '박도현',
    room: '410호',
    grade: 3,
    type: '외출',
    destination: '강릉시 교동 (안경점)',
    reason: '안경 파손으로 인한 새로 맞춤',
    outTime: '2026-10-28 16:00',
    returnTime: '2026-10-28 20:00',
    date: '2026-10-28',
    month: '2026-10',
    parentName: '박성진',
    parentApproved: false,
    parentApprovedAt: null,
    supervisorApproved: false,
    supervisorApprovedAt: null,
    returned: false,
    returnConfirmedBySupervisor: false,
    status: '신청완료'
  },
  {
    id: 'REQ-004',
    studentId: 'S101',
    studentName: '김민준',
    room: '302호',
    grade: 2,
    type: '외박',
    destination: '원주시 무실동 (자택)',
    reason: '가족 행사 및 기숙사 정기 외박',
    outTime: '2026-10-17 09:00',
    returnTime: '2026-10-18 20:00',
    date: '2026-10-17',
    month: '2026-10',
    parentName: '김철수',
    parentApproved: true,
    parentApprovedAt: '2026-10-16 18:00',
    supervisorApproved: true,
    supervisorApprovedAt: '2026-10-16 20:00',
    returned: true,
    returnConfirmedBySupervisor: true,
    status: '복귀완료'
  },
  {
    id: 'REQ-005',
    studentId: 'S104',
    studentName: '최지우',
    room: '308호',
    grade: 2,
    type: '외출',
    destination: '태백시 황지동 (서점)',
    reason: '항공 정비 자격증 참고서 구매',
    outTime: '2026-10-25 13:00',
    returnTime: '2026-10-25 17:00',
    date: '2026-10-25',
    month: '2026-10',
    parentName: '최은경',
    parentApproved: true,
    parentApprovedAt: '2026-10-25 09:00',
    supervisorApproved: true,
    supervisorApprovedAt: '2026-10-25 10:00',
    returned: true,
    returnConfirmedBySupervisor: true,
    status: '복귀완료'
  },
  {
    id: 'REQ-006',
    studentId: 'S105',
    studentName: '정현우',
    room: '201호',
    grade: 1,
    type: '외박',
    destination: '경기도 성남시 (자택)',
    reason: '추석 연휴 귀가',
    outTime: '2026-09-24 16:00',
    returnTime: '2026-09-27 19:00',
    date: '2026-09-24',
    month: '2026-09',
    parentName: '정동식',
    parentApproved: true,
    parentApprovedAt: '2026-09-23 20:00',
    supervisorApproved: true,
    supervisorApprovedAt: '2026-09-24 09:00',
    returned: true,
    returnConfirmedBySupervisor: true,
    status: '복귀완료'
  }
];

// Status Badge Component
function StatusBadge({ status }) {
  let badgeStyle = "bg-slate-100 text-slate-700";
  if (status === '신청완료') badgeStyle = "bg-amber-100 text-amber-800 border border-amber-200";
  if (status === '보호자승인') badgeStyle = "bg-blue-100 text-blue-800 border border-blue-200";
  if (status === '승인완료') badgeStyle = "bg-indigo-100 text-indigo-800 border border-indigo-200";
  if (status === '복귀완료') badgeStyle = "bg-emerald-100 text-emerald-800 border border-emerald-200";
  if (status === '반려') badgeStyle = "bg-rose-100 text-rose-800 border border-rose-200";

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${badgeStyle}`}>
      {status}
    </span>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('supervisor'); // 'student', 'parent', 'supervisor'
  const [supervisorSubTab, setSupervisorSubTab] = useState('realtime'); // 'realtime', 'daily', 'monthly', 'student'
  
  const [requests, setRequests] = useState(initialRequests);
  const [students] = useState(initialStudents);

  // QR Code Modal State
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrType, setQrType] = useState('student'); // 'student' or 'parent'

  // Student Form State
  const [selectedStudentId, setSelectedStudentId] = useState('S101');
  const [type, setType] = useState('외출');
  const [destination, setDestination] = useState('');
  const [reason, setReason] = useState('');
  const [outTime, setOutTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [formMsg, setFormMsg] = useState('');

  // Parent Login / Action State
  const [parentSearchPhone, setParentSearchPhone] = useState('');
  const [parentPin, setParentPin] = useState('');
  const [verifiedParentStudent, setVerifiedParentStudent] = useState(null);
  const [parentError, setParentError] = useState('');

  // Filter State for Supervisor Realtime View
  const [statusFilter, setStatusFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  // Date / Month Management View States
  const [selectedDailyDate, setSelectedDailyDate] = useState('2026-10-28');
  const [selectedMonth, setSelectedMonth] = useState('2026-10');
  const [selectedStudentFilter, setSelectedStudentFilter] = useState('ALL');

  // Reset function to restore initial state
  const handleResetData = () => {
    setRequests(initialRequests);
    setStatusFilter('전체');
    setSearchTerm('');
  };

  // Student Outing Submission Handler
  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!destination || !reason || !outTime || !returnTime) {
      setFormMsg('❌ 모든 항목을 입력해주세요.');
      return;
    }

    const student = students.find(s => s.id === selectedStudentId);
    const dateStr = outTime.split('T')[0];
    const monthStr = dateStr.substring(0, 7);

    const newReq = {
      id: `REQ-${String(requests.length + 1).padStart(3, '0')}`,
      studentId: student.id,
      studentName: student.name,
      room: student.room,
      grade: student.grade,
      type,
      destination,
      reason,
      outTime: outTime.replace('T', ' '),
      returnTime: returnTime.replace('T', ' '),
      date: dateStr,
      month: monthStr,
      parentName: student.parentName,
      parentApproved: false,
      parentApprovedAt: null,
      supervisorApproved: false,
      supervisorApprovedAt: null,
      returned: false,
      returnConfirmedBySupervisor: false,
      status: '신청완료'
    };

    setRequests([newReq, ...requests]);
    setFormMsg('✅ 외출/외박 신청이 완료되었습니다. 보호자 승인을 진행해 주세요.');
    setDestination('');
    setReason('');
    setOutTime('');
    setReturnTime('');
    setTimeout(() => setFormMsg(''), 4000);
  };

  // Parent Auth Handler
  const handleParentAuth = (e) => {
    e.preventDefault();
    const student = students.find(
      s => s.parentPhone.replace(/-/g, '') === parentSearchPhone.replace(/-/g, '') && s.pin === parentPin
    );

    if (student) {
      setVerifiedParentStudent(student);
      setParentError('');
    } else {
      setParentError('❌ 연락처 또는 보호자 확인 PIN 번호가 일치하지 않습니다.');
    }
  };

  // Parent Approve / Reject
  const handleParentAction = (reqId, isApprove) => {
    const now = new Date().toLocaleString('ko-KR', { hour12: false });
    setRequests(requests.map(req => {
      if (req.id === reqId) {
        if (isApprove) {
          return {
            ...req,
            parentApproved: true,
            parentApprovedAt: now,
            status: '보호자승인'
          };
        } else {
          return {
            ...req,
            parentApproved: false,
            status: '반려'
          };
        }
      }
      return req;
    }));
  };

  // Delete Request Handler (Only for Unapproved or Rejected requests)
  const handleDeleteRequest = (reqId) => {
    setRequests(requests.filter(req => req.id !== reqId));
  };

  // Supervisor Final Approval
  const handleSupervisorApprove = (reqId) => {
    const now = new Date().toLocaleString('ko-KR', { hour12: false });
    setRequests(requests.map(req => {
      if (req.id === reqId) {
        return {
          ...req,
          supervisorApproved: true,
          supervisorApprovedAt: now,
          status: '승인완료'
        };
      }
      return req;
    }));
  };

  // Supervisor Direct Parent Contact Approval Toggle
  const handleSupervisorParentOverride = (reqId) => {
    const now = new Date().toLocaleString('ko-KR', { hour12: false });
    setRequests(requests.map(req => {
      if (req.id === reqId) {
        return {
          ...req,
          parentApproved: true,
          parentApprovedAt: `${now} (사감 구두확인)`,
          status: req.supervisorApproved ? '승인완료' : '보호자승인'
        };
      }
      return req;
    }));
  };

  // Student Self Return Trigger
  const handleStudentReturn = (reqId) => {
    setRequests(requests.map(req => {
      if (req.id === reqId) {
        return {
          ...req,
          returned: true,
        };
      }
      return req;
    }));
  };

  // Supervisor Final Return Confirmation
  const handleSupervisorReturnConfirm = (reqId) => {
    setRequests(requests.map(req => {
      if (req.id === reqId) {
        return {
          ...req,
          returnConfirmedBySupervisor: true,
          status: '복귀완료'
        };
      }
      return req;
    }));
  };

  // Filtered requests for Supervisor realtime view
  const filteredRequests = requests.filter(req => {
    const matchesStatus = statusFilter === '전체' || req.status === statusFilter;
    const matchesSearch = req.studentName.includes(searchTerm) || req.room.includes(searchTerm) || req.destination.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-indigo-900 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-700 p-2.5 rounded-xl border border-indigo-500/30">
              <School className="w-7 h-7 text-indigo-200" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">한국항공고등학교 꿈마루 기숙사</h1>
              <p className="text-xs text-indigo-200">외출 · 외박 스마트 통합 관리 시스템</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick QR Button */}
            <button
              onClick={() => { setQrType('student'); setShowQrModal(true); }}
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-800 hover:bg-indigo-700 text-indigo-100 rounded-xl text-xs font-semibold border border-indigo-600/50 transition"
            >
              <QrCode className="w-4 h-4 text-indigo-300" /> 모바일 QR 코드
            </button>

            {/* Role Navigation Switcher */}
            <div className="flex bg-indigo-950 p-1.5 rounded-xl border border-indigo-700/50">
              <button
                onClick={() => setActiveTab('student')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'student' ? 'bg-indigo-600 text-white shadow' : 'text-indigo-200 hover:text-white'
                }`}
              >
                <User className="w-4 h-4" /> 학생 신청
              </button>
              <button
                onClick={() => setActiveTab('parent')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'parent' ? 'bg-indigo-600 text-white shadow' : 'text-indigo-200 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> 보호자 확인
              </button>
              <button
                onClick={() => setActiveTab('supervisor')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'supervisor' ? 'bg-indigo-600 text-white shadow' : 'text-indigo-200 hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4" /> 사감 교사 관제
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* ==================== 1. STUDENT VIEW ==================== */}
        {activeTab === 'student' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-800">외출 / 외박 신청서 작성</h2>
              </div>

              {formMsg && (
                <div className={`p-4 rounded-xl text-sm mb-6 ${formMsg.startsWith('✅') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                  {formMsg}
                </div>
              )}

              <form onSubmit={handleStudentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">신청 학생 선택</label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    {students.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.grade}학년, {s.room})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">구분</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setType('외출')}
                      className={`py-2 rounded-lg text-sm font-semibold border transition ${
                        type === '외출' ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      평일/주말 외출
                    </button>
                    <button
                      type="button"
                      onClick={() => setType('외박')}
                      className={`py-2 rounded-lg text-sm font-semibold border transition ${
                        type === '외박' ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      주말 외박
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">행선지 (수기 상세 입력)</label>
                  <input
                    type="text"
                    placeholder="예: 태백시 황지동 (병원 및 안경점)"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">사유</label>
                  <textarea
                    rows={3}
                    placeholder="외출/외박 사유를 상세히 입력하세요."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">출발 예정 시간</label>
                    <input
                      type="datetime-local"
                      value={outTime}
                      onChange={(e) => setOutTime(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">복귀 예정 시간</label>
                    <input
                      type="datetime-local"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow duration-200 mt-2"
                >
                  외출 · 외박 신청하기
                </button>
              </form>
            </div>

            {/* Student Personal History & Return Status */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center justify-between">
                  <span>내 신청 현황 및 복귀 처리</span>
                  <span className="text-xs font-normal text-slate-500">실시간 처리 상태</span>
                </h3>

                <div className="space-y-4">
                  {requests.filter(r => r.studentId === selectedStudentId).length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-sm">신청한 내역이 없습니다.</div>
                  ) : (
                    requests.filter(r => r.studentId === selectedStudentId).map(req => (
                      <div key={req.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${req.type === '외출' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                              {req.type}
                            </span>
                            <span className="font-bold text-slate-800 text-sm">{req.destination}</span>
                          </div>
                          <StatusBadge status={req.status} />
                        </div>

                        <p className="text-xs text-slate-600"><strong>사유:</strong> {req.reason}</p>

                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><LogOut className="w-3.5 h-3.5" /> 출발: {req.outTime}</span>
                          <span className="flex items-center gap-1"><LogIn className="w-3.5 h-3.5" /> 복귀예정: <strong className="text-slate-700">{req.returnTime}</strong></span>
                        </div>

                        {/* Progress Stepper */}
                        <div className="pt-2 border-t border-slate-200/60 grid grid-cols-3 gap-2 text-center text-xs">
                          <div className={`p-2 rounded-lg ${req.parentApproved ? 'bg-emerald-50 text-emerald-700 font-medium' : 'bg-slate-100 text-slate-400'}`}>
                            1. 보호자 승인 {req.parentApproved ? '✓' : ''}
                          </div>
                          <div className={`p-2 rounded-lg ${req.supervisorApproved ? 'bg-emerald-50 text-emerald-700 font-medium' : 'bg-slate-100 text-slate-400'}`}>
                            2. 사감 승인 {req.supervisorApproved ? '✓' : ''}
                          </div>
                          <div className={`p-2 rounded-lg ${req.returnConfirmedBySupervisor ? 'bg-emerald-50 text-emerald-700 font-medium' : req.returned ? 'bg-amber-50 text-amber-700 font-medium' : 'bg-slate-100 text-slate-400'}`}>
                            3. 복귀 완료 {req.returnConfirmedBySupervisor ? '✓' : req.returned ? '(확인대기)' : ''}
                          </div>
                        </div>

                        {/* Delete Button for Unapproved / Rejected Requests */}
                        {!req.supervisorApproved && (
                          <div className="flex justify-end pt-1">
                            <button
                              onClick={() => handleDeleteRequest(req.id)}
                              className="px-2.5 py-1 text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-1 font-semibold transition"
                            >
                              <XCircle className="w-3.5 h-3.5" /> 미승인 신청 취소/삭제
                            </button>
                          </div>
                        )}

                        {/* Return Action Button for Student */}
                        {req.supervisorApproved && !req.returned && (
                          <button
                            onClick={() => handleStudentReturn(req.id)}
                            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow transition"
                          >
                            📍 꿈마루 기숙사 복귀 완료 체크 (사감 교사 확인 요청)
                          </button>
                        )}
                        {req.returned && !req.returnConfirmedBySupervisor && (
                          <div className="text-center py-1.5 bg-amber-50 text-amber-700 text-xs rounded-lg font-medium border border-amber-200">
                            ⏳ 복귀 완료 처리됨. 사감 교사의 최종 승인 대기 중입니다.
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. PARENT VIEW ==================== */}
        {activeTab === 'parent' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {!verifiedParentStudent ? (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">한국항공고 꿈마루 기숙사 보호자 확인</h2>
                  <p className="text-xs text-slate-500 mt-1">학생의 안전한 외출·외박을 위해 보호자 인증이 필요합니다.</p>
                </div>

                {parentError && (
                  <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-lg mb-4 text-center border border-rose-200">
                    {parentError}
                  </div>
                )}

                <form onSubmit={handleParentAuth} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">보호자 휴대폰 번호</label>
                    <input
                      type="text"
                      placeholder="010-1234-5678"
                      value={parentSearchPhone}
                      onChange={(e) => setParentSearchPhone(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">보호자 확인 PIN 번호 (4자리)</label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="숫자 4자리"
                      value={parentPin}
                      onChange={(e) => setParentPin(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none tracking-widest"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow transition"
                  >
                    자녀 외출 신청 내역 조회하기
                  </button>
                </form>

                <div className="mt-6 p-4 bg-indigo-50/50 rounded-xl text-xs text-indigo-800 border border-indigo-100 space-y-1">
                  <p className="font-bold flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-indigo-600" /> 시연용 보호자 인증 정보</p>
                  <p>• 김민준 학부모: 010-1234-5678 (PIN: 1234)</p>
                  <p>• 이서연 학부모: 010-2345-6789 (PIN: 5678)</p>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-semibold text-indigo-600">보호자 인증 완료</span>
                    <h3 className="text-lg font-bold text-slate-800">{verifiedParentStudent.name} 학생 보호자님</h3>
                  </div>
                  <button
                    onClick={() => { setVerifiedParentStudent(null); setParentSearchPhone(''); setParentPin(''); }}
                    className="text-xs text-slate-400 hover:text-slate-600 underline"
                  >
                    로그아웃
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-700">자녀의 외출 / 외박 신청 목록</h4>

                  {requests.filter(r => r.studentId === verifiedParentStudent.id).length === 0 ? (
                    <p className="text-xs text-slate-400 py-6 text-center">신청된 내역이 없습니다.</p>
                  ) : (
                    requests.filter(r => r.studentId === verifiedParentStudent.id).map(req => (
                      <div key={req.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${req.type === '외출' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                            {req.type}
                          </span>
                          <StatusBadge status={req.status} />
                        </div>

                        <div className="text-xs space-y-1 text-slate-700">
                          <p><strong>행선지:</strong> {req.destination}</p>
                          <p><strong>사유:</strong> {req.reason}</p>
                          <p><strong>출발 예정:</strong> {req.outTime}</p>
                          <p className="text-indigo-700 font-semibold"><strong>복귀 예정 시간:</strong> {req.returnTime}</p>
                        </div>

                        {/* Action Buttons */}
                        {!req.parentApproved && req.status !== '반려' && (
                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                            <button
                              onClick={() => handleParentAction(req.id, false)}
                              className="py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-lg border border-rose-200"
                            >
                              신청 거절
                            </button>
                            <button
                              onClick={() => handleParentAction(req.id, true)}
                              className="py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow"
                            >
                              보호자 허락 (승인)
                            </button>
                          </div>
                        )}

                        {req.parentApproved && (
                          <div className="p-2.5 bg-emerald-50 text-emerald-700 text-xs rounded-lg text-center font-medium border border-emerald-200">
                            ✓ {req.parentApprovedAt} 에 보호자 승인이 완료되었습니다.
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== 3. SUPERVISOR VIEW (With Analytics & Daily/Monthly Tabs) ==================== */}
        {activeTab === 'supervisor' && (
          <div className="space-y-6">
            
            {/* Navigation Tabs for Supervisor Sub-Features */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2">
              <button
                onClick={() => setSupervisorSubTab('realtime')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  supervisorSubTab === 'realtime' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <UserCheck className="w-4 h-4" /> 실시간 외출·외박 통제 대장
              </button>
              <button
                onClick={() => setSupervisorSubTab('daily')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  supervisorSubTab === 'daily' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-4 h-4" /> 일별 현황 관리
              </button>
              <button
                onClick={() => setSupervisorSubTab('monthly')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  supervisorSubTab === 'monthly' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" /> 월별 분석 통계
              </button>
              <button
                onClick={() => setSupervisorSubTab('student')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  supervisorSubTab === 'student' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Users className="w-4 h-4" /> 학생별 누적 현황
              </button>
            </div>

            {/* ---------------- 3-1. REALTIME CONTROL VIEW ---------------- */}
            {supervisorSubTab === 'realtime' && (
              <div className="space-y-6">
                {/* Top Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-slate-500 font-medium">전체 신청</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{requests.length}건</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-amber-600 font-medium">보호자 승인 대기</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{requests.filter(r => r.status === '신청완료').length}건</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-blue-600 font-medium">사감 최종 승인 대기</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{requests.filter(r => r.status === '보호자승인').length}건</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-rose-600 font-medium">복귀 확인 필요</p>
                    <p className="text-2xl font-bold text-rose-600 mt-1">{requests.filter(r => r.returned && !r.returnConfirmedBySupervisor).length}건</p>
                  </div>
                </div>

                {/* Filter Controls & Reset Button */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-lg p-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="전체">전체 상태 보기</option>
                      <option value="신청완료">신청완료 (보호자 미승인)</option>
                      <option value="보호자승인">보호자승인 (사감 대기)</option>
                      <option value="승인완료">승인완료 (외출/외박 중)</option>
                      <option value="복귀완료">복귀완료</option>
                    </select>

                    {/* Reset Button */}
                    <button
                      onClick={handleResetData}
                      className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition border border-slate-200"
                      title="데이터 및 필터 초기화"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> 대장 초기화
                    </button>
                  </div>

                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="학생 이름, 호실, 행선지 검색"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Request Management Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 text-base">한국항공고 꿈마루 실시간 외출 · 외박 종합 대장</h3>
                    <span className="text-xs text-slate-400">사감 교사 전용 관리 화면</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500">
                          <th className="p-4">학생/호실</th>
                          <th className="p-4">구분</th>
                          <th className="p-4">행선지 및 사유</th>
                          <th className="p-4">출발 / 복귀 예정 시간</th>
                          <th className="p-4">보호자 승인</th>
                          <th className="p-4">사감 승인</th>
                          <th className="p-4">복귀 확인</th>
                          <th className="p-4 text-right">관리 Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {filteredRequests.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="py-12 text-center text-slate-400">해당 조건의 신청 내역이 없습니다.</td>
                          </tr>
                        ) : (
                          filteredRequests.map(req => {
                            const student = students.find(s => s.id === req.studentId);
                            return (
                              <tr key={req.id} className="hover:bg-slate-50/80 transition">
                                <td className="p-4 font-medium text-slate-800">
                                  <div>{req.studentName} ({req.grade}학년)</div>
                                  <div className="text-[11px] text-slate-400">{req.room}</div>
                                </td>
                                <td className="p-4">
                                  <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${req.type === '외출' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                    {req.type}
                                  </span>
                                </td>
                                <td className="p-4 max-w-xs">
                                  <div className="font-semibold text-slate-800 truncate" title={req.destination}>{req.destination}</div>
                                  <div className="text-slate-500 truncate text-[11px]" title={req.reason}>{req.reason}</div>
                                </td>
                                <td className="p-4">
                                  <div className="text-slate-600">출발: {req.outTime}</div>
                                  <div className="text-indigo-700 font-bold">복귀: {req.returnTime}</div>
                                </td>
                                <td className="p-4">
                                  {req.parentApproved ? (
                                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                                      <CheckCircle2 className="w-3.5 h-3.5" /> 완료
                                    </span>
                                  ) : (
                                    <div className="space-y-1">
                                      <span className="text-amber-600 font-semibold flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" /> 미확인
                                      </span>
                                      {student && (
                                        <button
                                          onClick={() => handleSupervisorParentOverride(req.id)}
                                          className="text-[10px] text-indigo-600 hover:underline flex items-center gap-0.5"
                                          title={`보호자 연락처: ${student.parentPhone}`}
                                        >
                                          <PhoneCall className="w-3 h-3" /> 사감 대행 승인
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </td>
                                <td className="p-4">
                                  {req.supervisorApproved ? (
                                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                                      <CheckCircle2 className="w-3.5 h-3.5" /> 승인됨
                                    </span>
                                  ) : (
                                    <span className="text-slate-400 font-medium">대기 중</span>
                                  )}
                                </td>
                                <td className="p-4">
                                  {req.returnConfirmedBySupervisor ? (
                                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[11px]">
                                      복귀 완료
                                    </span>
                                  ) : req.returned ? (
                                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold text-[11px] animate-pulse">
                                      학생 복귀 (사감 확인 필요)
                                    </span>
                                  ) : (
                                    <span className="text-slate-400">미복귀</span>
                                  )}
                                </td>
                                <td className="p-4 text-right space-y-1">
                                  {/* Action 1: Final Approval */}
                                  {!req.supervisorApproved && (
                                    <div className="flex flex-col items-end gap-1">
                                      <button
                                        disabled={!req.parentApproved}
                                        onClick={() => handleSupervisorApprove(req.id)}
                                        className={`px-3 py-1.5 rounded-lg font-bold text-xs shadow-sm transition ${
                                          req.parentApproved
                                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                        }`}
                                      >
                                        사감 최종 승인
                                      </button>
                                      
                                      {/* Supervisor Delete Button */}
                                      <button
                                        onClick={() => handleDeleteRequest(req.id)}
                                        className="px-2 py-0.5 text-[11px] text-rose-600 hover:underline flex items-center gap-0.5"
                                      >
                                        <X className="w-3 h-3" /> 신청 삭제
                                      </button>
                                    </div>
                                  )}

                                  {/* Action 2: Confirm Return */}
                                  {req.supervisorApproved && !req.returnConfirmedBySupervisor && (
                                    <button
                                      onClick={() => handleSupervisorReturnConfirm(req.id)}
                                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-sm transition"
                                    >
                                      복귀 확인 승인
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- 3-2. DAILY MANAGEMENT VIEW ---------------- */}
            {supervisorSubTab === 'daily' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">일별 외출 · 외박 현황 조회</h3>
                    <p className="text-xs text-slate-500 mt-1">원하는 날짜를 선택하여 해당 일자의 이동 명단을 확인하세요.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-slate-600">조회 일자:</label>
                    <input
                      type="date"
                      value={selectedDailyDate}
                      onChange={(e) => setSelectedDailyDate(e.target.value)}
                      className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-indigo-700 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Daily Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                    <p className="text-xs font-semibold text-blue-700">당일 외출 학생</p>
                    <p className="text-3xl font-bold text-blue-900 mt-1">
                      {requests.filter(r => r.date === selectedDailyDate && r.type === '외출').length}명
                    </p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl">
                    <p className="text-xs font-semibold text-purple-700">당일 외박 학생</p>
                    <p className="text-3xl font-bold text-purple-900 mt-1">
                      {requests.filter(r => r.date === selectedDailyDate && r.type === '외박').length}명
                    </p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                    <p className="text-xs font-semibold text-emerald-700">복귀 완료 학생</p>
                    <p className="text-3xl font-bold text-emerald-900 mt-1">
                      {requests.filter(r => r.date === selectedDailyDate && r.returnConfirmedBySupervisor).length}명
                    </p>
                  </div>
                </div>

                {/* Daily List Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-100 bg-slate-50/50 font-bold text-xs text-slate-700">
                    📅 {selectedDailyDate} 외출/외박 명부
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    {requests.filter(r => r.date === selectedDailyDate).length === 0 ? (
                      <div className="py-8 text-center text-slate-400">해당 날짜에 등록된 외출/외박 내역이 없습니다.</div>
                    ) : (
                      requests.filter(r => r.date === selectedDailyDate).map(req => (
                        <div key={req.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div>
                            <span className="font-bold text-slate-800 text-sm">{req.studentName} ({req.room})</span>
                            <span className={`ml-2 px-2 py-0.5 rounded text-[11px] font-bold ${req.type === '외출' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                              {req.type}
                            </span>
                            <p className="text-slate-600 text-xs mt-1"><strong>행선지:</strong> {req.destination}</p>
                          </div>
                          <div className="text-right">
                            <StatusBadge status={req.status} />
                            <p className="text-[11px] text-slate-400 mt-1">복귀예정: {req.returnTime}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- 3-3. MONTHLY ANALYTICS VIEW ---------------- */}
            {supervisorSubTab === 'monthly' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">월별 외출 · 외박 통계 분석</h3>
                    <p className="text-xs text-slate-500 mt-1">월간 기숙사 인원 이동 통계 및 승인 현황 리포트입니다.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-slate-600">조회 월:</label>
                    <input
                      type="month"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-indigo-700 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-slate-500 font-medium">총 신청 건수</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">
                      {requests.filter(r => r.month === selectedMonth).length}건
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-blue-600 font-medium">월간 외출 횟수</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      {requests.filter(r => r.month === selectedMonth && r.type === '외출').length}회
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-purple-600 font-medium">월간 외박 횟수</p>
                    <p className="text-2xl font-bold text-purple-600 mt-1">
                      {requests.filter(r => r.month === selectedMonth && r.type === '외박').length}회
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-emerald-600 font-medium">최종 승인율</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-1">
                      {requests.filter(r => r.month === selectedMonth).length > 0 
                        ? `${Math.round((requests.filter(r => r.month === selectedMonth && r.supervisorApproved).length / requests.filter(r => r.month === selectedMonth).length) * 100)}%`
                        : '0%'}
                    </p>
                  </div>
                </div>

                {/* Grade-wise Breakdown Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="font-bold text-slate-800 text-sm">학년별 외출·외박 분포 비율</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500 font-semibold">1학년</p>
                      <p className="text-lg font-bold text-indigo-600 mt-1">
                        {requests.filter(r => r.month === selectedMonth && r.grade === 1).length}건
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500 font-semibold">2학년</p>
                      <p className="text-lg font-bold text-indigo-600 mt-1">
                        {requests.filter(r => r.month === selectedMonth && r.grade === 2).length}건
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500 font-semibold">3학년</p>
                      <p className="text-lg font-bold text-indigo-600 mt-1">
                        {requests.filter(r => r.month === selectedMonth && r.grade === 3).length}건
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- 3-4. STUDENT CUMULATIVE VIEW ---------------- */}
            {supervisorSubTab === 'student' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">학생별 누적 외출 · 외박 현황</h3>
                    <p className="text-xs text-slate-500 mt-1">개별 학생의 누적 이동 횟수 및 이력을 조회합니다.</p>
                  </div>

                  <select
                    value={selectedStudentFilter}
                    onChange={(e) => setSelectedStudentFilter(e.target.value)}
                    className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold outline-none"
                  >
                    <option value="ALL">전체 학생 보기</option>
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.room})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {students
                    .filter(s => selectedStudentFilter === 'ALL' || s.id === selectedStudentFilter)
                    .map(student => {
                      const studentReqs = requests.filter(r => r.studentId === student.id);
                      const outingCount = studentReqs.filter(r => r.type === '외출').length;
                      const overnightCount = studentReqs.filter(r => r.type === '외박').length;

                      return (
                        <div key={student.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                          <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                            <div>
                              <h4 className="font-bold text-slate-800 text-base">{student.name}</h4>
                              <p className="text-xs text-slate-500">{student.grade}학년 · {student.room}</p>
                            </div>
                            <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-md">
                              총 {studentReqs.length}회 신청
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-center text-xs">
                            <div className="bg-blue-50 p-2 rounded-lg text-blue-800 font-semibold">
                              외출: {outingCount}회
                            </div>
                            <div className="bg-purple-50 p-2 rounded-lg text-purple-800 font-semibold">
                              외박: {overnightCount}회
                            </div>
                          </div>

                          <div className="text-xs text-slate-500 pt-1 space-y-1">
                            <p><strong>보호자:</strong> {student.parentName} ({student.parentPhone})</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* QR Code Modal for Mobile Access */}
      {showQrModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <QrCode className="w-4 h-4 text-indigo-600" /> 모바일 빠른 신청/확인 QR
              </h3>
              <button 
                onClick={() => setShowQrModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={() => setQrType('student')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${qrType === 'student' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                학생 신청용
              </button>
              <button
                onClick={() => setQrType('parent')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${qrType === 'parent' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                보호자 확인용
              </button>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center border border-slate-200">
              {/* Graphic Mockup of QR Code */}
              <div className="w-44 h-44 bg-white p-3 rounded-xl shadow-inner border border-slate-200 flex flex-col items-center justify-center relative">
                <div className="grid grid-cols-5 gap-1.5 w-full h-full opacity-80">
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-200 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-200 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-200 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-200 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                  <div className="bg-indigo-200 rounded-sm"></div>
                  <div className="bg-indigo-900 rounded-sm"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-indigo-600 text-white p-2 rounded-lg font-bold text-[10px] shadow">
                    한국항공고
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-semibold mt-3 text-center">
                {qrType === 'student' ? '스마트폰 카메라로 스캔하여 외출 신청' : '보호자 전용 자녀 확인 QR'}
              </p>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold"
            >
              닫기
            </button>
          </div>
        </div>
      )}

    </div>
  );
}