// Stat Card Component with expansion capability

// Non-expandable stat card for Quick Look section - always shows details
function renderQuickLookCard(icon, label, value, color, cardId) {
    return `
        <div>
            <div class="bg-white rounded-lg shadow-sm p-4 border-l-4 ${color}">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs text-gray-600 font-medium uppercase">${label}</p>
                        <p class="text-2xl font-bold text-gray-900 mt-0.5">${value}</p>
                    </div>
                    <i data-lucide="${icon}" class="w-8 h-8 ${color.replace('border-', 'text-')} opacity-80"></i>
                </div>
            </div>
            ${renderCardExpansion(cardId)}
        </div>
    `;
}

function renderStatCard(icon, label, value, color, cardId) {
    const isExpanded = STATE.expandedCard === cardId;

    return `
        <div class="bg-white rounded-lg shadow-sm p-4 border-l-4 ${color} stat-card ${isExpanded ? 'ring-2 ring-blue-300' : ''}"
             onclick="toggleCardExpansion('${cardId}')">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-xs text-gray-600 font-medium uppercase">${label}</p>
                    <p class="text-2xl font-bold text-gray-900 mt-0.5">${value}</p>
                </div>
                <div class="flex flex-col items-center gap-1">
                    <i data-lucide="${icon}" class="w-8 h-8 ${color.replace('border-', 'text-')} opacity-80"></i>
                    <i data-lucide="chevron-${isExpanded ? 'up' : 'down'}" class="w-4 h-4 text-gray-400"></i>
                </div>
            </div>
        </div>
        ${isExpanded ? renderCardExpansion(cardId) : ''}
    `;
}

// Render expanded content for each card type
function renderCardExpansion(cardId) {
    let content = '';

    switch(cardId) {
        case 'active-cases':
            content = renderActiveCasesExpansion();
            break;
        case 'overdue-docs':
            content = renderOverdueDocsExpansion();
            break;
        case 'upcoming-court':
            content = renderUpcomingCourtExpansion();
            break;
        case 'high-priority':
            content = renderHighPriorityExpansion();
            break;
    }

    return `
        <div class="mt-2 bg-gray-50 rounded-lg p-4 border border-gray-200 slide-down">
            ${content}
        </div>
    `;
}

// Active Cases expansion
function renderActiveCasesExpansion() {
    const grouped = {
        High: DATA.cases.filter(c => c.priority === 'High'),
        Medium: DATA.cases.filter(c => c.priority === 'Medium'),
        Low: DATA.cases.filter(c => c.priority === 'Low')
    };

    return `
        <div class="space-y-3">
            ${Object.entries(grouped).map(([priority, cases]) => {
                if (cases.length === 0) return '';
                const color = priority === 'High' ? 'text-red-600' : priority === 'Medium' ? 'text-orange-600' : 'text-gray-600';
                return `
                    <div>
                        <p class="text-xs font-semibold ${color} uppercase mb-2">${priority} Priority (${cases.length})</p>
                        <div class="space-y-1">
                            ${cases.map(c => `
                                <button onclick="event.stopPropagation(); Router.navigate('/case/${c.id}')"
                                        class="text-left w-full px-3 py-2 text-sm bg-white rounded hover:bg-blue-50 border border-gray-200 transition-colors">
                                    <span class="font-medium text-gray-900">${c.name}</span>
                                    <span class="text-gray-500 text-xs ml-2">${c.accused}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Overdue Documents expansion
function renderOverdueDocsExpansion() {
    const overdue = DATA.documentRequests.filter(doc =>
        new Date(doc.responseDeadline) < STATE.today && doc.status !== 'Received'
    );

    if (overdue.length === 0) {
        return '<p class="text-sm text-gray-500 text-center py-4">No overdue documents! 🎉</p>';
    }

    return `
        <div class="space-y-2">
            ${overdue.map(doc => {
                const daysOverdue = Math.abs(Math.ceil((new Date(doc.responseDeadline) - STATE.today) / (1000 * 60 * 60 * 24)));
                return `
                    <button onclick="Router.navigate('/documents')" class="w-full text-left bg-white rounded border border-gray-200 p-3 hover:bg-blue-50 transition-colors">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-medium text-sm text-gray-900">${doc.recipient}</p>
                                <p class="text-xs text-gray-600">${doc.caseName} • ${doc.type}</p>
                            </div>
                            <span class="text-xs font-semibold text-red-600">${daysOverdue} day${daysOverdue === 1 ? '' : 's'} overdue</span>
                        </div>
                    </button>
                `;
            }).join('')}
        </div>
    `;
}

// Upcoming Court expansion
function renderUpcomingCourtExpansion() {
    const upcoming = DATA.courtDates.filter(date => {
        const daysUntil = Math.ceil((new Date(date.date) - STATE.today) / (1000 * 60 * 60 * 24));
        return daysUntil >= 0 && daysUntil <= 14;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    if (upcoming.length === 0) {
        return '<p class="text-sm text-gray-500 text-center py-4">No upcoming court dates in next 14 days</p>';
    }

    return `
        <div class="space-y-2">
            ${upcoming.map(event => {
                const daysUntil = getDaysUntil(event.date);
                const isUrgent = daysUntil === 'Today' || daysUntil === 'Tomorrow' ||
                                (typeof daysUntil === 'string' && parseInt(daysUntil) <= 3);
                const caseData = DATA.cases.find(c => c.name === event.caseName);
                return `
                    <button onclick="Router.navigate('/case/${caseData ? caseData.id : ''}')" class="w-full text-left bg-white rounded border border-gray-200 p-3 hover:bg-blue-50 transition-colors">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-medium text-sm text-gray-900">${event.type}</p>
                                <p class="text-xs text-gray-600">${event.caseName}</p>
                                <p class="text-xs text-gray-500 mt-1">${event.time} • ${event.room}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-xs font-medium text-gray-900">${formatDate(event.date)}</p>
                                <p class="text-xs font-semibold ${isUrgent ? 'text-orange-600' : 'text-blue-600'}">${daysUntil}</p>
                            </div>
                        </div>
                    </button>
                `;
            }).join('')}
        </div>
    `;
}

// High Priority expansion
function renderHighPriorityExpansion() {
    const highPriority = DATA.cases.filter(c => c.priority === 'High');

    return `
        <div class="space-y-2">
            ${highPriority.map(c => `
                <button onclick="event.stopPropagation(); Router.navigate('/case/${c.id}')"
                        class="text-left w-full bg-white rounded border border-gray-200 p-3 hover:bg-blue-50 transition-colors">
                    <p class="font-medium text-sm text-gray-900">${c.name}</p>
                    <p class="text-xs text-gray-600 mt-1">${c.accused} • ${c.charges}</p>
                    <div class="flex gap-4 mt-2 text-xs text-gray-500">
                        <span><strong>Status:</strong> ${c.status}</span>
                        ${c.nextCourtDate ? `<span><strong>Next Court:</strong> ${formatDate(c.nextCourtDate)}</span>` : ''}
                    </div>
                </button>
            `).join('')}
        </div>
    `;
}
