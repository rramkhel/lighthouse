// Right Sidebar Component - Universal contextual information panel

function toggleRightSidebar() {
    STATE.rightSidebarOpen = !STATE.rightSidebarOpen;
    render();
}

function setRightSidebarTab(tab) {
    STATE.rightSidebarTab = tab;
    STATE.rightSidebarDetail = null; // Clear detail view when switching tabs
    render();
}

function showRightSidebarDetail(type, id) {
    STATE.rightSidebarDetail = { type, id };
    render();
}

function clearRightSidebarDetail() {
    STATE.rightSidebarDetail = null;
    render();
}

function renderRightSidebar() {
    const isOpen = STATE.rightSidebarOpen;
    const currentTab = STATE.rightSidebarTab || 'updates';
    const width = isOpen ? 'w-80' : 'w-12';

    if (!isOpen) {
        // Collapsed view - just toggle button
        return `
            <div class="fixed right-0 top-0 h-screen ${width} bg-white border-l border-gray-200 shadow-sm z-20 flex flex-col transition-all duration-300">
                <div class="p-3 border-b border-gray-200">
                    <button
                        onclick="toggleRightSidebar()"
                        class="p-2 hover:bg-gray-100 rounded-lg transition-colors w-full"
                        title="Expand sidebar"
                    >
                        <i data-lucide="panel-right-open" class="w-5 h-5 text-gray-600 mx-auto"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Expanded view with tabs
    return `
        <div class="fixed right-0 top-0 h-screen ${width} bg-white border-l border-gray-200 shadow-sm z-20 flex flex-col transition-all duration-300">
            <!-- Header -->
            <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <h3 class="text-sm font-bold text-gray-900">Quick Access</h3>
                <button
                    onclick="toggleRightSidebar()"
                    class="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Collapse sidebar"
                >
                    <i data-lucide="panel-right-close" class="w-4 h-4 text-gray-600"></i>
                </button>
            </div>

            <!-- Tabs -->
            <div class="flex flex-wrap border-b border-gray-200 px-2 pt-2 gap-1">
                ${renderRightSidebarTab('summary', 'Summary', 'sparkles')}
                ${renderRightSidebarTab('updates', 'Recent', 'activity')}
                ${renderRightSidebarTab('calendar', 'Calendar', 'calendar')}
                ${renderRightSidebarTab('cases', 'Cases', 'briefcase')}
                ${renderRightSidebarTab('documents', 'Docs', 'file-text')}
                ${renderRightSidebarTab('research', 'Research', 'search')}
            </div>

            <!-- Tab Content -->
            <div class="flex-1 overflow-y-auto p-4">
                ${renderRightSidebarContent(currentTab)}
            </div>
        </div>
    `;
}

function renderRightSidebarTab(tabId, label, icon) {
    const isActive = STATE.rightSidebarTab === tabId || (!STATE.rightSidebarTab && tabId === 'summary');
    return `
        <button
            onclick="setRightSidebarTab('${tabId}')"
            class="flex items-center gap-1 px-3 py-2 text-xs font-medium transition-colors rounded-t ${
                isActive ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }"
        >
            <i data-lucide="${icon}" class="w-3 h-3"></i>
            ${label}
        </button>
    `;
}

function renderRightSidebarContent(tab) {
    // If there's a detail view active, show it
    if (STATE.rightSidebarDetail) {
        return renderRightSidebarDetailView(STATE.rightSidebarDetail);
    }

    // Otherwise show the tab list view
    switch(tab) {
        case 'summary':
            return renderRightSidebarSummary();
        case 'updates':
            return renderRightSidebarUpdates();
        case 'calendar':
            return renderRightSidebarCalendar();
        case 'cases':
            return renderRightSidebarCases();
        case 'documents':
            return renderRightSidebarDocuments();
        case 'research':
            return renderRightSidebarResearch();
        default:
            return renderRightSidebarSummary();
    }
}

function renderRightSidebarSummary() {
    const summary = getDashboardSummary();

    return `
        <div class="space-y-4">
            <!-- AI Assistant Input -->
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
                <div class="flex items-center gap-2 mb-2">
                    <i data-lucide="sparkles" class="w-4 h-4 text-blue-600"></i>
                    <p class="text-xs font-bold text-blue-900">AI Assistant</p>
                </div>
                <textarea
                    placeholder="Ask me anything... e.g., 'I need the Martinez doc by tomorrow' or 'Move my court date to next week'"
                    class="w-full px-3 py-2 text-xs border border-blue-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                ></textarea>
                <button class="w-full mt-2 px-3 py-2 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 font-medium flex items-center justify-center gap-1">
                    <i data-lucide="send" class="w-3 h-3"></i>
                    Send (Coming Soon)
                </button>
            </div>

            <!-- Your Day at a Glance -->
            <div>
                <h4 class="text-xs font-bold text-gray-700 uppercase mb-3 flex items-center gap-2">
                    <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
                    Your Day at a Glance
                </h4>

                <div class="space-y-3 text-xs text-gray-700">
                    <p>You're managing <strong>${summary.activeCases} active cases</strong> with <strong class="text-red-600">${summary.highPriorityCases} high priority</strong> matters: ${summary.highPriorityCasesList.map(c => `<span class="font-semibold">${c.name}</span>`).join(', ')}.</p>
                    <ul class="list-none space-y-2">
                        ${summary.overdueDocs > 0 ? `
                            <li class="flex items-start gap-2">
                                <i data-lucide="alert-circle" class="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0"></i>
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
                                <i data-lucide="calendar" class="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0"></i>
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
                                <i data-lucide="bell" class="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0"></i>
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
                                <i data-lucide="clock" class="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0"></i>
                                <span>Next critical deadline: <strong>${summary.nextDeadline.description}</strong> (${summary.nextDeadline.daysUntil})</span>
                            </li>
                        ` : ''}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function renderRightSidebarUpdates() {
    const recentChanges = STATE.recentChanges.slice(0, 5);

    return `
        <div class="space-y-3">
            <h4 class="text-xs font-bold text-gray-500 uppercase">Recent Activity</h4>
            ${recentChanges.map(change => `
                <div class="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition text-xs"
                     onclick="showRightSidebarDetail('case', ${change.caseId})">
                    <div class="flex items-start gap-2">
                        <i data-lucide="${change.icon}" class="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0"></i>
                        <div class="flex-1 min-w-0">
                            <p class="font-semibold text-gray-900 text-xs">${change.caseName}</p>
                            <p class="text-gray-600 mt-1">${change.description}</p>
                            <p class="text-gray-400 text-xs mt-1">${formatTimestamp(change.timestamp)}</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderRightSidebarCalendar() {
    const upcomingDates = getUpcomingCourtDates().slice(0, 5);

    return `
        <div class="space-y-3">
            <h4 class="text-xs font-bold text-gray-500 uppercase">Upcoming Court Dates</h4>
            ${upcomingDates.map(event => `
                <div class="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition"
                     onclick="showRightSidebarDetail('courtDate', ${event.id})">
                    <div class="flex items-start gap-2">
                        <div class="bg-purple-100 rounded p-2 flex-shrink-0">
                            <i data-lucide="calendar" class="w-4 h-4 text-purple-700"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="font-semibold text-gray-900 text-xs">${event.type}</p>
                            <p class="text-gray-600 text-xs mt-1">${event.caseName}</p>
                            <p class="text-purple-600 text-xs mt-1 font-medium">${formatDate(event.date)} at ${event.time}</p>
                            <p class="text-gray-500 text-xs">${getDaysUntil(event.date)}</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderRightSidebarCases() {
    const highPriorityCases = getHighPriorityCases().slice(0, 4);

    return `
        <div class="space-y-3">
            <h4 class="text-xs font-bold text-gray-500 uppercase">High Priority Cases</h4>
            ${highPriorityCases.map(c => `
                <div class="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition"
                     onclick="showRightSidebarDetail('case', ${c.id})">
                    <p class="font-semibold text-gray-900 text-xs">${c.name}</p>
                    <p class="text-gray-600 text-xs mt-1">${c.accused}</p>
                    <div class="flex gap-1 mt-2">
                        <span class="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700">High Priority</span>
                        <span class="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">${c.status}</span>
                    </div>
                    ${c.nextCourtDate ? `<p class="text-xs text-gray-500 mt-1">Next: ${formatDate(c.nextCourtDate)}</p>` : ''}
                </div>
            `).join('')}
        </div>
    `;
}

function renderRightSidebarDocuments() {
    const urgentDocs = getUrgentDocuments().slice(0, 5);

    return `
        <div class="space-y-3">
            <h4 class="text-xs font-bold text-gray-500 uppercase">Urgent Documents</h4>
            ${urgentDocs.map(doc => `
                <div class="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition"
                     onclick="showRightSidebarDetail('document', ${doc.id})">
                    <p class="font-semibold text-gray-900 text-xs">${doc.recipient}</p>
                    <p class="text-gray-600 text-xs mt-1">${doc.type}</p>
                    <p class="text-gray-500 text-xs mt-1">${doc.caseName}</p>
                    <div class="flex gap-1 mt-2">
                        <span class="text-xs px-2 py-0.5 rounded ${getStatusColor(doc.status)}">${doc.status}</span>
                    </div>
                    <p class="text-orange-600 text-xs mt-1 font-medium">Due: ${formatDate(doc.responseDeadline)}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function renderRightSidebarResearch() {
    return `
        <div class="space-y-4">
            <div class="text-center py-6">
                <i data-lucide="sparkles" class="w-12 h-12 mx-auto text-blue-400 mb-3"></i>
                <h4 class="text-sm font-bold text-gray-900 mb-2">AI Research Assistant</h4>
                <p class="text-xs text-gray-600">Coming Soon!</p>
            </div>

            <div class="space-y-3">
                <div class="border border-blue-200 bg-blue-50 rounded-lg p-3">
                    <div class="flex items-center gap-2 mb-2">
                        <i data-lucide="search" class="w-4 h-4 text-blue-600"></i>
                        <p class="text-xs font-semibold text-blue-900">AI-Powered Search</p>
                    </div>
                    <p class="text-xs text-blue-700">Natural language case law search with intelligent results</p>
                </div>

                <div class="border border-green-200 bg-green-50 rounded-lg p-3">
                    <div class="flex items-center gap-2 mb-2">
                        <i data-lucide="book-open" class="w-4 h-4 text-green-600"></i>
                        <p class="text-xs font-semibold text-green-900">CriminalNotebook.ca Integration</p>
                    </div>
                    <p class="text-xs text-green-700">Direct access to Canadian criminal law database and annotations</p>
                </div>

                <div class="border border-purple-200 bg-purple-50 rounded-lg p-3">
                    <div class="flex items-center gap-2 mb-2">
                        <i data-lucide="brain" class="w-4 h-4 text-purple-600"></i>
                        <p class="text-xs font-semibold text-purple-900">Perplexity-Style Search</p>
                    </div>
                    <p class="text-xs text-purple-700">Get comprehensive answers with cited sources from legal databases</p>
                </div>
            </div>

            <div class="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                <p class="text-xs text-gray-600">Want early access?</p>
                <button class="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 font-medium">
                    Join Waitlist
                </button>
            </div>
        </div>
    `;
}

function renderRightSidebarDetailView(detail) {
    const { type, id } = detail;

    // Back button
    const backButton = `
        <button
            onclick="clearRightSidebarDetail()"
            class="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium mb-4"
        >
            <i data-lucide="arrow-left" class="w-3 h-3"></i>
            Back
        </button>
    `;

    if (type === 'case') {
        const caseItem = DATA.cases.find(c => c.id === id);
        if (!caseItem) return `${backButton}<p class="text-gray-500 text-sm">Case not found</p>`;

        const caseDocs = DATA.documentRequests.filter(d => d.caseId === id);
        const caseCourtDates = DATA.courtDates.filter(d => d.caseId === id);

        return `
            ${backButton}
            <div class="space-y-4">
                <div>
                    <h3 class="text-sm font-bold text-gray-900">${caseItem.name}</h3>
                    <p class="text-xs text-gray-600 mt-1">${caseItem.accused}</p>
                    <div class="flex gap-1 mt-2">
                        <span class="text-xs px-2 py-1 rounded ${caseItem.priority === 'High' ? 'bg-red-100 text-red-700' : caseItem.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}">
                            ${caseItem.priority} Priority
                        </span>
                        <span class="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">${caseItem.status}</span>
                    </div>
                </div>

                <div class="border-t border-gray-200 pt-3">
                    <p class="text-xs font-semibold text-gray-700 mb-2">Case Details</p>
                    <div class="space-y-1 text-xs">
                        <p><span class="text-gray-500">Charges:</span> ${caseItem.charges}</p>
                        <p><span class="text-gray-500">Location:</span> ${caseItem.location}</p>
                        <p><span class="text-gray-500">Investigator:</span> ${caseItem.investigator}</p>
                        ${caseItem.nextCourtDate ? `<p><span class="text-gray-500">Next Court:</span> ${formatDate(caseItem.nextCourtDate)}</p>` : ''}
                        ${caseItem.trialDate ? `<p><span class="text-gray-500">Trial Date:</span> ${formatDate(caseItem.trialDate)}</p>` : ''}
                    </div>
                </div>

                ${caseCourtDates.length > 0 ? `
                    <div class="border-t border-gray-200 pt-3">
                        <p class="text-xs font-semibold text-gray-700 mb-2">Court Dates (${caseCourtDates.length})</p>
                        <div class="space-y-2">
                            ${caseCourtDates.slice(0, 3).map(cd => `
                                <div class="bg-purple-50 border border-purple-200 rounded p-2 text-xs">
                                    <p class="font-semibold text-purple-900">${cd.type}</p>
                                    <p class="text-purple-700 mt-1">${formatDate(cd.date)} at ${cd.time}</p>
                                    <p class="text-purple-600">${cd.room}, ${cd.location}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${caseDocs.length > 0 ? `
                    <div class="border-t border-gray-200 pt-3">
                        <p class="text-xs font-semibold text-gray-700 mb-2">Documents (${caseDocs.length})</p>
                        <div class="space-y-2">
                            ${caseDocs.slice(0, 3).map(doc => `
                                <div class="bg-gray-50 border border-gray-200 rounded p-2 text-xs cursor-pointer hover:bg-gray-100"
                                     onclick="showRightSidebarDetail('document', ${doc.id})">
                                    <p class="font-semibold text-gray-900">${doc.recipient}</p>
                                    <p class="text-gray-600 mt-1">${doc.type}</p>
                                    <span class="inline-block text-xs px-2 py-0.5 rounded mt-1 ${getStatusColor(doc.status)}">${doc.status}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <button
                    onclick="Router.navigate('/case/${id}')"
                    class="w-full px-3 py-2 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 font-medium"
                >
                    View Full Case →
                </button>
            </div>
        `;
    }

    if (type === 'document') {
        const doc = DATA.documentRequests.find(d => d.id === id);
        if (!doc) return `${backButton}<p class="text-gray-500 text-sm">Document not found</p>`;

        return `
            ${backButton}
            <div class="space-y-4">
                <div>
                    <h3 class="text-sm font-bold text-gray-900">${doc.recipient}</h3>
                    <p class="text-xs text-gray-600 mt-1">${doc.type}</p>
                    <span class="inline-block text-xs px-2 py-1 rounded mt-2 ${getStatusColor(doc.status)}">${doc.status}</span>
                </div>

                <div class="border-t border-gray-200 pt-3">
                    <p class="text-xs font-semibold text-gray-700 mb-2">Document Details</p>
                    <div class="space-y-1 text-xs">
                        <p><span class="text-gray-500">Case:</span> ${doc.caseName}</p>
                        <p><span class="text-gray-500">Priority:</span> ${doc.priority}</p>
                        <p><span class="text-gray-500">Deadline:</span> ${formatDate(doc.responseDeadline)}</p>
                        <p><span class="text-gray-500">Time Until:</span> ${getDaysUntil(doc.responseDeadline)}</p>
                    </div>
                </div>

                <button
                    onclick="showRightSidebarDetail('case', ${doc.caseId})"
                    class="w-full px-3 py-2 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 font-medium"
                >
                    View Case →
                </button>
            </div>
        `;
    }

    if (type === 'courtDate') {
        const courtDate = DATA.courtDates.find(cd => cd.id === id);
        if (!courtDate) return `${backButton}<p class="text-gray-500 text-sm">Court date not found</p>`;

        return `
            ${backButton}
            <div class="space-y-4">
                <div>
                    <h3 class="text-sm font-bold text-gray-900">${courtDate.type}</h3>
                    <p class="text-xs text-gray-600 mt-1">${courtDate.caseName}</p>
                </div>

                <div class="border-t border-gray-200 pt-3">
                    <p class="text-xs font-semibold text-gray-700 mb-2">Event Details</p>
                    <div class="space-y-1 text-xs">
                        <p><span class="text-gray-500">Date:</span> ${formatDate(courtDate.date)}</p>
                        <p><span class="text-gray-500">Time:</span> ${courtDate.time}</p>
                        <p><span class="text-gray-500">Location:</span> ${courtDate.room}, ${courtDate.location}</p>
                        <p><span class="text-gray-500">Time Until:</span> ${getDaysUntil(courtDate.date)}</p>
                    </div>
                </div>

                <button
                    onclick="showRightSidebarDetail('case', ${courtDate.caseId})"
                    class="w-full px-3 py-2 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 font-medium"
                >
                    View Case →
                </button>
            </div>
        `;
    }

    return `${backButton}<p class="text-gray-500 text-sm">Unknown item type</p>`;
}
