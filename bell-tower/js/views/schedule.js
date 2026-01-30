// Bell Tower Schedule View

function renderSchedule() {
    const courtDays = DATA.courtDays.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Group by week
    const groupedByWeek = {};
    courtDays.forEach(day => {
        const date = new Date(day.date);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const weekKey = weekStart.toISOString().split('T')[0];

        if (!groupedByWeek[weekKey]) {
            groupedByWeek[weekKey] = [];
        }
        groupedByWeek[weekKey].push(day);
    });

    return `
        <div class="space-y-8">
            <!-- Page Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900">Court Schedule</h2>
                    <p class="text-gray-500 mt-1">View and manage court day assignments</p>
                </div>
                <div class="flex items-center gap-3">
                    <select onchange="filterByCourtroom(this.value)" class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                        <option value="all">All Courtrooms</option>
                        <option value="A">Courtroom A</option>
                        <option value="B">Courtroom B</option>
                        <option value="C">Courtroom C</option>
                    </select>
                    <select onchange="filterByType(this.value)" class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                        <option value="all">All Types</option>
                        <option value="Criminal">Criminal</option>
                        <option value="Traffic">Traffic</option>
                    </select>
                </div>
            </div>

            <!-- Legend -->
            <div class="flex items-center gap-6 text-sm">
                <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    <span class="text-gray-600">Available (&lt;70%)</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span class="text-gray-600">Filling Up (70-89%)</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <span class="text-gray-600">Nearly Full (90%+)</span>
                </div>
            </div>

            <!-- Schedule Grid -->
            ${Object.entries(groupedByWeek).map(([weekStart, days]) => renderWeekSection(weekStart, days)).join('')}
        </div>
    `;
}

function renderWeekSection(weekStart, days) {
    const weekDate = new Date(weekStart);
    const weekEnd = new Date(weekDate);
    weekEnd.setDate(weekDate.getDate() + 6);

    const weekLabel = `${weekDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

    return `
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 class="font-semibold text-gray-900">${weekLabel}</h3>
            </div>
            <div class="divide-y divide-gray-200">
                ${days.map(day => renderScheduleDayRow(day)).join('')}
            </div>
        </div>
    `;
}

function renderScheduleDayRow(day) {
    const utilization = getCourtDayUtilization(day.id);
    const capacityColor = getCapacityColor(utilization.percentage);
    const assignedCases = getCasesForCourtDay(day.id);
    const assignments = DATA.caseAssignments.filter(a => a.courtDayId === day.id);

    return `
        <div class="p-6">
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 bg-amber-100 rounded-xl flex flex-col items-center justify-center">
                        <span class="text-sm text-amber-600 font-medium">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span class="text-2xl font-bold text-amber-700">${new Date(day.date).getDate()}</span>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-900">Courtroom ${day.courtroom}</h4>
                        <p class="text-sm text-gray-500">${day.judge}</p>
                        <span class="inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${getCaseTypeColor(day.type).bg} ${getCaseTypeColor(day.type).text}">${day.type}</span>
                    </div>
                </div>
                <div class="text-right">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-sm text-gray-500">Capacity:</span>
                        <span class="font-semibold ${capacityColor.text}">${utilization.assigned}/${utilization.capacity}</span>
                    </div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full">
                        <div class="h-full ${capacityColor.bg} rounded-full capacity-bar" style="width: ${utilization.percentage}%"></div>
                    </div>
                </div>
            </div>

            <!-- Assigned Cases -->
            ${assignedCases.length > 0 ? `
                <div class="mt-4 space-y-2">
                    <p class="text-sm font-medium text-gray-700">Assigned Cases:</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        ${assignments.map(assignment => {
                            const caseData = DATA.cases.find(c => c.id === assignment.caseId);
                            const statusColor = getStatusColor(assignment.status);
                            return `
                                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div>
                                        <p class="font-medium text-gray-900 text-sm">${caseData.caseNumber}</p>
                                        <p class="text-xs text-gray-500">${assignment.timeSlot}</p>
                                    </div>
                                    <span class="px-2 py-0.5 text-xs rounded-full ${statusColor.bg} ${statusColor.text}">${assignment.status}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            ` : `
                <div class="mt-4 p-4 bg-gray-50 rounded-lg text-center">
                    <p class="text-sm text-gray-500">No cases assigned yet</p>
                    <button onclick="Router.navigate('/assign')" class="mt-2 text-amber-600 hover:text-amber-700 text-sm font-medium">
                        Assign Cases
                    </button>
                </div>
            `}
        </div>
    `;
}

// Filter functions (stubs for now)
function filterByCourtroom(value) {
    STATE.filterCourtroom = value;
    render();
}

function filterByType(value) {
    STATE.filterType = value;
    render();
}
