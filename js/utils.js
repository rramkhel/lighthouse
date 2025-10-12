// Utility Functions

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getDaysUntil = (dateString) => {
    const date = new Date(dateString);
    const days = Math.ceil((date - STATE.today) / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days} days`;
};

const getCaseColor = (caseId) => {
    const colors = [
        { bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-800' },
        { bg: 'bg-purple-100', border: 'border-purple-400', text: 'text-purple-800' },
        { bg: 'bg-green-100', border: 'border-green-400', text: 'text-green-800' },
        { bg: 'bg-orange-100', border: 'border-orange-400', text: 'text-orange-800' },
        { bg: 'bg-pink-100', border: 'border-pink-400', text: 'text-pink-800' },
        { bg: 'bg-cyan-100', border: 'border-cyan-400', text: 'text-cyan-800' }
    ];
    return colors[(caseId - 1) % colors.length];
};

const getPriorityColor = (priority) => {
    const colors = { High: 'text-red-600', Medium: 'text-orange-600', Low: 'text-gray-600' };
    return colors[priority] || 'text-gray-600';
};

const getStatusColor = (status) => {
    const colors = {
        'Overdue': 'bg-red-100 text-red-800',
        'Received': 'bg-green-100 text-green-800',
        'Pending Response': 'bg-yellow-100 text-yellow-800',
        'Served': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

// Filtered data helpers
const getUpcomingCourtDates = () => {
    return DATA.courtDates
        .filter(date => {
            const daysUntil = Math.ceil((new Date(date.date) - STATE.today) / (1000 * 60 * 60 * 24));
            return daysUntil >= 0 && daysUntil <= 14;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));
};

const getOverdueDocuments = () => {
    return DATA.documentRequests.filter(doc => 
        new Date(doc.responseDeadline) < STATE.today && doc.status !== 'Received'
    );
};

const getUrgentDocuments = () => {
    return DATA.documentRequests.filter(doc => {
        const daysUntil = Math.ceil((new Date(doc.responseDeadline) - STATE.today) / (1000 * 60 * 60 * 24));
        return daysUntil >= 0 && daysUntil <= 7 && doc.status !== 'Received';
    });
};

const getHighPriorityCases = () => {
    return DATA.cases.filter(c => c.priority === 'High');
};

// Calendar helpers
const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

const getEventsForDate = (day, month) => {
    const dateStr = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return DATA.courtDates.filter(event => event.date === dateStr);
};

// Icon helper - creates SVG icon element
const createIcon = (iconName, classes = 'w-4 h-4') => {
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', iconName);
    icon.className = classes;
    return icon;
};

// Format timestamp for recent changes display
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = STATE.today;

    // Calculate difference in hours
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    // Time portion
    const timeStr = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    // Determine day label
    if (diffDays === 0) {
        return `Today, ${timeStr}`;
    } else if (diffDays === 1) {
        return `Yesterday, ${timeStr}`;
    } else if (diffDays < 7) {
        return `${diffDays} days ago, ${timeStr}`;
    } else {
        return formatDate(timestamp);
    }
};

// Group recent changes by time period
const groupRecentChanges = (changes) => {
    const now = STATE.today;
    const grouped = {
        today: [],
        yesterday: [],
        earlier: []
    };

    changes.forEach(change => {
        const date = new Date(change.timestamp);
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            grouped.today.push(change);
        } else if (diffDays === 1) {
            grouped.yesterday.push(change);
        } else {
            grouped.earlier.push(change);
        }
    });

    return grouped;
};

// Global search across all data
const performSearch = (query) => {
    if (!query || query.trim().length < 2) {
        return null;
    }

    const searchTerm = query.toLowerCase().trim();

    // Search cases
    const cases = DATA.cases.filter(c =>
        c.name.toLowerCase().includes(searchTerm) ||
        c.accused.toLowerCase().includes(searchTerm) ||
        c.charges.toLowerCase().includes(searchTerm)
    );

    // Search documents
    const documents = DATA.documentRequests.filter(d =>
        d.recipient.toLowerCase().includes(searchTerm) ||
        d.type.toLowerCase().includes(searchTerm) ||
        d.caseName.toLowerCase().includes(searchTerm)
    );

    // Search court dates
    const courtDates = DATA.courtDates.filter(e =>
        e.type.toLowerCase().includes(searchTerm) ||
        e.caseName.toLowerCase().includes(searchTerm) ||
        e.location.toLowerCase().includes(searchTerm)
    );

    return {
        cases: cases.slice(0, 5),      // Limit to 5 results per category
        documents: documents.slice(0, 5),
        courtDates: courtDates.slice(0, 5),
        totalResults: cases.length + documents.length + courtDates.length
    };
};

// Handle search input
const handleSearchInput = (value) => {
    STATE.searchQuery = value;
    STATE.searchResults = performSearch(value);
    STATE.searchVisible = value.length >= 2;

    // Only update the search results dropdown, not the entire page
    const searchResultsContainer = document.querySelector('.search-results-container');
    if (searchResultsContainer) {
        searchResultsContainer.innerHTML = renderSearchResults();
        // Re-initialize icons in the search results
        if (window.lucide) {
            lucide.createIcons();
        }
    }
};

// Clear search
const clearSearch = () => {
    STATE.searchQuery = '';
    STATE.searchResults = null;
    STATE.searchVisible = false;
    render();
};

// Navigate to search result
const navigateToSearchResult = (type, id) => {
    clearSearch();

    switch(type) {
        case 'case':
            Router.navigate(`/case/${id}`);
            break;
        case 'document':
            // Find the case for this document
            const doc = DATA.documentRequests.find(d => d.id === id);
            if (doc) {
                Router.navigate(`/case/${doc.caseId}`);
            }
            break;
        case 'court':
            // Find the case for this court date
            const court = DATA.courtDates.find(c => c.id === id);
            if (court) {
                Router.navigate(`/case/${court.caseId}`);
            }
            break;
    }
};

// Navigate to full search results page
const navigateToSearchPage = () => {
    // Keep the search query and results, but hide the dropdown
    STATE.searchVisible = false;
    Router.navigate('/search');
};