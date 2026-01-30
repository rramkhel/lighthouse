// Recent Changes Component

function renderRecentChanges() {
    // Get recent changes sorted by timestamp (newest first)
    const sortedChanges = [...STATE.recentChanges].sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
    );

    // Limit to 10 most recent
    const recentItems = sortedChanges.slice(0, 10);

    // Group by time period
    const grouped = groupRecentChanges(recentItems);

    return `
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-4 py-3 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <i data-lucide="activity" class="w-5 h-5"></i>
                    Recent Updates
                </h3>
                <p class="text-xs text-gray-500 mt-1">Last 48 hours • TODO: This should be dynamically updated from backend</p>
            </div>
            <div class="divide-y divide-gray-100">
                ${grouped.today.length > 0 ? `
                    <div class="px-4 py-2 bg-blue-50">
                        <p class="text-xs font-semibold text-blue-900 uppercase">Today</p>
                    </div>
                    ${grouped.today.map(change => renderChangeItem(change)).join('')}
                ` : ''}

                ${grouped.yesterday.length > 0 ? `
                    <div class="px-4 py-2 bg-gray-50">
                        <p class="text-xs font-semibold text-gray-700 uppercase">Yesterday</p>
                    </div>
                    ${grouped.yesterday.map(change => renderChangeItem(change)).join('')}
                ` : ''}

                ${grouped.earlier.length > 0 ? `
                    <div class="px-4 py-2 bg-gray-50">
                        <p class="text-xs font-semibold text-gray-700 uppercase">Earlier</p>
                    </div>
                    ${grouped.earlier.map(change => renderChangeItem(change)).join('')}
                ` : ''}

                ${recentItems.length === 0 ? `
                    <div class="px-4 py-8 text-center text-gray-500 text-sm">
                        No recent updates
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function renderChangeItem(change) {
    // Get icon color based on type and priority
    let iconColor = 'text-gray-500';
    if (change.priority === 'high') {
        iconColor = 'text-red-500';
    } else if (change.priority === 'medium') {
        iconColor = 'text-orange-500';
    } else if (change.type === 'document' && change.icon === 'file-check') {
        iconColor = 'text-green-500';
    } else if (change.type === 'court') {
        iconColor = 'text-blue-500';
    }

    return `
        <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
             onclick="Router.navigate('/case/${change.caseId}')">
            <div class="flex items-start gap-3">
                <i data-lucide="${change.icon}" class="w-4 h-4 ${iconColor} mt-0.5 flex-shrink-0"></i>
                <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-900">${change.description}</p>
                    <p class="text-xs text-gray-500 mt-0.5">
                        <span class="font-medium">${change.caseName}</span>
                        <span class="mx-1">•</span>
                        <span>${formatTimestamp(change.timestamp)}</span>
                    </p>
                </div>
                ${change.priority === 'high' ? `
                    <span class="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        Urgent
                    </span>
                ` : ''}
            </div>
        </div>
    `;
}
