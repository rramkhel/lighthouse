// Week Planner View - Auto-schedule tasks with dependencies

function renderWeekPlanner() {
    // Get the current week (Monday - Friday)
    const today = new Date(STATE.today);
    const monday = getMonday(today);
    
    // Generate week days
    const weekDays = [];
    for (let i = 0; i < 5; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        weekDays.push(date);
    }
    
    // Get or initialize week schedule
    if (!STATE.weekSchedule) {
        STATE.weekSchedule = generateWeekSchedule(weekDays);
    }
    
    return `
        <div class="space-y-4">
            <!-- Week Navigation and Controls -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-4">
                        <button 
                            onclick="shiftWeek(-7); render();"
                            class="p-2 hover:bg-gray-100 rounded"
                        >
                            <i data-lucide="chevron-left" class="w-5 h-5"></i>
                        </button>
                        <h2 class="text-xl font-semibold text-gray-900">
                            Week of ${formatDate(weekDays[0])}
                        </h2>
                        <button 
                            onclick="shiftWeek(7); render();"
                            class="p-2 hover:bg-gray-100 rounded"
                        >
                            <i data-lucide="chevron-right" class="w-5 h-5"></i>
                        </button>
                    </div>
                    <div class="flex gap-2">
                        <button 
                            onclick="regenerateSchedule(); render();"
                            class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
                        >
                            <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                            Auto-Schedule
                        </button>
                        <button 
                            onclick="exportWeekSchedule();"
                            class="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm font-medium"
                        >
                            <i data-lucide="download" class="w-4 h-4"></i>
                            Export
                        </button>
                    </div>
                </div>
                
                <!-- Week Summary Stats -->
                <div class="grid grid-cols-5 gap-3">
                    <div class="bg-blue-50 rounded p-3 border border-blue-200">
                        <div class="text-xs text-blue-600 font-semibold uppercase">Court Dates</div>
                        <div class="text-2xl font-bold text-blue-900 mt-1">${countCourtDatesInWeek(weekDays)}</div>
                    </div>
                    <div class="bg-orange-50 rounded p-3 border border-orange-200">
                        <div class="text-xs text-orange-600 font-semibold uppercase">Trial Prep Hrs</div>
                        <div class="text-2xl font-bold text-orange-900 mt-1">${calculateTrialPrepHours(STATE.weekSchedule)}</div>
                    </div>
                    <div class="bg-green-50 rounded p-3 border border-green-200">
                        <div class="text-xs text-green-600 font-semibold uppercase">Tasks</div>
                        <div class="text-2xl font-bold text-green-900 mt-1">${countTotalTasks(STATE.weekSchedule)}</div>
                    </div>
                    <div class="bg-purple-50 rounded p-3 border border-purple-200">
                        <div class="text-xs text-purple-600 font-semibold uppercase">Overdue Items</div>
                        <div class="text-2xl font-bold text-purple-900 mt-1">${countOverdueInWeek(weekDays)}</div>
                    </div>
                    <div class="bg-gray-50 rounded p-3 border border-gray-200">
                        <div class="text-xs text-gray-600 font-semibold uppercase">Available Hrs</div>
                        <div class="text-2xl font-bold text-gray-900 mt-1">${calculateAvailableHours(STATE.weekSchedule)}</div>
                    </div>
                </div>
            </div>

            <!-- Week Grid -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="grid grid-cols-5 divide-x divide-gray-200">
                    ${weekDays.map((day, idx) => renderDayColumn(day, idx)).join('')}
                </div>
            </div>

            <!-- Task Pool / Unscheduled Items -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-4 py-3 border-b border-gray-200 bg-yellow-50">
                    <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <i data-lucide="inbox" class="w-4 h-4 text-yellow-600"></i>
                        Unscheduled Tasks (${getUnscheduledTasks(STATE.weekSchedule).length})
                    </h3>
                </div>
                <div class="p-4">
                    ${renderUnscheduledTasks()}
                </div>
            </div>

            <!-- Scheduling Rules Panel -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-4 py-3 border-b border-gray-200">
                    <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <i data-lucide="settings" class="w-4 h-4"></i>
                        Scheduling Rules
                    </h3>
                </div>
                <div class="p-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                        <label class="block font-semibold text-gray-700 mb-2">Work Day Start</label>
                        <input 
                            type="time" 
                            value="${STATE.schedulingRules?.startTime || '09:00'}"
                            onchange="updateSchedulingRule('startTime', this.value); regenerateSchedule(); render();"
                            class="w-full px-3 py-2 border border-gray-300 rounded"
                        >
                    </div>
                    <div>
                        <label class="block font-semibold text-gray-700 mb-2">Work Day End</label>
                        <input 
                            type="time" 
                            value="${STATE.schedulingRules?.endTime || '17:00'}"
                            onchange="updateSchedulingRule('endTime', this.value); regenerateSchedule(); render();"
                            class="w-full px-3 py-2 border border-gray-300 rounded"
                        >
                    </div>
                    <div>
                        <label class="block font-semibold text-gray-700 mb-2">Trial Prep Block (hrs)</label>
                        <input 
                            type="number" 
                            min="0" 
                            max="8" 
                            step="0.5"
                            value="${STATE.schedulingRules?.trialPrepBlockHours || '2'}"
                            onchange="updateSchedulingRule('trialPrepBlockHours', parseFloat(this.value)); regenerateSchedule(); render();"
                            class="w-full px-3 py-2 border border-gray-300 rounded"
                        >
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderDayColumn(day, dayIndex) {
    const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = formatDateShort(day);
    const isToday = isSameDay(day, STATE.today);
    const schedule = STATE.weekSchedule[dayIndex] || { items: [] };
    
    return `
        <div class="min-h-[600px] ${isToday ? 'bg-blue-50' : ''}">
            <!-- Day Header -->
            <div class="px-3 py-3 border-b border-gray-200 ${isToday ? 'bg-blue-100' : 'bg-gray-50'}">
                <div class="font-bold text-gray-900 text-sm">${dayName}</div>
                <div class="text-xs text-gray-600 mt-0.5">${dateStr}</div>
                ${isToday ? '<div class="text-xs text-blue-600 font-semibold mt-1">TODAY</div>' : ''}
            </div>
            
            <!-- Day Content -->
            <div class="p-2 space-y-2">
                ${schedule.items.map((item, itemIdx) => renderScheduleItem(item, dayIndex, itemIdx)).join('')}
                
                <!-- Add Task Button -->
                <button 
                    onclick="openAddTaskModal(${dayIndex});"
                    class="w-full py-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-blue-400 hover:text-blue-600 text-sm font-medium transition"
                >
                    + Add Task
                </button>
            </div>
        </div>
    `;
}

function renderScheduleItem(item, dayIndex, itemIndex) {
    const color = item.type === 'court' ? 'bg-red-100 border-red-400 text-red-900' :
                  item.type === 'trial-prep' ? 'bg-orange-100 border-orange-400 text-orange-900' :
                  item.type === 'document' ? 'bg-blue-100 border-blue-400 text-blue-900' :
                  'bg-green-100 border-green-400 text-green-900';
    
    const icon = item.type === 'court' ? 'gavel' :
                 item.type === 'trial-prep' ? 'book-open' :
                 item.type === 'document' ? 'file-text' :
                 'check-square';
    
    return `
        <div class="border-l-3 ${color} p-2 rounded text-xs relative group">
            <div class="flex items-start gap-2">
                <i data-lucide="${icon}" class="w-3 h-3 mt-0.5 flex-shrink-0"></i>
                <div class="flex-1 min-w-0">
                    <div class="font-semibold truncate">${item.title}</div>
                    ${item.time ? `<div class="text-xs opacity-75 mt-0.5">${item.time}</div>` : ''}
                    ${item.duration ? `<div class="text-xs opacity-75">${item.duration}h</div>` : ''}
                    ${item.caseName ? `<div class="text-xs opacity-75 truncate">${item.caseName}</div>` : ''}
                    ${item.blockedBy ? `<div class="text-xs text-red-600 mt-1">⚠️ Blocked by: ${item.blockedBy}</div>` : ''}
                </div>
            </div>
            
            <!-- Action Buttons (show on hover) -->
            <div class="absolute top-1 right-1 hidden group-hover:flex gap-1">
                <button 
                    onclick="editScheduleItem(${dayIndex}, ${itemIndex});"
                    class="p-1 bg-white rounded shadow hover:bg-gray-100"
                    title="Edit"
                >
                    <i data-lucide="edit-2" class="w-3 h-3"></i>
                </button>
                <button 
                    onclick="deleteScheduleItem(${dayIndex}, ${itemIndex}); render();"
                    class="p-1 bg-white rounded shadow hover:bg-red-100"
                    title="Delete"
                >
                    <i data-lucide="trash-2" class="w-3 h-3"></i>
                </button>
            </div>
        </div>
    `;
}

function renderUnscheduledTasks() {
    const unscheduled = getUnscheduledTasks(STATE.weekSchedule);
    
    if (unscheduled.length === 0) {
        return '<p class="text-gray-500 text-center py-4 text-sm">All tasks scheduled! 🎉</p>';
    }
    
    return `
        <div class="grid grid-cols-3 gap-3">
            ${unscheduled.map(task => `
                <div class="border border-yellow-300 bg-yellow-50 rounded p-3 text-sm">
                    <div class="font-semibold text-gray-900">${task.title}</div>
                    ${task.caseName ? `<div class="text-xs text-gray-600 mt-1">${task.caseName}</div>` : ''}
                    ${task.deadline ? `<div class="text-xs text-red-600 mt-1">Due: ${formatDate(task.deadline)}</div>` : ''}
                    ${task.duration ? `<div class="text-xs text-gray-600 mt-1">${task.duration}h required</div>` : ''}
                    <button 
                        onclick="scheduleTaskToNextAvailable('${task.id}'); render();"
                        class="mt-2 w-full px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                    >
                        Auto-Schedule
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

// Helper Functions

function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

function formatDateShort(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function isSameDay(date1, date2) {
    return date1.toDateString() === date2.toDateString();
}

function shiftWeek(days) {
    const currentMonday = getMonday(STATE.today);
    currentMonday.setDate(currentMonday.getDate() + days);
    STATE.today = currentMonday;
    STATE.weekSchedule = null; // Clear schedule to regenerate
}

function generateWeekSchedule(weekDays) {
    const schedule = weekDays.map(() => ({ items: [] }));
    const rules = STATE.schedulingRules || {
        startTime: '09:00',
        endTime: '17:00',
        trialPrepBlockHours: 2
    };
    
    // 1. Block out court dates (highest priority)
    DATA.courtDates.forEach(courtDate => {
        const date = new Date(courtDate.date);
        const dayIndex = weekDays.findIndex(d => isSameDay(d, date));
        
        if (dayIndex >= 0) {
            schedule[dayIndex].items.push({
                id: `court-${courtDate.id}`,
                type: 'court',
                title: courtDate.type,
                caseName: courtDate.caseName,
                time: courtDate.time,
                duration: 2,
                fixed: true,
                caseId: courtDate.caseId
            });
        }
    });
    
    // 2. Schedule trial prep blocks for cases with upcoming trials
    const casesNeedingPrep = DATA.cases.filter(c => c.trialDate && c.status === 'Trial Prep');
    casesNeedingPrep.forEach((caseItem, idx) => {
        const dayIndex = idx % 5; // Distribute across the week
        schedule[dayIndex].items.push({
            id: `prep-${caseItem.id}`,
            type: 'trial-prep',
            title: `Trial Prep: ${caseItem.name}`,
            caseName: caseItem.name,
            duration: rules.trialPrepBlockHours,
            caseId: caseItem.id
        });
    });
    
    // 3. Schedule urgent document follow-ups
    const urgentDocs = DATA.documentRequests.filter(doc => {
        const deadline = new Date(doc.responseDeadline);
        const daysUntil = Math.ceil((deadline - STATE.today) / (1000 * 60 * 60 * 24));
        return daysUntil >= 0 && daysUntil <= 7 && doc.status !== 'Received';
    });
    
    urgentDocs.forEach((doc, idx) => {
        const dayIndex = (idx + 1) % 5;
        schedule[dayIndex].items.push({
            id: `doc-${doc.id}`,
            type: 'document',
            title: `Follow-up: ${doc.recipient}`,
            caseName: doc.caseName,
            duration: 0.5,
            deadline: doc.responseDeadline
        });
    });
    
    return schedule;
}

function regenerateSchedule() {
    const monday = getMonday(STATE.today);
    const weekDays = [];
    for (let i = 0; i < 5; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        weekDays.push(date);
    }
    STATE.weekSchedule = generateWeekSchedule(weekDays);
}

function updateSchedulingRule(key, value) {
    if (!STATE.schedulingRules) {
        STATE.schedulingRules = {
            startTime: '09:00',
            endTime: '17:00',
            trialPrepBlockHours: 2
        };
    }
    STATE.schedulingRules[key] = value;
}

function countCourtDatesInWeek(weekDays) {
    return DATA.courtDates.filter(cd => {
        const date = new Date(cd.date);
        return weekDays.some(wd => isSameDay(wd, date));
    }).length;
}

function calculateTrialPrepHours(schedule) {
    if (!schedule) return 0;
    return schedule.reduce((total, day) => {
        return total + day.items
            .filter(item => item.type === 'trial-prep')
            .reduce((sum, item) => sum + (item.duration || 0), 0);
    }, 0);
}

function countTotalTasks(schedule) {
    if (!schedule) return 0;
    return schedule.reduce((total, day) => total + day.items.length, 0);
}

function countOverdueInWeek(weekDays) {
    return DATA.documentRequests.filter(doc => {
        const deadline = new Date(doc.responseDeadline);
        return deadline < STATE.today && doc.status !== 'Received';
    }).length;
}

function calculateAvailableHours(schedule) {
    if (!schedule) return 40; // 8 hours x 5 days
    const rules = STATE.schedulingRules || { startTime: '09:00', endTime: '17:00' };
    const totalHours = 8 * 5; // 40 hours default
    const scheduledHours = schedule.reduce((total, day) => {
        return total + day.items.reduce((sum, item) => sum + (item.duration || 0), 0);
    }, 0);
    return totalHours - scheduledHours;
}

function getUnscheduledTasks(schedule) {
    // Return tasks that should be scheduled but aren't yet
    const scheduled = new Set();
    if (schedule) {
        schedule.forEach(day => {
            day.items.forEach(item => scheduled.add(item.id));
        });
    }
    
    // Build list of tasks that need scheduling
    const unscheduled = [];
    
    // Add overdue documents not yet scheduled
    DATA.documentRequests.forEach(doc => {
        const taskId = `doc-follow-${doc.id}`;
        if (!scheduled.has(taskId) && doc.status === 'Overdue') {
            unscheduled.push({
                id: taskId,
                type: 'document',
                title: `OVERDUE: Follow-up ${doc.recipient}`,
                caseName: doc.caseName,
                deadline: doc.responseDeadline,
                duration: 0.5,
                priority: 'high'
            });
        }
    });
    
    return unscheduled;
}

function deleteScheduleItem(dayIndex, itemIndex) {
    if (STATE.weekSchedule && STATE.weekSchedule[dayIndex]) {
        STATE.weekSchedule[dayIndex].items.splice(itemIndex, 1);
    }
}

function scheduleTaskToNextAvailable(taskId) {
    // Find next day with available time and add task
    console.log('Scheduling task:', taskId);
    // Implementation would move task from unscheduled to first available slot
}

function openAddTaskModal(dayIndex) {
    alert(`Add task to day ${dayIndex + 1}. (Modal implementation needed)`);
}

function editScheduleItem(dayIndex, itemIndex) {
    alert(`Edit item ${itemIndex} on day ${dayIndex + 1}. (Modal implementation needed)`);
}

function exportWeekSchedule() {
    alert('Export functionality - would generate PDF or Excel export');
}

// Initialize scheduling rules if not present
if (!STATE.schedulingRules) {
    STATE.schedulingRules = {
        startTime: '09:00',
        endTime: '17:00',
        trialPrepBlockHours: 2
    };
}