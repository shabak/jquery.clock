/**
 *
 * clock.js v0.0.1
 * jQuery Simple Clock Plugin - released under MIT License 
 * @author Shabak Nikolay <nikolay.shabak@gmail.com> 
 * https://github.com/shabak/jquery.clock
 * Copyright (c) 2014 
 */
(function ($) {
    $.clock = function (obj, opt) {
        var h = opt.time.h, m = opt.time.m, s = opt.time.s;
        function tick() {
            if(s === 59) {
                if (m === 59) {
                    h = h === 23 ? 0 : h + 1;
                    m = 0;
                } else {
                    m++;
                }
                s = 0;
            }
            s++;
            var str = f(h)+':'+f(m)+':'+f(s);
            obj.html(str);
        }
        function f(n){return(n<10)?('0'+n):n;}
        var api = {
            tick: tick
        };
        return api;
    };    
    $.fn.clock = function (opt) {
        var time = opt.time ? opt.time : {h:-1,m:-1,s:-1};
        if (time.h < 0 || time.m < 0 || time.s < 0) return;
        if (time.h > 23 || time.m > 59 || time.s > 59) return;
        var theClock = $.clock(this, opt);
        theClock.tick();
        setInterval(theClock.tick, 1000);
    };
}(jQuery));
