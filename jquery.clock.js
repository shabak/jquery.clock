/**
 *
 * clock.js v0.0.1
 * jQuery Simple Clock Plugin - released under MIT License 
 * @author Shabak Nikolay <nikolay.shabak@gmail.com> 
 * https://github.com/shabak/clock
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
    $.countdown = function (obj, opt, callback) {
        var d = opt.time.d, h = opt.time.h, m = opt.time.m, s = opt.time.s;
        function tick() {
            if(s === 0) {
                if (m === 0) {
                    if (h === 0) { 
                        if (d > 0) {
                            d--;
                        }
                        h = 23;
                    } else {
                        h--;
                    }
                    m = 59;
                } else {
                    m--;
                }
                s = 60;
            }
            s--;
            var str = '';
            if (d === 0 && h === 0 && m === 0 && s === 0) {
                callback();
            } else {
                str = fd(d) + ' ' + f(h)+':'+f(m)+':'+f(s);
            }
            obj.html(str);
        }
        function f(n){return(n<10)?('0'+n):n;}
        function fs(d){
            if (d === 1) return "день";
            if (d === 2 || d === 3 || d === 4) return "дня";
            return "дней";
        }
        function fd(d){
            if (d === 0) return '';
            var res = d + ' ';
            if (d >= 0 && d <= 20) res += fs(d);
            if (d >= 21 && d <= 100) res += fs(d % 10);
            if (d >= 101) res += fs((d % 100) % 10);
            return res;
        }        
        var api = {
            tick: tick,
            intervalId: null
        };
        return api;
    };    
    $.fn.clock = function (opt) {
        var time = opt.time ? opt.time : {h:-1,m:-1,s:-1};
        if (time.h < 0 || time.m < 0 || time.s < 0 || time.h > 23 || time.m > 59 || time.s > 59) return;
        var theClock = $.clock(this, opt);
        theClock.tick();
        setInterval(theClock.tick, 1000);
    };
    $.fn.countdown = function (opt) {
        var time = opt.time ? opt.time : {h:-1,m:-1,s:-1};
        if (time.d < 0 || time.h < 0 || time.m < 0 || time.s < 0 || time.h > 23 || time.m > 59 || time.s > 59) return;
        var theCountdown = $.countdown(this, opt, function() {
            clearInterval(theCountdown.intervalId);
            opt.callback();
        });
        theCountdown.tick();
        theCountdown.intervalId = setInterval(theCountdown.tick, 1000);
    };
}(jQuery));
