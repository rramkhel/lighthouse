// Navigation Component - Left Sidebar

function toggleSidebar() {
    STATE.sidebarOpen = !STATE.sidebarOpen;
    render();
}

function renderNavigation(currentView) {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
        { id: 'recent-updates', label: 'Recent Updates', icon: 'activity' },
        { id: 'search', label: 'Search', icon: 'search' },
        { id: 'cases', label: 'Cases', icon: 'briefcase' },
        { id: 'documents', label: 'Documents', icon: 'file-text' },
        { id: 'calendar', label: 'Calendar', icon: 'calendar' },
        { id: 'week-planner', label: 'Week Planner', icon: 'calendar-days' },
        { id: 'progress', label: 'Progress', icon: 'alert-triangle' },
        { id: 'trial-prep', label: 'Trial Prep', icon: 'check-circle' }
    ];

    const isOpen = STATE.sidebarOpen;
    const sidebarWidth = isOpen ? 'w-64' : 'w-16';

    const navHTML = navItems.map(item => `
        <button
            onclick="Router.navigate('/${item.id}')"
            class="flex items-center ${isOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 font-medium text-sm transition-all rounded-lg w-full ${currentView === item.id
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-700 hover:bg-gray-100'
        }"
            title="${!isOpen ? item.label : ''}"
        >
            <i data-lucide="${item.icon}" class="w-5 h-5 flex-shrink-0"></i>
            ${isOpen ? `<span class="truncate">${item.label}</span>` : ''}
        </button>
    `).join('');

    return `
        <nav class="fixed left-0 top-0 h-screen ${sidebarWidth} bg-white border-r border-gray-200 shadow-sm z-20 flex flex-col transition-all duration-300">
            <!-- Sidebar Header -->
            <div class="px-4 py-5 border-b border-gray-200 flex items-center justify-between">
                ${isOpen ? `
                    <div>
                        <h2 class="text-xl font-bold text-gray-900">Legal CMS</h2>
                        <p class="text-xs text-gray-500 mt-1">Case Management</p>
                    </div>
                ` : ''}
                <button
                    onclick="toggleSidebar()"
                    class="p-2 hover:bg-gray-100 rounded-lg transition-colors ${!isOpen ? 'mx-auto' : ''}"
                    title="${isOpen ? 'Collapse sidebar' : 'Expand sidebar'}"
                >
                    <i data-lucide="${isOpen ? 'panel-left-close' : 'panel-left-open'}" class="w-5 h-5 text-gray-600"></i>
                </button>
            </div>

            <!-- Navigation Items -->
            <div class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                ${navHTML}
            </div>

            <!-- Sidebar Footer -->
            ${isOpen ? `
                <div class="px-6 py-4 border-t border-gray-200">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                            ${STATE.userName.charAt(0)}
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate">${STATE.userName}</p>
                            <p class="text-xs text-gray-500">Attorney</p>
                        </div>
                    </div>
                </div>
            ` : `
                <div class="px-3 py-4 border-t border-gray-200">
                    <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm mx-auto" title="${STATE.userName}">
                        ${STATE.userName.charAt(0)}
                    </div>
                </div>
            `}
        </nav>
    `;
}