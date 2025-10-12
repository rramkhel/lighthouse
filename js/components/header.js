// Header Component

function renderHeader() {
    return `
        <header class="bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg">
            <div class="max-w-[1800px] mx-auto px-8 py-5">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <i data-lucide="briefcase" class="w-7 h-7"></i>
                        <h1 class="text-xl font-semibold">Legal Case Management</h1>
                    </div>
                    <div class="text-sm text-slate-300">Saturday, October 11, 2025</div>
                </div>
            </div>
        </header>
    `;
}