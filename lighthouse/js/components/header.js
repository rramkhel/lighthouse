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

                    <!-- Search Bar and Home Link -->
                    <div class="flex items-center gap-6">
                        <a href="../index.html" class="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
                            <i data-lucide="home" class="w-4 h-4"></i>
                            <span class="text-sm">Home</span>
                        </a>
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
                            <div class="search-results-container">
                                ${renderSearchResults()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    `;
}