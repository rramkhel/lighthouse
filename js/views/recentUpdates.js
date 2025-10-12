// Recent Updates View - Full Page

function renderRecentUpdates() {
    // Get recent changes sorted by timestamp (newest first)
    const sortedChanges = [...STATE.recentChanges].sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
    );

    // Group by time period
    const grouped = groupRecentChanges(sortedChanges);

    return `
        <div class="space-y-6">
            <!-- Page Header -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h1 class="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <i data-lucide="activity" class="w-6 h-6"></i>
                    Recent Updates
                </h1>
                <p class="text-gray-600 mt-2">Track all changes and updates across your cases in real-time</p>
            </div>

            <!-- Updates Timeline -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="divide-y divide-gray-100">
                    ${grouped.today.length > 0 ? `
                        <div class="px-6 py-3 bg-blue-50 border-b border-blue-100">
                            <h2 class="text-sm font-bold text-blue-900 uppercase flex items-center gap-2">
                                <i data-lucide="sun" class="w-4 h-4"></i>
                                Today
                            </h2>
                        </div>
                        <div class="divide-y divide-gray-100">
                            ${grouped.today.map(change => renderFullChangeItem(change)).join('')}
                        </div>
                    ` : ''}

                    ${grouped.yesterday.length > 0 ? `
                        <div class="px-6 py-3 bg-gray-50 border-b border-gray-200">
                            <h2 class="text-sm font-bold text-gray-700 uppercase flex items-center gap-2">
                                <i data-lucide="moon" class="w-4 h-4"></i>
                                Yesterday
                            </h2>
                        </div>
                        <div class="divide-y divide-gray-100">
                            ${grouped.yesterday.map(change => renderFullChangeItem(change)).join('')}
                        </div>
                    ` : ''}

                    ${grouped.earlier.length > 0 ? `
                        <div class="px-6 py-3 bg-gray-50 border-b border-gray-200">
                            <h2 class="text-sm font-bold text-gray-700 uppercase flex items-center gap-2">
                                <i data-lucide="clock" class="w-4 h-4"></i>
                                Earlier This Week
                            </h2>
                        </div>
                        <div class="divide-y divide-gray-100">
                            ${grouped.earlier.map(change => renderFullChangeItem(change)).join('')}
                        </div>
                    ` : ''}

                    ${sortedChanges.length === 0 ? `
                        <div class="px-6 py-12 text-center text-gray-500">
                            <i data-lucide="inbox" class="w-12 h-12 mx-auto mb-3 text-gray-400"></i>
                            <p class="text-lg font-medium">No recent updates</p>
                            <p class="text-sm mt-1">Check back later for new activity</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function renderFullChangeItem(change) {
    // Get icon color based on type and priority
    let iconColor = 'text-gray-500';
    let iconBg = 'bg-gray-100';

    if (change.priority === 'high') {
        iconColor = 'text-red-500';
        iconBg = 'bg-red-50';
    } else if (change.priority === 'medium') {
        iconColor = 'text-orange-500';
        iconBg = 'bg-orange-50';
    } else if (change.type === 'document' && change.icon === 'file-check') {
        iconColor = 'text-green-500';
        iconBg = 'bg-green-50';
    } else if (change.type === 'court') {
        iconColor = 'text-blue-500';
        iconBg = 'bg-blue-50';
    }

    // Get type label
    const typeLabels = {
        'document': 'Document',
        'court': 'Court Date',
        'case': 'Case Update',
        'deadline': 'Deadline'
    };
    const typeLabel = typeLabels[change.type] || change.type;

    return `
        <div class="px-6 py-4 hover:bg-gray-50 cursor-pointer transition"
             onclick="Router.navigate('/case/${change.caseId}')">
            <div class="flex items-start gap-4">
                <!-- Icon -->
                <div class="flex-shrink-0">
                    <div class="${iconBg} rounded-full p-2">
                        <i data-lucide="${change.icon}" class="w-5 h-5 ${iconColor}"></i>
                    </div>
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex-1">
                            <p class="text-base font-medium text-gray-900">${change.description}</p>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                                    ${typeLabel}
                                </span>
                                <span class="text-sm font-semibold text-gray-700">${change.caseName}</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-2">${formatTimestamp(change.timestamp)}</p>
                        </div>

                        <!-- Priority Badge -->
                        ${change.priority === 'high' ? `
                            <span class="flex-shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                                <i data-lucide="alert-circle" class="w-3 h-3 mr-1"></i>
                                Urgent
                            </span>
                        ` : change.priority === 'medium' ? `
                            <span class="flex-shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
                                <i data-lucide="alert-triangle" class="w-3 h-3 mr-1"></i>
                                Medium Priority
                            </span>
                        ` : ''}
                    </div>
                </div>

                <!-- Arrow -->
                <div class="flex-shrink-0">
                    <i data-lucide="chevron-right" class="w-5 h-5 text-gray-400"></i>
                </div>
            </div>
        </div>
    `;
}
