// Dashboard View

function renderDashboard() {
    const upcomingCourtDates = getUpcomingCourtDates();
    const overdueDocuments = getOverdueDocuments();
    const urgentDocuments = getUrgentDocuments();
    const highPriorityCases = getHighPriorityCases();
    
    return `
        <div class="space-y-4">
            <!-- Stats Cards -->
            <div class="grid grid-cols-4 gap-4">
                ${renderStatCard('briefcase', 'Active Cases', DATA.cases.length, 'border-blue-500')}
                ${renderStatCard('alert-circle', 'Overdue Docs', overdueDocuments.length, 'border-red-500')}
                ${renderStatCard('calendar', 'Court (14d)', upcomingCourtDates.length, 'border-green-500')}
                ${renderStatCard('alert-triangle', 'High Priority', highPriorityCases.length, 'border-orange-500')}
            </div>

            <!-- Three Column Layout -->
            <div class="grid grid-cols-3 gap-4">
                <!-- Overdue Documents -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="px-4 py-3 border-b border-gray-200 bg-red-50">
                        <h2 class="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <i data-lucide="alert-circle" class="w-4 h-4 text-red-500"></i>
                            Overdue Documents (${overdueDocuments.length})
                        </h2>
                    </div>
                    <div class="p-3 max-h-96 overflow-y-auto">
                        ${overdueDocuments.length === 0 
                            ? '<p class="text-gray-500 text-center py-8 text-sm">No overdue documents</p>'
                            : '<div class="space-y-2">' + overdueDocuments.map(doc => 
                                renderDocumentCard(doc, 'border-red-500', 'bg-red-50')
                              ).join('') + '</div>'
                        }
                    </div>
                </div>

                <!-- Urgent Documents -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="px-4 py-3 border-b border-gray-200 bg-orange-50">
                        <h2 class="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <i data-lucide="clock" class="w-4 h-4 text-orange-500"></i>
                            Due Within 7 Days (${urgentDocuments.length})
                        </h2>
                    </div>
                    <div class="p-3 max-h-96 overflow-y-auto">
                        ${urgentDocuments.length === 0
                            ? '<p class="text-gray-500 text-center py-8 text-sm">No urgent documents</p>'
                            : '<div class="space-y-2">' + urgentDocuments.map(doc => 
                                renderDocumentCard(doc, 'border-orange-500', 'bg-orange-50')
                              ).join('') + '</div>'
                        }
                    </div>
                </div>

                <!-- Upcoming Court Dates -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="px-4 py-3 border-b border-gray-200 bg-blue-50">
                        <h2 class="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <i data-lucide="calendar" class="w-4 h-4 text-blue-500"></i>
                            Next 14 Days (${upcomingCourtDates.length})
                        </h2>
                    </div>
                    <div class="p-3 max-h-96 overflow-y-auto">
                        ${upcomingCourtDates.length === 0
                            ? '<p class="text-gray-500 text-center py-8 text-sm">No upcoming court dates</p>'
                            : '<div class="space-y-2">' + upcomingCourtDates.map(event => 
                                renderCourtEventCard(event)
                              ).join('') + '</div>'
                        }
                    </div>
                </div>
            </div>

            <!-- High Priority Cases Table -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-4 py-3 border-b border-gray-200">
                    <h2 class="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <i data-lucide="alert-triangle" class="w-4 h-4 text-red-500"></i>
                        High Priority Cases (${highPriorityCases.length})
                    </h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Case</th>
                                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Accused</th>
                                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Charges</th>
                                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Status</th>
                                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Next Court</th>
                                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Trial Date</th>
                                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            ${highPriorityCases.map(caseItem => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-4 py-2 font-semibold text-gray-900">${caseItem.name}</td>
                                    <td class="px-4 py-2 text-gray-900">${caseItem.accused}</td>
                                    <td class="px-4 py-2 text-gray-600">${caseItem.charges}</td>
                                    <td class="px-4 py-2">
                                        <span class="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">${caseItem.status}</span>
                                    </td>
                                    <td class="px-4 py-2 text-gray-900">${caseItem.nextCourtDate ? formatDate(caseItem.nextCourtDate) : '-'}</td>
                                    <td class="px-4 py-2 text-gray-900">${caseItem.trialDate ? formatDate(caseItem.trialDate) : '-'}</td>
                                    <td class="px-4 py-2">
                                        <button 
                                            onclick="Router.navigate('/case/${caseItem.id}')"
                                            class="text-blue-600 hover:text-blue-800 font-medium text-xs"
                                        >
                                            View →
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}