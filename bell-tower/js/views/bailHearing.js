// Bell Tower - Bail Hearing View

// Track which cases are expanded
if (!STATE.expandedBailCases) {
    STATE.expandedBailCases = new Set();
}

// Move modal state
if (!STATE.moveModal) {
    STATE.moveModal = {
        open: false,
        caseId: null,
        currentDate: null,
        currentCity: null
    };
}

function toggleBailCase(caseId) {
    if (STATE.expandedBailCases.has(caseId)) {
        STATE.expandedBailCases.delete(caseId);
    } else {
        STATE.expandedBailCases.add(caseId);
    }
    render();
}

// Move modal functions
function openMoveModal(caseId, currentDate, currentCity) {
    STATE.moveModal = {
        open: true,
        caseId: caseId,
        currentDate: currentDate,
        currentCity: currentCity
    };
    render();
}

function closeMoveModal() {
    STATE.moveModal = {
        open: false,
        caseId: null,
        currentDate: null,
        currentCity: null
    };
    render();
}

function getAvailableCities() {
    const cities = new Set();
    DATA.bailHearings.forEach(dateEntry => {
        dateEntry.cities.forEach(city => {
            cities.add(city.name);
        });
    });
    return Array.from(cities).sort();
}

function findCaseById(caseId) {
    for (const dateEntry of DATA.bailHearings) {
        for (const city of dateEntry.cities) {
            const caseData = city.cases.find(c => c.id === caseId);
            if (caseData) {
                return { caseData, date: dateEntry.date, city: city.name };
            }
        }
    }
    return null;
}

function moveCase(caseId, fromDate, fromCity, toDate, toCity) {
    // If nothing changed, just close modal
    if (fromDate === toDate && fromCity === toCity) {
        closeMoveModal();
        return;
    }

    // Find and remove case from current location
    let movedCase = null;
    for (const dateEntry of DATA.bailHearings) {
        if (dateEntry.date === fromDate) {
            for (const city of dateEntry.cities) {
                if (city.name === fromCity) {
                    const caseIndex = city.cases.findIndex(c => c.id === caseId);
                    if (caseIndex > -1) {
                        movedCase = city.cases.splice(caseIndex, 1)[0];
                        break;
                    }
                }
            }
        }
    }

    if (!movedCase) {
        closeMoveModal();
        return;
    }

    // Add move record to case's moveHistory
    if (!movedCase.moveHistory) {
        movedCase.moveHistory = [];
    }
    movedCase.moveHistory.push({
        fromDate: fromDate,
        fromCity: fromCity,
        toDate: toDate,
        toCity: toCity,
        movedAt: new Date().toISOString()
    });

    // Find or create target date entry
    let targetDateEntry = DATA.bailHearings.find(d => d.date === toDate);
    if (!targetDateEntry) {
        targetDateEntry = { date: toDate, cities: [] };
        DATA.bailHearings.push(targetDateEntry);
        // Sort dates chronologically
        DATA.bailHearings.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // Find or create target city entry
    let targetCity = targetDateEntry.cities.find(c => c.name === toCity);
    if (!targetCity) {
        targetCity = { name: toCity, cases: [] };
        targetDateEntry.cities.push(targetCity);
        // Sort cities alphabetically
        targetDateEntry.cities.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Add case to new location
    targetCity.cases.push(movedCase);

    // Clean up empty city/date entries
    DATA.bailHearings.forEach(dateEntry => {
        dateEntry.cities = dateEntry.cities.filter(city => city.cases.length > 0);
    });
    DATA.bailHearings = DATA.bailHearings.filter(dateEntry => dateEntry.cities.length > 0);

    closeMoveModal();
}

function handleMoveSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const toDate = form.newDate.value;
    const toCity = form.newCity.value.trim();

    if (!toDate || !toCity) {
        alert('Please enter both date and city');
        return;
    }

    moveCase(
        STATE.moveModal.caseId,
        STATE.moveModal.currentDate,
        STATE.moveModal.currentCity,
        toDate,
        toCity
    );
}

function renderMoveModal() {
    if (!STATE.moveModal.open) return '';

    const caseInfo = findCaseById(STATE.moveModal.caseId);
    if (!caseInfo) return '';

    const { caseData } = caseInfo;
    const cities = getAvailableCities();
    const moveHistory = caseData.moveHistory || [];

    return `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onclick="closeMoveModal()">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md" onclick="event.stopPropagation()">
                <!-- Header -->
                <div class="bg-amber-500 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
                    <div>
                        <h3 class="font-semibold text-lg">Move Case</h3>
                        <p class="text-amber-100 text-sm">${caseData.styleOfCause}</p>
                    </div>
                    <button onclick="closeMoveModal()" class="text-white hover:text-amber-200">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>

                <!-- Current Location -->
                <div class="px-6 py-4 bg-slate-50 border-b border-slate-200">
                    <p class="text-xs text-slate-500 uppercase tracking-wide mb-2">Current Location</p>
                    <div class="flex items-center gap-4 text-sm">
                        <span class="flex items-center gap-1.5">
                            <i data-lucide="calendar" class="w-4 h-4 text-slate-400"></i>
                            ${formatDate(STATE.moveModal.currentDate)}
                        </span>
                        <span class="flex items-center gap-1.5">
                            <i data-lucide="map-pin" class="w-4 h-4 text-slate-400"></i>
                            ${STATE.moveModal.currentCity}
                        </span>
                    </div>
                </div>

                <!-- Form -->
                <form onsubmit="handleMoveSubmit(event)" class="px-6 py-4 space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">New Date</label>
                        <input type="date" name="newDate" value="${STATE.moveModal.currentDate}"
                               class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">New City</label>
                        <input type="text" name="newCity" value="${STATE.moveModal.currentCity}" list="cityList"
                               class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                               placeholder="Enter city name">
                        <datalist id="cityList">
                            ${cities.map(city => `<option value="${city}">`).join('')}
                        </datalist>
                    </div>

                    ${moveHistory.length > 0 ? `
                        <div class="pt-2">
                            <p class="text-xs text-slate-500 mb-2">Previous dates</p>
                            <div class="space-y-1">
                                ${[...moveHistory].reverse().map(move => `
                                    <p class="text-xs text-slate-400">${formatDate(move.fromDate)} · ${move.fromCity}</p>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <!-- Actions -->
                    <div class="flex justify-end gap-3 pt-4 border-t border-slate-200">
                        <button type="button" onclick="closeMoveModal()"
                                class="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                            Cancel
                        </button>
                        <button type="submit"
                                class="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 rounded-lg transition-colors">
                            Move Case
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
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
        const hasMoveHistory = row.caseData.moveHistory && row.caseData.moveHistory.length > 0;

        // Main row
        tableRows += `
            <tr class="hover:bg-slate-50 ${borderClass}">
                <td class="px-4 py-3 font-medium text-slate-900 align-top w-44 whitespace-nowrap">
                    ${row.showDate ? formatDate(row.date) : ''}
                </td>
                <td class="px-4 py-3 font-medium text-slate-600 align-top w-40 whitespace-nowrap">
                    ${row.showCity ? row.city : ''}
                </td>
                <td class="px-4 py-3">
                    <button onclick="toggleBailCase(${row.caseData.id})"
                            class="flex items-center gap-2 hover:text-blue-600">
                        <i data-lucide="${isExpanded ? 'chevron-down' : 'chevron-right'}"
                           class="w-4 h-4 text-slate-400"></i>
                        <span class="font-medium">${row.caseData.styleOfCause}</span>
                        ${hasMoveHistory ? `
                            <span class="inline-flex items-center gap-1.5 text-xs text-amber-600">
                                <span class="w-2 h-2 bg-amber-400 rounded-full"></span>
                                moved
                            </span>
                        ` : ''}
                    </button>
                </td>
                <td class="px-4 py-3 text-right w-24">
                    <button onclick="openMoveModal(${row.caseData.id}, '${row.date}', '${row.city}')"
                            class="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                            title="Move to different date/city">
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
        ${renderMoveModal()}
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

    const moveHistory = caseData.moveHistory || [];

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

            ${moveHistory.length > 0 ? `
                <div class="border-t border-slate-200 pt-3 mt-3">
                    <div class="flex items-center text-xs text-slate-400 mb-2">
                        <span>Scheduling History</span>
                        <span class="ml-auto">Moved</span>
                    </div>
                    <div class="space-y-1.5">
                        ${[...moveHistory].reverse().map(move => `
                            <div class="flex items-center text-xs text-slate-500">
                                <span>${formatDate(move.toDate)} · ${move.toCity}</span>
                                <span class="ml-auto text-slate-400">${formatDate(move.movedAt.split('T')[0])}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}
