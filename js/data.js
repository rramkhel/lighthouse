// Legal Case Management System - Data Layer
// This simulates what would come from Excel files

const DATA = {
    cases: [
        { id: 1, name: "R v. Thompson", accused: "Michael Thompson", dob: "1985-03-15", priority: "High", status: "Trial Prep", nextCourtDate: "2025-10-20", trialDate: "2025-11-15", charges: "Assault, Breach of Probation", offenceDate: "2025-06-12", location: "Edmonton", investigator: "Cst. James Wilson", detachment: "Downtown", criminalRecord: "Yes - 2 prior assaults" },
        { id: 2, name: "R v. Chen", accused: "Lisa Chen", dob: "1992-07-22", priority: "High", status: "Active", nextCourtDate: "2025-10-15", trialDate: null, charges: "Theft Over $5000", offenceDate: "2025-08-03", location: "Edmonton", investigator: "Det. Sarah Martinez", detachment: "West", criminalRecord: "No" },
        { id: 3, name: "R v. Martinez", accused: "Carlos Martinez", dob: "1978-11-30", priority: "Medium", status: "Active", nextCourtDate: "2025-10-25", trialDate: "2025-12-01", charges: "Possession of Controlled Substance", offenceDate: "2025-07-18", location: "St. Albert", investigator: "Cst. Rebecca Tran", detachment: "St. Albert", criminalRecord: "Yes - drug possession 2020" },
        { id: 4, name: "R v. O'Brien", accused: "Patrick O'Brien", dob: "1995-02-14", priority: "Low", status: "Discovery", nextCourtDate: "2025-11-05", trialDate: null, charges: "Mischief Under $5000", offenceDate: "2025-09-01", location: "Edmonton", investigator: "Cst. David Kim", detachment: "Northeast", criminalRecord: "No" },
        { id: 5, name: "R v. Patel", accused: "Amir Patel", dob: "1988-05-09", priority: "High", status: "Trial Prep", nextCourtDate: "2025-10-18", trialDate: "2025-10-30", charges: "Fraud Over $5000, Forgery", offenceDate: "2025-05-20", location: "Edmonton", investigator: "Det. Michael O'Connor", detachment: "Financial Crimes", criminalRecord: "Yes - fraud 2018" },
        { id: 6, name: "R v. Williams", accused: "Sarah Williams", dob: "1990-12-03", priority: "Medium", status: "Active", nextCourtDate: "2025-11-10", trialDate: null, charges: "Impaired Driving", offenceDate: "2025-09-15", location: "Sherwood Park", investigator: "Cst. Jennifer Park", detachment: "Traffic", criminalRecord: "No" }
    ],
    
    documentRequests: [
        { id: 1, caseId: 1, caseName: "R v. Thompson", recipient: "Dr. Sarah Mitchell", type: "Medical Records", status: "Overdue", responseDeadline: "2025-10-08", priority: "High" },
        { id: 2, caseId: 1, caseName: "R v. Thompson", recipient: "Officer James Liu", type: "Police Report", status: "Received", responseDeadline: "2025-10-05", priority: "High" },
        { id: 3, caseId: 2, caseName: "R v. Chen", recipient: "Best Buy Security", type: "Video Footage", status: "Pending Response", responseDeadline: "2025-10-14", priority: "High" },
        { id: 4, caseId: 2, caseName: "R v. Chen", recipient: "Wang Electronics", type: "Sales Records", status: "Served", responseDeadline: "2025-10-18", priority: "Medium" },
        { id: 5, caseId: 3, caseName: "R v. Martinez", recipient: "Dr. Tom Anderson", type: "Expert Report", status: "Pending Response", responseDeadline: "2025-10-20", priority: "Medium" },
        { id: 6, caseId: 5, caseName: "R v. Patel", recipient: "TD Bank", type: "Financial Records", status: "Overdue", responseDeadline: "2025-10-10", priority: "High" },
        { id: 7, caseId: 5, caseName: "R v. Patel", recipient: "Canada Post", type: "Delivery Records", status: "Pending Response", responseDeadline: "2025-10-16", priority: "High" },
        { id: 8, caseId: 6, caseName: "R v. Williams", recipient: "Alberta Health Services", type: "Blood Test Results", status: "Received", responseDeadline: "2025-10-01", priority: "Medium" },
        { id: 9, caseId: 1, caseName: "R v. Thompson", recipient: "Edmonton Police Service", type: "Body Cam Footage", status: "Pending Response", responseDeadline: "2025-10-22", priority: "High" },
        { id: 10, caseId: 3, caseName: "R v. Martinez", recipient: "Lab Corp", type: "Drug Analysis", status: "Received", responseDeadline: "2025-10-12", priority: "Medium" }
    ],
    
    courtDates: [
        { id: 1, caseId: 2, caseName: "R v. Chen", type: "Bail Hearing", date: "2025-10-15", time: "09:00", location: "Edmonton Provincial Court", room: "Courtroom 3" },
        { id: 2, caseId: 5, caseName: "R v. Patel", type: "Pre-Trial Conference", date: "2025-10-18", time: "14:00", location: "Edmonton Provincial Court", room: "Courtroom 1" },
        { id: 3, caseId: 1, caseName: "R v. Thompson", type: "Pre-Trial Conference", date: "2025-10-20", time: "10:30", location: "Edmonton Provincial Court", room: "Courtroom 2" },
        { id: 4, caseId: 3, caseName: "R v. Martinez", type: "Disclosure Review", date: "2025-10-25", time: "13:00", location: "Edmonton Provincial Court", room: "Courtroom 4" },
        { id: 5, caseId: 5, caseName: "R v. Patel", type: "Trial", date: "2025-10-30", time: "09:00", location: "Edmonton Provincial Court", room: "Courtroom 1" },
        { id: 6, caseId: 4, caseName: "R v. O'Brien", type: "First Appearance", date: "2025-11-05", time: "09:30", location: "Edmonton Provincial Court", room: "Courtroom 5" },
        { id: 7, caseId: 6, caseName: "R v. Williams", type: "Judicial Pre-Trial", date: "2025-11-10", time: "11:00", location: "Edmonton Provincial Court", room: "Courtroom 2" },
        { id: 8, caseId: 1, caseName: "R v. Thompson", type: "Trial", date: "2025-11-15", time: "09:00", location: "Edmonton Provincial Court", room: "Courtroom 1" },
        { id: 9, caseId: 3, caseName: "R v. Martinez", type: "Pre-Trial Conference", date: "2025-11-20", time: "10:00", location: "Edmonton Provincial Court", room: "Courtroom 3" },
        { id: 10, caseId: 2, caseName: "R v. Chen", type: "Preliminary Hearing", date: "2025-11-25", time: "09:00", location: "Edmonton Provincial Court", room: "Courtroom 4" },
        { id: 11, caseId: 6, caseName: "R v. Williams", type: "Trial", date: "2025-12-01", time: "09:00", location: "Edmonton Provincial Court", room: "Courtroom 2" },
        { id: 12, caseId: 3, caseName: "R v. Martinez", type: "Trial", date: "2025-12-01", time: "14:00", location: "Edmonton Provincial Court", room: "Courtroom 5" }
    ],
    
    victims: [
        { caseId: 1, name: "Jennifer Thompson", dob: "1987-08-20", relationship: "Spouse" },
        { caseId: 2, name: "Best Buy Canada", dob: "N/A", relationship: "Business" }
    ]
};

// State management
const STATE = {
    currentView: 'dashboard',
    selectedCase: null,
    calendarMonth: new Date('2025-10-01'),
    today: new Date('2025-10-11')
};