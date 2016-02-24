'use strict';

(function() {

    // Gets a reference to the form element, assuming
    // it contains the id attribute "signup-form".
    var button = document.getElementById('ftPhone');

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
        ga('send', 'event', id.category, id.action, id.label, id.value);
    };

    // Adds a listener for the "submit" event.
    button.addEventListener('click', function(event) {
        event.preventDefault();
        sendGA(this.id);
    });

})();