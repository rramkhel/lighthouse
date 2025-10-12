// Court Event Card Component

function renderCourtEventCard(event) {
    const daysUntil = getDaysUntil(event.date);
    const isUrgent = daysUntil === 'Today' || daysUntil === 'Tomorrow' || 
                     (typeof daysUntil === 'string' && parseInt(daysUntil) <= 3);
    const color = getCaseColor(event.caseId);
    
    return `
        <div class="border-l-3 p-3 rounded text-sm ${color.border} ${color.bg}">
            <div class="flex justify-between items-start gap-2">
                <div class="min-w-0 flex-1">
                    <p class="font-semibold text-gray-900 truncate">${event.type}</p>
                    <p class="text-xs text-gray-600 truncate">${event.caseName}</p>
                    <p class="text-xs text-gray-500 mt-0.5">${event.time} • ${event.room}</p>
                </div>
                <div class="text-right shrink-0">
                    <p class="text-xs font-semibold text-gray-900 whitespace-nowrap">${formatDate(event.date)}</p>
                    <p class="text-xs font-semibold mt-0.5 ${isUrgent ? 'text-red-600' : 'text-gray-600'}">${daysUntil}</p>
                </div>
            </div>
        </div>
    `;
}