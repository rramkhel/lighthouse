// Document Card Component

function renderDocumentCard(doc, borderColor, bgColor) {
    const daysUntil = getDaysUntil(doc.responseDeadline);
    const dateDisplay = typeof daysUntil === 'string' && daysUntil.includes('days') 
        ? daysUntil 
        : formatDate(doc.responseDeadline);
    
    return `
        <div class="border-l-3 ${borderColor} ${bgColor} p-3 rounded text-sm">
            <div class="flex justify-between items-start gap-2">
                <div class="min-w-0 flex-1">
                    <p class="font-semibold text-gray-900 truncate">${doc.recipient}</p>
                    <p class="text-xs text-gray-600 truncate">${doc.caseName}</p>
                    <p class="text-xs text-gray-500 mt-0.5">${doc.type}</p>
                </div>
                <div class="text-right shrink-0">
                    <p class="text-xs font-semibold whitespace-nowrap">${dateDisplay}</p>
                </div>
            </div>
        </div>
    `;
}