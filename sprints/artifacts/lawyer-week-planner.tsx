import React, { useState } from 'react';
import { Calendar, Clock, List, ChevronLeft, ChevronRight, Plus, AlertCircle, RefreshCw, Scale, FileText, Users, BookOpen, X, GripVertical } from 'lucide-react';

const WeekPlanner = () => {
  const [activeTab, setActiveTab] = useState('scheduler');
  const [detailedView, setDetailedView] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(0);

  // Mock data - cases with assigned colors
  const cases = {
    'smith-jones': { name: 'Smith v. Jones', color: 'bg-blue-500' },
    'anderson': { name: 'Anderson Estate', color: 'bg-purple-500' },
    'martinez': { name: 'Martinez Corp', color: 'bg-green-500' },
    'wilson': { name: 'Wilson LLC', color: 'bg-orange-500' },
    'chen': { name: 'Chen Family Trust', color: 'bg-pink-500' }
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 13 }, (_, i) => i + 7); // 7 AM to 7 PM

  const mockScheduledTasks = {
    0: [ // Monday
      { id: 1, type: 'meeting', title: 'Client Meeting', caseId: 'smith-jones', startTime: '09:00', duration: 2 },
      { id: 2, type: 'document', title: 'Document Review', caseId: 'anderson', startTime: '11:30', duration: 1 },
      { id: 3, type: 'trial-prep', title: 'Trial Prep', caseId: 'martinez', startTime: '14:00', duration: 2.5 }
    ],
    1: [ // Tuesday
      { id: 4, type: 'court', title: 'Court Appearance', caseId: 'smith-jones', startTime: '09:00', duration: 4, fixed: true },
      { id: 5, type: 'trial-prep', title: 'Deposition Prep', caseId: 'wilson', startTime: '15:00', duration: 1.5 }
    ],
    2: [ // Wednesday
      { id: 6, type: 'research', title: 'Precedent Research', caseId: 'martinez', startTime: '10:00', duration: 2 },
      { id: 7, type: 'meeting', title: 'Client Call', caseId: 'chen', startTime: '13:00', duration: 1 }
    ],
    3: [], // Thursday
    4: [ // Friday
      { id: 10, type: 'meeting', title: 'New Case Intake', startTime: '09:30', duration: 2 },
      { id: 11, type: 'document', title: 'File Motion', caseId: 'anderson', startTime: '13:00', duration: 1 }
    ],
    5: [], // Saturday
    6: []  // Sunday
  };

  const unscheduledTasks = [
    { id: 12, type: 'document', title: 'Review Disclosure Package', caseId: 'wilson', duration: 2 },
    { id: 13, type: 'trial-prep', title: 'Witness Prep Call', caseId: 'martinez', duration: 1.5 },
    { id: 14, type: 'research', title: 'Legal Precedent Research', caseId: 'chen', duration: 3 },
    { id: 15, type: 'document', title: 'Draft Response Brief', caseId: 'smith-jones', duration: 4 },
    { id: 16, type: 'meeting', title: 'Team Standup', duration: 0.5 }
  ];

  const getTypeIcon = (type) => {
    const icons = {
      'court': Scale,
      'trial-prep': FileText,
      'meeting': Users,
      'document': FileText,
      'research': BookOpen,
    };
    return icons[type] || FileText;
  };

  const getTypeIconColor = (type) => {
    const colors = {
      'court': 'text-red-600',
      'trial-prep': 'text-orange-600',
      'meeting': 'text-purple-600',
      'document': 'text-blue-600',
      'research': 'text-teal-600',
    };
    return colors[type] || 'text-gray-600';
  };

  const timeToPosition = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return ((hours - 7) * 80 + (minutes / 60) * 80); // 80px per hour
  };

  // Scheduler View Component
  const SchedulerView = () => (
    <div className="flex gap-4 h-[calc(100vh-250px)]">
      {/* Main Schedule Area */}
      <div className="flex-1 overflow-auto">
        <div className="flex gap-0 min-w-max">
          {/* Time column */}
          <div className="w-16 flex-shrink-0 sticky left-0 bg-gray-50 border-r border-gray-100">
            <div className="h-12 border-b border-gray-100"></div>
            {hours.map(hour => (
              <div key={hour} className="h-20 border-t border-gray-100 text-xs text-gray-500 pt-1 px-2">
                {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
              </div>
            ))}
          </div>

          {/* Week columns */}
          {weekDays.map((day, dayIndex) => {
            const isToday = dayIndex === 1; // Mock Tuesday as today
            const tasks = mockScheduledTasks[dayIndex] || [];
            
            return (
              <div key={day} className={`flex-1 min-w-[120px] border-r border-gray-100 ${
                isToday ? 'bg-blue-50 bg-opacity-30' : ''
              }`}>
                {/* Day header */}
                <div className={`h-12 flex flex-col items-center justify-center border-b ${
                  isToday ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100'
                }`}>
                  <div className={`text-xs font-semibold ${
                    isToday ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {day}
                  </div>
                  <div className={`text-sm font-semibold ${
                    isToday ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    Oct {13 + dayIndex}
                  </div>
                </div>

                {/* Time grid */}
                <div className="relative" style={{ height: `${hours.length * 80}px` }}>
                  {/* Hour lines */}
                  {hours.map((hour, i) => (
                    <div 
                      key={hour} 
                      className="absolute w-full border-t border-gray-100 hover:bg-gray-50 transition-colors" 
                      style={{ top: `${i * 80}px`, height: '80px' }}
                    ></div>
                  ))}

                  {/* 30-minute lines (if detailed) */}
                  {detailedView && hours.map((hour, i) => (
                    <div 
                      key={`${hour}-half`} 
                      className="absolute w-full border-t border-gray-50" 
                      style={{ top: `${i * 80 + 40}px` }}
                    ></div>
                  ))}

                  {/* Scheduled Tasks */}
                  {tasks.map((task) => {
                    const top = timeToPosition(task.startTime);
                    const height = task.duration * 80;
                    const caseColor = task.caseId ? cases[task.caseId]?.color : 'bg-gray-400';
                    
                    return (
                      <div
                        key={task.id}
                        className="absolute left-0.5 right-0.5 bg-white rounded border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-move group overflow-hidden"
                        style={{ top: `${top}px`, height: `${height}px`, minHeight: '40px' }}
                      >
                        <div className="px-2 py-1.5 h-full flex flex-col">
                          {/* Drag handle */}
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <GripVertical className="w-3 h-3 text-gray-400" />
                          </div>
                          
                          {/* Title */}
                          <div className="text-xs font-semibold text-gray-900 line-clamp-2 pr-4">
                            {task.title}
                          </div>
                          
                          {/* Subtle color dash under title */}
                          {task.caseId && (
                            <div className={`w-6 h-0.5 rounded-full mt-1 ${caseColor}`}></div>
                          )}
                          
                          {/* Detailed view extras */}
                          {detailedView && (
                            <>
                              {task.caseId && (
                                <div className="text-xs text-gray-600 line-clamp-1 mt-1">
                                  {cases[task.caseId]?.name}
                                </div>
                              )}
                              <div className="text-xs text-gray-500 mt-auto">
                                {task.startTime}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Drawer */}
      {drawerOpen && (
        <div className="w-80 flex-shrink-0 bg-white rounded-xl border border-gray-100 p-4 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Task Pool</h3>
            <button 
              onClick={() => setDrawerOpen(false)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Add Task Button */}
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 mb-4 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Plus className="w-4 h-4" />
            Add New Task
          </button>

          {/* Unscheduled Tasks */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Unscheduled ({unscheduledTasks.length})
            </div>
            {unscheduledTasks.map(task => {
              const Icon = getTypeIcon(task.type);
              const caseColor = task.caseId ? cases[task.caseId]?.color : 'bg-gray-400';
              
              return (
                <div
                  key={task.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all cursor-move group"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${getTypeIconColor(task.type)}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 mb-1">
                        {task.title}
                      </div>
                      {task.caseId && (
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${caseColor}`}></div>
                          <div className="text-xs text-gray-600 truncate">
                            {cases[task.caseId]?.name}
                          </div>
                        </div>
                      )}
                    </div>
                    <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {task.duration}h
                  </div>
                </div>
              );
            })}
          </div>

          {/* Case Legend */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-3">
              Cases
            </div>
            <div className="space-y-2">
              {Object.entries(cases).map(([id, caseData]) => (
                <div key={id} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${caseData.color}`}></div>
                  <span className="text-xs text-gray-700">{caseData.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Drawer Toggle (when closed) */}
      {!drawerOpen && (
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex-shrink-0 w-10 bg-white rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      )}
    </div>
  );

  // Timeline View (read-only visualization)
  const TimelineView = () => (
    <div className="flex gap-4">
      <div className="w-16 flex-shrink-0">
        <div className="h-12"></div>
        {hours.map(hour => (
          <div key={hour} className="h-20 border-t border-gray-100 text-xs text-gray-500 pt-1">
            {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7 gap-2">
        {weekDays.map((day, dayIndex) => {
          const isToday = dayIndex === 1;
          const events = mockScheduledTasks[dayIndex] || [];
          
          return (
            <div key={day} className="relative">
              <div className={`h-12 flex flex-col items-center justify-center rounded-t-xl border-b ${
                isToday ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-100'
              }`}>
                <div className={`text-xs font-semibold ${isToday ? 'text-blue-600' : 'text-gray-500'}`}>
                  {day}
                </div>
                <div className={`text-sm font-semibold ${isToday ? 'text-blue-900' : 'text-gray-900'}`}>
                  {13 + dayIndex}
                </div>
              </div>

              <div className="relative bg-white rounded-b-xl border-l border-r border-b border-gray-100" style={{ height: `${hours.length * 80}px` }}>
                {hours.map((hour, i) => (
                  <div key={hour} className="absolute w-full border-t border-gray-50" style={{ top: `${i * 80}px` }}></div>
                ))}

                {events.map((event) => {
                  const top = timeToPosition(event.startTime);
                  const height = event.duration * 80;
                  const caseColor = event.caseId ? cases[event.caseId]?.color : 'bg-gray-400';
                  
                  return (
                    <div
                      key={event.id}
                      className="absolute left-1 right-1 bg-white rounded-lg border-l-4 border border-gray-100 p-2"
                      style={{ 
                        top: `${top}px`, 
                        height: `${height}px`,
                        borderLeftColor: event.caseId ? cases[event.caseId]?.color.replace('bg-', '#') : '#9ca3af'
                      }}
                    >
                      <div className="text-xs font-semibold text-gray-900 line-clamp-2">{event.title}</div>
                      {event.caseId && (
                        <div className="text-xs text-gray-600 mt-1">{cases[event.caseId]?.name}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Priority View
  const PriorityView = () => (
    <div className="space-y-4">
      <div className="bg-red-50 rounded-xl border border-red-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <h3 className="text-base font-semibold text-red-900">Critical - Today</h3>
        </div>
        <div className="space-y-2">
          <div className="bg-white rounded-lg p-3 border border-gray-100">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">Response Brief Due</div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="text-xs text-gray-600">Smith v. Jones</div>
                  </div>
                </div>
              </div>
              <div className="text-xs font-semibold text-red-600">5:00 PM</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, idx) => {
          const events = mockScheduledTasks[idx] || [];
          const totalHours = events.reduce((sum, e) => sum + e.duration, 0);
          const isToday = idx === 1;
          
          return (
            <div key={day} className={`rounded-xl p-3 border ${
              isToday ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100'
            }`}>
              <div className="text-xs font-semibold text-gray-600">{day}</div>
              <div className="text-lg font-semibold text-gray-900">{13 + idx}</div>
              <div className="text-xs text-gray-600 mt-1">{totalHours}h</div>
              <div className="mt-2 space-y-1">
                {events.slice(0, 2).map((e, i) => {
                  const caseColor = e.caseId ? cases[e.caseId]?.color : 'bg-gray-400';
                  return (
                    <div key={i} className="flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${caseColor}`}></div>
                      <div className="text-xs text-gray-700 truncate">{e.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Week Planner</h1>
              <p className="text-sm text-gray-600">Schedule and manage your weekly tasks</p>
            </div>
            <div className="flex items-center gap-2">
              {activeTab === 'scheduler' && (
                <button 
                  onClick={() => setDetailedView(!detailedView)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    detailedView 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {detailedView ? 'Detailed' : 'Simple'}
                </button>
              )}
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Auto-Schedule
              </button>
            </div>
          </div>

          {/* Week Navigation */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white rounded-lg border border-gray-200 transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-base font-semibold text-gray-900">
              October 13-19, 2025
            </span>
            <button className="p-2 hover:bg-white rounded-lg border border-gray-200 transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl border border-gray-100 mb-4 overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('scheduler')}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'scheduler'
                  ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Scheduler
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'timeline'
                  ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Clock className="w-4 h-4" />
              Timeline
            </button>
            <button
              onClick={() => setActiveTab('priority')}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'priority'
                  ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              Priority
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div>
          {activeTab === 'scheduler' && <SchedulerView />}
          {activeTab === 'timeline' && <TimelineView />}
          {activeTab === 'priority' && <PriorityView />}
        </div>
      </div>
    </div>
  );
};

export default WeekPlanner;