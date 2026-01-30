// Bell Tower Dashboard View

// Calendar state - initialize to first month with bail hearings, or current month
if (STATE.calendarMonth === undefined) {
    if (DATA.bailHearings && DATA.bailHearings.length > 0) {
        const firstDate = new Date(DATA.bailHearings[0].date + 'T00:00:00');
        STATE.calendarMonth = firstDate.getMonth();
        STATE.calendarYear = firstDate.getFullYear();
    } else {
        const today = new Date();
        STATE.calendarMonth = today.getMonth();
        STATE.calendarYear = today.getFullYear();
    }
    STATE.selectedDate = null;
}

// Calendar helper functions
function getHearingsForDate(dateStr) {
    const dateEntry = DATA.bailHearings.find(d => d.date === dateStr);
    if (!dateEntry) return [];
    return dateEntry.cities.map(city => ({
        name: city.name,
        caseCount: city.cases.length
    }));
}

function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month, year) {
    return new Date(year, month, 1).getDay();
}

function formatMonthYear(month, year) {
    const date = new Date(year, month, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function formatSelectedDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

// Calendar navigation functions
function goToPrevMonth() {
    if (STATE.calendarMonth === 0) {
        STATE.calendarMonth = 11;
        STATE.calendarYear--;
    } else {
        STATE.calendarMonth--;
    }
    render();
}

function goToNextMonth() {
    if (STATE.calendarMonth === 11) {
        STATE.calendarMonth = 0;
        STATE.calendarYear++;
    } else {
        STATE.calendarMonth++;
    }
    render();
}

function goToToday() {
    const now = new Date();
    STATE.calendarMonth = now.getMonth();
    STATE.calendarYear = now.getFullYear();
    STATE.selectedDate = now.toISOString().split('T')[0];
    render();
}

function selectDate(dateStr) {
    STATE.selectedDate = dateStr;
    render();
}

// Build calendar grid
function buildCalendarGrid() {
    const daysInMonth = getDaysInMonth(STATE.calendarMonth, STATE.calendarYear);
    const firstDay = getFirstDayOfMonth(STATE.calendarMonth, STATE.calendarYear);
    const grid = [];
    const todayStr = new Date().toISOString().split('T')[0];

    // Empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
        grid.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${STATE.calendarYear}-${String(STATE.calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hearings = getHearingsForDate(dateStr);
        grid.push({
            day,
            dateStr,
            hearings,
            isToday: dateStr === todayStr
        });
    }

    return grid;
}

// Calendar component renderers
function renderDashboardCalendar() {
    const grid = buildCalendarGrid();

    return `
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <!-- Header with navigation -->
            <div class="p-4 border-b border-slate-200 flex items-center justify-between">
                <h3 class="text-lg font-semibold text-slate-800">Bail Hearing Calendar</h3>
                <div class="flex items-center gap-2">
                    <button onclick="goToPrevMonth()" class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <i data-lucide="chevron-left" class="w-5 h-5 text-slate-600"></i>
                    </button>
                    <span class="text-sm font-medium text-slate-700 w-36 text-center">
                        ${formatMonthYear(STATE.calendarMonth, STATE.calendarYear)}
                    </span>
                    <button onclick="goToNextMonth()" class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <i data-lucide="chevron-right" class="w-5 h-5 text-slate-600"></i>
                    </button>
                    <button onclick="goToToday()" class="ml-2 px-3 py-1.5 text-sm font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                        Today
                    </button>
                </div>
            </div>

            <div class="p-4">
                <!-- Day headers -->
                <div class="grid grid-cols-7 mb-2">
                    ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => `
                        <div class="text-center text-xs font-medium text-slate-500 py-2">
                            ${day}
                        </div>
                    `).join('')}
                </div>

                <!-- Calendar grid -->
                <div class="grid grid-cols-7 gap-1">
                    ${grid.map(cell => renderCalendarCell(cell)).join('')}
                </div>
            </div>

            <!-- Selected date details -->
            ${STATE.selectedDate ? renderSelectedDateDetails() : ''}
        </div>
    `;
}

function renderCalendarCell(cell) {
    if (cell === null) {
        return `<div class="h-24"></div>`;
    }

    const isSelected = STATE.selectedDate === cell.dateStr;
    const cellClasses = isSelected
        ? 'bg-amber-50 ring-2 ring-amber-400'
        : cell.isToday
        ? 'bg-blue-50 ring-1 ring-blue-200'
        : 'hover:bg-slate-50';

    const dayClasses = cell.isToday ? 'text-blue-600' : 'text-slate-700';

    // Render event bars (up to 3)
    const eventBars = cell.hearings.slice(0, 3).map(h => `
        <div class="text-[10px] text-white bg-amber-500 rounded px-1.5 py-0.5 truncate leading-tight">
            ${h.name}
        </div>
    `).join('');

    // "+X more" indicator
    const moreIndicator = cell.hearings.length > 3
        ? `<div class="text-[10px] text-slate-500 px-1">+${cell.hearings.length - 3} more</div>`
        : '';

    return `
        <button onclick="selectDate('${cell.dateStr}')"
                class="w-full h-24 p-1 rounded-lg text-left transition-colors flex flex-col ${cellClasses}">
            <span class="text-sm font-medium mb-1 ${dayClasses}">
                ${cell.day}
            </span>
            <div class="flex-1 overflow-hidden space-y-0.5">
                ${eventBars}
                ${moreIndicator}
            </div>
        </button>
    `;
}

function renderSelectedDateDetails() {
    const hearings = getHearingsForDate(STATE.selectedDate);

    let content;
    if (hearings.length > 0) {
        content = `
            <div class="space-y-2">
                ${hearings.map(city => `
                    <div class="flex items-center gap-2 text-slate-600">
                        <i data-lucide="map-pin" class="w-4 h-4 text-slate-400"></i>
                        <span class="font-medium">${city.name}</span>
                        <span class="text-slate-400">•</span>
                        <span class="text-sm text-slate-500">
                            ${city.caseCount} ${city.caseCount === 1 ? 'case' : 'cases'}
                        </span>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        content = `<p class="text-slate-500 text-sm">No hearings scheduled for this date.</p>`;
    }

    return `
        <div class="border-t border-slate-200 p-4 bg-slate-50">
            <h4 class="text-lg font-semibold text-slate-800 mb-3">
                ${formatSelectedDate(STATE.selectedDate)}
            </h4>
            ${content}
        </div>
    `;
}

function renderDashboard() {
    const upcomingDays = getUpcomingCourtDays();
    const unassignedCases = getUnassignedCases();
    const highPriorityCases = unassignedCases.filter(c => c.priority === 'High');

    return `
        <div class="space-y-8">
            <!-- Page Header -->
            <div>
                <h2 class="text-2xl font-bold text-gray-900">Scheduling Dashboard</h2>
                <p class="text-gray-500 mt-1">Overview of court days and pending case assignments</p>
            </div>

            <!-- Stats Row -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                ${renderStatCard('Upcoming Court Days', upcomingDays.length, 'calendar', 'blue')}
                ${renderStatCard('Unassigned Cases', unassignedCases.length, 'briefcase', 'amber')}
                ${renderStatCard('High Priority', highPriorityCases.length, 'alert-triangle', 'red')}
                ${renderStatCard('Total Assignments', DATA.caseAssignments.length, 'check-circle', 'green')}
            </div>

            <!-- Main Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Upcoming Court Days -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-semibold text-gray-900">Upcoming Court Days</h3>
                        <button onclick="Router.navigate('/schedule')" class="text-amber-600 hover:text-amber-700 text-sm font-medium">
                            View All
                        </button>
                    </div>
                    <div class="space-y-4">
                        ${upcomingDays.slice(0, 5).map(day => renderCourtDayCard(day)).join('')}
                        ${upcomingDays.length === 0 ? '<p class="text-gray-500 text-center py-8">No upcoming court days</p>' : ''}
                    </div>
                </div>

                <!-- Cases Pending Assignment -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-semibold text-gray-900">Cases Pending Assignment</h3>
                        <button onclick="Router.navigate('/assign')" class="text-amber-600 hover:text-amber-700 text-sm font-medium">
                            Assign Cases
                        </button>
                    </div>
                    <div class="space-y-3">
                        ${unassignedCases.slice(0, 6).map(c => renderCaseCard(c)).join('')}
                        ${unassignedCases.length === 0 ? '<p class="text-gray-500 text-center py-8">All cases are assigned</p>' : ''}
                    </div>
                </div>
            </div>

            <!-- Bail Hearing Calendar -->
            ${renderDashboardCalendar()}
        </div>
    `;
}

function renderStatCard(label, value, icon, color) {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        amber: 'bg-amber-100 text-amber-600',
        red: 'bg-red-100 text-red-600',
        green: 'bg-green-100 text-green-600'
    };

    return `
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 ${colorClasses[color]} rounded-xl flex items-center justify-center">
                    <i data-lucide="${icon}" class="w-6 h-6"></i>
                </div>
                <div>
                    <p class="text-sm text-gray-500">${label}</p>
                    <p class="text-2xl font-bold text-gray-900">${value}</p>
                </div>
            </div>
        </div>
    `;
}

function renderCourtDayCard(day) {
    const utilization = getCourtDayUtilization(day.id);
    const capacityColor = getCapacityColor(utilization.percentage);

    return `
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onclick="Router.navigate('/schedule')">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-amber-100 rounded-lg flex flex-col items-center justify-center">
                    <span class="text-xs text-amber-600 font-medium">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span class="text-lg font-bold text-amber-700">${new Date(day.date).getDate()}</span>
                </div>
                <div>
                    <p class="font-medium text-gray-900">Courtroom ${day.courtroom}</p>
                    <p class="text-sm text-gray-500">${day.judge} - ${day.type}</p>
                </div>
            </div>
            <div class="text-right">
                <p class="text-sm font-medium ${capacityColor.text}">${utilization.assigned}/${utilization.capacity}</p>
                <div class="w-20 h-2 bg-gray-200 rounded-full mt-1">
                    <div class="h-full ${capacityColor.bg} rounded-full capacity-bar" style="width: ${utilization.percentage}%"></div>
                </div>
            </div>
        </div>
    `;
}

function renderCaseCard(caseData) {
    const priorityColor = getPriorityColor(caseData.priority);
    const typeColor = getCaseTypeColor(caseData.type);

    return `
        <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-amber-300 transition-colors cursor-pointer" onclick="Router.navigate('/assign')">
            <div>
                <div class="flex items-center gap-2 mb-1">
                    <span class="font-medium text-gray-900">${caseData.caseNumber}</span>
                    <span class="px-2 py-0.5 text-xs rounded-full ${priorityColor.bg} ${priorityColor.text}">${caseData.priority}</span>
                </div>
                <p class="text-sm text-gray-600">${caseData.name}</p>
            </div>
            <div class="flex items-center gap-2">
                <span class="px-2 py-1 text-xs rounded ${typeColor.bg} ${typeColor.text}">${caseData.type}</span>
                <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i>
            </div>
        </div>
    `;
}

