// Bell Tower - Bail Hearing View

// Track which cases are expanded
if (!STATE.expandedBailCases) {
    STATE.expandedBailCases = new Set();
}

function toggleBailCase(caseId) {
    if (STATE.expandedBailCases.has(caseId)) {
        STATE.expandedBailCases.delete(caseId);
    } else {
        STATE.expandedBailCases.add(caseId);
    }
    render();
}

function renderBailHearing() {
    const rows = flattenBailHearings(DATA.bailHearings);

    let tableRows = '';

    rows.forEach((row, idx) => {
        const isNewDate = row.showDate && idx > 0;

        // Date divider row
        if (isNewDate) {
            tableRows += `<tr><td colspan="4" class="border-t-4 border-slate-300"></td></tr>`;
        }

        // Row border class
        let borderClass = '';
        if (!row.showDate && !row.showCity) {
            borderClass = 'border-t border-slate-100';
        } else if (!row.showDate && row.showCity) {
            borderClass = 'border-t border-slate-200';
        }

        const isExpanded = STATE.expandedBailCases.has(row.caseData.id);

        // Main row
        tableRows += `
            <tr class="hover:bg-slate-50 ${borderClass}">
                <td class="px-4 py-3 font-medium text-slate-900 align-top w-36">
                    ${row.showDate ? formatDate(row.date) : ''}
                </td>
                <td class="px-4 py-3 font-medium text-slate-600 align-top w-28">
                    ${row.showCity ? row.city : ''}
                </td>
                <td class="px-4 py-3">
                    <button onclick="toggleBailCase(${row.caseData.id})"
                            class="flex items-center gap-2 hover:text-blue-600">
                        <i data-lucide="${isExpanded ? 'chevron-down' : 'chevron-right'}"
                           class="w-4 h-4 text-slate-400"></i>
                        <span class="font-medium">${row.caseData.styleOfCause}</span>
                    </button>
                </td>
                <td class="px-4 py-3 text-right w-24">
                    <button class="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded" title="Move">
                        <i data-lucide="arrow-right-left" class="w-4 h-4"></i>
                    </button>
                    <button class="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded" title="Edit">
                        <i data-lucide="pencil" class="w-4 h-4"></i>
                    </button>
                </td>
            </tr>
        `;

        // Expandable details row
        tableRows += `
            <tr class="${isExpanded ? '' : 'hidden'}">
                <td></td>
                <td></td>
                <td colspan="2" class="px-4 pb-4">
                    ${renderBailCaseDetails(row.caseData)}
                </td>
            </tr>
        `;
    });

    return `
        <div class="space-y-4">
            <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-900">Bail Hearing Schedule</h2>
            </div>

            <div class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table class="w-full">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-300">
                            <th class="px-4 py-3 text-left font-semibold text-slate-700 text-sm">Date</th>
                            <th class="px-4 py-3 text-left font-semibold text-slate-700 text-sm">City</th>
                            <th class="px-4 py-3 text-left font-semibold text-slate-700 text-sm">Style of Cause</th>
                            <th class="px-4 py-3 text-right font-semibold text-slate-700 text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>

            <p class="text-center text-sm text-slate-400">Click on a case to expand details</p>
        </div>
    `;
}

function renderBailCaseDetails(caseData) {
    let additionalChargesHTML = '';
    if (caseData.additionalCharges) {
        additionalChargesHTML = `
            <div class="text-slate-500 font-medium">Additional Charges:</div>
            <div>
                <div>Info #${caseData.additionalCharges.infoNumber}</div>
                <div>${caseData.additionalCharges.charges}</div>
                <div class="text-slate-600">Bail: ${caseData.additionalCharges.bailStatus}</div>
            </div>
        `;
    }

    return `
        <div class="bg-slate-50 border border-slate-200 rounded-md p-4 text-sm ml-6">
            <div class="grid grid-cols-[160px_1fr] gap-y-2 gap-x-4">
                <div class="text-slate-500 font-medium">Present Date:</div>
                <div>${caseData.presentDate}</div>

                <div class="text-slate-500 font-medium">Previous Releases:</div>
                <div>${caseData.previousReleases}</div>

                <div class="text-slate-500 font-medium">Facts:</div>
                <div>${caseData.facts}</div>

                <div class="text-slate-500 font-medium">Criminal Record:</div>
                <div>${caseData.criminalRecord || '---'}</div>

                ${additionalChargesHTML}

                <div class="text-slate-500 font-medium">Crown Position:</div>
                <div>
                    <div class="font-medium ${getCrownPositionColor(caseData.crownPosition.grounds)}">
                        ${caseData.crownPosition.grounds}
                    </div>
                    <div class="text-slate-600 italic">"${caseData.crownPosition.reasoning}"</div>
                </div>

                <div class="text-slate-500 font-medium">Bail Result:</div>
                <div class="font-medium ${getBailResultColor(caseData.bailResult)}">
                    ${caseData.bailResult}
                </div>

                <div class="text-slate-500 font-medium">Presiding Justice:</div>
                <div>${caseData.presidingJustice}</div>
            </div>
        </div>
    `;
}
