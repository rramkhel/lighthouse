// Search Results Page - Full View

function renderSearchResultsPage() {
    const results = STATE.searchResults || performSearch(STATE.searchQuery);

    if (!STATE.searchQuery || STATE.searchQuery.length < 2) {
        // Show search interface with recent items
        const recentCases = DATA.cases.slice(0, 3);
        const upcomingDates = getUpcomingCourtDates().slice(0, 3);
        const recentDocs = DATA.documentRequests.slice(0, 3);

        return `
            <div class="max-w-6xl mx-auto space-y-6">
                <!-- Search Header -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <div class="max-w-2xl mx-auto">
                        <h1 class="text-3xl font-bold text-gray-900 mb-3 text-center">Search</h1>
                        <p class="text-gray-600 text-center mb-6">Find cases, documents, and court dates</p>

                        <!-- Large Search Input -->
                        <div class="relative">
                            <input
                                type="text"
                                id="pageSearch"
                                placeholder="Search by case name, accused, document type, location..."
                                value="${STATE.searchQuery}"
                                class="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                oninput="handleSearchInput(this.value)"
                                autofocus
                            />
                            <i data-lucide="search" class="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Recent Cases -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <i data-lucide="briefcase" class="w-5 h-5 text-blue-600"></i>
                            Recent Cases
                        </h3>
                        <div class="space-y-3">
                            ${recentCases.map(c => `
                                <div class="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition border border-gray-100"
                                     onclick="Router.navigate('/case/${c.id}')">
                                    <p class="font-semibold text-sm text-gray-900">${c.name}</p>
                                    <p class="text-xs text-gray-600 mt-1">${c.accused}</p>
                                    <span class="inline-block text-xs px-2 py-1 rounded mt-2 ${c.priority === 'High' ? 'bg-red-100 text-red-700' : c.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}">
                                        ${c.priority} Priority
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                        <button onclick="Router.navigate('/cases')" class="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View All Cases →
                        </button>
                    </div>

                    <!-- Upcoming Court Dates -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <i data-lucide="calendar" class="w-5 h-5 text-purple-600"></i>
                            Upcoming Dates
                        </h3>
                        <div class="space-y-3">
                            ${upcomingDates.map(e => `
                                <div class="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition border border-gray-100"
                                     onclick="Router.navigate('/case/${e.caseId}')">
                                    <p class="font-semibold text-sm text-gray-900">${e.type}</p>
                                    <p class="text-xs text-gray-600 mt-1">${e.caseName}</p>
                                    <p class="text-xs text-purple-600 mt-2 font-medium">${formatDate(e.date)}</p>
                                </div>
                            `).join('')}
                        </div>
                        <button onclick="Router.navigate('/calendar')" class="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View Calendar →
                        </button>
                    </div>

                    <!-- Recent Documents -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <i data-lucide="file-text" class="w-5 h-5 text-green-600"></i>
                            Recent Documents
                        </h3>
                        <div class="space-y-3">
                            ${recentDocs.map(d => `
                                <div class="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition border border-gray-100"
                                     onclick="Router.navigate('/case/${d.caseId}')">
                                    <p class="font-semibold text-sm text-gray-900">${d.recipient}</p>
                                    <p class="text-xs text-gray-600 mt-1">${d.type}</p>
                                    <span class="inline-block text-xs px-2 py-1 rounded mt-2 ${getStatusColor(d.status)}">
                                        ${d.status}
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                        <button onclick="Router.navigate('/documents')" class="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View All Documents →
                        </button>
                    </div>
                </div>

                <!-- Search Tips -->
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 class="text-sm font-bold text-blue-900 mb-3">Search Tips</h3>
                    <ul class="text-sm text-blue-800 space-y-1">
                        <li>• Search by case name (e.g., "Thompson", "Chen")</li>
                        <li>• Search by accused person's name</li>
                        <li>• Search by document recipient or type</li>
                        <li>• Search by location (e.g., "Edmonton", "St. Albert")</li>
                    </ul>
                </div>
            </div>
        `;
    }

    if (!results || results.totalResults === 0) {
        return `
            <div class="max-w-4xl mx-auto">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <i data-lucide="search-x" class="w-16 h-16 mx-auto text-gray-400 mb-4"></i>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
                    <p class="text-gray-600">No matches for "${STATE.searchQuery}"</p>
                    <p class="text-sm text-gray-500 mt-2">Try different keywords or check your spelling</p>
                </div>
            </div>
        `;
    }

    const { cases, documents, courtDates, totalResults } = results;

    return `
        <div class="max-w-6xl mx-auto space-y-6">
            <!-- Header -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h1 class="text-2xl font-bold text-gray-900 mb-2">Search Results</h1>
                <p class="text-gray-600">Found <strong>${totalResults}</strong> result${totalResults === 1 ? '' : 's'} for "<strong>${STATE.searchQuery}</strong>"</p>
            </div>

            <!-- Cases Section -->
            ${cases.length > 0 ? `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-200 bg-blue-50">
                        <h2 class="text-lg font-bold text-blue-900 flex items-center gap-2">
                            <i data-lucide="briefcase" class="w-5 h-5"></i>
                            Cases (${cases.length})
                        </h2>
                    </div>
                    <div class="divide-y divide-gray-100">
                        ${cases.map(c => `
                            <div class="p-6 hover:bg-gray-50 cursor-pointer transition"
                                 onclick="Router.navigate('/case/${c.id}')">
                                <div class="flex items-start justify-between">
                                    <div class="flex-1">
                                        <h3 class="text-lg font-semibold text-gray-900">${c.name}</h3>
                                        <p class="text-gray-600 mt-1">${c.accused}</p>
                                        <p class="text-sm text-gray-500 mt-2">${c.charges}</p>
                                        <div class="flex gap-2 mt-3">
                                            <span class="text-xs px-3 py-1 rounded-full ${c.priority === 'High' ? 'bg-red-100 text-red-700' : c.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}">
                                                ${c.priority} Priority
                                            </span>
                                            <span class="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                                                ${c.status}
                                            </span>
                                            ${c.nextCourtDate ? `<span class="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">Next Court: ${formatDate(c.nextCourtDate)}</span>` : ''}
                                        </div>
                                    </div>
                                    <i data-lucide="chevron-right" class="w-5 h-5 text-gray-400"></i>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Documents Section -->
            ${documents.length > 0 ? `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-200 bg-green-50">
                        <h2 class="text-lg font-bold text-green-900 flex items-center gap-2">
                            <i data-lucide="file-text" class="w-5 h-5"></i>
                            Documents (${documents.length})
                        </h2>
                    </div>
                    <div class="divide-y divide-gray-100">
                        ${documents.map(d => `
                            <div class="p-6 hover:bg-gray-50 cursor-pointer transition"
                                 onclick="navigateToSearchResult('document', ${d.id})">
                                <div class="flex items-start justify-between">
                                    <div class="flex-1">
                                        <h3 class="text-lg font-semibold text-gray-900">${d.recipient}</h3>
                                        <p class="text-gray-600 mt-1">${d.type}</p>
                                        <p class="text-sm text-gray-500 mt-2">Case: ${d.caseName}</p>
                                        <div class="flex gap-2 mt-3">
                                            <span class="text-xs px-3 py-1 rounded-full ${getStatusColor(d.status)}">
                                                ${d.status}
                                            </span>
                                            <span class="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                                                Due: ${formatDate(d.responseDeadline)}
                                            </span>
                                        </div>
                                    </div>
                                    <i data-lucide="chevron-right" class="w-5 h-5 text-gray-400"></i>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Court Dates Section -->
            ${courtDates.length > 0 ? `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-200 bg-purple-50">
                        <h2 class="text-lg font-bold text-purple-900 flex items-center gap-2">
                            <i data-lucide="calendar" class="w-5 h-5"></i>
                            Court Dates (${courtDates.length})
                        </h2>
                    </div>
                    <div class="divide-y divide-gray-100">
                        ${courtDates.map(e => `
                            <div class="p-6 hover:bg-gray-50 cursor-pointer transition"
                                 onclick="navigateToSearchResult('court', ${e.id})">
                                <div class="flex items-start justify-between">
                                    <div class="flex-1">
                                        <h3 class="text-lg font-semibold text-gray-900">${e.type}</h3>
                                        <p class="text-gray-600 mt-1">Case: ${e.caseName}</p>
                                        <div class="flex gap-4 mt-3 text-sm text-gray-600">
                                            <span class="flex items-center gap-1">
                                                <i data-lucide="calendar" class="w-4 h-4"></i>
                                                ${formatDate(e.date)}
                                            </span>
                                            <span class="flex items-center gap-1">
                                                <i data-lucide="clock" class="w-4 h-4"></i>
                                                ${e.time}
                                            </span>
                                            <span class="flex items-center gap-1">
                                                <i data-lucide="map-pin" class="w-4 h-4"></i>
                                                ${e.room}, ${e.location}
                                            </span>
                                        </div>
                                    </div>
                                    <i data-lucide="chevron-right" class="w-5 h-5 text-gray-400"></i>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}
