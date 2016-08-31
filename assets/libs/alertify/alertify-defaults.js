alertify.defaults = {
    // dialogs defaults
    modal: true,
    basic: false,
    frameless: false,
    movable: true,
    moveBounded: false,
    resizable: true,
    closable: true,
    closableByDimmer: true,
    maximizable: true,
    startMaximized: false,
    pinnable: true,
    pinned: true,
    padding: true,
    overflow: true,
    maintainFocus: true,
    transition: 'pulse',
    autoReset: true,
    // notifier defaults
    notifier: {
        // auto-dismiss wait time (in seconds)  
        delay: 5,
        // default position
        position: 'bottom-right'
    },
    // language resources 
    glossary: {
        // dialogs default title
        title: 'Mensaje',
        // ok button text
        ok: 'Sí',
        // cancel button text
        cancel: 'No'
    },
    // theme settings
    theme: {
        // class name attached to prompt dialog input textbox.
        input: 'ajs-input',
        // class name attached to ok button
//        ok: 'ajs-ok',
        ok: 'btn btn-success btn-xs',
        // class name attached to cancel button 
//        cancel: 'ajs-cancel'
        cancel: 'btn btn-danger btn-xs'
    }
};