# Lighthouse Project
### Legal Case Management System

A web-based application for managing criminal cases, documents, court dates, and trial preparation.

## 🌐 Live Demo
GitHub Pages URL: https://rramkhel.github.io/lighthouse/

## Features

- 📊 **Dashboard** - Overview of all cases with urgent items highlighted
- 📁 **Cases** - Full case list and detailed case views
- 📄 **Documents** - Track document requests and their status
- 📅 **Calendar** - Visual calendar of all court dates
- 📈 **Progress & Dependencies** - Track case progression through the justice system
- ⚖️ **Trial Prep** - Generate trial preparation documents

## File Structure

```
legal-case-tracker/
├── index.html                          # Entry point
├── README.md                           # This file
├── js/
│   ├── data.js                        # Data layer (simulates Excel)
│   ├── utils.js                       # Utility functions
│   ├── router.js                      # Hash-based routing
│   ├── app.js                         # Main app & initialization
│   ├── components/
│   │   ├── header.js                  # Header component
│   │   ├── navigation.js              # Navigation tabs
│   │   ├── statCard.js                # Stat card component
│   │   ├── documentCard.js            # Document card component
│   │   └── courtEventCard.js          # Court event card component
│   └── views/
│       ├── dashboard.js               # Dashboard view ✓
│       ├── cases.js                   # Cases list view (TODO)
│       ├── caseDetail.js              # Case detail view (TODO)
│       ├── documents.js               # Documents view (TODO)
│       ├── calendar.js                # Calendar view (TODO)
│       ├── progress.js                # Progress view (TODO)
│       └── trialPrep.js               # Trial prep view (TODO)
```

## Setup Instructions

### Local Development

1. Download all files maintaining the folder structure
2. Open `index.html` in a web browser
3. That's it! No build step required.

### GitHub Pages Deployment

1. Create a new GitHub repository
2. Upload all files (keep the folder structure intact)
3. Go to repository Settings → Pages
4. Select your branch (usually `main`)
5. Click Save
6. Your site will be live at `https://yourusername.github.io/repo-name/`

## Usage

### Navigation

The app uses hash-based routing:
- `#/dashboard` - Main dashboard
- `#/cases` - All cases
- `#/case/1` - Specific case detail
- `#/documents` - Documents tracker
- `#/calendar` - Court calendar
- `#/progress` - Progress & dependencies
- `#/trial-prep` - Trial preparation

### Adding a New View

1. Create new file in `js/views/` (e.g., `myNewView.js`)
2. Define render function:
```javascript
function renderMyNewView() {
    return `<div>My content here</div>`;
}
```
3. Add route in `js/app.js`:
```javascript
Router.add('/my-new-view', () => {
    STATE.currentView = 'my-new-view';
    render();
});
```
4. Add navigation item in `js/components/navigation.js`
5. Add case in `js/app.js` render switch statement

## TODO - Remaining Views

You need to create these view files (I've created Dashboard as a template):

### js/views/cases.js
- Table of all cases
- Clickable rows that navigate to case detail

### js/views/caseDetail.js
- Full case information
- Related documents
- Related court dates
- Back button to cases

### js/views/documents.js
- Table of all document requests
- Filterable by status, priority

### js/views/calendar.js
- Month view calendar grid
- Events color-coded by case
- List of events below calendar

### js/views/progress.js
- Case progress with milestones
- Dependency visualization
- Blocker indicators

### js/views/trialPrep.js
- Case selection
- Trial prep document generation
- Print/export functionality

## Modifying Data

Edit `js/data.js` to change the dummy data or connect to real data sources (Excel files via FileReader API or backend API).

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## License

MIT

## Questions?

This is a prototype/MVP. Extend and modify as needed!
