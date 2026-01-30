// Bell Tower Data Layer - Case Scheduling System

const DATA = {
    // Court days available for scheduling
    courtDays: [
        { id: 1, date: '2025-02-03', courtroom: 'A', capacity: 8, type: 'Criminal', judge: 'Hon. Patricia Williams' },
        { id: 2, date: '2025-02-04', courtroom: 'B', capacity: 6, type: 'Criminal', judge: 'Hon. Robert Chen' },
        { id: 3, date: '2025-02-05', courtroom: 'A', capacity: 8, type: 'Criminal', judge: 'Hon. Patricia Williams' },
        { id: 4, date: '2025-02-06', courtroom: 'C', capacity: 10, type: 'Traffic', judge: 'Hon. Maria Santos' },
        { id: 5, date: '2025-02-07', courtroom: 'A', capacity: 8, type: 'Criminal', judge: 'Hon. Patricia Williams' },
        { id: 6, date: '2025-02-10', courtroom: 'B', capacity: 6, type: 'Criminal', judge: 'Hon. Robert Chen' },
        { id: 7, date: '2025-02-11', courtroom: 'A', capacity: 8, type: 'Criminal', judge: 'Hon. Patricia Williams' },
        { id: 8, date: '2025-02-12', courtroom: 'C', capacity: 10, type: 'Traffic', judge: 'Hon. Maria Santos' },
        { id: 9, date: '2025-02-13', courtroom: 'B', capacity: 6, type: 'Criminal', judge: 'Hon. Robert Chen' },
        { id: 10, date: '2025-02-14', courtroom: 'A', capacity: 8, type: 'Criminal', judge: 'Hon. Patricia Williams' }
    ],

    // Case assignments to court days
    caseAssignments: [
        { id: 1, caseId: 1, courtDayId: 1, timeSlot: '9:00 AM', status: 'Confirmed' },
        { id: 2, caseId: 2, courtDayId: 1, timeSlot: '10:30 AM', status: 'Confirmed' },
        { id: 3, caseId: 3, courtDayId: 2, timeSlot: '9:00 AM', status: 'Tentative' },
        { id: 4, caseId: 5, courtDayId: 3, timeSlot: '9:00 AM', status: 'Confirmed' },
        { id: 5, caseId: 6, courtDayId: 3, timeSlot: '11:00 AM', status: 'Confirmed' }
    ],

    // Cases available for scheduling
    cases: [
        { id: 1, caseNumber: '2025-CR-001', name: 'State v. Martinez', priority: 'High', estimatedDuration: 2, type: 'Criminal', status: 'Ready for Trial', chargeType: 'Felony' },
        { id: 2, caseNumber: '2025-CR-002', name: 'State v. Johnson', priority: 'Medium', estimatedDuration: 1, type: 'Criminal', status: 'Ready for Trial', chargeType: 'Misdemeanor' },
        { id: 3, caseNumber: '2025-CR-003', name: 'State v. Williams', priority: 'High', estimatedDuration: 3, type: 'Criminal', status: 'Pending Discovery', chargeType: 'Felony' },
        { id: 4, caseNumber: '2025-CR-004', name: 'State v. Brown', priority: 'Low', estimatedDuration: 1, type: 'Criminal', status: 'Ready for Trial', chargeType: 'Misdemeanor' },
        { id: 5, caseNumber: '2025-CR-005', name: 'State v. Davis', priority: 'High', estimatedDuration: 2, type: 'Criminal', status: 'Ready for Trial', chargeType: 'Felony' },
        { id: 6, caseNumber: '2025-CR-006', name: 'State v. Garcia', priority: 'Medium', estimatedDuration: 1.5, type: 'Criminal', status: 'Ready for Trial', chargeType: 'Misdemeanor' },
        { id: 7, caseNumber: '2025-TR-001', name: 'State v. Thompson', priority: 'Low', estimatedDuration: 0.5, type: 'Traffic', status: 'Ready for Trial', chargeType: 'Infraction' },
        { id: 8, caseNumber: '2025-TR-002', name: 'State v. Anderson', priority: 'Low', estimatedDuration: 0.5, type: 'Traffic', status: 'Ready for Trial', chargeType: 'Infraction' },
        { id: 9, caseNumber: '2025-CR-007', name: 'State v. Taylor', priority: 'Medium', estimatedDuration: 2, type: 'Criminal', status: 'Pending Motions', chargeType: 'Felony' },
        { id: 10, caseNumber: '2025-CR-008', name: 'State v. Moore', priority: 'High', estimatedDuration: 4, type: 'Criminal', status: 'Ready for Trial', chargeType: 'Felony' }
    ],

    // Time slots available for scheduling
    timeSlots: [
        '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
    ],

    // Bail hearing schedule organized by date > city > cases
    bailHearings: [
        {
            date: '2026-05-14',
            cities: [
                {
                    name: 'Edmonton',
                    cases: [
                        {
                            id: 1,
                            styleOfCause: 'R. v. Smith',
                            presentDate: '2025-03-24',
                            previousReleases: 'Previously released on: 2025-08-24; Keep Peace + Be of good behavior, Curfew 7PM à 7AM.',
                            facts: '---',
                            criminalRecord: '2 prior convictions - theft under $5000 (2019), breach of probation (2021)',
                            additionalCharges: {
                                infoNumber: '24-12345',
                                charges: 'Assault causing bodily harm',
                                bailStatus: 'Released with conditions'
                            },
                            crownPosition: {
                                grounds: 'Opposed to bail on Secondary + Tertiary Grounds',
                                reasoning: 'Flight risk due to prior FTA; public safety concerns'
                            },
                            bailResult: 'Bail Denied - secondary grounds',
                            presidingJustice: 'Justice Ambrose'
                        },
                        {
                            id: 2,
                            styleOfCause: 'R. v. Wade',
                            presentDate: '2026-05-14',
                            previousReleases: 'No prior releases',
                            facts: 'Accused allegedly committed break and enter on Jan 15, 2026.',
                            criminalRecord: 'No prior record',
                            additionalCharges: null,
                            crownPosition: {
                                grounds: 'Opposed on Secondary Grounds',
                                reasoning: 'Substantial likelihood of reoffending'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---'
                        }
                    ]
                },
                {
                    name: 'Calgary',
                    cases: [
                        {
                            id: 3,
                            styleOfCause: 'R. v. Scooby',
                            presentDate: '2026-05-14',
                            previousReleases: 'Released 2026-01-10; No contact with co-accused',
                            facts: 'Accused charged with mischief and theft.',
                            criminalRecord: 'No prior record',
                            additionalCharges: null,
                            crownPosition: {
                                grounds: 'Consent release',
                                reasoning: 'Low risk, community ties'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---'
                        },
                        {
                            id: 4,
                            styleOfCause: 'R. v. Velma',
                            presentDate: '2026-05-14',
                            previousReleases: 'No prior releases',
                            facts: 'Fraud charges involving multiple victims.',
                            criminalRecord: '1 prior - fraud under $5000 (2023)',
                            additionalCharges: {
                                infoNumber: '25-98765',
                                charges: 'Uttering forged documents',
                                bailStatus: 'Detained'
                            },
                            crownPosition: {
                                grounds: 'Opposed on Secondary + Tertiary Grounds',
                                reasoning: 'Pattern of fraudulent behavior'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---'
                        }
                    ]
                }
            ]
        },
        {
            date: '2026-05-18',
            cities: [
                {
                    name: 'Edmonton',
                    cases: [
                        {
                            id: 5,
                            styleOfCause: 'R. v. Fred',
                            presentDate: '2026-05-18',
                            previousReleases: 'No prior releases',
                            facts: 'DUI causing bodily harm.',
                            criminalRecord: 'No prior record',
                            additionalCharges: null,
                            crownPosition: {
                                grounds: 'Consent release with conditions',
                                reasoning: 'First offense, stable employment'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---'
                        },
                        {
                            id: 6,
                            styleOfCause: 'R. v. Daphne',
                            presentDate: '2026-05-18',
                            previousReleases: 'Released 2026-02-01; House arrest',
                            facts: 'Aggravated assault.',
                            criminalRecord: '3 priors - assault (2020, 2022), weapons (2023)',
                            additionalCharges: {
                                infoNumber: '26-11111',
                                charges: 'Weapons possession',
                                bailStatus: 'Detained'
                            },
                            crownPosition: {
                                grounds: 'Opposed on all grounds',
                                reasoning: 'Escalating violence; multiple breaches'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---'
                        }
                    ]
                },
                {
                    name: 'Red Deer',
                    cases: [
                        {
                            id: 7,
                            styleOfCause: 'R. v. Shaggy',
                            presentDate: '2026-05-18',
                            previousReleases: 'No prior releases',
                            facts: 'Possession for purpose of trafficking.',
                            criminalRecord: 'No prior record',
                            additionalCharges: null,
                            crownPosition: {
                                grounds: 'Reverse onus - opposed',
                                reasoning: 'Schedule I substance; quantity indicates trafficking'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---'
                        },
                        {
                            id: 8,
                            styleOfCause: 'R. v. M. Machine',
                            presentDate: '2026-05-18',
                            previousReleases: 'Released 2025-12-01; Surety supervision',
                            facts: 'Robbery with weapon.',
                            criminalRecord: '2 priors - robbery (2021), breach (2024)',
                            additionalCharges: null,
                            crownPosition: {
                                grounds: 'Opposed on Secondary + Tertiary Grounds',
                                reasoning: 'Violence with weapon; breach while on release'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---'
                        }
                    ]
                }
            ]
        }
    ]
};

// Application State
const STATE = {
    currentView: 'dashboard',
    sidebarOpen: true,
    selectedCourtDay: null,
    selectedCase: null,
    filterType: 'all',
    filterPriority: 'all',
    searchQuery: ''
};
