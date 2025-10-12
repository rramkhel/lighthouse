// Trial Prep View

function renderTrialPrep() {
    const trialReadyCases = DATA.cases.filter(c => c.status === 'Trial Prep' || c.trialDate);
    
    const caseSelectionHTML = trialReadyCases.map(caseItem => `
        <button
            onclick="STATE.selectedCase = DATA.cases.find(c => c.id === ${caseItem.id}); render();"
            class="text-left border-2 rounded p-3 transition ${
                STATE.selectedCase?.id === caseItem.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
            }"
        >
            <p class="font-semibold text-gray-900 text-sm">${caseItem.name}</p>
            <p class="text-xs text-gray-600 mt-0.5">${caseItem.accused}</p>
            ${caseItem.trialDate 
                ? `<p class="text-xs text-blue-600 font-semibold mt-1">Trial: ${formatDate(caseItem.trialDate)}</p>`
                : ''
            }
        </button>
    `).join('');
    
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
                    <h2 class="text-lg font-semibold text-gray-900">Select Case for Trial Preparation</h2>
                </div>
                <div class="p-4">
                    ${trialReadyCases.length === 0
                        ? '<p class="text-gray-500 text-center py-8">No cases ready for trial preparation</p>'
                        : `<div class="grid grid-cols-3 gap-3">${caseSelectionHTML}</div>`
                    }
                </div>
            </div>

            <!-- Trial Prep Document -->
            ${trialPrepDocument}
        </div>
    `;
}