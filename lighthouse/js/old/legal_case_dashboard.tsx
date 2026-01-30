import React, { useState } from 'react';
import { AlertCircle, Calendar, FileText, Briefcase, Clock, CheckCircle, AlertTriangle, ChevronLeft, ChevronRight, Download, Printer } from 'lucide-react';

// Dummy data - simulates what would come from Excel files
const dummyData = {
  cases: [
    { id: 1, name: "R v. Thompson", accused: "Michael Thompson", dob: "1985-03-15", priority: "High", status: "Trial Prep", nextCourtDate: "2025-10-20", trialDate: "2025-11-15", charges: "Assault, Breach of Probation", offenceDate: "2025-06-12", location: "Edmonton", investigator: "Cst. James Wilson", detachment: "Downtown", criminalRecord: "Yes - 2 prior assaults" },
    { id: 2, name: "R v. Chen", accused: "Lisa Chen", dob: "1992-07-22", priority: "High", status: "Active", nextCourtDate: "2025-10-15", trialDate: null, charges: "Theft Over $5000", offenceDate: "2025-08-03", location: "Edmonton", investigator: "Det. Sarah Martinez", detachment: "West", criminalRecord: "No" },
    { id: 3, name: "R v. Martinez", accused: "Carlos Martinez", dob: "1978-11-30", priority: "Medium", status: "Active", nextCourtDate: "2025-10-25", trialDate: "2025-12-01", charges: "Possession of Controlled Substance", offenceDate: "2025-07-18", location: "St. Albert", investigator: "Cst. Rebecca Tran", detachment: "St. Albert", criminalRecord: "Yes - drug possession 2020" },
    { id: 4, name: "R v. O'Brien", accused: "Patrick O'Brien", dob: "1995-02-14", priority: "Low", status: "Discovery", nextCourtDate: "2025-11-05", trialDate: null, charges: "Mischief Under $5000", offenceDate: "2025-09-01", location: "Edmonton", investigator: "Cst. David Kim", detachment: "Northeast", criminalRecord: "No" },
    { id: 5, name: "R v. Patel", accused: "Amir Patel", dob: "1988-05-09", priority: "High", status: "Trial Prep", nextCourtDate: "2025-10-18", trialDate: "2025-10-30", charges: "Fraud Over $5000, Forgery", offenceDate: "2025-05-20", location: "Edmonton", investigator: "Det. Michael O'Connor", detachment: "Financial Crimes", criminalRecord: "Yes - fraud 2018" },
    { id: 6, name: "R v. Williams", accused: "Sarah Williams", dob: "1990-12-03", priority: "Medium", status: "Active", nextCourtDate: "2025-11-10", trialDate: null, charges: "Impaired Driving", offenceDate: "2025-09-15", location: "Sherwood Park", investigator: "Cst. Jennifer Park", detachment: "Traffic", criminalRecord: "No" }
  ],
  documentRequests: [
    { id: 1, caseId: 1, caseName: "R v. Thompson", recipient: "Dr. Sarah Mitchell", type: "Medical Records", status: "Overdue", responseDeadline: "2025-10-08", priority: "High", documentsRequested: "Medical records 2023-2025, Treatment notes", documentsReceived: "Partial - 2024 only", documentsOutstanding: "2023, 2025 records" },
    { id: 2, caseId: 1, caseName: "R v. Thompson", recipient: "Officer James Liu", type: "Police Report", status: "Received", responseDeadline: "2025-10-05", priority: "High", documentsRequested: "Incident report, witness statements", documentsReceived: "All documents received", documentsOutstanding: "None" },
    { id: 3, caseId: 2, caseName: "R v. Chen", recipient: "Best Buy Security", type: "Video Footage", status: "Pending Response", responseDeadline: "2025-10-14", priority: "High", documentsRequested: "CCTV footage Aug 3, 2025", documentsReceived: "None", documentsOutstanding: "All" },
    { id: 4, caseId: 2, caseName: "R v. Chen", recipient: "Wang Electronics", type: "Sales Records", status: "Served", responseDeadline: "2025-10-18", priority: "Medium", documentsRequested: "Purchase records, inventory logs", documentsReceived: "None", documentsOutstanding: "All" },
    { id: 5, caseId: 3, caseName: "R v. Martinez", recipient: "Dr. Tom Anderson", type: "Expert Report", status: "Pending Response", responseDeadline: "2025-10-20", priority: "Medium", documentsRequested: "Toxicology analysis, expert opinion", documentsReceived: "None", documentsOutstanding: "All" },
    { id: 6, caseId: 5, caseName: "R v. Patel", recipient: "TD Bank", type: "Financial Records", status: "Overdue", responseDeadline: "2025-10-10", priority: "High", documentsRequested: "Account statements 2024-2025, transaction records", documentsReceived: "None", documentsOutstanding: "All" },
    { id: 7, caseId: 5, caseName: "R v. Patel", recipient: "Canada Post", type: "Delivery Records", status: "Pending Response", responseDeadline: "2025-10-16", priority: "High", documentsRequested: "Tracking info, delivery confirmations", documentsReceived: "None", documentsOutstanding: "All" },
    { id: 8, caseId: 6, caseName: "R v. Williams", recipient: "Alberta Health Services", type: "Blood Test Results", status: "Received", responseDeadline: "2025-10-01", priority: "Medium", documentsRequested: "Blood alcohol analysis", documentsReceived: "Complete report", documentsOutstanding: "None" },
    { id: 9, caseId: 1, caseName: "R v. Thompson", recipient: "Edmonton Police Service", type: "Body Cam Footage", status: "Pending Response", responseDeadline: "2025-10-22", priority: "High", documentsRequested: "Body camera footage from arrest", documentsReceived: "None", documentsOutstanding: "All" },
    { id: 10, caseId: 3, caseName: "R v. Martinez", recipient: "Lab Corp", type: "Drug Analysis", status: "Received", responseDeadline: "2025-10-12", priority: "Medium", documentsRequested: "Substance identification report", documentsReceived: "Complete", documentsOutstanding: "None" }
  ],
  courtDates: [
    { id: 1, caseId: 2, caseName: "R v. Chen", type: "Bail Hearing", date: "2025-10-15", time: "09:00", location: "Edmonton Provincial Court", room: "Courtroom 3" },
    { id: 2, caseId: 5, caseName: "R v. Patel", type: "Pre-Trial Conference", date: "2025-10-18", time: "14:00", location: "Edmonton Provincial Court", room: "Courtroom 1" },
    { id: 3, caseId: 1, caseName: "R v. Thompson", type: "Pre-Trial Conference", date: "2025-10-20", time: "10:30", location: "Edmonton Provincial Court", room: "Courtroom 2" },
    { id: 4, caseId: 3, caseName: "R v. Martinez", type: "Disclosure Review", date: "2025-10-25", time: "13:00", location: "Edmonton Provincial Court", room: "Courtroom 4" },
    { id: 5, caseId: 5, caseName: "R v. Patel", type: "Trial", date: "2025-10-30", time: "09:00", location: "Edmonton Provincial Court", room: "Courtroom 1" },
    { id: 6, caseId: 4, caseName: "R v. O'Brien", type: "First Appearance", date: "2025-11-05", time: "09:30", location: "Edmonton Provincial Court", room: "Courtroom 5" },
    { id: 7, caseId: 6, caseName: "R v. Williams", type: "Judicial Pre-Trial", date: "2025-11-10", time: "11:00", location: "Edmonton Provincial Court", room: "Courtroom 2" },
    { id: 8, caseId: 1, caseName: "R v. Thompson", type: "Trial", date: "2025-11-15", time: "09:00", location: "Edmonton Provincial Court", room: "Courtroom 1" },
    { id: 9, caseId: 3, caseName: "R v. Martinez", type: "Pre-Trial Conference", date: "2025-11-20", time: "10:00", location: "Edmonton Provincial Court", room: "Courtroom 3" },
    { id: 10, caseId: 2, caseName: "R v. Chen", type: "Preliminary Hearing", date: "2025-11-25", time: "09:00", location: "Edmonton Provincial Court", room: "Courtroom 4" },
    { id: 11, caseId: 6, caseName: "R v. Williams", type: "Trial", date: "2025-12-01", time: "09:00", location: "Edmonton Provincial Court", room: "Courtroom 2" },
    { id: 12, caseId: 3, caseName: "R v. Martinez", type: "Trial", date: "2025-12-01", time: "14:00", location: "Edmonton Provincial Court", room: "Courtroom 5" }
  ],
  victims: [
    { caseId: 1, name: "Jennifer Thompson", dob: "1987-08-20", relationship: "Spouse" },
    { caseId: 2, name: "Best Buy Canada", dob: "N/A", relationship: "Business" }
  ]
};

const LegalCaseDashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedCase, setSelectedCase] = useState(null);
  const [calendarMonth, setCalendarMonth] = useState(new Date('2025-10-01'));

  // Calculate dashboard metrics
  const today = new Date('2025-10-11');

  const upcomingCourtDates = dummyData.courtDates.filter(date => {
    const eventDate = new Date(date.date);
    const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
    return daysUntil >= 0 && daysUntil <= 14;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  const overdueDocuments = dummyData.documentRequests.filter(doc => {
    const deadline = new Date(doc.responseDeadline);
    return deadline < today && doc.status !== 'Received';
  });

  const urgentDocuments = dummyData.documentRequests.filter(doc => {
    const deadline = new Date(doc.responseDeadline);
    const daysUntil = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return daysUntil >= 0 && daysUntil <= 7 && doc.status !== 'Received';
  });

  const highPriorityCases = dummyData.cases.filter(c => c.priority === 'High');

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-orange-600';
      case 'Low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Received': return 'bg-green-100 text-green-800';
      case 'Pending Response': return 'bg-yellow-100 text-yellow-800';
      case 'Served': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysUntil = (dateString) => {
    const date = new Date(dateString);
    const days = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days} days`;
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  };

  const getEventsForDate = (date) => {
    const dateStr = `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return dummyData.courtDates.filter(event => event.date === dateStr);
  };

  // Get color for case
  const getCaseColor = (caseId) => {
    const colors = [
      { bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-800' },
      { bg: 'bg-purple-100', border: 'border-purple-400', text: 'text-purple-800' },
      { bg: 'bg-green-100', border: 'border-green-400', text: 'text-green-800' },
      { bg: 'bg-orange-100', border: 'border-orange-400', text: 'text-orange-800' },
      { bg: 'bg-pink-100', border: 'border-pink-400', text: 'text-pink-800' },
      { bg: 'bg-cyan-100', border: 'border-cyan-400', text: 'text-cyan-800' }
    ];
    return colors[(caseId - 1) % colors.length];
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(calendarMonth);
    const firstDay = getFirstDayOfMonth(calendarMonth);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="min-h-24 bg-gray-50 border border-gray-200"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const events = getEventsForDate(day);
      const dateStr = `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = dateStr === '2025-10-11';

      days.push(
        <div key={day} className={`min-h-24 border border-gray-200 p-2 ${isToday ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-50 transition`}>
          <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>{day}</div>
          <div className="space-y-1">
            {events.map(event => {
              const color = getCaseColor(event.caseId);
              return (
                <div key={event.id} className={`text-xs ${color.bg} ${color.text} px-1 py-0.5 rounded truncate border-l-2 ${color.border}`} title={`${event.type} - ${event.caseName}`}>
                  {event.time} {event.type}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg">
        <div className="max-w-[1800px] mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Briefcase className="w-7 h-7" />
              <h1 className="text-xl font-semibold">Legal Case Management</h1>
            </div>
            <div className="text-sm text-slate-300">Saturday, October 11, 2025</div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-[1800px] mx-auto px-8">
          <div className="flex gap-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Briefcase },
              { id: 'cases', label: 'Cases', icon: FileText },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'calendar', label: 'Calendar', icon: Calendar },
              { id: 'trial-prep', label: 'Trial Prep', icon: CheckCircle }
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
                    activeView === item.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => setActiveView('progress')}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
                activeView === 'progress'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Progress & Dependencies
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-8 py-6">
        {activeView === 'dashboard' && (
          <div className="space-y-4">
            {/* Compact Stats Row */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 font-medium uppercase">Active Cases</p>
                    <p className="text-2xl font-bold text-gray-900 mt-0.5">{dummyData.cases.length}</p>
                  </div>
                  <Briefcase className="w-8 h-8 text-blue-500 opacity-80" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 font-medium uppercase">Overdue Docs</p>
                    <p className="text-2xl font-bold text-red-600 mt-0.5">{overdueDocuments.length}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-500 opacity-80" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 font-medium uppercase">Court (14d)</p>
                    <p className="text-2xl font-bold text-gray-900 mt-0.5">{upcomingCourtDates.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-500 opacity-80" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 font-medium uppercase">High Priority</p>
                    <p className="text-2xl font-bold text-gray-900 mt-0.5">{highPriorityCases.length}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-orange-500 opacity-80" />
                </div>
              </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* Overdue Documents - Compact */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200 bg-red-50">
                  <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    Overdue Documents ({overdueDocuments.length})
                  </h2>
                </div>
                <div className="p-3 max-h-96 overflow-y-auto">
                  {overdueDocuments.length === 0 ? (
                    <p className="text-gray-500 text-center py-8 text-sm">No overdue documents</p>
                  ) : (
                    <div className="space-y-2">
                      {overdueDocuments.map(doc => (
                        <div key={doc.id} className="border-l-3 border-red-500 bg-red-50 p-3 rounded text-sm">
                          <div className="flex justify-between items-start gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-gray-900 truncate">{doc.recipient}</p>
                              <p className="text-xs text-gray-600 truncate">{doc.caseName}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{doc.type}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-xs text-red-600 font-semibold whitespace-nowrap">{formatDate(doc.responseDeadline)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Urgent Documents */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200 bg-orange-50">
                  <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    Due Within 7 Days ({urgentDocuments.length})
                  </h2>
                </div>
                <div className="p-3 max-h-96 overflow-y-auto">
                  {urgentDocuments.length === 0 ? (
                    <p className="text-gray-500 text-center py-8 text-sm">No urgent documents</p>
                  ) : (
                    <div className="space-y-2">
                      {urgentDocuments.map(doc => (
                        <div key={doc.id} className="border-l-3 border-orange-500 bg-orange-50 p-3 rounded text-sm">
                          <div className="flex justify-between items-start gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-gray-900 truncate">{doc.recipient}</p>
                              <p className="text-xs text-gray-600 truncate">{doc.caseName}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{doc.type}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-xs text-orange-600 font-semibold whitespace-nowrap">{getDaysUntil(doc.responseDeadline)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Upcoming Court Dates */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200 bg-blue-50">
                  <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    Next 14 Days ({upcomingCourtDates.length})
                  </h2>
                </div>
                <div className="p-3 max-h-96 overflow-y-auto">
                  {upcomingCourtDates.length === 0 ? (
                    <p className="text-gray-500 text-center py-8 text-sm">No upcoming court dates</p>
                  ) : (
                    <div className="space-y-2">
                      {upcomingCourtDates.map(event => {
                        const daysUntil = getDaysUntil(event.date);
                        const isUrgent = daysUntil === 'Today' || daysUntil === 'Tomorrow' || (typeof daysUntil === 'string' && parseInt(daysUntil) <= 3);

                        return (
                          <div key={event.id} className={`border-l-3 p-3 rounded text-sm ${isUrgent ? 'border-orange-500 bg-orange-50' : 'border-blue-500 bg-blue-50'}`}>
                            <div className="flex justify-between items-start gap-2">
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-gray-900 truncate">{event.type}</p>
                                <p className="text-xs text-gray-600 truncate">{event.caseName}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{event.time} • {event.room}</p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-xs font-semibold text-gray-900 whitespace-nowrap">{formatDate(event.date)}</p>
                                <p className={`text-xs font-semibold mt-0.5 ${isUrgent ? 'text-orange-600' : 'text-blue-600'}`}>{daysUntil}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* High Priority Cases - Full Width Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  High Priority Cases ({highPriorityCases.length})
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Case</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Accused</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Charges</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Next Court</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Trial Date</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {highPriorityCases.map(caseItem => (
                      <tr key={caseItem.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 font-semibold text-gray-900">{caseItem.name}</td>
                        <td className="px-4 py-2 text-gray-900">{caseItem.accused}</td>
                        <td className="px-4 py-2 text-gray-600">{caseItem.charges}</td>
                        <td className="px-4 py-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                            {caseItem.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-gray-900">{caseItem.nextCourtDate ? formatDate(caseItem.nextCourtDate) : '-'}</td>
                        <td className="px-4 py-2 text-gray-900">{caseItem.trialDate ? formatDate(caseItem.trialDate) : '-'}</td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => {
                              setSelectedCase(caseItem);
                              setActiveView('case-detail');
                            }}
                            className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                          >
                            View →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeView === 'cases' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">All Cases</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Case Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Accused</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Charges</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Priority</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Next Court</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Trial Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dummyData.cases.map(caseItem => (
                    <tr key={caseItem.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <button
                          onClick={() => {
                            setSelectedCase(caseItem);
                            setActiveView('case-detail');
                          }}
                          className="font-semibold text-blue-600 hover:text-blue-800"
                        >
                          {caseItem.name}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-gray-900">{caseItem.accused}</td>
                      <td className="px-4 py-3 text-gray-600">{caseItem.charges}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-800">
                          {caseItem.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${getPriorityColor(caseItem.priority)}`}>
                          {caseItem.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900">
                        {caseItem.nextCourtDate ? formatDate(caseItem.nextCourtDate) : '-'}
                      </td>
                      <td className="px-4 py-3 text-gray-900">
                        {caseItem.trialDate ? formatDate(caseItem.trialDate) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeView === 'case-detail' && selectedCase && (
          <div>
            <button
              onClick={() => setActiveView('cases')}
              className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 text-sm"
            >
              ← Back to Cases
            </button>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">{selectedCase.name}</h2>
                <p className="text-gray-600 mt-1">{selectedCase.accused}</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Status</p>
                    <p className="text-gray-900 mt-1">{selectedCase.status}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Priority</p>
                    <p className={`mt-1 font-semibold ${getPriorityColor(selectedCase.priority)}`}>
                      {selectedCase.priority}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Charges</p>
                    <p className="text-gray-900 mt-1">{selectedCase.charges}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Next Court Date</p>
                    <p className="text-gray-900 mt-1">
                      {selectedCase.nextCourtDate ? formatDate(selectedCase.nextCourtDate) : 'Not scheduled'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Trial Date</p>
                    <p className="text-gray-900 mt-1">
                      {selectedCase.trialDate ? formatDate(selectedCase.trialDate) : 'Not scheduled'}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents for this Case</h3>
                  <div className="space-y-3">
                    {dummyData.documentRequests
                      .filter(doc => doc.caseId === selectedCase.id)
                      .map(doc => (
                        <div key={doc.id} className="border border-gray-200 rounded p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-gray-900">{doc.recipient}</p>
                              <p className="text-sm text-gray-600">{doc.type}</p>
                            </div>
                            <div className="text-right">
                              <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(doc.status)}`}>
                                {doc.status}
                              </span>
                              <p className="text-sm text-gray-600 mt-1">Due {formatDate(doc.responseDeadline)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Court Dates for this Case</h3>
                  <div className="space-y-3">
                    {dummyData.courtDates
                      .filter(date => date.caseId === selectedCase.id)
                      .map(event => (
                        <div key={event.id} className="border border-gray-200 rounded p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-gray-900">{event.type}</p>
                              <p className="text-sm text-gray-600">{event.location}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-gray-900">{formatDate(event.date)}</p>
                              <p className="text-xs text-gray-600">{event.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'documents' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Document Requests</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Case</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Recipient</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Response Deadline</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dummyData.documentRequests.map(doc => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{doc.caseName}</td>
                      <td className="px-4 py-3 text-gray-900">{doc.recipient}</td>
                      <td className="px-4 py-3 text-gray-600">{doc.type}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900">{formatDate(doc.responseDeadline)}</td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${getPriorityColor(doc.priority)}`}>
                          {doc.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeView === 'calendar' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Court Calendar</h2>
                <div className="flex items-center gap-4">
                  <button onClick={previousMonth} className="p-1 hover:bg-gray-100 rounded">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="font-semibold text-gray-900 min-w-32 text-center">
                    {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-7 gap-0">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-semibold text-sm text-gray-700 py-2 border border-gray-200 bg-gray-50">
                      {day}
                    </div>
                  ))}
                  {renderCalendar()}
                </div>
              </div>
            </div>

            {/* Events List Below Calendar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">All Scheduled Events</h2>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {dummyData.courtDates
                    .filter(event => {
                      const eventDate = new Date(event.date);
                      return eventDate.getMonth() === calendarMonth.getMonth() &&
                             eventDate.getFullYear() === calendarMonth.getFullYear();
                    })
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map(event => {
                      const daysUntil = getDaysUntil(event.date);
                      const isUrgent = daysUntil === 'Today' || daysUntil === 'Tomorrow' || (typeof daysUntil === 'string' && parseInt(daysUntil) <= 3);

                      return (
                        <div key={event.id} className={`border-l-4 p-4 rounded ${isUrgent ? 'border-orange-500 bg-orange-50' : 'border-blue-500 bg-blue-50'}`}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <p className="font-semibold text-gray-900">{event.type}</p>
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${isUrgent ? 'bg-orange-200 text-orange-800' : 'bg-blue-200 text-blue-800'}`}>
                                  {daysUntil}
                                </span>
                              </div>
                              <p className="text-gray-900 font-medium mt-1">{event.caseName}</p>
                              <p className="text-sm text-gray-600 mt-1">{event.location} • {event.room}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">{formatDate(event.date)}</p>
                              <p className="text-sm text-gray-600 mt-1">{event.time}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'progress' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Case Progress & Dependencies</h2>
              <p className="text-sm text-gray-600 mb-6">Track the progression of cases through the criminal justice system. Click on a case to view its full timeline and dependencies.</p>

              <div className="space-y-6">
                {dummyData.cases.map(caseItem => {
                  const color = getCaseColor(caseItem.id);
                  const caseEvents = dummyData.courtDates
                    .filter(e => e.caseId === caseItem.id)
                    .sort((a, b) => new Date(a.date) - new Date(b.date));

                  // Define standard milestones
                  const milestones = [
                    { id: 'charges', label: 'Charges Laid', completed: true },
                    { id: 'bail', label: 'Bail Hearing', completed: caseEvents.some(e => e.type === 'Bail Hearing'), blocked: false },
                    { id: 'first', label: 'First Appearance', completed: true },
                    { id: 'disclosure', label: 'Disclosure Complete', completed: caseItem.status !== 'Discovery', blocked: false },
                    { id: 'pretrial', label: 'Pre-Trial Conference', completed: caseEvents.some(e => e.type === 'Pre-Trial Conference' && new Date(e.date) < today), blocked: !caseEvents.some(e => e.type === 'Pre-Trial Conference') },
                    { id: 'documents', label: 'All Documents Received', completed: !dummyData.documentRequests.filter(d => d.caseId === caseItem.id).some(d => d.status !== 'Received'), blocked: false },
                    { id: 'resolution', label: 'Case Resolution Attempted', completed: caseItem.status === 'Trial Prep' || caseItem.trialDate !== null, blocked: false },
                    { id: 'trial', label: 'Trial', completed: caseItem.trialDate && new Date(caseItem.trialDate) < today, blocked: caseItem.trialDate === null }
                  ];

                  const completedCount = milestones.filter(m => m.completed).length;
                  const progressPercent = (completedCount / milestones.length) * 100;

                  return (
                    <div key={caseItem.id} className={`border-l-4 rounded-lg ${color.border} ${color.bg} p-5`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{caseItem.name}</h3>
                          <p className="text-sm text-gray-700 mt-1">{caseItem.accused} • {caseItem.charges}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${caseItem.priority === 'High' ? 'bg-red-100 text-red-800' : caseItem.priority === 'Medium' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-700'}`}>
                              {caseItem.priority} Priority
                            </span>
                            <span className="text-xs font-semibold px-2 py-1 rounded bg-white text-gray-700">
                              {caseItem.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-gray-900">{Math.round(progressPercent)}%</div>
                          <div className="text-xs text-gray-600 mt-1">{completedCount}/{milestones.length} Complete</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>

                      {/* Milestone Timeline */}
                      <div className="space-y-3">
                        {milestones.map((milestone, idx) => (
                          <div key={milestone.id} className="flex items-start gap-3">
                            <div className="flex flex-col items-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                                milestone.completed
                                  ? 'bg-green-500 border-green-500'
                                  : milestone.blocked
                                  ? 'bg-gray-300 border-gray-300'
                                  : 'bg-white border-blue-500'
                              }`}>
                                {milestone.completed && <CheckCircle className="w-4 h-4 text-white" />}
                                {milestone.blocked && <Clock className="w-4 h-4 text-gray-600" />}
                              </div>
                              {idx < milestones.length - 1 && (
                                <div className={`w-0.5 h-8 ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              )}
                            </div>
                            <div className="flex-1 pt-0.5">
                              <div className="flex items-center justify-between">
                                <p className={`font-semibold text-sm ${
                                  milestone.completed
                                    ? 'text-green-700'
                                    : milestone.blocked
                                    ? 'text-gray-500'
                                    : 'text-gray-900'
                                }`}>
                                  {milestone.label}
                                  {milestone.blocked && <span className="ml-2 text-xs">(Pending)</span>}
                                </p>
                                {milestone.id === 'trial' && caseItem.trialDate && (
                                  <span className="text-xs text-gray-600">{formatDate(caseItem.trialDate)}</span>
                                )}
                                {milestone.id === 'documents' && (
                                  <span className="text-xs text-gray-600">
                                    {dummyData.documentRequests.filter(d => d.caseId === caseItem.id && d.status === 'Received').length}/
                                    {dummyData.documentRequests.filter(d => d.caseId === caseItem.id).length} received
                                  </span>
                                )}
                              </div>

                              {/* Show dependencies/blockers */}
                              {milestone.id === 'trial' && !milestone.completed && dummyData.documentRequests.filter(d => d.caseId === caseItem.id && d.status !== 'Received').length > 0 && (
                                <div className="mt-2 text-xs bg-yellow-50 border border-yellow-200 rounded p-2">
                                  <p className="font-semibold text-yellow-800 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    Blockers:
                                  </p>
                                  <ul className="mt-1 space-y-0.5 text-yellow-700">
                                    {dummyData.documentRequests
                                      .filter(d => d.caseId === caseItem.id && d.status !== 'Received')
                                      .slice(0, 3)
                                      .map(doc => (
                                        <li key={doc.id}>• {doc.type} from {doc.recipient} - {doc.status}</li>
                                      ))}
                                  </ul>
                                </div>
                              )}

                              {milestone.id === 'pretrial' && caseEvents.some(e => e.type === 'Pre-Trial Conference') && (
                                <p className="text-xs text-gray-600 mt-1">
                                  Scheduled: {formatDate(caseEvents.find(e => e.type === 'Pre-Trial Conference').date)}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Quick Actions */}
                      <div className="mt-4 pt-4 border-t border-gray-300 flex gap-2">
                        <button className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Add Court Date
                        </button>
                        <button className="text-xs px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          Add Document Request
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCase(caseItem);
                            setActiveView('case-detail');
                          }}
                          className="text-xs px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                        >
                          View Full Details →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Milestone Legend</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-green-500 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white border-2 border-blue-500"></div>
                  <span className="text-gray-700">In Progress / Upcoming</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-gray-300 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-gray-700">Blocked / Pending</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                <p><strong>Note:</strong> Dependencies are automatically calculated based on court dates, document status, and case progress. Yellow blocker boxes show what's preventing the next milestone.</p>
              </div>
            </div>
          </div>
        )}

        {activeView === 'trial-prep' && (
          <div className="space-y-4">
            {/* Case Selection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Select Case for Trial Preparation</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-3">
                  {dummyData.cases
                    .filter(c => c.status === 'Trial Prep' || c.trialDate)
                    .map(caseItem => (
                      <button
                        key={caseItem.id}
                        onClick={() => setSelectedCase(caseItem)}
                        className={`text-left border-2 rounded p-3 transition ${
                          selectedCase?.id === caseItem.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className="font-semibold text-gray-900 text-sm">{caseItem.name}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{caseItem.accused}</p>
                        {caseItem.trialDate && (
                          <p className="text-xs text-blue-600 font-semibold mt-1">Trial: {formatDate(caseItem.trialDate)}</p>
                        )}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {/* Trial Prep Document Preview */}
            {selectedCase && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Trial Preparation Document - {selectedCase.name}</h2>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">
                      <Printer className="w-4 h-4" />
                      Print
                    </button>
                  </div>
                </div>
                <div className="p-6 max-w-4xl mx-auto space-y-6">
                  {/* Preliminary Details */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">PRELIMINARY DETAILS</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Information Number:</span>
                        <span className="ml-2 text-gray-700">[To be filled]</span>
                      </div>
                      <div>
                        <span className="font-semibold">Accused:</span>
                        <span className="ml-2 text-gray-700">{selectedCase.accused}</span>
                      </div>
                      <div>
                        <span className="font-semibold">DOB:</span>
                        <span className="ml-2 text-gray-700">{selectedCase.dob}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Charge(s):</span>
                        <span className="ml-2 text-gray-700">{selectedCase.charges}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Offence Date:</span>
                        <span className="ml-2 text-gray-700">{formatDate(selectedCase.offenceDate)}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Location:</span>
                        <span className="ml-2 text-gray-700">{selectedCase.location}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Investigator:</span>
                        <span className="ml-2 text-gray-700">{selectedCase.investigator}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Detachment:</span>
                        <span className="ml-2 text-gray-700">{selectedCase.detachment}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="font-semibold">Criminal Record:</span>
                        <span className="ml-2 text-gray-700">{selectedCase.criminalRecord}</span>
                      </div>
                    </div>
                  </div>

                  {/* Victim Information */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">VICTIM INFORMATION</h3>
                    {dummyData.victims.filter(v => v.caseId === selectedCase.id).map((victim, idx) => (
                      <div key={idx} className="mb-3 text-sm">
                        <p className="font-semibold">Victim {idx + 1}:</p>
                        <div className="ml-4 mt-1 space-y-1">
                          <p><span className="font-semibold">Name:</span> {victim.name}</p>
                          <p><span className="font-semibold">DOB:</span> {victim.dob}</p>
                          <p><span className="font-semibold">Relationship to Accused:</span> {victim.relationship}</p>
                        </div>
                      </div>
                    ))}
                    {dummyData.victims.filter(v => v.caseId === selectedCase.id).length === 0 && (
                      <p className="text-sm text-gray-500 italic">No victim information available</p>
                    )}
                  </div>

                  {/* Witness List */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">WITNESS LIST</h3>
                    <div className="space-y-2 text-sm">
                      {dummyData.documentRequests
                        .filter(doc => doc.caseId === selectedCase.id && (doc.type.includes('Witness') || doc.recipient.includes('Officer') || doc.recipient.includes('Dr.')))
                        .map((doc, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="font-semibold">{idx + 1}.</span>
                            <div>
                              <p className="font-medium">{doc.recipient}</p>
                              <p className="text-xs text-gray-600">{doc.type}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Exhibit List */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">EXHIBIT LIST</h3>
                    <div className="space-y-2 text-sm">
                      {dummyData.documentRequests
                        .filter(doc => doc.caseId === selectedCase.id && doc.status === 'Received')
                        .map((doc, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="font-semibold">Exhibit {String.fromCharCode(65 + idx)}:</span>
                            <p>{doc.type} from {doc.recipient}</p>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Court Dates */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">COURT DATES</h3>
                    <div className="space-y-2 text-sm">
                      {dummyData.courtDates
                        .filter(event => event.caseId === selectedCase.id)
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((event, idx) => (
                          <div key={idx}>
                            <p><span className="font-semibold">{event.type}:</span> {formatDate(event.date)} at {event.time}</p>
                            <p className="text-xs text-gray-600 ml-4">{event.location}, {event.room}</p>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Sections to be filled */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">FACTS/THEORY</h3>
                    <p className="text-sm text-gray-500 italic">[To be completed during trial preparation]</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">ELEMENTS OF OFFENCE</h3>
                    <p className="text-sm text-gray-500 italic">[To be completed during trial preparation]</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">LEGAL ISSUES/DEFENSES</h3>
                    <p className="text-sm text-gray-500 italic">[To be completed during trial preparation]</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">EXAMINATION IN CHIEF</h3>
                    <p className="text-sm text-gray-500 italic">[To be completed during trial preparation]</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">CROSS EXAMINATION</h3>
                    <p className="text-sm text-gray-500 italic">[To be completed during trial preparation]</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">CLOSING SUBMISSIONS</h3>
                    <p className="text-sm text-gray-500 italic">[To be completed during trial preparation]</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default LegalCaseDashboard;
