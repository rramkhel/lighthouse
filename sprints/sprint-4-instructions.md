# Sprint 4: Global Search

## 🎯 Sprint Goal
Add a global search feature in the header that searches across cases, documents, and court dates, with real-time dropdown results.

## 📋 Prerequisites
- Sprint 1-3 completed
- Header component exists at `js/components/header.js`
- Navigation working properly

---

## Task 4.1: Add Search State Management

**File:** `js/data.js`

### Step 1: Add search state to STATE object
Find the `STATE` object and add these properties:

```javascript
const STATE = {
    currentView: 'dashboard',
    selectedCase: null,
    calendarMonth: new Date('2025-10-01'),
    today: new Date('2025-10-11'),
    userName: 'Conner',
    expandedCard: null,
    recentChanges: [ /* existing data */ ],
    // Search state
    searchQuery: '',
    searchResults: null,
    searchVisible: false
};
```

### ✅ Checkpoint 1
No visible change yet. State is ready.

---

## Task 4.2: Create Search Utility Functions

**File:** `js/utils.js`

### Step 1: Add search functions at the END of the file

```javascript
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
    render();
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
```

### ✅ Checkpoint 2
Functions are ready. No visible change yet.

---

## Task 4.3: Create Search Results Component

**File:** Create new file `js/components/searchResults.js`

### Step 1: Create the file
Create a NEW file at `js/components/searchResults.js` with this content:

```javascript
// Search Results Dropdown Component

function renderSearchResults() {
    if (!STATE.searchVisible || !STATE.searchResults) {
        return '';
    }
    
    const { cases, documents, courtDates, totalResults } = STATE.searchResults;
    
    if (totalResults === 0) {
        return `
            <div class="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 slide-down">
                <div class="p-4 text-center text-gray-500 text-sm">
                    No results found for "${STATE.searchQuery}"
                </div>
            </div>
        `;
    }
    
    return `
        <div class="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto slide-down">
            <div class="sticky top-0 bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                <span class="text-xs font-semibold text-gray-700 uppercase">
                    ${totalResults} Result${totalResults === 1 ? '' : 's'}
                </span>
                <button onclick="clearSearch()" class="text-gray-400 hover:text-gray-600">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
            
            ${cases.length > 0 ? `
                <div>
                    <div class="px-4 py-2 bg-blue-50 border-b border-blue-100">
                        <p class="text-xs font-semibold text-blue-900 uppercase flex items-center gap-2">
                            <i data-lucide="briefcase" class="w-3 h-3"></i>
                            Cases (${cases.length})
                        </p>
                    </div>
                    ${cases.map(c => `
                        <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                             onclick="navigateToSearchResult('case', ${c.id})">
                            <p class="font-medium text-sm text-gray-900">${c.name}</p>
                            <p class="text-xs text-gray-600 mt-0.5">${c.accused} • ${c.charges}</p>
                            <div class="flex gap-2 mt-1">
                                <span class="text-xs px-2 py-0.5 rounded ${c.priority === 'High' ? 'bg-red-100 text-red-700' : c.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}">
                                    ${c.priority}
                                </span>
                                <span class="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                                    ${c.status}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${documents.length > 0 ? `
                <div>
                    <div class="px-4 py-2 bg-green-50 border-b border-green-100">
                        <p class="text-xs font-semibold text-green-900 uppercase flex items-center gap-2">
                            <i data-lucide="file-text" class="w-3 h-3"></i>
                            Documents (${documents.length})
                        </p>
                    </div>
                    ${documents.map(d => `
                        <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                             onclick="navigateToSearchResult('document', ${d.id})">
                            <p class="font-medium text-sm text-gray-900">${d.recipient}</p>
                            <p class="text-xs text-gray-600 mt-0.5">${d.caseName} • ${d.type}</p>
                            <span class="inline-block text-xs px-2 py-0.5 rounded mt-1 ${getStatusColor(d.status)}">
                                ${d.status}
                            </span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${courtDates.length > 0 ? `
                <div>
                    <div class="px-4 py-2 bg-purple-50 border-b border-purple-100">
                        <p class="text-xs font-semibold text-purple-900 uppercase flex items-center gap-2">
                            <i data-lucide="calendar" class="w-3 h-3"></i>
                            Court Dates (${courtDates.length})
                        </p>
                    </div>
                    ${courtDates.map(e => `
                        <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                             onclick="navigateToSearchResult('court', ${e.id})">
                            <p class="font-medium text-sm text-gray-900">${e.type}</p>
                            <p class="text-xs text-gray-600 mt-0.5">${e.caseName}</p>
                            <p class="text-xs text-gray-500 mt-1">
                                ${formatDate(e.date)} at ${e.time} • ${e.location}
                            </p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
}
```

### ✅ Checkpoint 3
Component created. Ready to be used.

---

## Task 4.4: Update Header Component

**File:** `js/components/header.js`

### Step 1: Replace entire file contents
Replace the ENTIRE contents of `js/components/header.js` with this:

```javascript
// Header Component with Search

function renderHeader() {
    return `
        <header class="bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg">
            <div class="max-w-[1800px] mx-auto px-8 py-5">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <i data-lucide="briefcase" class="w-7 h-7"></i>
                        <h1 class="text-xl font-semibold">Legal Case Management</h1>
                    </div>
                    
                    <!-- Search Bar -->
                    <div class="flex items-center gap-6">
                        <div class="relative">
                            <div class="relative">
                                <input 
                                    type="text" 
                                    id="globalSearch"
                                    placeholder="Search cases, documents..."
                                    value="${STATE.searchQuery}"
                                    class="pl-10 pr-10 py-2 w-80 border-2 border-slate-600 bg-slate-700 text-white placeholder-slate-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                    oninput="handleSearchInput(this.value)"
                                    onkeydown="if(event.key === 'Escape') clearSearch()"
                                />
                                <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                ${STATE.searchQuery ? `
                                    <button onclick="clearSearch()" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                                        <i data-lucide="x" class="w-4 h-4"></i>
                                    </button>
                                ` : ''}
                            </div>
                            
                            <!-- Search Results Dropdown -->
                            ${renderSearchResults()}
                        </div>
                        
                        <div class="text-sm text-slate-300">Saturday, October 11, 2025</div>
                    </div>
                </div>
            </div>
        </header>
    `;
}
```

### ✅ Checkpoint 4
Search bar should now appear in header. Test it:
1. Type in search bar
2. Results should appear after 2+ characters
3. X button appears when typing
4. ESC key clears search

---

## Task 4.5: Add Search Script to index.html

**File:** `index.html`

### Step 1: Add script tag
Find the components section and add this line:

```html
    <script src="js/components/searchResults.js"></script>
```

The full section should look like:
```html
    <!-- Components -->
    <script src="js/components/header.js"></script>
    <script src="js/components/navigation.js"></script>
    <script src="js/components/statCard.js"></script>
    <script src="js/components/documentCard.js"></script>
    <script src="js/components/courtEventCard.js"></script>
    <script src="js/components/recentChanges.js"></script>
    <script src="js/components/searchResults.js"></script>
```

### ✅ Checkpoint 5
Test full search functionality:
1. Type "Thompson" - should show case, documents, court dates
2. Type "medical" - should show document
3. Click result - should navigate to case
4. Type less than 2 characters - dropdown should hide
5. Click X or press ESC - should clear search

---

## Task 4.6: Add Click-Outside Handler

**File:** `js/app.js`

### Step 1: Add event listener for clicking outside
Add this at the END of the file, after the DOMContentLoaded event:

```javascript
// Close search results when clicking outside
document.addEventListener('click', (e) => {
    const searchInput = document.getElementById('globalSearch');
    if (searchInput && STATE.searchVisible) {
        // Check if click is outside search area
        if (!e.target.closest('#globalSearch') && !e.target.closest('.absolute.top-full')) {
            clearSearch();
        }
    }
});
```

### ✅ Checkpoint 6
Click anywhere outside search dropdown - it should close.

---

## 🧪 Final Testing for Sprint 4

### Test Search Functionality:
1. **Basic search:**
   - Type "thompson" - should find case, documents, court dates
   - Type "chen" - should find case and related items
   - Type "medical" - should find document
   - Type "bail" - should find court event

2. **Search UI:**
   - Search bar visible in header
   - Placeholder text shows
   - Results appear after 2+ characters
   - Results grouped by type (Cases, Documents, Court Dates)
   - Result count shown at top
   - X button appears when typing

3. **Interactions:**
   - Click case result - navigates to case detail
   - Click document result - navigates to related case
   - Click court date result - navigates to related case
   - Click X button - clears search
   - Press ESC key - clears search
   - Click outside dropdown - closes search

4. **Edge cases:**
   - Type 1 character - no results shown
   - Type nonsense - shows "No results found"
   - Clear search - dropdown disappears
   - Search then navigate - search clears

5. **Responsive:**
   - Search bar fits properly on smaller screens
   - Dropdown positioned correctly

## 📝 Commit Message
```
feat: Add global search with dropdown results

- Add search bar to header
- Search across cases, documents, and court dates
- Real-time results dropdown with grouping
- Click to navigate to relevant case
- Keyboard support (ESC to clear)
- Click outside to close
- Show result counts and categories
```

---

## 🚫 Common Issues & Fixes

**Issue:** "handleSearchInput is not defined"
**Fix:** Check that function exists in `js/utils.js` and file is loaded

**Issue:** Search results don't show
**Fix:** Verify `renderSearchResults()` is called in header, and searchResults.js is loaded

**Issue:** Clicking result doesn't navigate
**Fix:** Check that `navigateToSearchResult()` function exists in utils.js

**Issue:** Dropdown doesn't close
**Fix:** Verify click-outside handler is in app.js

**Issue:** Icons don't show
**Fix:** Call `lucide.createIcons()` after render

**Issue:** Search input loses focus
**Fix:** This is expected behavior when STATE updates. User can click back into input.

---

## ✅ Sprint 4 Complete!
Users can now quickly search and navigate to any case, document, or court date from anywhere in the app.

**All 4 sprints complete!** 🎉 The dashboard now has:
- ✅ Personalized greeting & summary
- ✅ Expandable stat cards
- ✅ Recent changes tracker
- ✅ Global search

Time to test the complete application end-to-end!

