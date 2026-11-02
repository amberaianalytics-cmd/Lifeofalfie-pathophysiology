
console.log("[DEBUG] Initializing Global Error Handlers...");

window.onerror = function(message, source, lineno, colno, error) {
    console.error("[DEBUG-WINDOW-ONERROR]", {
        message: message,
        source: source,
        lineno: lineno,
        colno: colno,
        stack: error ? error.stack : 'N/A',
        errorObj: error
    });
    return false; // Let browser handle it as well
};

window.addEventListener('error', function(event) {
    console.error("[DEBUG-WINDOW-EVENT-ERROR]", {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error ? event.error.stack : 'N/A',
        target: event.target ? event.target.outerHTML : 'N/A'
    });
}, true);

window.addEventListener('unhandledrejection', function(event) {
    console.error("[DEBUG-WINDOW-UNHANDLED-REJECTION]", {
        reason: event.reason,
        promise: event.promise
    });
});

console.log("[DEBUG] Global Error Handlers Active.");
