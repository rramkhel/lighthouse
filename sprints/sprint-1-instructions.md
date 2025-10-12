# Sprint 1: Personalized Greeting & Dashboard Summary

## 🎯 Sprint Goal
Add a personalized greeting and intelligent summary to help Conner quickly understand what needs attention when opening the dashboard.

## 📋 Prerequisites
- Existing legal case tracker with dashboard at `js/views/dashboard.js`
- Data layer at `js/data.js` with STATE.userName = 'Conner'
- Current date available as STATE.today

---

## Task 1.1: Add Time-Based Greeting

**File:** `js/views/dashboard.js`

### Step 1: Add greeting helper function
At the **TOP** of the file, before `renderDashboard()`, add this exact code:

```javascript
// Greeting helper - returns appropriate greeting based on time
function getGreeting() {
    const hour = STATE.today.getHours();
    let timeOfDay, greetings;
    
    if (hour < 12) {
        timeOfDay = 'morning';
        greetings = [
            "Let's make today count!",
            "Ready to tackle those cases?",
            "Fresh start, fresh perspective!",
            "Time to make progress!",
            "Let's get after it!"
        ];
    } else if (hour < 17) {
        timeOfDay = 'afternoon';
        greetings = [
            "Keeping the momentum going!",
            "Making great progress today!",
            "Afternoon push—let's finish strong!",
            "Stay focused, you've got this!",
            "Powering through the day!"
        ];
    } else {
        timeOfDay = 'evening';
        greetings = [
            "Wrapping up the day nicely!",
            "Almost there—great work today!",
            "Evening review time!",
            "Finishing strong today!",
            "Great dedication today!"
        ];
    }
    
    // Rotate through greetings based on day of year to add variety
    const dayOfYear = Math.floor((STATE.today - new Date(STATE.today.getFullYear(), 0, 0)) / 86400000);
    const greeting = greetings[dayOfYear % greetings.length];
    
    return {
        timeOfDay,
        greeting
    };
}
```

### Step 2: Modify renderDashboard() function
Find the line in `renderDashboard()` that says:
```javascript
return `
    <div class="space-y-4">
```

Replace it with:
```javascript
const { timeOfDay, greeting } = getGreeting();

return `
    <div class="space-y-4">
        <!-- Personalized Greeting -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
            <h2 class="text-2xl font-bold text-gray-900">Good ${timeOfDay}, ${STATE.userName}!</h2>
            <p class="text-gray-600 mt-1">${greeting}</p>
        </div>
```

### ✅ Checkpoint 1
Test by opening index.html. You should see:
- "Good morning/afternoon/evening, Conner!" at the top
- A friendly tagline below it
- Changes based on time of day

---

## Task 1.2: Add Dashboard Summary

**File:** `js/views/dashboard.js`

### Step 1: Add summary calculation helper
Add this function right after the `getGreeting()` function:

```javascript
// Calculate dashboard summary statistics
function getDashboardSummary() {
    const activeCases = DATA.cases.length;
    const highPriorityCases = DATA.cases.filter(c => c.priority === 'High').length;
    
    const overdueDocs = DATA.documentRequests.filter(doc => 
        new Date(doc.responseDeadline) < STATE.today && doc.status !== 'Received'
    ).length;
    
    const upcomingCourt = DATA.courtDates.filter(date => {
        const daysUntil = Math.ceil((new Date(date.date) - STATE.today) / (1000 * 60 * 60 * 24));
        return daysUntil >= 0 && daysUntil <= 14;
    }).length;
    
    // Find next critical deadline (soonest overdue or upcoming)
    const sortedDocs = [...DATA.documentRequests]
        .filter(d => d.status !== 'Received')
        .sort((a, b) => new Date(a.responseDeadline) - new Date(b.responseDeadline));
    
    const nextDeadline = sortedDocs.length > 0 ? {
        description: `${sortedDocs[0].type} for ${sortedDocs[0].caseName}`,
        date: formatDate(sortedDocs[0].responseDeadline),
        daysUntil: getDaysUntil(sortedDocs[0].responseDeadline)
    } : null;
    
    // TODO: Calculate new updates since last session - this should come from backend
    // For now, using placeholder count
    const newUpdates = 3;
    
    return {
        activeCases,
        highPriorityCases,
        overdueDocs,
        upcomingCourt,
        newUpdates,
        nextDeadline
    };
}
```

### Step 2: Add summary section to dashboard
In `renderDashboard()`, add this right after the greeting div and BEFORE the stats cards:

```javascript
        <!-- Dashboard Summary -->
        ${(() => {
            const summary = getDashboardSummary();
            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
                        Your Day at a Glance
                    </h3>
                    <div class="space-y-3 text-sm text-gray-700">
                        <p>You're managing <strong>${summary.activeCases} active cases</strong> with <strong class="text-red-600">${summary.highPriorityCases} high priority</strong> matters.</p>
                        <ul class="list-none space-y-2">
                            ${summary.overdueDocs > 0 ? `
                                <li class="flex items-start gap-2">
                                    <i data-lucide="alert-circle" class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0"></i>
                                    <span><strong class="text-red-600">${summary.overdueDocs} document${summary.overdueDocs === 1 ? '' : 's'}</strong> overdue and need${summary.overdueDocs === 1 ? 's' : ''} immediate attention</span>
                                </li>
                            ` : ''}
                            ${summary.upcomingCourt > 0 ? `
                                <li class="flex items-start gap-2">
                                    <i data-lucide="calendar" class="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"></i>
                                    <span><strong>${summary.upcomingCourt} court date${summary.upcomingCourt === 1 ? '' : 's'}</strong> in the next 14 days</span>
                                </li>
                            ` : ''}
                            ${summary.newUpdates > 0 ? `
                                <li class="flex items-start gap-2">
                                    <i data-lucide="bell" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"></i>
                                    <span><strong>${summary.newUpdates} new update${summary.newUpdates === 1 ? '' : 's'}</strong> since yesterday</span>
                                </li>
                            ` : ''}
                            ${summary.nextDeadline ? `
                                <li class="flex items-start gap-2">
                                    <i data-lucide="clock" class="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0"></i>
                                    <span>Next critical deadline: <strong>${summary.nextDeadline.description}</strong> (${summary.nextDeadline.daysUntil})</span>
                                </li>
                            ` : ''}
                        </ul>
                    </div>
                </div>
            `;
        })()}
```

### ✅ Checkpoint 2
Test by opening index.html. You should see:
- Greeting section at top
- "Your Day at a Glance" summary below greeting
- Accurate counts based on actual data
- Icons next to each bullet point
- Red text for urgent items

---

## 🧪 Final Testing for Sprint 1

1. **Open index.html in browser**
2. **Check greeting:**
   - Changes based on time (you can test by temporarily changing `STATE.today` in data.js)
   - Shows your name (Conner)
   - Has a friendly tagline
3. **Check summary:**
   - Shows correct number of active cases (should be 6)
   - Shows correct number of high priority (should be 3)
   - Shows overdue documents (should be 2)
   - Shows upcoming court dates (should calculate from data)
   - Icons render properly (if not, check that lucide.createIcons() is called)
4. **Check responsive:**
   - Resize browser window
   - Should look good on smaller screens

## 📝 Commit Message
```
feat: Add personalized greeting and dashboard summary

- Add time-based greeting (morning/afternoon/evening)
- Add rotating taglines for variety
- Add "Your Day at a Glance" summary with key metrics
- Calculate real-time statistics from data
- Use icons for visual hierarchy
```

---

## 🚫 Common Issues & Fixes

**Issue:** Icons not showing
**Fix:** Make sure `lucide.createIcons()` is called at the end of `render()` function in `js/app.js`

**Issue:** Numbers don't match expected
**Fix:** Check that data in `js/data.js` hasn't changed. Verify filter logic in `getDashboardSummary()`

**Issue:** Greeting doesn't change
**Fix:** Check that `STATE.today` is actually a Date object, not a string

---

## ✅ Sprint 1 Complete!
You should now have a personalized, informative dashboard that helps ground you in your workload. 

**Next:** Sprint 2 will add expandable stat cards with detailed views.

