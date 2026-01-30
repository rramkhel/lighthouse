// Bell Tower Header Component

function renderHeader() {
    return `
        <header class="bg-gradient-to-r from-amber-700 to-amber-600 text-white shadow-lg">
            <div class="max-w-[1600px] mx-auto px-8 py-5">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <i data-lucide="bell" class="w-7 h-7"></i>
                        <div>
                            <h1 class="text-xl font-semibold">Bell Tower</h1>
                            <p class="text-amber-200 text-xs">Case Scheduling System</p>
                        </div>
                    </div>

                    <!-- Quick Stats -->
                    <div class="flex items-center gap-6">
                        <div class="text-right">
                            <p class="text-amber-200 text-xs">Unassigned Cases</p>
                            <p class="text-2xl font-bold">${getUnassignedCases().length}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-amber-200 text-xs">Upcoming Court Days</p>
                            <p class="text-2xl font-bold">${getUpcomingCourtDays().length}</p>
                        </div>
                        <a href="../index.html" class="flex items-center gap-2 px-4 py-2 bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors">
                            <i data-lucide="home" class="w-4 h-4"></i>
                            <span class="text-sm">Home</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    `;
}
