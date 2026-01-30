// Bell Tower Utility Functions

// Format date for display
function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Format date long
function formatDateLong(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

// Get priority color classes
function getPriorityColor(priority) {
    const colors = {
        'High': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
        'Medium': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' },
        'Low': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' }
    };
    return colors[priority] || colors['Medium'];
}

// Get status color classes
function getStatusColor(status) {
    const colors = {
        'Confirmed': { bg: 'bg-green-100', text: 'text-green-700' },
        'Tentative': { bg: 'bg-amber-100', text: 'text-amber-700' },
        'Cancelled': { bg: 'bg-red-100', text: 'text-red-700' }
    };
    return colors[status] || { bg: 'bg-gray-100', text: 'text-gray-700' };
}

// Get case type color
function getCaseTypeColor(type) {
    const colors = {
        'Criminal': { bg: 'bg-blue-100', text: 'text-blue-700' },
        'Traffic': { bg: 'bg-purple-100', text: 'text-purple-700' }
    };
    return colors[type] || { bg: 'bg-gray-100', text: 'text-gray-700' };
}

// Calculate court day utilization
function getCourtDayUtilization(courtDayId) {
    const courtDay = DATA.courtDays.find(cd => cd.id === courtDayId);
    if (!courtDay) return { assigned: 0, capacity: 0, percentage: 0 };

    const assignments = DATA.caseAssignments.filter(a => a.courtDayId === courtDayId);
    const assigned = assignments.length;
    const percentage = Math.round((assigned / courtDay.capacity) * 100);

    return { assigned, capacity: courtDay.capacity, percentage };
}

// Get unassigned cases
function getUnassignedCases() {
    const assignedCaseIds = DATA.caseAssignments.map(a => a.caseId);
    return DATA.cases.filter(c => !assignedCaseIds.includes(c.id) && c.status === 'Ready for Trial');
}

// Get cases assigned to a court day
function getCasesForCourtDay(courtDayId) {
    const assignmentIds = DATA.caseAssignments
        .filter(a => a.courtDayId === courtDayId)
        .map(a => a.caseId);
    return DATA.cases.filter(c => assignmentIds.includes(c.id));
}

// Get upcoming court days (next 14 days)
function getUpcomingCourtDays() {
    const today = new Date();
    const twoWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

    return DATA.courtDays.filter(cd => {
        const cdDate = new Date(cd.date);
        return cdDate >= today && cdDate <= twoWeeksLater;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Get capacity color based on utilization
function getCapacityColor(percentage) {
    if (percentage >= 90) return { bg: 'bg-red-500', text: 'text-red-700' };
    if (percentage >= 70) return { bg: 'bg-amber-500', text: 'text-amber-700' };
    return { bg: 'bg-green-500', text: 'text-green-700' };
}

// Check for scheduling conflicts
function hasSchedulingConflict(caseId, courtDayId) {
    const caseData = DATA.cases.find(c => c.id === caseId);
    const courtDay = DATA.courtDays.find(cd => cd.id === courtDayId);

    if (!caseData || !courtDay) return { hasConflict: false };

    // Check type mismatch
    if (caseData.type !== courtDay.type) {
        return {
            hasConflict: true,
            reason: `Case type (${caseData.type}) doesn't match court day type (${courtDay.type})`
        };
    }

    // Check capacity
    const utilization = getCourtDayUtilization(courtDayId);
    if (utilization.assigned >= utilization.capacity) {
        return {
            hasConflict: true,
            reason: 'Court day is at full capacity'
        };
    }

    return { hasConflict: false };
}

// Assign case to court day
function assignCaseToCourtDay(caseId, courtDayId, timeSlot) {
    const conflict = hasSchedulingConflict(caseId, courtDayId);
    if (conflict.hasConflict) {
        alert(`Cannot assign: ${conflict.reason}`);
        return false;
    }

    const newAssignment = {
        id: DATA.caseAssignments.length + 1,
        caseId: caseId,
        courtDayId: courtDayId,
        timeSlot: timeSlot || '9:00 AM',
        status: 'Tentative'
    };

    DATA.caseAssignments.push(newAssignment);
    render();
    return true;
}

// Remove case assignment
function removeAssignment(assignmentId) {
    const index = DATA.caseAssignments.findIndex(a => a.id === assignmentId);
    if (index > -1) {
        DATA.caseAssignments.splice(index, 1);
        render();
    }
}

// Get bail result color class
function getBailResultColor(result) {
    if (result.includes('Denied')) return 'text-red-600';
    if (result === 'Pending') return 'text-slate-500';
    return 'text-green-600';
}

// Get crown position color class
function getCrownPositionColor(grounds) {
    if (grounds.toLowerCase().includes('consent')) return 'text-green-700';
    if (grounds.toLowerCase().includes('all grounds')) return 'text-red-700';
    return 'text-amber-700';
}

// Flatten bail hearing schedule into table rows
function flattenBailHearings(schedule) {
    const rows = [];

    schedule.forEach((dateEntry) => {
        let isFirstRowForDate = true;

        dateEntry.cities.forEach((city, cityIdx) => {
            let isFirstRowForCity = true;

            city.cases.forEach((caseData, caseIdx) => {
                rows.push({
                    date: dateEntry.date,
                    showDate: isFirstRowForDate,
                    city: city.name,
                    showCity: isFirstRowForCity,
                    caseData: caseData,
                    isFirstCaseInCity: caseIdx === 0,
                    isLastCityInDate: cityIdx === dateEntry.cities.length - 1,
                });

                isFirstRowForDate = false;
                isFirstRowForCity = false;
            });
        });
    });

    return rows;
}
