// Main App Initialization

// Register all routes
Router.add('/dashboard', () => {
    STATE.currentView = 'dashboard';
    render();
});

Router.add('/recent-updates', () => {
    STATE.currentView = 'recent-updates';
    render();
});

Router.add('/search', () => {
    STATE.currentView = 'search';
    render();
});

Router.add('/cases', () => {
    STATE.currentView = 'cases';
    render();
});

Router.add('/case', (params) => {
    STATE.currentView = 'case-detail';
    STATE.selectedCase = DATA.cases.find(c => c.id === parseInt(params[0]));
    render();
});

Router.add('/documents', () => {
    STATE.currentView = 'documents';
    render();
});

Router.add('/calendar', () => {
    STATE.currentView = 'calendar';
    render();
});

Router.add('/week-planner', () => {
    STATE.currentView = 'week-planner';
    render();
});

Router.add('/progress', () => {
    STATE.currentView = 'progress';
    render();
});

Router.add('/trial-prep', () => {
    STATE.currentView = 'trial-prep';
    render();
});

// Toggle stat card expansion
function toggleCardExpansion(cardId) {
    // If clicking the same card, collapse it. Otherwise, expand the new card
    STATE.expandedCard = STATE.expandedCard === cardId ? null : cardId;
    render();
}

// Main render function
function render() {
    const app = document.getElementById('app');

    let content = '';

    // Navigation Sidebar (Left)
    content += renderNavigation(STATE.currentView);

    // Right Sidebar
    content += renderRightSidebar();

    // Main content wrapper with margins for both sidebars
    const leftMargin = STATE.sidebarOpen ? 'ml-64' : 'ml-16';
    const rightMargin = STATE.rightSidebarOpen ? 'mr-80' : 'mr-12';
    content += `<div class="${leftMargin} ${rightMargin} transition-all duration-300">`;

    // Header
    content += renderHeader();

    // Main content area wrapper
    content += '<main class="max-w-[1800px] mx-auto px-8 py-6">';

    // Render appropriate view
    switch(STATE.currentView) {
        case 'dashboard':
            content += renderDashboard();
            break;
        case 'recent-updates':
            content += renderRecentUpdates();
            break;
        case 'search':
            content += renderSearchResultsPage();
            break;
        case 'cases':
            content += renderCases();
            break;
        case 'case-detail':
            content += renderCaseDetail();
            break;
        case 'documents':
            content += renderDocuments();
            break;
        case 'calendar':
            content += renderCalendar();
            break;
        case 'week-planner':
            content += renderWeekPlanner();
            break;
        case 'progress':
            content += renderProgress();
            break;
        case 'trial-prep':
            content += renderTrialPrep();
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

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    const searchInput = document.getElementById('globalSearch');
    if (searchInput && STATE.searchVisible) {
        // Check if click is outside search area
        if (!e.target.closest('#globalSearch') && !e.target.closest('.absolute.top-full')) {
            clearSearch();
        }
    }
});