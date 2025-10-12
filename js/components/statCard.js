// Stat Card Component

function renderStatCard(icon, label, value, color) {
    return `
        <div class="bg-white rounded-lg shadow-sm p-4 border-l-4 ${color}">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-xs text-gray-600 font-medium uppercase">${label}</p>
                    <p class="text-2xl font-bold text-gray-900 mt-0.5">${value}</p>
                </div>
                <i data-lucide="${icon}" class="w-8 h-8 ${color.replace('border-', 'text-')} opacity-80"></i>
            </div>
        </div>
    `;
}