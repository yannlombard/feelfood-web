'use strict';

(function() {

    var events = {
        indexMailTo: {
            category: 'event',
            action  : 'contact',
            label   : 'indexMail',
            value   : 1
        },
        indexPhone : {
            category: 'event',
            action  : 'contact',
            label   : 'indexCall',
            value   : 1
        },
        ftPhone    : {
            category: 'event',
            action  : 'contact',
            label   : 'ftCall',
            value   : 1
        },
        ftMailTo   : {
            category: 'event',
            action  : 'contact',
            label   : 'ftMail',
            value   : 1
        }
    };

    var sendGA = function(id) {
        ga('send', 'event', events[id].category, events[id].action, events[id].label, events[id].value);
    };

    var tag = function(element) {
        // Adds a listener for the "submit" event.
        element.addEventListener('click', function() {
            sendGA(this.id);
        });
    };

    // Gets a reference to the form element, assuming
    // it contains the id attribute "signup-form".
    var buttons = document.getElementsByClassName('analytics');

    for(var i = 0; i < buttons.length; i++) {
        tag(buttons[i]);
    }

})();