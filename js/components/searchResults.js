// Search Results Dropdown Component

function renderSearchResults() {
    if (!STATE.searchVisible || !STATE.searchResults) {
        return '';
    }

    const { cases, documents, courtDates, totalResults } = STATE.searchResults;

    if (totalResults === 0) {
        return `
            <div class="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 slide-down">
                <div class="p-4 text-center text-gray-500 text-sm">
                    No results found for "${STATE.searchQuery}"
                </div>
            </div>
        `;
    }

    return `
        <div class="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto slide-down">
            <div class="sticky top-0 bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                <span class="text-xs font-semibold text-gray-700 uppercase">
                    ${totalResults} Result${totalResults === 1 ? '' : 's'}
                </span>
                <button onclick="clearSearch()" class="text-gray-400 hover:text-gray-600">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>

            ${cases.length > 0 ? `
                <div>
                    <div class="px-4 py-2 bg-blue-50 border-b border-blue-100">
                        <p class="text-xs font-semibold text-blue-900 uppercase flex items-center gap-2">
                            <i data-lucide="briefcase" class="w-3 h-3"></i>
                            Cases (${cases.length})
                        </p>
                    </div>
                    ${cases.map(c => `
                        <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                             onclick="navigateToSearchResult('case', ${c.id})">
                            <p class="font-medium text-sm text-gray-900">${c.name}</p>
                            <p class="text-xs text-gray-600 mt-0.5">${c.accused} • ${c.charges}</p>
                            <div class="flex gap-2 mt-1">
                                <span class="text-xs px-2 py-0.5 rounded ${c.priority === 'High' ? 'bg-red-100 text-red-700' : c.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}">
                                    ${c.priority}
                                </span>
                                <span class="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                                    ${c.status}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${documents.length > 0 ? `
                <div>
                    <div class="px-4 py-2 bg-green-50 border-b border-green-100">
                        <p class="text-xs font-semibold text-green-900 uppercase flex items-center gap-2">
                            <i data-lucide="file-text" class="w-3 h-3"></i>
                            Documents (${documents.length})
                        </p>
                    </div>
                    ${documents.map(d => `
                        <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                             onclick="navigateToSearchResult('document', ${d.id})">
                            <p class="font-medium text-sm text-gray-900">${d.recipient}</p>
                            <p class="text-xs text-gray-600 mt-0.5">${d.caseName} • ${d.type}</p>
                            <span class="inline-block text-xs px-2 py-0.5 rounded mt-1 ${getStatusColor(d.status)}">
                                ${d.status}
                            </span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${courtDates.length > 0 ? `
                <div>
                    <div class="px-4 py-2 bg-purple-50 border-b border-purple-100">
                        <p class="text-xs font-semibold text-purple-900 uppercase flex items-center gap-2">
                            <i data-lucide="calendar" class="w-3 h-3"></i>
                            Court Dates (${courtDates.length})
                        </p>
                    </div>
                    ${courtDates.map(e => `
                        <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                             onclick="navigateToSearchResult('court', ${e.id})">
                            <p class="font-medium text-sm text-gray-900">${e.type}</p>
                            <p class="text-xs text-gray-600 mt-0.5">${e.caseName}</p>
                            <p class="text-xs text-gray-500 mt-1">
                                ${formatDate(e.date)} at ${e.time} • ${e.location}
                            </p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            <!-- See All Results Footer -->
            <div class="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-4 py-3">
                <button onclick="navigateToSearchPage()" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    See All ${totalResults} Result${totalResults === 1 ? '' : 's'}
                </button>
            </div>
        </div>
    `;
}
