// Progress & Dependencies View

function renderProgress() {
    const caseProgressHTML = DATA.cases.map(caseItem => {
        const color = getCaseColor(caseItem.id);
        const caseEvents = DATA.courtDates
            .filter(e => e.caseId === caseItem.id)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Define milestones
        const milestones = [
            { id: 'charges', label: 'Charges Laid', completed: true, blocked: false },
            { id: 'bail', label: 'Bail Hearing', completed: caseEvents.some(e => e.type === 'Bail Hearing'), blocked: false },
            { id: 'first', label: 'First Appearance', completed: true, blocked: false },
            { id: 'disclosure', label: 'Disclosure Complete', completed: caseItem.status !== 'Discovery', blocked: false },
            { id: 'pretrial', label: 'Pre-Trial Conference', completed: caseEvents.some(e => e.type === 'Pre-Trial Conference' && new Date(e.date) < STATE.today), blocked: !caseEvents.some(e => e.type === 'Pre-Trial Conference') },
            { id: 'documents', label: 'All Documents Received', completed: !DATA.documentRequests.filter(d => d.caseId === caseItem.id).some(d => d.status !== 'Received'), blocked: false },
            { id: 'resolution', label: 'Case Resolution Attempted', completed: caseItem.status === 'Trial Prep' || caseItem.trialDate !== null, blocked: false },
            { id: 'trial', label: 'Trial', completed: Boolean(caseItem.trialDate && new Date(caseItem.trialDate) < STATE.today), blocked: caseItem.trialDate === null }
        ];
        
        const completedCount = milestones.filter(m => m.completed).length;
        const progressPercent = (completedCount / milestones.length) * 100;
        
        const milestonesHTML = milestones.map((milestone, idx) => {
            const pretrialEvent = caseEvents.find(e => e.type === 'Pre-Trial Conference');
            const outstandingDocs = DATA.documentRequests.filter(d => d.caseId === caseItem.id && d.status !== 'Received');
            
            return `
                <div class="flex items-start gap-3">
                    <div class="flex flex-col items-center">
                        <div class="w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                            milestone.completed 
                                ? 'bg-green-500 border-green-500' 
                                : milestone.blocked 
                                ? 'bg-gray-300 border-gray-300'
                                : 'bg-white border-blue-500'
                        }">
                            ${milestone.completed 
                                ? '<i data-lucide="check-circle" class="w-4 h-4 text-white"></i>' 
                                : milestone.blocked 
                                ? '<i data-lucide="clock" class="w-4 h-4 text-gray-600"></i>'
                                : ''
                            }
                        </div>
                        ${idx < milestones.length - 1 
                            ? `<div class="w-0.5 h-8 ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}"></div>`
                            : ''
                        }
                    </div>
                    <div class="flex-1 pt-0.5">
                        <div class="flex items-center justify-between">
                            <p class="font-semibold text-sm ${
                                milestone.completed 
                                    ? 'text-green-700' 
                                    : milestone.blocked 
                                    ? 'text-gray-500'
                                    : 'text-gray-900'
                            }">
                                ${milestone.label}
                                ${milestone.blocked ? '<span class="ml-2 text-xs">(Pending)</span>' : ''}
                            </p>
                            ${milestone.id === 'trial' && caseItem.trialDate 
                                ? `<span class="text-xs text-gray-600">${formatDate(caseItem.trialDate)}</span>`
                                : ''
                            }
                            ${milestone.id === 'documents' 
                                ? `<span class="text-xs text-gray-600">
                                    ${DATA.documentRequests.filter(d => d.caseId === caseItem.id && d.status === 'Received').length}/
                                    ${DATA.documentRequests.filter(d => d.caseId === caseItem.id).length} received
                                   </span>`
                                : ''
                            }
                        </div>
                        
                        ${milestone.id === 'trial' && !milestone.completed && outstandingDocs.length > 0
                            ? `<div class="mt-2 text-xs bg-white border border-gray-300 rounded p-2">
                                <p class="font-semibold text-gray-900 flex items-center gap-1">
                                    <i data-lucide="alert-circle" class="w-3 h-3"></i>
                                    Blockers:
                                </p>
                                <ul class="mt-1 space-y-0.5 text-gray-700">
                                    ${outstandingDocs.slice(0, 3).map(doc =>
                                        `<li>• ${doc.type} from ${doc.recipient} - ${doc.status}</li>`
                                    ).join('')}
                                </ul>
                               </div>`
                            : ''
                        }
                        
                        ${milestone.id === 'pretrial' && pretrialEvent
                            ? `<p class="text-xs text-gray-600 mt-1">Scheduled: ${formatDate(pretrialEvent.date)}</p>`
                            : ''
                        }
                    </div>
                </div>
            `;
        }).join('');
        
        return `
            <div class="border-l-4 border-blue-500 rounded-lg bg-white p-5 hover:shadow-md transition cursor-pointer"
                 onclick="showRightSidebarDetail('case', ${caseItem.id}); STATE.rightSidebarOpen = true; render();">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="font-bold text-gray-900 text-lg">${caseItem.name}</h3>
                        <p class="text-sm text-gray-700 mt-1">${caseItem.accused} • ${caseItem.charges}</p>
                        <div class="flex items-center gap-3 mt-2">
                            <span class="text-xs font-semibold px-2 py-1 rounded ${
                                caseItem.priority === 'High'
                                    ? 'bg-red-100 text-red-800'
                                    : caseItem.priority === 'Medium'
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-gray-100 text-gray-700'
                            }">
                                ${caseItem.priority} Priority
                            </span>
                            <span class="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-700">${caseItem.status}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-3xl font-bold text-gray-900">${Math.round(progressPercent)}%</div>
                        <div class="text-xs text-gray-600 mt-1">${completedCount}/${milestones.length} Complete</div>
                    </div>
                </div>

                <!-- Progress Bar -->
                <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div class="bg-blue-600 h-2 rounded-full transition-all duration-500" style="width: ${progressPercent}%"></div>
                </div>

                <!-- Milestone Timeline -->
                <div class="space-y-3">
                    ${milestonesHTML}
                </div>

            </div>
        `;
    }).join('');
    
    return `
        <div class="space-y-4">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Case Progress & Dependencies</h2>
                <p class="text-sm text-gray-600 mb-6">Track the progression of cases through the criminal justice system. Click on a case to view its full timeline and dependencies.</p>
                
                <div class="space-y-6">
                    ${caseProgressHTML}
                </div>
            </div>

            <!-- Legend -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 class="font-semibold text-gray-900 mb-3">Milestone Legend</h3>
                <div class="grid grid-cols-3 gap-4 text-sm">
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded-full bg-green-500 border-2 border-green-500 flex items-center justify-center">
                            <i data-lucide="check-circle" class="w-4 h-4 text-white"></i>
                        </div>
                        <span class="text-gray-700">Completed</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded-full bg-white border-2 border-blue-500"></div>
                        <span class="text-gray-700">In Progress / Upcoming</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded-full bg-gray-300 border-2 border-gray-300 flex items-center justify-center">
                            <i data-lucide="clock" class="w-4 h-4 text-gray-600"></i>
                        </div>
                        <span class="text-gray-700">Blocked / Pending</span>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                    <p><strong>Note:</strong> Dependencies are automatically calculated based on court dates, document status, and case progress. Yellow blocker boxes show what's preventing the next milestone.</p>
                </div>
            </div>
        </div>
    `;
}