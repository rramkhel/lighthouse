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