(() => {
  var e = function (e) {
      var n = RegExp("[?&]" + e + "=([^&]*)").exec(window.location.search);
      return n && decodeURIComponent(n[1].replace(/\+/g, " "));
    },
    n = "kids" === e("tag"),
    o = new ((function () {
      function e() {
        var e = this;
        (this.queue = []),
          (this.init = function (n) {
            return (
              void 0 === n && (n = {}),
              new Promise(function (o, t) {
                e.enqueue("init", n, o, t);
              })
            );
          }),
          (this.rewardedBreak = function () {
            return new Promise(function (e) {
              e(!1);
            });
          }),
          (this.noArguments = function (n) {
            return function () {
              e.enqueue(n);
            };
          }),
          (this.oneArgument = function (n) {
            return function (o) {
              e.enqueue(n, o);
            };
          }),
          (this.handleAutoResolvePromise = function () {
            return new Promise(function (e) {
              e();
            });
          }),
          (this.handleAutoResolvePromiseObj = function () {
            return new Promise(function (e) {
              e();
            });
          }),
          (this.throwNotLoaded = function () {
            console.debug("PokiSDK is not loaded yet. Not all methods are available.");
          });
      }
      return (
        (e.prototype.enqueue = function (e, o, t, i) {
          var r = { fn: e, options: o, resolveFn: t, rejectFn: i };
          n ? i && i() : this.queue.push(r);
        }),
        (e.prototype.dequeue = function () {
          for (
            var e = function () {
                var e = n.queue.shift(),
                  o = e,
                  t = o.fn,
                  i = o.options;
                "function" == typeof window.PokiSDK[t]
                  ? (null == e ? void 0 : e.resolveFn) || (null == e ? void 0 : e.rejectFn)
                    ? window.PokiSDK[t](i)
                        .then(function () {
                          for (var n = [], o = 0; o < arguments.length; o++) n[o] = arguments[o];
                          "function" == typeof e.resolveFn && e.resolveFn.apply(e, n);
                        })
                        .catch(function () {
                          for (var n = [], o = 0; o < arguments.length; o++) n[o] = arguments[o];
                          "function" == typeof e.rejectFn && e.rejectFn.apply(e, n);
                        })
                    : void 0 !== (null == e ? void 0 : e.fn) && window.PokiSDK[t](i)
                  : console.error("Cannot execute " + e.fn);
              },
              n = this;
            this.queue.length > 0;

          )
            e();
        }),
        e
      );
    })())();
  (window.PokiSDK = { init: o.init, initWithVideoHB: o.init, customEvent: o.throwNotLoaded, destroyAd: o.throwNotLoaded, getLeaderboard: o.handleAutoResolvePromiseObj }),
    ["disableProgrammatic", "gameLoadingStart", "gameLoadingFinished", "gameInteractive", "roundStart", "roundEnd", "muteAd"].forEach(function (e) {
      window.PokiSDK[e] = o.noArguments(e);
    }),
    [
      "setDebug",
      "gameplayStart",
      "gameplayStop",
      "gameLoadingProgress",
      "happyTime",
      "setPlayerAge",
      "togglePlayerAdvertisingConsent",
      "toggleNonPersonalized",
      "setConsentString",
      "logError",
      "sendHighscore",
      "setDebugTouchOverlayController",
    ].forEach(function (e) {
      window.PokiSDK[e] = o.oneArgument(e);
    });
  var t,
    i = ((t = window.pokiSDKVersion) || (t = e("ab") || "v2.234.2"), "poki-sdk-" + (n ? "kids" : "core") + "-" + t + ".js"),
    r = document.createElement("script");
  r.setAttribute("src", i),
    r.setAttribute("type", "text/javascript"),
    r.setAttribute("crossOrigin", "anonymous"),
    (r.onload = function () {
      return o.dequeue();
    }),
    document.head.appendChild(r);
})();