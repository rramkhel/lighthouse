// Trial Prep View

// Initialize trial prep state if not exists
if (!STATE.trialPrepSearch) {
    STATE.trialPrepSearch = '';
    STATE.trialPrepSortBy = 'date'; // date, name, priority
    STATE.trialPrepFilterStatus = 'all'; // all, trial-prep, active, discovery
    STATE.trialPrepCasesExpanded = true; // collapsible state
}

function handleTrialPrepSearch(event) {
    STATE.trialPrepSearch = event.target.value;
    // Store cursor position before render
    const cursorPos = event.target.selectionStart;
    render();
    // Restore focus and cursor position after render
    setTimeout(() => {
        const input = document.querySelector('input[placeholder="Search cases, accused, charges..."]');
        if (input) {
            input.focus();
            input.setSelectionRange(cursorPos, cursorPos);
        }
    }, 0);
}

function handleTrialPrepSort(sortBy) {
    STATE.trialPrepSortBy = sortBy;
    render();
}

function handleTrialPrepFilter(status) {
    STATE.trialPrepFilterStatus = status;
    render();
}

function toggleTrialPrepCases() {
    STATE.trialPrepCasesExpanded = !STATE.trialPrepCasesExpanded;
    render();
}

function renderTrialPrep() {
    // Get all cases (not just trial prep)
    let cases = [...DATA.cases];

    // Apply status filter
    if (STATE.trialPrepFilterStatus !== 'all') {
        const statusMap = {
            'trial-prep': 'Trial Prep',
            'active': 'Active',
            'discovery': 'Discovery'
        };
        cases = cases.filter(c => c.status === statusMap[STATE.trialPrepFilterStatus]);
    }

    // Apply search filter
    if (STATE.trialPrepSearch) {
        const query = STATE.trialPrepSearch.toLowerCase();
        cases = cases.filter(c =>
            c.name.toLowerCase().includes(query) ||
            c.accused.toLowerCase().includes(query) ||
            c.charges.toLowerCase().includes(query)
        );
    }

    // Apply sort
    cases.sort((a, b) => {
        if (STATE.trialPrepSortBy === 'date') {
            // Sort by next court date or trial date
            const dateA = new Date(a.trialDate || a.nextCourtDate || '9999-12-31');
            const dateB = new Date(b.trialDate || b.nextCourtDate || '9999-12-31');
            return dateA - dateB;
        } else if (STATE.trialPrepSortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (STATE.trialPrepSortBy === 'priority') {
            const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return 0;
    });

    const caseSelectionHTML = cases.map(caseItem => {
        const nextDate = caseItem.trialDate || caseItem.nextCourtDate;
        const dateObj = nextDate ? new Date(nextDate) : null;
        const dateType = caseItem.trialDate ? 'Trial' : 'Hearing';

        // Get court date info for this case
        const courtDate = DATA.courtDates.find(cd =>
            cd.caseId === caseItem.id &&
            cd.date === nextDate
        );

        // Generate consistent random case number based on case id
        const seed = caseItem.id * 123456;
        const randomNum = String(seed).padStart(8, '0').slice(0, 8);

        // Format date for left side display
        const dayOfWeek = dateObj ? dateObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase() : '';
        const dayOfMonth = dateObj ? dateObj.getDate() : '';
        const month = dateObj ? dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase() : '';

        return `
        <tr onclick="STATE.selectedCase = DATA.cases.find(c => c.id === ${caseItem.id}); render();">
            <td class="p-0">
                <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                    STATE.selectedCase?.id === caseItem.id ? 'bg-blue-50' : ''
                }">
                    <!-- Big Date -->
                    ${dateObj ? `
                        <div class="text-center flex-shrink-0" style="min-width: 36px;">
                            <div class="text-[9px] text-gray-500 uppercase font-semibold tracking-wide">${dayOfWeek}</div>
                            <div class="text-lg font-semibold text-gray-900 leading-tight">${dayOfMonth}</div>
                        </div>
                    ` : `
                        <div class="text-center flex-shrink-0" style="min-width: 36px;">
                            <div class="text-[9px] text-gray-400 uppercase font-semibold tracking-wide">--</div>
                            <div class="text-lg font-semibold text-gray-400 leading-tight">--</div>
                        </div>
                    `}
                    <div class="w-px h-10 bg-gray-200"></div>

                    <!-- Case Info -->
                    <div class="flex-1 grid grid-cols-3 gap-3">
                        <!-- Case Name and Number -->
                        <div>
                            <div class="flex items-center gap-1.5 mb-0.5">
                                <i data-lucide="briefcase" class="w-3 h-3 text-gray-400"></i>
                                <span class="text-xs font-semibold text-gray-900">${caseItem.name}</span>
                            </div>
                            <p class="text-[10px] text-gray-500"><span class="font-semibold">No:</span> 2${randomNum}-2p2</p>
                        </div>

                        <!-- Charges -->
                        <div>
                            <div class="flex items-center gap-1.5 mb-0.5">
                                <i data-lucide="alert-circle" class="w-3 h-3 text-gray-400"></i>
                                <span class="text-xs font-semibold text-gray-900">Charges</span>
                            </div>
                            <p class="text-[10px] text-gray-500">${caseItem.charges}</p>
                        </div>

                        <!-- Trial Date & Phase -->
                        <div>
                            ${dateObj ? `
                                <div class="flex items-center gap-1.5 mb-0.5">
                                    <i data-lucide="calendar" class="w-3 h-3 text-gray-400"></i>
                                    <span class="text-xs font-semibold text-gray-900">${dateType}</span>
                                </div>
                                <p class="text-[10px] text-gray-500">${caseItem.name.split(' ')[2]} • ${dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • ${courtDate ? courtDate.time : 'TBD'}</p>
                            ` : `
                                <div class="text-xs text-gray-400 italic">No event scheduled</div>
                            `}
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    `;
    }).join('');
    
    let trialPrepDocument = '';
    
    if (STATE.selectedCase) {
        const caseItem = STATE.selectedCase;
        const caseVictims = DATA.victims.filter(v => v.caseId === caseItem.id);
        const caseWitnesses = DATA.documentRequests.filter(doc => 
            doc.caseId === caseItem.id && 
            (doc.type.includes('Witness') || doc.recipient.includes('Officer') || doc.recipient.includes('Dr.'))
        );
        const caseExhibits = DATA.documentRequests.filter(doc => 
            doc.caseId === caseItem.id && doc.status === 'Received'
        );
        const caseCourtDates = DATA.courtDates
            .filter(event => event.caseId === caseItem.id)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        
        trialPrepDocument = `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-gray-900">Trial Preparation Document - ${caseItem.name}</h2>
                    <div class="flex gap-2">
                        <button class="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                            <i data-lucide="download" class="w-4 h-4"></i>
                            Export
                        </button>
                        <button class="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">
                            <i data-lucide="printer" class="w-4 h-4"></i>
                            Print
                        </button>
                    </div>
                </div>
                <div class="p-6 max-w-4xl mx-auto space-y-6">
                    <!-- Preliminary Details -->
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">PRELIMINARY DETAILS</h3>
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div><span class="font-semibold">Information Number:</span><span class="ml-2 text-gray-700">[To be filled]</span></div>
                            <div><span class="font-semibold">Accused:</span><span class="ml-2 text-gray-700">${caseItem.accused}</span></div>
                            <div><span class="font-semibold">DOB:</span><span class="ml-2 text-gray-700">${caseItem.dob}</span></div>
                            <div><span class="font-semibold">Charge(s):</span><span class="ml-2 text-gray-700">${caseItem.charges}</span></div>
                            <div><span class="font-semibold">Offence Date:</span><span class="ml-2 text-gray-700">${formatDate(caseItem.offenceDate)}</span></div>
                            <div><span class="font-semibold">Location:</span><span class="ml-2 text-gray-700">${caseItem.location}</span></div>
                            <div><span class="font-semibold">Investigator:</span><span class="ml-2 text-gray-700">${caseItem.investigator}</span></div>
                            <div><span class="font-semibold">Detachment:</span><span class="ml-2 text-gray-700">${caseItem.detachment}</span></div>
                            <div class="col-span-2"><span class="font-semibold">Criminal Record:</span><span class="ml-2 text-gray-700">${caseItem.criminalRecord}</span></div>
                        </div>
                    </div>

                    <!-- Victim Information -->
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">VICTIM INFORMATION</h3>
                        ${caseVictims.length === 0
                            ? '<p class="text-sm text-gray-500 italic">No victim information available</p>'
                            : caseVictims.map((victim, idx) => `
                                <div class="mb-3 text-sm">
                                    <p class="font-semibold">Victim ${idx + 1}:</p>
                                    <div class="ml-4 mt-1 space-y-1">
                                        <p><span class="font-semibold">Name:</span> ${victim.name}</p>
                                        <p><span class="font-semibold">DOB:</span> ${victim.dob}</p>
                                        <p><span class="font-semibold">Relationship to Accused:</span> ${victim.relationship}</p>
                                    </div>
                                </div>
                            `).join('')
                        }
                    </div>

                    <!-- Witness List -->
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">WITNESS LIST</h3>
                        ${caseWitnesses.length === 0
                            ? '<p class="text-sm text-gray-500 italic">No witnesses identified</p>'
                            : `<div class="space-y-2 text-sm">
                                ${caseWitnesses.map((doc, idx) => `
                                    <div class="flex items-start gap-2">
                                        <span class="font-semibold">${idx + 1}.</span>
                                        <div>
                                            <p class="font-medium">${doc.recipient}</p>
                                            <p class="text-xs text-gray-600">${doc.type}</p>
                                        </div>
                                    </div>
                                `).join('')}
                               </div>`
                        }
                    </div>

                    <!-- Exhibit List -->
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">EXHIBIT LIST</h3>
                        ${caseExhibits.length === 0
                            ? '<p class="text-sm text-gray-500 italic">No exhibits received yet</p>'
                            : `<div class="space-y-2 text-sm">
                                ${caseExhibits.map((doc, idx) => `
                                    <div class="flex items-start gap-2">
                                        <span class="font-semibold">Exhibit ${String.fromCharCode(65 + idx)}:</span>
                                        <p>${doc.type} from ${doc.recipient}</p>
                                    </div>
                                `).join('')}
                               </div>`
                        }
                    </div>

                    <!-- Court Dates -->
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">COURT DATES</h3>
                        ${caseCourtDates.length === 0
                            ? '<p class="text-sm text-gray-500 italic">No court dates scheduled</p>'
                            : `<div class="space-y-2 text-sm">
                                ${caseCourtDates.map(event => `
                                    <div>
                                        <p><span class="font-semibold">${event.type}:</span> ${formatDate(event.date)} at ${event.time}</p>
                                        <p class="text-xs text-gray-600 ml-4">${event.location}, ${event.room}</p>
                                    </div>
                                `).join('')}
                               </div>`
                        }
                    </div>

                    <!-- Sections to be filled -->
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">FACTS/THEORY</h3>
                        <p class="text-sm text-gray-500 italic">[To be completed during trial preparation]</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">ELEMENTS OF OFFENCE</h3>
                        <p class="text-sm text-gray-500 italic">[To be completed during trial preparation]</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">LEGAL ISSUES/DEFENSES</h3>
                        <p class="text-sm text-gray-500 italic">[To be completed during trial preparation]</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">EXAMINATION IN CHIEF</h3>
                        <p class="text-sm text-gray-500 italic">[To be completed during trial preparation]</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">CROSS EXAMINATION</h3>
                        <p class="text-sm text-gray-500 italic">[To be completed during trial preparation]</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">CLOSING SUBMISSIONS</h3>
                        <p class="text-sm text-gray-500 italic">[To be completed during trial preparation]</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="space-y-4">
            <!-- Case Selection -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-4 py-3 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <h2 class="text-lg font-semibold text-gray-900">Trial Preparation Cases</h2>
                            <span class="text-sm text-gray-600">${cases.length} case${cases.length === 1 ? '' : 's'}</span>
                        </div>
                        <button onclick="toggleTrialPrepCases()" class="p-1 hover:bg-gray-100 rounded transition-colors">
                            <i data-lucide="${STATE.trialPrepCasesExpanded ? 'chevron-up' : 'chevron-down'}" class="w-5 h-5 text-gray-600"></i>
                        </button>
                    </div>
                </div>

                ${STATE.trialPrepCasesExpanded ? `
                    <!-- Search and Filters -->
                    <div class="px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <div class="flex items-center gap-4">
                            <!-- Search -->
                            <div class="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Search cases, accused, charges..."
                                    value="${STATE.trialPrepSearch}"
                                    oninput="handleTrialPrepSearch(event)"
                                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                />
                                <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            </div>

                            <!-- Sort -->
                            <div class="flex items-center gap-2">
                                <label class="text-sm text-gray-600 font-medium">Sort:</label>
                                <select
                                    onchange="handleTrialPrepSort(this.value)"
                                    class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="date" ${STATE.trialPrepSortBy === 'date' ? 'selected' : ''}>Date</option>
                                    <option value="name" ${STATE.trialPrepSortBy === 'name' ? 'selected' : ''}>Name</option>
                                    <option value="priority" ${STATE.trialPrepSortBy === 'priority' ? 'selected' : ''}>Priority</option>
                                </select>
                            </div>

                            <!-- Filter -->
                            <div class="flex items-center gap-2">
                                <label class="text-sm text-gray-600 font-medium">Status:</label>
                                <select
                                    onchange="handleTrialPrepFilter(this.value)"
                                    class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="all" ${STATE.trialPrepFilterStatus === 'all' ? 'selected' : ''}>All</option>
                                    <option value="trial-prep" ${STATE.trialPrepFilterStatus === 'trial-prep' ? 'selected' : ''}>Trial Prep</option>
                                    <option value="active" ${STATE.trialPrepFilterStatus === 'active' ? 'selected' : ''}>Active</option>
                                    <option value="discovery" ${STATE.trialPrepFilterStatus === 'discovery' ? 'selected' : ''}>Discovery</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="p-4">
                        ${cases.length === 0
                            ? '<p class="text-gray-500 text-center py-8">No cases found</p>'
                            : `
                            <table class="w-full">
                                <thead>
                                    <tr>
                                        <th class="pb-2">
                                            <div class="flex items-center gap-3 px-2">
                                                <div class="text-center flex-shrink-0" style="min-width: 36px;">
                                                    <span class="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Date</span>
                                                </div>
                                                <div class="w-px h-4 bg-gray-200"></div>
                                                <div class="flex-1 grid grid-cols-3 gap-3">
                                                    <span class="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Case</span>
                                                    <span class="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Charges</span>
                                                    <span class="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Next Event</span>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="space-y-2">
                                    ${caseSelectionHTML}
                                </tbody>
                            </table>
                            `
                        }
                    </div>
                ` : ''}
            </div>

            <!-- Trial Prep Document -->
            ${trialPrepDocument}
        </div>
    `;
}