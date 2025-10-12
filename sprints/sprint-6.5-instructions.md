# Sprint 6.5: Summary Section Redesign

## Overview
Add back the "Your Day at a Glance" summary section to the dashboard with a clean, proper design that complements the Spektra-inspired UI.

## Context
During Sprint 6 (Clean UI Overhaul), the summary section was removed from the dashboard. User wants it back, but with a proper design that:
- Fits the clean, minimal aesthetic
- Is not overwhelming or cluttered
- Provides useful at-a-glance information
- Works well with the existing Quick Look cards

## Current State
- Dashboard has greeting (Good morning/afternoon/evening, Conner!)
- Motivational message below greeting
- Date displayed below that
- Quick Look section with 4 stat cards (Active Cases, Overdue Docs, Court 14d, High Priority)
- The `getDashboardSummary()` function exists and calculates all the summary data

## Requirements

### Design Approach Options to Consider:
1. **Inline with greeting** - Summary text to the right of the greeting in a 2-column layout
2. **Below greeting, above Quick Look** - Full width section between greeting and Quick Look cards
3. **Integrated into Quick Look** - Enhanced Quick Look cards with more detail
4. **Sidebar style** - Narrow column on the side

### Content to Include:
- Total active cases + high priority count
- Overdue documents count (if any)
- Upcoming court dates count (next 14 days)
- Next critical deadline

### Design Guidelines:
- Should use the clean Spektra aesthetic (minimal borders, subtle colors, good spacing)
- Text should be readable and scannable
- Icons for visual hierarchy (optional)
- Should NOT look like the old "boxed" design
- Should complement, not duplicate, the Quick Look cards
- Keep it concise - summary, not detailed list

## Data Available
The `getDashboardSummary()` function returns:
```javascript
{
    activeCases,
    highPriorityCases,
    highPriorityCasesList,
    overdueDocs,
    overdueDocsList,
    upcomingCourt,
    upcomingCourtList,
    newUpdates,
    updatesList,
    nextDeadline
}
```

## Files to Modify
- `js/views/dashboard.js` - Add the summary section back

## Success Criteria
- Summary section is back on the dashboard
- Fits the clean UI aesthetic
- Provides useful at-a-glance information
- User is happy with the design
- Doesn't feel cluttered or overwhelming

## Notes
- Previous attempts that didn't work:
  - White card with border (too "boxy")
  - Plain text to the right of greeting with lots of details (too cluttered)
  - Need to find the right balance between informative and minimal

## User Feedback
- "nice!" (for Sprint 6 overall)
- "what happened to the summary section?" (noticed it was missing)
- "yes please!" (when asked if they want it back)
- "no, that's awful" (for the detailed text version with case names)

---

**Next Steps:** Design and implement a clean summary section that provides the right amount of information in a visually appealing way.
