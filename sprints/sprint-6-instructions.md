# Sprint 6: Clean UI Styling Overhaul

## 🎯 Objective
Transform the "blocky" design into a clean, minimal aesthetic inspired by Spektra - focusing **only on styling changes** with no functionality or layout modifications.

## 📋 Design Principles

### Remove:
- ❌ Heavy colored background boxes
- ❌ Thick borders and heavy shadows
- ❌ Excessive use of colored badges/pills
- ❌ Visual noise and clutter

### Add:
- ✅ Subtle borders (1px, gray-100)
- ✅ Clean white cards with rounded-xl corners
- ✅ Strategic color use (status dots, icons, alerts only)
- ✅ More whitespace and breathing room
- ✅ Minimal hover states (subtle lift effect)
- ✅ Simple SVG icons instead of colored badges

---

## 🎨 Design System Updates

### Color Usage Rules
```
Status indicators:
- Red dot (•) = High priority / Overdue / Urgent
- Orange dot (•) = Medium priority / Warning
- Blue dot (•) = Court date / Calendar event
- Green dot (•) = Completed / Received
- Gray dot (•) = Low priority / Inactive

Icon backgrounds:
- Use 32x32px rounded badge (rounded-lg)
- Light colored backgrounds: red-50, blue-50, green-50, orange-50, gray-50
- Icon color matches: red-600, blue-600, green-600, orange-600, gray-600

Text hierarchy:
- Headings: font-semibold, text-gray-900
- Body: text-sm, text-gray-600
- Meta info: text-xs, text-gray-500
- Links/actions: text-blue-600 hover:text-blue-800
```

### Component Styling Standards
```
Cards:
- bg-white rounded-xl border border-gray-100
- No box-shadow by default
- hover: shadow-sm and slight transform

Buttons:
- Primary: bg-blue-600 text-white rounded-lg hover:bg-blue-700
- Secondary: bg-white border border-gray-200 rounded-lg hover:bg-gray-50
- Ghost: hover:bg-gray-50 rounded-lg

Dividers:
- border-gray-100 or border-gray-50 (very subtle)
- Use divide-y for list items

Lists:
- No borders between items, use divide-y divide-gray-50
- hover:bg-gray-50 for interactive items
- Subtle padding (px-5 py-3 or px-5 py-4)
```

---

## 📁 Files to Update

### Phase 1: Core Components (Priority)
1. `index.html` - Update base styles
2. `js/components/header.js` - Clean header with minimal search
3. `js/components/navigation.js` - Simplified sidebar
4. `js/components/statCard.js` - Minimal stat cards
5. `js/components/rightSidebar.js` - Clean right panel

### Phase 2: Main Views
6. `js/views/dashboard.js` - Clean dashboard layout
7. `js/views/cases.js` - Card-based case list
8. `js/views/caseDetail.js` - Clean case detail page
9. `js/views/documents.js` - Minimal table design
10. `js/views/calendar.js` - Clean calendar grid

### Phase 3: Additional Views
11. `js/views/recentUpdates.js` - Timeline style updates
12. `js/views/weekPlanner.js` - Clean week grid
13. `js/views/progress.js` - Minimal progress tracking
14. `js/views/trialPrep.js` - Clean form design

### Phase 4: Small Components
15. `js/components/documentCard.js` - Simplified card
16. `js/components/courtEventCard.js` - Minimal event card
17. `js/components/recentChanges.js` - Clean activity feed
18. `js/components/searchResults.js` - Subtle dropdown

---

## 🔧 Task-by-Task Instructions

### Task 1: Update Base Styles in `index.html`

**File:** `index.html`

**Changes:**
1. **Remove** the heavy `.stat-card` hover styles:
```css
/* REMOVE THIS */
.stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
```

2. **Add** new minimal hover style:
```css
/* ADD THIS */
.hover-lift {
    transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.hover-lift:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
```

3. **Add** status dot styles:
```css
.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}
```

4. **Add** icon badge styles:
```css
.icon-badge {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
}
```

5. **Add** subtle divider class:
```css
.subtle-divide {
    border-bottom: 1px solid #f0f0f0;
}
```

**Testing:** Open index.html - no visual changes yet, just CSS prep.

---

### Task 2: Clean Header Component

**File:** `js/components/header.js`

**Current Issues:**
- Heavy border
- Cluttered layout
- Oversized elements

**Changes:**

1. **Replace** header container classes:
```javascript
// FIND:
class="bg-white shadow-sm border-b border-gray-200"

// REPLACE WITH:
class="bg-white border-b border-gray-100"
```

2. **Simplify** search input:
```javascript
// FIND:
class="flex-1 max-w-xl relative"

// REPLACE WITH:
class="flex-1 max-w-md mx-8"

// FIND search input classes:
class="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

// REPLACE WITH:
class="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
```

3. **Clean** notification button:
```javascript
// FIND:
class="p-2 hover:bg-gray-100 rounded-lg"

// REPLACE WITH:
class="p-2 hover:bg-gray-50 rounded-lg transition-colors"
```

4. **Simplify** user avatar styling - keep as is, but ensure it's:
```javascript
class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium"
```

**Testing:** Header should look cleaner with subtler borders and grays.

---

### Task 3: Minimal Navigation Sidebar

**File:** `js/components/navigation.js`

**Changes:**

1. **Update** sidebar container:
```javascript
// FIND:
class="fixed left-0 top-0 h-screen ... bg-white border-r border-gray-200 shadow-sm"

// REPLACE WITH:
class="fixed left-0 top-0 h-screen ... bg-white border-r border-gray-100"
```

2. **Clean** navigation button styles:
```javascript
// FIND active state:
class="... bg-blue-600 text-white shadow-sm"

// KEEP AS IS (this is good)

// FIND inactive state:
class="... text-gray-700 hover:bg-gray-100"

// REPLACE WITH:
class="... text-gray-700 hover:bg-gray-50"
```

3. **Simplify** dividers:
```javascript
// FIND:
class="border-b border-gray-200"

// REPLACE WITH:
class="border-b border-gray-100"
```

4. **Clean** footer styling:
```javascript
// FIND:
class="border-t border-gray-200"

// REPLACE WITH:
class="border-t border-gray-100"
```

**Testing:** Sidebar should feel lighter with more subtle dividers.

---

### Task 4: Minimal Stat Cards

**File:** `js/components/statCard.js`

**Changes:**

1. **Replace** card container classes:
```javascript
// FIND:
class="bg-white rounded-lg shadow-sm border border-gray-200 stat-card"

// REPLACE WITH:
class="bg-white rounded-xl border border-gray-100 hover-lift"
```

2. **Remove** colored backgrounds from card headers:
```javascript
// FIND any variations of:
class="px-4 py-3 bg-blue-50 border-b border-blue-100"
class="px-4 py-3 bg-red-50 border-b border-red-100"
class="px-4 py-3 bg-orange-50 border-b border-orange-100"

// REPLACE ALL WITH:
class="px-4 py-3 border-b border-gray-100"
```

3. **Simplify** stat display - make number bigger, remove heavy styling:
```javascript
// The stat number should use:
class="text-2xl font-semibold text-gray-900"

// The label should use:
class="text-sm text-gray-600"
```

4. **Replace** heavy colored badges with simple dots:
```javascript
// FIND badge patterns like:
<span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
    High Priority
</span>

// REPLACE WITH:
<div class="flex items-center gap-2">
    <div class="w-2 h-2 rounded-full bg-red-500"></div>
    <span class="text-sm text-gray-900">High Priority</span>
</div>
```

5. **Clean** expansion content:
```javascript
// FIND:
class="mt-2 bg-gray-50 rounded-lg p-4 border border-gray-200"

// REPLACE WITH:
class="mt-2 bg-gray-50 rounded-lg p-4 border border-gray-100"
```

**Testing:** Stat cards should look much cleaner with minimal borders and no colored boxes.

---

### Task 5: Clean Dashboard View

**File:** `js/views/dashboard.js`

**Changes:**

1. **Remove** greeting box, make it plain text:
```javascript
// FIND:
<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h1>Good morning, ${STATE.userName}</h1>
    <p>...</p>
</div>

// REPLACE WITH:
<div class="mb-8">
    <h2 class="text-2xl font-semibold text-gray-900 mb-1">Good morning, ${STATE.userName}</h2>
    <p class="text-gray-600">You have <span class="font-medium text-gray-900">3 urgent items</span> and ...</p>
</div>
```

2. **Update** stat grid - already handled by statCard.js changes

3. **Clean** "Recent Changes" section:
```javascript
// Update the recent changes container:
// FIND:
class="bg-white rounded-lg shadow-sm border border-gray-200"

// REPLACE WITH:
class="bg-white rounded-xl border border-gray-100"
```

4. **Simplify** section headers:
```javascript
// FIND:
class="px-4 py-3 border-b border-gray-200 bg-gray-50"

// REPLACE WITH:
class="px-5 py-4 border-b border-gray-100"
```

5. **Clean** list items - remove boxes, use subtle hovers:
```javascript
// FIND list items like:
class="px-4 py-3 hover:bg-gray-100 cursor-pointer"

// REPLACE WITH:
class="px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
```

6. **Replace** icon badges:
```javascript
// FIND patterns like:
<i data-lucide="file-check" class="w-4 h-4 text-green-500"></i>

// WRAP in badge:
<div class="icon-badge bg-green-50">
    <i data-lucide="file-check" class="w-4 h-4 text-green-600"></i>
</div>
```

**Testing:** Dashboard should feel much cleaner and less cluttered.

---

### Task 6: Card-Based Cases View

**File:** `js/views/cases.js`

**Changes:**

1. **Add** page header (no box):
```javascript
// ADD at the top:
<div class="mb-6">
    <h2 class="text-2xl font-semibold text-gray-900 mb-1">All Cases</h2>
    <p class="text-gray-600">Manage and track all active criminal cases</p>
</div>
```

2. **Clean** filter pills:
```javascript
// FIND:
<button class="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white">

// REPLACE WITH:
<button class="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 rounded-lg">
```

3. **If using table** - convert to card layout:
```javascript
// INSTEAD OF TABLE, use cards:
<div class="space-y-3">
    ${DATA.cases.map(caseItem => `
        <div class="bg-white rounded-xl border border-gray-100 p-5 hover-lift">
            <div class="flex items-start gap-4">
                <div class="w-2 h-2 rounded-full ${getPriorityColor(caseItem.priority)} mt-1.5 flex-shrink-0"></div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between mb-2">
                        <div>
                            <h3 class="font-semibold text-gray-900 mb-1">${caseItem.name}</h3>
                            <p class="text-sm text-gray-600">${caseItem.accused} • ${caseItem.charges}</p>
                        </div>
                        <span class="px-2 py-1 text-xs font-medium ${getPriorityBadgeClass(caseItem.priority)} rounded">
                            ${caseItem.priority} priority
                        </span>
                    </div>
                    <div class="flex items-center gap-4 text-xs text-gray-500">
                        <!-- Meta info with icons -->
                    </div>
                </div>
                <button class="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i>
                </button>
            </div>
        </div>
    `).join('')}
</div>
```

4. **Update** `getPriorityColor` in utils.js to return dot color:
```javascript
// Should return: bg-red-500, bg-orange-500, or bg-gray-300
```

5. **Add** `getPriorityBadgeClass` in utils.js:
```javascript
const getPriorityBadgeClass = (priority) => {
    if (priority === 'High') return 'bg-red-50 text-red-700';
    if (priority === 'Medium') return 'bg-orange-50 text-orange-700';
    return 'bg-gray-100 text-gray-700';
};
```

**Testing:** Cases should display as clean cards instead of heavy table.

---

### Task 7: Clean Documents View

**File:** `js/views/documents.js`

**Changes:**

1. **Add** page header:
```javascript
<div class="mb-6">
    <h2 class="text-2xl font-semibold text-gray-900 mb-1">Documents</h2>
    <p class="text-gray-600">Track document requests and disclosure materials</p>
</div>
```

2. **If using table** - clean it up:
```javascript
// Table container:
<div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
    <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
                <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Document</th>
                <!-- ... -->
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
            <!-- rows -->
        </tbody>
    </table>
</div>
```

3. **Clean** table rows:
```javascript
<tr class="hover:bg-gray-50 transition-colors">
    <td class="px-5 py-4">
        <div class="flex items-center gap-3">
            <div class="icon-badge bg-blue-50">
                <i data-lucide="file-text" class="w-4 h-4 text-blue-600"></i>
            </div>
            <div>
                <p class="text-sm font-medium text-gray-900">Document name</p>
                <p class="text-xs text-gray-500">Description</p>
            </div>
        </div>
    </td>
    <!-- ... -->
</tr>
```

4. **Replace** status badges with subtle versions:
```javascript
// FIND:
<span class="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">Overdue</span>

// REPLACE WITH:
<span class="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium bg-red-50 text-red-700 rounded">
    <div class="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
    Overdue
</span>
```

**Testing:** Documents table should look cleaner with minimal styling.

---

### Task 8: Clean Calendar View

**File:** `js/views/calendar.js`

**Changes:**

1. **Add** clean page header with controls:
```javascript
<div class="mb-6 flex items-center justify-between">
    <div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-1">Calendar</h2>
        <p class="text-gray-600">View all court dates and deadlines</p>
    </div>
    <div class="flex items-center gap-2">
        <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Today
        </button>
        <!-- nav buttons -->
    </div>
</div>
```

2. **Clean** calendar container:
```javascript
<div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
```

3. **Simplify** calendar grid:
```javascript
// Day headers:
<div class="grid grid-cols-7 border-b border-gray-100">
    <div class="px-3 py-2 text-center text-xs font-medium text-gray-600 bg-gray-50">Sun</div>
    <!-- ... -->
</div>

// Calendar cells:
<div class="border-r border-b border-gray-100 p-2 h-24 hover:bg-gray-50 transition-colors">
    <div class="text-sm text-gray-900">12</div>
</div>
```

4. **Today highlight** - clean blue background:
```javascript
<div class="border-r border-b border-gray-100 p-2 h-24 bg-blue-50 hover:bg-blue-100 transition-colors">
    <div class="text-sm font-semibold text-blue-600">12</div>
    <div class="text-xs text-blue-600 mt-1">Today</div>
</div>
```

5. **Event pills** - minimal colored tags:
```javascript
<div class="mt-1 space-y-1">
    <div class="px-1.5 py-0.5 bg-blue-100 rounded text-xs font-medium text-blue-700">
        Bail
    </div>
</div>
```

**Testing:** Calendar should look cleaner with subtle grid lines.

---

### Task 9: Clean Week Planner

**File:** `js/views/weekPlanner.js`

**Changes:**

1. **Update** page header:
```javascript
<div class="mb-6 flex items-center justify-between">
    <div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-1">Week Planner</h2>
        <p class="text-gray-600">Plan your week with auto-scheduling</p>
    </div>
    <div class="flex items-center gap-2">
        <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            This week
        </button>
        <button class="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Auto-schedule
        </button>
    </div>
</div>
```

2. **Clean** day columns:
```javascript
<div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
    <div class="px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div class="font-medium text-gray-900">Monday</div>
        <div class="text-xs text-gray-500">Oct 14</div>
    </div>
    <div class="p-3 space-y-2">
        <!-- tasks -->
    </div>
</div>
```

3. **Simplify** task cards:
```javascript
<div class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
    <div class="flex items-start gap-2 mb-2">
        <i data-lucide="calendar" class="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5"></i>
        <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900">Task name</p>
            <p class="text-xs text-gray-600 mt-0.5">Case name</p>
        </div>
    </div>
    <div class="text-xs text-gray-500">9:00 AM - 11:00 AM</div>
</div>
```

**Testing:** Week planner should have cleaner task cards.

---

### Task 10: Clean Recent Updates View

**File:** `js/views/recentUpdates.js`

**Changes:**

1. **Update** page header:
```javascript
<div class="bg-white rounded-xl border border-gray-100 p-6">
    <h1 class="text-2xl font-semibold text-gray-900 flex items-center gap-2">
        <i data-lucide="activity" class="w-6 h-6"></i>
        Recent Updates
    </h1>
    <p class="text-gray-600 mt-2">Track all changes and updates across your cases</p>
</div>
```

2. **Clean** timeline sections:
```javascript
<div class="px-6 py-3 bg-blue-50 border-b border-blue-100">
    <h2 class="text-sm font-bold text-blue-900 uppercase flex items-center gap-2">
        <i data-lucide="sun" class="w-4 h-4"></i>
        Today
    </h2>
</div>
```

3. **Simplify** activity items:
```javascript
<div class="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
    <div class="flex items-start gap-4">
        <div class="icon-badge bg-green-50 flex-shrink-0">
            <i data-lucide="file-check" class="w-5 h-5 text-green-600"></i>
        </div>
        <div class="flex-1 min-w-0">
            <p class="text-base font-medium text-gray-900">Description</p>
            <div class="flex items-center gap-2 mt-1">
                <span class="text-sm font-semibold text-gray-700">Case name</span>
            </div>
            <p class="text-sm text-gray-500 mt-2">Timestamp</p>
        </div>
    </div>
</div>
```

**Testing:** Recent updates should have clean timeline with icon badges.

---

### Task 11: Update Right Sidebar

**File:** `js/components/rightSidebar.js`

**Changes:**

1. **Clean** container:
```javascript
// FIND:
class="fixed right-0 top-0 h-screen ... bg-white border-l border-gray-200 shadow-sm"

// REPLACE WITH:
class="fixed right-0 top-0 h-screen ... bg-white border-l border-gray-100"
```

2. **Simplify** sections:
```javascript
// FIND section dividers:
class="border-b border-gray-200"

// REPLACE WITH:
class="border-b border-gray-100"
```

3. **Clean** stat displays:
```javascript
// Use minimal styling for quick stats
class="text-2xl font-semibold text-gray-900"
class="text-sm text-gray-600"
```

**Testing:** Right sidebar should feel lighter.

---

### Task 12: Clean Small Components

**Files:** `js/components/documentCard.js`, `js/components/courtEventCard.js`, `js/components/recentChanges.js`, `js/components/searchResults.js`

**Changes for ALL:**

1. **Replace** all card containers:
```javascript
class="bg-white rounded-lg shadow-sm border border-gray-200"
// WITH:
class="bg-white rounded-xl border border-gray-100"
```

2. **Simplify** borders:
```javascript
class="border-gray-200" → class="border-gray-100"
class="border-gray-300" → class="border-gray-200"
```

3. **Clean** hover states:
```javascript
class="hover:bg-gray-100" → class="hover:bg-gray-50 transition-colors"
```

4. **Replace** colored badges with dots or minimal badges:
```javascript
// Heavy badge:
<span class="px-2 py-1 bg-red-100 text-red-800 rounded">High</span>

// Minimal version:
<span class="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded">High</span>
```

---

## ✅ Testing Checklist

After completing all tasks, test:

### Visual Consistency
- [ ] All cards use `rounded-xl border border-gray-100`
- [ ] All dividers are `border-gray-100` or `border-gray-50`
- [ ] No heavy colored boxes (only subtle colored backgrounds for status)
- [ ] Status indicators use dots (8px circles) or minimal badges
- [ ] Icon badges are 32x32px with light colored backgrounds

### Hover States
- [ ] All interactive elements have subtle hover (bg-gray-50)
- [ ] Cards have minimal lift effect on hover
- [ ] No heavy shadows on hover

### Typography
- [ ] Headers are font-semibold text-gray-900
- [ ] Body text is text-sm text-gray-600
- [ ] Meta info is text-xs text-gray-500
- [ ] Consistent hierarchy across all views

### Color Usage
- [ ] Red only for urgent/overdue/errors
- [ ] Orange for warnings/medium priority
- [ ] Blue for calendar/court dates/info
- [ ] Green for completed/received
- [ ] Gray for neutral/inactive

### Spacing
- [ ] Adequate whitespace between sections
- [ ] Consistent padding (px-5 py-4 for sections, px-5 py-3 for list items)
- [ ] Clean breathing room

### Cross-View Consistency
- [ ] Dashboard matches styling
- [ ] Cases view matches styling
- [ ] Documents view matches styling
- [ ] Calendar view matches styling
- [ ] Week Planner matches styling
- [ ] All other views match styling

---

## 📝 Helper Functions to Add/Update

### In `js/utils.js`:

```javascript
// Update getPriorityColor to return dot background classes
const getPriorityColor = (priority) => {
    if (priority === 'High') return 'bg-red-500';
    if (priority === 'Medium') return 'bg-orange-500';
    return 'bg-gray-300';
};

// Add badge color helper
const getPriorityBadgeClass = (priority) => {
    if (priority === 'High') return 'bg-red-50 text-red-700';
    if (priority === 'Medium') return 'bg-orange-50 text-orange-700';
    return 'bg-gray-100 text-gray-700';
};

// Add status color helper
const getStatusBadgeClass = (status) => {
    if (status === 'Overdue') return 'bg-red-50 text-red-700';
    if (status === 'Pending') return 'bg-yellow-50 text-yellow-700';
    if (status === 'Received') return 'bg-green-50 text-green-700';
    return 'bg-gray-100 text-gray-700';
};

// Add icon badge background helper
const getIconBadgeClass = (type) => {
    if (type === 'court' || type === 'calendar') return 'bg-blue-50';
    if (type === 'document') return 'bg-blue-50';
    if (type === 'deadline' || type === 'urgent') return 'bg-red-50';
    if (type === 'warning') return 'bg-orange-50';
    if (type === 'success' || type === 'completed') return 'bg-green-50';
    return 'bg-gray-50';
};

// Add icon color helper
const getIconColorClass = (type) => {
    if (type === 'court' || type === 'calendar') return 'text-blue-600';
    if (type === 'document') return 'text-blue-600';
    if (type === 'deadline' || type === 'urgent') return 'text-red-600';
    if (type === 'warning') return 'text-orange-600';
    if (type === 'success' || type === 'completed') return 'text-green-600';
    return 'text-gray-600';
};
```

---

## 🚀 Deployment

After completing all styling changes:

1. **Test locally** - Open index.html and verify all views
2. **Check responsiveness** - Test on mobile/tablet sizes
3. **Verify icon loading** - Ensure all Lucide icons render
4. **Git commit**:
```bash
git add .
git commit -m "style: Clean UI overhaul - minimal Spektra-inspired design"
git push origin main
```

---

## 🎨 Before & After Reference

### Before:
- Heavy colored boxes everywhere
- Thick borders and shadows
- Cluttered visual hierarchy
- Excessive use of color

### After:
- Clean white cards with subtle borders
- Minimal use of color (strategic only)
- Clear visual hierarchy
- More whitespace and breathing room
- Professional, focused aesthetic

---

## 📞 Notes

- **DO NOT** change any functionality
- **DO NOT** modify data structures
- **DO NOT** change routing or navigation logic
- **ONLY** update styling/CSS classes
- Keep all existing data-lucide icon names
- Maintain all existing onclick handlers
- Preserve all conditional rendering logic

**Goal:** Make it look like Spektra while keeping everything working exactly as it does now.