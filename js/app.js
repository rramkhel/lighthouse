// Main App Initialization

// Register all routes
Router.add('/dashboard', () => {
    STATE.currentView = 'dashboard';
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

Router.add('/progress', () => {
    STATE.currentView = 'progress';
    render();
});

Router.add('/trial-prep', () => {
    STATE.currentView = 'trial-prep';
    render();
});

// Main render function
function render() {
    const app = document.getElementById('app');
    
    let content = '';
    
    // Header
    content += renderHeader();
    
    // Navigation
    content += renderNavigation(STATE.currentView);
    
    // Main content area wrapper
    content += '<main class="max-w-[1800px] mx-auto px-8 py-6">';
    
    // Render appropriate view
    switch(STATE.currentView) {
        case 'dashboard':
            content += renderDashboard();
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