// Dashboard View

// Greeting helper - returns appropriate greeting based on time
function getGreeting() {
    const hour = STATE.today.getHours();
    let timeOfDay, greetings;

    if (hour < 12) {
        timeOfDay = 'morning';
        greetings = [
            "Let's make today count!",
            "Ready to tackle those cases?",
            "Fresh start, fresh perspective!",
            "Time to make progress!",
            "Let's get after it!"
        ];
    } else if (hour < 17) {
        timeOfDay = 'afternoon';
        greetings = [
            "Keeping the momentum going!",
            "Making great progress today!",
            "Afternoon push—let's finish strong!",
            "Stay focused, you've got this!",
            "Powering through the day!"
        ];
    } else {
        timeOfDay = 'evening';
        greetings = [
            "Wrapping up the day nicely!",
            "Almost there—great work today!",
            "Evening review time!",
            "Finishing strong today!",
            "Great dedication today!"
        ];
    }

    // Rotate through greetings based on day of year to add variety
    const dayOfYear = Math.floor((STATE.today - new Date(STATE.today.getFullYear(), 0, 0)) / 86400000);
    const greeting = greetings[dayOfYear % greetings.length];

    return {
        timeOfDay,
        greeting
    };
}

// Calculate dashboard summary statistics
function getDashboardSummary() {
    const activeCases = DATA.cases.length;
    const highPriorityCasesList = DATA.cases.filter(c => c.priority === 'High');
    const highPriorityCases = highPriorityCasesList.length;

    const overdueDocsList = DATA.documentRequests
        .filter(doc => new Date(doc.responseDeadline) < STATE.today && doc.status !== 'Received')
        .map(doc => ({
            type: doc.type,
            caseName: doc.caseName,
            date: formatDate(doc.responseDeadline)
        }));
    const overdueDocs = overdueDocsList.length;

    const upcomingCourtList = DATA.courtDates
        .filter(date => {
            const daysUntil = Math.ceil((new Date(date.date) - STATE.today) / (1000 * 60 * 60 * 24));
            return daysUntil >= 0 && daysUntil <= 14;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(court => ({
            caseName: court.caseName,
            type: court.type,
            date: formatDate(court.date)
        }));
    const upcomingCourt = upcomingCourtList.length;

    // Find next critical deadline (soonest overdue or upcoming)
    const sortedDocs = [...DATA.documentRequests]
        .filter(d => d.status !== 'Received')
        .sort((a, b) => new Date(a.responseDeadline) - new Date(b.responseDeadline));

    const nextDeadline = sortedDocs.length > 0 ? {
        description: `${sortedDocs[0].type} for ${sortedDocs[0].caseName}`,
        date: formatDate(sortedDocs[0].responseDeadline),
        daysUntil: getDaysUntil(sortedDocs[0].responseDeadline)
    } : null;

    // Recent updates - simulated for now
    const updatesList = [
        'Video Footage received for R v. Chen',
        'Pre-Trial Conference scheduled for R v. Patel',
        'Medical Records now overdue for R v. Thompson'
    ];
    const newUpdates = updatesList.length;

    return {
        activeCases,
        highPriorityCases,
        highPriorityCasesList,
        overdueDocs,
        overdueDocsList,
        upcomingCourt,
        upcomingCourtList,
        newUpdates,
        updatesList,
        nextDeadline
    };
}

function renderDashboard() {
    const upcomingCourtDates = getUpcomingCourtDates();
    const overdueDocuments = getOverdueDocuments();
    const urgentDocuments = getUrgentDocuments();
    const allCases = DATA.cases;
    const highPriorityCases = getHighPriorityCases();
    const { timeOfDay, greeting } = getGreeting();

    return `
        <div class="space-y-4">
            <!-- Greeting and Summary Side by Side -->
            <div class="grid grid-cols-3 gap-4">
                <!-- Personalized Greeting -->
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                    <h2 class="text-2xl font-bold text-gray-900">Good ${timeOfDay}, ${STATE.userName}!</h2>
                    <p class="text-gray-600 mt-1">${greeting}</p>
                </div>

                <!-- Dashboard Summary -->
                ${(() => {
                    const summary = getDashboardSummary();
                    return `
                        <div class="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
                                Your Day at a Glance
                            </h3>
                            <div class="space-y-3 text-sm text-gray-700">
                                <p>You're managing <strong>${summary.activeCases} active cases</strong> with <strong class="text-red-600">${summary.highPriorityCases} high priority</strong> matters: ${summary.highPriorityCasesList.map(c => `<span class="font-semibold">${c.name}</span>`).join(', ')}.</p>
                                <ul class="list-none space-y-2">
                                    ${summary.overdueDocs > 0 ? `
                                        <li class="flex items-start gap-2">
                                            <i data-lucide="alert-circle" class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0"></i>
                                            <div>
                                                <div><strong class="text-red-600">${summary.overdueDocs} document${summary.overdueDocs === 1 ? '' : 's'}</strong> overdue and need${summary.overdueDocs === 1 ? 's' : ''} immediate attention:</div>
                                                <div class="ml-2 mt-1 text-xs space-y-0.5">
                                                    ${summary.overdueDocsList.map(doc => `<div>• ${doc.type} for ${doc.caseName} (due ${doc.date})</div>`).join('')}
                                                </div>
                                            </div>
                                        </li>
                                    ` : ''}
                                    ${summary.upcomingCourt > 0 ? `
                                        <li class="flex items-start gap-2">
                                            <i data-lucide="calendar" class="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"></i>
                                            <div>
                                                <div><strong>${summary.upcomingCourt} court date${summary.upcomingCourt === 1 ? '' : 's'}</strong> in the next 14 days:</div>
                                                <div class="ml-2 mt-1 text-xs space-y-0.5">
                                                    ${summary.upcomingCourtList.map(court => `<div>• ${court.caseName} - ${court.type} on ${court.date}</div>`).join('')}
                                                </div>
                                            </div>
                                        </li>
                                    ` : ''}
                                    ${summary.newUpdates > 0 ? `
                                        <li class="flex items-start gap-2">
                                            <i data-lucide="bell" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"></i>
                                            <div>
                                                <div><strong>${summary.newUpdates} new update${summary.newUpdates === 1 ? '' : 's'}</strong> since yesterday:</div>
                                                <div class="ml-2 mt-1 text-xs space-y-0.5">
                                                    ${summary.updatesList.map(update => `<div>• ${update}</div>`).join('')}
                                                </div>
                                            </div>
                                        </li>
                                    ` : ''}
                                    ${summary.nextDeadline ? `
                                        <li class="flex items-start gap-2">
                                            <i data-lucide="clock" class="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0"></i>
                                            <span>Next critical deadline: <strong>${summary.nextDeadline.description}</strong> (${summary.nextDeadline.daysUntil})</span>
                                        </li>
                                    ` : ''}
                                </ul>
                            </div>
                        </div>
                    `;
                })()}
            </div>

            <!-- Quick Look Section -->
            <div class="mb-6">
                <h2 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <i data-lucide="eye" class="w-5 h-5"></i>
                    Quick Look
                </h2>
                <div class="grid grid-cols-4 gap-4">
                    <!-- Active Cases -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="px-4 py-3 border-b border-gray-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-xs text-gray-600 font-medium uppercase">Active Cases</p>
                                    <p class="text-2xl font-bold text-gray-900 mt-0.5">${DATA.cases.length}</p>
                                </div>
                                <i data-lucide="briefcase" class="w-8 h-8 text-blue-500 opacity-80"></i>
                            </div>
                        </div>
                        <div class="p-3 max-h-96 overflow-y-auto">
                            ${renderActiveCasesExpansion()}
                        </div>
                    </div>

                    <!-- Overdue Docs -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="px-4 py-3 border-b border-gray-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-xs text-gray-600 font-medium uppercase">Overdue Docs</p>
                                    <p class="text-2xl font-bold text-gray-900 mt-0.5">${overdueDocuments.length}</p>
                                </div>
                                <i data-lucide="alert-circle" class="w-8 h-8 text-red-500 opacity-80"></i>
                            </div>
                        </div>
                        <div class="p-3 max-h-96 overflow-y-auto">
                            ${renderOverdueDocsExpansion()}
                        </div>
                    </div>

                    <!-- Court (14d) -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="px-4 py-3 border-b border-gray-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-xs text-gray-600 font-medium uppercase">Court (14d)</p>
                                    <p class="text-2xl font-bold text-gray-900 mt-0.5">${upcomingCourtDates.length}</p>
                                </div>
                                <i data-lucide="calendar" class="w-8 h-8 text-green-500 opacity-80"></i>
                            </div>
                        </div>
                        <div class="p-3 max-h-96 overflow-y-auto">
                            ${renderUpcomingCourtExpansion()}
                        </div>
                    </div>

                    <!-- High Priority -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="px-4 py-3 border-b border-gray-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-xs text-gray-600 font-medium uppercase">High Priority</p>
                                    <p class="text-2xl font-bold text-gray-900 mt-0.5">${highPriorityCases.length}</p>
                                </div>
                                <i data-lucide="alert-triangle" class="w-8 h-8 text-orange-500 opacity-80"></i>
                            </div>
                        </div>
                        <div class="p-3 max-h-96 overflow-y-auto">
                            ${renderHighPriorityExpansion()}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Document Status Section -->
            <div class="mb-6">
                <h2 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <i data-lucide="file-text" class="w-5 h-5"></i>
                    Document Status
                </h2>
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
            </div>

            <!-- Recent Changes -->
            ${renderRecentChanges()}

            <!-- Cases Section -->
            <div class="mb-6">
                <h2 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <i data-lucide="briefcase" class="w-5 h-5"></i>
                    Cases
                </h2>
            <!-- All Cases Table -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-4 py-3 border-b border-gray-200">
                    <h2 class="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <i data-lucide="briefcase" class="w-4 h-4 text-blue-500"></i>
                        All Cases (${allCases.length})
                    </h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Case</th>
                                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Accused</th>
                                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Charges</th>
                                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Priority</th>
                                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Status</th>
                                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Next Court</th>
                                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Trial Date</th>
                                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            ${allCases.map(caseItem => `
                                <tr class="hover:bg-gray-50 cursor-pointer"
                                    onclick="showRightSidebarDetail('case', ${caseItem.id}); STATE.rightSidebarOpen = true; render();">
                                    <td class="px-4 py-2 font-semibold text-gray-900">${caseItem.name}</td>
                                    <td class="px-4 py-2 text-gray-900">${caseItem.accused}</td>
                                    <td class="px-4 py-2 text-gray-600">${caseItem.charges}</td>
                                    <td class="px-4 py-2">
                                        <span class="text-xs font-semibold px-2 py-0.5 rounded ${caseItem.priority === 'High' ? 'bg-red-100 text-red-800' : caseItem.priority === 'Medium' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-700'}">${caseItem.priority}</span>
                                    </td>
                                    <td class="px-4 py-2">
                                        <span class="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">${caseItem.status}</span>
                                    </td>
                                    <td class="px-4 py-2 text-gray-900">${caseItem.nextCourtDate ? formatDate(caseItem.nextCourtDate) : '-'}</td>
                                    <td class="px-4 py-2 text-gray-900">${caseItem.trialDate ? formatDate(caseItem.trialDate) : '-'}</td>
                                    <td class="px-4 py-2">
                                        <button
                                            onclick="event.stopPropagation(); Router.navigate('/case/${caseItem.id}');"
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
        </div>
    `;
}