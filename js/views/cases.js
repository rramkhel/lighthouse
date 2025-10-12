// Cases List View

function renderCases() {
    return `
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-4 py-3 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">All Cases</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Case Name</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Accused</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Charges</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Priority</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Next Court</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Trial Date</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${DATA.cases.map(caseItem => `
                            <tr class="hover:bg-gray-50">
                                <td class="px-4 py-3">
                                    <button 
                                        onclick="Router.navigate('/case/${caseItem.id}')"
                                        class="font-semibold text-blue-600 hover:text-blue-800"
                                    >
                                        ${caseItem.name}
                                    </button>
                                </td>
                                <td class="px-4 py-3 text-gray-900">${caseItem.accused}</td>
                                <td class="px-4 py-3 text-gray-600">${caseItem.charges}</td>
                                <td class="px-4 py-3">
                                    <span class="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-800">
                                        ${caseItem.status}
                                    </span>
                                </td>
                                <td class="px-4 py-3">
                                    <span class="font-semibold ${getPriorityColor(caseItem.priority)}">
                                        ${caseItem.priority}
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-gray-900">
                                    ${caseItem.nextCourtDate ? formatDate(caseItem.nextCourtDate) : '-'}
                                </td>
                                <td class="px-4 py-3 text-gray-900">
                                    ${caseItem.trialDate ? formatDate(caseItem.trialDate) : '-'}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}