var libFuncName = null;
if ("undefined" == typeof jQuery && "undefined" == typeof Zepto && "function" == typeof $) libFuncName = $;
else if ("function" == typeof jQuery) libFuncName = jQuery;
else {
  if ("function" != typeof Zepto) throw new TypeError;
  libFuncName = Zepto
}! function(t, e) {
  "use strict";
  Array.prototype.filter || (Array.prototype.filter = function(t) {
    if (null == this) throw new TypeError;
    var e = Object(this),
    i = e.length >>> 0;
    if ("function" == typeof t) {
      for (var n = [], o = arguments[1], s = 0; i > s; s++)
        if (s in e) {
          var a = e[s];
          t && t.call(o, a, s, e) && n.push(a)
        }
        return n
      }
    }), Function.prototype.bind || (Function.prototype.bind = function(t) {
      if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      var e = Array.prototype.slice.call(arguments, 1),
      i = this,
      n = function() {},
      o = function() {
        return i.apply(this instanceof n && t ? this : t, e.concat(Array.prototype.slice.call(arguments)))
      };
      return n.prototype = this.prototype, o.prototype = new n, o
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(t) {
      if (null == this) throw new TypeError;
      var e = Object(this),
      i = e.length >>> 0;
      if (0 === i) return -1;
      var n = 0;
      if (arguments.length > 1 && (n = Number(arguments[1]), n != n ? n = 0 : 0 != n && 1 / 0 != n && n != -1 / 0 && (n = (n > 0 || -1) * Math.floor(Math.abs(n)))), n >= i) return -1;
      for (var o = n >= 0 ? n : Math.max(i - Math.abs(n), 0); i > o; o++)
        if (o in e && e[o] === t) return o;
      return -1
    }), t.fn.stop = t.fn.stop || function() {
      return this
    }, e.Foundation = {
      name: "Foundation",
      version: "4.1.5",
      cache: {},
      init: function(e, i, n, o, s, a) {
        var r, l = [e, n, o, s],
        c = [],
        a = a || !1;
        if (a && (this.nc = a), this.rtl = /rtl/i.test(t("html").attr("dir")), this.scope = e || this.scope, i && "string" == typeof i) {
          if (/off/i.test(i)) return this.off();
          if (r = i.split(" "), r.length > 0)
            for (var d = r.length - 1; d >= 0; d--) c.push(this.init_lib(r[d], l))
          } else
        for (var u in this.libs) c.push(this.init_lib(u, l));
          return "function" == typeof i && l.unshift(i), this.response_obj(c, l)
      },
      response_obj: function(t, e) {
        for (var i = 0, n = e.length; n > i; i++)
          if ("function" == typeof e[i]) return e[i]({
            errors: t.filter(function(t) {
              return "string" == typeof t ? t : void 0
            })
          });
            return t
          },
          init_lib: function(t, e) {
            return this.trap(function() {
              return this.libs.hasOwnProperty(t) ? (this.patch(this.libs[t]), this.libs[t].init.apply(this.libs[t], e)) : void 0
            }.bind(this), t)
          },
          trap: function(t, e) {
            if (!this.nc) try {
              return t()
            } catch (i) {
              return this.error({
                name: e,
                message: "could not be initialized",
                more: i.name + " " + i.message
              })
            }
            return t()
          },
          patch: function(t) {
            this.fix_outer(t), t.scope = this.scope, t.rtl = this.rtl
          },
          inherit: function(t, e) {
            for (var i = e.split(" "), n = i.length - 1; n >= 0; n--) this.lib_methods.hasOwnProperty(i[n]) && (this.libs[t.name][i[n]] = this.lib_methods[i[n]])
          },
        random_str: function(t) {
          var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");
          t || (t = Math.floor(Math.random() * e.length));
          for (var i = "", n = 0; t > n; n++) i += e[Math.floor(Math.random() * e.length)];
            return i
        },
        libs: {},
        lib_methods: {
          set_data: function(t, e) {
            var i = [this.name, +new Date, Foundation.random_str(5)].join("-");
            return Foundation.cache[i] = e, t.attr("data-" + this.name + "-id", i), e
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
            var i = null;
            return function() {
              var n = this,
              o = arguments;
              clearTimeout(i), i = setTimeout(function() {
                t.apply(n, o)
              }, e)
            }
          },
          data_options: function(e) {
            function i(t) {
              return !isNaN(t - 0) && null !== t && "" !== t && t !== !1 && t !== !0
            }

            function n(e) {
              return "string" == typeof e ? t.trim(e) : e
            }
            var o, s, a = {},
            r = (e.attr("data-options") || ":").split(";"),
            l = r.length;
            for (o = l - 1; o >= 0; o--) s = r[o].split(":"), /true/i.test(s[1]) && (s[1] = !0), /false/i.test(s[1]) && (s[1] = !1), i(s[1]) && (s[1] = parseInt(s[1], 10)), 2 === s.length && s[0].length > 0 && (a[n(s[0])] = n(s[1]));
              return a
          },
          delay: function(t, e) {
            return setTimeout(t, e)
          },
          scrollTo: function(i, n, o) {
            if (!(0 > o)) {
              var s = n - t(e).scrollTop(),
              a = 10 * (s / o);
              this.scrollToTimerCache = setTimeout(function() {
                isNaN(parseInt(a, 10)) || (e.scrollTo(0, t(e).scrollTop() + a), this.scrollTo(i, n, o - 10))
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
          }, t.outerWidth = function(t) {
            return "function" == typeof Zepto ? t.width() : "undefined" != typeof bool ? t.outerWidth(bool) : t.outerWidth()
          }
        },
        error: function(t) {
          return t.name + " " + t.message + "; " + t.more
        },
        off: function() {
          return t(this.scope).off(".fndtn"), t(e).off(".fndtn"), !0
        },
        zj: function() {
          try {
            return Zepto
          } catch (t) {
            return jQuery
          }
        }()
      }, t.fn.foundation = function() {
        var t = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
          return Foundation.init.apply(Foundation, [this].concat(t)), this
        })
      }
    }(libFuncName, this, this.document),
    function(t, e, i, n) {
      "use strict";
      Foundation.libs.forms = {
        name: "forms",
        version: "4.1.6",
        cache: {},
        settings: {
          disable_class: "no-custom",
          last_combo: null
        },
        init: function(e, i, n) {
          return "object" == typeof i && t.extend(!0, this.settings, i), "string" != typeof i ? (this.settings.init || this.events(), this.assemble(), this.settings.init) : this[i].call(this, n)
        },
        assemble: function() {
          t('form.custom input[type="radio"]', t(this.scope)).not('[data-customforms="disabled"]').each(this.append_custom_markup), t('form.custom input[type="checkbox"]', t(this.scope)).not('[data-customforms="disabled"]').each(this.append_custom_markup), t("form.custom select", t(this.scope)).not('[data-customforms="disabled"]').not("[multiple=multiple]").each(this.append_custom_select)
        },
        events: function() {
          var n = this;
          t(this.scope).on("click.fndtn.forms", "form.custom span.custom.checkbox", function(e) {
            e.preventDefault(), e.stopPropagation(), n.toggle_checkbox(t(this))
          }).on("click.fndtn.forms", "form.custom span.custom.radio", function(e) {
            e.preventDefault(), e.stopPropagation(), n.toggle_radio(t(this))
          }).on("change.fndtn.forms", 'form.custom select:not([data-customforms="disabled"])', function(e, i) {
            n.refresh_custom_select(t(this), i)
          }).on("click.fndtn.forms", "form.custom label", function(e) {
            if (t(e.target).is("label")) {
              var i, o, s = t("#" + n.escape(t(this).attr("for")) + ':not([data-customforms="disabled"])');
              0 !== s.length && ("checkbox" === s.attr("type") ? (e.preventDefault(), i = t(this).find("span.custom.checkbox"), 0 == i.length && (i = s.add(this).siblings("span.custom.checkbox").first()), n.toggle_checkbox(i)) : "radio" === s.attr("type") && (e.preventDefault(), o = t(this).find("span.custom.radio"), 0 == o.length && (o = s.add(this).siblings("span.custom.radio").first()), n.toggle_radio(o)))
            }
          }).on("click.fndtn.forms", "form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector", function(e) {
            var i = t(this),
            s = i.closest("div.custom.dropdown"),
            a = o(s, "select");
            return s.hasClass("open") || t(n.scope).trigger("click"), e.preventDefault(), !1 === a.is(":disabled") ? (s.toggleClass("open"), s.hasClass("open") ? t(n.scope).on("click.fndtn.forms.customdropdown", function() {
              s.removeClass("open"), t(n.scope).off(".fndtn.forms.customdropdown")
            }) : t(n.scope).on(".fndtn.forms.customdropdown"), !1) : void 0
          }).on("click.fndtn.forms touchend.fndtn.forms", "form.custom div.custom.dropdown li", function(e) {
            var i = t(this),
            n = i.closest("div.custom.dropdown"),
            s = o(n, "select"),
            a = 0;
            if (e.preventDefault(), e.stopPropagation(), !t(this).hasClass("disabled")) {
              t("div.dropdown").not(n).removeClass("open");
              var r = i.closest("ul").find("li.selected");
              r.removeClass("selected"), i.addClass("selected"), n.removeClass("open").find("a.current").text(i.text()), i.closest("ul").find("li").each(function(t) {
                i[0] == this && (a = t)
              }), s[0].selectedIndex = a, s.data("prevalue", r.html()), s.trigger("change")
            }
          }), t(e).on("keydown", function(e) {
            var n = (i.activeElement, Foundation.libs.forms),
            o = t(".custom.dropdown.open");
            if (o.length > 0) {
              if (e.preventDefault(), 13 === e.which && o.find("li.selected").trigger("click"), 27 === e.which && o.removeClass("open"), e.which >= 65 && e.which <= 90) {
                var s = n.go_to(o, e.which),
                a = o.find("li.selected");
                s && (a.removeClass("selected"), n.scrollTo(s.addClass("selected"), 300))
              }
              if (38 === e.which) {
                var a = o.find("li.selected"),
                r = a.prev(":not(.disabled)");
                r.length > 0 && (r.parent()[0].scrollTop = r.parent().scrollTop() - n.outerHeight(r), a.removeClass("selected"), r.addClass("selected"))
              } else if (40 === e.which) {
                var a = o.find("li.selected"),
                s = a.next(":not(.disabled)");
                s.length > 0 && (s.parent()[0].scrollTop = s.parent().scrollTop() + n.outerHeight(s), a.removeClass("selected"), s.addClass("selected"))
              }
            }
          }), this.settings.init = !0
},
go_to: function(t, e) {
  var i = t.find("li"),
  n = i.length;
  if (n > 0)
    for (var o = 0; n > o; o++) {
      var s = i.eq(o).text().charAt(0).toLowerCase();
      if (s === String.fromCharCode(e).toLowerCase()) return i.eq(o)
    }
},
scrollTo: function(t, e) {
  if (!(0 > e)) {
    var i = t.parent(),
    n = this.outerHeight(t),
    o = n * t.index() - i.scrollTop(),
    s = 10 * (o / e);
    this.scrollToTimerCache = setTimeout(function() {
      isNaN(parseInt(s, 10)) || (i[0].scrollTop = i.scrollTop() + s, this.scrollTo(t, e - 10))
    }.bind(this), 10)
  }
},
append_custom_markup: function(e, i) {
  var n = t(i),
  o = n.attr("type"),
  s = n.next("span.custom." + o);
  n.parent().hasClass("switch") || n.addClass("hidden-field"), 0 === s.length && (s = t('<span class="custom ' + o + '"></span>').insertAfter(n)), s.toggleClass("checked", n.is(":checked")), s.toggleClass("disabled", n.is(":disabled"))
},
append_custom_select: function(e, i) {
  var n, o = Foundation.libs.forms,
  s = t(i),
  a = s.next("div.custom.dropdown"),
  r = a.find("ul"),
  l = (a.find(".current"), a.find(".selector")),
  c = s.find("option"),
  d = c.filter(":selected"),
  u = s.attr("class") ? s.attr("class").split(" ") : [],
  p = 0,
  m = "",
  f = !1;
  if (!s.hasClass(o.settings.disable_class)) {
    if (0 === a.length) {
      var h = s.hasClass("small") ? "small" : s.hasClass("medium") ? "medium" : s.hasClass("large") ? "large" : s.hasClass("expand") ? "expand" : "";
      a = t('<div class="' + ["custom", "dropdown", h].concat(u).filter(function(t, e, i) {
        return "" == t ? !1 : i.indexOf(t) == e
      }).join(" ") + '"><a href="#" class="selector"></a><ul /></div>'), l = a.find(".selector"), r = a.find("ul"), m = c.map(function() {
        return "<li>" + t(this).html() + "</li>"
      }).get().join(""), r.append(m), f = a.prepend('<a href="#" class="current">' + d.html() + "</a>").find(".current"), s.after(a).addClass("hidden-field")
    } else m = c.map(function() {
      return "<li>" + t(this).html() + "</li>"
    }).get().join(""), r.html("").append(m);
    if (o.assign_id(s, a), a.toggleClass("disabled", s.is(":disabled")), n = r.find("li"), o.cache[a.data("id")] = n.length, c.each(function(e) {
      this.selected && (n.eq(e).addClass("selected"), f && f.html(t(this).html())), t(this).is(":disabled") && n.eq(e).addClass("disabled")
    }), !a.is(".small, .medium, .large, .expand")) {
      a.addClass("open");
      var o = Foundation.libs.forms;
      o.hidden_fix.adjust(r), p = o.outerWidth(n) > p ? o.outerWidth(n) : p, Foundation.libs.forms.hidden_fix.reset(), a.removeClass("open")
    }
  }
},
assign_id: function(t, e) {
  var i = [+new Date, Foundation.random_str(5)].join("-");
  t.attr("data-id", i), e.attr("data-id", i)
},
refresh_custom_select: function(e, i) {
  var n = this,
  o = 0,
  s = e.next(),
  a = e.find("option"),
  r = s.find("li");
  (r.length != this.cache[s.data("id")] || i) && (s.find("ul").html(""), a.each(function() {
    var e = t("<li>" + t(this).html() + "</li>");
    s.find("ul").append(e)
  }), a.each(function(e) {
    this.selected && (s.find("li").eq(e).addClass("selected"), s.find(".current").html(t(this).html())), t(this).is(":disabled") && s.find("li").eq(e).addClass("disabled")
  }), s.removeAttr("style").find("ul").removeAttr("style"), s.find("li").each(function() {
    s.addClass("open"), n.outerWidth(t(this)) > o && (o = n.outerWidth(t(this))), s.removeClass("open")
  }), r = s.find("li"), this.cache[s.data("id")] = r.length)
},
toggle_checkbox: function(t) {
  var e = t.prev(),
  i = e[0];
  !1 === e.is(":disabled") && (i.checked = i.checked ? !1 : !0, t.toggleClass("checked"), e.trigger("change"))
},
toggle_radio: function(t) {
  var e = t.prev(),
  i = e.closest("form.custom"),
  n = e[0];
  !1 === e.is(":disabled") && (i.find('input[type="radio"][name="' + this.escape(e.attr("name")) + '"]').next().not(t).removeClass("checked"), t.hasClass("checked") || t.toggleClass("checked"), n.checked = t.hasClass("checked"), e.trigger("change"))
},
escape: function(t) {
  return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
},
hidden_fix: {
  tmp: [],
  hidden: null,
  adjust: function(e) {
    var i = this;
    i.hidden = e.parents().andSelf().filter(":hidden"), i.hidden.each(function() {
      var e = t(this);
      i.tmp.push(e.attr("style")), e.css({
        visibility: "hidden",
        display: "block"
      })
    })
  },
  reset: function() {
    var e = this;
    e.hidden.each(function(i) {
      var o = t(this),
      s = e.tmp[i];
      s === n ? o.removeAttr("style") : o.attr("style", s)
    }), e.tmp = [], e.hidden = null
  }
},
off: function() {
  t(this.scope).off(".fndtn.forms")
}
};
var o = function(e, i) {
  for (var e = e.prev(); e.length;) {
    if (e.is(i)) return e;
    e = e.prev()
  }
  return t()
}
}(Foundation.zj, this, this.document),
function(t, e) {
  var i = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  t.fn.imagesLoaded = function(n) {
    function o() {
      var e = t(p),
      i = t(m);
      l && (m.length ? l.reject(d, e, i) : l.resolve(d)), t.isFunction(n) && n.call(r, d, e, i)
    }

    function s(t) {
      a(t.target, "error" === t.type)
    }

    function a(e, n) {
      e.src === i || -1 !== t.inArray(e, u) || (u.push(e), n ? m.push(e) : p.push(e), t.data(e, "imagesLoaded", {
        isBroken: n,
        src: e.src
      }), c && l.notifyWith(t(e), [n, d, t(p), t(m)]), d.length === u.length && (setTimeout(o), d.unbind(".imagesLoaded", s)))
    }
    var r = this,
    l = t.isFunction(t.Deferred) ? t.Deferred() : 0,
    c = t.isFunction(l.notify),
    d = r.find("img").add(r.filter("img")),
    u = [],
    p = [],
    m = [];
    return t.isPlainObject(n) && t.each(n, function(t, e) {
      "callback" === t ? n = e : l && l[t](e)
    }), d.length ? d.bind("load.imagesLoaded error.imagesLoaded", s).each(function(n, o) {
      var s = o.src,
      r = t.data(o, "imagesLoaded");
      r && r.src === s ? a(o, r.isBroken) : o.complete && o.naturalWidth !== e ? a(o, 0 === o.naturalWidth || 0 === o.naturalHeight) : (o.readyState || o.complete) && (o.src = i, o.src = s)
    }) : o(), l ? l.promise(r) : r
  }
}(jQuery),
function(t) {
  for (var e, i = ["Width", "Height"]; e = i.pop();) ! function(e, i) {
    t.fn[e] = e in new Image ? function() {
      return this[0][e]
    } : function() {
      var t, e, n = this[0];
      return "img" === n.tagName.toLowerCase() && (t = new Image, t.src = n.src, e = t[i]), e
    }
  }("natural" + e, e.toLowerCase())
}(jQuery),
function(t) {
  var e = {
    url: !1,
    callback: !1,
    target: !1,
    duration: 120,
    on: "mouseover",
    onZoomIn: !1,
    onZoomOut: !1
  };
  t.zoom = function(e, i, n) {
    var o, s, a, r, l, c = t(e).css("position");
    return t(e).css({
      position: /(absolute|fixed)/.test(c) ? c : "relative",
      overflow: "hidden"
    }), n.style.width = n.style.height = "", t(n).addClass("zoomImg").css({
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 0,
      width: n.width,
      height: n.height,
      border: "none",
      maxWidth: "none"
    }).appendTo(e), {
      init: function() {
        o = t(e).outerWidth(), s = t(e).outerHeight(), a = (n.width - o) / t(i).outerWidth(), r = (n.height - s) / t(i).outerHeight(), l = t(i).offset()
      },
      move: function(t) {
        var e = t.pageX - l.left,
        i = t.pageY - l.top;
        i = Math.max(Math.min(i, s), 0), e = Math.max(Math.min(e, o), 0), n.style.left = e * -a + "px", n.style.top = i * -r + "px"
      }
    }
  }, t.fn.zoom = function(i) {
    return this.each(function() {
      var n, o = t.extend({}, e, i || {}),
      s = o.target || this,
      a = this,
      r = document.createElement("img"),
      l = t(r),
      c = "mousemove.zoom",
      d = !1;
      (o.url || (n = t(a).find("img"), n[0] && (o.url = n.data("src") || n.attr("src")), o.url)) && (r.onload = function() {
        function e(e) {
          n.init(), n.move(e), l.stop().fadeTo(t.support.opacity ? o.duration : 0, 1, t.isFunction(o.onZoomIn) ? o.onZoomIn.call(r) : !1)
        }

        function i() {
          l.stop().fadeTo(o.duration, 0, t.isFunction(o.onZoomOut) ? o.onZoomOut.call(r) : !1)
        }
        var n = t.zoom(s, a, r);
        "grab" === o.on ? t(a).on("mousedown.zoom", function(o) {
          1 === o.which && (t(document).one("mouseup.zoom", function() {
            i(), t(document).off(c, n.move)
          }), e(o), t(document).on(c, n.move), o.preventDefault())
        }) : "click" === o.on ? t(a).on("click.zoom", function(o) {
          return d ? void 0 : (d = !0, e(o), t(document).on(c, n.move), t(document).one("click.zoom", function() {
            i(), d = !1, t(document).off(c, n.move)
          }), !1)
        }) : "toggle" === o.on ? t(a).on("click.zoom", function(t) {
          d ? i() : e(t), d = !d
        }) : (n.init(), t(a).on("mouseenter.zoom", e).on("mouseleave.zoom", i).on(c, n.move)), t.isFunction(o.callback) && o.callback.call(r)
      }, r.src = o.url, t(a).one("zoom.destroy", function() {
        t(a).off(".zoom"), l.remove()
      }))
})
}, t.fn.zoom.defaults = e
}(window.jQuery), window.matchMedia || (window.matchMedia = function() {
  "use strict";
  var t = window.styleMedia || window.media;
  if (!t) {
    var e = document.createElement("style"),
    i = document.getElementsByTagName("script")[0],
    n = null;
    e.type = "text/css", e.id = "matchmediajs-test", i.parentNode.insertBefore(e, i), n = "getComputedStyle" in window && window.getComputedStyle(e, null) || e.currentStyle, t = {
      matchMedium: function(t) {
        var i = "@media " + t + "{ #matchmediajs-test { width: 1px; } }";
        return e.styleSheet ? e.styleSheet.cssText = i : e.textContent = i, "1px" === n.width
      }
    }
  }
  return function(e) {
    return {
      matches: t.matchMedium(e || "all"),
      media: e || "all"
    }
  }
}()), "function" != typeof Object.create && (Object.create = function(t) {
  function e() {}
  return e.prototype = t, new e
}),
function(t, e, i, n) {
  var o = {
    init: function(e, i) {
      var n = this;
      n.$elem = t(i), n.options = t.extend({}, t.fn.owlCarousel.options, n.$elem.data(), e), n.userOptions = e, n.loadContent()
    },
    loadContent: function() {
      function e(t) {
        if ("function" == typeof i.options.jsonSuccess) i.options.jsonSuccess.apply(this, [t]);
        else {
          var e = "";
          for (var n in t.owl) e += t.owl[n].item;
            i.$elem.html(e)
        }
        i.logIn()
      }
      var i = this;
      if ("function" == typeof i.options.beforeInit && i.options.beforeInit.apply(this, [i.$elem]), "string" == typeof i.options.jsonPath) {
        var n = i.options.jsonPath;
        t.getJSON(n, e)
      } else i.logIn()
    },
    logIn: function() {
      var t = this;
      t.$elem.data("owl-originalStyles", t.$elem.attr("style")).data("owl-originalClasses", t.$elem.attr("class")), t.$elem.css({
        opacity: 0
      }), t.orignalItems = t.options.items, t.checkBrowser(), t.wrapperWidth = 0, t.checkVisible, t.setVars()
    },
    setVars: function() {
      var t = this;
      return 0 === t.$elem.children().length ? !1 : (t.baseClass(), t.eventTypes(), t.$userItems = t.$elem.children(), t.itemsAmount = t.$userItems.length, t.wrapItems(), t.$owlItems = t.$elem.find(".owl-item"), t.$owlWrapper = t.$elem.find(".owl-wrapper"), t.playDirection = "next", t.prevItem = 0, t.prevArr = [0], t.currentItem = 0, t.customEvents(), void t.onStartup())
    },
    onStartup: function() {
      var t = this;
      t.updateItems(), t.calculateAll(), t.buildControls(), t.updateControls(), t.response(), t.moveEvents(), t.stopOnHover(), t.owlStatus(), t.options.transitionStyle !== !1 && t.transitionTypes(t.options.transitionStyle), t.options.autoPlay === !0 && (t.options.autoPlay = 5e3), t.play(), t.$elem.find(".owl-wrapper").css("display", "block"), t.$elem.is(":visible") ? t.$elem.css("opacity", 1) : t.watchVisibility(), t.onstartup = !1, t.eachMoveUpdate(), "function" == typeof t.options.afterInit && t.options.afterInit.apply(this, [t.$elem])
    },
    eachMoveUpdate: function() {
      var t = this;
      t.options.lazyLoad === !0 && t.lazyLoad(), t.options.autoHeight === !0 && t.autoHeight(), t.onVisibleItems(), "function" == typeof t.options.afterAction && t.options.afterAction.apply(this, [t.$elem])
    },
    updateVars: function() {
      var t = this;
      "function" == typeof t.options.beforeUpdate && t.options.beforeUpdate.apply(this, [t.$elem]), t.watchVisibility(), t.updateItems(), t.calculateAll(), t.updatePosition(), t.updateControls(), t.eachMoveUpdate(), "function" == typeof t.options.afterUpdate && t.options.afterUpdate.apply(this, [t.$elem])
    },
    reload: function() {
      var t = this;
      setTimeout(function() {
        t.updateVars()
      }, 0)
    },
    watchVisibility: function() {
      var t = this;
      return t.$elem.is(":visible") !== !1 ? !1 : (t.$elem.css({
        opacity: 0
      }), clearInterval(t.autoPlayInterval), clearInterval(t.checkVisible), void(t.checkVisible = setInterval(function() {
        t.$elem.is(":visible") && (t.reload(), t.$elem.animate({
          opacity: 1
        }, 200), clearInterval(t.checkVisible))
      }, 500)))
    },
    wrapItems: function() {
      var t = this;
      t.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), t.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), t.wrapperOuter = t.$elem.find(".owl-wrapper-outer"), t.$elem.css("display", "block")
    },
    baseClass: function() {
      var t = this,
      e = t.$elem.hasClass(t.options.baseClass),
      i = t.$elem.hasClass(t.options.theme);
      e || t.$elem.addClass(t.options.baseClass), i || t.$elem.addClass(t.options.theme)
    },
    updateItems: function() {
      var e = this;
      if (e.options.responsive === !1) return !1;
      if (e.options.singleItem === !0) return e.options.items = e.orignalItems = 1, e.options.itemsCustom = !1, e.options.itemsDesktop = !1, e.options.itemsDesktopSmall = !1, e.options.itemsTablet = !1, e.options.itemsTabletSmall = !1, e.options.itemsMobile = !1, !1;
      var i = t(e.options.responsiveBaseWidth).width();
      if (i > (e.options.itemsDesktop[0] || e.orignalItems) && (e.options.items = e.orignalItems), "undefined" != typeof e.options.itemsCustom && e.options.itemsCustom !== !1) {
        e.options.itemsCustom.sort(function(t, e) {
          return t[0] - e[0]
        });
        for (var n in e.options.itemsCustom) "undefined" != typeof e.options.itemsCustom[n] && e.options.itemsCustom[n][0] <= i && (e.options.items = e.options.itemsCustom[n][1])
      } else i <= e.options.itemsDesktop[0] && e.options.itemsDesktop !== !1 && (e.options.items = e.options.itemsDesktop[1]), i <= e.options.itemsDesktopSmall[0] && e.options.itemsDesktopSmall !== !1 && (e.options.items = e.options.itemsDesktopSmall[1]), i <= e.options.itemsTablet[0] && e.options.itemsTablet !== !1 && (e.options.items = e.options.itemsTablet[1]), i <= e.options.itemsTabletSmall[0] && e.options.itemsTabletSmall !== !1 && (e.options.items = e.options.itemsTabletSmall[1]), i <= e.options.itemsMobile[0] && e.options.itemsMobile !== !1 && (e.options.items = e.options.itemsMobile[1]);
    e.options.items > e.itemsAmount && e.options.itemsScaleUp === !0 && (e.options.items = e.itemsAmount)
  },
  response: function() {
    var i, n = this;
    if (n.options.responsive !== !0) return !1;
    var o = t(e).width();
    n.resizer = function() {
      t(e).width() !== o && (n.options.autoPlay !== !1 && clearInterval(n.autoPlayInterval), clearTimeout(i), i = setTimeout(function() {
        o = t(e).width(), n.updateVars()
      }, n.options.responsiveRefreshRate))
    }, t(e).resize(n.resizer)
  },
  updatePosition: function() {
    var t = this;
    t.jumpTo(t.currentItem), t.options.autoPlay !== !1 && t.checkAp()
  },
  appendItemsSizes: function() {
    var e = this,
    i = 0,
    n = e.itemsAmount - e.options.items;
    e.$owlItems.each(function(o) {
      var s = t(this);
      s.css({
        width: e.itemWidth
      }).data("owl-item", Number(o)), (0 === o % e.options.items || o === n) && (o > n || (i += 1)), s.data("owl-roundPages", i)
    })
  },
  appendWrapperSizes: function() {
    var t = this,
    e = 0,
    e = t.$owlItems.length * t.itemWidth;
    t.$owlWrapper.css({
      width: 2 * e,
      left: 0
    }), t.appendItemsSizes()
  },
  calculateAll: function() {
    var t = this;
    t.calculateWidth(), t.appendWrapperSizes(), t.loops(), t.max()
  },
  calculateWidth: function() {
    var t = this;
    t.itemWidth = Math.round(t.$elem.width() / t.options.items)
  },
  max: function() {
    var t = this,
    e = -1 * (t.itemsAmount * t.itemWidth - t.options.items * t.itemWidth);
    return t.options.items > t.itemsAmount ? (t.maximumItem = 0, e = 0, t.maximumPixels = 0) : (t.maximumItem = t.itemsAmount - t.options.items, t.maximumPixels = e), e
  },
  min: function() {
    return 0
  },
  loops: function() {
    var e = this;
    e.positionsInArray = [0], e.pagesInArray = [];
    for (var i = 0, n = 0, o = 0; o < e.itemsAmount; o++)
      if (n += e.itemWidth, e.positionsInArray.push(-n), e.options.scrollPerPage === !0) {
        var s = t(e.$owlItems[o]),
        a = s.data("owl-roundPages");
        a !== i && (e.pagesInArray[i] = e.positionsInArray[o], i = a)
      }
    },
    buildControls: function() {
      var e = this;
      (e.options.navigation === !0 || e.options.pagination === !0) && (e.owlControls = t('<div class="owl-controls"/>').toggleClass("clickable", !e.browser.isTouch).appendTo(e.$elem)), e.options.pagination === !0 && e.buildPagination(), e.options.navigation === !0 && e.buildButtons()
    },
    buildButtons: function() {
      var e = this,
      i = t('<div class="owl-buttons"/>');
      e.owlControls.append(i), e.buttonPrev = t("<div/>", {
        "class": "owl-prev",
        html: e.options.navigationText[0] || ""
      }), e.buttonNext = t("<div/>", {
        "class": "owl-next",
        html: e.options.navigationText[1] || ""
      }), i.append(e.buttonPrev).append(e.buttonNext), i.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(t) {
        t.preventDefault()
      }), i.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(i) {
        i.preventDefault(), t(this).hasClass("owl-next") ? e.next() : e.prev()
      })
    },
    buildPagination: function() {
      var e = this;
      e.paginationWrapper = t('<div class="owl-pagination"/>'), e.owlControls.append(e.paginationWrapper), e.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(i) {
        i.preventDefault(), Number(t(this).data("owl-page")) !== e.currentItem && e.goTo(Number(t(this).data("owl-page")), !0)
      })
    },
    updatePagination: function() {
      var e = this;
      if (e.options.pagination === !1) return !1;
      e.paginationWrapper.html("");
      for (var i = 0, n = e.itemsAmount - e.itemsAmount % e.options.items, o = 0; o < e.itemsAmount; o++)
        if (0 === o % e.options.items) {
          if (i += 1, n === o) var s = e.itemsAmount - e.options.items;
          var a = t("<div/>", {
            "class": "owl-page"
          }),
          r = t("<span></span>", {
            text: e.options.paginationNumbers === !0 ? i : "",
            "class": e.options.paginationNumbers === !0 ? "owl-numbers" : ""
          });
          a.append(r), a.data("owl-page", n === o ? s : o), a.data("owl-roundPages", i), e.paginationWrapper.append(a)
        }
        e.checkPagination()
      },
      checkPagination: function() {
        var e = this;
        return e.options.pagination === !1 ? !1 : void e.paginationWrapper.find(".owl-page").each(function() {
          t(this).data("owl-roundPages") === t(e.$owlItems[e.currentItem]).data("owl-roundPages") && (e.paginationWrapper.find(".owl-page").removeClass("active"), t(this).addClass("active"))
        })
      },
      checkNavigation: function() {
        var t = this;
        return t.options.navigation === !1 ? !1 : void(t.options.rewindNav === !1 && (0 === t.currentItem && 0 === t.maximumItem ? (t.buttonPrev.addClass("disabled"), t.buttonNext.addClass("disabled")) : 0 === t.currentItem && 0 !== t.maximumItem ? (t.buttonPrev.addClass("disabled"), t.buttonNext.removeClass("disabled")) : t.currentItem === t.maximumItem ? (t.buttonPrev.removeClass("disabled"), t.buttonNext.addClass("disabled")) : 0 !== t.currentItem && t.currentItem !== t.maximumItem && (t.buttonPrev.removeClass("disabled"), t.buttonNext.removeClass("disabled"))))
      },
      updateControls: function() {
        var t = this;
        t.updatePagination(), t.checkNavigation(), t.owlControls && (t.options.items >= t.itemsAmount ? t.owlControls.hide() : t.owlControls.show())
      },
      destroyControls: function() {
        var t = this;
        t.owlControls && t.owlControls.remove()
      },
      next: function(t) {
        var e = this;
        if (e.isTransition) return !1;
        if (e.currentItem += e.options.scrollPerPage === !0 ? e.options.items : 1, e.currentItem > e.maximumItem + (1 == e.options.scrollPerPage ? e.options.items - 1 : 0)) {
          if (e.options.rewindNav !== !0) return e.currentItem = e.maximumItem, !1;
          e.currentItem = 0, t = "rewind"
        }
        e.goTo(e.currentItem, t)
      },
      prev: function(t) {
        var e = this;
        if (e.isTransition) return !1;
        if (e.options.scrollPerPage === !0 && e.currentItem > 0 && e.currentItem < e.options.items ? e.currentItem = 0 : e.currentItem -= e.options.scrollPerPage === !0 ? e.options.items : 1, e.currentItem < 0) {
          if (e.options.rewindNav !== !0) return e.currentItem = 0, !1;
          e.currentItem = e.maximumItem, t = "rewind"
        }
        e.goTo(e.currentItem, t)
      },
      goTo: function(t, e, i) {
        var n = this;
        if (n.isTransition) return !1;
        if ("function" == typeof n.options.beforeMove && n.options.beforeMove.apply(this, [n.$elem]), t >= n.maximumItem ? t = n.maximumItem : 0 >= t && (t = 0), n.currentItem = n.owl.currentItem = t, n.options.transitionStyle !== !1 && "drag" !== i && 1 === n.options.items && n.browser.support3d === !0) return n.swapSpeed(0), n.browser.support3d === !0 ? n.transition3d(n.positionsInArray[t]) : n.css2slide(n.positionsInArray[t], 1), n.afterGo(), n.singleItemTransition(), !1;
        var o = n.positionsInArray[t];
        n.browser.support3d === !0 ? (n.isCss3Finish = !1, e === !0 ? (n.swapSpeed("paginationSpeed"), setTimeout(function() {
          n.isCss3Finish = !0
        }, n.options.paginationSpeed)) : "rewind" === e ? (n.swapSpeed(n.options.rewindSpeed), setTimeout(function() {
          n.isCss3Finish = !0
        }, n.options.rewindSpeed)) : (n.swapSpeed("slideSpeed"), setTimeout(function() {
          n.isCss3Finish = !0
        }, n.options.slideSpeed)), n.transition3d(o)) : e === !0 ? n.css2slide(o, n.options.paginationSpeed) : "rewind" === e ? n.css2slide(o, n.options.rewindSpeed) : n.css2slide(o, n.options.slideSpeed), n.afterGo()
      },
      jumpTo: function(t) {
        var e = this;
        "function" == typeof e.options.beforeMove && e.options.beforeMove.apply(this, [e.$elem]), t >= e.maximumItem || -1 === t ? t = e.maximumItem : 0 >= t && (t = 0), e.swapSpeed(0), e.browser.support3d === !0 ? e.transition3d(e.positionsInArray[t]) : e.css2slide(e.positionsInArray[t], 1), e.currentItem = e.owl.currentItem = t, e.afterGo()
      },
      afterGo: function() {
        var t = this;
        t.prevArr.push(t.currentItem), t.prevItem = t.owl.prevItem = t.prevArr[t.prevArr.length - 2], t.prevArr.shift(0), t.prevItem !== t.currentItem && (t.checkPagination(), t.checkNavigation(), t.eachMoveUpdate(), t.options.autoPlay !== !1 && t.checkAp()), "function" == typeof t.options.afterMove && t.prevItem !== t.currentItem && t.options.afterMove.apply(this, [t.$elem])
      },
      stop: function() {
        var t = this;
        t.apStatus = "stop", clearInterval(t.autoPlayInterval)
      },
      checkAp: function() {
        var t = this;
        "stop" !== t.apStatus && t.play()
      },
      play: function() {
        var t = this;
        return t.apStatus = "play", t.options.autoPlay === !1 ? !1 : (clearInterval(t.autoPlayInterval), void(t.autoPlayInterval = setInterval(function() {
          t.next(!0)
        }, t.options.autoPlay)))
      },
      swapSpeed: function(t) {
        var e = this;
        "slideSpeed" === t ? e.$owlWrapper.css(e.addCssSpeed(e.options.slideSpeed)) : "paginationSpeed" === t ? e.$owlWrapper.css(e.addCssSpeed(e.options.paginationSpeed)) : "string" != typeof t && e.$owlWrapper.css(e.addCssSpeed(t))
      },
      addCssSpeed: function(t) {
        return {
          "-webkit-transition": "all " + t + "ms ease",
          "-moz-transition": "all " + t + "ms ease",
          "-o-transition": "all " + t + "ms ease",
          transition: "all " + t + "ms ease"
        }
      },
      removeTransition: function() {
        return {
          "-webkit-transition": "",
          "-moz-transition": "",
          "-o-transition": "",
          transition: ""
        }
      },
      doTranslate: function(t) {
        return {
          "-webkit-transform": "translate3d(" + t + "px, 0px, 0px)",
          "-moz-transform": "translate3d(" + t + "px, 0px, 0px)",
          "-o-transform": "translate3d(" + t + "px, 0px, 0px)",
          "-ms-transform": "translate3d(" + t + "px, 0px, 0px)",
          transform: "translate3d(" + t + "px, 0px,0px)"
        }
      },
      transition3d: function(t) {
        var e = this;
        e.$owlWrapper.css(e.doTranslate(t))
      },
      css2move: function(t) {
        var e = this;
        e.$owlWrapper.css({
          left: t
        })
      },
      css2slide: function(t, e) {
        var i = this;
        i.isCssFinish = !1, i.$owlWrapper.stop(!0, !0).animate({
          left: t
        }, {
          duration: e || i.options.slideSpeed,
          complete: function() {
            i.isCssFinish = !0
          }
        })
      },
      checkBrowser: function() {
        var t = this,
        n = "translate3d(0px, 0px, 0px)",
        o = i.createElement("div");
        o.style.cssText = "  -moz-transform:" + n + "; -ms-transform:" + n + "; -o-transform:" + n + "; -webkit-transform:" + n + "; transform:" + n;
        var s = /translate3d\(0px, 0px, 0px\)/g,
        a = o.style.cssText.match(s),
        r = null !== a && 1 === a.length,
        l = "ontouchstart" in e || navigator.msMaxTouchPoints;
        t.browser = {
          support3d: r,
          isTouch: l
        }
      },
      moveEvents: function() {
        var t = this;
        (t.options.mouseDrag !== !1 || t.options.touchDrag !== !1) && (t.gestures(), t.disabledEvents())
      },
      eventTypes: function() {
        var t = this,
        e = ["s", "e", "x"];
        t.ev_types = {}, t.options.mouseDrag === !0 && t.options.touchDrag === !0 ? e = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : t.options.mouseDrag === !1 && t.options.touchDrag === !0 ? e = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : t.options.mouseDrag === !0 && t.options.touchDrag === !1 && (e = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), t.ev_types.start = e[0], t.ev_types.move = e[1], t.ev_types.end = e[2]
      },
      disabledEvents: function() {
        var e = this;
        e.$elem.on("dragstart.owl", function(t) {
          t.preventDefault()
        }), e.$elem.on("mousedown.disableTextSelect", function(e) {
          return t(e.target).is("input, textarea, select, option")
        })
      },
      gestures: function() {
        function o(t) {
          return t.touches ? {
            x: t.touches[0].pageX,
            y: t.touches[0].pageY
          } : t.pageX !== n ? {
            x: t.pageX,
            y: t.pageY
          } : {
            x: t.clientX,
            y: t.clientY
          }
        }

        function s(e) {
          "on" === e ? (t(i).on(c.ev_types.move, r), t(i).on(c.ev_types.end, l)) : "off" === e && (t(i).off(c.ev_types.move), t(i).off(c.ev_types.end))
        }

        function a(i) {
          var i = i.originalEvent || i || e.event;
          if (3 === i.which) return !1;
          if (!(c.itemsAmount <= c.options.items)) {
            if (c.isCssFinish === !1 && !c.options.dragBeforeAnimFinish) return !1;
            if (c.isCss3Finish === !1 && !c.options.dragBeforeAnimFinish) return !1;
            c.options.autoPlay !== !1 && clearInterval(c.autoPlayInterval), c.browser.isTouch === !0 || c.$owlWrapper.hasClass("grabbing") || c.$owlWrapper.addClass("grabbing"), c.newPosX = 0, c.newRelativeX = 0, t(this).css(c.removeTransition());
            var n = t(this).position();
            d.relativePos = n.left, d.offsetX = o(i).x - n.left, d.offsetY = o(i).y - n.top, s("on"), d.sliding = !1, d.targetElement = i.target || i.srcElement
          }
        }

        function r(n) {
          var n = n.originalEvent || n || e.event;
          c.newPosX = o(n).x - d.offsetX, c.newPosY = o(n).y - d.offsetY, c.newRelativeX = c.newPosX - d.relativePos, "function" == typeof c.options.startDragging && d.dragging !== !0 && 0 !== c.newRelativeX && (d.dragging = !0, c.options.startDragging.apply(c, [c.$elem])), (c.newRelativeX > 8 || c.newRelativeX < -8 && c.browser.isTouch === !0) && (n.preventDefault ? n.preventDefault() : n.returnValue = !1, d.sliding = !0), (c.newPosY > 10 || c.newPosY < -10) && d.sliding === !1 && t(i).off("touchmove.owl");
          var s = function() {
            return c.newRelativeX / 5
          },
          a = function() {
            return c.maximumPixels + c.newRelativeX / 5
          };
          c.newPosX = Math.max(Math.min(c.newPosX, s()), a()), c.browser.support3d === !0 ? c.transition3d(c.newPosX) : c.css2move(c.newPosX);

        }

        function l(i) {
          var i = i.originalEvent || i || e.event;
          if (i.target = i.target || i.srcElement, d.dragging = !1, c.browser.isTouch !== !0 && c.$owlWrapper.removeClass("grabbing"), c.dragDirection = c.owl.dragDirection = c.newRelativeX < 0 ? "left" : "right", 0 !== c.newRelativeX) {
            var n = c.getNewPosition();
            if (c.goTo(n, !1, "drag"), d.targetElement === i.target && c.browser.isTouch !== !0) {
              t(i.target).on("click.disable", function(e) {
                e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault(), t(i.target).off("click.disable")
              });
              var o = t._data(i.target, "events").click,
              a = o.pop();
              o.splice(0, 0, a)
            }
          }
          s("off")
        }
        var c = this,
        d = {
          offsetX: 0,
          offsetY: 0,
          baseElWidth: 0,
          relativePos: 0,
          position: null,
          minSwipe: null,
          maxSwipe: null,
          sliding: null,
          dargging: null,
          targetElement: null
        };
        c.isCssFinish = !0, c.$elem.on(c.ev_types.start, ".owl-wrapper", a)
      },
      getNewPosition: function() {
        var t, e = this;
        return t = e.closestItem(), t > e.maximumItem ? (e.currentItem = e.maximumItem, t = e.maximumItem) : e.newPosX >= 0 && (t = 0, e.currentItem = 0), t
      },
      closestItem: function() {
        var e = this,
        i = e.options.scrollPerPage === !0 ? e.pagesInArray : e.positionsInArray,
        n = e.newPosX,
        o = null;
        return t.each(i, function(s, a) {
          n - e.itemWidth / 20 > i[s + 1] && n - e.itemWidth / 20 < a && "left" === e.moveDirection() ? (o = a, e.currentItem = e.options.scrollPerPage === !0 ? t.inArray(o, e.positionsInArray) : s) : n + e.itemWidth / 20 < a && n + e.itemWidth / 20 > (i[s + 1] || i[s] - e.itemWidth) && "right" === e.moveDirection() && (e.options.scrollPerPage === !0 ? (o = i[s + 1] || i[i.length - 1], e.currentItem = t.inArray(o, e.positionsInArray)) : (o = i[s + 1], e.currentItem = s + 1))
        }), e.currentItem
      },
      moveDirection: function() {
        var t, e = this;
        return e.newRelativeX < 0 ? (t = "right", e.playDirection = "next") : (t = "left", e.playDirection = "prev"), t
      },
      customEvents: function() {
        var t = this;
        t.$elem.on("owl.next", function() {
          t.next()
        }), t.$elem.on("owl.prev", function() {
          t.prev()
        }), t.$elem.on("owl.play", function(e, i) {
          t.options.autoPlay = i, t.play(), t.hoverStatus = "play"
        }), t.$elem.on("owl.stop", function() {
          t.stop(), t.hoverStatus = "stop"
        }), t.$elem.on("owl.goTo", function(e, i) {
          t.goTo(i)
        }), t.$elem.on("owl.jumpTo", function(e, i) {
          t.jumpTo(i)
        })
      },
      stopOnHover: function() {
        var t = this;
        t.options.stopOnHover === !0 && t.browser.isTouch !== !0 && t.options.autoPlay !== !1 && (t.$elem.on("mouseover", function() {
          t.stop()
        }), t.$elem.on("mouseout", function() {
          "stop" !== t.hoverStatus && t.play()
        }))
      },
      lazyLoad: function() {
        var e = this;
        if (e.options.lazyLoad === !1) return !1;
        for (var i = 0; i < e.itemsAmount; i++) {
          var o = t(e.$owlItems[i]);
          if ("loaded" !== o.data("owl-loaded")) {
            var s, a = o.data("owl-item"),
            r = o.find(".lazyOwl");
            "string" == typeof r.data("src") ? (o.data("owl-loaded") === n && (r.hide(), o.addClass("loading").data("owl-loaded", "checked")), s = e.options.lazyFollow === !0 ? a >= e.currentItem : !0, s && a < e.currentItem + e.options.items && r.length && e.lazyPreload(o, r)) : o.data("owl-loaded", "loaded")
          }
        }
      },
      lazyPreload: function(t, e) {
        function i() {
          s += 1, o.completeImg(e.get(0)) || a === !0 ? n() : 100 >= s ? setTimeout(i, 100) : n()
        }

        function n() {
          t.data("owl-loaded", "loaded").removeClass("loading"), e.removeAttr("data-src"), "fade" === o.options.lazyEffect ? e.fadeIn(400) : e.show(), "function" == typeof o.options.afterLazyLoad && o.options.afterLazyLoad.apply(this, [o.$elem])
        }
        var o = this,
        s = 0;
        if ("DIV" === e.prop("tagName")) {
          e.css("background-image", "url(" + e.data("src") + ")");
          var a = !0
        } else e[0].src = e.data("src");
        i()
      },
      autoHeight: function() {
        function e() {
          a += 1, o.completeImg(s.get(0)) ? i() : 100 >= a ? setTimeout(e, 100) : o.wrapperOuter.css("height", "")
        }

        function i() {
          var e = t(o.$owlItems[o.currentItem]).height();
          o.wrapperOuter.css("height", e + "px"), o.wrapperOuter.hasClass("autoHeight") || setTimeout(function() {
            o.wrapperOuter.addClass("autoHeight")
          }, 0)
        }
        var o = this,
        s = t(o.$owlItems[o.currentItem]).find("img");
        if (s.get(0) !== n) {
          var a = 0;
          e()
        } else i()
      },
      completeImg: function(t) {
        return t.complete ? "undefined" != typeof t.naturalWidth && 0 == t.naturalWidth ? !1 : !0 : !1
      },
      onVisibleItems: function() {
        var e = this;
        e.options.addClassActive === !0 && e.$owlItems.removeClass("active"), e.visibleItems = [];
        for (var i = e.currentItem; i < e.currentItem + e.options.items; i++) e.visibleItems.push(i), e.options.addClassActive === !0 && t(e.$owlItems[i]).addClass("active");
          e.owl.visibleItems = e.visibleItems
      },
      transitionTypes: function(t) {
        var e = this;
        e.outClass = "owl-" + t + "-out", e.inClass = "owl-" + t + "-in"
      },
      singleItemTransition: function() {
        function t(t) {
          return {
            position: "relative",
            left: t + "px"
          }
        }
        var e = this;
        e.isTransition = !0;
        var i = e.outClass,
        n = e.inClass,
        o = e.$owlItems.eq(e.currentItem),
        s = e.$owlItems.eq(e.prevItem),
        a = Math.abs(e.positionsInArray[e.currentItem]) + e.positionsInArray[e.prevItem],
        r = Math.abs(e.positionsInArray[e.currentItem]) + e.itemWidth / 2;
        e.$owlWrapper.addClass("owl-origin").css({
          "-webkit-transform-origin": r + "px",
          "-moz-perspective-origin": r + "px",
          "perspective-origin": r + "px"
        });
        var l = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
        s.css(t(a, 10)).addClass(i).on(l, function() {
          e.endPrev = !0, s.off(l), e.clearTransStyle(s, i)
        }), o.addClass(n).on(l, function() {
          e.endCurrent = !0, o.off(l), e.clearTransStyle(o, n)
        })
      },
      clearTransStyle: function(t, e) {
        var i = this;
        t.css({
          position: "",
          left: ""
        }).removeClass(e), i.endPrev && i.endCurrent && (i.$owlWrapper.removeClass("owl-origin"), i.endPrev = !1, i.endCurrent = !1, i.isTransition = !1)
      },
      owlStatus: function() {
        var t = this;
        t.owl = {
          userOptions: t.userOptions,
          baseElement: t.$elem,
          userItems: t.$userItems,
          owlItems: t.$owlItems,
          currentItem: t.currentItem,
          prevItem: t.prevItem,
          visibleItems: t.visibleItems,
          isTouch: t.browser.isTouch,
          browser: t.browser,
          dragDirection: t.dragDirection
        }
      },
      clearEvents: function() {
        var n = this;
        n.$elem.off(".owl owl mousedown.disableTextSelect"), t(i).off(".owl owl"), t(e).off("resize", n.resizer)
      },
      unWrap: function() {
        var t = this;
        0 !== t.$elem.children().length && (t.$owlWrapper.unwrap(), t.$userItems.unwrap().unwrap(), t.owlControls && t.owlControls.remove()), t.clearEvents(), t.$elem.attr("style", t.$elem.data("owl-originalStyles") || "").attr("class", t.$elem.data("owl-originalClasses"))
      },
      destroy: function() {
        var t = this;
        t.stop(), clearInterval(t.checkVisible), t.unWrap(), t.$elem.removeData()
      },
      reinit: function(e) {
        var i = this,
        n = t.extend({}, i.userOptions, e);
        i.unWrap(), i.init(n, i.$elem)
      },
      addItem: function(t, e) {
        var i, o = this;
        return t ? 0 === o.$elem.children().length ? (o.$elem.append(t), o.setVars(), !1) : (o.unWrap(), i = e === n || -1 === e ? -1 : e, i >= o.$userItems.length || -1 === i ? o.$userItems.eq(-1).after(t) : o.$userItems.eq(i).before(t), void o.setVars()) : !1
      },
      removeItem: function(t) {
        var e, i = this;
        return 0 === i.$elem.children().length ? !1 : (e = t === n || -1 === t ? -1 : t, i.unWrap(), i.$userItems.eq(e).remove(), void i.setVars())
      }
    };
    t.fn.owlCarousel = function(e) {
      return this.each(function() {
        if (t(this).data("owl-init") === !0) return !1;
        t(this).data("owl-init", !0);
        var i = Object.create(o);
        i.init(e, this), t.data(this, "owlCarousel", i)
      })
    }, t.fn.owlCarousel.options = {
      items: 5,
      itemsCustom: !1,
      itemsDesktop: [1199, 4],
      itemsDesktopSmall: [979, 3],
      itemsTablet: [768, 2],
      itemsTabletSmall: !1,
      itemsMobile: [479, 1],
      singleItem: !1,
      itemsScaleUp: !1,
      slideSpeed: 200,
      paginationSpeed: 800,
      rewindSpeed: 1e3,
      autoPlay: !1,
      stopOnHover: !1,
      navigation: !1,
      navigationText: ["prev", "next"],
      rewindNav: !0,
      scrollPerPage: !1,
      pagination: !0,
      paginationNumbers: !1,
      responsive: !0,
      responsiveRefreshRate: 200,
      responsiveBaseWidth: e,
      baseClass: "owl-carousel",
      theme: "owl-theme",
      lazyLoad: !1,
      lazyFollow: !0,
      lazyEffect: "fade",
      autoHeight: !1,
      jsonPath: !1,
      jsonSuccess: !1,
      dragBeforeAnimFinish: !0,
      mouseDrag: !0,
      touchDrag: !0,
      addClassActive: !1,
      transitionStyle: !1,
      beforeUpdate: !1,
      afterUpdate: !1,
      beforeInit: !1,
      afterInit: !1,
      beforeMove: !1,
      afterMove: !1,
      afterAction: !1,
      startDragging: !1,
      afterLazyLoad: !1
    }
  }(jQuery, window, document), $(document).ready(function() {
    function t(t) {
      t.wrap("<div class='table-wrapper' />");
      var e = t.clone();
      e.find("td:not(:first-child), th:not(:first-child)").css("display", "none"), e.removeClass("responsive"), t.closest(".table-wrapper").append(e), e.wrap("<div class='pinned' />"), t.wrap("<div class='scrollable' />"), i(t, e)
    }

    function e(t) {
      t.closest(".table-wrapper").find(".pinned").remove(), t.unwrap(), t.unwrap()
    }

    function i(t, e) {
      var i = t.find("tr"),
      n = e.find("tr"),
      o = [];
      i.each(function(t) {
        var e = $(this),
        i = e.find("th, td");
        i.each(function() {
          var e = $(this).outerHeight(!0);
          o[t] = o[t] || 0, e > o[t] && (o[t] = e)
        })
      }), n.each(function(t) {
        $(this).height(o[t])
      })
    }
    var n = !1,
    o = function() {
      return $(window).width() < 767 && !n ? (n = !0, $("table.responsive").each(function(e, i) {
        t($(i))
      }), !0) : void(n && $(window).width() > 767 && (n = !1, $("table.responsive").each(function(t, i) {
        e($(i))
      })))
    };
    $(window).load(o), $(window).on("redraw", function() {
      n = !1, o()
    }), $(window).on("resize", o)
  }),
function(t, e) {
  "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Spinner = e()
}(this, function() {
  "use strict";

  function t(t, e) {
    var i, n = document.createElement(t || "div");
    for (i in e) n[i] = e[i];
      return n
  }

  function e(t) {
    for (var e = 1, i = arguments.length; i > e; e++) t.appendChild(arguments[e]);
      return t
  }

  function i(t, e, i, n) {
    var o = ["opacity", e, ~~(100 * t), i, n].join("-"),
    s = .01 + 100 * (i / n),
    a = Math.max(1 - (1 - t) / e * (100 - s), t),
    r = d.substring(0, d.indexOf("Animation")).toLowerCase(),
    l = r && "-" + r + "-" || "";
    return p[o] || (m.insertRule("@" + l + "keyframes " + o + "{0%{opacity:" + a + "}" + s + "%{opacity:" + t + "}" + (s + .01) + "%{opacity:1}" + (s + e) % 100 + "%{opacity:" + t + "}100%{opacity:" + a + "}}", m.cssRules.length), p[o] = 1), o
  }

  function n(t, e) {
    var i, n, o = t.style;
    for (e = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < u.length; n++)
      if (i = u[n] + e, void 0 !== o[i]) return i;
    return void 0 !== o[e] ? e : void 0
  }

  function o(t, e) {
    for (var i in e) t.style[n(t, i) || i] = e[i];
      return t
  }

  function s(t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];
      for (var n in i) void 0 === t[n] && (t[n] = i[n])
    }
  return t
}

function a(t) {
  for (var e = {
    x: t.offsetLeft,
    y: t.offsetTop
  }; t = t.offsetParent;) e.x += t.offsetLeft, e.y += t.offsetTop;
    return e
  }

  function r(t, e) {
    return "string" == typeof t ? t : t[e % t.length]
  }

  function l(t) {
    return "undefined" == typeof this ? new l(t) : void(this.opts = s(t || {}, l.defaults, f))
  }

  function c() {
    function i(e, i) {
      return t("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', i)
    }
    m.addRule(".spin-vml", "behavior:url(#default#VML)"), l.prototype.lines = function(t, n) {
      function s() {
        return o(i("group", {
          coordsize: d + " " + d,
          coordorigin: -c + " " + -c
        }), {
          width: d,
          height: d
        })
      }

      function a(t, a, l) {
        e(p, e(o(s(), {
          rotation: 360 / n.lines * t + "deg",
          left: ~~a
        }), e(o(i("roundrect", {
          arcsize: n.corners
        }), {
          width: c,
          height: n.width,
          left: n.radius,
          top: -n.width >> 1,
          filter: l
        }), i("fill", {
          color: r(n.color, t),
          opacity: n.opacity
        }), i("stroke", {
          opacity: 0
        }))))
      }
      var l, c = n.length + n.width,
      d = 2 * c,
      u = 2 * -(n.width + n.length) + "px",
      p = o(s(), {
        position: "absolute",
        top: u,
        left: u
      });
      if (n.shadow)
        for (l = 1; l <= n.lines; l++) a(l, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
          for (l = 1; l <= n.lines; l++) a(l);
            return e(t, p)
        }, l.prototype.opacity = function(t, e, i, n) {
          var o = t.firstChild;
          n = n.shadow && n.lines || 0, o && e + n < o.childNodes.length && (o = o.childNodes[e + n], o = o && o.firstChild, o = o && o.firstChild, o && (o.opacity = i))
        }
      }
      var d, u = ["webkit", "Moz", "ms", "O"],
      p = {},
      m = function() {
        var i = t("style", {
          type: "text/css"
        });
        return e(document.getElementsByTagName("head")[0], i), i.sheet || i.styleSheet
      }(),
      f = {
        lines: 12,
        length: 7,
        width: 5,
        radius: 10,
        rotate: 0,
        corners: 1,
        color: "#000",
        direction: 1,
        speed: 1,
        trail: 100,
        opacity: .25,
        fps: 20,
        zIndex: 2e9,
        className: "spinner",
        top: "auto",
        left: "auto",
        position: "relative"
      };
      l.defaults = {}, s(l.prototype, {
        spin: function(e) {
          this.stop();
          var i, n, s = this,
          r = s.opts,
          l = s.el = o(t(0, {
            className: r.className
          }), {
            position: r.position,
            width: 0,
            zIndex: r.zIndex
          }),
          c = r.radius + r.length + r.width;
          if (e && (e.insertBefore(l, e.firstChild || null), n = a(e), i = a(l), o(l, {
            left: ("auto" == r.left ? n.x - i.x + (e.offsetWidth >> 1) : parseInt(r.left, 10) + c) + "px",
            top: ("auto" == r.top ? n.y - i.y + (e.offsetHeight >> 1) : parseInt(r.top, 10) + c) + "px"
          })), l.setAttribute("role", "progressbar"), s.lines(l, s.opts), !d) {
            var u, p = 0,
            m = (r.lines - 1) * (1 - r.direction) / 2,
            f = r.fps,
            h = f / r.speed,
            v = (1 - r.opacity) / (h * r.trail / 100),
            g = h / r.lines;
            ! function w() {
              p++;
              for (var t = 0; t < r.lines; t++) u = Math.max(1 - (p + (r.lines - t) * g) % h * v, r.opacity), s.opacity(l, t * r.direction + m, u, r);
                s.timeout = s.el && setTimeout(w, ~~(1e3 / f))
            }()
          }
          return s
        },
        stop: function() {
          var t = this.el;
          return t && (clearTimeout(this.timeout), t.parentNode && t.parentNode.removeChild(t), this.el = void 0), this
        },
        lines: function(n, s) {
          function a(e, i) {
            return o(t(), {
              position: "absolute",
              width: s.length + s.width + "px",
              height: s.width + "px",
              background: e,
              boxShadow: i,
              transformOrigin: "left",
              transform: "rotate(" + ~~(360 / s.lines * c + s.rotate) + "deg) translate(" + s.radius + "px,0)",
              borderRadius: (s.corners * s.width >> 1) + "px"
            })
          }
          for (var l, c = 0, u = (s.lines - 1) * (1 - s.direction) / 2; c < s.lines; c++) l = o(t(), {
            position: "absolute",
            top: 1 + ~(s.width / 2) + "px",
            transform: s.hwaccel ? "translate3d(0,0,0)" : "",
            opacity: s.opacity,
            animation: d && i(s.opacity, s.trail, u + c * s.direction, s.lines) + " " + 1 / s.speed + "s linear infinite"
          }), s.shadow && e(l, o(a("#000", "0 0 4px #000"), {
            top: "2px"
          })), e(n, e(l, a(r(s.color, c), "0 0 1px rgba(0,0,0,.1)")));
          return n
        },
        opacity: function(t, e, i) {
          e < t.childNodes.length && (t.childNodes[e].style.opacity = i)
        }
      });
var h = o(t("group"), {
  behavior: "url(#default#VML)"
});
return !n(h, "transform") && h.adj ? c() : d = n(h, "animation"), l
}),
function(t) {
  if ("object" == typeof exports) t(require("jquery"), require("spin"));
  else if ("function" == typeof define && define.amd) define(["jquery", "spin"], t);
  else {
    if (!window.Spinner) throw new Error("Spin.js not present");
    t(window.jQuery, window.Spinner)
  }
}(function(t, e) {
  t.fn.spin = function(i, n) {
    return this.each(function() {
      var o = t(this),
      s = o.data();
      s.spinner && (s.spinner.stop(), delete s.spinner), i !== !1 && (i = t.extend({
        color: n || o.css("color")
      }, t.fn.spin.presets[i] || i), s.spinner = new e(i).spin(this))
    })
  }, t.fn.spin.presets = {
    tiny: {
      lines: 8,
      length: 2,
      width: 2,
      radius: 3
    },
    small: {
      lines: 8,
      length: 4,
      width: 3,
      radius: 5
    },
    large: {
      lines: 10,
      length: 8,
      width: 4,
      radius: 8
    }
  }
}),
function() {
  var t = function(t, e) {
    return function() {
      return t.apply(e, arguments)
    }
  };
  return $(document).foundation(), jQuery(function(e) {
    var i, n, o, s, a, r, l, c, d, u, p, m, f, h, v, g, w, y, b, C, I, x, k, _, T, $, P, A, S, z, W, D, M, j, O, N, F, q, L;
    return o = e("body"), n = e(".main-header"), I = 768, C = 1280, b = 1440, v = function(t) {
      return "undefined" != typeof console ? console.log(t) : void 0
    }, j = function() {
      var t;
      return t = e(".main-header").outerHeight() + e(".main-content").outerHeight() + e(".main-footer").outerHeight(), e(window).outerHeight() > t ? e(".main-content").css({
        "min-height": e(window).outerHeight() - e(".main-header").outerHeight() - e(".main-footer").outerHeight()
      }) : void 0
    }, j(), e(window).resize(function() {
      return j()
    }), general_external_links_enabled && e('a[href^="http"]').not('a[href^="' + shop_url + '"]').attr("target", "_blank"), A = function() {
      return e(".main-header .title img").length && window.devicePixelRatio >= 2 && e(".main-header .title img").length ? e(".main-header .title img").imagesLoaded(function() {
        return e(this).width(e(this).naturalWidth()), e(this).attr("src", e(this).attr("data-retina"))
      }) : void 0
    }, A(), S = function() {
      return e(".searchbar-open").click(function() {
        return e(this).closest(".menu").fadeOut(100, function() {
          return e(".main-header .searchbar-container").fadeIn(200), e(".main-header .searchbar-container .search-box").focus()
        }), !1
      }), e(".searchbar-close").click(function() {
        return e(".main-header .searchbar-container").fadeOut(100, function() {
          return e(".search-account .menu").fadeIn(200)
        }), !1
      }), e(".account-open").click(function() {
        return e(this).closest(".menu").fadeOut(100, function() {
          return e(".account-container").fadeIn(200)
        }), !1
      }), e(".account-close").click(function() {
        return e(".account-container").fadeOut(100, function() {
          return e(".search-account .menu").fadeIn(200)
        }), !1
      })
    }, S(), g = function() {
      var t, i, s, a, r, l;
      return t = e(".main-menu-dropdown-panel .row"), i = e(".template-index .main-header"), n.find(".main-menu .widescreen .dropdown > a").click(function() {
        var i, s, l, c;
        return l = e(this).parent(), c = l.find(".sub-nav .columns"), o.hasClass("template-index") && o.hasClass("transparent-menu") && Modernizr.touch && (e(".main-header").hasClass("dropdown-open") ? l.hasClass("active") && r() : e(".main-header .bg").fadeIn()), l.hasClass("active") ? a() : e(".main-header").hasClass("dropdown-open") ? (t.find(".columns").animate({
          opacity: 0
        }, 200), t.find(".columns").remove(), n.find(".main-menu .dropdown").removeClass("active"), l.addClass("active"), c.clone().appendTo(".main-menu-dropdown-panel .row"), t.find(".columns").delay(200).animate({
          opacity: 1
        }, 200), s = t.height(), i = t.css("height", "auto").outerHeight(), t.height(s).animate({
          height: i
        }, 400)) : (t.find(".columns").remove(), e(".main-header").addClass("dropdown-open"), l.addClass("active"), c.clone().appendTo(".main-menu-dropdown-panel .row"), t.slideDown(400, function() {
          return t.css("height", t.outerHeight())
        }), t.find(".columns").delay(200).animate({
          opacity: 1
        }, 200)), !1
      }), a = function() {
  return e(".main-header").removeClass("dropdown-open"), t.find(".columns").animate({
    opacity: 0
  }, 200), t.delay(200).slideUp(function() {
    return n.find(".main-menu .dropdown").removeClass("active"), t.find(".columns").remove(), t.css("height", "auto")
  })
}, s = "", Modernizr.touch === !1 && e(".main-header").mouseenter(function() {
  return o.hasClass("template-index") && o.hasClass("transparent-menu") && e(".main-header .bg").fadeIn(), l()
}).mouseleave(function() {
  return e(".main-header").hasClass("dropdown-open") ? r() : o.hasClass("template-index") && "absolute" === i.css("position") ? e(".main-header .bg").stop(!0, !0).fadeOut() : void 0
}), r = function() {
  return s = setTimeout(function() {
    return a(), o.hasClass("template-index") && o.hasClass("transparent-menu") ? e(".main-header .bg").delay(300).fadeOut() : void 0
  }, 500)
}, l = function() {
  return clearTimeout(s)
}
}, g(), y = function() {
  var t, i, n;
  return n = e(".mobile-tools .menu"), i = e(".mobile-menu"), t = i.find("a.dropdown-link"), n.click(function() {
    return i.toggle(), !1
  }), t.click(function() {
    var t;
    return t = e(this).closest("li").find(".sub-nav:eq(0)"), t.slideToggle(), e(this).find(".glyph.plus").toggle(), e(this).find(".glyph.minus").toggle(), !1
  })
}, y(), f = function() {
  var t, i, n, o;
  return o = e(".instagram-widget").attr("data-username"), t = "https://api.instagram.com/v1/users/296922654/media/recent/?client_id=5ee50bb276c54efebf83323faac4a82e", n = 5, home_widget_twitter_enabled || home_widget_blog_enabled || (n += 6, e(".instagram-widget .items").addClass("wide")), e.ajax({
    dataType: "jsonp",
    url: "https://api.instagram.com/v1/users/search?q=" + o + "&client_id=5ee50bb276c54efebf83323faac4a82e",
    success: function(t) {}
  }).done(function(t) {
    var e, n, s, a, r;
    for (n = "", r = t.data, s = 0, a = r.length; a > s; s++)
      if (e = r[s], o === e.username) {
        n = e.id;
        break
      }
      return i(n)
    }), i = function(t) {
    return e.ajax({
      dataType: "jsonp",
      url: "https://api.instagram.com/v1/users/" + t + "/media/recent/?client_id=5ee50bb276c54efebf83323faac4a82e",
      success: function(t) {}
    }).done(function(t) {
      var i, o, s;
      for (s = [], i = o = 0; n >= 0 ? n >= o : o >= n; i = n >= 0 ? ++o : --o) s.push(e(".instagram-widget .items").append('<a class="item" target="_blank" href="' + t.data[i].link + '"><img src="' + t.data[i].images.low_resolution.url + '" /></a>'));
        return s
    })
  }
}, s = function() {
  function i(i) {
    this.createIframe = t(this.createIframe, this), this.extractVideoId = t(this.extractVideoId, this), this.extractVideoType = t(this.extractVideoType, this), this.eventListeners = t(this.eventListeners, this), this.centerPosition = t(this.centerPosition, this), this.close = t(this.close, this), this.open = t(this.open, this), this.opened = !1, this.video = i, this.modal = e(".video.modal"), this.player_button = i.find(".player-button"), this.src_url = i.find(".play-button").attr("href"), this.type = this.extractVideoType(), this.id = this.extractVideoId(), this.iframe = this.createIframe(), this.caption = i.find(".caption")
  }
  return i.prototype.open = function() {
    return this.opened = !0, this.modal.find(".flex-video").append(this.iframe), this.caption.length > 0 ? (this.modal.find(".caption").append(this.caption.html()), this.modal.addClass("wide")) : (this.modal.find(".player").removeClass("large-8"), this.modal.find(".caption").hide(), this.modal.removeClass("wide")), this.player_button.hide(), e(".modal-mask").show(), this.modal.find(".close").show(), this.modal.fadeIn(), this.centerPosition(), e(".modal").fadeIn(0), this.eventListeners()
  }, i.prototype.close = function() {
    return this.opened = !1, this.modal.find(".flex-video").empty(), this.modal.find(".caption").empty(), this.modal.hide(), e(".modal-mask").fadeOut(), 0 === this.caption.length ? (this.modal.find(".player").addClass("large-8"), this.modal.find(".caption").show()) : void 0
  }, i.prototype.centerPosition = function() {
    return this.modal.css(e(window).height() < this.modal.outerHeight() ? {
      position: "absolute",
      top: "30px",
      "margin-top": 0,
      "margin-left": -(this.modal.outerWidth() / 2)
    } : {
      position: "fixed",
      top: "50%",
      "margin-top": -(this.modal.outerHeight() / 2),
      "margin-left": -(this.modal.outerWidth() / 2)
    })
  }, i.prototype.eventListeners = function() {
    var t;
    return t = this, this.modal.find(".close").on("click", function() {
      return t.close()
    }), e(window).resize(function() {
      return t.centerPosition()
    }), e(document).keydown(function(e) {
      return t.opened && 27 === e.keyCode ? t.close() : void 0
    }), e(".modal-mask").on("click", function() {
      return t.close()
    }), this.player_button.on("click", function() {
      return !1
    })
  }, i.prototype.extractVideoType = function() {
    var t, e;
    return e = /\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9_\-]+)/i, t = e.exec(this.src_url), t ? "youtube" : (e = /^.*(vimeo)\.com\/(?:watch\?v=)?(.*?)(?:\z|$|&)/, (t = e.exec(this.src_url)) ? "vimeo" : !1)
  }, i.prototype.extractVideoId = function() {
    var t, e;
    if ("youtube" === this.type) {
      if (e = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/, t = this.src_url.match(e), t && 11 === t[2].length) return t[2]
    } else if ("vimeo" === this.type && (e = /^.*(vimeo)\.com\/(?:watch\?v=)?(.*?)(?:\z|$|&)/, t = this.src_url.match(e))) return t[2]
}, i.prototype.createIframe = function() {
  return "youtube" === this.type ? '<iframe  src="//www.youtube.com/embed/' + this.id + '?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>' : "vimeo" === this.type ? '<iframe src="//player.vimeo.com/video/' + this.id + '?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff&amp;autoplay=1?" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : void 0
}, i
}(), $ = function() {
  var t, i, n, o, s, a, r, l, c;
  return n = e(".modal"), e(".modal").length && product_modal_enabled && (a = e("article .photos .photo").length, s = !1, r = !1, n.find(".loading").spin("small"), a > 1 ? (n.addClass("with-nav"), o = n.find(".glyph")) : o = n.find(".close"), c = function() {
    var t, i, o, s, a, r, l;
    return t = n.find(".photo.active"), s = t.naturalWidth(), o = t.naturalHeight(), l = e(window).width(), r = e(window).height(), a = s / l, i = o / r, a > i && a > .9 ? (s = .9 * s / a, o = .9 * o / a) : i > a && i > .9 && (s = .9 * s / i, o = .9 * o / i), n.css({
      width: s,
      height: o,
      "margin-top": -(o / 2),
      "margin-left": -(s / 2)
    }), t.css({
      height: o
    })
  }, l = function(t) {
    var i;
    return r = !0, s || (e("article .photos .photo").each(function() {
      return n.find(".slides").append(e("<img />").attr("src", e(this).attr("href")).addClass("photo"))
    }), s = !0), e(".modal-mask").show(), n.fadeIn(), i = e(".modal img").eq(t), i.addClass("active"), n.find(".photo.active").imagesLoaded(function() {
      return n.find(".loading").hide(), o.show(), n.find(".slides").show(), c()
    })
  }, e(".photos .container").on("click", function() {
    var t;
    return "small" === d ? !1 : (t = e(this).find(".photo.active").index(), l(t))
  }), i = function() {
    return r = !1, n.find(".photo.active").removeClass("active"), n.css("display", "none"), e(".modal-mask").fadeOut()
  }, n.find(".close").on("click", function() {
    return i()
  }), e(".modal-mask").on("click", function() {
    return i()
  }), t = function(t) {
    var e, i, s, a;
    return i = n.find(".photo.active"), e = n.find(".photo.active").index(), a = n.find(".photo").length, "prev" === t && (s = 0 === e ? a - 1 : e - 1), "next" === t && (s = e === a - 1 ? 0 : e + 1), i.removeClass("active"), o.hide(), n.find(".loading").delay(50).fadeIn(0), n.find(".photo").eq(s).imagesLoaded(function() {
      return n.find(".loading").stop(!0, !0).fadeOut(0), o.show(), n.find(".photo").eq(s).addClass("active"), c()
    })
  }, n.find(".prev").on("click", function() {
    return t("prev")
  }), n.find(".next").on("click", function() {
    return t("next")
  }), n.find(".slides").on("click", function() {
    return t("next")
  }), e(document).keydown(function(e) {
    return r && (37 === e.keyCode && a > 1 && t("prev"), 39 === e.keyCode && a > 1 && t("next"), 27 === e.keyCode) ? i() : void 0
  }), s) ? e(window).resize(function() {
  return c()
}) : void 0
}, e(".accordion.headings").each(function() {
  return e(this).add(e(this).next(".accordion.content")).wrapAll("<div class='accordion-wrapper'/>")
}), e(".accordion.headings li").wrapInner('<div class="trigger"></div>'), e(".accordion.headings li .trigger").append('<div class="bg"></div>'), e(".accordion-wrapper").each(function() {
  var t, i;
  return i = e(this).find(".accordion.headings > li"), t = e(this).find(".accordion.content > li"), i.first().addClass("active"), t.each(function(t) {
    var n;
    return n = e('<div class="content">' + e(this).html() + "</div>"), n.appendTo(i.eq(t))
  }), t.remove(), e(this).find(".content").first().show(), e(this).find(".trigger").on("click", function() {
    var t, i;
    return t = e(this).closest(".accordion").find(".content"), i = e(this).closest("li").find(".content"), t.not(i).slideUp(200), i.slideDown(200, function() {
      return general_scroll_to_active_item ? e("html, body").animate({
        scrollTop: i.offset().top - 100
      }) : void 0
    }), e(this).closest(".accordion").find("li").removeClass("active"), e(this).closest("li").addClass("active")
  })
}), e(".tabs-horizontal.headings").each(function() {
  return e(this).add(e(this).next(".tabs.content")).wrapAll("<div class='tabs-wrapper horizontal'/>")
}), e(".tabs-horizontal.headings li").wrapInner('<div class="trigger"></div>'), e(".tabs-horizontal.headings li .trigger").append('<div class="bg"></div>'), e(".tabs-wrapper.horizontal").each(function() {
  var t, i;
  return i = e(this).find(".headings > li"), t = e(this).find(".tabs.content > li"), t.first().addClass("active"), i.first().addClass("active"), i.on("click", function() {
    return i.removeClass("active"), t.removeClass("active"), e(this).addClass("active"), t.eq(e(this).index()).addClass("active")
  })
}), e(".tabs-vertical.headings").each(function() {
  return e(this).add(e(this).next(".tabs.content")).wrapAll("<div class='tabs-wrapper vertical'/>")
}), e(".tabs-vertical.headings li").wrapInner('<div class="trigger"></div>'), e(".tabs-vertical.headings li .trigger").append('<div class="bg"></div>'), e(".tabs-wrapper.vertical").each(function() {
  var t, i, n;
  return n = e(this), i = e(this).find(".headings > li"), t = e(this).find(".tabs.content > li"), t.first().addClass("active"), i.first().addClass("active"), i.on("click", function() {
    return i.removeClass("active"), t.removeClass("active"), e(this).addClass("active"), t.eq(e(this).index()).addClass("active"), general_scroll_to_active_item ? matchMedia("only screen and (min-width: " + I + "px)").matches || e("html").hasClass("lt-ie9") ? e("html, body").animate({
      scrollTop: n.offset().top - 50
    }, "slow") : e("html, body").animate({
      scrollTop: n.offset().top + n.find(".headings").outerHeight() - 50
    }, "slow") : void 0
  })
}), e(".cart-form").submit(function() {
  return a(e(this)), !1
}), e(".recently-added.mobile .close").on("click", function() {
  return u()
}), e(".recently-added-mask").on("click", function() {
  return u()
}), c = "", F = function() {
  return e(".main-header .recently-added").slideToggle("fast")
}, W = function() {
  return e(".main-header .recently-added").slideDown("fast"), e("html, body").animate({
    scrollTop: 0
  })
}, x = function() {
  return e(".main-header .recently-added.mobile").fadeIn(), e(".main-header .recently-added-mask").removeClass("hide")
}, u = function() {
  return clearTimeout(c), e(".main-header .recently-added").fadeOut("fast"), e(".main-header .recently-added-mask").addClass("hide")
}, e(".main-header .recently-added").mouseenter(function() {
  return O()
}), e(".main-header .recently-added").mouseleave(function() {
  return M()
}), M = function() {
  return c = setTimeout(function() {
    return u()
  }, 4e3)
}, O = function() {
  return clearTimeout(c)
}, L = function(t) {
  return t.find("select option:selected").is(":disabled") ? (t.find(".dropdown").effect("shake", {
    times: 2,
    distance: 5
  }, 400), !1) : !0
}, a = function(t) {
  return e.ajax({
    type: "POST",
    url: "/cart/add.js",
    dataType: "json",
    data: t.serialize(),
    success: l,
    error: r
  })
}, l = function(t) {
  return P()
}, r = function(t, i) {
  return e(".recently-added .error").show(), e(".recently-added table").hide(), e(".recently-added div.row").hide(), W(), M()
}, P = function() {
  var t, i, n;
  return t = {}, i = {}, n = e(".actual-price").html(), n = e.trim(n.slice(0, n.search(/\d/))), Shopify.money_format = n + " {{amount}}", e.getJSON("/cart.js", function(n, o) {
    var s, a, r, l, c, d, u;
    for (t.image_url = Shopify.resizeImage(n.items[0].image, "small"), t.url = n.items[0].url, t.title = n.items[0].title, t.price_raw = n.items[0].price, t.price = Shopify.formatMoney(t.price_raw, Shopify.money_with_currency_format), s = 100 * parseInt(e(".recently-added .raw-total").html()), i.quantity = 0, i.price = 0, u = n.items, c = 0, d = u.length; d > c; c++) a = u[c], i.quantity += a.quantity, i.price += a.price * a.quantity;
      return e(".cart-link .number").html(i.quantity), e(".cart-link .number-wrapper").removeClass("hide"), e(".recently-added .items-count .number").html(i.quantity), e(".recently-added .total-price").html(Shopify.formatMoney(i.price, Shopify.money_format)), r = "<tr>", r += '<td class="cart-item">', r += '<a href="' + t.url + '">', r += '<img src="' + t.image_url + '" alt="' + t.title + '">', r += "</a>", r += "</td>", r += '<td class="cart-detail">', r += '<h2><a href="' + t.url + '">' + t.title + "</a></h2>", r += "</td>", r += '<td class="cart-price">' + t.price + "</td>", r += "</tr>", l = '<a href="' + t.url + '">', l += '<img src="' + t.image_url + '" alt="' + t.title + '">', l += "</a>", e(".recently-added tbody").html(r), e(".recently-added .mobile-item").html(l), e(".recently-added .error").hide(), e(".recently-added table").show(), e(".recently-added div.row").show(), e(".main-header") ? W() : x(), M()
  })
}, Modernizr.touch === !1 && e(".product-grid .product-item").mouseenter(function() {
  return e(this).find(".image-wrapper").animate({
    opacity: .5
  }, 100)
}).mouseleave(function() {
  return e(this).find(".image-wrapper").stop(!0, !0).animate({
    opacity: 1
  }, 300)
}), o.hasClass("template-page") && (k = e(".page-content .rte-content"), (k.find(".left-side-column").length || k.find(".right-side-column").length) && (k.find(".left-side-column").length && k.find(".right-side-column").length ? (k.wrapInner("<div class='main-column with-2-sidebars'></div>"), e(".left-side-column").addClass("with-2-sidebars"), e(".right-side-column").addClass("with-2-sidebars")) : k.wrapInner("<div class='main-column'></div>"), e(".left-side-column").prependTo(k), e(".right-side-column").appendTo(k))), o.hasClass("template-index") && (i = function() {
  function i(i, n, o) {
    this.eventListeners = t(this.eventListeners, this), this.alignPlayButton = t(this.alignPlayButton, this), this.alignCaption = t(this.alignCaption, this), this.getActiveIndex = t(this.getActiveIndex, this), this.autoplay = t(this.autoplay, this), this.createSlider = t(this.createSlider, this), this.el = i, this.autoplay_enabled = n, this.autoplay_frequency = o, this.createSlider(), this.owl = e(".owl-carousel").data("owlCarousel")
  }
  return i.prototype.createSlider = function() {
    var t;
    return t = this, t.el.owlCarousel({
      singleItem: !0,
      navigation: !1,
      paginationNumbers: !1,
      scrollPerPageNav: !0,
      slideSpeed: 800,
      pagination: !0,
      autoHeight: !0,
      autoPlay: t.autoplay(),
      afterInit: function() {
        return t.eventListeners()
      },
      afterAction: function() {
        return t.alignCaption(), t.alignPlayButton()
      }
    })
  }, i.prototype.autoplay = function() {
    return this.autoplay_enabled ? this.autoplay_frequency : !1
  }, i.prototype.getActiveIndex = function() {
    return this.el.find(".owl-pagination .owl-page.active").index()
  }, i.prototype.alignCaption = function() {
    var t, i, n, s, a, r;
    return s = this.el.find(".owl-item").eq(this.getActiveIndex()), t = s.find(".caption"), t.css("visibility", "hidden"), i = t.outerHeight(), n = t.outerWidth(), a = 30, r = o.hasClass("transparent-menu") ? e(".main-header").outerHeight() : 0, s.find("img").first().imagesLoaded(function() {
      var e, o, l, c;
      return l = s.outerHeight(), c = s.outerWidth(), t.hasClass("top") ? t.css("top", r + a) : t.hasClass("middle") && (o = r + (l - r - i) / 2, t.css("top", o)), t.hasClass("center") && (e = (c - n) / 2, t.css("left", e)), t.css("visibility", "visible")
    })
  }, i.prototype.alignPlayButton = function() {
    var t, i;
    return i = this.el.find(".owl-item").eq(this.getActiveIndex()), t = i.find(".play-button"), t.css("visibility", "hidden"), o.hasClass("transparent-menu") && "absolute" === e(".main-header").css("position") ? i.find("img").first().imagesLoaded(function() {
      var e, n, o;
      return n = i.outerHeight(), e = t.outerHeight(), o = (n - e) / 2, t.css({
        "margin-top": 0,
        top: o
      })
    }) : t.css({
      "margin-top": "-40px",
      top: "50%"
    }), t.css("visibility", "visible")
  }, i.prototype.eventListeners = function() {
    var t;
    return t = this, this.el.find(".play-button").on("click", function() {
      var i;
      return i = new s(e(this).closest(".video")), i.open(), t.owl.stop(), !1
    }), this.el.find(".owl-pagination .owl-page").on("click", function() {
      return t.owl.stop()
    })
  }, i
}(), p = new i(e(".slider .slides"), home_slider_auto_enabled, home_slider_rotate_frequency), e(".product-slider").slice(1).css("padding-top", 0), e(".product-slider .product-grid").owlCarousel({
  items: 4,
  navigation: !0,
  scrollPerPage: !0,
  slideSpeed: 800,
  lazyLoad: !0,
  pagination: !1,
  navigationText: !1
}), e(".product-slider .product-item").show(), D = function() {
  return e(".small-promos .image-text-widget").mouseenter(function() {
    return e(this).find(".caption").fadeIn(300)
  }).mouseleave(function() {
    return e(this).find(".caption").stop(!0, !0).fadeOut(300)
  })
}, D(), f()), o.hasClass("template-list-collections") && e(".collection-item").mouseenter(function() {
  return e(this).find(".caption").fadeIn(300)
}).mouseleave(function() {
  return e(this).find(".caption").stop(!0, !0).fadeOut(300)
}), o.hasClass("template-product") && (T = function() {
  var t;
  t = function(t) {
    var i, n;
    return i = e(".positions.active"), n = t, i.find("[data-position]").each(function() {
      var t, o, s;
      return s = e(this).attr("data-position"), s.length ? (t = i.find('[data-position="' + s + '"]'), o = n.find('[data-position="' + s + '"]'), t.children().appendTo(o)) : void 0
    }), i.removeClass("active"), t.addClass("active")
  }, e(document).on("smallWindow", function() {
    return t(e(".positions.show-for-small"))
  }), e(document).on("mediumWindow", function() {
    return t(e(".positions.show-for-medium-only"))
  }), e(document).on("largeWindow", function() {
    return t(e(".positions.show-for-large-up"))
  })
}, T(), _ = e("article .photos"), N = e("article .thumbs"), _.on("click", function() {
  return !1
}), m = function(t) {
  return Modernizr.touch === !1 && product_zoom_enabled ? _.find(".container").zoom({
    url: _.find(".photo").eq(t).attr("data-zoom")
  }) : void 0
}, Modernizr.touch === !1 && product_zoom_enabled && _.find(".container").on("mouseover", function() {
  return e(this).css("outline-width", 1), _.find(".zoomImg").css({
    opacity: 1
  })
}).on("mouseleave", function() {
  return e(this).css("outline-width", 0)
}), q = function(t) {
  var e;
  _.find(".photo").eq(t).find("img").length < 1 || _.find(".photo.active").index() !== t && (N.find(".thumb").removeClass("active"), N.find(".thumb").eq(t).addClass("active"), _.find(".zoomImg").remove(), e = 0, _.find(".photo.active").length && (e = 300, _.find(".photo.active").fadeOut(e).removeClass("active")), _.find(".photo").eq(t).delay(e).imagesLoaded(function() {
    var i, n, o;
    return m(t), n = _.find(".photo").eq(t).find("img").naturalHeight(), o = _.find(".photo").eq(t).find("img").naturalWidth(), i = _.outerWidth(), o > i && (n = i / o * n, o = i), _.find(".container").animate({
      height: n,
      width: o
    }, e, function() {
      return _.find(".container").css({
        height: "auto",
        width: "auto"
      })
    }), _.find(".photo").eq(t).addClass("active").fadeIn(e)
  }))
}, N.find(".thumb").click(function() {
  return q(e(this).index())
}), z = function(t, i) {
  var n;
  e(".compare-price").html(""), t && t.available ? (e(".quanity-cart-row").show(), e(".product-unavailable").hide()) : (e(".quanity-cart-row").hide(), e(".product-unavailable").show(), product_variant_size > 1 && t && e(".product-unavailable form .email-body").attr("value", "Please notify me when this is back in stock: " + product_title + " - " + t.title)), t && (e(".actual-price").html(Shopify.formatMoney(t.price, shop_money_format)), t.compare_at_price > t.price && e(".compare-price").html("Was " + Shopify.formatMoney(t.compare_at_price, shop_money_format)), t.featured_image ? (n = e('article .photos .photo[data-image-id="' + t.featured_image.id + '"]').index(), q(n)) : q(0))
}, new Shopify.OptionSelectors("variant-listbox", {
  product: product_json,
  onVariantSelected: z,
  enableHistoryState: !0
}), e(".custom.dropdown").hide(), 1 === product_options_size && "Title" !== product_options_first && e(".selector-wrapper:eq(0)").prepend("<label>" + product_options_first + "</label>"), e(".selector-wrapper .single-option-selector").each(Foundation.libs.forms.append_custom_select), e("select.single-option-selector").change(function() {
  Foundation.libs.forms.refresh_custom_select(e(this), !0)
}), $()), h = "undefined" != typeof InstallTrigger, h && e("img").addClass("image-scale-hack"), d = "", w = function() {
  if (e("html").hasClass("lt-ie9")) return e.event.trigger("mediumWindow"), d = "medium";
  if (window.matchMedia("only screen and (min-width: " + C + "px)").matches) {
    if ("large" !== d) return e.event.trigger("largeWindow"), d = "large"
  } else if (window.matchMedia("only screen and (min-width: " + I + "px)").matches) {
    if ("medium" !== d) return e.event.trigger("mediumWindow"), d = "medium"
  } else if ("small" !== d) return e.event.trigger("smallWindow"), d = "small"
}, w(), e(window).resize(function() {
  return w()
}), e(".hide-until-js").show()
}), !1
}.call(this), $(document).ready(function() {
});

var text_max = 140;
$('#cart-notes-area_feedback').html(text_max + ' characters remaining');

$('#cart-notes-area').keyup(function() {
    var text_length = $('#cart-notes-area').val().length;
    var text_remaining = text_max - text_length;

    $('#cart-notes-area_feedback').html(text_remaining + ' characters remaining');
});