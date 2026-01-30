// Bell Tower Dashboard View

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

            <!-- Workload Summary -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-6">Capacity Overview</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    ${upcomingDays.slice(0, 5).map(day => renderCapacityCard(day)).join('')}
                </div>
            </div>
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

function renderCapacityCard(day) {
    const utilization = getCourtDayUtilization(day.id);
    const capacityColor = getCapacityColor(utilization.percentage);

    return `
        <div class="bg-gray-50 rounded-lg p-4 text-center">
            <p class="text-sm font-medium text-gray-900">${formatDate(day.date)}</p>
            <p class="text-xs text-gray-500 mb-3">Room ${day.courtroom}</p>
            <div class="relative w-16 h-16 mx-auto mb-2">
                <svg class="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" stroke="#e5e7eb" stroke-width="6" fill="none"/>
                    <circle cx="32" cy="32" r="28" stroke="${utilization.percentage >= 90 ? '#ef4444' : utilization.percentage >= 70 ? '#f59e0b' : '#22c55e'}" stroke-width="6" fill="none"
                        stroke-dasharray="${utilization.percentage * 1.76} 176" stroke-linecap="round"/>
                </svg>
                <span class="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">${utilization.percentage}%</span>
            </div>
            <p class="text-xs text-gray-500">${utilization.assigned} of ${utilization.capacity}</p>
        </div>
    `;
}
