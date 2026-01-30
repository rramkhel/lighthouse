# Bell Tower - Case Scheduling System

A web-based system for assigning legal cases to the right court days.

## Features

- **Dashboard**: Overview of upcoming court days, pending assignments, and workload summary
- **Schedule View**: Calendar view of court days with capacity indicators
- **Assignment View**: Interface to assign cases to specific court days with conflict detection

## Getting Started

Open `index.html` in a modern web browser. No build step required.

## Tech Stack

- Vanilla JavaScript
- Tailwind CSS (CDN)
- Lucide Icons (CDN)
- Hash-based routing

## Project Structure

```
bell-tower/
├── index.html              # Main entry point
├── README.md               # This file
└── js/
    ├── data.js             # Data layer and state
    ├── utils.js            # Utility functions
    ├── router.js           # Hash-based router
    ├── app.js              # Main app initialization
    ├── components/
    │   ├── header.js       # Header component
    │   └── navigation.js   # Sidebar navigation
    └── views/
        ├── dashboard.js    # Dashboard view
        ├── schedule.js     # Schedule/calendar view
        └── assign.js       # Case assignment view
```

## Routes

- `/#/dashboard` - Main dashboard (default)
- `/#/schedule` - Court schedule calendar
- `/#/assign` - Case assignment interface

## Related

- [Lighthouse](../lighthouse/) - Case Management System
