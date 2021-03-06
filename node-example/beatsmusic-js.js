var libFuncName = null;
if ("undefined" == typeof jQuery && "undefined" == typeof Zepto && "function" == typeof $) libFuncName = $;
else if ("function" == typeof jQuery) libFuncName = jQuery;
else {
    if ("function" != typeof Zepto) throw new TypeError;
    libFuncName = Zepto
}! function(t, e, n) {
    "use strict";
    e.matchMedia = e.matchMedia || function(t) {
        var e, n = t.documentElement,
            i = n.firstElementChild || n.firstChild,
            a = t.createElement("body"),
            s = t.createElement("div");
        return s.id = "mq-test-1", s.style.cssText = "position:absolute;top:-100em", a.style.background = "none", a.appendChild(s),
        function(t) {
            return s.innerHTML = '&shy;<style media="' + t + '"> #mq-test-1 { width: 42px; }</style>', n.insertBefore(a, i), e = 42 === s.offsetWidth, n.removeChild(a), {
                matches: e,
                media: t
            }
        }
    }(n), Array.prototype.filter || (Array.prototype.filter = function(t) {
        if (null == this) throw new TypeError;
        var e = Object(this),
            n = e.length >>> 0;
        if ("function" == typeof t) {
            for (var i = [], a = arguments[1], s = 0; n > s; s++)
                if (s in e) {
                    var r = e[s];
                    t && t.call(a, r, s, e) && i.push(r)
                }
            return i
        }
    }), Function.prototype.bind || (Function.prototype.bind = function(t) {
        if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var e = Array.prototype.slice.call(arguments, 1),
            n = this,
            i = function() {}, a = function() {
                return n.apply(this instanceof i && t ? this : t, e.concat(Array.prototype.slice.call(arguments)))
            };
        return i.prototype = this.prototype, a.prototype = new i, a
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(t) {
        if (null == this) throw new TypeError;
        var e = Object(this),
            n = e.length >>> 0;
        if (0 === n) return -1;
        var i = 0;
        if (arguments.length > 1 && (i = Number(arguments[1]), i != i ? i = 0 : 0 != i && 1 / 0 != i && i != -1 / 0 && (i = (i > 0 || -1) * Math.floor(Math.abs(i)))), i >= n) return -1;
        for (var a = i >= 0 ? i : Math.max(n - Math.abs(i), 0); n > a; a++)
            if (a in e && e[a] === t) return a;
        return -1
    }), t.fn.stop = t.fn.stop || function() {
        return this
    }, e.Foundation = {
        name: "Foundation",
        version: "4.3.1",
        cache: {},
        init: function(e, n, i, a, s, r) {
            var o, l = [e, i, a, s],
                c = [],
                r = r || !1;
            if (r && (this.nc = r), this.rtl = /rtl/i.test(t("html").attr("dir")), this.scope = e || this.scope, n && "string" == typeof n && !/reflow/i.test(n)) {
                if (/off/i.test(n)) return this.off();
                if (o = n.split(" "), o.length > 0)
                    for (var d = o.length - 1; d >= 0; d--) c.push(this.init_lib(o[d], l))
            } else {
                /reflow/i.test(n) && (l[1] = "reflow");
                for (var u in this.libs) c.push(this.init_lib(u, l))
            }
            return "function" == typeof n && l.unshift(n), this.response_obj(c, l)
        },
        response_obj: function(t, e) {
            for (var n = 0, i = e.length; i > n; n++)
                if ("function" == typeof e[n]) return e[n]({
                    errors: t.filter(function(t) {
                        return "string" == typeof t ? t : void 0
                    })
                });
            return t
        },
        init_lib: function(t, e) {
            return this.trap(function() {
                return this.libs.hasOwnProperty(t) ? (this.patch(this.libs[t]), this.libs[t].init.apply(this.libs[t], e)) : function() {}
            }.bind(this), t)
        },
        trap: function(t, e) {
            if (!this.nc) try {
                return t()
            } catch (n) {
                return this.error({
                    name: e,
                    message: "could not be initialized",
                    more: n.name + " " + n.message
                })
            }
            return t()
        },
        patch: function(t) {
            this.fix_outer(t), t.scope = this.scope, t.rtl = this.rtl
        },
        inherit: function(t, e) {
            for (var n = e.split(" "), i = n.length - 1; i >= 0; i--) this.lib_methods.hasOwnProperty(n[i]) && (this.libs[t.name][n[i]] = this.lib_methods[n[i]])
        },
        random_str: function(t) {
            var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
            t || (t = Math.floor(Math.random() * e.length));
            for (var n = "", i = 0; t > i; i++) n += e[Math.floor(Math.random() * e.length)];
            return n
        },
        libs: {},
        lib_methods: {
            set_data: function(t, e) {
                var n = [this.name, +new Date, Foundation.random_str(5)].join("-");
                return Foundation.cache[n] = e, t.attr("data-" + this.name + "-id", n), e
            },
            get_data: function(t) {
                return Foundation.cache[t.attr("data-" + this.name + "-id")]
            },
            remove_data: function(e) {
                e ? (delete Foundation.cache[e.attr("data-" + this.name + "-id")], e.attr("data-" + this.name + "-id", "")) : t("[data-" + this.name + "-id]").each(function() {
                    delete Foundation.cache[t(this).attr("data-" + this.name + "-id")], t(this).attr("data-" + this.name + "-id", "")
                })
            },
            throttle: function(t, e) {
                var n = null;
                return function() {
                    var i = this,
                        a = arguments;
                    clearTimeout(n), n = setTimeout(function() {
                        t.apply(i, a)
                    }, e)
                }
            },
            data_options: function(e) {
                function n(t) {
                    return !isNaN(t - 0) && null !== t && "" !== t && t !== !1 && t !== !0
                }

                function i(e) {
                    return "string" == typeof e ? t.trim(e) : e
                }
                var a, s, r = {}, o = (e.attr("data-options") || ":").split(";"),
                    l = o.length;
                for (a = l - 1; a >= 0; a--) s = o[a].split(":"), /true/i.test(s[1]) && (s[1] = !0), /false/i.test(s[1]) && (s[1] = !1), n(s[1]) && (s[1] = parseInt(s[1], 10)), 2 === s.length && s[0].length > 0 && (r[i(s[0])] = i(s[1]));
                return r
            },
            delay: function(t, e) {
                return setTimeout(t, e)
            },
            scrollTo: function(n, i, a) {
                if (!(0 > a)) {
                    var s = i - t(e).scrollTop(),
                        r = 10 * (s / a);
                    this.scrollToTimerCache = setTimeout(function() {
                        isNaN(parseInt(r, 10)) || (e.scrollTo(0, t(e).scrollTop() + r), this.scrollTo(n, i, a - 10))
                    }.bind(this), 10)
                }
            },
            scrollLeft: function(t) {
                return t.length ? "scrollLeft" in t[0] ? t[0].scrollLeft : t[0].pageXOffset : void 0
            },
            empty: function(t) {
                if (t.length && t.length > 0) return !1;
                if (t.length && 0 === t.length) return !0;
                for (var e in t)
                    if (hasOwnProperty.call(t, e)) return !1;
                return !0
            }
        },
        fix_outer: function(t) {
            t.outerHeight = function(t, e) {
                return "function" == typeof Zepto ? t.height() : "undefined" != typeof e ? t.outerHeight(e) : t.outerHeight()
            }, t.outerWidth = function(t, e) {
                return "function" == typeof Zepto ? t.width() : "undefined" != typeof e ? t.outerWidth(e) : t.outerWidth()
            }
        },
        error: function(t) {
            return t.name + " " + t.message + "; " + t.more
        },
        off: function() {
            return t(this.scope).off(".fndtn"), t(e).off(".fndtn"), !0
        },
        zj: t
    }, t.fn.foundation = function() {
        var t = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            return Foundation.init.apply(Foundation, [this].concat(t)), this
        })
    }
}(libFuncName, this, this.document),
function(t) {
    "use strict";
    Foundation.libs.alerts = {
        name: "alerts",
        version: "4.2.2",
        settings: {
            speed: 300,
            callback: function() {}
        },
        init: function(e, n, i) {
            return this.scope = e || this.scope, "object" == typeof n && t.extend(!0, this.settings, n), "string" != typeof n ? (this.settings.init || this.events(), this.settings.init) : this[n].call(this, i)
        },
        events: function() {
            var e = this;
            t(this.scope).on("click.fndtn.alerts", "[data-alert] a.close", function(n) {
                n.preventDefault(), t(this).closest("[data-alert]").fadeOut(e.speed, function() {
                    t(this).remove(), e.settings.callback()
                })
            }), this.settings.init = !0
        },
        off: function() {
            t(this.scope).off(".fndtn.alerts")
        },
        reflow: function() {}
    }
}(Foundation.zj, this, this.document),
function(t, e, n, i) {
    "use strict";
    var a = function() {}, s = function(a, s) {
            if (a.hasClass(s.slides_container_class)) return this;
            var c, d, u, h, p, f, m = this,
                _ = a,
                g = 0,
                v = !1;
            _.children().first().addClass(s.active_slide_class), m.update_slide_number = function(e) {
                s.slide_number && (d.find("span:first").text(parseInt(e) + 1), d.find("span:last").text(_.children().length)), s.bullets && (u.children().removeClass(s.bullets_active_class), t(u.children().get(e)).addClass(s.bullets_active_class))
            }, m.build_markup = function() {
                _.wrap('<div class="' + s.container_class + '"></div>'), c = _.parent(), _.addClass(s.slides_container_class), s.navigation_arrows && (c.append(t("<a>").addClass(s.prev_class).append("<span>")), c.append(t("<a>").addClass(s.next_class).append("<span>"))), s.timer && (h = t("<div>").addClass(s.timer_container_class), h.append("<span>"), h.append(t("<div>").addClass(s.timer_progress_class)), h.addClass(s.timer_paused_class), c.append(h)), s.slide_number && (d = t("<div>").addClass(s.slide_number_class), d.append("<span></span> of <span></span>"), c.append(d)), s.bullets && (u = t("<ol>").addClass(s.bullets_container_class), c.append(u), _.children().each(function(e) {
                    var n = t("<li>").attr("data-orbit-slide", e);
                    u.append(n)
                })), s.stack_on_small && c.addClass(s.stack_on_small_class), m.update_slide_number(0)
            }, m._goto = function(e, n) {
                if (e === g) return !1;
                "object" == typeof f && f.restart();
                var i = _.children(),
                    a = "next";
                v = !0, g > e && (a = "prev"), e >= i.length ? e = 0 : 0 > e && (e = i.length - 1);
                var r = t(i.get(g)),
                    o = t(i.get(e));
                r.css("zIndex", 2), o.css("zIndex", 4).addClass("active"), _.trigger("orbit:before-slide-change"), s.before_slide_change();
                var l = function() {
                    var t = function() {
                        g = e, v = !1, n === !0 && (f = m.create_timer(), f.start()), m.update_slide_number(g), _.trigger("orbit:after-slide-change", [{
                            slide_number: g,
                            total_slides: i.length
                        }]), s.after_slide_change(g, i.length)
                    };
                    _.height() != o.height() ? _.animate({
                        height: o.height()
                    }, 250, "linear", t) : t()
                };
                if (1 === i.length) return l(), !1;
                var c = function() {
                    "next" === a && p.next(r, o, l), "prev" === a && p.prev(r, o, l)
                };
                o.height() > _.height() ? _.animate({
                    height: o.height()
                }, 250, "linear", c) : c()
            }, m.next = function(t) {
                t.stopImmediatePropagation(), t.preventDefault(), m._goto(g + 1)
            }, m.prev = function(t) {
                t.stopImmediatePropagation(), t.preventDefault(), m._goto(g - 1)
            }, m.link_custom = function(e) {
                e.preventDefault();
                var n = t(this).attr("data-orbit-link");
                if ("string" == typeof n && "" != (n = t.trim(n))) {
                    var i = c.find("[data-orbit-slide=" + n + "]"); - 1 != i.index() && m._goto(i.index())
                }
            }, m.link_bullet = function() {
                var e = t(this).attr("data-orbit-slide");
                "string" == typeof e && "" != (e = t.trim(e)) && m._goto(e)
            }, m.timer_callback = function() {
                m._goto(g + 1, !0)
            }, m.compute_dimensions = function() {
                var e = t(_.children().get(g)),
                    n = e.height();
                s.variable_height || _.children().each(function() {
                    t(this).height() > n && (n = t(this).height())
                }), _.height(n)
            }, m.create_timer = function() {
                var t = new r(c.find("." + s.timer_container_class), s, m.timer_callback);
                return t
            }, m.stop_timer = function() {
                "object" == typeof f && f.stop()
            }, m.toggle_timer = function() {
                var t = c.find("." + s.timer_container_class);
                t.hasClass(s.timer_paused_class) ? ("undefined" == typeof f && (f = m.create_timer()), f.start()) : "object" == typeof f && f.stop()
            }, m.init = function() {
                m.build_markup(), s.timer && (f = m.create_timer(), f.start()), p = new l(_), "slide" === s.animation && (p = new o(_)), c.on("click", "." + s.next_class, m.next), c.on("click", "." + s.prev_class, m.prev), c.on("click", "[data-orbit-slide]", m.link_bullet), c.on("click", m.toggle_timer), c.on("touchstart.fndtn.orbit", function(t) {
                    t.touches || (t = t.originalEvent);
                    var e = {
                        start_page_x: t.touches[0].pageX,
                        start_page_y: t.touches[0].pageY,
                        start_time: (new Date).getTime(),
                        delta_x: 0,
                        is_scrolling: i
                    };
                    c.data("swipe-transition", e), t.stopPropagation()
                }).on("touchmove.fndtn.orbit", function(t) {
                    if (t.touches || (t = t.originalEvent), !(t.touches.length > 1 || t.scale && 1 !== t.scale)) {
                        var e = c.data("swipe-transition");
                        if ("undefined" == typeof e && (e = {}), e.delta_x = t.touches[0].pageX - e.start_page_x, "undefined" == typeof e.is_scrolling && (e.is_scrolling = !! (e.is_scrolling || Math.abs(e.delta_x) < Math.abs(t.touches[0].pageY - e.start_page_y))), !e.is_scrolling && !e.active) {
                            t.preventDefault();
                            var n = e.delta_x < 0 ? g + 1 : g - 1;
                            e.active = !0, m._goto(n)
                        }
                    }
                }).on("touchend.fndtn.orbit", function(t) {
                    c.data("swipe-transition", {}), t.stopPropagation()
                }).on("mouseenter.fndtn.orbit", function() {
                    s.timer && s.pause_on_hover && m.stop_timer()
                }).on("mouseleave.fndtn.orbit", function() {
                    s.timer && s.resume_on_mouseout && f.start()
                }), t(n).on("click", "[data-orbit-link]", m.link_custom), t(e).on("resize", m.compute_dimensions), t(e).on("load", m.compute_dimensions), _.trigger("orbit:ready")
            }, m.init()
        }, r = function(t, e, n) {
            var i, a, s = this,
                r = e.timer_speed,
                o = t.find("." + e.timer_progress_class),
                l = -1;
            this.update_progress = function(t) {
                var e = o.clone();
                e.attr("style", ""), e.css("width", t + "%"), o.replaceWith(e), o = e
            }, this.restart = function() {
                clearTimeout(a), t.addClass(e.timer_paused_class), l = -1, s.update_progress(0)
            }, this.start = function() {
                return t.hasClass(e.timer_paused_class) ? (l = -1 === l ? r : l, t.removeClass(e.timer_paused_class), i = (new Date).getTime(), o.animate({
                    width: "100%"
                }, l, "linear"), a = setTimeout(function() {
                    s.restart(), n()
                }, l), t.trigger("orbit:timer-started"), void 0) : !0
            }, this.stop = function() {
                if (t.hasClass(e.timer_paused_class)) return !0;
                clearTimeout(a), t.addClass(e.timer_paused_class);
                var n = (new Date).getTime();
                l -= n - i;
                var o = 100 - 100 * (l / r);
                s.update_progress(o), t.trigger("orbit:timer-stopped")
            }
        }, o = function() {
            var e = 400,
                n = 1 === t("html[dir=rtl]").length,
                i = n ? "marginRight" : "marginLeft";
            this.next = function(t, n, a) {
                n.animate({
                    margin: "0%"
                }, e, "linear", function() {
                    t.css(i, "100%"), a()
                })
            }, this.prev = function(t, n, a) {
                n.css(i, "-100%"), n.animate({
                    margin: "0%"
                }, e, "linear", function() {
                    t.css(i, "100%"), a()
                })
            }
        }, l = function() {
            var t = 250;
            this.next = function(e, n, i) {
                n.css({
                    marginLeft: "0%",
                    opacity: "0.01"
                }), n.animate({
                    opacity: "1"
                }, t, "linear", function() {
                    e.css("marginLeft", "100%"), i()
                })
            }, this.prev = function(e, n, i) {
                n.css({
                    marginLeft: "0%",
                    opacity: "0.01"
                }), n.animate({
                    opacity: "1"
                }, t, "linear", function() {
                    e.css("marginLeft", "100%"), i()
                })
            }
        };
    Foundation.libs = Foundation.libs || {}, Foundation.libs.orbit = {
        name: "orbit",
        version: "4.3.1",
        settings: {
            animation: "slide",
            timer_speed: 1e4,
            pause_on_hover: !0,
            resume_on_mouseout: !1,
            animation_speed: 500,
            stack_on_small: !1,
            navigation_arrows: !0,
            slide_number: !0,
            container_class: "orbit-container",
            stack_on_small_class: "orbit-stack-on-small",
            next_class: "orbit-next",
            prev_class: "orbit-prev",
            timer_container_class: "orbit-timer",
            timer_paused_class: "paused",
            timer_progress_class: "orbit-progress",
            slides_container_class: "orbit-slides-container",
            bullets_container_class: "orbit-bullets",
            bullets_active_class: "active",
            slide_number_class: "orbit-slide-number",
            caption_class: "orbit-caption",
            active_slide_class: "active",
            orbit_transition_class: "orbit-transitioning",
            bullets: !0,
            timer: !0,
            variable_height: !1,
            before_slide_change: a,
            after_slide_change: a
        },
        init: function(e, n) {
            var i = this;
            if (Foundation.inherit(i, "data_options"), "object" == typeof n && t.extend(!0, i.settings, n), t(e).is("[data-orbit]")) {
                var a = t(e),
                    r = i.data_options(a);
                new s(a, t.extend({}, i.settings, r))
            }
            t("[data-orbit]", e).each(function(e, n) {
                var a = t(n),
                    r = i.data_options(a);
                new s(a, t.extend({}, i.settings, r))
            })
        }
    }
}(Foundation.zj, this, this.document),
function(t) {
    "use strict";

    function e() {
        function e() {
            var t = "/blog/feed-entries",
                e = '<div class="row"><div class="pane"><h6><span class="date">{{DATE}}:</span> {{TITLE}}</h6><p>{{DESC}}</p><p><a href="{{URL}}">Read more&hellip;</a></p></div></div>',
                n = 4,
                i = $(".sub .updates");
            $.get(t, null, function(t) {
                $(t).find("item").slice(0, n).each(function() {
                    var t = $(this),
                        n = t.children("title").text(),
                        a = t.children("pubDate").text(),
                        s = $("<div>" + t.children("description").text() + "</div>").text(),
                        r = t.children("link").text(),
                        o = e,
                        l = new Date(a);
                    l = l.getMonth() + 1 + "/" + l.getDate() + "/" + (l.getFullYear() + "").substr(2), o = o.replace("{{DATE}}", l), o = o.replace("{{TITLE}}", n), o = o.replace("{{DESC}}", s.substr(0, 150)), o = o.replace("{{URL}}", r), i.append(o)
                })
            })
        }

        function n() {
            var t = $(".orbit-slides-container .bg");
            t.each(function() {
                var t = $(this),
                    e = 1920 / 1080,
                    n = t.closest("li"),
                    i = n.width() / n.height(),
                    a = 0;
                e > i ? t.removeClass("wide").addClass("tall") : t.removeClass("tall").addClass("wide"), a = t.width(), t.css({
                    "margin-top": -a / e / 2,
                    "margin-left": -a / 2
                })
            })
        }
        var i = {};
        return i.init = function() {
            var i = $(t);
            e(), i.resize(n), i.load(n), n()
        }, i
    }
    t.mashery = t.mashery || {}, t.mashery.Home = e
}(window),
function(t) {
    "use strict";

    function e() {
        var t = {};
        return t.init = function() {
            $(".section").each(function() {
                var t = $(this),
                    e = t.children("h2"),
                    n = t.find("abbr").attr("title"),
                    i = t.children(".section-body"),
                    a = i.find("img").first();
                e.prepend('<span class="date">' + n.substr(0, n.indexOf(" ")) + ":</span> "), a.length ? (t.addClass("has-image"), t.prepend(a)) : t.addClass("no-image"), i.html("<p>" + i.text() + "</p>"), i.append('<p><a class="invert" href="' + e.children("a").attr("href") + '">Read more...</a></p>')
            })
        }, t
    }
    t.mashery = t.mashery || {}, t.mashery.Blog = e
}(window),
function() {
    removeStyleSheet("IE");
    var t = $(".header").wrapInner('<div class="top-bar row"><div class="small-12 column"></div></div>').children().children();
    t.children(".branding").addClass("title-area").append('<div class="toggle-topbar menu-icon"><a href="#"><span>menu</span></a></div>'), t.prepend($(".user").detach());
    var e = $('<div class="top-bar-section"></div>').append($(".local").remove().children()).append('<ul class="search"><li class="search">' + t.children(".search").addClass("left").remove().html() + "</li></ul>").append('<ul class="mashery-made"><li class="mashery-made"><a href="http://mashery.com">Mashery Made</a></li></ul>');
    t.append(e), $(".content").before($(".banner").detach()), $(".orbit").attr("data-orbit", ""), $("html").addClass("dom-ready")
}();
var Application = function(t) {
    "use strict";

    function e() {
        a.css("min-height", o.height() - s.outerHeight() - r.outerHeight())
    }
    var n = t.mashery,
        i = {}, a = $(".main"),
        s = $(".header"),
        r = $(".footer"),
        o = $(window),
        l = {
            "/": new n.Home,
            "/blog": new n.Blog
        };
    return i.init = function() {
        $(document).foundation("orbit", {
            animation: "slide",
            timer_speed: 1e4,
            pause_on_hover: !0,
            resume_on_mouseout: !0,
            animation_speed: 500,
            stack_on_small: !1,
            navigation_arrows: !1,
            slide_number: !1,
            bullets: !0,
            timer: !1,
            variable_height: !0
        });
        for (var t in l)
            if (t == window.location.pathname) {
                l[t].init();
                break
            }
        o.resize(e), e(), $(".toggle-topbar").click(function() {
            $(this).closest(".top-bar").toggleClass("expanded")
        })
    }, i
}(window);
$(document).ready(function() {
    Application.init()
});

$("div#header div.small-12").addClass("no-paddings");
$("#page-apps.register .section-body table").first().addClass("apps-reg");
$("div#header").append('<div class="header-seperator"></div>');

(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-42588913-1', 'auto');
ga('send', 'pageview');
