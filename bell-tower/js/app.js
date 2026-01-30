// Bell Tower - Main App Initialization

// Register all routes
Router.add('/dashboard', () => {
    STATE.currentView = 'dashboard';
    render();
});

Router.add('/schedule', () => {
    STATE.currentView = 'schedule';
    render();
});

Router.add('/assign', () => {
    STATE.currentView = 'assign';
    render();
});

// Main render function
function render() {
    const app = document.getElementById('app');

    let content = '';

    // Navigation Sidebar (Left)
    content += renderNavigation(STATE.currentView);

    // Main content wrapper with margin for sidebar
    const leftMargin = STATE.sidebarOpen ? 'ml-64' : 'ml-16';
    content += `<div class="${leftMargin} transition-all duration-300">`;

    // Header
    content += renderHeader();

    // Main content area wrapper
    content += '<main class="max-w-[1600px] mx-auto px-8 py-6">';

    // Render appropriate view
    switch(STATE.currentView) {
        case 'dashboard':
            content += renderDashboard();
            break;
        case 'schedule':
            content += renderSchedule();
            break;
        case 'assign':
            content += renderAssign();
            break;
        default:
            content += renderDashboard();
    }

    content += '</main>';
    content += '</div>'; // Close ml-64 wrapper

    app.innerHTML = content;

    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Router.init();
});
