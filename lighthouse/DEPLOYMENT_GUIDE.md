# Deployment Guide - Legal Case Management System

## 📦 Complete File List

You need to create these files with the exact folder structure:

```
legal-case-tracker/
├── index.html
├── README.md
├── DEPLOYMENT_GUIDE.md (this file)
└── js/
    ├── data.js
    ├── utils.js
    ├── router.js
    ├── app.js
    ├── components/
    │   ├── header.js
    │   ├── navigation.js
    │   ├── statCard.js
    │   ├── documentCard.js
    │   └── courtEventCard.js
    └── views/
        ├── dashboard.js
        ├── cases.js
        ├── caseDetail.js
        ├── documents.js
        ├── calendar.js
        ├── progress.js
        └── trialPrep.js
```

## 🚀 Quick Start - Local Testing

1. **Create the folder structure** as shown above
2. **Copy each file** from the artifacts into the correct location
3. **Open `index.html`** in your web browser
4. That's it! No build step, no npm install, nothing else needed.

## 📤 GitHub Pages Deployment

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `legal-case-tracker` (or whatever you want)
3. Make it Public or Private
4. Don't initialize with README (we have our own)
5. Click "Create repository"

### Step 2: Upload Files

**Option A: GitHub Web Interface** (Easiest)
1. On your new repo page, click "uploading an existing file"
2. Drag and drop ALL folders and files
3. GitHub preserves the folder structure
4. Commit the files

**Option B: Git Command Line**
```bash
# In your project folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/legal-case-tracker.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down and click **Pages** (left sidebar)
4. Under "Source":
   - Select branch: **main**
   - Select folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes

### Step 4: Access Your Site

Your site will be available at:
```
https://YOUR-USERNAME.github.io/legal-case-tracker/
```

## 🔗 URLs and Routing

The app uses hash-based routing. All these URLs will work:

- `/#/dashboard` - Main dashboard (default)
- `/#/cases` - All cases list
- `/#/case/1` - Case detail for case ID 1
- `/#/documents` - Documents tracker
- `/#/calendar` - Calendar view
- `/#/progress` - Progress & dependencies
- `/#/trial-prep` - Trial preparation

You can share direct links to specific views!

## 🛠️ Customization

### Changing Data

Edit `js/data.js` to modify:
- Cases
- Document requests
- Court dates
- Victims

### Adding a New Tab/View

1. Create `js/views/myNewView.js`:
```javascript
function renderMyNewView() {
    return `<div>My content</div>`;
}
```

2. Add route in `js/app.js`:
```javascript
Router.add('/my-new-view', () => {
    STATE.currentView = 'my-new-view';
    render();
});
```

3. Add nav item in `js/components/navigation.js`:
```javascript
{ id: 'my-new-view', label: 'My View', icon: 'star' }
```

4. Add case in `js/app.js` render() switch:
```javascript
case 'my-new-view':
    content += renderMyNewView();
    break;
```

### Changing Colors

Colors are defined in `js/utils.js`:
- `getCaseColor()` - case color coding
- `getPriorityColor()` - priority colors
- `getStatusColor()` - document status colors

### Icons

Uses Lucide icons: https://lucide.dev/icons/

Available icons in code:
- briefcase, file-text, calendar, clock
- alert-circle, alert-triangle, check-circle
- chevron-left, chevron-right, download, printer
- And 1000+ more at the link above

## 🐛 Troubleshooting

### Site not loading after deployment
- Wait 2-3 minutes for GitHub Pages to build
- Check that `index.html` is in the root folder
- Check Settings → Pages shows the green success message

### JavaScript errors in console
- Make sure ALL files are uploaded
- Check that folder structure is correct (`js/components/` and `js/views/`)
- Verify file names match exactly (case-sensitive!)

### Icons not showing
- Check internet connection (Lucide loads from CDN)
- Check browser console for errors
- Make sure icon names match Lucide documentation

### Calendar not showing events
- Check that `STATE.calendarMonth` is set correctly
- Verify date format in data.js is `YYYY-MM-DD`
- Check browser console for date parsing errors

## 🔄 Updating the Site

After making changes:

1. **Test locally** - Open `index.html` in browser
2. **Upload to GitHub**:
   - Via web: drag and drop changed files
   - Via git: `git add .`, `git commit -m "message"`, `git push`
3. **Wait 1-2 minutes** for GitHub Pages to rebuild
4. **Hard refresh** your browser (Ctrl+Shift+R or Cmd+Shift+R)

## 📱 Mobile Support

The app is fully responsive and works on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Tablets
- Mobile phones

Test on different devices by resizing your browser or using DevTools (F12 → Device Toolbar).

## 🔐 Privacy & Security

### Important Notes:
- This is a **static site** - no server, no database
- All data is in `js/data.js` (dummy data currently)
- Anyone with the URL can access the site if it's public
- For real case data, consider:
  - Making repo private (GitHub Pages works with private repos on paid plans)
  - Password-protecting the site
  - Using a backend with authentication

### For Production Use:
1. Replace dummy data with real data loader
2. Add user authentication
3. Connect to real database (backend required)
4. Add data encryption
5. Implement audit logging

## 📞 Support

Questions? Issues?
1. Check browser console (F12) for errors
2. Review README.md for usage instructions
3. Check this deployment guide
4. Verify all files are uploaded correctly

## ✅ Deployment Checklist

Before going live:
- [ ] All files uploaded with correct structure
- [ ] Test locally in browser
- [ ] GitHub Pages enabled and showing green checkmark
- [ ] Test all navigation tabs
- [ ] Test on mobile device
- [ ] Review dummy data (replace with real data if needed)
- [ ] Share URL with team for feedback

---

**That's it! Your legal case management system is now live and ready to use!** 🎉