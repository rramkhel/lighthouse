// Calendar View

function renderCalendar() {
    const daysInMonth = getDaysInMonth(STATE.calendarMonth);
    const firstDay = getFirstDayOfMonth(STATE.calendarMonth);
    
    // Generate calendar days
    let calendarDays = '';
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        calendarDays += '<div class="min-h-24 bg-gray-50 border border-gray-200"></div>';
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const events = getEventsForDate(day, STATE.calendarMonth);
        const dateStr = `${STATE.calendarMonth.getFullYear()}-${String(STATE.calendarMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = dateStr === '2025-10-11';
        
        const eventsList = events.map(event => {
            return `
                <div class="text-xs text-gray-700 px-1 py-0.5 rounded truncate border-l-2 border-blue-500 bg-white hover:bg-gray-50" title="${event.type} - ${event.caseName}">
                    ${event.time} ${event.type}
                </div>
            `;
        }).join('');
        
        calendarDays += `
            <div class="min-h-24 border border-gray-200 p-2 ${isToday ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-50 transition">
                <div class="text-sm font-semibold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}">${day}</div>
                <div class="space-y-1">${eventsList}</div>
            </div>
        `;
    }
    
    // Get events for current month
    const monthEvents = DATA.courtDates
        .filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === STATE.calendarMonth.getMonth() && 
                   eventDate.getFullYear() === STATE.calendarMonth.getFullYear();
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return `
        <div class="space-y-4">
            <!-- Calendar Grid -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-gray-900">Court Calendar</h2>
                    <div class="flex items-center gap-4">
                        <button 
                            onclick="STATE.calendarMonth = new Date(STATE.calendarMonth.getFullYear(), STATE.calendarMonth.getMonth() - 1, 1); render();" 
                            class="p-1 hover:bg-gray-100 rounded"
                        >
                            <i data-lucide="chevron-left" class="w-5 h-5"></i>
                        </button>
                        <span class="font-semibold text-gray-900 min-w-32 text-center">
                            ${STATE.calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <button 
                            onclick="STATE.calendarMonth = new Date(STATE.calendarMonth.getFullYear(), STATE.calendarMonth.getMonth() + 1, 1); render();" 
                            class="p-1 hover:bg-gray-100 rounded"
                        >
                            <i data-lucide="chevron-right" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>
                <div class="p-4">
                    <div class="grid grid-cols-7 gap-0">
                        ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => 
                            `<div class="text-center font-semibold text-sm text-gray-700 py-2 border border-gray-200 bg-gray-50">${day}</div>`
                        ).join('')}
                        ${calendarDays}
                    </div>
                </div>
            </div>

            <!-- Events List -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-4 py-3 border-b border-gray-200">
                    <h2 class="text-lg font-semibold text-gray-900">All Scheduled Events</h2>
                </div>
                <div class="p-4">
                    ${monthEvents.length === 0 
                        ? '<p class="text-gray-500 text-center py-8">No events scheduled for this month</p>'
                        : `<div class="space-y-3">
                            ${monthEvents.map(event => {
                                const daysUntil = getDaysUntil(event.date);
                                const isUrgent = daysUntil === 'Today' || daysUntil === 'Tomorrow' ||
                                               (typeof daysUntil === 'string' && parseInt(daysUntil) <= 3);

                                return `
                                    <div class="border-l-4 border-blue-500 p-4 rounded bg-white hover:bg-gray-50 transition cursor-pointer"
                                         onclick="showRightSidebarDetail('courtDate', ${event.id}); STATE.rightSidebarOpen = true; render();">
                                        <div class="flex justify-between items-start">
                                            <div class="flex-1">
                                                <div class="flex items-center gap-3">
                                                    <p class="font-semibold text-gray-900">${event.type}</p>
                                                    <span class="text-xs font-semibold px-2 py-1 rounded ${isUrgent ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}">
                                                        ${daysUntil}
                                                    </span>
                                                </div>
                                                <p class="text-gray-900 font-medium mt-1">${event.caseName}</p>
                                                <p class="text-sm text-gray-600 mt-1">${event.location} • ${event.room}</p>
                                            </div>
                                            <div class="text-right">
                                                <p class="font-bold text-gray-900">${formatDate(event.date)}</p>
                                                <p class="text-sm text-gray-600 mt-1">${event.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                          </div>`
                    }
                </div>
            </div>
        </div>
    `;
}