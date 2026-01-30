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
    // 26 pop culture cases across 14 hearing dates in Alberta cities
    bailHearings: [
        {
            date: '2026-01-15',
            cities: [
                {
                    name: 'Edmonton',
                    cases: [
                        {
                            id: 1,
                            styleOfCause: 'R. v. Rogers, S.',
                            presentDate: '2026-01-15',
                            previousReleases: 'No prior releases on this matter. Accused held in custody since arrest on 2025-12-20.',
                            facts: 'On 2025-12-18, the accused, operating under the alias "Captain America," did unlawfully assault one Anthony Stark at the Leipzig-Halle Airport parking structure. The accused struck Mr. Stark repeatedly with a vibranium shield, causing significant property damage to a Mark XLVI suit of armor valued at approximately $87 million CAD. The accused then fled the jurisdiction with co-accused James Barnes.',
                            criminalRecord: 'Assault causing bodily harm (1943) – Pardoned under the War Measures Act; Mischief over $5,000 (2014) – Withdrawn; Failure to comply with Sokovia Accords (2016) – Outstanding warrant (international)',
                            additionalCharges: {
                                infoNumber: '26-0891',
                                charges: 'Flight from peace officer (s. 320.17 CC); Aiding and abetting a fugitive (s. 21 CC)',
                                bailStatus: 'To be spoken to at this appearance'
                            },
                            crownPosition: {
                                grounds: 'Opposed on Primary and Secondary Grounds',
                                reasoning: 'Significant flight risk – accused has previously fled to Wakanda, a nation with no extradition treaty. Secondary concerns given the accused\'s enhanced physical abilities and demonstrated willingness to engage in vigilante justice. No amount of sureties can adequately supervise a super-soldier.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: []
                        }
                    ]
                },
                {
                    name: 'Calgary',
                    cases: [
                        {
                            id: 2,
                            styleOfCause: 'R. v. Rogers, F.',
                            presentDate: '2026-01-15',
                            previousReleases: 'Released 2025-10-05 by J.P. Henderson: Keep the peace; Reside with surety (Fiona) at Far Far Away Castle; No contact with the Fairy Godmother or any member of the Fairy Godmother\'s Cottage franchise; Surrender passport and magic mirror.',
                            facts: 'On 2025-09-28, the accused did commit break and enter at the residence of Lord Farquaad, 1 Duloc Castle Drive, with intent to commit the indictable offence of kidnapping. The accused forcibly removed Princess Fiona from the premises. Additionally, the accused is alleged to have uttered threats against Lord Farquaad, specifically stating he would "make a belt from his skin."',
                            criminalRecord: 'Mischief – interfering with property (2019) – Conditional discharge for gingerbread man incident; Assault (2020) – Peace bond, Merry Men altercation; Uttering threats (2021) – Suspended sentence',
                            additionalCharges: {
                                infoNumber: '25-7823',
                                charges: 'Kidnapping (s. 279 CC); Uttering threats to cause death (s. 264.1 CC)',
                                bailStatus: 'Released on recognizance with surety'
                            },
                            crownPosition: {
                                grounds: 'Consent release with strict conditions',
                                reasoning: 'Crown consents to continued release. While the charges are serious, the alleged victim (Princess Fiona) has indicated she does not wish to participate in the prosecution and has married the accused. The accused has strong community ties to his swamp.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: []
                        }
                    ]
                }
            ]
        },
        {
            date: '2026-01-22',
            cities: [
                {
                    name: 'Red Deer',
                    cases: [
                        {
                            id: 3,
                            styleOfCause: 'R. v. Solo, H.',
                            presentDate: '2026-01-22',
                            previousReleases: 'Released 2025-06-15 by Justice Feehan: $50,000 cash deposit; Residential surety (L. Organa, pledging $100,000); House arrest at Millennium Falcon (currently impounded at Red Deer RCMP compound); No possession of blasters or other prohibited weapons; No contact with any member of the Hutt crime family.',
                            facts: 'On 2025-05-04, the accused did unlawfully discharge a blaster pistol at the Mos Eisley Cantina, 742 Tatooine Boulevard, Red Deer, striking one Greedo (deceased). The accused claims self-defence; however, multiple witnesses confirm the accused fired first without provocation. The deceased was reportedly attempting to collect a lawful debt owed to J. the Hutt.',
                            criminalRecord: 'Smuggling – controlled substances (2018) – 18 months CSO, Kessel run incident; Failure to comply with recognizance (2019) – 30 days; Possession of prohibited weapon (2020) – $2,000 fine; Evading customs officers (2022) – Withdrawn',
                            additionalCharges: {
                                infoNumber: '25-4412',
                                charges: 'Careless use of firearm (s. 86 CC); Discharge firearm with intent (s. 244 CC)',
                                bailStatus: 'Detained – reverse onus s. 515(6)(a)'
                            },
                            crownPosition: {
                                grounds: 'Opposed on all grounds – Reverse onus position',
                                reasoning: 'Accused bears onus pursuant to s. 515(6)(a) – alleged offence involved use of a firearm. Primary: Extreme flight risk – accused owns a spacecraft capable of faster-than-light travel and has expressed intent to make the "Kessel Run" to avoid prosecution. Secondary: Pattern of weapons offences and association with known criminal organization (Rebel Alliance). Tertiary: Community confidence would be shaken by release of an individual who shot an unarmed debt collector.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: [
                                { fromDate: '2025-08-15', fromCity: 'Edmonton', toDate: '2025-09-20', toCity: 'Calgary', movedAt: '2025-08-10T09:00:00' },
                                { fromDate: '2025-09-20', fromCity: 'Calgary', toDate: '2025-10-30', toCity: 'Lethbridge', movedAt: '2025-09-15T14:30:00' },
                                { fromDate: '2025-10-30', fromCity: 'Lethbridge', toDate: '2025-12-05', toCity: 'Medicine Hat', movedAt: '2025-10-25T11:00:00' },
                                { fromDate: '2025-12-05', fromCity: 'Medicine Hat', toDate: '2026-01-22', toCity: 'Red Deer', movedAt: '2025-12-01T16:45:00' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            date: '2026-02-03',
            cities: [
                {
                    name: 'Edmonton',
                    cases: [
                        {
                            id: 4,
                            styleOfCause: 'R. v. Rogers, F. (a.k.a. "Shaggy")',
                            presentDate: '2026-02-03',
                            previousReleases: 'Released 2025-11-01 by J.P. Morrison: Keep the peace and be of good behaviour; Abstain from consumption of cannabis or any cannabis derivative; Reside at 1070 Mystery Lane, Edmonton; No contact with co-accused S. Doo; Attend substance abuse counselling.',
                            facts: 'On 2025-10-15, RCMP executed a CDSA warrant at the vehicle known as "The Mystery Machine" (Alberta plate ZOINKS1). Officers located approximately 2.3 kg of cannabis edibles disguised as "Scooby Snacks," 450g of psilocybin mushrooms, and drug paraphernalia. The accused was found in the rear of the vehicle in a state of severe intoxication, alongside co-accused S. Doo (a Great Dane, charges pending species determination).',
                            criminalRecord: 'Possession of cannabis – pre-legalization (2015) – Absolute discharge; Mischief under $5,000 (2017) – Conditional discharge, Creepy Old Man Jenkins incident; Impaired driving (2019) – $1,500 fine, 1-year driving prohibition',
                            additionalCharges: {
                                infoNumber: '25-9932',
                                charges: 'Possession for purpose of trafficking – psilocybin (CDSA); Operation of vehicle while impaired (s. 320.14 CC)',
                                bailStatus: 'Released on undertaking'
                            },
                            crownPosition: {
                                grounds: 'Opposed on Secondary Grounds',
                                reasoning: 'Substantial likelihood of reoffending given accused\'s long history of substance abuse and repeated failures to comply with abstinence conditions. The accused has shown an inability to stay away from his co-accused despite court orders. Pattern of using amateur detective work as cover for drug activities.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: []
                        },
                        {
                            id: 5,
                            styleOfCause: 'R. v. Jones, F.',
                            presentDate: '2026-02-03',
                            previousReleases: 'No prior releases – in continuous custody since arrest.',
                            facts: 'On 2025-10-15, the accused was arrested as part of the Mystery Machine investigation. The accused, who holds himself out as the leader of "Mystery Inc.," is alleged to have orchestrated a sophisticated fraud scheme wherein the group would stage elaborate "hauntings" at various Alberta businesses, then charge substantial fees to "solve" the mystery. Victims include the owner of the Old Mill, Creepy Castle Amusement Park, and the Malt Shop.',
                            criminalRecord: 'Fraud over $5,000 (2018) – Suspended sentence, related scheme in British Columbia; Personation with intent (2020) – 6 months probation, impersonated a museum curator; Trespassing at night (2021) – $500 fine',
                            additionalCharges: {
                                infoNumber: '25-9933',
                                charges: 'Fraud over $5,000 (s. 380 CC) x 7 counts; Conspiracy to commit fraud (s. 465 CC); Extortion (s. 346 CC)',
                                bailStatus: 'Detained'
                            },
                            crownPosition: {
                                grounds: 'Opposed on Secondary and Tertiary Grounds',
                                reasoning: 'The accused is the mastermind of a sophisticated criminal enterprise operating under the guise of paranormal investigation. Secondary: High likelihood of reoffending and interfering with witnesses – many of the "monsters" were actually the accuseds victims who may testify. Tertiary: Public confidence requires detention given the brazen nature of the scheme and the exploitation of community fears.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: [
                                { fromDate: '2025-11-20', fromCity: 'Calgary', toDate: '2026-02-03', toCity: 'Edmonton', movedAt: '2025-11-15T10:00:00' }
                            ]
                        }
                    ]
                },
                {
                    name: 'Calgary',
                    cases: [
                        {
                            id: 6,
                            styleOfCause: 'R. v. Dinkley, V.',
                            presentDate: '2026-02-03',
                            previousReleases: 'Released 2025-10-20 by Justice Campbell: Recognizance $5,000 no deposit; Reside with surety (parents) at 445 Brainiac Boulevard, Calgary; Surrender all lock-picking equipment and surveillance devices; No contact with co-accused; Continue employment at the Calgary Public Library.',
                            facts: 'The accused is charged as a co-conspirator in the Mystery Inc. fraud scheme. The accused allegedly served as the "technical expert," responsible for creating elaborate mechanical devices used to simulate paranormal activity, including animatronic ghosts, holographic projectors, and trap doors. Additionally, the accused maintained detailed files on victims and allegedly conducted unauthorized surveillance.',
                            criminalRecord: 'No prior criminal record. Academic disciplinary action for unauthorized computer access at MIT (2016) – not a criminal matter.',
                            additionalCharges: null,
                            crownPosition: {
                                grounds: 'Consent release with conditions',
                                reasoning: 'Crown consents to continued release. The accused appears to be a lesser participant who was manipulated by the scheme\'s leader (F. Jones). Strong community ties, no prior record, and gainful employment. The accused has expressed remorse and offered to testify against co-accused.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: []
                        }
                    ]
                }
            ]
        },
        {
            date: '2026-02-10',
            cities: [
                {
                    name: 'Lethbridge',
                    cases: [
                        {
                            id: 7,
                            styleOfCause: 'R. v. M. Machine',
                            presentDate: '2026-02-10',
                            previousReleases: 'N/A – Vehicle held pursuant to s. 490 CC (detention of things seized).',
                            facts: 'The Mystery Machine, a 1968 Ford Econoline van (VIN: GROOVY1968), is subject to forfeiture proceedings as an offence-related property pursuant to s. 490.1 CC. The vehicle was allegedly used as the mobile headquarters for the Mystery Inc. criminal organization and was equipped with hidden compartments containing controlled substances, surveillance equipment, and fraudulent identification documents.',
                            criminalRecord: 'Vehicle previously seized in 2019 in connection with cannabis trafficking – returned to owner after charges withdrawn. Multiple traffic violations registered to the vehicle (2015-2025).',
                            additionalCharges: {
                                infoNumber: '25-9934',
                                charges: 'Forfeiture application – offence-related property (s. 490.1 CC)',
                                bailStatus: 'N/A – property matter'
                            },
                            crownPosition: {
                                grounds: 'Application for forfeiture',
                                reasoning: 'Crown seeks forfeiture of the vehicle on the grounds that it was used in the commission of multiple indictable offences over a period of years. The distinctive appearance of the vehicle (orange and green with floral decals) was integral to the fraud scheme, lending an air of legitimacy to the criminal enterprise. Jinkies.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: []
                        }
                    ]
                },
                {
                    name: 'Medicine Hat',
                    cases: [
                        {
                            id: 8,
                            styleOfCause: 'R. v. Blake, D.',
                            presentDate: '2026-02-10',
                            previousReleases: 'Released 2025-10-22 by J.P. Santos: Keep the peace; Reside at 221 Danger Lane, Medicine Hat; Curfew 11PM–6AM except for modelling engagements with prior written approval; No contact with co-accused except F. Jones for purposes of their relationship.',
                            facts: 'The accused is charged as a co-conspirator in the Mystery Inc. fraud scheme. The accused allegedly used her position as a fashion model and social media influencer (Instagram: @DaphneBlake, 2.3M followers) to identify wealthy targets and gain access to exclusive properties. The accused would then report "paranormal activity" to her followers, creating public pressure on property owners to hire Mystery Inc.',
                            criminalRecord: 'No prior criminal record. Civil judgment for defamation (2022) – related to social media post about a competitor.',
                            additionalCharges: null,
                            crownPosition: {
                                grounds: 'Consent release with conditions',
                                reasoning: 'Crown consents to continued release. The accused is a peripheral participant whose primary role was identifying targets. Strong ties to the community through legitimate business interests. Condition prohibiting social media posts about the case or any "haunted" locations is recommended.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: []
                        }
                    ]
                }
            ]
        },
        {
            date: '2026-02-17',
            cities: [
                {
                    name: 'Grande Prairie',
                    cases: [
                        {
                            id: 9,
                            styleOfCause: 'R. v. Wonka, W.',
                            presentDate: '2026-02-17',
                            previousReleases: 'No prior releases on this matter.',
                            facts: 'Between 2024-01-01 and 2025-09-30, the accused, owner and operator of Wonka Industries (Grande Prairie chocolate factory), did commit multiple violations of the Canada Labour Code and Alberta Employment Standards. Specifically, the accused employed persons under the age of 15 (the "Oompa Loompas") without proper work permits, failed to pay minimum wage, and maintained unsafe working conditions including open vats of boiling chocolate, an operational incinerator, and a river of liquid chocolate with no safety barriers.',
                            criminalRecord: 'Health code violations (2020) – $50,000 fine, Fizzy Lifting Drink incident; Regulatory offence – failure to maintain proper ventilation (2021) – $25,000 fine; Immigration violations (2023) – Charges withdrawn after Oompa Loompa citizenship resolved',
                            additionalCharges: {
                                infoNumber: '26-1102',
                                charges: 'Criminal negligence causing bodily harm (s. 221 CC) – Augustus Gloop incident; Unlawful confinement (s. 279 CC) – Wonkavator incident; Administering noxious substance (s. 245 CC) – Violet Beauregarde incident',
                                bailStatus: 'To be spoken to'
                            },
                            crownPosition: {
                                grounds: 'Opposed on Secondary and Tertiary Grounds',
                                reasoning: 'Multiple children have been seriously injured at the accused\'s facility under circumstances suggesting deliberate indifference to safety. Secondary: Likelihood of continued operation of the factory pending trial poses ongoing risk. Tertiary: Public confidence in the justice system requires that individuals who endanger children face meaningful consequences.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: []
                        }
                    ]
                }
            ]
        },
        {
            date: '2026-03-05',
            cities: [
                {
                    name: 'Edmonton',
                    cases: [
                        {
                            id: 10,
                            styleOfCause: 'R. v. White, W.',
                            presentDate: '2026-03-05',
                            previousReleases: 'Deceased – proceeding against estate.',
                            facts: 'This matter proceeds against the estate of the accused, a former high school chemistry teacher from Albuquerque, New Mexico, who relocated to Edmonton in 2023. Investigation revealed the accused operated a clandestine methamphetamine laboratory in an RV parked at various locations throughout northern Alberta. The accused passed away on 2025-12-15 from gunshot wounds sustained in an unrelated incident in New Mexico.',
                            criminalRecord: 'No prior Canadian record. Extensive U.S. criminal history including: Production of controlled substance (methamphetamine) – multiple counts; First-degree murder – multiple counts; Money laundering; Various firearms offences.',
                            additionalCharges: {
                                infoNumber: '26-0234',
                                charges: 'Production of controlled substance (CDSA); Possession of proceeds of crime over $5,000 (s. 354 CC)',
                                bailStatus: 'N/A – accused deceased, proceeding against estate'
                            },
                            crownPosition: {
                                grounds: 'Proceeding in rem against estate assets',
                                reasoning: 'Crown seeks forfeiture of $11.2 million CAD in assets located in Alberta believed to be proceeds of crime. Assets include: 1 car wash (A1A Car Wash Ltd.), residential property in Sherwood Park, and various cryptocurrency holdings.'
                            },
                            bailResult: 'N/A',
                            presidingJustice: '---',
                            moveHistory: []
                        },
                        {
                            id: 11,
                            styleOfCause: 'R. v. Squarepants, S.',
                            presentDate: '2026-03-05',
                            previousReleases: 'Released 2025-12-01 by J.P. Morrison: Recognizance $2,000; Reside at pineapple residence, 124 Conch Street, Edmonton (designated wetland area); No contact with E. Krabs except for employment purposes; Continue employment at the Krusty Krab restaurant.',
                            facts: 'On 2025-11-15, the accused did unlawfully obtain the secret formula for the "Krabby Patty" from his employer, E. Krabs, and did attempt to transmit same to S. Plankton, proprietor of the competing Chum Bucket restaurant. The accused claims he was manipulated by Plankton; however, security footage shows the accused willingly photocopying the formula after hours.',
                            criminalRecord: 'No prior criminal record. Exemplary employment history – Employee of the Month 487 consecutive times.',
                            additionalCharges: null,
                            crownPosition: {
                                grounds: 'Consent release',
                                reasoning: 'Crown consents to release. First-time offender with strong community ties and stable employment. The complainant (E. Krabs) has indicated a willingness to continue employing the accused pending trial. Risk of reoffending is low – the accused appears to have been manipulated by a sophisticated criminal (Plankton) and has expressed genuine remorse.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: []
                        }
                    ]
                },
                {
                    name: 'Fort McMurray',
                    cases: [
                        {
                            id: 12,
                            styleOfCause: 'R. v. Duck, D.',
                            presentDate: '2026-03-05',
                            previousReleases: 'Released 2025-08-20 by Justice Feehan: Cash deposit $10,000; No contact with M. Mouse or any Disney corporate representative; Anger management counselling; Psychiatric evaluation and follow treatment recommendations.',
                            facts: 'On 2025-08-01, the accused did commit assault causing bodily harm upon one G. Goof at the West Edmonton Mall theme park. Witnesses report the accused became enraged when Mr. Goof accidentally stepped on the accused\'s foot, whereupon the accused flew into an "unintelligible tirade" and struck Mr. Goof repeatedly. The accused\'s speech impediment made the reading of his Charter rights particularly challenging.',
                            criminalRecord: 'Assault (2018) – Conditional discharge, Donald\'s Dock incident; Assault (2019) – Peace bond, C. Chipmunk and D. Chipmunk matters; Mischief under $5,000 (2020) – $750 fine; Assault with weapon (2022) – 6 months probation, umbrella incident involving nephews',
                            additionalCharges: {
                                infoNumber: '25-6677',
                                charges: 'Assault causing bodily harm (s. 267 CC); Uttering threats (s. 264.1 CC) – interpreted from quacking',
                                bailStatus: 'Released on recognizance'
                            },
                            crownPosition: {
                                grounds: 'Opposed on Secondary Grounds',
                                reasoning: 'The accused has an extensive history of violent outbursts and has repeatedly failed to benefit from anger management interventions. Pattern of escalating violence is concerning. The accused\'s inability to clearly communicate increases the risk of misunderstandings leading to further altercations.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: [
                                { fromDate: '2025-10-15', fromCity: 'Edmonton', toDate: '2026-03-05', toCity: 'Fort McMurray', movedAt: '2025-10-10T14:00:00' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            date: '2026-03-18',
            cities: [
                {
                    name: 'Calgary',
                    cases: [
                        {
                            id: 13,
                            styleOfCause: 'R. v. Soprano, A.',
                            presentDate: '2026-03-18',
                            previousReleases: 'Released 2025-07-01 by Justice Campbell: $250,000 recognizance with sureties (C. Soprano pledging $100,000, C. Moltisanti pledging $150,000); House arrest at residence; Electronic monitoring; Surrender passport and all travel documents; No contact with any member of the DiMeo crime family except immediate family members residing in the household.',
                            facts: 'The accused is alleged to be the boss of the DiMeo crime family\'s Calgary operations. RCMP investigation "Project Bada Bing" gathered evidence of illegal gambling, loansharking, and extortion over a 3-year period. Key evidence includes intercepted communications in which the accused discusses "waste management consulting" (believed to be code for criminal activities) with various associates.',
                            criminalRecord: 'Assault (1999) – Acquitted; Extortion (2004) – Charges stayed; Illegal gambling (2010) – Withdrawn; No convictions registered.',
                            additionalCharges: {
                                infoNumber: '25-5544',
                                charges: 'Participation in criminal organization (s. 467.11 CC); Extortion (s. 346 CC) x 12 counts; Bookmaking (s. 202 CC); Proceeds of crime (s. 462.31 CC)',
                                bailStatus: 'Released with strict conditions'
                            },
                            crownPosition: {
                                grounds: 'Consent to continued release with enhanced conditions',
                                reasoning: 'Despite the seriousness of the allegations, the accused has complied with all bail conditions for 8 months. Therapy sessions with Dr. Melfi have reportedly been beneficial. The accused\'s panic attacks and depression are documented and may constitute a mental health consideration per R v Zora. Enhanced electronic monitoring and additional sureties recommended.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: []
                        }
                    ]
                },
                {
                    name: 'Red Deer',
                    cases: [
                        {
                            id: 14,
                            styleOfCause: 'R. v. Simpson, H.',
                            presentDate: '2026-03-18',
                            previousReleases: 'Released 2025-09-15 by J.P. Henderson: Recognizance $500 no deposit; Reside at 742 Evergreen Terrace, Red Deer; Abstain from alcohol; Attend AA meetings twice weekly; Maintain employment at Springfield Nuclear Power Plant.',
                            facts: 'On 2025-09-01, the accused did operate a motor vehicle (1986 Plymouth Junkerolla, pink, Alberta plate DUFF01) while impaired by alcohol, with a blood alcohol concentration of 0.24. The accused was observed by RCMP driving erratically on Highway 2, at one point driving on the wrong side of the road while consuming a donut. Upon arrest, the accused stated: "D\'oh!"',
                            criminalRecord: 'Impaired driving (2018) – $1,000 fine; Impaired driving (2020) – $2,500 fine, 2-year driving prohibition; Mischief – public intoxication (2021) – Conditional discharge; Impaired driving (2023) – 30 days intermittent sentence',
                            additionalCharges: {
                                infoNumber: '25-8812',
                                charges: 'Operation while impaired (s. 320.14 CC) – 4th offence; Dangerous operation (s. 320.13 CC)',
                                bailStatus: 'Released on recognizance'
                            },
                            crownPosition: {
                                grounds: 'Opposed on Secondary Grounds',
                                reasoning: 'This is the accused\'s fourth impaired driving offence. Previous sentences have failed to deter the behaviour. The accused has repeatedly breached abstinence conditions. Mandatory minimum sentence of 120 days applies. Detention may be necessary to protect the public from continued impaired driving.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: []
                        }
                    ]
                }
            ]
        },
        {
            date: '2026-04-02',
            cities: [
                {
                    name: 'Edmonton',
                    cases: [
                        {
                            id: 15,
                            styleOfCause: 'R. v. Fett, B.',
                            presentDate: '2026-04-02',
                            previousReleases: 'No prior releases – held in custody since arrest. Multiple bail hearings adjourned due to difficulty locating appropriate sureties.',
                            facts: 'The accused is alleged to be a contract killer operating throughout Western Canada under the moniker "The Mandalorian." Investigation linked the accused to 17 disappearances of individuals who had outstanding bounties or debts. The accused was apprehended at Calgary International Airport attempting to transport a frozen individual (identified as one H. Solo – see R. v. Solo) in a container marked "Carbonite Shipping – Fragile."',
                            criminalRecord: 'No Canadian record. Interpol Red Notice outstanding – multiple counts of murder, kidnapping, and weapons trafficking in 47 jurisdictions.',
                            additionalCharges: {
                                infoNumber: '26-0099',
                                charges: 'Kidnapping (s. 279 CC); Forcible confinement (s. 279 CC); Possession of prohibited weapons (s. 92 CC) – jetpack with integrated rocket launcher',
                                bailStatus: 'Detained'
                            },
                            crownPosition: {
                                grounds: 'Opposed on all grounds – Reverse onus',
                                reasoning: 'Primary: Extreme flight risk – accused possesses advanced aerospace equipment and has no fixed address (resides in spacecraft). Secondary: Accused is an alleged professional assassin; risk to public safety cannot be overstated. Tertiary: The accused attempted to transport a frozen human being as cargo. This is the way... to detention.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: [
                                { fromDate: '2025-11-01', fromCity: 'Calgary', toDate: '2025-12-15', toCity: 'Edmonton', movedAt: '2025-10-28T09:00:00' },
                                { fromDate: '2025-12-15', fromCity: 'Edmonton', toDate: '2026-01-20', toCity: 'Calgary', movedAt: '2025-12-10T11:30:00' },
                                { fromDate: '2026-01-20', fromCity: 'Calgary', toDate: '2026-02-25', toCity: 'Red Deer', movedAt: '2026-01-15T16:00:00' },
                                { fromDate: '2026-02-25', fromCity: 'Red Deer', toDate: '2026-04-02', toCity: 'Edmonton', movedAt: '2026-02-20T10:15:00' }
                            ]
                        }
                    ]
                },
                {
                    name: 'Lethbridge',
                    cases: [
                        {
                            id: 16,
                            styleOfCause: 'R. v. Balboa, R.',
                            presentDate: '2026-04-02',
                            previousReleases: 'Released 2025-11-10 by J.P. Santos: Keep the peace; Reside at residence (above pet shop, 1818 South Philly Street, Lethbridge); No contact with A. Creed or any member of the Creed family; Prohibited from entering any boxing gym or athletic facility.',
                            facts: 'On 2025-10-31, the accused did unlawfully engage in a prizefight contrary to s. 83 of the Criminal Code. The accused and one A. Creed fought 15 rounds at an unsanctioned venue (Mighty Mick\'s Gym, Lethbridge). Both participants sustained serious injuries. The fight was broadcast illegally on pay-per-view, generating an estimated $2.3 million in revenue.',
                            criminalRecord: 'Prizefighting (1976) – Conditional discharge; Prizefighting (1979) – $5,000 fine; Prizefighting (1982) – Suspended sentence; Assault causing bodily harm (1985) – Acquitted (self-defence against I. Drago)',
                            additionalCharges: {
                                infoNumber: '25-9901',
                                charges: 'Prizefighting (s. 83 CC); Proceeds of crime (s. 462.31 CC)',
                                bailStatus: 'Released on undertaking'
                            },
                            crownPosition: {
                                grounds: 'Consent release',
                                reasoning: 'Crown consents to release with conditions. The accused is elderly and does not pose a flight risk. While the accused has a history of prizefighting, this is a relatively minor offence in the Criminal Code. Conditions prohibiting contact with the boxing community should prevent reoffending. Yo Adrian, he can go home.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: []
                        }
                    ]
                }
            ]
        },
        {
            date: '2026-04-15',
            cities: [
                {
                    name: 'Medicine Hat',
                    cases: [
                        {
                            id: 17,
                            styleOfCause: 'R. v. Wick, J.',
                            presentDate: '2026-04-15',
                            previousReleases: 'No prior releases – accused has not sought bail. Accused appears content to remain in custody, stating "I\'m thinking I\'m not seeking release."',
                            facts: 'On 2025-09-20, the accused entered the Continental Hotel, 1 Assassin Avenue, Medicine Hat, and systematically eliminated 47 individuals. The accused claims all victims were members of a criminal organization who had stolen his vehicle (1969 Ford Mustang Mach 1) and harmed his dog. Extensive property damage estimated at $4.2 million.',
                            criminalRecord: 'No prior Canadian record. Sealed records from multiple international jurisdictions. Known associate of the High Table criminal organization.',
                            additionalCharges: {
                                infoNumber: '25-7788',
                                charges: 'First-degree murder (s. 235 CC) x 47 counts; Arson (s. 433 CC); Possession of prohibited weapons (s. 92 CC) – extensive arsenal including pencils',
                                bailStatus: 'Detained – accused not seeking release'
                            },
                            crownPosition: {
                                grounds: 'Detention mandatory – s. 469 offence',
                                reasoning: 'The accused is charged with 47 counts of first-degree murder, which are s. 469 offences requiring a Superior Court bail hearing. Crown will vigorously oppose release at any future application. The body count speaks for itself. Evidence suggests the accused eliminated all 47 individuals in approximately 4 minutes using a combination of firearms, knives, and a pencil.'
                            },
                            bailResult: 'Detained',
                            presidingJustice: 'Justice Campbell',
                            moveHistory: []
                        }
                    ]
                }
            ]
        },
        {
            date: '2026-04-28',
            cities: [
                {
                    name: 'Grande Prairie',
                    cases: [
                        {
                            id: 18,
                            styleOfCause: 'R. v. McFly, M.',
                            presentDate: '2026-04-28',
                            previousReleases: 'Released 2026-01-15 by J.P. Morrison: Recognizance $5,000; Reside with surety (Dr. E. Brown, pledging $25,000); Surrender DeLorean vehicle and all time-travel capable devices; No contact with any member of the Tannen family; Attend high school equivalency classes.',
                            facts: 'On 2025-12-31, the accused did operate a modified DeLorean DMC-12 at Grande Prairie Airport at speeds exceeding 140 km/h (88 mph), creating a hazard to aircraft operations. Additionally, the accused is charged with interference with historical events after allegedly travelling to 1955 and disrupting the Enchantment Under the Sea dance at Hill Valley High School, nearly preventing his own parents from meeting.',
                            criminalRecord: 'Dangerous driving (1985) – Charges withdrawn due to temporal paradox; Mischief – interference with clock tower (1985) – Conditional discharge; Trespassing (2015) – Peace bond, hoverboard incident',
                            additionalCharges: {
                                infoNumber: '26-0055',
                                charges: 'Dangerous operation of motor vehicle (s. 320.13 CC); Trespassing at airport (Aeronautics Act); Unlawful interference with the space-time continuum (Novel Charter issue)',
                                bailStatus: 'Released with conditions'
                            },
                            crownPosition: {
                                grounds: 'Consent release with strict conditions',
                                reasoning: 'Crown consents to release. The accused is a young person with no significant criminal history. The surety (Dr. Brown) is a respected scientist who has agreed to disable all time-travel capabilities of the vehicle. The temporal interference charges are constitutionally novel and may not survive a Charter challenge. Heavy, but manageable.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: []
                        }
                    ]
                },
                {
                    name: 'Calgary',
                    cases: [
                        {
                            id: 19,
                            styleOfCause: 'R. v. Lecter, H.',
                            presentDate: '2026-04-28',
                            previousReleases: 'No prior releases – held in maximum security psychiatric facility pursuant to s. 672.54 CC.',
                            facts: 'The accused, a former psychiatrist, is charged with multiple counts of murder and cannibalism. Investigation began after human remains were discovered in the accused\'s Calgary residence, prepared in the style of fine French cuisine. The accused had been serving these preparations to dinner party guests, including several members of the Calgary Philharmonic Orchestra board.',
                            criminalRecord: 'No prior Canadian record. FBI Most Wanted (removed from list after faking death in 2008). Escaped from Baltimore State Hospital for the Criminally Insane (1991). Interpol Red Notice – multiple jurisdictions.',
                            additionalCharges: {
                                infoNumber: '26-0666',
                                charges: 'First-degree murder (s. 235 CC) x 9 counts; Offering indignity to human remains (s. 182 CC); Criminal harassment (s. 264 CC) – Census taker incident',
                                bailStatus: 'Detained – psychiatric hold'
                            },
                            crownPosition: {
                                grounds: 'Detention mandatory – s. 469 offence; NCR assessment ordered',
                                reasoning: 'The accused is charged with multiple counts of first-degree murder. A psychiatric assessment pursuant to s. 672.11 has been ordered to determine fitness to stand trial and criminal responsibility. The accused has been observed manipulating multiple correctional officers and one neighbouring inmate. I ate his liver with some fava beans and a nice Chianti is NOT an appropriate statement to make to arresting officers.'
                            },
                            bailResult: 'Detained',
                            presidingJustice: 'Justice Feehan',
                            moveHistory: []
                        }
                    ]
                }
            ]
        },
        {
            date: '2026-05-12',
            cities: [
                {
                    name: 'Edmonton',
                    cases: [
                        {
                            id: 20,
                            styleOfCause: 'R. v. Lightyear, B.',
                            presentDate: '2026-05-12',
                            previousReleases: 'Released 2026-02-01 by Justice Campbell: Recognizance $15,000; Residential surety (Sheriff W. Pride, pledging $20,000); Surrender all flight-capable equipment including jetpack and wings; Remain within Edmonton city limits; Attend psychiatric counselling for delusional disorder.',
                            facts: 'On 2026-01-15, the accused leapt from the roof of a 12-storey building in downtown Edmonton, believing he could fly. The accused landed on a parked vehicle, causing $45,000 in damage and sustaining only minor injuries (attributed to his reinforced spacesuit). The accused maintained he was a "Space Ranger" and that the fall was "not flying, but falling with style."',
                            criminalRecord: 'Mischief over $5,000 (2023) – Conditional discharge, Pizza Planet incident; Assault (2024) – Peace bond, altercation with one "Emperor Zurg"; Public mischief (2024) – $500 fine, false report of alien invasion',
                            additionalCharges: {
                                infoNumber: '26-0222',
                                charges: 'Mischief over $5,000 (s. 430 CC); Criminal negligence causing danger to self (s. 219 CC)',
                                bailStatus: 'Released with conditions'
                            },
                            crownPosition: {
                                grounds: 'Consent release with mental health conditions',
                                reasoning: 'Crown consents to continued release with enhanced psychiatric supervision. The accused suffers from a persistent delusional belief that he is an intergalactic law enforcement officer. Prior interventions have had limited success. The accused is not a danger to others but continues to pose a risk to himself. To infinity and beyond the scope of this bail hearing.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: []
                        }
                    ]
                },
                {
                    name: 'Red Deer',
                    cases: [
                        {
                            id: 21,
                            styleOfCause: 'R. v. White, S.',
                            presentDate: '2026-05-12',
                            previousReleases: 'No prior releases on this matter.',
                            facts: 'The accused, also known as "Snow White," is charged with unlawfully residing with seven adult males (the "Dwarfs") in a dwelling that violates multiple zoning and occupancy bylaws. More seriously, the accused allegedly administered a controlled substance (psilocybin mushroom derivative, "sleepy dust") to said co-habitants, rendering them unconscious for extended periods while the accused allegedly stole precious gems from their mining operation.',
                            criminalRecord: 'No prior criminal record. Civil protection order (2024) – against one "Evil Queen," no contact.',
                            additionalCharges: {
                                infoNumber: '26-1234',
                                charges: 'Theft over $5,000 (s. 334 CC) – diamonds; Administering noxious substance (s. 245 CC) x 7 counts; Fraud (s. 380 CC) – impersonating housekeeper',
                                bailStatus: 'To be spoken to'
                            },
                            crownPosition: {
                                grounds: 'Opposed on Secondary Grounds',
                                reasoning: 'The accused systematically drugged seven vulnerable adults and stole from them while they were incapacitated. The victims, all persons of short stature working in the mining industry, were exploited over a period of months. The accused\'s "princess" demeanour should not distract from the calculated nature of these offences.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: []
                        }
                    ]
                }
            ]
        },
        {
            date: '2026-05-26',
            cities: [
                {
                    name: 'Calgary',
                    cases: [
                        {
                            id: 22,
                            styleOfCause: 'R. v. Griffin, P.',
                            presentDate: '2026-05-26',
                            previousReleases: 'Released 2026-03-01 by J.P. Henderson: Recognizance $3,000; Reside at 31 Spooner Street, Calgary; Curfew 9PM–7AM; Abstain from alcohol; No contact with the Giant Chicken; Attend parenting classes.',
                            facts: 'On 2026-02-15, the accused engaged in a protracted physical altercation with an anthropomorphic chicken (known only as "Ernie the Giant Chicken") lasting approximately 47 minutes and causing an estimated $2.8 million in property damage throughout downtown Calgary. The fight moved through multiple city blocks, a construction site, an airplane hangar, and concluded in the Bow River.',
                            criminalRecord: 'Assault (2019) – Conditional discharge, vs. Giant Chicken; Mischief over $5,000 (2020) – Suspended sentence, vs. Giant Chicken; Assault causing bodily harm (2021) – 6 months probation, vs. Giant Chicken; Assault with weapon (2023) – 12 months probation, vs. Giant Chicken (weapon: expired coupon)',
                            additionalCharges: {
                                infoNumber: '26-0888',
                                charges: 'Assault causing bodily harm (s. 267 CC); Mischief over $5,000 (s. 430 CC); Dangerous operation of aircraft (s. 320.13 CC) – commandeered helicopter during fight',
                                bailStatus: 'Released on recognizance'
                            },
                            crownPosition: {
                                grounds: 'Opposed on Secondary Grounds',
                                reasoning: 'The accused has an extensive history of violent altercations with the same victim, spanning multiple years. Each incident has escalated in severity and property damage. The vendetta appears unresolvable through legal means. A peace bond is clearly insufficient. This has to stop, and frankly, it\'s starting to really grind my gears.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: [
                                { fromDate: '2026-04-01', fromCity: 'Edmonton', toDate: '2026-05-26', toCity: 'Calgary', movedAt: '2026-03-28T14:00:00' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            date: '2026-06-09',
            cities: [
                {
                    name: 'Edmonton',
                    cases: [
                        {
                            id: 23,
                            styleOfCause: 'R. v. Plankton, S.',
                            presentDate: '2026-06-09',
                            previousReleases: 'Released 2026-03-15 by Justice Feehan: $25,000 recognizance; Residential surety (K. Plankton, computer wife, pledging $50,000); House arrest with electronic monitoring; No contact with E. Krabs or employees of the Krusty Krab; Prohibited from possessing any mind-control devices.',
                            facts: 'The accused is the alleged mastermind behind a years-long corporate espionage campaign targeting the Krusty Krab restaurant. On 2026-02-28, the accused deployed a mind-control device (the "Chum-Hypnotizer 3000") on employee S. Squarepants in an attempt to steal the Krabby Patty secret formula. The device malfunctioned, causing temporary psychosis in the affected employee.',
                            criminalRecord: 'Attempted theft (2015) – Conditional discharge; Corporate espionage (2017) – 18 months probation; Attempted theft (2019) – Suspended sentence; Mind control – unauthorized use (2022) – 2 years CSO',
                            additionalCharges: {
                                infoNumber: '26-0777',
                                charges: 'Attempt theft (s. 322/463 CC); Assault with weapon (s. 267 CC) – mind-control device; Criminal harassment (s. 264 CC) – 1% evil, 99% hot gas',
                                bailStatus: 'Released with strict conditions'
                            },
                            crownPosition: {
                                grounds: 'Opposed on Secondary Grounds',
                                reasoning: 'The accused has an obsessive fixation on obtaining the Krabby Patty formula spanning decades. Previous sentences have utterly failed to deter. The accused operates a failing restaurant (The Chum Bucket) that serves as a front for criminal activities. The accused is 1% evil but 100% likely to reoffend.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: []
                        }
                    ]
                },
                {
                    name: 'Fort McMurray',
                    cases: [
                        {
                            id: 24,
                            styleOfCause: 'R. v. Palpatine, S.',
                            presentDate: '2026-06-09',
                            previousReleases: 'No prior releases – s. 469 offence.',
                            facts: 'The accused, a former Senator, is alleged to have orchestrated a coup against the legitimate government and declared himself "Emperor" of a criminal organization spanning multiple star systems. Investigation revealed the accused manipulated a young colleague (A. Skywalker) into committing numerous violent acts, including the elimination of children at a local academy.',
                            criminalRecord: 'Treason (historical – records sealed by Imperial decree); Murder – counselling (suspected, no charges laid due to witness intimidation); Crimes against humanity (International Criminal Court warrant outstanding)',
                            additionalCharges: {
                                infoNumber: '26-0001',
                                charges: 'Counselling murder (s. 22/235 CC); Criminal organization offences (s. 467.11 CC); Treason (s. 46 CC); Unlimited power (novel offence)',
                                bailStatus: 'Detained – s. 469 offence'
                            },
                            crownPosition: {
                                grounds: 'Detention mandatory – s. 469 offences; Opposed on all grounds',
                                reasoning: 'The accused is charged with the most serious offences in the Criminal Code. The accused has demonstrated the ability to manipulate the justice system and corrupt judges (see: Order 66). The accused has allegedly returned from death at least once. Do it... detain him.'
                            },
                            bailResult: 'Detained',
                            presidingJustice: 'Justice Campbell',
                            moveHistory: []
                        }
                    ]
                }
            ]
        },
        {
            date: '2026-06-23',
            cities: [
                {
                    name: 'Lethbridge',
                    cases: [
                        {
                            id: 25,
                            styleOfCause: 'R. v. Gru, F.',
                            presentDate: '2026-06-23',
                            previousReleases: 'Released 2026-04-10 by J.P. Santos: $100,000 recognizance; Residential surety (L. Wild, pledging $75,000); House arrest; No contact with any member of the Anti-Villain League except for court-approved meetings; Surrender all shrink rays, freeze rays, and minions.',
                            facts: 'The accused, a former supervillain turned Anti-Villain League consultant, is alleged to have stolen the Moon from its orbit on 2026-03-15. The Moon was shrunk using a proprietary "Shrink Ray" and kept in the accused\'s Lethbridge residence for approximately 72 hours before being returned to orbit. Tidal disruptions caused an estimated $500 million in coastal damage worldwide.',
                            criminalRecord: 'Grand theft – Vector Industries pyramid (2010) – Charges withdrawn; Theft – shrink ray (2010) – Conditional discharge; Theft of Moon (2010) – Pardoned in exchange for AVL cooperation; Assault (2013) – Acquitted, El Macho incident',
                            additionalCharges: {
                                infoNumber: '26-0321',
                                charges: 'Theft over $5,000 (s. 334 CC) – technically the Moon; Mischief endangering life (s. 430(2) CC); Criminal negligence (s. 219 CC)',
                                bailStatus: 'Released with conditions'
                            },
                            crownPosition: {
                                grounds: 'Consent release with strict conditions',
                                reasoning: 'Despite the extraordinary nature of the offence, the accused returned the Moon voluntarily and has cooperated with authorities. The accused has three adopted daughters who depend on him. The accused\'s "minions" (small yellow creatures, believed to be genetically modified bananas) are not capable of supervising children and require the accused\'s presence. It\'s so fluffy... the Crown\'s position on release.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: [
                                { fromDate: '2026-05-01', fromCity: 'Calgary', toDate: '2026-06-23', toCity: 'Lethbridge', movedAt: '2026-04-28T11:00:00' }
                            ]
                        }
                    ]
                },
                {
                    name: 'Medicine Hat',
                    cases: [
                        {
                            id: 26,
                            styleOfCause: 'R. v. Hood, R.',
                            presentDate: '2026-06-23',
                            previousReleases: 'Released 2026-05-01 by Justice Feehan: Recognizance $10,000; Reside in Sherwood Forest Campground, Medicine Hat; No possession of bows, arrows, or other projectile weapons; No contact with the Sheriff of Medicine Hat or any law enforcement officer except as required by these conditions.',
                            facts: 'The accused, styling himself as a "wealth redistribution specialist," has been robbing wealthy travellers along Highway 1 near Medicine Hat and distributing the proceeds to low-income communities. While the accused frames these activities as charitable, the Crown notes that theft is theft regardless of the redistribution of proceeds.',
                            criminalRecord: 'Robbery (2019) – Suspended sentence, Merry Men plea deal; Assault with weapon (2020) – Conditional discharge, arrow-related; Theft over $5,000 (2022) – 12 months probation; Escape lawful custody (2023) – 6 months concurrent',
                            additionalCharges: {
                                infoNumber: '26-0503',
                                charges: 'Robbery (s. 343 CC) x 14 counts; Possession of weapon for dangerous purpose (s. 88 CC); Disguise with intent (s. 351 CC)',
                                bailStatus: 'Released on recognizance'
                            },
                            crownPosition: {
                                grounds: 'Opposed on Secondary Grounds',
                                reasoning: 'The accused is a serial robber with an ideological commitment to theft. The accused believes his crimes are morally justified, which increases the likelihood of reoffending. Previous court orders have failed to curb this behaviour. The accused\'s "Merry Men" associates remain at large and may facilitate further offences.'
                            },
                            bailResult: 'Pending',
                            presidingJustice: '---',
                            moveHistory: []
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
