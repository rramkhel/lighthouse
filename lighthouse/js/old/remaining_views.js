// Case Detail View

function renderCaseDetail() {
    if (!STATE.selectedCase) {
        return '<div class="text-center py-12"><p class="text-gray-600">Case not found</p></div>';
    }
    
    const caseItem = STATE.selectedCase;
    const caseDocs = DATA.documentRequests.filter(d => d.caseId === caseItem.id);
    const caseEvents = DATA.courtDates.filter(e => e.caseId === caseItem.id);
    
    return `
        <div>
            <button onclick="Router.navigate('/cases')" class="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 text-sm">
                ← Back to Cases
            </button>
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-2xl font-semibold text-gray-900">${caseItem.name}</h2>
                    <p class="text-gray-600 mt-1">${caseItem.accused}</p>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <p class="text-sm font-semibold text-gray-700">Status</p>
                            <p class="text-gray-900 mt-1">${caseItem.status}</p>
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-gray-700">Priority</p>
                            <p class="mt-1 font-semibold ${getPriorityColor(caseItem.priority)}">${caseItem.priority}</p>
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-gray-700">Charges</p>
                            <p class="text-gray-900 mt-1">${caseItem.charges}</p>
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-gray-700">Next Court Date</p>
                            <p class="text-gray-900 mt-1">${caseItem.nextCourtDate ? formatDate(caseItem.nextCourtDate) : 'Not scheduled'}</p>
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-gray-700">Trial Date</p>
                            <p class="text-gray-900 mt-1">${caseItem.trialDate ? formatDate(caseItem.trialDate) : 'Not scheduled'}</p>
                        </div>
                    </div>

                    <div class="mt-8">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Documents for this Case</h3>
                        <div class="space-y-3">
                            ${caseDocs.length === 0 
                                ? '<p class="text-gray-500 text-sm">No documents for this case</p>'
                                : caseDocs.map(doc => `
                                    <div class="border border-gray-200 rounded p-4">
                                        <div class="flex justify-between items-start">
                                            <div>
                                                <p class="font-semibold text-gray-900">${doc.recipient}</p>
                                                <p class="text-sm text-gray-600">${doc.type}</p>
                                            </div>
                                            <div class="text-right">
                                                <span class="text-xs font-semibold px-2 py-1 rounded ${getStatusColor(doc.status)}">${doc.status}</span>
                                                <p class="text-sm text-gray-600 mt-1">Due ${formatDate(doc.responseDeadline)}</p>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')
                            }
                        </div>
                    </div>

                    <div class="mt-8">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Court Dates for this Case</h3>
                        <div class="space-y-3">
                            ${caseEvents.length === 0
                                ? '<p class="text-gray-500 text-sm">No court dates scheduled</p>'
                                : caseEvents.map(event => `
                                    <div class="border border-gray-200 rounded p-4">
                                        <div class="flex justify-between items-start">
                                            <div>
                                                <p class="font-semibold text-gray-900">${event.type}</p>
                                                <p class="text-sm text-gray-600">${event.location}</p>
                                            </div>
                                            <div class="text-right">
                                                <p class="text-sm font-semibold text-gray-900">${formatDate(event.date)}</p>
                                                <p class="text-xs text-gray-600">${event.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}