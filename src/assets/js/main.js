'use strict';

(function() {

    var links = document.getElementsByTagName('a');

    var currentLocation = window.location.origin + window.location.pathname;

    var smoothScr = {
        iterr : 30, // set timeout miliseconds ..decreased with 1ms for each iteration
        tm : null, //timeout local variable
        stopShow: function()
        {
            clearTimeout(this.tm); // stopp the timeout
            this.iterr = 30; // reset milisec iterator to original value
        },
        getRealTop : function (el) // helper function instead of jQuery
        {
            var elm = el;
            var realTop = 0;
            do
            {
                realTop += elm.offsetTop;
                elm = elm.offsetParent;
            }
            while(elm);
            return realTop;
        },
        getPageScroll : function()  // helper function instead of jQuery
        {
            var pgYoff = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
            return pgYoff;
        },
        anim : function (id) // the main func
        {
            this.stopShow(); // for click on another button or link
            var eOff, pOff, tOff, scrVal, pos, dir, step;

            eOff = document.getElementById(id).offsetTop; // element offsetTop

            tOff =  this.getRealTop(document.getElementById(id).parentNode); // terminus point

            pOff = this.getPageScroll(); // page offsetTop

            if (pOff === null || isNaN(pOff) || pOff === 'undefined') pOff = 0;

            scrVal = eOff - pOff; // actual scroll value;

            if (scrVal > tOff)
            {
                pos = (eOff - tOff - pOff);
                dir = 1;
            }
            if (scrVal < tOff)
            {
                pos = (pOff + tOff) - eOff;
                dir = -1;
            }
            if(scrVal !== tOff)
            {
                step = ~~((pos / 4) +1) * dir;

                if(this.iterr > 1) this.iterr -= 1;
                else this.itter = 0; // decrease the timeout timer value but not below 0
                window.scrollBy(0, step);
                this.tm = window.setTimeout(function()
                {
                    smoothScr.anim(id);
                }, this.iterr);
            }
            if(scrVal === tOff)
            {
                this.stopShow(); // reset function values
                return;
            }
        }
    };

    var onClick = function(e) {
        e.preventDefault();

        var id = e.target.hash.replace('#', '');
        smoothScr.anim(id);

    };

    for (var i = 0; i < links.length; i++) {
        var link     = links[i];
        var isAnchor = link.href.replace(currentLocation, '').indexOf('#') === 0;

        if(isAnchor) {

            // bind click
            if(link.addEventListener) {                    // For all major browsers, except IE 8 and earlier
                link.addEventListener('click', onClick);
            } else if(link.attachEvent) {                  // For IE 8 and earlier versions
                link.attachEvent('onclick', onClick);
            }
        }
    }

    // GOOGLE ANALYTICS

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