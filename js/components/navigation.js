// Navigation Component

function renderNavigation(currentView) {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'briefcase' },
        { id: 'cases', label: 'Cases', icon: 'file-text' },
        { id: 'documents', label: 'Documents', icon: 'file-text' },
        { id: 'calendar', label: 'Calendar', icon: 'calendar' },
        { id: 'progress', label: 'Progress & Dependencies', icon: 'alert-triangle' },
        { id: 'trial-prep', label: 'Trial Prep', icon: 'check-circle' }
    ];

    const navHTML = navItems.map(item => `
        <button
            onclick="Router.navigate('/${item.id}')"
            class="flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${currentView === item.id
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-gray-900'
        }"
        >
            <i data-lucide="${item.icon}" class="w-4 h-4"></i>
            ${item.label}
        </button>
    `).join('');

    return `
        <nav class="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
            <div class="max-w-[1800px] mx-auto px-8">
                <div class="flex gap-1">
                    ${navHTML}
                </div>
            </div>
        </nav>
    `;
}