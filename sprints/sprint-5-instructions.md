# Sprint 5: Week Planner Feature

## 🎯 Objective
Implement an intelligent week planning system that auto-schedules tasks based on court dates, trial prep needs, document deadlines, and dependencies while allowing manual adjustments.

## 📦 Deliverables
- Interactive week planner view (Monday-Friday)
- Auto-scheduling algorithm with priority system
- Manual task management (add/edit/delete)
- Unscheduled task pool
- Customizable scheduling rules
- Week navigation and statistics

---

## 🏗️ Implementation Steps

### Step 1: Create Week Planner View File

**File:** `js/views/weekPlanner.js`

**Action:** Copy the entire Week Planner artifact code into this new file.

**What it includes:**
- `renderWeekPlanner()` - Main view function
- `renderDayColumn()` - Individual day rendering
- `renderScheduleItem()` - Task card rendering
- `renderUnscheduledTasks()` - Task pool display
- `generateWeekSchedule()` - Auto-scheduling algorithm
- Helper functions for date manipulation and calculations

**Verification:**
```javascript
// File should start with:
function renderWeekPlanner() {
    const today = new Date(STATE.today);
    const monday = getMonday(today);
    // ...
}
```

---

### Step 2: Update Navigation Component

**File:** `js/components/navigation.js`

**Find this section:**
```javascript
const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'briefcase' },
    { id: 'cases', label: 'Cases', icon: 'file-text' },
    { id: 'documents', label: 'Documents', icon: 'file-text' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar' },
    { id: 'progress', label: 'Progress & Dependencies', icon: 'alert-triangle' },
    { id: 'trial-prep', label: 'Trial Prep', icon: 'check-circle' }
];
```

**Add the new navigation item:**
```javascript
const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'briefcase' },
    { id: 'cases', label: 'Cases', icon: 'file-text' },
    { id: 'documents', label: 'Documents', icon: 'file-text' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar' },
    { id: 'week-planner', label: 'Week Planner', icon: 'calendar-days' },  // NEW LINE
    { id: 'progress', label: 'Progress & Dependencies', icon: 'alert-triangle' },
    { id: 'trial-prep', label: 'Trial Prep', icon: 'check-circle' }
];
```

**Note:** Place it after Calendar to keep related features together.

---

### Step 3: Register Route in Router

**File:** `js/app.js`

**Find the routes section** (should be near the top, after comments):
```javascript
Router.add('/dashboard', () => {
    STATE.currentView = 'dashboard';
    render();
});

Router.add('/cases', () => {
    STATE.currentView = 'cases';
    render();
});
// ... other routes
```

**Add the Week Planner route** (add after `/calendar` route):
```javascript
Router.add('/week-planner', () => {
    STATE.currentView = 'week-planner';
    render();
});
```

---

### Step 4: Add View to Render Switch

**File:** `js/app.js`

**Find the render function's switch statement:**
```javascript
switch(STATE.currentView) {
    case 'dashboard':
        content += renderDashboard();
        break;
    case 'cases':
        content += renderCases();
        break;
    // ... other cases
}
```

**Add the Week Planner case** (add after `calendar` case):
```javascript
    case 'week-planner':
        content += renderWeekPlanner();
        break;
```

**Full switch should look like:**
```javascript
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
    case 'week-planner':          // NEW CASE
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
```

---

### Step 5: Include Script in HTML

**File:** `index.html`

**Find the Views/Pages section:**
```html
<!-- Views/Pages -->
<script src="js/views/dashboard.js"></script>
<script src="js/views/cases.js"></script>
<script src="js/views/caseDetail.js"></script>
<script src="js/views/documents.js"></script>
<script src="js/views/calendar.js"></script>
<script src="js/views/progress.js"></script>
<script src="js/views/trialPrep.js"></script>
```

**Add the Week Planner script** (add after calendar.js):
```html
<!-- Views/Pages -->
<script src="js/views/dashboard.js"></script>
<script src="js/views/cases.js"></script>
<script src="js/views/caseDetail.js"></script>
<script src="js/views/documents.js"></script>
<script src="js/views/calendar.js"></script>
<script src="js/views/weekPlanner.js"></script>  <!-- NEW LINE -->
<script src="js/views/progress.js"></script>
<script src="js/views/trialPrep.js"></script>
```

---

### Step 6: Initialize State Variables

**File:** `js/data.js`

**Find the STATE object** (at the bottom of the file):
```javascript
const STATE = {
    currentView: 'dashboard',
    selectedCase: null,
    calendarMonth: new Date('2025-10-01'),
    today: new Date('2025-10-11')
};
```

**Add Week Planner state:**
```javascript
const STATE = {
    currentView: 'dashboard',
    selectedCase: null,
    calendarMonth: new Date('2025-10-01'),
    today: new Date('2025-10-11'),
    weekSchedule: null,                    // NEW LINE
    schedulingRules: {                     // NEW BLOCK
        startTime: '09:00',
        endTime: '17:00',
        trialPrepBlockHours: 2
    }
};
```

---

## ✅ Testing Checklist

### Basic Functionality
- [ ] Navigate to Week Planner tab - page loads without errors
- [ ] Week shows Monday through Friday columns
- [ ] Today's column is highlighted in blue
- [ ] Week summary stats display correct numbers
- [ ] Court dates appear in correct days (red cards)
- [ ] Trial prep blocks are scheduled (orange cards)
- [ ] Document follow-ups are distributed (blue cards)

### Navigation & Controls
- [ ] Click left arrow - moves to previous week
- [ ] Click right arrow - moves to next week
- [ ] Week title updates correctly
- [ ] "Auto-Schedule" button regenerates schedule
- [ ] "Export" button shows alert (placeholder)

### Task Management
- [ ] Hover over task card - edit/delete buttons appear
- [ ] Click delete - task is removed
- [ ] Click edit - shows alert (placeholder for modal)
- [ ] Click "Add Task" button - shows alert (placeholder for modal)

### Unscheduled Tasks
- [ ] Unscheduled tasks section appears
- [ ] Shows count of unscheduled items
- [ ] "Auto-Schedule" button on each task works
- [ ] Overdue items are highlighted

### Scheduling Rules
- [ ] Change work start time - updates field
- [ ] Change work end time - updates field
- [ ] Change trial prep hours - updates field
- [ ] Modify any rule and click Auto-Schedule - schedule regenerates

### Data Accuracy
- [ ] Court dates match data.js court dates
- [ ] Trial prep only for cases with status "Trial Prep"
- [ ] Document follow-ups only for urgent items (due within 7 days)
- [ ] Stats accurately count items
- [ ] Available hours calculation is correct

---

## 🐛 Common Issues & Solutions

### Issue 1: "renderWeekPlanner is not defined"
**Cause:** Script not loaded or loaded in wrong order
**Solution:** 
- Check `index.html` includes `<script src="js/views/weekPlanner.js"></script>`
- Ensure it's loaded BEFORE `router.js` and `app.js`

### Issue 2: Icons not showing (boxes with X)
**Cause:** Lucide icons not initialized or wrong icon name
**Solution:**
- Check browser console for Lucide errors
- Verify icon names match Lucide documentation
- Ensure `lucide.createIcons()` is called in app.js

### Issue 3: Week shows wrong dates
**Cause:** Date calculation issue
**Solution:**
- Check `STATE.today` is set correctly in data.js
- Verify `getMonday()` function returns correct Monday
- Test with different date values

### Issue 4: Auto-schedule doesn't do anything
**Cause:** `generateWeekSchedule()` not returning schedule
**Solution:**
- Check browser console for errors
- Verify DATA.cases, DATA.courtDates, etc. are populated
- Add `console.log(STATE.weekSchedule)` to debug

### Issue 5: Styling looks wrong
**Cause:** Tailwind classes not loading
**Solution:**
- Check `<script src="https://cdn.tailwindcss.com"></script>` in index.html
- Verify custom styles in `<style>` tag include `.border-l-3`
- Clear browser cache and refresh

### Issue 6: Tasks not showing on correct days
**Cause:** Date matching logic error
**Solution:**
- Verify court dates in data.js use format 'YYYY-MM-DD'
- Check `isSameDay()` function works correctly
- Test date parsing with various dates

---

## 🎨 Customization Options

### Add New Task Types
In `renderScheduleItem()`, add new color schemes:
```javascript
const color = item.type === 'court' ? 'bg-red-100 border-red-400 text-red-900' :
              item.type === 'trial-prep' ? 'bg-orange-100 border-orange-400 text-orange-900' :
              item.type === 'document' ? 'bg-blue-100 border-blue-400 text-blue-900' :
              item.type === 'meeting' ? 'bg-purple-100 border-purple-400 text-purple-900' :  // NEW
              'bg-green-100 border-green-400 text-green-900';
```

### Adjust Auto-Scheduling Priority
In `generateWeekSchedule()`, reorder the sections:
```javascript
// 1. Court dates (highest priority - fixed)
// 2. Important meetings
// 3. Trial prep blocks
// 4. Document follow-ups
// 5. General tasks
```

### Change Default Work Hours
In `js/data.js`, modify STATE:
```javascript
schedulingRules: {
    startTime: '08:00',      // Earlier start
    endTime: '18:00',        // Later end
    trialPrepBlockHours: 3   // More trial prep time
}
```

### Add Weekend Days
Modify `renderWeekPlanner()` to generate 7 days instead of 5:
```javascript
// Change from:
for (let i = 0; i < 5; i++) {
// To:
for (let i = 0; i < 7; i++) {
```

---

## 📊 Advanced Features (Future Enhancements)

### Phase 2 Ideas:
1. **Drag & Drop Tasks** - Move tasks between days visually
2. **Task Templates** - Save common task patterns
3. **Time Blocking** - Visual timeline view (hourly)
4. **Conflict Detection** - Warn about scheduling conflicts
5. **Team View** - See multiple people's schedules
6. **Recurring Tasks** - Auto-schedule weekly meetings
7. **AI Suggestions** - ML-based scheduling recommendations
8. **Mobile Optimization** - Touch-friendly controls
9. **Calendar Sync** - Import/export to Google Calendar, Outlook
10. **Notification System** - Reminders for upcoming tasks

### Implementation Priority:
- **High:** Drag & Drop, Task Templates, Conflict Detection
- **Medium:** Time Blocking, Team View, Recurring Tasks
- **Low:** AI Suggestions, Calendar Sync, Notifications

---

## 📝 Documentation Updates

### Update README.md
Add Week Planner to features list:
```markdown
- 📅 **Week Planner** - Intelligent weekly task scheduling with auto-generation
```

### Update DEPLOYMENT_GUIDE.md
Add to file list:
```
└── js/
    └── views/
        ├── weekPlanner.js
```

---

## 🚀 Deployment

### Local Testing
1. Complete all implementation steps
2. Open `index.html` in browser
3. Navigate to Week Planner tab
4. Run through testing checklist

### GitHub Deployment
```bash
git add js/views/weekPlanner.js
git add js/components/navigation.js
git add js/app.js
git add js/data.js
git add index.html
git commit -m "feat: Add Week Planner view with auto-scheduling"
git push origin main
```

Wait 2-3 minutes for GitHub Pages to rebuild, then test live site.

---

## ✨ Success Criteria

Sprint 5 is complete when:
- ✅ Week Planner tab is accessible from navigation
- ✅ Week view displays Monday-Friday with proper dates
- ✅ Auto-scheduling generates sensible schedule
- ✅ All stats display correct values
- ✅ Tasks can be deleted manually
- ✅ Scheduling rules can be modified
- ✅ Week navigation works (prev/next)
- ✅ No console errors
- ✅ Mobile responsive layout works
- ✅ Code is committed and deployed

---

## 💡 Tips for Success

1. **Work incrementally** - Test after each step
2. **Use browser DevTools** - Check console for errors
3. **Verify data flow** - Add `console.log()` statements to debug
4. **Test edge cases** - Empty schedules, full schedules, conflicts
5. **Check mobile** - Use DevTools responsive mode
6. **Review before commit** - Ensure all files are included

---

## 📞 Need Help?

If you encounter issues:
1. Check the Common Issues section above
2. Review browser console for error messages
3. Verify all files are in correct locations
4. Ensure all code is copied exactly from artifacts
5. Test in incognito mode (rules out cache issues)

**Good luck with Sprint 5! 🎉**