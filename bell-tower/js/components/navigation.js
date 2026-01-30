// Bell Tower Navigation Component - Left Sidebar

function toggleSidebar() {
    STATE.sidebarOpen = !STATE.sidebarOpen;
    render();
}

function renderNavigation(currentView) {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
        { id: 'bail-hearing', label: 'Bail Hearings', icon: 'gavel' },
        { id: 'schedule', label: 'Schedule', icon: 'calendar', comingSoon: true }
    ];

    const isOpen = STATE.sidebarOpen;
    const sidebarWidth = isOpen ? 'w-64' : 'w-16';

    const navHTML = navItems.map(item => {
        if (item.comingSoon) {
            return `
                <div
                    class="flex items-center ${isOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 font-medium text-sm rounded-lg w-full text-gray-400 cursor-not-allowed"
                    title="${!isOpen ? item.label + ' (Coming Soon)' : 'Coming Soon'}"
                >
                    <i data-lucide="${item.icon}" class="w-5 h-5 flex-shrink-0"></i>
                    ${isOpen ? `<span class="truncate">${item.label}</span><span class="ml-auto text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded">Soon</span>` : ''}
                </div>
            `;
        }
        return `
            <button
                onclick="Router.navigate('/${item.id}')"
                class="flex items-center ${isOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 font-medium text-sm transition-all rounded-lg w-full ${currentView === item.id
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100'
            }"
                title="${!isOpen ? item.label : ''}"
            >
                <i data-lucide="${item.icon}" class="w-5 h-5 flex-shrink-0"></i>
                ${isOpen ? `<span class="truncate">${item.label}</span>` : ''}
            </button>
        `;
    }).join('');

    return `
        <nav class="fixed left-0 top-0 h-screen ${sidebarWidth} bg-white border-r border-gray-200 shadow-sm z-20 flex flex-col transition-all duration-300">
            <!-- Sidebar Header -->
            <div class="px-4 py-5 border-b border-gray-200 flex items-center justify-between">
                ${isOpen ? `
                    <div>
                        <h2 class="text-xl font-bold text-gray-900">Bell Tower</h2>
                        <p class="text-xs text-gray-500 mt-1">Case Scheduling</p>
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

            <!-- Quick Link to Lighthouse -->
            <div class="px-3 py-4 border-t border-gray-200">
                <a href="../lighthouse/index.html" class="flex items-center ${isOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <i data-lucide="lighthouse" class="w-5 h-5 flex-shrink-0"></i>
                    ${isOpen ? '<span>Go to Lighthouse</span>' : ''}
                </a>
            </div>
        </nav>
    `;
}
