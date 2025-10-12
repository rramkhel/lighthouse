// Sprint 5.5: Case Dependency Planning Views - Three Options Mockup
// Add this to js/views/weekPlanner.js

// STEP 1: Add new sub-tabs to the existing tab structure
// Find the existing tab navigation in renderWeekPlanner() and ADD this new section
// This goes AFTER the main tabs (Scheduler/Timeline/Priority) but BEFORE the content area

function renderDependencyPlannerTabs() {
    return `
        <div class="bg-white rounded-xl border border-gray-100 mb-4 overflow-hidden">
            <div class="px-5 py-3 border-b border-gray-100">
                <h3 class="text-sm font-semibold text-gray-900">Case Dependency Planning Options</h3>
                <p class="text-xs text-gray-600 mt-1">Explore different approaches to planning case timelines</p>
            </div>
            <div class="flex border-b border-gray-100">
                <button
                    onclick="STATE.dependencyView = 'option1'; render();"
                    class="flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                        STATE.dependencyView === 'option1'
                            ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }"
                >
                    <i data-lucide="columns" class="w-4 h-4"></i>
                    Option 1: Split-Screen
                </button>
                <button
                    onclick="STATE.dependencyView = 'option2'; render();"
                    class="flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                        STATE.dependencyView === 'option2'
                            ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }"
                >
                    <i data-lucide="layers" class="w-4 h-4"></i>
                    Option 2: Stacked View
                </button>
                <button
                    onclick="STATE.dependencyView = 'option3'; render();"
                    class="flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                        STATE.dependencyView === 'option3'
                            ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }"
                >
                    <i data-lucide="wand-2" class="w-4 h-4"></i>
                    Option 3: Planning Mode
                </button>
            </div>
        </div>
    `;
}

// STEP 2: Create the three option views

function renderDependencyOption1() {
    // Split-Screen: Case Timeline + Weekly Calendar side by side
    return `
        <div class="bg-white rounded-xl border border-gray-100 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Option 1: Split-Screen Approach</h2>
            
            <div class="grid grid-cols-2 gap-6">
                <!-- Left: Case Dependency Tree -->
                <div>
                    <div class="mb-4">
                        <h3 class="text-sm font-semibold text-gray-900 mb-2">Case Timeline & Dependencies</h3>
                        <select class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg">
                            <option>Smith v. Jones - Trial Oct 20</option>
                            <option>Martinez Corp - Trial Nov 5</option>
                            <option>Wilson LLC - Hearing Oct 25</option>
                        </select>
                    </div>
                    
                    <!-- Gantt-style timeline mockup -->
                    <div class="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div class="text-xs font-semibold text-gray-600 uppercase mb-3">Key Dates & Tasks</div>
                        
                        <!-- Trial anchor -->
                        <div class="flex items-center gap-3">
                            <div class="w-20 text-xs text-gray-600">Oct 20</div>
                            <div class="flex-1 bg-red-100 border-l-4 border-red-500 p-2 rounded">
                                <div class="text-xs font-semibold text-red-900">⚖️ Trial Date (ANCHOR)</div>
                            </div>
                        </div>
                        
                        <!-- Working backwards -->
                        <div class="flex items-center gap-3">
                            <div class="w-20 text-xs text-gray-600">Oct 18</div>
                            <div class="flex-1 bg-orange-50 border-l-4 border-orange-400 p-2 rounded cursor-move hover:shadow-sm transition-shadow">
                                <div class="text-xs font-semibold text-gray-900">Trial Prep - Final Review</div>
                                <div class="text-xs text-gray-600 mt-1">Depends on: Discovery received • 3h duration</div>
                                <div class="mt-2">
                                    <span class="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                                        ⚠️ Not scheduled yet
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-3">
                            <div class="w-20 text-xs text-gray-600">Oct 15</div>
                            <div class="flex-1 bg-blue-50 border-l-4 border-blue-400 p-2 rounded cursor-move hover:shadow-sm transition-shadow">
                                <div class="text-xs font-semibold text-gray-900">Review Discovery Documents</div>
                                <div class="text-xs text-gray-600 mt-1">Depends on: Discovery received • 4h duration</div>
                                <div class="mt-2">
                                    <span class="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                                        ⚠️ Not scheduled yet
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-3">
                            <div class="w-20 text-xs text-gray-600">Oct 13</div>
                            <div class="flex-1 bg-orange-50 border-l-4 border-orange-400 p-2 rounded cursor-move hover:shadow-sm transition-shadow">
                                <div class="text-xs font-semibold text-gray-900">Trial Prep - Initial Session</div>
                                <div class="text-xs text-gray-600 mt-1">No dependencies • 2h duration</div>
                                <div class="mt-2">
                                    <span class="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                                        ⚠️ Not scheduled yet
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-3">
                            <div class="w-20 text-xs text-gray-600">Oct 5</div>
                            <div class="flex-1 bg-green-50 border-l-4 border-green-400 p-2 rounded">
                                <div class="text-xs font-semibold text-gray-900">✓ Discovery Received</div>
                                <div class="text-xs text-gray-600 mt-1">Completed</div>
                            </div>
                        </div>
                        
                        <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                            <div class="text-xs font-semibold text-blue-900">💡 Instructions</div>
                            <div class="text-xs text-blue-800 mt-1">Drag tasks from this timeline to your calendar on the right to schedule them →</div>
                        </div>
                    </div>
                </div>
                
                <!-- Right: Weekly Calendar with Available Slots -->
                <div>
                    <h3 class="text-sm font-semibold text-gray-900 mb-4">Your Weekly Schedule - Drop Here</h3>
                    
                    <!-- Mini week view -->
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="grid grid-cols-5 gap-2 mb-3">
                            ${['Mon 13', 'Tue 14', 'Wed 15', 'Thu 16', 'Fri 17'].map(day => `
                                <div class="text-center">
                                    <div class="text-xs font-semibold text-gray-900">${day}</div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="grid grid-cols-5 gap-2">
                            ${['Mon 13', 'Tue 14', 'Wed 15', 'Thu 16', 'Fri 17'].map((day, idx) => `
                                <div class="bg-white rounded border border-gray-200 p-2 min-h-[200px] space-y-2">
                                    ${idx === 0 ? `
                                        <div class="bg-purple-50 border-l-4 border-purple-400 p-2 rounded text-xs">
                                            <div class="font-semibold">Meeting</div>
                                            <div class="text-gray-600">9:00 - 2h</div>
                                        </div>
                                        <div class="border-2 border-dashed border-blue-300 bg-blue-50 p-2 rounded text-xs text-blue-700 text-center">
                                            📍 Drop "Trial Prep" here
                                        </div>
                                    ` : idx === 2 ? `
                                        <div class="border-2 border-dashed border-blue-300 bg-blue-50 p-2 rounded text-xs text-blue-700 text-center">
                                            📍 Drop "Review Docs" here
                                        </div>
                                    ` : `
                                        <div class="text-xs text-gray-400 text-center py-4">
                                            Open slots
                                        </div>
                                    `}
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="mt-4 p-3 bg-green-50 rounded-lg">
                            <div class="text-xs font-semibold text-green-900">✓ Benefits</div>
                            <div class="text-xs text-green-800 mt-1">• See full case timeline at once<br>• Direct drag-and-drop scheduling<br>• Visual capacity planning</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderDependencyOption2() {
    // Stacked View: Toggle between case view and capacity view
    return `
        <div class="bg-white rounded-xl border border-gray-100 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Option 2: Stacked View with Filters</h2>
            
            <!-- View toggle -->
            <div class="flex gap-2 mb-6">
                <button class="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-lg">
                    Case Timeline View
                </button>
                <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    Capacity View (All Cases)
                </button>
            </div>
            
            <!-- Case Timeline View -->
            <div class="space-y-6">
                <!-- Case selector -->
                <div class="flex items-center justify-between">
                    <select class="px-4 py-2 text-sm border border-gray-200 rounded-lg font-semibold">
                        <option>Smith v. Jones - Trial Oct 20</option>
                        <option>Martinez Corp - Trial Nov 5</option>
                        <option>Wilson LLC - Hearing Oct 25</option>
                    </select>
                    <div class="text-sm">
                        <span class="font-semibold text-red-600">3 unscheduled tasks</span>
                        <span class="text-gray-600"> • 9h total</span>
                    </div>
                </div>
                
                <!-- Horizontal timeline -->
                <div class="bg-gray-50 rounded-lg p-6 overflow-x-auto">
                    <div class="flex items-center gap-8 min-w-[1000px]">
                        <!-- Timeline -->
                        <div class="flex-1 relative" style="height: 120px;">
                            <!-- Date markers -->
                            <div class="absolute top-0 left-0 right-0 flex justify-between text-xs text-gray-600 mb-2">
                                <span>Oct 5</span>
                                <span>Oct 10</span>
                                <span>Oct 13</span>
                                <span>Oct 15</span>
                                <span>Oct 18</span>
                                <span class="font-bold text-red-600">Oct 20 (TRIAL)</span>
                            </div>
                            
                            <!-- Timeline line -->
                            <div class="absolute top-8 left-0 right-0 h-0.5 bg-gray-300"></div>
                            
                            <!-- Milestones and tasks -->
                            <div class="absolute top-8 left-0" style="left: 0%;">
                                <div class="w-3 h-3 bg-green-500 rounded-full -mt-1.5"></div>
                                <div class="mt-2 w-32">
                                    <div class="text-xs font-semibold text-green-900">✓ Discovery Received</div>
                                </div>
                            </div>
                            
                            <div class="absolute top-8" style="left: 40%;">
                                <div class="w-3 h-3 bg-yellow-500 rounded-full -mt-1.5"></div>
                                <div class="mt-2 w-32 bg-orange-50 border border-orange-200 rounded p-2">
                                    <div class="text-xs font-semibold">Trial Prep #1</div>
                                    <div class="text-xs text-gray-600">2h • Not scheduled</div>
                                </div>
                            </div>
                            
                            <div class="absolute top-8" style="left: 60%;">
                                <div class="w-3 h-3 bg-yellow-500 rounded-full -mt-1.5"></div>
                                <div class="mt-2 w-32 bg-blue-50 border border-blue-200 rounded p-2">
                                    <div class="text-xs font-semibold">Review Docs</div>
                                    <div class="text-xs text-gray-600">4h • Not scheduled</div>
                                </div>
                            </div>
                            
                            <div class="absolute top-8" style="left: 80%;">
                                <div class="w-3 h-3 bg-yellow-500 rounded-full -mt-1.5"></div>
                                <div class="mt-2 w-32 bg-orange-50 border border-orange-200 rounded p-2">
                                    <div class="text-xs font-semibold">Trial Prep #2</div>
                                    <div class="text-xs text-gray-600">3h • Not scheduled</div>
                                </div>
                            </div>
                            
                            <div class="absolute top-8" style="left: 100%;">
                                <div class="w-4 h-4 bg-red-500 rounded-full -mt-2"></div>
                                <div class="mt-2 w-32">
                                    <div class="text-xs font-bold text-red-900">⚖️ TRIAL</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Action area -->
                <div class="bg-blue-50 rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm font-semibold text-blue-900">Ready to Schedule</div>
                            <div class="text-xs text-blue-800 mt-1">Click any unscheduled task above to place it on your calendar</div>
                        </div>
                        <button class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                            Auto-Schedule All
                        </button>
                    </div>
                </div>
                
                <!-- Capacity preview (collapsed) -->
                <div class="border border-gray-200 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-3">
                        <div class="text-sm font-semibold text-gray-900">Your Weekly Capacity</div>
                        <button class="text-xs text-blue-600 hover:text-blue-800">Switch to full capacity view →</button>
                    </div>
                    <div class="grid grid-cols-7 gap-2">
                        ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => `
                            <div class="text-center">
                                <div class="text-xs text-gray-600 mb-1">${day}</div>
                                <div class="h-16 rounded ${
                                    idx === 0 ? 'bg-red-100' : 
                                    idx === 2 || idx === 4 ? 'bg-yellow-100' : 
                                    'bg-green-100'
                                } flex items-center justify-center">
                                    <div class="text-xs font-semibold ${
                                        idx === 0 ? 'text-red-900' : 
                                        idx === 2 || idx === 4 ? 'text-yellow-900' : 
                                        'text-green-900'
                                    }">
                                        ${idx === 0 ? '7h' : idx === 2 || idx === 4 ? '5h' : '2h'}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="p-3 bg-green-50 rounded-lg">
                    <div class="text-xs font-semibold text-green-900">✓ Benefits</div>
                    <div class="text-xs text-green-800 mt-1">• Focus on one case at a time<br>• Clear timeline visualization<br>• Toggle to see conflicts across all cases</div>
                </div>
            </div>
        </div>
    `;
}

function renderDependencyOption3() {
    // Planning Mode: System suggests scheduling based on case needs + your availability
    return `
        <div class="bg-white rounded-xl border border-gray-100 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Option 3: AI-Assisted Planning Mode</h2>
            
            <!-- Case selection -->
            <div class="mb-6">
                <label class="block text-sm font-semibold text-gray-900 mb-2">Select case to plan:</label>
                <select class="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm">
                    <option>Smith v. Jones - Trial Oct 20 (5 days away)</option>
                    <option>Martinez Corp - Trial Nov 5 (18 days away)</option>
                    <option>Wilson LLC - Hearing Oct 25 (10 days away)</option>
                </select>
            </div>
            
            <!-- System analysis -->
            <div class="space-y-4 mb-6">
                <!-- Critical path analysis -->
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                        <div class="flex-1">
                            <div class="text-sm font-semibold text-red-900">⚠️ Critical: You have 3 unscheduled tasks totaling 9 hours</div>
                            <div class="text-xs text-red-800 mt-1">Trial is in 5 days. These tasks must be completed before Oct 18.</div>
                        </div>
                    </div>
                </div>
                
                <!-- Task list with AI suggestions -->
                <div class="space-y-3">
                    <!-- Task 1 -->
                    <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-sm font-semibold text-gray-900">Trial Prep - Initial Session</span>
                                    <span class="px-2 py-0.5 bg-orange-100 text-orange-800 text-xs rounded">High Priority</span>
                                </div>
                                <div class="text-xs text-gray-600">Duration: 2 hours • No dependencies • Due by: Oct 18</div>
                            </div>
                        </div>
                        
                        <div class="bg-blue-50 rounded-lg p-3 mb-3">
                            <div class="flex items-start gap-2">
                                <div class="text-lg">💡</div>
                                <div class="flex-1">
                                    <div class="text-xs font-semibold text-blue-900 mb-2">AI Suggestion: Best time slots</div>
                                    <div class="space-y-2">
                                        <button class="w-full text-left px-3 py-2 bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors">
                                            <div class="text-xs font-semibold text-gray-900">Monday, Oct 13 • 11:00 AM - 1:00 PM</div>
                                            <div class="text-xs text-gray-600 mt-1">✓ 4 days buffer before trial • No conflicts</div>
                                        </button>
                                        <button class="w-full text-left px-3 py-2 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                                            <div class="text-xs font-semibold text-gray-900">Wednesday, Oct 15 • 2:00 PM - 4:00 PM</div>
                                            <div class="text-xs text-gray-600 mt-1">⚠️ Only 2 days buffer • Adjacent to other meeting</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex gap-2">
                            <button class="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                                Accept Top Suggestion
                            </button>
                            <button class="px-4 py-2 text-gray-700 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50">
                                Show More Times
                            </button>
                        </div>
                    </div>
                    
                    <!-- Task 2 -->
                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-sm font-semibold text-gray-900">Review Discovery Documents</span>
                                    <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">Depends on: Discovery received ✓</span>
                                </div>
                                <div class="text-xs text-gray-600">Duration: 4 hours • Due by: Oct 18</div>
                            </div>
                        </div>
                        
                        <div class="bg-blue-50 rounded-lg p-3 mb-3">
                            <div class="flex items-start gap-2">
                                <div class="text-lg">💡</div>
                                <div class="flex-1">
                                    <div class="text-xs font-semibold text-blue-900 mb-2">AI Suggestion</div>
                                    <button class="w-full text-left px-3 py-2 bg-white border border-blue-200 rounded hover:bg-blue-50">
                                        <div class="text-xs font-semibold text-gray-900">Wednesday, Oct 15 • 9:00 AM - 1:00 PM</div>
                                        <div class="text-xs text-gray-600 mt-1">✓ Blocked time for focus work • 3 days before trial</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <button class="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                            Schedule on Oct 15
                        </button>
                    </div>
                    
                    <!-- Task 3 -->
                    <div class="bg-white border border-gray-200 rounded-lg p-4 opacity-50">
                        <div class="flex items-start justify-between mb-2">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-sm font-semibold text-gray-900">Trial Prep - Final Review</span>
                                    <span class="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded">🔒 Blocked</span>
                                </div>
                                <div class="text-xs text-gray-600">Duration: 3 hours • Depends on: Review Docs (not scheduled yet)</div>
                            </div>
                        </div>
                        <div class="text-xs text-gray-600 italic">Schedule "Review Discovery Documents" first to unlock this task</div>
                    </div>
                </div>
                
                <!-- Schedule all -->
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm font-semibold text-green-900">✓ Auto-schedule all 3 tasks optimally?</div>
                            <div class="text-xs text-green-800 mt-1">System will place all tasks in recommended time slots respecting dependencies</div>
                        </div>
                        <button class="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 whitespace-nowrap">
                            Schedule All
                        </button>
                    </div>
                </div>
                
                <div class="p-3 bg-green-50 rounded-lg">
                    <div class="text-xs font-semibold text-green-900">✓ Benefits</div>
                    <div class="text-xs text-green-800 mt-1">• AI suggests optimal times based on your availability<br>• Respects dependencies automatically<br>• One-click scheduling or manual override</div>
                </div>
            </div>
        </div>
    `;
}

// STEP 3: Update the main render switch to include these views
// Find the switch statement in renderWeekPlanner() that handles activeTab
// REPLACE the 'timeline' case with this:

case 'timeline':
    // Show dependency planning sub-tabs
    content += renderDependencyPlannerTabs();
    
    // Render the selected dependency view
    if (!STATE.dependencyView) STATE.dependencyView = 'option1';
    
    if (STATE.dependencyView === 'option1') {
        content += renderDependencyOption1();
    } else if (STATE.dependencyView === 'option2') {
        content += renderDependencyOption2();
    } else if (STATE.dependencyView === 'option3') {
        content += renderDependencyOption3();
    }
    break;

// STEP 4: Initialize the state variable in js/data.js
// Add this to the STATE object:

dependencyView: 'option1',  // Tracks which dependency planning option is active

// STEP 5: Test it!
// 1. Open your app and navigate to Week Planner
// 2. Click the "Timeline" tab (which now shows dependency planning)
// 3. You should see three sub-tabs: Option 1, Option 2, Option 3
// 4. Click between them to see the different mockups

// That's it! Your friend can now explore all three approaches and give feedback.