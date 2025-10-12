// Documents View

function renderDocuments() {
    return `
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-4 py-3 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Document Requests</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Case</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Recipient</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Response Deadline</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Priority</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${DATA.documentRequests.map(doc => `
                            <tr class="hover:bg-gray-50">
                                <td class="px-4 py-3 font-medium text-gray-900">${doc.caseName}</td>
                                <td class="px-4 py-3 text-gray-900">${doc.recipient}</td>
                                <td class="px-4 py-3 text-gray-600">${doc.type}</td>
                                <td class="px-4 py-3">
                                    <span class="text-xs font-semibold px-2 py-1 rounded ${getStatusColor(doc.status)}">${doc.status}</span>
                                </td>
                                <td class="px-4 py-3 text-gray-900">${formatDate(doc.responseDeadline)}</td>
                                <td class="px-4 py-3">
                                    <span class="font-semibold ${getPriorityColor(doc.priority)}">${doc.priority}</span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}