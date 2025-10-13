// Documents View

// Initialize document filters if not exists
if (!STATE.documentFilterStatus) {
    STATE.documentFilterStatus = '';
    STATE.documentFilterPriority = '';
    STATE.documentFilterCase = '';
}

function handleDocumentFilterStatus(value) {
    STATE.documentFilterStatus = value;
    render();
}

function handleDocumentFilterPriority(value) {
    STATE.documentFilterPriority = value;
    render();
}

function handleDocumentFilterCase(value) {
    STATE.documentFilterCase = value;
    render();
}

function getDocumentStatusBadgeStyle(status) {
    const statusStyles = {
        'Served': 'background: #d1ecf1; color: #0c5460;',
        'Pending Response': 'background: #f8d7da; color: #721c24;',
        'Received': 'background: #d4edda; color: #155724;',
        'Overdue': 'background: #f5c6cb; color: #721c24; font-weight: 700;'
    };
    return statusStyles[status] || 'background: #e9ecef; color: #495057;';
}

function getDocumentPriorityStyle(priority) {
    const priorityStyles = {
        'High': 'color: #dc3545; font-weight: 700;',
        'Medium': 'color: #fd7e14; font-weight: 600;',
        'Low': 'color: #6c757d; font-weight: 500;'
    };
    return priorityStyles[priority] || '';
}

// Remove this function - no colors on dates/numbers

function renderDocuments() {
    // Group documents by case
    const docsByCase = {};
    DATA.documentRequests.forEach(doc => {
        if (!docsByCase[doc.caseName]) {
            docsByCase[doc.caseName] = [];
        }
        docsByCase[doc.caseName].push(doc);
    });

    // Apply filters
    let filteredCases = Object.keys(docsByCase);

    if (STATE.documentFilterCase) {
        filteredCases = filteredCases.filter(caseName => caseName === STATE.documentFilterCase);
    }

    // Filter by status or priority within cases
    if (STATE.documentFilterStatus || STATE.documentFilterPriority) {
        filteredCases = filteredCases.filter(caseName => {
            const docs = docsByCase[caseName];
            return docs.some(doc => {
                if (STATE.documentFilterStatus && doc.status !== STATE.documentFilterStatus) return false;
                if (STATE.documentFilterPriority && doc.priority !== STATE.documentFilterPriority) return false;
                return true;
            });
        });
    }

    // Get unique values for filters
    const uniqueCases = Object.keys(docsByCase).sort();
    const uniqueStatuses = [...new Set(DATA.documentRequests.map(d => d.status))].sort();

    return `
        <div style="background: white; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border: 1px solid #e9ecef; overflow: hidden;">
            <!-- Filters -->
            <div style="background: #f8f9fa; padding: 20px 40px; border-bottom: 2px solid #e9ecef; display: flex; gap: 15px; flex-wrap: wrap; align-items: center;">
                <div style="display: flex; flex-direction: column; gap: 5px;">
                    <label style="font-size: 12px; font-weight: 600; color: #495057; text-transform: uppercase; letter-spacing: 0.5px;">Status</label>
                    <select
                        onchange="handleDocumentFilterStatus(this.value)"
                        style="padding: 8px 12px; border: 2px solid #dee2e6; border-radius: 6px; font-size: 14px; background: white; cursor: pointer;"
                    >
                        <option value="">All Statuses</option>
                        ${uniqueStatuses.map(status => `
                            <option value="${status}" ${STATE.documentFilterStatus === status ? 'selected' : ''}>${status}</option>
                        `).join('')}
                    </select>
                </div>

                <div style="display: flex; flex-direction: column; gap: 5px;">
                    <label style="font-size: 12px; font-weight: 600; color: #495057; text-transform: uppercase; letter-spacing: 0.5px;">Priority</label>
                    <select
                        onchange="handleDocumentFilterPriority(this.value)"
                        style="padding: 8px 12px; border: 2px solid #dee2e6; border-radius: 6px; font-size: 14px; background: white; cursor: pointer;"
                    >
                        <option value="">All Priorities</option>
                        <option value="High" ${STATE.documentFilterPriority === 'High' ? 'selected' : ''}>High</option>
                        <option value="Medium" ${STATE.documentFilterPriority === 'Medium' ? 'selected' : ''}>Medium</option>
                        <option value="Low" ${STATE.documentFilterPriority === 'Low' ? 'selected' : ''}>Low</option>
                    </select>
                </div>

                <div style="display: flex; flex-direction: column; gap: 5px;">
                    <label style="font-size: 12px; font-weight: 600; color: #495057; text-transform: uppercase; letter-spacing: 0.5px;">Case</label>
                    <select
                        onchange="handleDocumentFilterCase(this.value)"
                        style="padding: 8px 12px; border: 2px solid #dee2e6; border-radius: 6px; font-size: 14px; background: white; cursor: pointer;"
                    >
                        <option value="">All Cases</option>
                        ${uniqueCases.map(caseName => `
                            <option value="${caseName}" ${STATE.documentFilterCase === caseName ? 'selected' : ''}>${caseName}</option>
                        `).join('')}
                    </select>
                </div>
            </div>

            <div style="padding: 20px 40px 40px;">
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px; min-width: 1200px;">
                        <thead style="background: #2c3e50; color: white; position: sticky; top: 0; z-index: 10;">
                            <tr>
                                <th style="padding: 16px 12px; text-align: left; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; border-bottom: 3px solid #34495e;">Case Name</th>
                                <th style="padding: 16px 12px; text-align: left; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; border-bottom: 3px solid #34495e;">Recipient</th>
                                <th style="padding: 16px 12px; text-align: left; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; border-bottom: 3px solid #34495e;">Type</th>
                                <th style="padding: 16px 12px; text-align: left; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; border-bottom: 3px solid #34495e;">Document Type</th>
                                <th style="padding: 16px 12px; text-align: left; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; border-bottom: 3px solid #34495e;">Documents Requested</th>
                                <th style="padding: 16px 12px; text-align: left; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; border-bottom: 3px solid #34495e;">Status</th>
                                <th style="padding: 16px 12px; text-align: left; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; border-bottom: 3px solid #34495e;">Response Deadline</th>
                                <th style="padding: 16px 12px; text-align: left; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; border-bottom: 3px solid #34495e;">Days to Respond</th>
                                <th style="padding: 16px 12px; text-align: left; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; border-bottom: 3px solid #34495e;">Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredCases.length === 0 ? `
                                <tr>
                                    <td colspan="9" style="padding: 32px; text-align: center; color: #6c757d;">No documents found</td>
                                </tr>
                            ` : filteredCases.map(caseName => {
                                const docs = docsByCase[caseName];
                                // Filter docs within case if needed
                                const visibleDocs = docs.filter(doc => {
                                    if (STATE.documentFilterStatus && doc.status !== STATE.documentFilterStatus) return false;
                                    if (STATE.documentFilterPriority && doc.priority !== STATE.documentFilterPriority) return false;
                                    return true;
                                });

                                return visibleDocs.map((doc, index) => {
                                    const today = new Date();
                                    const deadline = new Date(doc.responseDeadline);
                                    const daysToRespond = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

                                    return `
                                    <tr style="border-bottom: 1px solid #e9ecef; transition: background-color 0.2s ease;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background=''">
                                        ${index === 0 ? `
                                            <td rowspan="${visibleDocs.length}" style="padding: 16px 12px; vertical-align: top;">
                                                <strong>${caseName}</strong>
                                            </td>
                                        ` : ''}
                                        <td style="padding: 16px 12px; vertical-align: top;">
                                            <strong>${doc.recipient}</strong><br><small style="color: #6c757d;">Witness</small>
                                        </td>
                                        <td style="padding: 16px 12px; vertical-align: top;">${doc.type}</td>
                                        <td style="padding: 16px 12px; vertical-align: top;">${doc.type}</td>
                                        <td style="padding: 16px 12px; vertical-align: top; max-width: 200px; white-space: pre-wrap; font-size: 13px;">${doc.type}</td>
                                        <td style="padding: 16px 12px; vertical-align: top;">
                                            <span style="display: inline-block; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; ${getDocumentStatusBadgeStyle(doc.status)}">
                                                ${doc.status}
                                            </span>
                                        </td>
                                        <td style="padding: 16px 12px; vertical-align: top; white-space: nowrap; font-variant-numeric: tabular-nums;">${formatDate(doc.responseDeadline)}</td>
                                        <td style="padding: 16px 12px; vertical-align: top; font-variant-numeric: tabular-nums;">${daysToRespond}</td>
                                        <td style="padding: 16px 12px; vertical-align: top; ${getDocumentPriorityStyle(doc.priority)}">${doc.priority}</td>
                                    </tr>
                                `}).join('');
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}