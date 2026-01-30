// Bell Tower Assign View

function renderAssign() {
    const unassignedCases = getUnassignedCases();
    const upcomingDays = getUpcomingCourtDays();

    return `
        <div class="space-y-8">
            <!-- Page Header -->
            <div>
                <h2 class="text-2xl font-bold text-gray-900">Assign Cases</h2>
                <p class="text-gray-500 mt-1">Assign cases to available court days</p>
            </div>

            <!-- Filters -->
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <label class="text-sm text-gray-600">Priority:</label>
                    <select onchange="STATE.filterPriority = this.value; render();" class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                        <option value="all" ${STATE.filterPriority === 'all' ? 'selected' : ''}>All</option>
                        <option value="High" ${STATE.filterPriority === 'High' ? 'selected' : ''}>High</option>
                        <option value="Medium" ${STATE.filterPriority === 'Medium' ? 'selected' : ''}>Medium</option>
                        <option value="Low" ${STATE.filterPriority === 'Low' ? 'selected' : ''}>Low</option>
                    </select>
                </div>
                <div class="flex items-center gap-2">
                    <label class="text-sm text-gray-600">Type:</label>
                    <select onchange="STATE.filterType = this.value; render();" class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                        <option value="all" ${STATE.filterType === 'all' ? 'selected' : ''}>All</option>
                        <option value="Criminal" ${STATE.filterType === 'Criminal' ? 'selected' : ''}>Criminal</option>
                        <option value="Traffic" ${STATE.filterType === 'Traffic' ? 'selected' : ''}>Traffic</option>
                    </select>
                </div>
            </div>

            <!-- Two Column Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Unassigned Cases -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="font-semibold text-gray-900">Unassigned Cases (${filterCases(unassignedCases).length})</h3>
                    </div>
                    <div class="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                        ${filterCases(unassignedCases).map(c => renderAssignableCaseCard(c)).join('')}
                        ${filterCases(unassignedCases).length === 0 ? '<p class="text-gray-500 text-center py-8">No cases match the current filters</p>' : ''}
                    </div>
                </div>

                <!-- Available Court Days -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="font-semibold text-gray-900">Available Court Days</h3>
                    </div>
                    <div class="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                        ${upcomingDays.map(day => renderAssignableCourtDayCard(day)).join('')}
                        ${upcomingDays.length === 0 ? '<p class="text-gray-500 text-center py-8">No upcoming court days</p>' : ''}
                    </div>
                </div>
            </div>

            <!-- Quick Assignment Section -->
            ${STATE.selectedCase ? renderQuickAssignSection() : ''}
        </div>
    `;
}

function filterCases(cases) {
    return cases.filter(c => {
        if (STATE.filterPriority !== 'all' && c.priority !== STATE.filterPriority) return false;
        if (STATE.filterType !== 'all' && c.type !== STATE.filterType) return false;
        return true;
    });
}

function renderAssignableCaseCard(caseData) {
    const priorityColor = getPriorityColor(caseData.priority);
    const typeColor = getCaseTypeColor(caseData.type);
    const isSelected = STATE.selectedCase === caseData.id;

    return `
        <div
            onclick="selectCase(${caseData.id})"
            class="p-4 border-2 rounded-lg cursor-pointer transition-all ${isSelected ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}"
        >
            <div class="flex items-start justify-between">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="font-semibold text-gray-900">${caseData.caseNumber}</span>
                        <span class="px-2 py-0.5 text-xs rounded-full ${priorityColor.bg} ${priorityColor.text}">${caseData.priority}</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">${caseData.name}</p>
                    <div class="flex items-center gap-3 text-xs text-gray-500">
                        <span class="px-2 py-0.5 rounded ${typeColor.bg} ${typeColor.text}">${caseData.type}</span>
                        <span>${caseData.chargeType}</span>
                        <span>Est. ${caseData.estimatedDuration}h</span>
                    </div>
                </div>
                ${isSelected ? `
                    <div class="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                        <i data-lucide="check" class="w-4 h-4 text-white"></i>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function renderAssignableCourtDayCard(day) {
    const utilization = getCourtDayUtilization(day.id);
    const capacityColor = getCapacityColor(utilization.percentage);
    const isFull = utilization.assigned >= utilization.capacity;

    // Check if selected case can be assigned here
    let canAssign = false;
    let conflictReason = '';
    if (STATE.selectedCase) {
        const conflict = hasSchedulingConflict(STATE.selectedCase, day.id);
        canAssign = !conflict.hasConflict;
        conflictReason = conflict.reason || '';
    }

    return `
        <div class="p-4 border-2 rounded-lg ${isFull ? 'border-gray-200 bg-gray-50 opacity-60' : 'border-gray-200 hover:border-amber-300'} transition-all">
            <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-amber-100 rounded-lg flex flex-col items-center justify-center">
                        <span class="text-xs text-amber-600 font-medium">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span class="text-lg font-bold text-amber-700">${new Date(day.date).getDate()}</span>
                    </div>
                    <div>
                        <p class="font-medium text-gray-900">Courtroom ${day.courtroom}</p>
                        <p class="text-xs text-gray-500">${day.judge}</p>
                        <span class="inline-block mt-1 px-2 py-0.5 text-xs rounded ${getCaseTypeColor(day.type).bg} ${getCaseTypeColor(day.type).text}">${day.type}</span>
                    </div>
                </div>
                <div class="text-right">
                    <p class="text-sm font-medium ${capacityColor.text}">${utilization.assigned}/${utilization.capacity}</p>
                    <div class="w-16 h-2 bg-gray-200 rounded-full mt-1">
                        <div class="h-full ${capacityColor.bg} rounded-full" style="width: ${utilization.percentage}%"></div>
                    </div>
                    ${STATE.selectedCase && !isFull ? `
                        <button
                            onclick="event.stopPropagation(); quickAssign(${STATE.selectedCase}, ${day.id})"
                            class="mt-3 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${canAssign ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}"
                            ${!canAssign ? 'disabled' : ''}
                            title="${conflictReason}"
                        >
                            ${canAssign ? 'Assign Here' : 'Cannot Assign'}
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function renderQuickAssignSection() {
    const selectedCaseData = DATA.cases.find(c => c.id === STATE.selectedCase);
    if (!selectedCaseData) return '';

    const priorityColor = getPriorityColor(selectedCaseData.priority);

    return `
        <div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-30">
            <div class="flex items-center gap-6">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <i data-lucide="briefcase" class="w-5 h-5 text-amber-600"></i>
                    </div>
                    <div>
                        <p class="font-medium text-gray-900">${selectedCaseData.caseNumber}</p>
                        <p class="text-xs text-gray-500">${selectedCaseData.name}</p>
                    </div>
                    <span class="px-2 py-0.5 text-xs rounded-full ${priorityColor.bg} ${priorityColor.text}">${selectedCaseData.priority}</span>
                </div>
                <div class="h-10 w-px bg-gray-200"></div>
                <p class="text-sm text-gray-600">Select a court day to assign this case</p>
                <button onclick="clearSelection()" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <i data-lucide="x" class="w-5 h-5 text-gray-500"></i>
                </button>
            </div>
        </div>
    `;
}

function selectCase(caseId) {
    STATE.selectedCase = STATE.selectedCase === caseId ? null : caseId;
    render();
}

function clearSelection() {
    STATE.selectedCase = null;
    render();
}

function quickAssign(caseId, courtDayId) {
    if (assignCaseToCourtDay(caseId, courtDayId, '9:00 AM')) {
        STATE.selectedCase = null;
        render();
    }
}
