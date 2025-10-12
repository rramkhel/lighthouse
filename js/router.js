// Simple Hash-based Router

const Router = {
    routes: {},
    
    // Register a route
    add: function(path, handler) {
        this.routes[path] = handler;
    },
    
    // Navigate to a route
    navigate: function(path) {
        window.location.hash = path;
    },
    
    // Get current route
    getCurrentRoute: function() {
        return window.location.hash.slice(1) || '/dashboard';
    },
    
    // Parse route with parameters (e.g., /case/1)
    parseRoute: function(hash) {
        const path = hash.slice(1) || '/dashboard';
        const parts = path.split('/').filter(p => p);
        return {
            route: '/' + parts[0],
            params: parts.slice(1)
        };
    },
    
    // Handle route changes
    handleRoute: function() {
        const { route, params } = this.parseRoute(window.location.hash);
        
        // Find matching route
        const handler = this.routes[route];
        
        if (handler) {
            handler(params);
        } else {
            // Default to dashboard
            this.routes['/dashboard']();
        }
    },
    
    // Initialize router
    init: function() {
        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // Handle initial route
        this.handleRoute();
    }
};