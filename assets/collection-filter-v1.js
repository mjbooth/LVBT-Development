/* simpleStorage */
function utilGetParameterByName(e, t) {
    "undefined" == typeof t && (t = window.location.search), e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
    var a = "[\\?&]" + e + "=([^&#]*)",
        o = new RegExp(a),
        r = o.exec(t)
    return null === r ? "" : decodeURIComponent(r[1].replace(/\+/g, " "))
}

function CollectionFilterHandleGet() {
    var e
    return "/search" == window.location.pathname ? "all" : (e = window.location.pathname.substring("/collections/".length), e = e.split("/")[0])
}

function CollectionFilterInitialize() {
    if ("/collections/" == window.location.pathname.substring(0, "/collections/".length) && !(window.location.pathname.indexOf("/products/") > -1)) {
        var e = Math.floor((new Date).getTime() / 1e3)
        "number" != typeof simpleStorage.get("cf-last_update_hours") ? CollectionFilterFlush() : e - simpleStorage.get("cf-last_update_hours") >= 14400 && CollectionFilterFlush(), "undefined" == typeof simpleStorage.get("cf-app-remember-sort_by") && simpleStorage.set("cf-app-remember-sort_by", "", {
            TTL: 864e5
        }), "" != utilGetParameterByName("sort_by") && simpleStorage.set("cf-app-remember-sort_by", utilGetParameterByName("sort_by"), {
            TTL: 864e5
        })
        var t = CollectionFilterHandleGet()
        if ("undefined" == typeof simpleStorage.get("cf-" + t) || "undefined" == typeof simpleStorage.get("cf-" + t).filters ? jQuery.ajax({
                cache: !1,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "GET",
                url: window.appcf.api_get,
                data: {
                    shop: window.appcf.shop,
                    handle: t
                },
                success: function(a) {
                    0 != a.filters.options.length && 0 != a.filters.options[0].values.length && (simpleStorage.set("cf-" + t, a, {
                        TTL: 864e5
                    }), simpleStorage.set("cf-last_update_hours", e, {
                        TTL: 864e5
                    }), CollectionFilterCheckRemember(t), jQuery("#collection-filters-container").waitUntilExists(function() {
                        CollectionFilterPopulateOptions(t)
                    }))
                }
            }) : (CollectionFilterCheckRemember(t), jQuery("#collection-filters-container").waitUntilExists(function() {
                CollectionFilterPopulateOptions(t)
            })), "/search" == window.location.pathname) {
            var a = CollectionFilterGetSearchValuesNoTags()
            jQuery("input[name='q']").val(a.join(" "))
        }
    }
}

function CollectionFilterSelectedFiltersGet(e) {
    var t = "",
        a = []
    return t = "/search" == window.location.pathname ? utilGetParameterByName("q") : window.location.pathname.replace("/collections/" + e, "").replace("/", ""), "string" == typeof t && "" != t && (a = t.toLowerCase().split("+")), a
}

function CollectionFilterSetRemember(e, t) {
    if ("object" == typeof simpleStorage.get("cf-" + e)) {
        "object" != typeof simpleStorage.get("cf-app-remember-tags") && simpleStorage.set("cf-app-remember-tags", [])
        for (var a = simpleStorage.get("cf-app-remember-tags"), o = 0; o < t.length; o++) t[o].indexOf("cf-Size-") > -1 && -1 == a.indexOf(t[o]) && a.push(t[o])
        for (var r = [], i = simpleStorage.get("cf-" + e).filters.options, n = [], o = 0; o < i.length; o++)
            for (var l = 0; l < i[o].values.length; l++) n.push(i[o].values[l].tag)
        for (var o = 0; o < a.length; o++) n.indexOf(a[o]) > -1 ? t.indexOf(a[o]) > -1 && r.push(a[o]) : r.push(a[o])
        simpleStorage.set("cf-app-remember-tags", r, {
            TTL: 864e5
        })
    }
}

function CollectionFilterCheckRemember(e) {
    var t = CollectionFilterSelectedFiltersGet(e)
    "object" != typeof simpleStorage.get("cf-app-remember-tags") && simpleStorage.set("cf-app-remember-tags", [])
    for (var a = simpleStorage.get("cf-app-remember-tags"), o = simpleStorage.get("cf-" + e).filters.options, r = [], i = 0; i < o.length; i++)
        for (var n = 0; n < o[i].values.length; n++) r.push(o[i].values[n].tag)
    for (var l = [], i = 0; i < a.length; i++) r.indexOf(a[i]) > -1 && -1 == t.indexOf(a[i].toLowerCase()) && l.push(a[i]);
    (0 != l.length || simpleStorage.get("cf-app-remember-sort_by") != utilGetParameterByName("sort_by")) && (t.push.apply(t, l), CollectionFilterRedirect(e, t))
}

function CollectionFilterPopulateOptions(e) {
    var t = simpleStorage.get("cf-" + e).filters.options,
        a = simpleStorage.get("cf-" + e).app_settings "undefined" == typeof a.show_only_options && (a.show_only_options = ""),
        a.show_only_options = a.show_only_options.trim()
    var o = []
    "" != a.show_only_options && (o = a.show_only_options.split(","))
    var r = "",
        i = CollectionFilterSelectedFiltersGet(e)
    if ("undefined" == typeof a.appearance && (a.appearance = []), "undefined" == typeof a.production_mode && (a.production_mode = !1), 0 == a.production_mode && CollectionFilterFlush(), 0 == a.appearance.length)
        for (var n = 0; n < o.length; n++) a.appearance.push({
            name: o[n],
            label: "",
            style: "select",
            all: ""
        })
    for (var l = 0; l < a.appearance.length; l++) {
        var s = a.appearance[l],
            c = t.filter(function(e) {
                return e.name == s.name
            })
        if (1 == c.length && (c = c[0], !(a.production_mode && c.values.length <= 1))) {
            if (r += " <h4 class='cf-label cf-title'>" + ("" == s.label ? s.name : s.label) + "</h4>", "select" == s.style) {
                r += "<select class='cf-select'>", r += "<option value=''>" + ("string" == typeof s.all ? s.all : "") + "</option>"
                for (var p = 0; p < c.values.length; p++) r += "<option value='" + c.values[p].tag + "' ", i.indexOf(c.values[p].tag.toLowerCase()) >= 0 && (r += " selected"), r += ">" + c.values[p].name + "</option>"
                r += "</select>"
            }
            if ("checkboxes" == s.style)
                for (var p = 0; p < c.values.length; p++) r += "<label><input class='cf-checkbox' data-group-name='" + s.name + "' type='checkbox' value='" + c.values[p].tag + "' ", r += (i.indexOf(c.values[p].tag.toLowerCase()) >= 0 ? " checked " : "") + " > <h4>" + c.values[p].name + "</h4></label>"
            if ("radios" == s.style)
                for (var p = 0; p < c.values.length; p++) r += "<label><input class='cf-radio' data-group-name='" + s.name + "' type='radio' value='" + c.values[p].tag + "' ", r += (i.indexOf(c.values[p].tag.toLowerCase()) >= 0 ? " checked " : "") + " > <h4>" + c.values[p].name + "</h4></label>"
        }
    }
    jQuery("#collection-filters-container").html(r), console.log("before setTimeout"), setTimeout(function() {
        jQuery(".cf-select").bind("change", CollectionFilterChange), jQuery(".cf-checkbox").bind("change", CollectionFilterChange), jQuery(".cf-radio").bind("change", CollectionFilterChange), console.log("after setTimeout")
    }, 500)
}

function CollectionFilterGetSearchValuesNoTags() {
    if ("/search" != window.location.pathname) return []
    var e = []
    "" != utilGetParameterByName("q") && (e = utilGetParameterByName("q").split(" "))
    for (var t = [], a = 0; a < e.length; a++) - 1 == e[a].indexOf("tag:") && t.push(e[a])
    return t
}

function CollectionFilterRedirect(e, t) {
    if ("/search" == window.location.pathname) {
        for (var a = CollectionFilterGetSearchValuesNoTags(), o = 0; o < t.length; o++) a.push("tag:" + t[o])
        window.location = "/search?type=" + utilGetParameterByName("type") + "&q=" + a.join("+")
    } else {
        var r = utilGetParameterByName("sort_by");
        ("undefined" == typeof r || "" == r) && "undefined" != typeof simpleStorage.get("cf-app-remember-sort_by") && (r = simpleStorage.get("cf-app-remember-sort_by"))
        var i = "/collections/" + e + "/" + t.join("+")
        "undefined" == typeof r || "" == r || (i += "?sort_by=" + r), window.location.href = i
    }
}

function CollectionFilterChange(e) {
    var t = jQuery(e.currentTarget).data("group-name"),
        a = "",
        o = CollectionFilterHandleGet()
    "undefined" != typeof t && (a = jQuery(e.currentTarget).val())
    var r = []
    jQuery(".cf-select").each(function() {
        var e = jQuery(this).val()
        "" != e && r.push(e)
    }), jQuery(".cf-checkbox:checked").each(function() {
        var e = jQuery(this).val()
        jQuery(this).data("group-name") != t ? r.push(e) : e == a && r.push(e)
    }), jQuery(".cf-radio:checked").each(function() {
        var e = jQuery(this).val()
        jQuery(this).data("group-name") != t ? r.push(e) : e == a && r.push(e)
    }), CollectionFilterSetRemember(o, r), CollectionFilterRedirect(o, r)
}

function CollectionFilterStart() {
    if ("number" != typeof window.app_cf_started) {
        window.app_cf_started = 1, window.l = function() {}
        try {
            window.l = console.log.bind(console)
        } catch (e) {}
        for (var t = "", a = 0; a < document.scripts.length; a++) document.scripts[a].src.indexOf("collection-filter-v") > -1 && (t = utilGetParameterByName("shop", "?" + document.scripts[a].src.split("?")[1]))
        t = t.replace(".myshopify.com", ""), window.appcf = {
            shop: t,
            api_get: "https://collection-filter-www.herokuapp.com/api/v1/filters"
        }, "dev" == utilGetParameterByName("env") && (window.appcf.api_get = "https://localhost:5000/api/v1/filters"), CollectionFilterInitialize()
    }
}

function CollectionFilterFlush() {
        var e = simpleStorage.index().filter(function(e) {
            return 0 == e.indexOf("cf-")
        })
        e.map(function(e) {
            simpleStorage.deleteKey(e)
        })
    }! function(e, t) {
        "use strict"
        e.simpleStorage = t()
    }(this, function() {
        "use strict"

        function e() {
            window.localStorage.setItem("__simpleStorageInitTest", "tmpval"), window.localStorage.removeItem("__simpleStorageInitTest"), o(), i(), t(), "addEventListener" in window && window.addEventListener("pageshow", function(e) {
                e.persisted && a()
            }, !1), m = !0
        }

        function t() {
            "addEventListener" in window ? window.addEventListener("storage", a, !1) : document.attachEvent("onstorage", a)
        }

        function a() {
            try {
                o()
            } catch (e) {
                return void(m = !1)
            }
            i()
        }

        function o() {
            var e = localStorage.simpleStorage
            try {
                c = JSON.parse(e)
            } catch (t) {
                c = {}
            }
            p = localStorage.simpleStorage ? String(localStorage.simpleStorage).length : 0
        }

        function r() {
            try {
                localStorage.simpleStorage = JSON.stringify(c), p = localStorage.simpleStorage ? String(localStorage.simpleStorage).length : 0
            } catch (e) {
                return e
            }
            return !0
        }

        function i() {
            var e, t, a, o, n, s = 1 / 0,
                p = 0
            if (clearTimeout(u), c && c.__simpleStorage_meta && c.__simpleStorage_meta.TTL) {
                for (e = +new Date, n = c.__simpleStorage_meta.TTL.keys || [], o = c.__simpleStorage_meta.TTL.expire || {}, t = 0, a = n.length; a > t; t++) {
                    if (!(o[n[t]] <= e)) {
                        o[n[t]] < s && (s = o[n[t]])
                        break
                    }
                    p++, delete c[n[t]], delete o[n[t]]
                }
                1 / 0 != s && (u = setTimeout(i, Math.min(s - e, 2147483647))), p && (n.splice(0, p), l(), r())
            }
        }

        function n(e, t) {
            var a, o, r = +new Date,
                n = !1
            if (t = Number(t) || 0, 0 !== t) {
                if (!c.hasOwnProperty(e)) return !1
                if (c.__simpleStorage_meta || (c.__simpleStorage_meta = {}), c.__simpleStorage_meta.TTL || (c.__simpleStorage_meta.TTL = {
                        expire: {},
                        keys: []
                    }), c.__simpleStorage_meta.TTL.expire[e] = r + t, c.__simpleStorage_meta.TTL.expire.hasOwnProperty(e))
                    for (a = 0, o = c.__simpleStorage_meta.TTL.keys.length; o > a; a++) c.__simpleStorage_meta.TTL.keys[a] == e && c.__simpleStorage_meta.TTL.keys.splice(a)
                for (a = 0, o = c.__simpleStorage_meta.TTL.keys.length; o > a; a++) c.__simpleStorage_meta.TTL.expire[c.__simpleStorage_meta.TTL.keys[a]] > r + t && c.__simpleStorage_meta.TTL.keys.splice(a, 0, e)
                n || c.__simpleStorage_meta.TTL.keys.push(e)
            } else if (c && c.__simpleStorage_meta && c.__simpleStorage_meta.TTL) {
                if (c.__simpleStorage_meta.TTL.expire.hasOwnProperty(e))
                    for (delete c.__simpleStorage_meta.TTL.expire[e], a = 0, o = c.__simpleStorage_meta.TTL.keys.length; o > a; a++)
                        if (c.__simpleStorage_meta.TTL.keys[a] == e) {
                            c.__simpleStorage_meta.TTL.keys.splice(a, 1)
                            break
                        }
                l()
            }
            return clearTimeout(u), c && c.__simpleStorage_meta && c.__simpleStorage_meta.TTL && c.__simpleStorage_meta.TTL.keys.length && (u = setTimeout(i, Math.min(Math.max(c.__simpleStorage_meta.TTL.expire[c.__simpleStorage_meta.TTL.keys[0]] - r, 0), 2147483647))), !0
        }

        function l() {
            var e, t = !1,
                a = !1
            if (!c || !c.__simpleStorage_meta) return t
            c.__simpleStorage_meta.TTL && !c.__simpleStorage_meta.TTL.keys.length && (delete c.__simpleStorage_meta.TTL, t = !0)
            for (e in c.__simpleStorage_meta)
                if (c.__simpleStorage_meta.hasOwnProperty(e)) {
                    a = !0
                    break
                }
            return a || (delete c.__simpleStorage_meta, t = !0), t
        }
        var s = "0.1.2",
            c = !1,
            p = 0,
            m = !1,
            u = null
        try {
            e()
        } catch (f) {}
        return {
            version: s,
            canUse: function() {
                return !!m
            },
            set: function(e, t, a) {
                if ("__simpleStorage_meta" == e) return !1
                if (!c) return !1
                if ("undefined" == typeof t) return this.deleteKey(e)
                a = a || {}
                try {
                    t = JSON.parse(JSON.stringify(t))
                } catch (o) {
                    return o
                }
                return c[e] = t, n(e, a.TTL || 0), r()
            },
            get: function(e) {
                return c ? c.hasOwnProperty(e) && "__simpleStorage_meta" != e && this.getTTL(e) ? c[e] : void 0 : !1
            },
            deleteKey: function(e) {
                return c && e in c ? (delete c[e], n(e, 0), r()) : !1
            },
            setTTL: function(e, t) {
                return c ? (n(e, t), r()) : !1
            },
            getTTL: function(e) {
                var t
                return c && c.hasOwnProperty(e) ? c.__simpleStorage_meta && c.__simpleStorage_meta.TTL && c.__simpleStorage_meta.TTL.expire && c.__simpleStorage_meta.TTL.expire.hasOwnProperty(e) ? (t = Math.max(c.__simpleStorage_meta.TTL.expire[e] - +new Date || 0, 0), t || !1) : 1 / 0 : !1
            },
            flush: function() {
                if (!c) return !1
                c = {}
                try {
                    return localStorage.removeItem("simpleStorage"), !0
                } catch (e) {
                    return e
                }
            },
            index: function() {
                if (!c) return !1
                var e, t = []
                for (e in c) c.hasOwnProperty(e) && "__simpleStorage_meta" != e && t.push(e)
                return t
            },
            storageSize: function() {
                return p
            }
        }
    }),
    function(e) {
        e.fn.waitUntilExists = function(t, a, o) {
            var r = "found",
                i = e(this.selector),
                n = i.not(function() {
                    return e(this).data(r)
                }).each(t).data(r, !0)
            return o ? a && n.length && window.clearInterval(window.waitUntilExists_Intervals[this.selector]) : (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] = window.setInterval(function() {
                i.waitUntilExists(t, a, !0)
            }, 500), i
        }
    }(jQuery), CollectionFilterStart()