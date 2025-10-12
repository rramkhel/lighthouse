# Sprint 3: Recent Changes Tracker

## 🎯 Sprint Goal
Add a "Recent Updates" section to track what's changed in the last 24-48 hours, helping Conner quickly see what's new and actionable.

## 📋 Prerequisites
- Sprint 1 & 2 completed (greeting, summary, expandable cards working)
- Dashboard renders properly
- `STATE` object exists in `js/data.js`

---

## Task 3.1: Add Recent Changes Data

**File:** `js/data.js`

### Step 1: Add recentChanges to STATE object
Find the `STATE` object and add the `recentChanges` array right after `userName`:

```javascript
const STATE = {
    currentView: 'dashboard',
    selectedCase: null,
    calendarMonth: new Date('2025-10-01'),
    today: new Date('2025-10-11'),
    userName: 'Conner',
    expandedCard: null,
    // Recent changes - in production this would come from backend/activity log
    recentChanges: [
        { 
            id: 1, 
            type: 'document', 
            caseId: 1, 
            caseName: 'R v. Thompson', 
            description: 'Medical records received (partial)', 
            timestamp: '2025-10-11T08:30:00', 
            icon: 'file-check',
            priority: 'normal'
        },
        { 
            id: 2, 
            type: 'document', 
            caseId: 5, 
            caseName: 'R v. Patel', 
            description: 'Financial records marked overdue', 
            timestamp: '2025-10-11T00:01:00', 
            icon: 'alert-circle',
            priority: 'high'
        },
        { 
            id: 3, 
            type: 'court', 
            caseId: 2, 
            caseName: 'R v. Chen', 
            description: 'Bail hearing in 4 days', 
            timestamp: '2025-10-10T16:45:00', 
            icon: 'calendar',
            priority: 'normal'
        },
        { 
            id: 4, 
            type: 'case', 
            caseId: 1, 
            caseName: 'R v. Thompson', 
            description: 'Case status updated to Trial Prep', 
            timestamp: '2025-10-10T14:20:00', 
            icon: 'briefcase',
            priority: 'normal'
        },
        { 
            id: 5, 
            type: 'document', 
            caseId: 6, 
            caseName: 'R v. Williams', 
            description: 'Blood test results received', 
            timestamp: '2025-10-09T11:15:00', 
            icon: 'file-check',
            priority: 'normal'
        },
        { 
            id: 6, 
            type: 'deadline', 
            caseId: 3, 
            caseName: 'R v. Martinez', 
            description: 'Expert report deadline approaching (5 days)', 
            timestamp: '2025-10-09T09:00:00', 
            icon: 'clock',
            priority: 'medium'
        },
        { 
            id: 7, 
            type: 'court', 
            caseId: 5, 
            caseName: 'R v. Patel', 
            description: 'Pre-trial conference scheduled', 
            timestamp: '2025-10-08T15:30:00', 
            icon: 'calendar',
            priority: 'normal'
        }
    ]
};
```

### ✅ Checkpoint 1
No visible change yet. Data is ready to be displayed.

---

## Task 3.2: Add Helper Function for Time Formatting

**File:** `js/utils.js`

### Step 1: Add time formatting function
Add this function at the END of the file:

```javascript
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
```

### ✅ Checkpoint 2
No visible change yet. Helper functions are ready.

---

## Task 3.3: Create Recent Changes Component

**File:** Create new file `js/components/recentChanges.js`

### Step 1: Create the file
Create a NEW file at `js/components/recentChanges.js` with this EXACT content:

```javascript
// Recent Changes Component

function renderRecentChanges() {
    // Get recent changes sorted by timestamp (newest first)
    const sortedChanges = [...STATE.recentChanges].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    // Limit to 10 most recent
    const recentItems = sortedChanges.slice(0, 10);
    
    // Group by time period
    const grouped = groupRecentChanges(recentItems);
    
    return `
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-4 py-3 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <i data-lucide="activity" class="w-5 h-5"></i>
                    Recent Updates
                </h3>
                <p class="text-xs text-gray-500 mt-1">Last 48 hours • TODO: This should be dynamically updated from backend</p>
            </div>
            <div class="divide-y divide-gray-100">
                ${grouped.today.length > 0 ? `
                    <div class="px-4 py-2 bg-blue-50">
                        <p class="text-xs font-semibold text-blue-900 uppercase">Today</p>
                    </div>
                    ${grouped.today.map(change => renderChangeItem(change)).join('')}
                ` : ''}
                
                ${grouped.yesterday.length > 0 ? `
                    <div class="px-4 py-2 bg-gray-50">
                        <p class="text-xs font-semibold text-gray-700 uppercase">Yesterday</p>
                    </div>
                    ${grouped.yesterday.map(change => renderChangeItem(change)).join('')}
                ` : ''}
                
                ${grouped.earlier.length > 0 ? `
                    <div class="px-4 py-2 bg-gray-50">
                        <p class="text-xs font-semibold text-gray-700 uppercase">Earlier</p>
                    </div>
                    ${grouped.earlier.map(change => renderChangeItem(change)).join('')}
                ` : ''}
                
                ${recentItems.length === 0 ? `
                    <div class="px-4 py-8 text-center text-gray-500 text-sm">
                        No recent updates
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function renderChangeItem(change) {
    // Get icon color based on type and priority
    let iconColor = 'text-gray-500';
    if (change.priority === 'high') {
        iconColor = 'text-red-500';
    } else if (change.priority === 'medium') {
        iconColor = 'text-orange-500';
    } else if (change.type === 'document' && change.icon === 'file-check') {
        iconColor = 'text-green-500';
    } else if (change.type === 'court') {
        iconColor = 'text-blue-500';
    }
    
    return `
        <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer transition" 
             onclick="Router.navigate('/case/${change.caseId}')">
            <div class="flex items-start gap-3">
                <i data-lucide="${change.icon}" class="w-4 h-4 ${iconColor} mt-0.5 flex-shrink-0"></i>
                <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-900">${change.description}</p>
                    <p class="text-xs text-gray-500 mt-0.5">
                        <span class="font-medium">${change.caseName}</span>
                        <span class="mx-1">•</span>
                        <span>${formatTimestamp(change.timestamp)}</span>
                    </p>
                </div>
                ${change.priority === 'high' ? `
                    <span class="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        Urgent
                    </span>
                ` : ''}
            </div>
        </div>
    `;
}
```

### ✅ Checkpoint 3
File created. Component is ready to be used.

---

## Task 3.4: Add Component to index.html

**File:** `index.html`

### Step 1: Add script tag
Find the section with all the component script tags. It should look like:
```html
    <!-- Components -->
    <script src="js/components/header.js"></script>
    <script src="js/components/navigation.js"></script>
    ...
```

Add this line with the other component scripts:
```html
    <script src="js/components/recentChanges.js"></script>
```

### ✅ Checkpoint 4
No visible change yet. Script is now loaded.

---

## Task 3.5: Add Recent Changes to Dashboard

**File:** `js/views/dashboard.js`

### Step 1: Find where to insert
Look for the three-column grid section with "Overdue Documents", "Urgent Documents", and "Upcoming Court Dates". It should start with:
```html
            <div class="grid grid-cols-3 gap-4">
```

### Step 2: Add Recent Changes section
Add this AFTER the three-column grid closes (after the `</div>`):

```javascript
            <!-- Recent Changes -->
            ${renderRecentChanges()}
```

The structure should look like:
```javascript
            <!-- Three Column Layout -->
            <div class="grid grid-cols-3 gap-4">
                <!-- Overdue Documents -->
                ...
                <!-- Urgent Documents -->
                ...
                <!-- Upcoming Court Dates -->
                ...
            </div>

            <!-- Recent Changes -->
            ${renderRecentChanges()}

            <!-- High Priority Cases Table -->
            <div class="bg-white rounded-lg...">
```

### ✅ Checkpoint 5
Test by opening index.html. You should see:
- "Recent Updates" section below the three-column cards
- Changes grouped by "Today", "Yesterday", "Earlier"
- Timestamps showing relative time
- Icons with appropriate colors
- Hover effect on items
- Clicking an item navigates to that case

---

## 🧪 Final Testing for Sprint 3

1. **Test display:**
   - Recent Updates section appears below three-column grid
   - Changes are grouped by time period
   - Each change shows icon, description, case name, timestamp
   - High priority items show "Urgent" badge

2. **Test interactions:**
   - Click on any change item - should navigate to that case
   - Hover over items - should highlight
   - Icons should have appropriate colors (red for urgent, green for received, blue for court)

3. **Test data:**
   - Should show max 10 items
   - Should be sorted newest first
   - Timestamps should format correctly (Today vs Yesterday vs days ago)

4. **Test responsive:**
   - Resize window - should display properly on smaller screens
   - Long descriptions should wrap properly

## 📝 Commit Message
```
feat: Add recent changes tracker to dashboard

- Display recent updates from last 48 hours
- Group changes by Today/Yesterday/Earlier
- Show relative timestamps and icons
- Click to navigate to relevant case
- Highlight urgent items with badge
- Limit to 10 most recent changes
```

---

## 🚫 Common Issues & Fixes

**Issue:** "formatTimestamp is not defined"
**Fix:** Make sure you added the function to `js/utils.js` and it's loaded before dashboard

**Issue:** "groupRecentChanges is not defined"
**Fix:** Same as above - check `js/utils.js`

**Issue:** Changes don't show
**Fix:** Verify `recentChanges` array exists in STATE in `js/data.js`

**Issue:** Clicking change doesn't navigate
**Fix:** Check that `onclick="Router.navigate('/case/${change.caseId}')"` has correct syntax

**Issue:** Icons don't show
**Fix:** Call `lucide.createIcons()` at end of render

**Issue:** Time formatting wrong
**Fix:** Verify `STATE.today` is a proper Date object, not a string

---

## ✅ Sprint 3 Complete!
Users can now see what's changed recently and quickly navigate to updated cases.

**Next:** Sprint 4 will add global search functionality.

