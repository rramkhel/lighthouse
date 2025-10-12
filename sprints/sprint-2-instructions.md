# Sprint 2: Expandable Stat Cards

## 🎯 Sprint Goal
Make the 4 stat cards clickable to reveal detailed information inline. Only one card can be expanded at a time.

## 📋 Prerequisites
- Sprint 1 completed (greeting and summary working)
- Stat cards currently display on dashboard
- `STATE` object exists in `js/data.js`

---

## Task 2.1: Add Expansion State Management

**File:** `js/data.js`

### Step 1: Add expandedCard to STATE
Find the `STATE` object and verify it has `expandedCard: null`. If it doesn't, add it:

```javascript
const STATE = {
    currentView: 'dashboard',
    selectedCase: null,
    calendarMonth: new Date('2025-10-01'),
    today: new Date('2025-10-11'),
    userName: 'Conner',
    expandedCard: null  // Add this line if it doesn't exist
};
```

### ✅ Checkpoint 1
No visible change yet. Just verify the file saved correctly.

---

## Task 2.2: Create Card Toggle Function

**File:** `js/app.js`

### Step 1: Add toggle function
Add this function BEFORE the `render()` function in `js/app.js`:

```javascript
// Toggle stat card expansion
function toggleCardExpansion(cardId) {
    // If clicking the same card, collapse it. Otherwise, expand the new card
    STATE.expandedCard = STATE.expandedCard === cardId ? null : cardId;
    render();
}
```

### ✅ Checkpoint 2
No visible change yet. Function is ready to be called.

---

## Task 2.3: Update Stat Card Component

**File:** `js/components/statCard.js`

### Step 1: Replace entire file contents
Replace the ENTIRE contents of `statCard.js` with this:

```javascript
// Stat Card Component with expansion capability

function renderStatCard(icon, label, value, color, cardId) {
    const isExpanded = STATE.expandedCard === cardId;
    
    return `
        <div class="bg-white rounded-lg shadow-sm p-4 border-l-4 ${color} stat-card ${isExpanded ? 'ring-2 ring-blue-300' : ''}" 
             onclick="toggleCardExpansion('${cardId}')">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-xs text-gray-600 font-medium uppercase">${label}</p>
                    <p class="text-2xl font-bold text-gray-900 mt-0.5">${value}</p>
                </div>
                <div class="flex flex-col items-center gap-1">
                    <i data-lucide="${icon}" class="w-8 h-8 ${color.replace('border-', 'text-')} opacity-80"></i>
                    <i data-lucide="chevron-${isExpanded ? 'up' : 'down'}" class="w-4 h-4 text-gray-400"></i>
                </div>
            </div>
        </div>
        ${isExpanded ? renderCardExpansion(cardId) : ''}
    `;
}

// Render expanded content for each card type
function renderCardExpansion(cardId) {
    let content = '';
    
    switch(cardId) {
        case 'active-cases':
            content = renderActiveCasesExpansion();
            break;
        case 'overdue-docs':
            content = renderOverdueDocsExpansion();
            break;
        case 'upcoming-court':
            content = renderUpcomingCourtExpansion();
            break;
        case 'high-priority':
            content = renderHighPriorityExpansion();
            break;
    }
    
    return `
        <div class="mt-2 bg-gray-50 rounded-lg p-4 border border-gray-200 slide-down">
            ${content}
        </div>
    `;
}

// Active Cases expansion
function renderActiveCasesExpansion() {
    const grouped = {
        High: DATA.cases.filter(c => c.priority === 'High'),
        Medium: DATA.cases.filter(c => c.priority === 'Medium'),
        Low: DATA.cases.filter(c => c.priority === 'Low')
    };
    
    return `
        <div class="space-y-3">
            ${Object.entries(grouped).map(([priority, cases]) => {
                if (cases.length === 0) return '';
                const color = priority === 'High' ? 'text-red-600' : priority === 'Medium' ? 'text-orange-600' : 'text-gray-600';
                return `
                    <div>
                        <p class="text-xs font-semibold ${color} uppercase mb-2">${priority} Priority (${cases.length})</p>
                        <div class="space-y-1">
                            ${cases.map(c => `
                                <button onclick="event.stopPropagation(); Router.navigate('/case/${c.id}')" 
                                        class="text-left w-full px-3 py-2 text-sm bg-white rounded hover:bg-blue-50 border border-gray-200">
                                    <span class="font-medium text-gray-900">${c.name}</span>
                                    <span class="text-gray-500 text-xs ml-2">${c.accused}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Overdue Documents expansion
function renderOverdueDocsExpansion() {
    const overdue = DATA.documentRequests.filter(doc => 
        new Date(doc.responseDeadline) < STATE.today && doc.status !== 'Received'
    );
    
    if (overdue.length === 0) {
        return '<p class="text-sm text-gray-500 text-center py-4">No overdue documents! 🎉</p>';
    }
    
    return `
        <div class="space-y-2">
            ${overdue.map(doc => {
                const daysOverdue = Math.abs(Math.ceil((new Date(doc.responseDeadline) - STATE.today) / (1000 * 60 * 60 * 24)));
                return `
                    <div class="bg-white rounded border border-red-200 p-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-medium text-sm text-gray-900">${doc.recipient}</p>
                                <p class="text-xs text-gray-600">${doc.caseName} • ${doc.type}</p>
                            </div>
                            <span class="text-xs font-semibold text-red-600">${daysOverdue} day${daysOverdue === 1 ? '' : 's'} overdue</span>
                        </div>
                    </div>
                `;
            }).join('')}
            <button onclick="event.stopPropagation(); Router.navigate('/documents')" 
                    class="w-full mt-2 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                View All Documents
            </button>
        </div>
    `;
}

// Upcoming Court expansion
function renderUpcomingCourtExpansion() {
    const upcoming = DATA.courtDates.filter(date => {
        const daysUntil = Math.ceil((new Date(date.date) - STATE.today) / (1000 * 60 * 60 * 24));
        return daysUntil >= 0 && daysUntil <= 14;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (upcoming.length === 0) {
        return '<p class="text-sm text-gray-500 text-center py-4">No upcoming court dates in next 14 days</p>';
    }
    
    return `
        <div class="space-y-2">
            ${upcoming.map(event => {
                const daysUntil = getDaysUntil(event.date);
                const isUrgent = daysUntil === 'Today' || daysUntil === 'Tomorrow' || 
                                (typeof daysUntil === 'string' && parseInt(daysUntil) <= 3);
                return `
                    <div class="bg-white rounded border ${isUrgent ? 'border-orange-300' : 'border-gray-200'} p-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-medium text-sm text-gray-900">${event.type}</p>
                                <p class="text-xs text-gray-600">${event.caseName}</p>
                                <p class="text-xs text-gray-500 mt-1">${event.time} • ${event.room}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-xs font-medium text-gray-900">${formatDate(event.date)}</p>
                                <p class="text-xs font-semibold ${isUrgent ? 'text-orange-600' : 'text-blue-600'}">${daysUntil}</p>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// High Priority expansion
function renderHighPriorityExpansion() {
    const highPriority = DATA.cases.filter(c => c.priority === 'High');
    
    return `
        <div class="space-y-2">
            ${highPriority.map(c => `
                <div class="bg-white rounded border border-gray-200 p-3">
                    <button onclick="event.stopPropagation(); Router.navigate('/case/${c.id}')" 
                            class="text-left w-full">
                        <p class="font-medium text-sm text-gray-900">${c.name}</p>
                        <p class="text-xs text-gray-600 mt-1">${c.accused} • ${c.charges}</p>
                        <div class="flex gap-4 mt-2 text-xs text-gray-500">
                            <span><strong>Status:</strong> ${c.status}</span>
                            ${c.nextCourtDate ? `<span><strong>Next Court:</strong> ${formatDate(c.nextCourtDate)}</span>` : ''}
                        </div>
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}
```

### ✅ Checkpoint 3
Test by opening index.html. The stat cards should still display normally. No expansion yet.

---

## Task 2.4: Update Dashboard to Use New Card IDs

**File:** `js/views/dashboard.js`

### Step 1: Find the Stats Cards section
Look for the section that renders the 4 stat cards. It should look like:
```javascript
<div class="grid grid-cols-4 gap-4">
    ${renderStatCard('briefcase', 'Active Cases', DATA.cases.length, 'border-blue-500')}
    ...
```

### Step 2: Replace with card IDs
Replace that entire grid section with:

```javascript
            <!-- Stats Cards -->
            <div class="grid grid-cols-4 gap-4">
                ${renderStatCard('briefcase', 'Active Cases', DATA.cases.length, 'border-blue-500', 'active-cases')}
                ${renderStatCard('alert-circle', 'Overdue Docs', overdueDocuments.length, 'border-red-500', 'overdue-docs')}
                ${renderStatCard('calendar', 'Court (14d)', upcomingCourtDates.length, 'border-green-500', 'upcoming-court')}
                ${renderStatCard('alert-triangle', 'High Priority', highPriorityCases.length, 'border-orange-500', 'high-priority')}
            </div>
```

### ✅ Checkpoint 4
Test by opening index.html and clicking each stat card:
1. Click "Active Cases" - should expand to show grouped list
2. Click "Overdue Docs" - should expand to show overdue items
3. Click "Upcoming Court" - should expand to show court dates
4. Click "High Priority" - should expand to show priority cases
5. Click same card again - should collapse
6. Click different card - should collapse previous and expand new one
7. Click case names - should navigate to case detail page

---

## Task 2.5: Add Animation CSS (if not already present)

**File:** `index.html`

### Step 1: Check if animation exists
Look in the `<style>` section for `.slide-down`. If it doesn't exist, add this inside the `<style>` tags:

```css
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .slide-down {
            animation: slideDown 0.3s ease-out;
        }
        .stat-card {
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
```

### ✅ Checkpoint 5
Expansions should now slide down smoothly. Hover over cards for lift effect.

---

## 🧪 Final Testing for Sprint 2

1. **Test each card expansion:**
   - Active Cases: Shows High/Medium/Low groups, clickable case names
   - Overdue Docs: Shows recipient, case name, days overdue
   - Upcoming Court: Shows events sorted by date, urgent ones highlighted
   - High Priority: Shows case details, clickable to navigate

2. **Test interactions:**
   - Only one card expanded at a time
   - Clicking same card collapses it
   - Clicking expanded content doesn't collapse card (event.stopPropagation works)
   - Case name links navigate correctly

3. **Test animations:**
   - Smooth slide down when expanding
   - Cards lift on hover
   - Chevron icon rotates up/down

4. **Test responsive:**
   - Resize window - cards should stack on small screens
   - Expanded content should fit properly

## 📝 Commit Message
```
feat: Add expandable stat cards with detailed views

- Add click-to-expand functionality for all 4 stat cards
- Show grouped case lists, overdue details, court dates, priorities
- Only one card expands at a time
- Add smooth animations and hover effects
- Preserve navigation within expanded content
```

---

## 🚫 Common Issues & Fixes

**Issue:** Clicking expansion closes the card
**Fix:** Make sure `event.stopPropagation()` is on buttons inside expansion

**Issue:** Multiple cards expand at once
**Fix:** Check that `toggleCardExpansion()` sets `STATE.expandedCard` correctly

**Issue:** Expansion content doesn't show
**Fix:** Verify `renderCardExpansion()` is called in `renderStatCard()`

**Issue:** Icons don't update
**Fix:** Call `lucide.createIcons()` after render

**Issue:** Animations don't work
**Fix:** Check that `.slide-down` CSS is in index.html

---

## ✅ Sprint 2 Complete!
Your stat cards now provide detailed information on-demand without leaving the dashboard.

**Next:** Sprint 3 will add recent changes tracking.

