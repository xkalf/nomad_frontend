import { c as create_ssr_component, b as subscribe, v as validate_component, d as add_attribute, o as onDestroy, e as escape, f as each } from "../../../chunks/ssr.js";
import { b as browser } from "../../../chunks/environment.js";
import { c as cubeType, b as session, a as setCubeType } from "../../../chunks/sessions.js";
import { s as solves, a as addSolves, r as resetSolves, d as deleteSolvesMany } from "../../../chunks/solves.js";
import { s as scrambleMappper, a as scrambleSizeMapper, b as cubeTypes, c as cubeTypeMapper } from "../../../chunks/types.js";
import { b as bestSolve, S as Solves, s as sortMode, M as Modal } from "../../../chunks/Solves2.js";
import { A as Average, S as Sessions, M as MobileContainer } from "../../../chunks/MobileContainer.js";
import { b as getBest, c as checkBestAverage, g as getAvg, d as displayTime, e as formatCustomTime } from "../../../chunks/timer-utils.js";
import { S as SidebarContainer } from "../../../chunks/SidebarContainer.js";
import { a as settings, s as setSettings } from "../../../chunks/settings.js";
import { GanTimerState } from "gan-web-bluetooth";
import { w as writable } from "../../../chunks/index2.js";
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var scrambowExports = {};
var scrambow = {
  get exports() {
    return scrambowExports;
  },
  set exports(v) {
    scrambowExports = v;
  }
};
(function(module, exports) {
  !function(r, e) {
    module.exports = e();
  }("undefined" != typeof self ? self : commonjsGlobal, function() {
    return (() => {
      var r = [, (r2, e2, t2) => {
        Object.defineProperty(e2, "__esModule", { value: true }), e2.Scrambow = void 0;
        var n2 = t2(2), o = t2(3), a = function() {
          function r3(r4, e3) {
            this.type = "333", this.length = 20, this.seed = Math, this.args = [], this.setLength(e3 || this.length), this.setType(r4 || this.type);
          }
          return r3.prototype.init = function() {
            if (!o.scramblers.hasOwnProperty(this.type))
              throw new Error("Invalid scrambler, allowed: " + Object.keys(o.scramblers).join(", "));
            o.scramblers[this.type].initialize(this.seed);
          }, r3.prototype.get = function(r4) {
            void 0 === r4 && (r4 = 1);
            for (var e3 = Array(r4), t3 = 0; t3 < r4; t3++)
              e3[t3] = o.scramblers[this.type].getRandomScramble(this.args);
            return e3;
          }, r3.prototype.setType = function(r4) {
            return r4 ? (this.type = this.getType(r4), this.init(), this) : this;
          }, r3.prototype.getType = function(r4) {
            var e3 = r4.toLowerCase();
            return o.scramblerAliases.hasOwnProperty(e3) ? o.scramblerAliases[e3] : e3;
          }, r3.prototype.setSeed = function(r4) {
            if (!r4)
              return this;
            var e3 = r4.toString(), t3 = (0, n2.hashCode)(e3);
            return this.seed = { random: function() {
              var r5 = 1e4 * Math.sin(t3++);
              return r5 - Math.floor(r5);
            } }, this.init(), this;
          }, r3.prototype.setLength = function(r4) {
            return r4 ? (this.length = r4, o.scramblers[this.type].setScrambleLength(this.length), this) : this;
          }, r3.prototype.setArgs = function() {
            for (var r4 = [], e3 = 0; e3 < arguments.length; e3++)
              r4[e3] = arguments[e3];
            return r4.length ? (this.args = r4, this) : this;
          }, r3.prototype.registerCustomScrambler = function(r4, e3, t3) {
            void 0 === t3 && (t3 = []), (0, o.register)(o.scramblers, o.scramblerAliases)(r4, e3, t3);
          }, r3;
        }();
        e2.Scrambow = a;
      }, (r2, e2) => {
        Object.defineProperty(e2, "__esModule", { value: true }), e2.hashCode = void 0, e2.hashCode = function(r3) {
          var e3 = 0;
          if (0 === r3.length)
            return e3;
          for (var t2 = 0; t2 < r3.length; t2++) {
            e3 = (e3 << 5) - e3 + r3.charCodeAt(t2), e3 |= 0;
          }
          return e3;
        };
      }, function(r2, e2, t2) {
        var n2 = this && this.__importDefault || function(r3) {
          return r3 && r3.__esModule ? r3 : { default: r3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true }), e2.register = e2.scramblers = e2.scramblerAliases = void 0;
        var o = n2(t2(4));
        e2.scramblerAliases = {}, e2.scramblers = {};
        e2.register = function(r3, e3) {
          return function(t3, n3, o2) {
            void 0 === o2 && (o2 = []), o2.forEach(function(r4) {
              e3[r4.toLowerCase()] = t3;
            }), r3[t3.toLowerCase()] = n3;
          };
        }, (0, o.default)((0, e2.register)(e2.scramblers, e2.scramblerAliases));
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => m });
        var n2 = t2(5), o = t2(6), a = t2(32), i = t2(33), f = t2(34), u = t2(35), c = t2(36), l = t2(37), s2 = t2(38);
        function m(r3) {
          (0, n2.default)(r3), (0, o.default)(r3), (0, a.default)(r3), (0, i.default)(r3), (0, f.default)(r3), (0, u.default)(r3), (0, c.default)(r3), (0, l.default)(r3), (0, s2.default)(r3);
        }
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => n2 });
        const n2 = function(r3) {
          r3("222", function() {
            var r4 = new Array();
            r4 = new Array(1, 1, 1, 1, 2, 2, 2, 2, 5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 0, 0, 0, 0);
            var e3 = new Array(15, 16, 16, 21, 21, 15, 13, 9, 9, 17, 17, 13, 14, 20, 20, 4, 4, 14, 12, 5, 5, 8, 8, 12, 3, 23, 23, 18, 18, 3, 1, 19, 19, 11, 11, 1, 2, 6, 6, 22, 22, 2, 0, 10, 10, 7, 7, 0), t3 = new Array();
            t3[0] = new Array(), t3[1] = new Array(), t3[2] = new Array(), t3[3] = new Array(), t3[4] = new Array(), t3[5] = new Array();
            var n3 = new Array();
            n3[0] = new Array(0, 2, 3, 1, 23, 19, 10, 6, 22, 18, 11, 7), n3[1] = new Array(4, 6, 7, 5, 12, 20, 2, 10, 14, 22, 0, 8), n3[2] = new Array(8, 10, 11, 9, 12, 7, 1, 17, 13, 5, 0, 19), n3[3] = new Array(12, 13, 15, 14, 8, 17, 21, 4, 9, 16, 20, 5), n3[4] = new Array(16, 17, 19, 18, 15, 9, 1, 23, 13, 11, 3, 21), n3[5] = new Array(20, 21, 23, 22, 14, 16, 3, 6, 15, 18, 2, 4);
            var o = new Array();
            function a() {
              !function() {
                var n5, o2;
                for (n5 = 0; n5 < 6; n5++)
                  for (o2 = 0; o2 < 6; o2++)
                    t3[n5][o2] = 0;
                for (n5 = 0; n5 < 48; n5 += 2)
                  r4[e3[n5]] <= 5 && r4[e3[n5 + 1]] <= 5 && t3[r4[e3[n5]]][r4[e3[n5 + 1]]]++;
              }();
              var n4 = new Array();
              for (u2 = 0; u2 < 6; u2++)
                for (m2 = 0; m2 < 6; m2++)
                  u2 != m2 && t3[u2][m2] + t3[m2][u2] === 0 && (n4[u2] = m2, n4[m2] = u2);
              for (var a2 = new Array(), f2 = new Array(), u2 = 0, c2 = 0; c2 < 7; c2++) {
                var l2 = 0;
                for (m2 = u2; m2 < u2 + 6; m2 += 2)
                  r4[e3[m2]] === r4[e3[42]] && (l2 += 4), r4[e3[m2]] === r4[e3[44]] && (l2 += 1), r4[e3[m2]] === r4[e3[46]] && (l2 += 2);
                a2[c2] = l2, r4[e3[u2]] === r4[e3[42]] || r4[e3[u2]] === n4[r4[e3[42]]] ? f2[c2] = 0 : r4[e3[u2 + 2]] === r4[e3[42]] || r4[e3[u2 + 2]] === n4[r4[e3[42]]] ? f2[c2] = 1 : f2[c2] = 2, u2 += 6;
              }
              var s2 = 0;
              for (u2 = 0; u2 < 7; u2++) {
                for (var m2 = 0, v2 = 0; v2 < 7 && a2[v2] !== u2; v2++)
                  a2[v2] > u2 && m2++;
                s2 = s2 * (7 - u2) + m2;
              }
              var h2 = 0;
              for (u2 = 5; u2 >= 0; u2--)
                h2 = 3 * h2 + f2[u2] - 3 * Math.floor(f2[u2] / 3);
              if (0 != s2 || 0 != h2) {
                o.length = 0;
                for (var p2 = d; p2 < 100 && !i(0, s2, h2, p2, -1); p2++)
                  ;
                for (h2 = "", s2 = 0; s2 < o.length; s2++)
                  h2 = "URF".charAt(o[s2] / 10) + "'2 ".charAt(o[s2] % 10) + " " + h2;
                return h2;
              }
            }
            function i(r5, e4, t4, n4, a2) {
              if (0 === n4) {
                if (0 === e4 && 0 === t4)
                  return true;
              } else {
                if (f[e4] > n4 || u[t4] > n4)
                  return false;
                var s2, m2, v2, h2;
                for (h2 = 0; h2 < 3; h2++)
                  if (h2 != a2) {
                    for (s2 = e4, m2 = t4, v2 = 0; v2 < 3; v2++)
                      if (s2 = c[s2][h2], m2 = l[m2][h2], o[r5] = 10 * h2 + v2, i(r5 + 1, s2, m2, n4 - 1, h2))
                        return true;
                  }
              }
              return false;
            }
            var f = new Array(), u = new Array(), c = new Array(), l = new Array();
            function m(r5, e4) {
              var t4, n4, o2, a2, i2 = new Array();
              for (a2 = r5, t4 = 1; t4 <= 7; t4++) {
                for (a2 = (a2 - (n4 = a2 % t4)) / t4, o2 = t4 - 1; o2 >= n4; o2--)
                  i2[o2 + 1] = i2[o2];
                i2[n4] = 7 - t4;
              }
              for (0 === e4 ? (o2 = i2[0], i2[0] = i2[1], i2[1] = i2[3], i2[3] = i2[2], i2[2] = o2) : 1 === e4 ? (o2 = i2[0], i2[0] = i2[4], i2[4] = i2[5], i2[5] = i2[1], i2[1] = o2) : 2 === e4 && (o2 = i2[0], i2[0] = i2[2], i2[2] = i2[6], i2[6] = i2[4], i2[4] = o2), a2 = 0, t4 = 0; t4 < 7; t4++) {
                for (n4 = 0, o2 = 0; o2 < 7 && i2[o2] !== t4; o2++)
                  i2[o2] > t4 && n4++;
                a2 = a2 * (7 - t4) + n4;
              }
              return a2;
            }
            function v(r5, e4) {
              var t4, n4, o2, a2, i2, f2 = new Array();
              for (i2 = r5, a2 = 0, t4 = 0; t4 <= 5; t4++)
                n4 = i2 - 3 * (o2 = Math.floor(i2 / 3)), i2 = o2, f2[t4] = n4, (a2 -= n4) < 0 && (a2 += 3);
              for (f2[6] = a2, 0 === e4 ? (o2 = f2[0], f2[0] = f2[1], f2[1] = f2[3], f2[3] = f2[2], f2[2] = o2) : 1 === e4 ? (o2 = f2[0], f2[0] = f2[4], f2[4] = f2[5], f2[5] = f2[1], f2[1] = o2, f2[0] += 2, f2[1]++, f2[5] += 2, f2[4]++) : 2 === e4 && (o2 = f2[0], f2[0] = f2[2], f2[2] = f2[6], f2[6] = f2[4], f2[4] = o2, f2[2] += 2, f2[0]++, f2[4] += 2, f2[6]++), i2 = 0, t4 = 5; t4 >= 0; t4--)
                i2 = 3 * i2 + f2[t4] % 3;
              return i2;
            }
            var h, d = 0;
            r4 = new Array();
            new Array()[0] = new Array(5, 0, 1, 4, 3, 2);
            var p = void 0, g = function(r5) {
              p = r5;
            }, y = false, b = function() {
              y || (!function() {
                for (var r5 = 0; r5 < 5040; r5++) {
                  f[r5] = -1, c[r5] = new Array();
                  for (var e4 = 0; e4 < 3; e4++)
                    c[r5][e4] = m(r5, e4);
                }
                f[0] = 0;
                for (var t4 = 0; t4 <= 6; t4++)
                  for (r5 = 0; r5 < 5040; r5++)
                    if (f[r5] === t4)
                      for (e4 = 0; e4 < 3; e4++)
                        for (var n4 = r5, o2 = 0; o2 < 3; o2++)
                          n4 = c[n4][e4], -1 === f[n4] && (f[n4] = t4 + 1);
                for (r5 = 0; r5 < 729; r5++)
                  for (u[r5] = -1, l[r5] = new Array(), e4 = 0; e4 < 3; e4++)
                    l[r5][e4] = v(r5, e4);
                for (u[0] = 0, t4 = 0; t4 <= 5; t4++)
                  for (r5 = 0; r5 < 729; r5++)
                    if (u[r5] === t4)
                      for (e4 = 0; e4 < 3; e4++)
                        for (n4 = r5, o2 = 0; o2 < 3; o2++)
                          n4 = l[n4][e4], -1 === u[n4] && (u[n4] = t4 + 1);
              }(), function() {
                var r5, e4;
                for (h = new Array(48), r5 = 0; r5 < h.length; r5++)
                  h[r5] = -1;
                for (r5 = 0; r5 < 2; r5++)
                  for (e4 = 0; e4 < 2; e4++)
                    h[8 * (6 - r5 - 1) + 2 + e4] = 2 * r5 + e4, h[8 * (2 + r5) + 2 - e4 - 1] = 2 * (2 + r5) + e4, h[8 * (2 + r5) + 8 - e4 - 1] = 2 * (4 + r5) + e4, h[8 * r5 + 2 + e4] = 2 * (6 + r5) + e4, h[8 * (2 + r5) + 4 + e4] = 2 * (8 + r5) + e4, h[8 * (2 + r5) + 2 + e4] = 2 * (10 + r5) + e4;
              }(), y = true);
            };
            return { version: "July 05, 2015", initialize: function(r5) {
              return function(r6) {
                g(r6), b();
              }(r5);
            }, setRandomSource: g, getRandomScramble: function() {
              !function() {
                for (var e5 = [0, 1, 2, 3, 4, 5, 6, 7], t4 = Array(), n4 = 0; n4 < 7; n4++) {
                  var o2 = Math.floor(p.random() * (7 - n4));
                  o2 = 6 === e5[o2] ? (o2 + 1) % (8 - n4) : o2, t4[n4 >= 6 ? n4 + 1 : n4] = e5[o2], e5[o2] = e5[7 - n4];
                }
                t4[6] = 6;
                var a2 = 0, i2 = Array();
                for (n4 = 0; n4 < 7; n4 = 5 === n4 ? n4 + 2 : n4 + 1)
                  i2[n4] = Math.floor(3 * p.random()), a2 += i2[n4];
                n4 <= 7 && (i2[n4] = (3 - a2 % 3) % 3), i2[6] = 0;
                var f2 = [[4, 3, 0], [4, 5, 3], [4, 2, 5], [4, 0, 2], [1, 0, 3], [1, 3, 5], [1, 5, 2], [1, 2, 0]], u2 = [[15, 16, 21], [13, 9, 17], [12, 5, 8], [14, 20, 4], [3, 23, 18], [1, 19, 11], [0, 10, 7], [2, 6, 22]];
                for (n4 = 0; n4 < 8; n4++)
                  for (var c2 = 0; c2 < 3; c2++)
                    r4[u2[n4][(i2[n4] + c2) % 3]] = f2[t4[n4]][c2];
              }();
              var e4 = a();
              return { state: r4, scramble_string: e4 };
            }, drawScramble: function() {
              return b(), s;
            }, setScrambleLength: function() {
            } };
          }(), ["2", "2x2", "2x2x2"]);
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => L });
        var n2 = t2(7), o = t2(11), a = t2(12), i = t2(13), f = t2(14), u = t2(15), c = t2(16), l = t2(17), s2 = t2(18), m = t2(20), v = t2(21), h = t2(22), d = t2(23), p = t2(24), g = t2(25), y = t2(26), b = t2(27), S = t2(28), w = t2(29), A = t2(30), R = t2(31);
        function L(r3) {
          (0, n2.default)(r3), (0, o.default)(r3), (0, a.default)(r3), (0, i.default)(r3), (0, f.default)(r3), (0, u.default)(r3), (0, c.default)(r3), (0, l.default)(r3), (0, s2.default)(r3), (0, m.default)(r3), (0, v.default)(r3), (0, h.default)(r3), (0, d.default)(r3), (0, p.default)(r3), (0, g.default)(r3), (0, y.default)(r3), (0, b.default)(r3), (0, S.default)(r3), (0, w.default)(r3), (0, A.default)(r3), (0, R.default)(r3);
        }
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => o });
        var n2 = t2(8);
        const o = function(r3) {
          r3("333", function(r4) {
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function() {
              return { scramble_string: r4.customScramble([0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default), ["3", "3x3", "3x3x3"]);
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => a });
        var n2 = t2(9), o = t2(10);
        const a = function() {
          var r3, e3, t3, a2, i, f, u, c, l, s2, m, v, h, d, p, g, y, b = function() {
          };
          function S() {
            S = b, g = (0, n2.createArray)(495, 18), h = (0, n2.createArray)(324, 18), i = (0, n2.createArray)(336, 18), d = (0, n2.createArray)(495, 8), y = Array(160380), p = Array(166320), v = Array(870912), m = (0, n2.createArray)(1320, 18), s2 = Array(24), e3 = Array(346), t3 = (0, n2.createArray)(2768, 18), a2 = (0, n2.createArray)(2768, 10), l = (0, n2.createArray)(24, 10), c = (0, n2.createArray)(24, 16), f = Array(66432), u = Array(66432);
          }
          function w() {
            w = b, mr = new $(), Y = Array(16), ar = Array(16), ur = (0, n2.createArray)(16, 16), ir = (0, n2.createArray)(16, 18), nr = (0, n2.createArray)(8, 8), tr = (0, n2.createArray)(8, 18), or = (0, n2.createArray)(8, 8), fr = (0, n2.createArray)(16, 10), rr = Array(336), cr = Array(324), X = Array(2768), Z = X, er = Array(40320), sr = (0, n2.createArray)(56, 56), lr = [0, 0, 0, 0, 1, 3, 1, 3, 1, 3, 1, 3, 0, 0, 0, 0], vr = new H(2531, 1373, 67026819, 1877), hr = new H(2089, 1906, 322752913, 255), dr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], [6, 7, 8, 0, 1, 2, 3, 4, 5, 15, 16, 17, 9, 10, 11, 12, 13, 14], [3, 4, 5, 6, 7, 8, 0, 1, 2, 12, 13, 14, 15, 16, 17, 9, 10, 11], [2, 1, 0, 5, 4, 3, 8, 7, 6, 11, 10, 9, 14, 13, 12, 17, 16, 15], [8, 7, 6, 2, 1, 0, 5, 4, 3, 17, 16, 15, 11, 10, 9, 14, 13, 12], [5, 4, 3, 8, 7, 6, 2, 1, 0, 14, 13, 12, 17, 16, 15, 11, 10, 9]], function() {
              var r4, e4, t4;
              for (e4 = Array(18), br = [new H(15120, 0, 119750400, 0), new H(21021, 1494, 323403417, 0), new H(8064, 1236, 29441808, 802), new H(9, 0, 5880, 0), new H(1230, 412, 2949660, 0), new H(224, 137, 328552, 1160)], r4 = 0; r4 < 6; ++r4)
                for (e4[3 * r4] = br[r4], t4 = 0; t4 < 2; ++t4)
                  e4[3 * r4 + t4 + 1] = new $(), Q(e4[3 * r4 + t4], br[r4], e4[3 * r4 + t4 + 1]), q(e4[3 * r4 + t4], br[r4], e4[3 * r4 + t4 + 1]);
              br = e4;
            }(), function() {
              var r4, e4, t4, n3, o2, a3, i2, f2, u2, c2, l2;
              for (r4 = new $(), e4 = new $(), t4 = new H(28783, 0, 259268407, 0), l2 = new H(15138, 0, 119765538, 1792), (i2 = new H(5167, 0, 83473207, 0)).co = [3, 3, 3, 3, 3, 3, 3, 3], n3 = 0; n3 < 16; ++n3)
                Y[n3] = new K(r4), J(r4, l2, e4), Q(r4, l2, e4), c2 = e4, e4 = r4, r4 = c2, n3 % 4 == 3 && (J(c2, i2, e4), Q(c2, i2, e4), c2 = e4, e4 = r4, r4 = c2), n3 % 8 == 7 && (J(c2, t4, e4), Q(c2, t4, e4), c2 = e4, e4 = r4, r4 = c2);
              for (o2 = 0; o2 < 16; ++o2)
                for (a3 = 0; a3 < 16; ++a3)
                  if (J(Y[o2], Y[a3], r4), 0 === r4.cp[0] && 1 === r4.cp[1] && 2 === r4.cp[2]) {
                    ar[o2] = a3;
                    break;
                  }
              for (n3 = 0; n3 < 16; ++n3)
                for (o2 = 0; o2 < 16; ++o2)
                  for (J(Y[n3], Y[o2], r4), a3 = 0; a3 < 16; ++a3)
                    if (Y[a3].cp[0] === r4.cp[0] && Y[a3].cp[1] === r4.cp[1] && Y[a3].cp[2] === r4.cp[2]) {
                      ur[n3][o2] = a3;
                      break;
                    }
              for (o2 = 0; o2 < 18; ++o2)
                for (u2 = 0; u2 < 16; ++u2) {
                  T(br[o2], ar[u2], r4);
                  r:
                    for (f2 = 0; f2 < 18; ++f2) {
                      for (n3 = 0; n3 < 8; ++n3)
                        if (r4.cp[n3] != br[f2].cp[n3] || r4.co[n3] != br[f2].co[n3])
                          continue r;
                      ir[u2][o2] = f2;
                    }
                }
              for (o2 = 0; o2 < 10; ++o2)
                for (u2 = 0; u2 < 16; ++u2)
                  fr[u2][o2] = Br[ir[u2][kr[o2]]];
              for (o2 = 0; o2 < 8; ++o2)
                for (u2 = 0; u2 < 8; ++u2)
                  nr[u2][o2] = ur[u2 << 1][o2 << 1] >>> 1;
              for (o2 = 0; o2 < 18; ++o2)
                for (u2 = 0; u2 < 8; ++u2)
                  tr[u2][o2] = ir[u2 << 1][o2];
              for (o2 = 0; o2 < 8; ++o2)
                for (u2 = 0; u2 < 8; ++u2)
                  or[o2][u2] = nr[o2][ar[u2 << 1] >> 1];
            }();
          }
          function A(r4) {
            r4.cp = [0, 1, 2, 3, 4, 5, 6, 7], r4.co = [0, 0, 0, 0, 0, 0, 0, 0], r4.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], r4.eo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          }
          function R(r4) {
            var e4, t4;
            if (null != pr)
              return e4 = pr[V(r4.cp)], e4 ^= lr[15 & e4];
            for (t4 = 0; t4 < 16; ++t4)
              if (T(r4, ar[t4], r4.temps), 65535 != (e4 = Tr(X, V(r4.temps.cp))))
                return e4 << 4 | t4;
            return 0;
          }
          function L(r4) {
            var e4, t4, n3, o2, a3, i2;
            for (t4 = 0, n3 = 0, o2 = 0, a3 = 3, e4 = 11; e4 >= 0; --e4)
              4 <= r4.ep[e4] && r4.ep[e4] <= 6 && (t4 += _r[e4][a3--], n3 += qr(o2 & (i2 = 1 << r4.ep[e4]) - 1) * Fr[2 - a3], o2 |= i2);
            return 6 * t4 + n3;
          }
          function _(r4) {
            var e4, t4;
            if (null != pr)
              return pr[V(r4.ep)];
            for (t4 = 0; t4 < 16; ++t4)
              if (N(r4, ar[t4], r4.temps), 65535 != (e4 = Tr(Z, V(r4.temps.ep))))
                return e4 << 4 | t4;
            return 0;
          }
          function U(r4) {
            var e4, t4;
            for (t4 = 0, e4 = 0; e4 < 11; ++e4)
              t4 |= r4.eo[e4] << e4;
            return t4;
          }
          function z(r4) {
            var e4, t4;
            if (null != gr)
              return gr[U(r4)];
            for (t4 = 0; t4 < 16; t4 += 2)
              if (N(r4, ar[t4], r4.temps), 65535 != (e4 = Tr(rr, U(r4.temps))))
                return e4 << 3 | t4 >>> 1;
            return 0;
          }
          function M(r4) {
            var e4, t4, n3, o2;
            for (n3 = 1 << r4.ep[11], t4 = 0, e4 = 10; e4 >= 8; --e4)
              t4 += qr(n3 & (o2 = 1 << r4.ep[e4]) - 1) * Fr[11 - e4], n3 |= o2;
            return t4;
          }
          function j(r4) {
            var e4, t4, n3, o2, a3, i2;
            for (t4 = 0, n3 = 0, o2 = 0, a3 = 3, e4 = 11; e4 >= 0; --e4)
              r4.ep[e4] >= 9 && (t4 += _r[e4][a3--], n3 += qr(o2 & (i2 = 1 << r4.ep[e4]) - 1) * Fr[2 - a3], o2 |= i2);
            return 6 * t4 + n3;
          }
          function x(r4) {
            var e4, t4;
            for (t4 = 0, e4 = 0; e4 < 7; ++e4)
              t4 *= 3, t4 += r4.co[e4];
            return t4;
          }
          function C(r4) {
            var e4, t4;
            if (null != yr)
              return yr[x(r4)];
            for (t4 = 0; t4 < 16; t4 += 2)
              if (T(r4, ar[t4], r4.temps), e4 = x(r4.temps), 65535 != (e4 = Tr(cr, e4)))
                return e4 << 3 | t4 >>> 1;
            return 0;
          }
          function F(r4) {
            var e4, t4, n3;
            for (t4 = 0, n3 = 4, e4 = 0; e4 < 12; ++e4)
              r4.ep[e4] >= 8 && (t4 += _r[11 - e4][n3--]);
            return t4;
          }
          function P(r4) {
            var e4, t4, n3, o2, a3, i2;
            for (t4 = 0, n3 = 0, o2 = 0, a3 = 3, e4 = 11; e4 >= 0; --e4)
              r4.ep[e4] <= 2 && (t4 += _r[e4][a3--], n3 += qr(o2 & (i2 = 1 << r4.ep[e4]) - 1) * Fr[2 - a3], o2 |= i2);
            return 6 * t4 + n3;
          }
          function E(r4) {
            var e4, t4, n3;
            for (t4 = 0; t4 < 12; ++t4)
              r4.temps.ep[r4.ep[t4]] = t4;
            for (t4 = 0; t4 < 12; ++t4)
              r4.temps.eo[t4] = r4.eo[r4.temps.ep[t4]];
            for (e4 = 0; e4 < 8; ++e4)
              r4.temps.cp[r4.cp[e4]] = e4;
            for (e4 = 0; e4 < 8; ++e4)
              n3 = r4.co[r4.temps.cp[e4]], r4.temps.co[e4] = -n3, r4.temps.co[e4] < 0 && (r4.temps.co[e4] = r4.temps.co[e4] + 3);
            !function(r5, e5) {
              r5.cp = e5.cp.map(function(r6) {
                return r6;
              }), r5.co = e5.co.map(function(r6) {
                return r6;
              }), r5.ep = e5.ep.map(function(r6) {
                return r6;
              }), r5.eo = e5.eo.map(function(r6) {
                return r6;
              });
            }(r4, r4.temps);
          }
          function O(r4, e4) {
            r4.eo[11] = function(r5) {
              return r5 ^= r5 >>> 1, r5 ^= r5 >>> 2, r5 ^= r5 >>> 4, 1 & (r5 ^= r5 >>> 8);
            }(e4);
            for (var t4 = 0; t4 < 11; ++t4)
              r4.eo[t4] = 1 & e4, e4 >>>= 1;
          }
          function B(r4, e4) {
            r4.ep[11] = 8;
            for (var t4 = 10; t4 >= 8; --t4) {
              r4.ep[t4] = e4 % (12 - t4) + 8, e4 = ~~(e4 / (12 - t4));
              for (var n3 = t4 + 1; n3 < 12; ++n3)
                r4.ep[n3] >= r4.ep[t4] && ++r4.ep[n3];
            }
          }
          function k(r4, e4) {
            var t4 = Or[e4 % 6];
            e4 = ~~(e4 / 6);
            for (var n3 = 3, o2 = 11; o2 >= 0; --o2)
              e4 >= _r[o2][n3] ? (e4 -= _r[o2][n3--], r4.ep[o2] = t4[2 - n3]) : r4.ep[o2] = 8 - o2 + n3;
          }
          function D(r4, e4) {
            for (var t4 = 0, n3 = 6; n3 >= 0; --n3)
              t4 += r4.co[n3] = e4 % 3, e4 = ~~(e4 / 3);
            r4.co[7] = (15 - t4) % 3;
          }
          function I(r4, e4) {
            for (var t4 = 4, n3 = 0; n3 < 12; ++n3)
              e4 >= _r[11 - n3][t4] ? (e4 -= _r[11 - n3][t4--], r4.ep[n3] = 11 - t4) : r4.ep[n3] = n3 + t4 - 4;
          }
          function T(r4, e4, t4) {
            J(Y[ar[e4]], r4, mr), J(mr, Y[e4], t4);
          }
          function q(r4, e4, t4) {
            for (var n3 = 0; n3 < 8; ++n3)
              t4.cp[n3] = r4.cp[e4.cp[n3]], t4.co[n3] = (r4.co[e4.cp[n3]] + e4.co[n3]) % 3;
          }
          function J(r4, e4, t4) {
            for (var n3, o2, a3, i2 = 0; i2 < 8; ++i2)
              t4.cp[i2] = r4.cp[e4.cp[i2]], o2 = r4.co[e4.cp[i2]], a3 = e4.co[i2], n3 = o2, n3 += o2 < 3 ? a3 : 3 - a3, n3 %= 3, o2 < 3 ^ a3 < 3 && (n3 += 3), t4.co[i2] = n3;
          }
          function $() {
            A(this);
          }
          function G(r4, e4, t4, n3) {
            A(this);
            for (var o2 = 0; o2 < 8; ++o2)
              this.cp[o2] = r4[o2], this.co[o2] = e4[o2];
            for (var a3 = 0; a3 < 12; ++a3)
              this.ep[a3] = t4[a3], this.eo[a3] = n3[a3];
          }
          function H(r4, e4, t4, n3) {
            A(this), W(this.cp, r4), D(this, e4), function(r5, e5) {
              r5.ep[11] = 0;
              for (var t5 = 10; t5 >= 0; --t5) {
                r5.ep[t5] = e5 % (12 - t5), e5 = ~~(e5 / (12 - t5));
                for (var n4 = t5 + 1; n4 < 12; ++n4)
                  r5.ep[n4] >= r5.ep[t5] && ++r5.ep[n4];
              }
            }(this, t4), O(this, n3);
          }
          function K(r4) {
            G.call(this, r4.cp, r4.co, r4.ep, r4.eo);
          }
          function N(r4, e4, t4) {
            Q(Y[ar[e4]], r4, mr), Q(mr, Y[e4], t4);
          }
          function Q(r4, e4, t4) {
            var n3;
            for (n3 = 0; n3 < 12; ++n3)
              t4.ep[n3] = r4.ep[e4.ep[n3]], t4.eo[n3] = e4.eo[n3] ^ r4.eo[e4.ep[n3]];
          }
          function V(r4) {
            var e4, t4, n3, o2;
            for (t4 = 0, o2 = 1985229328, e4 = 0; e4 < 7; ++e4)
              t4 = (8 - e4) * t4 + (o2 >> (n3 = r4[e4] << 2) & 7), o2 -= 286331152 << n3;
            return t4;
          }
          function W(r4, e4) {
            var t4, n3, o2, a3, i2;
            for (i2 = 1985229328, t4 = 0; t4 < 7; ++t4)
              e4 -= (a3 = ~~(e4 / (o2 = Fr[7 - t4]))) * o2, a3 <<= 2, r4[t4] = i2 >> a3 & 7, i2 = (i2 & (n3 = (1 << a3) - 1)) + (i2 >> 4 & ~n3);
            r4[7] = i2;
          }
          (r3 = K.prototype = H.prototype = $.prototype = function() {
          }.prototype).temps = null;
          var X, Y, Z, rr, er, tr, nr, or, ar, ir, fr, ur, cr, lr, sr, mr, vr, hr, dr, pr = null, gr = null, yr = null, br = null;
          function Sr(r4, n3, o2, a3, l2, b2, S2, w2) {
            var A2, R2, L2, _2, U2, z2;
            if (0 === n3 && 0 === a3 && 0 === b2 && S2 < 5)
              return 0 === S2 && function(r5) {
                var n4, o3, a4, i2, l3, v2, h2, d2, p2, g2, y2, b3;
                for (r5.valid2 = Math.min(r5.valid2, r5.valid1), l3 = r5.valid1; l3 < r5.length1; ++l3)
                  h2 = r5.move[l3], r5.corn[l3 + 1] = t3[r5.corn[l3]][ir[r5.csym[l3]][h2]], r5.csym[l3 + 1] = ur[15 & r5.corn[l3 + 1]][r5.csym[l3]], r5.corn[l3 + 1] >>>= 4, r5.mid3[l3 + 1] = m[r5.mid3[l3]][h2];
                if (r5.valid1 = r5.length1, d2 = s2[r5.mid3[r5.length1] % 24], (p2 = f[24 * r5.corn[r5.length1] + c[d2][r5.csym[r5.length1]]]) >= r5.maxlength2)
                  return false;
                for (l3 = r5.valid2; l3 < r5.length1; ++l3)
                  r5.e1[l3 + 1] = m[r5.e1[l3]][r5.move[l3]], r5.e2[l3 + 1] = m[r5.e2[l3]][r5.move[l3]];
                if (r5.valid2 = r5.length1, n4 = r5.corn[r5.length1], i2 = 4032 * sr[~~(r5.e1[r5.length1] / 6)][~~(r5.e2[r5.length1] / 6)] + 12 * r5.e1[r5.length1] + r5.e2[r5.length1] % 6 * 2 + (e3[n4 >>> 3] >>> (7 & n4) & 1 ^ Er[d2]), a4 = 15 & (o3 = er[i2]), o3 >>>= 4, (p2 = Math.max(u[24 * o3 + c[d2][a4]], p2)) >= r5.maxlength2)
                  return false;
                for (v2 = 0 === r5.length1 ? 10 : Br[3 * ~~(r5.move[r5.length1 - 1] / 3) + 1], l3 = p2; l3 < r5.maxlength2; ++l3)
                  if (wr(r5, o3, a4, r5.corn[r5.length1], r5.csym[r5.length1], d2, l3, r5.length1, v2)) {
                    if (r5.sol = r5.length1 + l3, y2 = "", (b3 = ((b3 = r5.urfidx) + 3) % 6) < 3) {
                      for (g2 = 0; g2 < r5.length1; ++g2)
                        y2 += Pr[dr[b3][r5.move[g2]]], y2 += " ";
                      for (r5.useSeparator && (y2.impl.string += "."), g2 = r5.length1; g2 < r5.sol; ++g2)
                        y2 += Pr[dr[b3][r5.move[g2]]], y2 += " ";
                    } else {
                      for (g2 = r5.sol - 1; g2 >= r5.length1; --g2)
                        y2 += Pr[dr[b3][r5.move[g2]]], y2 += " ";
                      for (r5.useSeparator && (y2 += "."), g2 = r5.length1 - 1; g2 >= 0; --g2)
                        y2 += Pr[dr[b3][r5.move[g2]]], y2 += " ";
                    }
                    return r5.solution = y2, true;
                  }
                return false;
              }(r4);
            for (L2 = 0; L2 < 18; ++L2)
              if (Ur[w2][L2])
                L2 += 2;
              else if (_2 = g[b2][L2], z2 = h[n3][tr[o2][L2]], U2 = nr[7 & z2][o2], !(y[495 * (z2 >>>= 3) + d[_2][U2]] >= S2) && (A2 = i[a3][tr[l2][L2]], R2 = nr[7 & A2][l2], !(v[2688 * z2 + ((A2 >>>= 3) << 3 | or[R2][U2])] >= S2 || p[495 * A2 + d[_2][R2]] >= S2) && (r4.move[r4.length1 - S2] = L2, r4.valid1 = Math.min(r4.valid1, r4.length1 - S2), Sr(r4, z2, U2, A2, R2, _2, S2 - 1, L2))))
                return true;
            return false;
          }
          function wr(r4, e4, n3, o2, i2, s3, m2, v2, h2) {
            var d2, p2, g2, y2, b2, S2;
            if (0 === e4 && 0 === o2 && 0 === s3)
              return true;
            for (b2 = 0; b2 < 10; ++b2)
              if (!zr[h2][b2] && (S2 = l[s3][b2], g2 = a2[e4][fr[n3][b2]], y2 = ur[15 & g2][n3], !(u[24 * (g2 >>>= 4) + c[S2][y2]] >= m2) && (d2 = t3[o2][ir[i2][kr[b2]]], p2 = ur[15 & d2][i2], !(f[24 * (d2 >>>= 4) + c[S2][p2]] >= m2) && (r4.move[v2] = kr[b2], wr(r4, g2, y2, d2, p2, S2, m2 - 1, v2 + 1, b2)))))
                return true;
            return false;
          }
          function Ar(r4, e4) {
            var t4, n3;
            for (Lr(), n3 = 0; n3 < 54; ++n3)
              switch (e4.charCodeAt(n3)) {
                case 85:
                  r4.f[n3] = 0;
                  break;
                case 82:
                  r4.f[n3] = 1;
                  break;
                case 70:
                  r4.f[n3] = 2;
                  break;
                case 68:
                  r4.f[n3] = 3;
                  break;
                case 76:
                  r4.f[n3] = 4;
                  break;
                case 66:
                  r4.f[n3] = 5;
                  break;
                default:
                  return "Error 1";
              }
            return t4 = function(r5) {
              var e5, t5, n4, o2, a3, i2;
              for (e5 = new $(), o2 = 0; o2 < 8; ++o2)
                e5.cp[o2] = 0;
              for (o2 = 0; o2 < 12; ++o2)
                e5.ep[o2] = 0;
              for (o2 = 0; o2 < 8; ++o2) {
                for (i2 = 0; i2 < 3 && (0 !== r5[jr[o2][i2]] && 3 !== r5[jr[o2][i2]]); ++i2)
                  ;
                for (t5 = r5[jr[o2][(i2 + 1) % 3]], n4 = r5[jr[o2][(i2 + 2) % 3]], a3 = 0; a3 < 8; ++a3)
                  if (t5 === Mr[a3][1] && n4 === Mr[a3][2]) {
                    e5.cp[o2] = a3, e5.co[o2] = i2 % 3;
                    break;
                  }
              }
              for (o2 = 0; o2 < 12; ++o2)
                for (a3 = 0; a3 < 12; ++a3) {
                  if (r5[Cr[o2][0]] === xr[a3][0] && r5[Cr[o2][1]] === xr[a3][1]) {
                    e5.ep[o2] = a3, e5.eo[o2] = 0;
                    break;
                  }
                  if (r5[Cr[o2][0]] === xr[a3][1] && r5[Cr[o2][1]] === xr[a3][0]) {
                    e5.ep[o2] = a3, e5.eo[o2] = 1;
                    break;
                  }
                }
              return e5;
            }(r4.f), r4.sol = 25, function(r5, e5) {
              var t5;
              for (e5.temps = new $(), t5 = 0; t5 < 6; ++t5)
                r5.twist[t5] = C(e5), r5.tsym[t5] = 7 & r5.twist[t5], r5.twist[t5] >>>= 3, r5.flip[t5] = z(e5), r5.fsym[t5] = 7 & r5.flip[t5], r5.flip[t5] >>>= 3, r5.slice_0[t5] = F(e5), r5.corn0[t5] = R(e5), r5.csym0[t5] = 15 & r5.corn0[t5], r5.corn0[t5] >>>= 4, r5.mid30[t5] = j(e5), r5.e10[t5] = P(e5), r5.e20[t5] = L(e5), r5.prun[t5] = Math.max(Math.max(y[495 * r5.twist[t5] + d[r5.slice_0[t5]][r5.tsym[t5]]], p[495 * r5.flip[t5] + d[r5.slice_0[t5]][r5.fsym[t5]]]), v[2688 * r5.twist[t5] + (r5.flip[t5] << 3 | or[r5.fsym[t5]][r5.tsym[t5]])]), q(hr, e5, e5.temps), q(e5.temps, vr, e5), Q(hr, e5, e5.temps), Q(e5.temps, vr, e5), 2 === t5 && E(e5);
              for (r5.solution = null, r5.length1 = 0; r5.length1 < r5.sol; ++r5.length1)
                for (r5.maxlength2 = Math.min(1 + ~~(r5.sol / 2), r5.sol - r5.length1), r5.urfidx = 0; r5.urfidx < 6; ++r5.urfidx)
                  if (r5.corn[0] = r5.corn0[r5.urfidx], r5.csym[0] = r5.csym0[r5.urfidx], r5.mid3[0] = r5.mid30[r5.urfidx], r5.e1[0] = r5.e10[r5.urfidx], r5.e2[0] = r5.e20[r5.urfidx], r5.prun[r5.urfidx] <= r5.length1 && Sr(r5, r5.twist[r5.urfidx], r5.tsym[r5.urfidx], r5.flip[r5.urfidx], r5.fsym[r5.urfidx], r5.slice_0[r5.urfidx], r5.length1, 18))
                    return null === r5.solution ? "Error 8" : r5.solution;
              return "Error 7";
            }(r4, t4);
          }
          function Rr() {
            this.move = Array(31), this.corn = Array(20), this.csym = Array(20), this.mid3 = Array(20), this.e1 = Array(20), this.e2 = Array(20), this.twist = Array(6), this.tsym = Array(6), this.flip = Array(6), this.fsym = Array(6), this.slice_0 = Array(6), this.corn0 = Array(6), this.csym0 = Array(6), this.mid30 = Array(6), this.e10 = Array(6), this.e20 = Array(6), this.prun = Array(6), this.count = Array(6), this.f = Array(54);
          }
          function Lr(r4) {
            Dr || (Ir(), r4("[0/9] Initializing Cubie Cube..."), w(), gr = Array(2048), yr = Array(2187), pr = Array(40320), r4("[1/9] Initializing Sym2Raw..."), function() {
              var r5, e4, t4, n3, o2, a3, i2, f2, u2, c2, l2, s3;
              for (t4 = new $(), o2 = new $(), l2 = Array(1260), n3 = 0, a3 = 0; a3 < 64; l2[a3++] = 0)
                ;
              for (a3 = 0; a3 < 2048; ++a3)
                if (0 == (l2[a3 >>> 5] & 1 << (31 & a3))) {
                  for (O(t4, a3), s3 = 0; s3 < 16; s3 += 2)
                    Q(Y[ar[s3]], t4, mr), Q(mr, Y[s3], o2), l2[(i2 = U(o2)) >>> 5] |= 1 << (31 & i2), gr[i2] = n3 << 3 | s3 >>> 1;
                  rr[n3++] = a3;
                }
              for (n3 = 0, a3 = 0; a3 < 69; l2[a3++] = 0)
                ;
              for (a3 = 0; a3 < 2187; ++a3)
                if (0 == (l2[a3 >>> 5] & 1 << (31 & a3))) {
                  for (D(t4, a3), s3 = 0; s3 < 16; s3 += 2)
                    J(Y[ar[s3]], t4, mr), J(mr, Y[s3], o2), l2[(i2 = x(o2)) >>> 5] |= 1 << (31 & i2), yr[i2] = n3 << 3 | s3 >>> 1;
                  cr[n3++] = a3;
                }
              for ((c2 = Array(2))[0] = Array(56), c2[1] = Array(56), a3 = 0; a3 < 56; ++a3)
                c2[0][a3] = c2[1][a3] = 0;
              for (a3 = 0; a3 < 40320; ++a3)
                W(t4.ep, a3), r5 = ~~(P(t4) / 6), c2[(e4 = ~~(L(t4) / 6)) >> 5][r5] |= 1 << (31 & e4);
              for (a3 = 0; a3 < 56; ++a3)
                for (n3 = 0, f2 = 0; f2 < 56; ++f2)
                  0 != (c2[f2 >> 5][a3] & 1 << (31 & f2)) && (sr[a3][f2] = n3++);
              for (n3 = 0, a3 = 0; a3 < 1260; l2[a3++] = 0)
                ;
              for (a3 = 0; a3 < 40320; ++a3)
                if (0 == (l2[a3 >>> 5] & 1 << (31 & a3))) {
                  for (W(t4.ep, a3), s3 = 0; s3 < 16; ++s3)
                    Q(Y[ar[s3]], t4, mr), Q(mr, Y[s3], o2), l2[(i2 = V(o2.ep)) >>> 5] |= 1 << (31 & i2), r5 = P(o2), e4 = L(o2), u2 = 4032 * sr[~~(r5 / 6)][~~(e4 / 6)] + 12 * r5 + e4 % 6 * 2 + Gr(i2), er[u2] = n3 << 4 | s3, pr[i2] = n3 << 4 | s3;
                  Z[n3++] = a3;
                }
            }(), r4("[2/9] Initializing CoordCube..."), S(), r4("[3/9] Initializing Perm, Flip, and Twist Moves..."), function() {
              for (var r5 = new $(), e4 = new $(), n3 = 0; n3 < 2768; ++n3) {
                W(r5.cp, X[n3]);
                for (var o2 = 0; o2 < 18; ++o2)
                  q(r5, br[o2], e4), t3[n3][o2] = R(e4);
              }
            }(), function() {
              for (var r5 = new $(), e4 = new $(), t4 = 0; t4 < 2768; ++t4) {
                W(r5.ep, Z[t4]);
                for (var n3 = 0; n3 < 10; ++n3)
                  Q(r5, br[kr[n3]], e4), a2[t4][n3] = _(e4);
              }
            }(), function() {
              for (var r5 = new $(), e4 = new $(), t4 = 0; t4 < 336; ++t4) {
                O(r5, rr[t4]);
                for (var n3 = 0; n3 < 18; ++n3)
                  Q(r5, br[n3], e4), i[t4][n3] = z(e4);
              }
            }(), function() {
              for (var r5 = new $(), e4 = new $(), t4 = 0; t4 < 324; ++t4) {
                D(r5, cr[t4]);
                for (var n3 = 0; n3 < 18; ++n3)
                  q(r5, br[n3], e4), h[t4][n3] = C(e4);
              }
            }(), r4("[4/9] Initializing UDSlice..."), pr = null, gr = null, yr = null, function() {
              for (var r5 = new $(), e4 = new $(), t4 = 0; t4 < 495; ++t4) {
                I(r5, t4);
                for (var n3 = 0; n3 < 18; ++n3)
                  Q(r5, br[n3], e4), g[t4][n3] = F(e4);
              }
            }(), function() {
              for (var r5 = new $(), e4 = new $(), t4 = 0; t4 < 495; ++t4) {
                I(r5, t4);
                for (var n3 = 0; n3 < 16; n3 += 2)
                  N(r5, ar[n3], e4), d[t4][n3 >>> 1] = F(e4);
              }
            }(), r4("[5/9] Initializing Mid3Move..."), function() {
              for (var r5 = new $(), e4 = new $(), t4 = 0; t4 < 1320; ++t4) {
                k(r5, t4);
                for (var n3 = 0; n3 < 18; ++n3)
                  Q(r5, br[n3], e4), m[t4][n3] = j(e4);
              }
            }(), function() {
              var r5, e4;
              for (r5 = new $(), e4 = 0; e4 < 24; ++e4)
                B(r5, e4), s2[j(r5) % 24] = e4;
            }(), function() {
              for (var r5 = 0; r5 < 346; ++r5)
                e3[r5] = 0;
              for (var t4 = 0; t4 < 2768; ++t4)
                e3[t4 >>> 3] = e3[t4 >>> 3] | Gr(X[t4]) << (7 & t4);
            }(), r4("[6/9] Initializing Perms..."), function() {
              for (var r5 = new $(), e4 = new $(), t4 = 0; t4 < 24; ++t4) {
                B(r5, t4);
                for (var n3 = 0; n3 < 10; ++n3)
                  Q(r5, br[kr[n3]], e4), l[t4][n3] = M(e4);
              }
            }(), function() {
              for (var r5 = new $(), e4 = new $(), t4 = 0; t4 < 24; ++t4) {
                B(r5, t4);
                for (var n3 = 0; n3 < 16; ++n3)
                  N(r5, ar[n3], e4), c[t4][n3] = M(e4);
              }
            }(), r4("[7/9] Initializing TwistFlipSlicePrun..."), function(r5) {
              var e4, t4, n3, o2, a3, f2, u2, c2, l2, s3, m2, b2, S2, w2, A2, R2, L2, _2, z2, M2, j2, C2, F2, P2, E2, B2, k2, I2;
              for (e4 = Array(324), n3 = new $(), a3 = new $(), S2 = 0; S2 < 324; ++S2)
                for (e4[S2] = 0, D(n3, cr[S2]), L2 = 0; L2 < 8; ++L2)
                  J(Y[ar[L2 << 1]], n3, mr), J(mr, Y[L2 << 1], a3), 65535 != Tr(cr, x(a3)) && (e4[S2] = e4[S2] | 1 << L2);
              for (t4 = Array(336), S2 = 0; S2 < 336; ++S2)
                for (t4[S2] = 0, O(n3, rr[S2]), L2 = 0; L2 < 8; ++L2)
                  Q(Y[ar[L2 << 1]], n3, mr), Q(mr, Y[L2 << 1], a3), 65535 != Tr(rr, U(a3)) && (t4[S2] = t4[S2] | 1 << L2);
              for (S2 = 0; S2 < 870912; ++S2)
                v[S2] = -1;
              for (S2 = 0; S2 < 8; ++S2)
                v[S2] = 0;
              for (f2 = 0, u2 = 8; u2 < 870912; ) {
                for (M2 = (R2 = f2 > 6) ? -1 : f2, o2 = R2 ? f2 : -1, ++f2, S2 = 0; S2 < 870912; ++S2)
                  if (v[S2] == M2) {
                    for (k2 = ~~(S2 / 2688), c2 = S2 % 2688, s3 = 7 & S2, c2 >>>= 3, z2 = 0; z2 < 18; ++z2)
                      if (B2 = 7 & (I2 = h[k2][z2]), I2 >>>= 3, l2 = i[c2][tr[s3][z2]], m2 = or[nr[7 & l2][s3]][B2], v[w2 = 2688 * I2 + ((l2 >>>= 3) << 3 | m2)] === o2) {
                        if (++u2, R2) {
                          v[S2] = f2;
                          break;
                        }
                        if (v[w2] = f2, F2 = e4[I2], P2 = t4[l2], 1 != F2 || 1 != P2) {
                          for (L2 = 0; L2 < 8; ++L2, P2 >>= 1)
                            if (1 == (1 & P2))
                              for (b2 = or[m2][L2], _2 = 0; _2 < 8; ++_2)
                                0 != (F2 & 1 << _2) && (A2 = 2688 * I2 + (l2 << 3 | or[b2][_2]), -1 === v[A2] && (v[A2] = f2, ++u2));
                        }
                      }
                  }
                r5("TwistFlipPrun: " + Math.floor(100 * u2 / 870912) + "% (" + u2 + "/870912)");
              }
              for (S2 = 0; S2 < 160380; ++S2)
                y[S2] = -1;
              for (y[0] = 0, f2 = 0, u2 = 1; u2 < 160380; ) {
                for (M2 = (R2 = f2 > 6) ? -1 : f2, o2 = R2 ? f2 : -1, ++f2, S2 = 0; S2 < 160380; ++S2)
                  if (y[S2] === M2) {
                    for (j2 = S2 % 495, k2 = ~~(S2 / 495), z2 = 0; z2 < 18; ++z2)
                      if (E2 = 7 & (I2 = h[k2][z2]), C2 = d[g[j2][z2]][E2], y[w2 = 495 * (I2 >>>= 3) + C2] === o2) {
                        if (++u2, R2) {
                          y[S2] = f2;
                          break;
                        }
                        if (y[w2] = f2, 1 != (F2 = e4[I2]))
                          for (L2 = 1; L2 < 8; ++L2)
                            1 == (1 & (F2 >>= 1)) && (A2 = 495 * I2 + d[C2][L2], -1 === y[A2] && (y[A2] = f2, ++u2));
                      }
                  }
                r5("UDSliceTwistPrun: " + Math.floor(100 * u2 / 160380) + "% (" + u2 + "/160380)");
              }
              for (S2 = 0; S2 < 166320; ++S2)
                p[S2] = -1;
              for (p[0] = 0, f2 = 0, u2 = 1; u2 < 166320; ) {
                for (M2 = (R2 = f2 > 6) ? -1 : f2, o2 = R2 ? f2 : -1, ++f2, S2 = 0; S2 < 166320; ++S2)
                  if (p[S2] === M2) {
                    for (j2 = S2 % 495, c2 = ~~(S2 / 495), z2 = 0; z2 < 18; ++z2)
                      if (E2 = 7 & (l2 = i[c2][z2]), C2 = d[g[j2][z2]][E2], p[w2 = 495 * (l2 >>>= 3) + C2] === o2) {
                        if (++u2, R2) {
                          p[S2] = f2;
                          break;
                        }
                        if (p[w2] = f2, 1 != (F2 = t4[l2]))
                          for (L2 = 1; L2 < 8; ++L2)
                            1 == (1 & (F2 >>= 1)) && (A2 = 495 * l2 + d[C2][L2], -1 === p[A2] && (p[A2] = f2, ++u2));
                      }
                  }
                r5("UDSliceFlipPrun: " + Math.floor(100 * u2 / 166320) + "% (" + u2 + "/166320)");
              }
            }(r4), r4("[8/9] Initializing MCEPermPrum..."), function(r5) {
              var e4, n3, o2, i2, s3, m2, v2, h2, d2, p2, g2, y2, b2, S2, w2, A2, R2 = new $(), L2 = new $(), _2 = 0, U2 = 1, z2 = Array(2768);
              for (m2 = 0; m2 < 2768; ++m2)
                for (z2[m2] = 0, W(R2.ep, Z[m2]), p2 = 1; p2 < 16; ++p2)
                  Q(Y[ar[p2]], R2, mr), Q(mr, Y[p2], L2), 65535 != Tr(Z, V(L2.ep)) && (z2[m2] = z2[m2] | 1 << p2);
              for (m2 = 0; m2 < 66432; ++m2)
                u[m2] = -1;
              for (u[0] = 0; U2 < 66432; ) {
                for (S2 = (d2 = _2 > 7) ? -1 : _2, e4 = d2 ? _2 : -1, ++_2, m2 = 0; m2 < 66432; ++m2)
                  if (u[m2] === S2) {
                    for (y2 = m2 % 24, i2 = ~~(m2 / 24), g2 = 0; g2 < 10; ++g2)
                      if (A2 = 15 & (s3 = a2[i2][g2]), b2 = c[l[y2][g2]][A2], u[v2 = 24 * (s3 >>>= 4) + b2] === e4) {
                        if (++U2, d2) {
                          u[m2] = _2;
                          break;
                        }
                        if (u[v2] = _2, 0 != (w2 = z2[s3]))
                          for (p2 = 1; p2 < 16; ++p2)
                            1 == (1 & (w2 >>= 1)) && (h2 = 24 * s3 + c[b2][p2], -1 === u[h2] && (u[h2] = _2, ++U2));
                      }
                  }
                r5("MEPermPrun: " + Math.floor(100 * U2 / 66432) + "% (" + U2 + "/66432)");
              }
              for (m2 = 0; m2 < 66432; ++m2)
                f[m2] = -1;
              for (f[0] = 0, _2 = 0, U2 = 1; U2 < 66432; ) {
                for (S2 = (d2 = _2 > 7) ? -1 : _2, e4 = d2 ? _2 : -1, ++_2, m2 = 0; m2 < 66432; ++m2)
                  if (f[m2] === S2) {
                    for (y2 = m2 % 24, n3 = ~~(m2 / 24), g2 = 0; g2 < 10; ++g2)
                      if (A2 = 15 & (o2 = t3[n3][kr[g2]]), b2 = c[l[y2][g2]][A2], f[v2 = 24 * (o2 >>>= 4) + b2] === e4) {
                        if (++U2, d2) {
                          f[m2] = _2;
                          break;
                        }
                        if (f[v2] = _2, 0 != (w2 = z2[o2]))
                          for (p2 = 1; p2 < 16; ++p2)
                            1 == (1 & (w2 >>= 1)) && (h2 = 24 * o2 + c[b2][p2 ^ lr[p2]], -1 === f[h2] && (f[h2] = _2, ++U2));
                      }
                  }
                r5("MCPermPrun: " + Math.floor(100 * U2 / 66432) + "% (" + U2 + "/66432)");
              }
            }(r4), r4("[9/9] Done initializing 3x3x3..."), Dr = true);
          }
          (r3 = Rr.prototype).inverse = false, r3.length1 = 0, r3.maxlength2 = 0, r3.sol = 999, r3.solution = null, r3.urfidx = 0, r3.useSeparator = false, r3.valid1 = 0, r3.valid2 = 0;
          var _r, Ur, zr, Mr, jr, xr, Cr, Fr, Pr, Er, Or, Br, kr, Dr = false;
          function Ir() {
            Ir = b, jr = [[8, 9, 20], [6, 18, 38], [0, 36, 47], [2, 45, 11], [29, 26, 15], [27, 44, 24], [33, 53, 42], [35, 17, 51]], Cr = [[5, 10], [7, 19], [3, 37], [1, 46], [32, 16], [28, 25], [30, 43], [34, 52], [23, 12], [21, 41], [50, 39], [48, 14]], Mr = [[0, 1, 2], [0, 2, 4], [0, 4, 5], [0, 5, 1], [3, 2, 1], [3, 4, 2], [3, 5, 4], [3, 1, 5]], xr = [[0, 1], [0, 2], [0, 4], [0, 5], [3, 1], [3, 2], [3, 4], [3, 5], [2, 1], [2, 4], [5, 4], [5, 1]], _r = (0, n2.createArray)(12, 12), Fr = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600], Pr = ["U ", "U2", "U'", "R ", "R2", "R'", "F ", "F2", "F'", "D ", "D2", "D'", "L ", "L2", "L'", "B ", "B2", "B'"], kr = [0, 1, 2, 4, 7, 9, 10, 11, 13, 16], Br = Array(18), Ur = (0, n2.createArray)(19, 18), zr = (0, n2.createArray)(11, 10), Er = Array(24), Or = [[11, 10, 9], [10, 11, 9], [11, 9, 10], [9, 11, 10], [10, 9, 11], [9, 10, 11]];
            for (var r4 = 0; r4 < 10; ++r4)
              Br[kr[r4]] = r4;
            for (var e4 = 0; e4 < 18; ++e4) {
              for (var t4 = 0; t4 < 18; ++t4)
                Ur[e4][t4] = ~~(e4 / 3) == ~~(t4 / 3) || ~~(e4 / 3) % 3 == ~~(t4 / 3) % 3 && e4 >= t4;
              Ur[18][e4] = false;
            }
            for (var o2 = 0; o2 < 10; ++o2) {
              for (var a3 = 0; a3 < 10; ++a3)
                zr[o2][a3] = Ur[kr[o2]][kr[a3]];
              zr[10][o2] = false;
            }
            for (var i2 = 0; i2 < 12; ++i2)
              for (var f2 = 0; f2 < 12; ++f2)
                _r[i2][f2] = 0;
            for (var u2 = 0; u2 < 12; ++u2) {
              _r[u2][0] = 1, _r[u2][u2] = 1;
              for (var c2 = 1; c2 < u2; ++c2)
                _r[u2][c2] = _r[u2 - 1][c2 - 1] + _r[u2 - 1][c2];
            }
            for (var l2 = 0; l2 < 24; ++l2)
              Er[l2] = $r(l2);
          }
          function Tr(r4, e4) {
            var t4 = r4.length;
            if (e4 <= r4[t4 - 1])
              for (var n3 = 0, o2 = t4 - 1; n3 <= o2; ) {
                var a3 = n3 + o2 >>> 1, i2 = r4[a3];
                if (e4 > i2)
                  n3 = a3 + 1;
                else {
                  if (!(e4 < i2))
                    return a3;
                  o2 = a3 - 1;
                }
              }
            return 65535;
          }
          function qr(r4) {
            return (r4 = (858993459 & (r4 -= r4 >>> 1 & 1431655765)) + (r4 >>> 2 & 858993459)) + (r4 >>> 8) + (r4 >>> 4) & 15;
          }
          function Jr(r4) {
            for (var e4 = 0, t4 = 10; t4 >= 0; --t4)
              e4 += r4 % (12 - t4), r4 = ~~(r4 / (12 - t4));
            return e4 &= 1;
          }
          function $r(r4) {
            for (var e4 = 0, t4 = 2; t4 >= 0; --t4)
              e4 += r4 % (4 - t4), r4 = ~~(r4 / (4 - t4));
            return e4 &= 1;
          }
          function Gr(r4) {
            for (var e4 = 0, t4 = 6; t4 >= 0; --t4)
              e4 += r4 % (8 - t4), r4 = ~~(r4 / (8 - t4));
            return e4 &= 1;
          }
          function Hr(r4) {
            var e4, t4, n3, o2, a3, i2, f2, u2;
            for (n3 = Array(54), u2 = [85, 82, 70, 68, 76, 66], o2 = 0; o2 < 54; ++o2)
              n3[o2] = u2[~~(o2 / 9)];
            for (e4 = 0; e4 < 8; ++e4)
              for (a3 = r4.cp[e4], f2 = r4.co[e4], i2 = 0; i2 < 3; ++i2)
                n3[jr[e4][(i2 + f2) % 3]] = u2[Mr[a3][i2]];
            for (t4 = 0; t4 < 12; ++t4)
              for (a3 = r4.ep[t4], f2 = r4.eo[t4], i2 = 0; i2 < 2; ++i2)
                n3[Cr[t4][(i2 + f2) % 2]] = u2[xr[a3][i2]];
            return String.fromCharCode.apply(null, n3);
          }
          var Kr, Nr = Math, Qr = function(r4) {
            Nr = r4;
          }, Vr = function(r4) {
            return Math.floor(Nr.random() * r4);
          }, Wr = function(r4) {
            for (var e4 = [], t4 = 1; t4 < r4.length; t4++) {
              for (var n3 = 0, o2 = 0; o2 < t4; o2++)
                r4[o2] > r4[t4] && n3++;
              e4.push(n3);
            }
            for (var a3 = 0, i2 = r4.length - 1; i2 > 0; i2--)
              a3 = i2 * (e4[i2 - 1] + a3);
            return a3;
          }, Xr = function(r4, e4) {
            for (var t4 = [], o2 = 0; o2 < e4.length; o2++)
              t4.push(r4[e4[o2]]);
            for (var a3 = 0; a3 < t4.length; a3++) {
              var i2 = a3 + Vr(t4.length - a3);
              i2 > a3 && (0, n2.swap)(t4, i2, a3);
            }
            for (var f2 = 0; f2 < e4.length; f2++)
              r4[e4[f2]] = t4[f2];
            return r4;
          }, Yr = function(r4, e4, t4, n3, o2, a3, i2, f2) {
            var u2, c2, l2, s3;
            do {
              c2 = a3.length <= 1 ? Wr(Xr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], e4)) : Wr(a3), u2 = o2.length <= 1 ? Wr(Xr([0, 1, 2, 3, 4, 5, 6, 7], r4)) : Wr(o2);
            } while (0 != (Gr(u2) ^ Jr(c2)));
            if (0 === i2)
              do {
                l2 = 0, i2 = 0;
                for (var m2 = 0; m2 < t4.length; m2++) {
                  l2 += v2 = Vr(3), i2 += v2 * Math.pow(3, t4[m2]);
                }
              } while (l2 % 3 != 0);
            if (0 === f2)
              do {
                s3 = 0, f2 = 0;
                for (m2 = 0; m2 < n3.length; m2++) {
                  var v2;
                  s3 += v2 = Vr(2), f2 += v2 * Math.pow(2, n3[m2]);
                }
              } while (s3 % 2 != 0);
            var h2 = Hr(new H(u2, i2 % 2187, c2, f2 % 2048));
            return Ar(Kr, h2);
          };
          return { initialize: function(r4) {
            return e4 = void 0, t4 = r4, "function" != typeof n3 && (n3 = function() {
            }), Kr = new Rr(), Lr(n3), t4 && Qr(t4), true, void (e4 && setTimeout(e4, 0));
            var e4, t4, n3;
          }, setRandomSource: Qr, setScrambleLength: function() {
          }, customScramble: function(r4, e4, t4, n3) {
            var o2, a3, i2, f2, u2, c2;
            do {
              a3 = Wr(Xr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], e4)), o2 = Wr(Xr([0, 1, 2, 3, 4, 5, 6, 7], r4));
            } while (0 != (Gr(o2) ^ Jr(a3)));
            do {
              f2 = 0, i2 = 0;
              for (var l2 = 0; l2 < t4.length; l2++) {
                f2 += s3 = Vr(3), i2 += s3 * Math.pow(3, t4[l2]);
              }
            } while (f2 % 3 != 0);
            do {
              c2 = 0, u2 = 0;
              for (l2 = 0; l2 < n3.length; l2++) {
                var s3;
                c2 += s3 = Vr(2), u2 += s3 * Math.pow(2, n3[l2]);
              }
            } while (c2 % 2 != 0);
            var m2 = Hr(new H(o2, i2 % 2187, a3, u2 % 2048));
            return Ar(Kr, m2);
          }, customScramble2: Yr, getCustomScramble: function(r4) {
            return Yr(r4.cp || [], r4.ep || [], r4.co || [], r4.eo || [], r4.cpa || [], r4.epa || [], r4.cori || 0, r4.eori || 0);
          }, rn: Vr, shuffle: function(r4) {
            for (var e4 = r4.length - 1; e4 > 0; e4--) {
              var t4 = Math.floor(Nr.random() * (e4 + 1));
              (0, n2.swap)(r4, e4, t4);
            }
            return r4;
          }, getRandomCO: function(r4) {
            if (r4.length) {
              var e4 = r4.filter(function(r5) {
                return !!o.coSubsets[r5];
              });
              return o.coSubsets[e4[Vr(r4.length)]];
            }
            var t4 = Object.keys(o.coSubsets);
            return o.coSubsets[t4[Vr(t4.length)]];
          } };
        }();
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { shift: () => n2, swap: () => o, sum: () => a, createArray: () => i });
        var n2 = function(r3, e3) {
          return r3.concat(r3).slice(e3, e3 + r3.length);
        }, o = function(r3, e3, t3) {
          var n3 = r3[e3];
          r3[e3] = r3[t3], r3[t3] = n3;
        }, a = function(r3) {
          return r3.reduce(function(r4, e3) {
            return r4 + e3;
          });
        }, i = function(r3, e3) {
          for (var t3 = Array(r3), n3 = 0; n3 < r3; t3[n3++] = Array(e3))
            ;
          return t3;
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { coSubsets: () => n2 });
        var n2 = { U: [2, 0, 0, 1], T: [1, 0, 0, 2], L: [1, 0, 2, 0], S: [2, 2, 2, 0], As: [1, 1, 1, 0], Pi: [1, 2, 2, 1], H: [1, 2, 1, 2] };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => f });
        var n2 = t2(8), o = t2(9);
        function a(r3) {
          return function(r4) {
            if (Array.isArray(r4))
              return i(r4);
          }(r3) || function(r4) {
            if ("undefined" != typeof Symbol && null != r4[Symbol.iterator] || null != r4["@@iterator"])
              return Array.from(r4);
          }(r3) || function(r4, e3) {
            if (!r4)
              return;
            if ("string" == typeof r4)
              return i(r4, e3);
            var t3 = Object.prototype.toString.call(r4).slice(8, -1);
            "Object" === t3 && r4.constructor && (t3 = r4.constructor.name);
            if ("Map" === t3 || "Set" === t3)
              return Array.from(r4);
            if ("Arguments" === t3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t3))
              return i(r4, e3);
          }(r3) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }();
        }
        function i(r3, e3) {
          (null == e3 || e3 > r3.length) && (e3 = r3.length);
          for (var t3 = 0, n3 = new Array(e3); t3 < e3; t3++)
            n3[t3] = r3[t3];
          return n3;
        }
        const f = function(r3) {
          r3("2gll", function(r4) {
            var e3 = function(e4) {
              var t3 = r4.getRandomCO(e4), n3 = [0, 0, 0].concat(a((0, o.shift)(t3, r4.rn(4))), [0]).reverse();
              return r4.getCustomScramble({ ep: [8, 9, 10, 11], cori: parseInt(n3.join(""), 3) });
            };
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function(r5) {
              return { scramble_string: e3(r5) };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => a });
        var n2 = t2(8), o = t2(9);
        const a = function(r3) {
          r3("ble", function(r4) {
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function() {
              return { scramble_string: (t3 = (0, o.shift)([8, 9, 10, 11], r4.rn(4)), r4.getCustomScramble({ cp: [4, 5, 6, 7], epa: [0, 1, 2, t3[0], 4, 5, 6, 7, t3[1], t3[2], t3[3], 3], cori: parseInt((e3 = [0, 0, 1, r4.rn(3), r4.rn(3), r4.rn(3), 0, 0], e3[6] = (3 - (0, o.sum)(e3) % 3) % 3, e3).reverse().join(""), 3) })) };
              var e3, t3;
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => a });
        var n2 = t2(8), o = t2(9);
        const a = function(r3) {
          r3("cls", function(r4) {
            var e3 = r4.rn, t3 = r4.shuffle, n3 = { "-": function(r5) {
              var n4 = t3([4, 5, 6, 7]), a3 = r5 < 0 ? [e3(3), e3(3), e3(3)] : [r5 > 0 ? e3(2) + 1 : 0, r5 > 1 ? e3(2) + 1 : 0, r5 > 2 ? e3(2) + 1 : 0], i = (0, o.shift)(a3, e3(3)), f = [0, 0, 0, i[0], i[1], i[2], 2, 0];
              return f[2] = (3 - (0, o.sum)(f) % 3) % 3, f.reverse(), { cp: [3, 4, 5, 6], cpa: [0, 1, 2, n4[0], n4[1], n4[2], n4[3], 3], ep: [8, 9, 10, 11], cori: parseInt(f.join(""), 3) };
            }, "+": function() {
              var r5 = t3([4, 5, 6, 7]), n4 = (0, o.shift)([e3(3), e3(3), e3(3)], e3(1)), a3 = [0, 0, 0, n4[0], n4[1], n4[2], 1, 0];
              return a3[2] = (3 - (0, o.sum)(a3) % 3) % 3, a3.reverse(), { cp: [3, 4, 5, 6], cpa: [0, 1, 2, r5[0], r5[1], r5[2], r5[3], 3], ep: [8, 9, 10, 11], cori: parseInt(a3.join(""), 3) };
            }, O: function() {
              var r5 = t3([4, 5, 6, 7]), n4 = (0, o.shift)([e3(3), e3(3), e3(3)], e3(1)), a3 = [0, 0, 0, n4[0], n4[1], n4[2], 0, 0];
              return a3[2] = (3 - (0, o.sum)(a3) % 3) % 3, a3.reverse(), { cp: [3, 4, 5, 6], cpa: [0, 1, 2, r5[0], r5[1], r5[2], r5[3], 3], ep: [8, 9, 10, 11], cori: parseInt(a3.join(""), 3) };
            }, i: function() {
              var r5 = t3([4, 5, 6, 7]), n4 = (0, o.shift)([e3(3), e3(3), e3(3)], e3(4)), a3 = [0, 0, 1, n4[0], n4[1], n4[2], 0, 0];
              return a3[6] = (3 - (0, o.sum)(a3) % 3) % 3, a3.reverse(), { cp: [3, 4, 5, 6], cpa: [0, 1, 2, 3, r5[0], r5[1], r5[2], r5[3]], ep: [8, 9, 10, 11], cori: parseInt(a3.join(""), 3) };
            }, im: function() {
              var r5 = t3([4, 5, 6, 7]), n4 = (0, o.shift)([e3(3), e3(3), e3(3)], e3(4)), a3 = [0, 0, 2, n4[0], n4[1], n4[2], 0, 0];
              return a3[6] = (3 - (0, o.sum)(a3) % 3) % 3, a3.reverse(), { cp: [3, 4, 5, 6], cpa: [0, 1, 2, 3, r5[0], r5[1], r5[2], r5[3]], ep: [8, 9, 10, 11], cori: parseInt(a3.join(""), 3) };
            } }, a2 = function(t4) {
              if (t4.length) {
                var o2 = n3[t4[e3(t4.length)]];
                return r4.getCustomScramble(o2(2));
              }
              var a3 = Object.keys(n3), i = n3[a3[e3(a3.length)]];
              return r4.getCustomScramble(i());
            };
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function(r5) {
              return { scramble_string: a2(r5) };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => f });
        var n2 = t2(8), o = t2(9);
        function a(r3) {
          return function(r4) {
            if (Array.isArray(r4))
              return i(r4);
          }(r3) || function(r4) {
            if ("undefined" != typeof Symbol && null != r4[Symbol.iterator] || null != r4["@@iterator"])
              return Array.from(r4);
          }(r3) || function(r4, e3) {
            if (!r4)
              return;
            if ("string" == typeof r4)
              return i(r4, e3);
            var t3 = Object.prototype.toString.call(r4).slice(8, -1);
            "Object" === t3 && r4.constructor && (t3 = r4.constructor.name);
            if ("Map" === t3 || "Set" === t3)
              return Array.from(r4);
            if ("Arguments" === t3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t3))
              return i(r4, e3);
          }(r3) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }();
        }
        function i(r3, e3) {
          (null == e3 || e3 > r3.length) && (e3 = r3.length);
          for (var t3 = 0, n3 = new Array(e3); t3 < e3; t3++)
            n3[t3] = r3[t3];
          return n3;
        }
        const f = function(r3) {
          r3("cmll", function(r4) {
            var e3 = function(e4) {
              var t3 = r4.getRandomCO(e4), n3 = [0, 0, 0].concat(a((0, o.shift)(t3, r4.rn(4))), [0]).reverse();
              return r4.getCustomScramble({ cp: [4, 5, 6, 7], ep: [4, 6, 8, 9, 10, 11], cori: parseInt(n3.join(""), 3), eo: [0, 1, 2, 3, 5, 7] });
            };
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function(r5) {
              return { scramble_string: e3(r5) };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default), ["l10p"]);
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => a });
        var n2 = t2(8), o = t2(9);
        const a = function(r3) {
          r3("cmllsune", function(r4) {
            var e3 = function() {
              var e4 = r4.rn(2) + 1, t3 = (0, o.shift)([e4, e4, e4, 0], r4.rn(4)), n3 = [0, 0, 0, t3[0], t3[1], t3[2], t3[3], 0].reverse();
              return r4.getCustomScramble({ cp: [4, 5, 6, 7], ep: [4, 6, 8, 9, 10, 11], cori: parseInt(n3.join(""), 3), eo: [0, 1, 2, 3, 5, 7] });
            };
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function() {
              return { scramble_string: e3() };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => o });
        var n2 = t2(8);
        const o = function(r3) {
          r3("edges", function(r4) {
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function() {
              return { scramble_string: r4.customScramble([], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => o });
        var n2 = t2(8);
        const o = function(r3) {
          r3("333fm", function(r4) {
            function e3() {
              var e4, t3, n3, o2, a = "";
              do {
                var i = (a = r4.customScramble([0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])).split(" ");
                i.length < 3 || (e4 = i[0][0], t3 = i[1][0], n3 = i[i.length - 2][0], o2 = i[i.length - 3][0]);
              } while ("F" == e4 || "B" == e4 && "F" == t3 || "R" == n3 || "L" == n3 && "R" == o2);
              return "R' U' F " + a + "R' U' F";
            }
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function() {
              return { scramble_string: e3() };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default), ["fmc", "333fmc"]);
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => i });
        var n2 = t2(8), o = t2(19), a = t2(9);
        const i = function(r3) {
          r3("lccp", function(r4) {
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function() {
              return { scramble_string: (e3 = (0, a.shift)([4, 6, 5], 1), t3 = [0, 1, 2, e3[0], e3[1], e3[2], 7, 3], r4.getCustomScramble({ ep: [o.EP.UF, o.EP.UB], cpa: t3, co: [o.CO.FRU, o.CO.FRD] })) };
              var e3, t3;
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { CP: () => o, CO: () => n2, EP: () => a, EO: () => i });
        var n2 = { BLD: 0, FLD: 1, FRD: 2, BRU: 3, BLU: 4, FLU: 5, FRU: 6, BRD: 7 }, o = { BDR: 0, BLD: 1, FLD: 2, DFR: 3, BRU: 4, BLU: 5, FLU: 6, FRU: 7 }, a = { BR: 0, BL: 1, FL: 2, FR: 3, DB: 4, DL: 5, DF: 6, DR: 7, UB: 8, UL: 9, UF: 10, UR: 11 }, i = { UR: 0, UF: 1, UL: 2, UB: 3, DL: 4, DF: 5, DR: 6, DB: 7, FR: 8, FL: 9, BL: 10, BR: 11 };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => o });
        var n2 = t2(8);
        const o = function(r3) {
          r3("ll", function(r4) {
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function() {
              return { scramble_string: r4.customScramble([4, 5, 6, 7], [8, 9, 10, 11], [3, 4, 5, 6], [0, 1, 2, 3]) };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default), ["oll"]);
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => o });
        var n2 = t2(8);
        const o = function(r3) {
          r3("lsll", function(r4) {
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function() {
              return { scramble_string: r4.customScramble([3, 4, 5, 6, 7], [3, 8, 9, 10, 11], [2, 3, 4, 5, 6], [0, 1, 2, 3, 8]) };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => n2 });
        const n2 = function(r3) {
          var e3 = function(r4, e4) {
            var t3 = e4, n3 = Math, o = [" ", "2", "'"], a = function(r5) {
              return r5[Math.floor(n3.random() * r5.length)];
            }, i = function(r5) {
              n3 = r5;
            }, f = function() {
              for (var e5 = "", i2 = [], f2 = 0; f2 < 1; f2++) {
                for (var u = "", c = -1, l = 0; l < t3; l++) {
                  var s2 = 0;
                  do {
                    var m = Math.floor(n3.random() * r4.length), v = Math.floor(n3.random() * r4[m].length);
                    if (m != c) {
                      for (var h = 0; h < r4[m].length; h++)
                        i2[h] = 0;
                      c = m;
                    }
                    0 == i2[v] && (i2[v] = 1, "array" == typeof r4[m][v] ? u += a(r4[m][v]) + a(o) + " " : u += r4[m][v] + a(o) + " ", s2 = 1);
                  } while (0 == s2);
                }
                e5 += u;
              }
              return e5.trim();
            };
            return { initialize: function(r5) {
              r5 && i(r5);
            }, setRandomSource: i, setScrambleLength: function(r5) {
              t3 = r5;
            }, getRandomScramble: function() {
              return { scramble_string: f() };
            } };
          };
          r3("lse", e3([["U"], ["M"]], 20), ["mu"]), r3("ru", e3([["R"], ["U"]], 20)), r3("lu", e3([["L"], ["U"]], 20)), r3("rud", e3([["R"], ["U", "D"]], 24)), r3("rul", e3([["R", "L"], ["U"]], 24));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => a });
        var n2 = t2(8), o = t2(19);
        const a = function(r3) {
          r3("nls", function(r4) {
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function() {
              return { scramble_string: r4.getCustomScramble({ co: [o.CO.FLU, o.CO.FRU, o.CO.BRU, o.CO.DFR], cp: [o.CP.FLU, o.CP.FRU, o.CP.BRU, o.CP.DFR], ep: [o.EP.UF, o.EP.UR, o.EP.FR] }) };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => o });
        var n2 = t2(8);
        const o = function(r3) {
          r3("pll", function(r4) {
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function() {
              return { scramble_string: r4.customScramble([4, 5, 6, 7], [8, 9, 10, 11], [], []) };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => u });
        var n2 = t2(8), o = t2(19), a = t2(9);
        function i(r3) {
          return function(r4) {
            if (Array.isArray(r4))
              return f(r4);
          }(r3) || function(r4) {
            if ("undefined" != typeof Symbol && null != r4[Symbol.iterator] || null != r4["@@iterator"])
              return Array.from(r4);
          }(r3) || function(r4, e3) {
            if (!r4)
              return;
            if ("string" == typeof r4)
              return f(r4, e3);
            var t3 = Object.prototype.toString.call(r4).slice(8, -1);
            "Object" === t3 && r4.constructor && (t3 = r4.constructor.name);
            if ("Map" === t3 || "Set" === t3)
              return Array.from(r4);
            if ("Arguments" === t3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t3))
              return f(r4, e3);
          }(r3) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }();
        }
        function f(r3, e3) {
          (null == e3 || e3 > r3.length) && (e3 = r3.length);
          for (var t3 = 0, n3 = new Array(e3); t3 < e3; t3++)
            n3[t3] = r3[t3];
          return n3;
        }
        const u = function(r3) {
          r3("trizbll", function(r4) {
            var e3 = [[o.EP.UR, o.EP.UF], [o.EP.UF, o.EP.UL], [o.EP.UL, o.EP.UB], [o.EP.UB, o.EP.UR]], t3 = { T: [[1, 0, 0, 2], [0, 0, 2, 1]], U: [[2, 0, 0, 1], [0, 0, 1, 2]], L: [[1, 0, 2, 0], [2, 0, 1, 0]], S: [[2, 0, 2, 2]], As: [[1, 0, 1, 1]] }, n3 = function(n4) {
              var f2 = r4.rn(4), u2 = function(e4) {
                if (e4.length) {
                  var n5 = e4.filter(function(r5) {
                    return !!t3[r5];
                  });
                  return t3[n5[r4.rn(n5.length)]];
                }
                var o2 = Object.keys(t3);
                return t3[o2[r4.rn(o2.length)]];
              }(n4), c = (0, a.shift)(u2[0], f2), l = [0, 0, 0].concat(i(c), [0]).reverse(), s2 = (0, a.shift)([o.CP.BLU, o.CP.BRU, o.CP.FRU, o.CP.FLU], f2), m = s2[0];
              return s2 = r4.shuffle(s2.slice(1, 4)), s2 = [4, 5, 6, 7].map(function(r5) {
                return r5 === m ? m : s2.splice(-1)[0];
              }), r4.getCustomScramble({ ep: e3[f2], cpa: [0, 1, 2, 3].concat(i(s2)), cori: parseInt(l.join(""), 3) });
            };
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function(r5) {
              return { scramble_string: n3(r5) };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => a });
        var n2 = t2(8), o = t2(9);
        const a = function(r3) {
          r3("tsle", function(r4) {
            var e3 = { twoGen: function() {
              var e4 = (0, o.shift)([4, 5, 6, 7], r4.rn(4));
              return { cpa: [0, 1, 2, e4[0], 3, e4[2], e4[1], e4[3]], ep: [8, 9, 10, 11] };
            } }, t3 = function(t4) {
              if (t4.length) {
                var n3 = e3[t4[rn(t4.length)]];
                return r4.getCustomScramble(n3());
              }
              var o2 = Object.keys(e3), a2 = e3[o2[r4.rn(o2.length)]];
              return r4.getCustomScramble(a2());
            };
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function(r5) {
              return { scramble_string: t3(r5) };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => a });
        var n2 = t2(8), o = t2(9);
        const a = function(r3) {
          r3("wv", function(r4) {
            var e3 = function() {
              var e4 = r4.rn, t3 = (0, o.shift)([8, 9, 10, 11], 0), n3 = [0, 1, 2, t3[0], 4, 5, 6, 7, t3[1], t3[2], 3, t3[3]], a2 = [0, 0, 0, e4(3), e4(3), 2, e4(3), 0];
              a2[2] = (3 - (0, o.sum)(a2) % 3) % 3;
              var i = parseInt(a2.reverse().join(""), 3);
              return r4.getCustomScramble({ cpa: [0, 1, 2, 4, 5, 6, 3, 7], cori: i, epa: n3 });
            };
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function() {
              return { scramble_string: e3() };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => u });
        var n2 = t2(8), o = t2(19), a = t2(9);
        function i(r3) {
          return function(r4) {
            if (Array.isArray(r4))
              return f(r4);
          }(r3) || function(r4) {
            if ("undefined" != typeof Symbol && null != r4[Symbol.iterator] || null != r4["@@iterator"])
              return Array.from(r4);
          }(r3) || function(r4, e3) {
            if (!r4)
              return;
            if ("string" == typeof r4)
              return f(r4, e3);
            var t3 = Object.prototype.toString.call(r4).slice(8, -1);
            "Object" === t3 && r4.constructor && (t3 = r4.constructor.name);
            if ("Map" === t3 || "Set" === t3)
              return Array.from(r4);
            if ("Arguments" === t3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t3))
              return f(r4, e3);
          }(r3) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }();
        }
        function f(r3, e3) {
          (null == e3 || e3 > r3.length) && (e3 = r3.length);
          for (var t3 = 0, n3 = new Array(e3); t3 < e3; t3++)
            n3[t3] = r3[t3];
          return n3;
        }
        const u = function(r3) {
          r3("zbll", function(r4) {
            var e3 = function(e4) {
              var t3 = r4.getRandomCO(e4), n3 = [0, 0, 0].concat(i((0, a.shift)(t3, r4.rn(4))), [0]).reverse();
              return r4.getCustomScramble({ ep: [o.EP.UF, o.EP.UL, o.EP.UB, o.EP.UR], cp: [o.CP.FLU, o.CP.FRU, o.CP.BRU, o.CP.BLU], cori: parseInt(n3.join(""), 3) });
            };
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function(r5) {
              return { scramble_string: e3(r5) };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default), ["coll"]);
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => o });
        var n2 = t2(8);
        const o = function(r3) {
          r3("zz", function(r4) {
            var e3 = function(e4) {
              for (var t3 = function(e5) {
                var t4 = e5.filter(function(r5) {
                  return /\d+/.test(r5);
                }).map(function(r5) {
                  return +r5;
                });
                return t4.length ? t4[r4.rn(t4.length)] : 0;
              }(e4), n3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], o2 = 0; o2 < t3; o2++)
                n3[o2] = 1;
              return r4.getCustomScramble({ cp: [0, 1, 2, 3, 4, 5, 6], ep: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], co: [0, 1, 2, 3, 4, 5, 6], eori: parseInt(r4.shuffle(n3).join(""), 2) });
            };
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function(r5) {
              return { scramble_string: e3(r5) };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => o });
        var n2 = t2(8);
        const o = function(r3) {
          r3("zzll", function(r4) {
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function() {
              return { scramble_string: r4.customScramble([3, 4, 5, 6, 7], [3, 8, 9, 10, 11], [2, 3, 4, 5, 6], []) };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => o });
        var n2 = t2(8);
        const o = function(r3) {
          r3("zzlsll", function(r4) {
            return { initialize: r4.initialize, setRandomSource: r4.setRandomSource, getRandomScramble: function() {
              return { scramble_string: r4.customScramble([2, 3, 4, 5, 6, 7], [2, 3, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6], []) };
            }, setScrambleLength: r4.setScrambleLength };
          }(n2.default));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => n2 });
        const n2 = function(r3) {
          var e3 = function(r4, e4, t3) {
            var n3, o, a = e4, i = new Array("y", "yellow.jpg", "yellow", "b", "blue.jpg", "blue", "r", "red.jpg", "red", "w", "white.jpg", "white", "g", "green.jpg", "green", "o", "orange.jpg", "orange", "p", "purple.jpg", "purple", "0", "grey.jpg", "grey"), f = new Array(), u = new Array(), c = new Array(), l = new Array();
            function s2(r5, e5, t4, n4) {
              for (var o2 = 0; o2 < t4; o2++)
                if (e5[o2]) {
                  var a2 = e5[o2] - 1, i2 = n4, f2 = o2;
                  o2 + o2 + 1 >= t4 && (i2 += 3, f2 = t4 - 1 - f2, a2 = 2 - a2), r5[r5.length] = 4 * (6 * f2 + i2) + a2;
                }
            }
            function m(e5) {
              for (var n4, o2 = "", a2 = 0; a2 < u[e5].length - 1; a2++) {
                0 != a2 && (o2 += " ");
                var i2 = u[e5][a2] >> 2;
                (i2 = (i2 - (n4 = i2 % 6)) / 6) && r4 <= 5 && !t3 ? o2 += "dlburf".charAt(n4) : r4 <= 5 && t3 ? (o2 += "DLBURF".charAt(n4), i2 && (o2 += "w")) : (i2 > 1 && (o2 += i2 + 1), o2 += "DLBURF".charAt(n4), i2 && (o2 += "w")), 0 != (n4 = 3 & u[e5][a2]) && (o2 += " 2'".charAt(n4));
              }
              return o2;
            }
            function v(e5, t4, n4) {
              var o2, a2, i2, f2, u2, l2, s3, m2, v2 = r4 * r4;
              for (e5 > 5 && (e5 -= 6), m2 = 0; m2 < n4; m2++) {
                for (l2 = 0; l2 < r4; l2++)
                  0 === e5 ? (o2 = 6 * v2 - r4 * t4 - r4 + l2, a2 = 2 * v2 - r4 * t4 - 1 - l2, i2 = 3 * v2 - r4 * t4 - 1 - l2, f2 = 5 * v2 - r4 * t4 - r4 + l2) : 1 === e5 ? (o2 = 3 * v2 + t4 + r4 * l2, a2 = 3 * v2 + t4 - r4 * (l2 + 1), i2 = v2 + t4 - r4 * (l2 + 1), f2 = 5 * v2 + t4 + r4 * l2) : 2 === e5 ? (o2 = 3 * v2 + t4 * r4 + l2, a2 = 4 * v2 + r4 - 1 - t4 + r4 * l2, i2 = t4 * r4 + r4 - 1 - l2, f2 = 2 * v2 - 1 - t4 - r4 * l2) : 3 === e5 ? (o2 = 4 * v2 + t4 * r4 + r4 - 1 - l2, a2 = 2 * v2 + t4 * r4 + l2, i2 = v2 + t4 * r4 + l2, f2 = 5 * v2 + t4 * r4 + r4 - 1 - l2) : 4 === e5 ? (o2 = 6 * v2 - 1 - t4 - r4 * l2, a2 = r4 - 1 - t4 + r4 * l2, i2 = 2 * v2 + r4 - 1 - t4 + r4 * l2, f2 = 4 * v2 - 1 - t4 - r4 * l2) : 5 === e5 && (o2 = 4 * v2 - r4 - t4 * r4 + l2, a2 = 2 * v2 - r4 + t4 - r4 * l2, i2 = v2 - 1 - t4 * r4 - l2, f2 = 4 * v2 + t4 + r4 * l2), u2 = c[o2], c[o2] = c[a2], c[a2] = c[i2], c[i2] = c[f2], c[f2] = u2;
                if (0 === t4)
                  for (l2 = 0; l2 + l2 < r4; l2++)
                    for (s3 = 0; s3 + s3 < r4 - 1; s3++)
                      i2 = e5 * v2 + (r4 - 1 - l2) + (r4 - 1 - s3) * r4, e5 < 3 ? (a2 = e5 * v2 + (r4 - 1 - s3) + l2 * r4, f2 = e5 * v2 + s3 + (r4 - 1 - l2) * r4) : (f2 = e5 * v2 + (r4 - 1 - s3) + l2 * r4, a2 = e5 * v2 + s3 + (r4 - 1 - l2) * r4), u2 = c[o2 = e5 * v2 + l2 + s3 * r4], c[o2] = c[a2], c[a2] = c[i2], c[i2] = c[f2], c[f2] = u2;
              }
            }
            l[0] = new Array(0, 1, 2, 3, 4, 5), l[1] = new Array(0, 2, 4, 3, 5, 1), l[2] = new Array(0, 4, 5, 3, 1, 2), l[3] = new Array(0, 5, 1, 3, 2, 4), l[4] = new Array(1, 0, 5, 4, 3, 2), l[5] = new Array(1, 2, 0, 4, 5, 3), l[6] = new Array(1, 3, 2, 4, 0, 5), l[7] = new Array(1, 5, 3, 4, 2, 0), l[8] = new Array(2, 0, 1, 5, 3, 4), l[9] = new Array(2, 1, 3, 5, 4, 0), l[10] = new Array(2, 3, 4, 5, 0, 1), l[11] = new Array(2, 4, 0, 5, 1, 3), l[12] = new Array(3, 1, 5, 0, 4, 2), l[13] = new Array(3, 2, 1, 0, 5, 4), l[14] = new Array(3, 4, 2, 0, 1, 5), l[15] = new Array(3, 5, 4, 0, 2, 1), l[16] = new Array(4, 0, 2, 1, 3, 5), l[17] = new Array(4, 2, 3, 1, 5, 0), l[18] = new Array(4, 3, 5, 1, 0, 2), l[19] = new Array(4, 5, 0, 1, 2, 3), l[20] = new Array(5, 0, 4, 2, 3, 1), l[21] = new Array(5, 1, 0, 2, 4, 3), l[22] = new Array(5, 3, 1, 2, 0, 4), l[23] = new Array(5, 4, 3, 2, 1, 0);
            var h = function(r5) {
              n3 = r5;
            }, d = false, p = function(e5) {
              d || (!function() {
                var e6;
                for (o = new Array(12 * r4 * r4), n4 = 0; n4 < o.length; n4++)
                  o[n4] = -1;
                for (n4 = 0; n4 < r4; n4++)
                  for (e6 = 0; e6 < r4; e6++)
                    o[4 * r4 * (3 * r4 - n4 - 1) + r4 + e6] = n4 * r4 + e6, o[4 * r4 * (r4 + n4) + r4 - e6 - 1] = (r4 + n4) * r4 + e6, o[4 * r4 * (r4 + n4) + 4 * r4 - e6 - 1] = (2 * r4 + n4) * r4 + e6, o[4 * r4 * n4 + r4 + e6] = (3 * r4 + n4) * r4 + e6, o[4 * r4 * (r4 + n4) + 2 * r4 + e6] = (4 * r4 + n4) * r4 + e6, o[4 * r4 * (r4 + n4) + r4 + e6] = (5 * r4 + n4) * r4 + e6;
                for (var t4 = 0; t4 < 6; t4++) {
                  f[t4] = i.length - 3;
                  for (var n4 = 0; n4 < i.length; n4 += 3)
                    if ("yobwrg".charAt(t4) === i[n4]) {
                      f[t4] = n4;
                      break;
                    }
                }
              }(), d = true), e5 && setTimeout(e5, 0);
            };
            return { version: "July 05, 2015", initialize: function(r5) {
              return function(r6, e5) {
                p(), h(e5), r6 && setTimeout(r6, 0);
              }(void 0, r5);
            }, setRandomSource: h, setScrambleLength: function(r5) {
              a = r5;
            }, getRandomScramble: function() {
              return function() {
                var e5 = r4;
                (t3 || 0 != (1 & r4)) && e5--;
                for (var o2, i2 = new Array(e5), f2 = new Array(0, 0, 0), c2 = 0; c2 < 1; c2++) {
                  o2 = -1, u[c2] = new Array();
                  for (var l2 = 0; l2 < e5; l2++)
                    i2[l2] = 0;
                  f2[0] = f2[1] = f2[2] = 0;
                  for (var m2 = 0; u[c2].length + m2 < a; ) {
                    var v2, h2, d2;
                    do {
                      do {
                        v2 = Math.floor(3 * n3.random()), h2 = Math.floor(n3.random() * e5), d2 = Math.floor(3 * n3.random());
                      } while (v2 === o2 && 0 != i2[h2]);
                    } while (v2 === o2 && !t3 && e5 === r4 && (2 * f2[0] === e5 || 2 * f2[1] === e5 || 2 * f2[2] === e5 || 2 * (f2[d2] + 1) === e5 && f2[0] + f2[1] + f2[2] - f2[d2] > 0));
                    if (v2 != o2) {
                      for (s2(u[c2], i2, e5, o2), l2 = 0; l2 < e5; l2++)
                        i2[l2] = 0;
                      f2[0] = f2[1] = f2[2] = 0, m2 = 0, o2 = v2;
                    }
                    f2[d2]++, m2++, i2[h2] = d2 + 1;
                  }
                  s2(u[c2], i2, e5, o2), u[c2][u[c2].length] = 0;
                }
              }(), function(e5) {
                var n4, o2, a2, i2 = 0;
                for (n4 = 0; n4 < 6; n4++)
                  for (o2 = 0; o2 < r4 * r4; o2++)
                    c[i2++] = n4;
                for (n4 = 0; n4 < u[e5].length - 1; n4++) {
                  for (a2 = 3 & u[e5][n4], o2 = u[e5][n4] >> 2, i2 = 0; o2 > 5; )
                    o2 -= 6, i2++;
                  do {
                    v(o2, i2, a2 + 1), i2--;
                  } while (t3 && i2 >= 0);
                }
              }(0), { state: c, scramble_string: m(0) };
            } };
          };
          r3("444", e3(4, 40, true), ["4", "4x4", "4x4x4"]), r3("555", e3(5, 60, true), ["5", "5x5", "5x5x5"]), r3("666", e3(6, 70, true), ["6", "6x6", "6x6x6"]), r3("777", e3(7, 100, true), ["7", "7x7", "7x7x7"]);
        };
      }, (r2, e2, t2) => {
        var n2;
        t2.r(e2), t2.d(e2, { default: () => a });
        var o = function(r3) {
          return Math.floor(n2.random() * r3);
        };
        const a = function(r3) {
          var e3 = function() {
            for (var r4 = [[0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0], [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [11, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 1, 1, 0, 1], [0, 0, 11, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0], [11, 0, 11, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0], [11, 0, 0, 0, 0, 0, 11, 0, 0, 1, 0, 1, 1, 1], [0, 0, 0, 0, 0, 0, 11, 0, 11, 0, 1, 1, 1, 1], [0, 0, 11, 0, 0, 0, 0, 0, 11, 1, 1, 1, 0, 1], [11, 0, 11, 0, 0, 0, 11, 0, 11, 1, 1, 1, 1, 1]], e4 = [], t3 = [1], a2 = 0; a2 < 32; ++a2) {
              e4[a2] = [];
              for (var i = 0; i < 32; ++i)
                e4[a2][i] = 0;
            }
            for (var f = 0; f < 32; ++f) {
              e4[f][0] = e4[f][f] = 1, t3[f + 1] = t3[f] * (f + 1);
              for (var u = 1; u < f; ++u)
                e4[f][u] = e4[f - 1][u - 1] + e4[f - 1][u];
            }
            var c = function(r5, t4, n3) {
              for (var o2 = t4, a3 = 0, i2 = r5 - 1; i2 >= 0; i2--)
                n3 >= e4[i2][o2] && (n3 -= e4[i2][o2--], a3 |= 1 << i2);
              return a3;
            }, l = [-1, 1, -1, -1, -1, 5, -1, 7, -1, -1, -1, 11], s2 = function(r5, e5, t4) {
              var n3 = r5[e5];
              r5[e5] = r5[t4], r5[t4] = n3;
            }, m = function(r5, e5, t4, n3, o2) {
              for (var a3 = r5[0].length, i2 = n3; i2 < a3; i2++)
                r5[t4][i2] = (r5[t4][i2] + r5[e5][i2] * o2) % 12;
            }, v = [7695, 42588, 47187, 85158, 86697, 156568, 181700, 209201, 231778], h = function(r5) {
              for (var e5 = r5[0].length, t4 = 0; t4 < e5 - 1; t4++) {
                if (-1 == l[r5[t4][t4]]) {
                  for (var n3 = -1, o2 = t4 + 1; o2 < 14; o2++)
                    if (-1 != l[r5[o2][t4]]) {
                      n3 = o2;
                      break;
                    }
                  if (-1 == n3) {
                    r:
                      for (var a3 = t4; a3 < 13; a3++)
                        for (var i2 = a3 + 1; i2 < 14; i2++)
                          if (-1 != l[(r5[a3][t4] + r5[i2][t4]) % 12]) {
                            m(r5, i2, a3, t4, 1), n3 = a3;
                            break r;
                          }
                  }
                  if (-1 == n3) {
                    for (var f2 = t4 + 1; f2 < 14; f2++)
                      if (0 != r5[f2][t4])
                        return -1;
                    return t4 + 1;
                  }
                  s2(r5, t4, n3);
                }
                for (var u2 = l[r5[t4][t4]], c2 = t4; c2 < e5; c2++)
                  r5[t4][c2] = r5[t4][c2] * u2 % 12;
                for (var v2 = t4 + 1; v2 < 14; v2++)
                  m(r5, t4, v2, t4, 12 - r5[v2][t4]);
              }
              return 0;
            }, d = function(t4, n3, o2) {
              for (var a3 = t4 + 1, i2 = 0; i2 < e4[18][t4]; i2++) {
                for (var f2 = c(18, t4, i2), u2 = false, l2 = 0; l2 < v.length; l2++)
                  if ((f2 & v[l2]) == v[l2]) {
                    u2 = true;
                    break;
                  }
                if (!u2) {
                  for (var s3 = [], m2 = 0, d2 = 0; d2 < 18; d2++)
                    1 == (f2 >> d2 & 1) && (s3[m2++] = d2);
                  for (var g2 = [], y = 0; y < 14; y++) {
                    g2[y] = [];
                    for (var b = 0; b < t4; b++)
                      g2[y][b] = r4[s3[b]][y];
                    g2[y][t4] = n3[y];
                  }
                  if (0 == h(g2)) {
                    for (var S = true, w = t4; w < 14; w++)
                      if (0 != g2[w][t4]) {
                        S = false;
                        break;
                      }
                    if (S) {
                      p(g2);
                      for (var A = 0, R = 0; R < t4; R++)
                        0 != g2[R][t4] && A++;
                      if (A < a3) {
                        for (var L = 0; L < 18; L++)
                          o2[L] = 0;
                        for (var _ = 0; _ < t4; _++)
                          o2[s3[_]] = g2[_][t4];
                        a3 = A;
                      }
                    }
                  }
                }
              }
              return a3 == t4 + 1 ? -1 : a3;
            }, p = function(r5) {
              for (var e5 = r5[0].length - 2; e5 > 0; e5--)
                for (var t4 = e5 - 1; t4 >= 0; t4--)
                  0 != r5[t4][e5] && m(r5, e5, t4, e5, 12 - r5[t4][e5]);
            }, g = ["UR", "DR", "DL", "UL", "U", "R", "D", "L", "ALL"];
            return { version: "July 05, 2015", initialize: function(r5) {
              n2 = r5;
            }, getRandomScramble: function() {
              var r5 = function() {
                for (var r6 = [], e6 = 0; e6 < 14; e6++)
                  r6[e6] = o(12);
                return r6;
              }(), e5 = [];
              e5.length = 18, function(r6, e6) {
                14 != r6.length || 18 != e6.length || d(14, r6, e6);
              }(r5, e5);
              for (var t4 = "", n3 = 0; n3 < 9; n3++) {
                var a3 = e5[n3];
                if (0 != a3) {
                  var i2 = a3 <= 6;
                  a3 > 6 && (a3 = 12 - a3), t4 += g[n3] + a3 + (i2 ? "+" : "-") + " ";
                }
              }
              t4 += "y2 ";
              for (var f2 = 0; f2 < 9; f2++) {
                var u2 = e5[f2 + 9];
                if (0 != u2) {
                  var c2 = u2 <= 6;
                  u2 > 6 && (u2 = 12 - u2), t4 += g[f2] + u2 + (c2 ? "+" : "-") + " ";
                }
              }
              for (var l2 = true, s3 = 0; s3 < 4; s3++)
                1 == o(2) && (t4 += (l2 ? "" : " ") + g[s3], l2 = false);
              return { scramble_string: t4 };
            }, setScrambleLength: function() {
            } };
          }();
          r3("clock", e3);
        };
      }, (r2, e2, t2) => {
        var n2;
        t2.r(e2), t2.d(e2, { default: () => c });
        var o = function(r3) {
          return Math.floor(n2.random() * r3);
        }, a = function(r3) {
          return r3[o(r3.length)];
        }, i = { fto: { moves: [[["U", "D"], ["F", "B"], ["L", "BR"], ["R", "BL"]], ["", "'"]], length: 30 } };
        function f() {
          for (var r3, e3, t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [[""]], n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [""], i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, f2 = 0, u2 = -1, c2 = [], l = 0; l < i2; l++) {
            do {
              r3 = o(t3.length), e3 = o(t3[r3].length), r3 != u2 && (f2 = 0, u2 = r3);
            } while (0 != (f2 >> e3 & 1));
            f2 |= 1 << e3, t3[r3][e3].constructor == Array ? c2.push(a(t3[r3][e3]) + a(n3)) : c2.push(t3[r3][e3] + a(n3));
          }
          return c2.join(" ");
        }
        function u(r3, e3) {
          var t3 = i[r3];
          switch (t3.moves.length) {
            case 1:
              return f(t3.moves[0], [""], e3 || t3.length);
            case 2:
              return f(t3.moves[0], t3.moves[1], e3 || t3.length);
            case 3:
              return f(t3.moves[0], t3.moves[1], t3.moves[2]);
          }
        }
        const c = function(r3) {
          var e3 = function(r4, e4, t4) {
            var o2 = t4, a2 = function(r5) {
              n2 = r5;
            };
            return { initialize: a2, setRandomSrc: a2, getRandomScramble: function() {
              return { scramble_string: r4(e4, o2 || i.length) };
            }, setScrambleLength: function(r5) {
              o2 = r5;
            } };
          };
          for (var t3 in i)
            r3(t3, e3(u, t3, i[t3].length));
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => n2 });
        const n2 = function(r3) {
          r3("minx", function() {
            var r4, e3 = 10, t3 = [4, 0, 1, 2, 3, 9, 5, 6, 7, 8, 10, 11, 12, 13, 58, 59, 16, 17, 18, 63, 20, 21, 22, 23, 24, 14, 15, 27, 28, 29, 19, 31, 32, 33, 34, 35, 25, 26, 38, 39, 40, 30, 42, 43, 44, 45, 46, 36, 37, 49, 50, 51, 41, 53, 54, 55, 56, 57, 47, 48, 60, 61, 62, 52, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131], n3 = [1, 2, 3, 4, 0, 6, 7, 8, 9, 5, 10, 11, 12, 13, 25, 26, 16, 17, 18, 30, 20, 21, 22, 23, 24, 36, 37, 27, 28, 29, 41, 31, 32, 33, 34, 35, 47, 48, 38, 39, 40, 52, 42, 43, 44, 45, 46, 58, 59, 49, 50, 51, 63, 53, 54, 55, 56, 57, 14, 15, 60, 61, 62, 19, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131], o = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 33, 34, 35, 14, 15, 38, 39, 40, 19, 42, 43, 44, 45, 46, 25, 26, 49, 50, 51, 30, 53, 54, 55, 56, 57, 36, 37, 60, 61, 62, 41, 64, 65, 11, 12, 13, 47, 48, 16, 17, 18, 52, 20, 21, 22, 23, 24, 58, 59, 27, 28, 29, 63, 31, 32, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 124, 125, 121, 122, 123, 129, 130, 126, 127, 128, 131], a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 44, 45, 46, 14, 15, 49, 50, 51, 19, 53, 54, 55, 56, 57, 25, 26, 60, 61, 62, 30, 64, 65, 11, 12, 13, 36, 37, 16, 17, 18, 41, 20, 21, 22, 23, 24, 47, 48, 27, 28, 29, 52, 31, 32, 33, 34, 35, 58, 59, 38, 39, 40, 63, 42, 43, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 123, 124, 125, 121, 122, 128, 129, 130, 126, 127, 131], i = [81, 77, 78, 3, 4, 86, 82, 83, 8, 85, 87, 122, 123, 124, 125, 121, 127, 128, 129, 130, 126, 131, 89, 90, 24, 25, 88, 94, 95, 29, 97, 93, 98, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 26, 22, 23, 48, 30, 31, 27, 28, 53, 32, 69, 70, 66, 67, 68, 74, 75, 71, 72, 73, 76, 101, 102, 103, 99, 100, 106, 107, 108, 104, 105, 109, 46, 47, 79, 80, 45, 51, 52, 84, 49, 50, 54, 0, 1, 2, 91, 92, 5, 6, 7, 96, 9, 10, 15, 11, 12, 13, 14, 20, 16, 17, 18, 19, 21, 113, 114, 110, 111, 112, 118, 119, 115, 116, 117, 120, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65], f = [88, 89, 90, 3, 4, 93, 94, 95, 8, 97, 98, 100, 101, 102, 103, 99, 105, 106, 107, 108, 104, 109, 46, 47, 24, 25, 45, 51, 52, 29, 49, 50, 54, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 81, 77, 78, 48, 85, 86, 82, 83, 53, 87, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 57, 58, 59, 55, 56, 62, 63, 64, 60, 61, 65, 1, 2, 79, 80, 0, 6, 7, 84, 9, 5, 10, 26, 22, 23, 91, 92, 31, 27, 28, 96, 30, 32, 69, 70, 66, 67, 68, 74, 75, 71, 72, 73, 76, 112, 113, 114, 110, 111, 117, 118, 119, 115, 116, 120, 15, 11, 12, 13, 14, 20, 16, 17, 18, 19, 21];
            function u(r5, e4) {
              for (var t4 = [], n4 = 0; n4 < 132; n4++)
                t4[n4] = r5[e4[n4]];
              return t4;
            }
            return { version: "July 05, 2015", initialize: function(e4) {
              r4 = e4;
            }, getRandomScramble: function() {
              var c = new Array();
              for (l = 0; l < 7 * e3; l++)
                c[l] = Math.floor(2 * r4.random());
              var l, s2, m = "", v = [];
              for (l = 0; l < 12; l++)
                for (s2 = 0; s2 < 11; s2++)
                  v[11 * l + s2] = l;
              for (s2 = 0; s2 < 7; s2++) {
                for (l = 0; l < e3; l++)
                  l % 2 ? c[s2 * e3 + l] ? (m += "D++ ", v = u(v, o)) : (m += "D-- ", v = u(v, a)) : c[s2 * e3 + l] ? (m += "R++ ", v = u(v, i)) : (m += "R-- ", v = u(v, f));
                c[(s2 + 1) * e3 - 1] ? (m += "U", v = u(v, t3)) : (m += "U'", v = u(v, n3)), s2 < 6 && (m += "\n");
              }
              return { state: v, scramble_string: m };
            }, setScrambleLength: function(r5) {
              e3 = r5;
            } };
          }(), ["mega", "megaminx"]);
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => n2 });
        const n2 = function(r3) {
          r3("pyram", function() {
            var e3 = [], n3 = [];
            function a(r4) {
              e3[r4] = [1, 1, 1, 1, 1, 0, 2, 0, 3, 3, 3, 3, 3, 0, 1, 1, 1, 0, 2, 2, 2, 0, 3, 3, 3, 0, 0, 0, 1, 0, 2, 2, 2, 2, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0];
            }
            var i, f = [], u = [], c = [], l = [], s2 = [], m = [], v = [];
            function h() {
              4 == i && clearTimeout(void 0), i = 0, s2.length = 0;
            }
            function p() {
              var r4, e4, t3, n4, o = 0, a2 = 0, i2 = 0;
              m = [0, 1, 2, 3, 4, 5];
              for (var f2 = 0; f2 < 4; f2++) {
                var u2 = f2 + Math.floor(R.random() * (6 - f2)), c2 = m[f2];
                m[f2] = m[u2], m[u2] = c2, f2 != u2 && i2++;
              }
              if (i2 % 2 == 1) {
                c2 = m[4];
                m[4] = m[5], m[5] = c2;
              }
              i2 = 0, v = [];
              for (f2 = 0; f2 < 5; f2++)
                v[f2] = Math.floor(2 * R.random()), i2 += v[f2];
              v[5] = i2 % 2;
              for (f2 = 6; f2 < 10; f2++)
                v[f2] = Math.floor(3 * R.random());
              for (r4 = 0; r4 < 6; r4++) {
                for (e4 = 0, t3 = 0; t3 < 6 && m[t3] != r4; t3++)
                  m[t3] > r4 && e4++;
                a2 = a2 * (6 - r4) + e4;
              }
              for (r4 = 9; r4 >= 6; r4--)
                o = 3 * o + v[r4];
              for (r4 = 4; r4 >= 0; r4--)
                o = 2 * o + v[r4];
              if (0 != a2 || 0 != o)
                for (n4 = 7; n4 < 12 && !g(a2, o, n4, -1); n4++)
                  ;
            }
            function g(r4, e4, t3, n4) {
              if (0 == t3) {
                if (0 == r4 && 0 == e4)
                  return true;
              } else {
                if (f[r4] > t3 || u[e4] > t3)
                  return false;
                var o, a2, i2, m2;
                for (m2 = 0; m2 < 4; m2++)
                  if (m2 != n4)
                    for (o = r4, a2 = e4, i2 = 0; i2 < 2; i2++) {
                      if (o = c[o][m2], a2 = l[a2][m2], s2[s2.length] = m2 + 8 * i2, g(o, a2, t3 - 1, m2))
                        return true;
                      s2.length--;
                    }
              }
              return false;
            }
            function y(r4, e4) {
              var t3, n4, o, a2 = [], i2 = r4;
              for (t3 = 1; t3 <= 6; t3++) {
                for (n4 = i2 - t3 * (o = Math.floor(i2 / t3)), i2 = o, o = t3 - 1; o >= n4; o--)
                  a2[o + 1] = a2[o];
                a2[n4] = 6 - t3;
              }
              for (0 == e4 ? A(a2, 0, 3, 1) : 1 == e4 ? A(a2, 1, 5, 2) : 2 == e4 ? A(a2, 0, 2, 4) : 3 == e4 && A(a2, 3, 4, 5), i2 = 0, t3 = 0; t3 < 6; t3++) {
                for (n4 = 0, o = 0; o < 6 && a2[o] != t3; o++)
                  a2[o] > t3 && n4++;
                i2 = i2 * (6 - t3) + n4;
              }
              return i2;
            }
            function b(r4, e4) {
              var t3, n4, o, a2 = 0, i2 = [], f2 = r4;
              for (t3 = 0; t3 <= 4; t3++)
                i2[t3] = 1 & f2, f2 >>= 1, a2 ^= i2[t3];
              for (i2[5] = a2, t3 = 6; t3 <= 9; t3++)
                n4 = f2 - 3 * (o = Math.floor(f2 / 3)), f2 = o, i2[t3] = n4;
              for (0 == e4 ? (i2[6]++, 3 == i2[6] && (i2[6] = 0), A(i2, 0, 3, 1), i2[1] ^= 1, i2[3] ^= 1) : 1 == e4 ? (i2[7]++, 3 == i2[7] && (i2[7] = 0), A(i2, 1, 5, 2), i2[2] ^= 1, i2[5] ^= 1) : 2 == e4 ? (i2[8]++, 3 == i2[8] && (i2[8] = 0), A(i2, 0, 2, 4), i2[0] ^= 1, i2[2] ^= 1) : 3 == e4 && (i2[9]++, 3 == i2[9] && (i2[9] = 0), A(i2, 3, 4, 5), i2[3] ^= 1, i2[4] ^= 1), f2 = 0, t3 = 9; t3 >= 6; t3--)
                f2 = 3 * f2 + i2[t3];
              for (t3 = 4; t3 >= 0; t3--)
                f2 = 2 * f2 + i2[t3];
              return f2;
            }
            function S(r4, e4, t3) {
              switch (r4) {
                case 0:
                  w(t3, 14, 58, 18, e4), w(t3, 15, 57, 31, e4), w(t3, 16, 70, 32, e4), w(t3, 30, 28, 56, e4);
                  break;
                case 1:
                  w(t3, 32, 72, 22, e4), w(t3, 33, 59, 23, e4), w(t3, 20, 58, 24, e4), w(t3, 34, 60, 36, e4);
                  break;
                case 2:
                  w(t3, 14, 10, 72, e4), w(t3, 1, 11, 71, e4), w(t3, 2, 24, 70, e4), w(t3, 0, 12, 84, e4);
                  break;
                case 3:
                  w(t3, 2, 18, 22, e4), w(t3, 3, 19, 9, e4), w(t3, 16, 20, 10, e4), w(t3, 4, 6, 8, e4);
                  break;
                case 4:
                  w(t3, 30, 28, 56, e4);
                  break;
                case 5:
                  w(t3, 34, 60, 36, e4);
                  break;
                case 6:
                  w(t3, 0, 12, 84, e4);
                  break;
                case 7:
                  w(t3, 4, 6, 8, e4);
              }
            }
            function w(r4, t3, n4, o, a2) {
              2 == a2 ? A(e3[r4], o, n4, t3) : A(e3[r4], t3, n4, o);
            }
            function A(r4, e4, t3, n4) {
              var o = r4[e4];
              r4[e4] = r4[t3], r4[t3] = r4[n4], r4[n4] = o;
            }
            var R, L = function(r4) {
              R = r4;
            };
            return { version: "July 05, 2015", initialize: function(r4) {
              L(r4), function() {
                var r5, e4, t3, n4, o;
                for (e4 = 0; e4 < 720; e4++)
                  for (f[e4] = -1, c[e4] = [], o = 0; o < 4; o++)
                    c[e4][o] = y(e4, o);
                for (f[0] = 0, n4 = 0; n4 <= 6; n4++)
                  for (e4 = 0; e4 < 720; e4++)
                    if (f[e4] == n4)
                      for (o = 0; o < 4; o++)
                        for (t3 = e4, r5 = 0; r5 < 2; r5++)
                          t3 = c[t3][o], -1 == f[t3] && (f[t3] = n4 + 1);
                for (e4 = 0; e4 < 2592; e4++)
                  for (u[e4] = -1, l[e4] = [], o = 0; o < 4; o++)
                    l[e4][o] = b(e4, o);
                for (u[0] = 0, n4 = 0; n4 <= 5; n4++)
                  for (e4 = 0; e4 < 2592; e4++)
                    if (u[e4] == n4)
                      for (o = 0; o < 4; o++)
                        for (t3 = e4, r5 = 0; r5 < 2; r5++)
                          t3 = l[t3][o], -1 == u[t3] && (u[t3] = n4 + 1);
              }();
            }, setRandomSource: L, getRandomScramble: function() {
              return function() {
                var r4, e4;
                for (e4 = 0; e4 < 1; e4++) {
                  for (h(), p(), n3[e4] = "", a(e4), r4 = 0; r4 < s2.length; r4++)
                    n3[e4] += ["U", "L", "R", "B"][7 & s2[r4]] + ["", "'"][(8 & s2[r4]) / 8] + " ", S([3, 0, 1, 2][7 & s2[r4]], 1 + (8 & s2[r4]) / 8, e4);
                  var t3 = ["l", "r", "b", "u"];
                  for (r4 = 0; r4 < 4; r4++) {
                    var o;
                    (o = Math.floor(3 * R.random())) < 2 && (n3[e4] += t3[r4] + ["", "'"][o] + " ", S(4 + r4, 1 + o, e4));
                  }
                }
              }(), { state: e3, scramble_string: n3[0] };
            }, setScrambleLength: function() {
            } };
          }(), ["pyra", "pyraminx"]);
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => n2 });
        const n2 = function(r3) {
          var e3, t3, n3 = (e3 = Math, t3 = 11, { initialize: function(r4) {
            e3 = r4;
          }, setRandomSource: function(r4) {
            e3 = r4;
          }, getRandomScramble: function() {
            function r4(r5) {
              for (var e4 = arguments.length - 1, t4 = r5[arguments[e4]], n5 = e4; n5 > 1; n5--)
                r5[arguments[n5]] = r5[arguments[n5 - 1]];
              r5[arguments[1]] = t4;
            }
            function n4(r5, e4) {
              return r5[e4 >> 3] >> ((7 & e4) << 2) & 15;
            }
            function o(r5, e4, t4, n5) {
              for (var o2 = 0; o2 < n5; o2++) {
                r5[o2] = [];
                for (var a2 = 0; a2 < e4; a2++)
                  r5[o2][a2] = t4(a2, o2);
              }
            }
            function a(r5, e4, t4, o2, a2, i2, f2) {
              for (var u2 = Array.isArray(a2), c2 = 0, l2 = t4 + 7 >>> 3; c2 < l2; c2++)
                r5[c2] = -1;
              r5[e4 >> 3] ^= 15 << ((7 & e4) << 2);
              for (var s3 = 0; s3 <= o2; s3++)
                for (var m2 = s3 + 1 ^ 15, v2 = 0; v2 < t4; v2++)
                  if (n4(r5, v2) == s3)
                    for (var h2 = 0; h2 < i2; h2++)
                      for (var d2 = v2, p2 = 0; p2 < f2; p2++)
                        15 == n4(r5, d2 = u2 ? a2[h2][d2] : a2(d2, h2)) && (r5[d2 >> 3] ^= m2 << ((7 & d2) << 2));
            }
            function i(r5, e4, t4, o2, a2) {
              if (0 == t4)
                return 0 == r5 && 0 == e4;
              if (n4(l, r5) > t4 || n4(s2, e4) > t4)
                return false;
              for (var f2 = 0; 4 > f2; f2++)
                if (f2 != o2) {
                  for (var u2 = r5, c2 = e4, v2 = 0; 2 > v2; v2++)
                    if (i(u2 = w[f2][u2], c2 = m[f2][c2], t4 - 1, f2, a2))
                      return a2.push(2 * f2 + (1 - v2)), true;
                }
              return false;
            }
            function f(r5, e4) {
              for (var t4 = [], n5 = [], o2 = 0; o2 < 4; o2++)
                t4[o2] = r5 % 3, r5 = ~~(r5 / 3);
              for (o2 = 0; o2 < 3; o2++)
                n5[o2] = r5 % 3, r5 = ~~(r5 / 3);
              if (n5[3] = (6 - n5[0] - n5[1] - n5[2]) % 3, t4[e4] = (t4[e4] + 1) % 3, 0 == e4) {
                var a2 = n5[0];
                n5[0] = n5[2] + 2, n5[2] = n5[1] + 2, n5[1] = a2 + 2;
              } else
                1 == e4 ? (a2 = n5[0], n5[0] = n5[1] + 2, n5[1] = n5[3] + 2, n5[3] = a2 + 2) : 2 == e4 ? (a2 = n5[0], n5[0] = n5[3] + 2, n5[3] = n5[2] + 2, n5[2] = a2 + 2) : 3 == e4 && (a2 = n5[1], n5[1] = n5[2] + 2, n5[2] = n5[3] + 2, n5[3] = a2 + 2);
              for (o2 = 2; o2 >= 0; o2--)
                r5 = 3 * r5 + n5[o2] % 3;
              for (o2 = 3; o2 >= 0; o2--)
                r5 = 3 * r5 + t4[o2];
              return r5;
            }
            var u, c, l = [], s2 = [], m = [], v = [1, 1, 1, 3, 12, 60, 360], h = [[6, 5, 10, 1], [9, 7, 4, 2], [3, 11, 8, 0], [10, 1, 6, 5], [0, 8, 11, 3], [7, 9, 2, 4], [4, 2, 9, 7], [11, 3, 0, 8], [1, 10, 5, 6], [8, 0, 3, 11], [2, 4, 7, 9], [5, 6, 1, 10]], d = [0, 1, 2, 0, 2, 1, 1, 2, 0, 2, 1, 0], p = [];
            o(w = [], 4320, function(e4, t4) {
              var n5 = e4 % 12;
              e4 = ~~(e4 / 12);
              for (var o2 = [], a2 = 5517840, i2 = 0, f2 = 0; 5 > f2; f2++) {
                var u2 = v[5 - f2], c2 = (e4 -= (c2 = ~~(e4 / u2)) * u2, i2 ^= c2, c2 << 2);
                o2[f2] = a2 >> c2 & 15, a2 = (a2 & (u2 = (1 << c2) - 1)) + (a2 >> 4 & ~u2);
              }
              for (0 == (1 & i2) ? o2[5] = a2 : (o2[5] = o2[4], o2[4] = a2), 0 == t4 && r4(o2, 0, 3, 1), 2 == t4 && r4(o2, 1, 5, 2), 1 == t4 && r4(o2, 0, 2, 4), 3 == t4 && r4(o2, 3, 4, 5), e4 = 0, a2 = 5517840, f2 = 0; 4 > f2; f2++)
                e4 *= 6 - f2, e4 += a2 >> (c2 = o2[f2] << 2) & 15, a2 -= 1118480 << c2;
              return 12 * e4 + h[n5][t4];
            }, 4), a(l, 0, 4320, 7, w, 4, 2), o(m, 2187, f, 4), a(s2, 0, 2187, 6, m, 4, 2);
            do {
              u = 0 | 4320 * e3.random(), c = 0 | 2187 * e3.random();
            } while (0 == u && 0 == c || d[u % 12] != (c + ~~(c / 3) + ~~(c / 9) + ~~(c / 27)) % 3);
            for (; 99 > t3 && !i(u, c, t3, -1, p); t3++)
              ;
            for (var g = [], y = ["L", "R", "B", "U"], f = 0; f < p.length; f++) {
              var b = p[f] >> 1, S = 1 & p[f];
              if (2 == b)
                for (var w = 0; w <= S; w++) {
                  var A = y[0];
                  y[0] = y[1], y[1] = y[3], y[3] = A;
                }
              g.push(y[b] + (1 == S ? "'" : ""));
            }
            return { scramble_string: g.join(" ") };
          }.bind(11), setScrambleLength: function(r4) {
            t3 = r4;
          } });
          r3("skewb", n3);
        };
      }, (r2, e2, t2) => {
        t2.r(e2), t2.d(e2, { default: () => n2 });
        const n2 = function(r3) {
          r3("sq1", function() {
            var r4, e3, t3, n3, o, a, i, f, u, c, l, s2, m;
            function v() {
            }
            function h(r5, e4) {
              var t4;
              (e4 <<= 2) > 24 ? (e4 = 48 - e4, t4 = r5.ul, r5.ul = 16777215 & (~~r5.ul >> e4 | r5.ur << 24 - e4), r5.ur = 16777215 & (~~r5.ur >> e4 | t4 << 24 - e4)) : e4 > 0 ? (t4 = r5.ul, r5.ul = 16777215 & (r5.ul << e4 | ~~r5.ur >> 24 - e4), r5.ur = 16777215 & (r5.ur << e4 | ~~t4 >> 24 - e4)) : 0 == e4 ? (t4 = r5.ur, r5.ur = r5.dl, r5.dl = t4, r5.ml = 1 - r5.ml) : e4 >= -24 ? (e4 = -e4, t4 = r5.dl, r5.dl = 16777215 & (r5.dl << e4 | ~~r5.dr >> 24 - e4), r5.dr = 16777215 & (r5.dr << e4 | ~~t4 >> 24 - e4)) : e4 < -24 && (e4 = 48 + e4, t4 = r5.dl, r5.dl = 16777215 & (~~r5.dl >> e4 | r5.dr << 24 - e4), r5.dr = 16777215 & (~~r5.dr >> e4 | t4 << 24 - e4));
            }
            function d(r5) {
              var e4, t4, n4, o2;
              return o2 = 1118481 & r5.ur, o2 |= ~~o2 >> 3, o2 = 15 & (o2 |= ~~o2 >> 6) | ~~o2 >> 12 & 48, n4 = 1118481 & r5.ul, n4 |= ~~n4 >> 3, n4 = 15 & (n4 |= ~~n4 >> 6) | ~~n4 >> 12 & 48, t4 = 1118481 & r5.dr, t4 |= ~~t4 >> 3, t4 = 15 & (t4 |= ~~t4 >> 6) | ~~t4 >> 12 & 48, e4 = 1118481 & r5.dl, e4 |= ~~e4 >> 3, e4 = 15 & (e4 |= ~~e4 >> 6) | ~~e4 >> 12 & 48, x(function(r6) {
                var e5, t5, n5, o3, a2;
                for (n5 = 0, r6.arr[0] = p(r6, 0), o3 = 1; o3 < 24; ++o3)
                  p(r6, o3) != r6.arr[n5] && (r6.arr[++n5] = p(r6, o3));
                for (a2 = 0, e5 = 0; e5 < 16; ++e5)
                  for (t5 = e5 + 1; t5 < 16; ++t5)
                    r6.arr[e5] > r6.arr[t5] && (a2 ^= 1);
                return a2;
              }(r5) << 24 | n4 << 18 | o2 << 12 | e4 << 6 | t4);
            }
            function p(r5, e4) {
              return ~~((15 & (e4 < 6 ? ~~r5.ul >> (5 - e4 << 2) : e4 < 12 ? ~~r5.ur >> (11 - e4 << 2) : e4 < 18 ? ~~r5.dl >> (17 - e4 << 2) : ~~r5.dr >> (23 - e4 << 2))) << 24) >> 24;
            }
            function g(r5, e4, t4) {
              e4 < 6 ? (r5.ul &= ~(15 << (5 - e4 << 2)), r5.ul |= t4 << (5 - e4 << 2)) : e4 < 12 ? (r5.ur &= ~(15 << (11 - e4 << 2)), r5.ur |= t4 << (11 - e4 << 2)) : e4 < 18 ? (r5.dl &= ~(15 << (17 - e4 << 2)), r5.dl |= t4 << (17 - e4 << 2)) : (r5.dr &= ~(15 << (23 - e4 << 2)), r5.dr |= t4 << (23 - e4 << 2));
            }
            function y() {
              this.arr = [], this.prm = [];
            }
            function b(r5) {
              var e4, t4, n4, o2, a2;
              for (function(r6, e5) {
                r6.ul = e5.ul, r6.ur = e5.ur, r6.dl = e5.dl, r6.dr = e5.dr, r6.ml = e5.ml;
              }(r5.Search_d, r5.Search_c), n4 = 0; n4 < r5.Search_length1; ++n4)
                h(r5.Search_d, r5.Search_move[n4]);
              for (function(r6, e5) {
                var t5, n5;
                for (t5 = 0; t5 < 8; ++t5)
                  r6.prm[t5] = ~~(~~p(r6, 3 * t5 + 1) >> 1 << 24) >> 24;
                for (e5.cornperm = P(r6.prm), e5.topEdgeFirst = p(r6, 0) == p(r6, 1), t5 = e5.topEdgeFirst ? 2 : 0, n5 = 0; n5 < 4; t5 += 3, ++n5)
                  r6.prm[n5] = ~~(~~p(r6, t5) >> 1 << 24) >> 24;
                for (e5.botEdgeFirst = p(r6, 12) == p(r6, 13), t5 = e5.botEdgeFirst ? 14 : 12; n5 < 8; t5 += 3, ++n5)
                  r6.prm[n5] = ~~(~~p(r6, t5) >> 1 << 24) >> 24;
                e5.edgeperm = P(r6.prm), e5.ml = r6.ml;
              }(r5.Search_d, r5.Search_sq), t4 = r5.Search_sq.edgeperm, e4 = r5.Search_sq.cornperm, a2 = r5.Search_sq.ml, n4 = Math.max(c[r5.Search_sq.edgeperm << 1 | a2], c[r5.Search_sq.cornperm << 1 | a2]); n4 < r5.Search_maxlen2; ++n4)
                if (A(r5, t4, e4, r5.Search_sq.topEdgeFirst, r5.Search_sq.botEdgeFirst, a2, n4, r5.Search_length1, 0)) {
                  for (o2 = 0; o2 < n4; ++o2)
                    h(r5.Search_d, r5.Search_move[r5.Search_length1 + o2]);
                  return r5.Search_sol_string = S(r5, n4 + r5.Search_length1), true;
                }
              return false;
            }
            function S(r5, e4) {
              for (var t4 = "", n4 = 0, o2 = 0, a2 = e4 - 1; a2 >= 0; a2--) {
                var i2 = r5.Search_move[a2];
                i2 > 0 ? n4 = (i2 = 12 - i2) > 6 ? i2 - 12 : i2 : i2 < 0 ? o2 = (i2 = 12 + i2) > 6 ? i2 - 12 : i2 : (t4 += 0 == n4 && 0 == o2 ? " / " : "(" + n4 + ", " + o2 + ") / ", n4 = o2 = 0);
              }
              return 0 == n4 && 0 == o2 || (t4 += "(" + n4 + ", " + o2 + ")"), t4;
            }
            function w(r5, t4, i2, f2, u2, c2) {
              var l2, s3, m2;
              if (0 == i2 && f2 < 4)
                return 0 == f2 && b(r5);
              if (0 != c2 && (m2 = a[t4], (s3 = n3[m2]) < f2 && (r5.Search_move[u2] = 0, w(r5, m2, s3, f2 - 1, u2 + 1, 0))))
                return true;
              if (m2 = t4, c2 <= 0) {
                for (l2 = 0; !(m2 = ~~(l2 += o[m2]) >> 4, (l2 &= 15) >= 12 || (s3 = n3[m2]) > f2); )
                  if (s3 < f2 && (r5.Search_move[u2] = l2, w(r5, m2, s3, f2 - 1, u2 + 1, 1)))
                    return true;
              }
              if (m2 = t4, c2 <= 1) {
                for (l2 = 0; !(m2 = ~~(l2 += e3[m2]) >> 4, (l2 &= 15) >= 6 || (s3 = n3[m2]) > f2); )
                  if (s3 < f2 && (r5.Search_move[u2] = -l2, w(r5, m2, s3, f2 - 1, u2 + 1, 2)))
                    return true;
              }
              return false;
            }
            function A(r5, e4, t4, n4, o2, a2, i2, u2, m2) {
              var v2, h2, d2, p2, g2, y2, b2;
              if (0 == i2 && !n4 && o2)
                return true;
              if (0 != m2 && n4 == o2 && (d2 = s2[e4], h2 = s2[t4], c[d2 << 1 | 1 - a2] < i2 && c[h2 << 1 | 1 - a2] < i2 && (r5.Search_move[u2] = 0, A(r5, d2, h2, n4, o2, 1 - a2, i2 - 1, u2 + 1, 0))))
                return true;
              if (m2 <= 0)
                for (d2 = (b2 = !n4) ? l[e4] : e4, h2 = b2 ? t4 : l[t4], p2 = b2 ? 1 : 2, g2 = c[d2 << 1 | a2], y2 = c[h2 << 1 | a2]; p2 < 12 && g2 <= i2 && g2 <= i2; ) {
                  if (g2 < i2 && y2 < i2 && (r5.Search_move[u2] = p2, A(r5, d2, h2, b2, o2, a2, i2 - 1, u2 + 1, 1)))
                    return true;
                  (b2 = !b2) ? (d2 = l[d2], g2 = c[d2 << 1 | a2], p2 += 1) : (h2 = l[h2], y2 = c[h2 << 1 | a2], p2 += 2);
                }
              if (m2 <= 1)
                for (d2 = (v2 = !o2) ? f[e4] : e4, h2 = v2 ? t4 : f[t4], p2 = v2 ? 1 : 2, g2 = c[d2 << 1 | a2], y2 = c[h2 << 1 | a2]; p2 < (i2 > 3 ? 6 : 12) && g2 <= i2 && g2 <= i2; ) {
                  if (g2 < i2 && y2 < i2 && (r5.Search_move[u2] = -p2, A(r5, d2, h2, n4, v2, a2, i2 - 1, u2 + 1, 2)))
                    return true;
                  (v2 = !v2) ? (d2 = f[d2], g2 = c[d2 << 1 | a2], p2 += 1) : (h2 = f[h2], y2 = c[h2 << 1 | a2], p2 += 2);
                }
              return false;
            }
            function R() {
              this.Search_move = [], this.Search_d = new y(), this.Search_sq = new F();
            }
            function L() {
              L = v, i = [0, 3, 6, 12, 15, 24, 27, 30, 48, 51, 54, 60, 63], t3 = [], n3 = [], o = [], e3 = [], a = [], function() {
                var r5, f2, u2, c2, l2, s3, m2, v2, h2, d2, p2, g2, y2, b2, S2;
                for (r5 = 0, m2 = 0; m2 < 28561; ++m2)
                  s3 = i[m2 % 13], u2 = i[~~(m2 / 13) % 13], p2 = i[~~(~~(m2 / 13) / 13) % 13], 16 == O(g2 = i[~~(~~(~~(m2 / 13) / 13) / 13)] << 18 | p2 << 12 | u2 << 6 | s3) && (t3[r5++] = g2);
                for (d2 = new j(), m2 = 0; m2 < 7356; ++m2)
                  z(d2, m2), o[m2] = M(d2), o[m2] |= U(d2) << 4, z(d2, m2), e3[m2] = _(d2), e3[m2] |= U(d2) << 4, z(d2, m2), y2 = O(S2 = 63 & d2.top), b2 = O(4032 & d2.bottom), d2.Shape_parity ^= 1 & ~~(y2 & b2) >> 1, d2.top = 4032 & d2.top | ~~d2.bottom >> 6 & 63, d2.bottom = 63 & d2.bottom | S2 << 6, a[m2] = U(d2);
                for (m2 = 0; m2 < 7536; ++m2)
                  n3[m2] = -1;
                n3[x(14378715)] = 0, n3[x(31157686)] = 0, n3[x(23967451)] = 0, n3[x(7191990)] = 0, c2 = 4, l2 = 0, f2 = -1;
                for (; c2 != l2; )
                  for (l2 = c2, ++f2, m2 = 0; m2 < 7536; ++m2)
                    if (n3[m2] == f2) {
                      h2 = 0, v2 = m2;
                      do {
                        h2 += 15 & (v2 = o[v2]), -1 == n3[v2 >>= 4] && (++c2, n3[v2] = f2 + 1);
                      } while (12 != h2);
                      h2 = 0, v2 = m2;
                      do {
                        h2 += 15 & (v2 = e3[v2]), -1 == n3[v2 >>= 4] && (++c2, n3[v2] = f2 + 1);
                      } while (12 != h2);
                      v2 = a[m2], -1 == n3[v2] && (++c2, n3[v2] = f2 + 1);
                    }
              }();
            }
            function _(r5) {
              var e4, t4;
              e4 = 0, t4 = 0;
              do {
                0 == (2048 & r5.bottom) ? (e4 += 1, r5.bottom = r5.bottom << 1) : (e4 += 2, r5.bottom = r5.bottom << 2 ^ 12291), t4 = 1 - t4;
              } while (0 != (1 & O(63 & r5.bottom)));
              return 0 == (2 & O(r5.bottom)) && (r5.Shape_parity ^= t4), e4;
            }
            function U(r5) {
              return B(t3, r5.top << 12 | r5.bottom) << 1 | r5.Shape_parity;
            }
            function z(r5, e4) {
              r5.Shape_parity = 1 & e4, r5.top = t3[~~e4 >> 1], r5.bottom = 4095 & r5.top, r5.top >>= 12;
            }
            function M(r5) {
              var e4, t4;
              e4 = 0, t4 = 0;
              do {
                0 == (2048 & r5.top) ? (e4 += 1, r5.top = r5.top << 1) : (e4 += 2, r5.top = r5.top << 2 ^ 12291), t4 = 1 - t4;
              } while (0 != (1 & O(63 & r5.top)));
              return 0 == (2 & O(r5.top)) && (r5.Shape_parity ^= t4), e4;
            }
            function j() {
            }
            function x(r5) {
              return B(t3, 16777215 & r5) << 1 | ~~r5 >> 24;
            }
            function C() {
              C = v, c = [], s2 = [], l = [], f = [], m = [1, 1, 2, 6, 24, 120, 720, 5040], u = [];
              for (var r5 = 0; r5 < 12; ++r5)
                u[r5] = [];
              !function() {
                var r6, e4, t4, n4, o2, a2, i2, m2, v2, h2, d2, p2, g2;
                for (o2 = 0; o2 < 12; ++o2)
                  for (u[o2][0] = 1, u[o2][o2] = 1, v2 = 1; v2 < o2; ++v2)
                    u[o2][v2] = u[o2 - 1][v2 - 1] + u[o2 - 1][v2];
                for (p2 = [], o2 = 0; o2 < 40320; ++o2)
                  E(p2, o2), g2 = p2[2], p2[2] = p2[4], p2[4] = g2, g2 = p2[3], p2[3] = p2[5], p2[5] = g2, s2[o2] = P(p2), E(p2, o2), g2 = p2[0], p2[0] = p2[1], p2[1] = p2[2], p2[2] = p2[3], p2[3] = g2, l[o2] = P(p2), E(p2, o2), g2 = p2[4], p2[4] = p2[5], p2[5] = p2[6], p2[6] = p2[7], p2[7] = g2, f[o2] = P(p2);
                for (o2 = 0; o2 < 80640; ++o2)
                  c[o2] = -1;
                c[0] = 0, e4 = 0, t4 = 1;
                for (; t4 < 80640; ) {
                  n4 = (m2 = e4 >= 11) ? -1 : e4, r6 = m2 ? e4 : -1, ++e4;
                  r:
                    for (o2 = 0; o2 < 80640; ++o2)
                      if (c[o2] == n4) {
                        if (d2 = 1 & o2, i2 = s2[a2 = ~~o2 >> 1] << 1 | 1 - d2, c[i2] == r6 && (++t4, c[m2 ? o2 : i2] = ~~(e4 << 24) >> 24, m2))
                          continue r;
                        for (i2 = a2, h2 = 0; h2 < 4; ++h2)
                          if (i2 = l[i2], c[i2 << 1 | d2] == r6 && (++t4, c[m2 ? o2 : i2 << 1 | d2] = ~~(e4 << 24) >> 24, m2))
                            continue r;
                        for (h2 = 0; h2 < 4; ++h2)
                          if (i2 = f[i2], c[i2 << 1 | d2] == r6 && (++t4, c[m2 ? o2 : i2 << 1 | d2] = ~~(e4 << 24) >> 24, m2))
                            continue r;
                      }
                }
              }();
            }
            function F() {
            }
            function P(r5) {
              var e4, t4, n4, o2;
              for (t4 = 0, o2 = 1985229328, e4 = 0; e4 < 7; ++e4)
                t4 = (8 - e4) * t4 + (~~o2 >> (n4 = r5[e4] << 2) & 7), o2 -= 286331152 << n4;
              return 65535 & t4;
            }
            function E(r5, e4) {
              var t4, n4, o2, a2, i2;
              for (i2 = 1985229328, t4 = 0; t4 < 7; ++t4)
                e4 -= (a2 = ~~(e4 / (o2 = m[7 - t4]))) * o2, a2 <<= 2, r5[t4] = ~~((~~i2 >> a2 & 7) << 24) >> 24, i2 = (i2 & (n4 = (1 << a2) - 1)) + (~~i2 >> 4 & ~n4);
              r5[7] = ~~(i2 << 24) >> 24;
            }
            function O(r5) {
              return r5 = (~~(r5 = (~~(r5 -= ~~r5 >> 1 & 1431655765) >> 2 & 858993459) + (858993459 & r5)) >> 4) + r5 & 252645135, r5 += ~~r5 >> 8, 63 & (r5 += ~~r5 >> 16);
            }
            function B(r5, e4) {
              var t4, n4, o2, a2;
              for (n4 = 0, t4 = r5.length - 1; n4 <= t4; )
                if ((a2 = r5[o2 = n4 + (~~(t4 - n4) >> 1)]) < e4)
                  n4 = o2 + 1;
                else {
                  if (!(a2 > e4))
                    return o2;
                  t4 = o2 - 1;
                }
              return -n4 - 1;
            }
            (r4 = y.prototype = function() {
            }.prototype).dl = 10062778, r4.dr = 14536702, r4.ml = 0, r4.ul = 70195, r4.ur = 4544119, (r4 = R.prototype = function() {
            }.prototype).Search_c = null, r4.Search_length1 = 0, r4.Search_maxlen2 = 0, r4.Search_sol_string = null, (r4 = j.prototype = function() {
            }.prototype).bottom = 0, r4.Shape_parity = 0, r4.top = 0, (r4 = F.prototype = function() {
            }.prototype).botEdgeFirst = false, r4.cornperm = 0, r4.edgeperm = 0, r4.ml = 0, r4.topEdgeFirst = false;
            var k, D = false, I = function(r5) {
              T(r5), D || (L(), C()), D = true;
            }, T = function(r5) {
              k = r5;
            }, q = function() {
              return D || I(), function() {
                var r5, e4, n4, o2, a2, i2, f2, u2, c2;
                for (r5 = new y(), n4 = t3[~~Math.floor(3678 * k.random())], a2 = 324508639, o2 = 38177486, f2 = i2 = 8, e4 = 0; e4 < 24; e4++)
                  0 == (n4 >> e4 & 1) ? (g(r5, 23 - e4, o2 >> (u2 = ~~Math.floor(k.random() * i2) << 2) & 15), o2 = (o2 & (c2 = (1 << u2) - 1)) + (o2 >> 4 & ~c2), --i2) : (g(r5, 23 - e4, a2 >> (u2 = ~~Math.floor(k.random() * f2) << 2) & 15), g(r5, 22 - e4, a2 >> u2 & 15), a2 = (a2 & (c2 = (1 << u2) - 1)) + (a2 >> 4 & ~c2), --f2, ++e4);
                return r5.ml = ~~Math.floor(2 * k.random()), r5;
              }();
            }, J = function(r5) {
              return function(r6, e4) {
                var t4;
                for (r6.Search_c = e4, t4 = d(e4), r6.Search_length1 = n3[t4]; r6.Search_length1 < 100 && (r6.Search_maxlen2 = Math.min(31 - r6.Search_length1, 17), !w(r6, t4, n3[t4], r6.Search_length1, 0, -1)); ++r6.Search_length1)
                  ;
                return r6.Search_sol_string;
              }(new R(), r5);
            };
            return { version: "July 05, 2015", initialize: I, setRandomSource: T, getRandomScramble: function() {
              var r5 = q();
              return { state: r5, scramble_string: J(r5) };
            }, getRandomPosition: q, generate: J, setScrambleLength: function() {
            } };
          }(), ["square1", "square-1", "squan"]);
        };
      }], e = {};
      function t(n2) {
        var o = e[n2];
        if (void 0 !== o)
          return o.exports;
        var a = e[n2] = { exports: {} };
        return r[n2].call(a.exports, a, a.exports, t), a.exports;
      }
      t.d = (r2, e2) => {
        for (var n2 in e2)
          t.o(e2, n2) && !t.o(r2, n2) && Object.defineProperty(r2, n2, { enumerable: true, get: e2[n2] });
      }, t.o = (r2, e2) => Object.prototype.hasOwnProperty.call(r2, e2), t.r = (r2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(r2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r2, "__esModule", { value: true });
      };
      var n = {};
      return (() => {
        var r2 = n;
        Object.defineProperty(r2, "__esModule", { value: true }), r2.Scrambow = void 0;
        var e2 = t(1);
        Object.defineProperty(r2, "Scrambow", { enumerable: true, get: function() {
          return e2.Scrambow;
        } });
      })(), n;
    })();
  });
})(scrambow);
function generateScramble(cubeType2) {
  const scrambow2 = new scrambowExports.Scrambow();
  const bldTypes = ["Bld3", "Bld4", "Bld5"];
  const blindTypeMapper = {
    Bld3: "N3"
  };
  let blind = false;
  if (bldTypes.includes(cubeType2)) {
    cubeType2 = blindTypeMapper[cubeType2.toString()];
    blind = true;
  }
  let scramble = scrambow2.setType(scrambleMappper[cubeType2]).get()[0].scramble_string;
  if (blind) {
    scramble += " " + getBlindWideMove();
  }
  return scramble;
}
function getBlindWideMove() {
  const moves = ["Uw", "Lw", "Rw", "Fw"];
  const move = moves[Math.floor(Math.random() * moves.length)];
  const randState = Math.random();
  if (randState < 0.33) {
    return `${move}'`;
  } else if (randState < 0.66) {
    return `${move}2`;
  }
  return move;
}
const timerLogo = "/_app/immutable/assets/timer-logo.37fde3ae.webp";
const Sidebar_svelte_svelte_type_style_lang = "";
const css = {
  code: "@media screen and (max-height: 800px){.average.svelte-9sa79s{display:none}}",
  map: null
};
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $bestSolve, $$unsubscribe_bestSolve;
  let $solves, $$unsubscribe_solves;
  $$unsubscribe_bestSolve = subscribe(bestSolve, (value) => $bestSolve = value);
  $$unsubscribe_solves = subscribe(solves, (value) => $solves = value);
  let { changeCubeType } = $$props;
  if ($$props.changeCubeType === void 0 && $$bindings.changeCubeType && changeCubeType !== void 0)
    $$bindings.changeCubeType(changeCubeType);
  $$result.css.add(css);
  $$unsubscribe_bestSolve();
  $$unsubscribe_solves();
  return `${validate_component(SidebarContainer, "SidebarContainer").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="mt-4 flex flex-col justify-center gap-4 p-4">${validate_component(Average, "Average").$$render(
        $$result,
        {
          label: "Best",
          value: getBest($bestSolve),
          best: true
        },
        {},
        {}
      )} <div class="flex gap-2">${validate_component(Average, "Average").$$render(
        $$result,
        {
          label: "Ao5",
          solves: $solves.slice(-5),
          count: 5
        },
        {},
        {}
      )} ${validate_component(Average, "Average").$$render(
        $$result,
        {
          label: "Ao12",
          solves: $solves.slice(-12),
          count: 12
        },
        {},
        {}
      )}</div> <div class="average flex gap-2 svelte-9sa79s">${validate_component(Average, "Average").$$render(
        $$result,
        {
          label: "Ao50",
          solves: $solves.slice(-50),
          count: 50
        },
        {},
        {}
      )} ${validate_component(Average, "Average").$$render(
        $$result,
        {
          label: "Ao100",
          solves: $solves.slice(-100),
          count: 100
        },
        {},
        {}
      )}</div></div> ${validate_component(Solves, "Solves").$$render($$result, {}, {}, {})} ${validate_component(Sessions, "Sessions").$$render($$result, { changeCubeType }, {}, {})}`;
    }
  })}`;
});
const ScrambleDisplay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_cubeType;
  $$unsubscribe_cubeType = subscribe(cubeType, (value) => value);
  let { scramble } = $$props;
  let container;
  cubeType.subscribe((value) => {
  });
  if ($$props.scramble === void 0 && $$bindings.scramble && scramble !== void 0)
    $$bindings.scramble(scramble);
  $$unsubscribe_cubeType();
  return ` <div${add_attribute("this", container, 0)}></div>`;
});
const Desktop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $settings, $$unsubscribe_settings;
  let $cubeType, $$unsubscribe_cubeType;
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_cubeType = subscribe(cubeType, (value) => $cubeType = value);
  let { timerText } = $$props;
  let { scramble } = $$props;
  let { textColor } = $$props;
  let { nextStatus } = $$props;
  let { changeCubeType } = $$props;
  let { eventUp } = $$props;
  let { eventDown } = $$props;
  let { newScramble } = $$props;
  let { createSolve } = $$props;
  let { connectBluetoothTimer } = $$props;
  let { timerContainer } = $$props;
  let { scrambleContainer } = $$props;
  let customTime = void 0;
  let scrambleEl;
  let timerEl;
  onDestroy(() => {
  });
  if ($$props.timerText === void 0 && $$bindings.timerText && timerText !== void 0)
    $$bindings.timerText(timerText);
  if ($$props.scramble === void 0 && $$bindings.scramble && scramble !== void 0)
    $$bindings.scramble(scramble);
  if ($$props.textColor === void 0 && $$bindings.textColor && textColor !== void 0)
    $$bindings.textColor(textColor);
  if ($$props.nextStatus === void 0 && $$bindings.nextStatus && nextStatus !== void 0)
    $$bindings.nextStatus(nextStatus);
  if ($$props.changeCubeType === void 0 && $$bindings.changeCubeType && changeCubeType !== void 0)
    $$bindings.changeCubeType(changeCubeType);
  if ($$props.eventUp === void 0 && $$bindings.eventUp && eventUp !== void 0)
    $$bindings.eventUp(eventUp);
  if ($$props.eventDown === void 0 && $$bindings.eventDown && eventDown !== void 0)
    $$bindings.eventDown(eventDown);
  if ($$props.newScramble === void 0 && $$bindings.newScramble && newScramble !== void 0)
    $$bindings.newScramble(newScramble);
  if ($$props.createSolve === void 0 && $$bindings.createSolve && createSolve !== void 0)
    $$bindings.createSolve(createSolve);
  if ($$props.connectBluetoothTimer === void 0 && $$bindings.connectBluetoothTimer && connectBluetoothTimer !== void 0)
    $$bindings.connectBluetoothTimer(connectBluetoothTimer);
  if ($$props.timerContainer === void 0 && $$bindings.timerContainer && timerContainer !== void 0)
    $$bindings.timerContainer(timerContainer);
  if ($$props.scrambleContainer === void 0 && $$bindings.scrambleContainer && scrambleContainer !== void 0)
    $$bindings.scrambleContainer(scrambleContainer);
  $$unsubscribe_settings();
  $$unsubscribe_cubeType();
  return `<div class="grid h-screen w-full grid-cols-[minmax(320px,_1fr)_3fr] xl:grid-cols-[minmax(350px,_1fr)_4fr]">${validate_component(Sidebar, "Sidebar").$$render($$result, { changeCubeType }, {}, {})} <div class="grid touch-manipulation grid-rows-3 overflow-hidden bg-background p-4"> <div class="flex items-center justify-center text-primary"${add_attribute("this", scrambleContainer, 0)}><span${add_attribute("class", `${scrambleSizeMapper[$cubeType]} whitespace-pre-line text-center`, 0)}${add_attribute("this", scrambleEl, 0)}>${escape(scramble)}</span></div>  <div class="relative select-none"${add_attribute("this", timerContainer, 0)}>${$settings.enteringTimes !== "Typing" ? `<p${add_attribute("class", `${textColor} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[150px]`, 0)}${add_attribute("this", timerEl, 0)}>${escape(timerText)}</p> <p class="absolute right-2 top-1/2 -translate-y-1/2 text-7xl text-primary">${escape(nextStatus)}</p>` : `<form class="flex items-center justify-center"><input type="text" class="w-3/4 rounded-xl border border-primary py-2 px-4 text-center text-[150px] text-primary focus:outline-none"${add_attribute("value", customTime, 0)}></form>`}</div>  <div class="grid grid-cols-[1fr,_4fr,_3fr] items-end justify-center gap-4 xl:grid-cols-3"${add_attribute("this", timerContainer, 0)}><div class="col-start-2 flex select-none items-center justify-center pb-10"><img${add_attribute("src", timerLogo, 0)} alt="Nomad Team"></div>  <div class="col-start-3"><div class="z-20 ml-auto flex max-w-xs flex-col justify-between rounded-xl bg-secondary pt-2 xl:w-3/4 xl:pt-4"> ${`${validate_component(ScrambleDisplay, "ScrambleDisplay").$$render($$result, { scramble }, {}, {})}`} <div class="flex flex-wrap items-center justify-center gap-2 py-2 px-2 text-lg md:py-4"><span class="py-1 text-white xl:py-2" data-svelte-h="svelte-136haur">Function</span> <select class="w-4/5 rounded-xl bg-background py-1 px-2 text-black xl:w-auto xl:py-2"><option value="timer" data-svelte-h="svelte-fvx8sr">Холилтын зураг</option><option value="gan" data-svelte-h="svelte-xo6xx5">Gan Timer</option></select></div></div></div></div></div></div>`;
});
const ScrambleLogo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg width="70" height="69" viewBox="0 0 70 69" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect width="69.0866" height="69" fill="url(#pattern0)"></rect><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_408_12090" transform="scale(0.00125313 0.00125471)"></use></pattern><image id="image0_408_12090" width="798" height="797" xlink:href="data:image/png;base64,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"></image></defs></svg>`;
});
const Mobile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_settings;
  let $cubeType, $$unsubscribe_cubeType;
  let $bestSolve, $$unsubscribe_bestSolve;
  let $solves, $$unsubscribe_solves;
  $$unsubscribe_settings = subscribe(settings, (value) => value);
  $$unsubscribe_cubeType = subscribe(cubeType, (value) => $cubeType = value);
  $$unsubscribe_bestSolve = subscribe(bestSolve, (value) => $bestSolve = value);
  $$unsubscribe_solves = subscribe(solves, (value) => $solves = value);
  let { timerText } = $$props;
  let { scramble } = $$props;
  let { textColor } = $$props;
  let { nextStatus } = $$props;
  let { timerEl } = $$props;
  let { scrambleEl } = $$props;
  let timerP;
  let scrambleP;
  if ($$props.timerText === void 0 && $$bindings.timerText && timerText !== void 0)
    $$bindings.timerText(timerText);
  if ($$props.scramble === void 0 && $$bindings.scramble && scramble !== void 0)
    $$bindings.scramble(scramble);
  if ($$props.textColor === void 0 && $$bindings.textColor && textColor !== void 0)
    $$bindings.textColor(textColor);
  if ($$props.nextStatus === void 0 && $$bindings.nextStatus && nextStatus !== void 0)
    $$bindings.nextStatus(nextStatus);
  if ($$props.timerEl === void 0 && $$bindings.timerEl && timerEl !== void 0)
    $$bindings.timerEl(timerEl);
  if ($$props.scrambleEl === void 0 && $$bindings.scrambleEl && scrambleEl !== void 0)
    $$bindings.scrambleEl(scrambleEl);
  $$unsubscribe_settings();
  $$unsubscribe_cubeType();
  $$unsubscribe_bestSolve();
  $$unsubscribe_solves();
  return `${validate_component(MobileContainer, "MobileContainer").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="relative flex flex-grow touch-manipulation flex-col p-4"><div><div class="mt-8 flex items-center justify-center text-center text-primary"${add_attribute("this", scrambleEl, 0)}><p${add_attribute("class", `${scrambleSizeMapper[$cubeType]} whitespace-pre-line`, 0)}${add_attribute("this", scrambleP, 0)}>${escape(scramble)}</p></div></div> <div class="flex flex-grow select-none flex-col"${add_attribute("this", timerEl, 0)}><div class="relative h-[40vh]"><p${add_attribute("class", `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-7xl ${textColor}`, 0)}${add_attribute("this", timerP, 0)}>${escape(timerText)}</p> <p class="absolute right-2 top-1/2 -translate-y-1/2 text-5xl text-primary">${escape(nextStatus)}</p></div> <div class="flex flex-grow items-end justify-between"><div class="space-y-2 text-primary"><p>Best time: ${escape(getBest($bestSolve))}</p> <p${add_attribute("class", `${checkBestAverage($solves, 5)}`, 0)}>Average of 5: ${escape(getAvg($solves, 5))}</p> <p${add_attribute("class", `${checkBestAverage($solves, 12)}`, 0)}>Average of 12: ${escape(getAvg($solves, 12))}</p></div> <button>${validate_component(ScrambleLogo, "ScrambleLogo").$$render($$result, {}, {}, {})}</button></div></div> <div${add_attribute("class", `${"hidden"} absolute bottom-2 right-1/2 w-4/5 translate-x-[60%] bg-primary pb-4`, 0)}><div class="relative"><button class="absolute top-0 right-0 z-20 p-4 text-2xl text-white" data-svelte-h="svelte-1rp2kbg">✕</button> ${validate_component(ScrambleDisplay, "ScrambleDisplay").$$render($$result, { scramble }, {}, {})}</div></div></div>`;
    }
  })}`;
});
const ganTimer = writable();
const { Object: Object_1 } = globals;
function setTextColor(state2) {
  if (state2 === "ready" || state2 === "inspectionReady") {
    return "text-green-400";
  } else if (state2 === "waiting" || state2 === "inspectionWaiting") {
    return "text-red-500";
  } else {
    return "text-primary";
  }
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let textColor;
  let props;
  let $ganTimer, $$unsubscribe_ganTimer;
  let $settings, $$unsubscribe_settings;
  let $cubeType, $$unsubscribe_cubeType;
  let $session, $$unsubscribe_session;
  let $solves, $$unsubscribe_solves;
  let $sortMode, $$unsubscribe_sortMode;
  $$unsubscribe_ganTimer = subscribe(ganTimer, (value) => $ganTimer = value);
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_cubeType = subscribe(cubeType, (value) => $cubeType = value);
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  $$unsubscribe_solves = subscribe(solves, (value) => $solves = value);
  $$unsubscribe_sortMode = subscribe(sortMode, (value) => $sortMode = value);
  let scramble = "Холилт хийж байна...";
  let currentScramble = null;
  let time = 0;
  let state = "stopped";
  let interval;
  let deleteAllModalOpen = false;
  let deleteLastModalOpen = false;
  let deleteCount = 1;
  let timeOutRef;
  let inspectionWaitRef;
  let timerText = displayTime(0);
  let inspectionRef;
  let inspectionSeconds;
  let nextStatus = "Ok";
  let isFetching = false;
  let mobileTimerEl;
  let mobileScrambleEl;
  let desktopTimerEL;
  let desktopScrambleEl;
  let customTimeRef;
  let customTime = void 0;
  let isCustomTimeModalOpen = false;
  const bldTypes = ["Bld3", "Bld4", "Bld5"];
  session.subscribe((value) => {
    if (value?.cube && browser) {
      scramble = generateScramble(value.cube);
    }
  });
  function handleGanTimerEvent(event) {
    switch (event.state) {
      case GanTimerState.HANDS_ON:
        updateState("waiting");
        break;
      case GanTimerState.HANDS_OFF:
        if (checkInspection()) {
          startInspection();
          updateState("inspection");
        } else {
          updateState("stopped");
        }
        break;
      case GanTimerState.RUNNING:
        startTime();
        updateState("running");
        break;
      case GanTimerState.STOPPED:
        if (event.recordedTime) {
          stopTime(event.recordedTime.asTimestamp);
          updateState("stopped");
        }
        break;
      case GanTimerState.IDLE:
        timerText = displayTime(0);
        break;
      case GanTimerState.GET_SET:
        updateState("ready");
        break;
    }
  }
  function startTime() {
    if (!$session) {
      return;
    }
    clearInterval(inspectionRef);
    const startedTime = Date.now();
    interval = setInterval(
      () => {
        const current = Date.now();
        time = current - startedTime;
        switch ($settings.timerUpdate) {
          case "None":
            timerText = "Solving";
            break;
          case "Seconds":
            timerText = displayTime(time).slice(0, -3);
            break;
          case "Point":
            timerText = displayTime(time).slice(0, -1);
            break;
          case "Update":
            timerText = displayTime(time);
            break;
          case "Inspection":
            timerText = "Solving";
            break;
          case "Default":
            timerText = displayTime(time);
            break;
        }
      },
      1
    );
  }
  function startInspection() {
    inspectionSeconds = 15;
    if ($settings.timerUpdate === "None") {
      timerText = "inspection";
    } else {
      timerText = "15";
    }
    inspectionRef = setInterval(
      () => {
        inspectionSeconds -= 1;
        if (inspectionSeconds <= -2) {
          nextStatus = "Dnf";
          timerText = "DNF";
        } else if (inspectionSeconds <= 0) {
          nextStatus = "Plus2";
          timerText = "+2";
        } else if (inspectionSeconds < 4) {
          nextStatus = "12sec";
          timerText = inspectionSeconds.toString();
        } else if (inspectionSeconds < 8) {
          nextStatus = "8sec";
          timerText = inspectionSeconds.toString();
        } else if ($settings.timerUpdate === "None") {
          timerText = "inspection";
        } else {
          timerText = inspectionSeconds.toString();
        }
      },
      1e3
    );
  }
  async function stopTime(customTime2 = void 0) {
    const internalTime = customTime2 || time;
    const currScramble = scramble;
    newScramble();
    clearInterval(interval);
    timerText = displayTime(internalTime);
    await createSolve(internalTime, currScramble, nextStatus === "8sec" || nextStatus === "12sec" ? "Ok" : nextStatus);
    nextStatus = "Ok";
  }
  async function createSolve(time2, scramble2, nState = "Ok") {
    if (isFetching)
      return false;
    isFetching = true;
    const response = await fetch("/api/solve", {
      method: "POST",
      body: JSON.stringify({
        time: time2,
        scramble: scramble2,
        sessionId: $session.id,
        status: nState
      })
    });
    const data = await response.json();
    isFetching = false;
    if (response.status === 200) {
      addSolves(data);
      return true;
    }
    return false;
  }
  async function removeSolves() {
    if (isFetching)
      return;
    isFetching = true;
    const response = await fetch(`/api/session/${$session.id}/reset`, { method: "DELETE" });
    const data = await response.json();
    isFetching = false;
    if (data.success === true) {
      resetSolves();
      deleteAllModalOpen = false;
    }
  }
  function getSortedLastSolve(count = 1) {
    let sortedSolves = [];
    switch ($sortMode) {
      case "none":
        sortedSolves = $solves.slice(-1 * count);
        break;
      case "asc":
        sortedSolves = $solves.slice().sort((a, b) => a.time - b.time).slice(0, count);
        break;
      case "desc":
        sortedSolves = $solves.slice().sort((a, b) => b.time - a.time).slice(0, count);
        break;
    }
    return sortedSolves;
  }
  async function deleteLastSolve(count = 1) {
    if (isFetching)
      return;
    const sortedSolves = getSortedLastSolve(count);
    const ids = sortedSolves.map((i) => i.id);
    isFetching = true;
    const response = await (await fetch(`/api/solve`, {
      method: "DELETE",
      body: JSON.stringify({ ids })
    })).json();
    isFetching = false;
    if (response.success === true) {
      deleteSolvesMany(ids);
      deleteLastModalOpen = false;
    }
  }
  async function changeCubeType(type) {
    setCubeType(type);
  }
  function newScramble() {
    if (currentScramble) {
      scramble = currentScramble;
    } else {
      scramble = generateScramble($cubeType);
    }
    currentScramble = null;
  }
  async function createCustomSolve() {
    if (!customTime || isFetching) {
      customTime = void 0;
      isCustomTimeModalOpen = false;
      return;
    }
    const time2 = formatCustomTime(customTime);
    if (!time2) {
      customTime = void 0;
      isCustomTimeModalOpen = false;
      return;
    }
    const result = await createSolve(time2, scramble);
    if (result) {
      newScramble();
      timerText = displayTime(formatCustomTime(customTime) || 0);
      customTime = void 0;
      isCustomTimeModalOpen = false;
    }
  }
  async function updateEnteringTime(value) {
    const response = await fetch("/api/settings", {
      method: "PUT",
      body: JSON.stringify({ enteringTimes: value })
    });
    const data = await response.json();
    if (data.settings) {
      setSettings(data.settings);
    }
  }
  function eventUp() {
    clearTimeout(timeOutRef);
    clearTimeout(inspectionWaitRef);
    if (state === "ready") {
      startTime();
      updateState("running");
    } else if ($settings.useWcaInspection !== "Never" && state === "inspectionReady") {
      startInspection();
      updateState("inspection");
    } else if (state === "waiting" && checkInspection()) {
      updateState("inspection");
    } else if (state !== "stopping") {
      updateState("stopped");
    }
  }
  function checkInspection() {
    return $settings.useWcaInspection === "Always" || $settings.useWcaInspection === "ExceptBLD" && !bldTypes.includes($cubeType);
  }
  function eventDown(isTouch = false) {
    const freezeTime = isTouch && $settings.freezeTime === 0 ? 300 : $settings.freezeTime;
    function setReady() {
      updateState("waiting");
      timeOutRef = setTimeout(
        () => {
          updateState("ready");
        },
        freezeTime
      );
    }
    function setInspectionReady() {
      if (isTouch) {
        updateState("inspectionWaiting");
        inspectionWaitRef = setTimeout(
          () => {
            updateState("inspectionReady");
          },
          300
        );
      } else {
        updateState("inspectionReady");
      }
    }
    if (state === "stopped") {
      if (checkInspection()) {
        setInspectionReady();
      } else {
        setReady();
      }
    } else if (state === "inspection") {
      setReady();
    } else if (state === "running") {
      stopTime();
      updateState("stopping");
      setTimeout(
        () => {
          updateState("stopped");
        },
        300
      );
    }
  }
  async function connectBluetoothTimer() {
    const { connectGanTimer } = await import("gan-web-bluetooth");
    ganTimer.set(await connectGanTimer());
    if ($ganTimer) {
      timerText = `${displayTime((await $ganTimer.getRecordedTimes()).displayTime.asTimestamp)}`;
      $ganTimer.events$.subscribe(handleGanTimerEvent);
      await updateEnteringTime("Bluetooth");
    }
  }
  function updateState(input) {
    state = input;
  }
  onDestroy(() => {
  });
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    textColor = setTextColor(state);
    props = {
      scramble,
      textColor,
      nextStatus: nextStatus === "8sec" && state === "inspection" ? "8 sec" : nextStatus === "12sec" && state === "inspection" ? "12sec" : ""
    };
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1tmhc83_START -->${$$result.title = `<title>Хугацаа хэмжигч</title>`, ""}<!-- HEAD_svelte-1tmhc83_END -->`, ""} <div class="hidden md:block">${validate_component(Desktop, "Desktop").$$render(
      $$result,
      Object_1.assign({}, props, { timerText }, { changeCubeType }, { newScramble }, { eventDown }, { eventUp }, { connectBluetoothTimer }, { createSolve }, { timerContainer: desktopTimerEL }, { scrambleContainer: desktopScrambleEl }),
      {
        timerContainer: ($$value) => {
          desktopTimerEL = $$value;
          $$settled = false;
        },
        scrambleContainer: ($$value) => {
          desktopScrambleEl = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="block md:hidden">${validate_component(Mobile, "Mobile").$$render(
      $$result,
      Object_1.assign({}, props, { timerText }, { timerEl: mobileTimerEl }, { scrambleEl: mobileScrambleEl }),
      {
        timerText: ($$value) => {
          timerText = $$value;
          $$settled = false;
        },
        timerEl: ($$value) => {
          mobileTimerEl = $$value;
          $$settled = false;
        },
        scrambleEl: ($$value) => {
          mobileScrambleEl = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        okFunction: () => deleteLastSolve(deleteCount),
        isOpen: deleteLastModalOpen
      },
      {
        isOpen: ($$value) => {
          deleteLastModalOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<p class="text-lg text-primary" data-svelte-h="svelte-1uycsls">Сүүлийн хэдэн эвлүүлэлтийг устгах уу?</p> <input class="mt-2 w-full rounded-lg bg-secondary p-2 pl-3 text-lg text-white" type="text"${add_attribute("value", deleteCount, 0)}>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        okFunction: removeSolves,
        isOpen: deleteAllModalOpen
      },
      {
        isOpen: ($$value) => {
          deleteAllModalOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<p class="text-lg text-primary" data-svelte-h="svelte-1fq1mue">Энэ session-ийн эвлүүлэлтүүдийг устгах уу?</p>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        okFunction: createCustomSolve,
        mode: "create",
        isOpen: isCustomTimeModalOpen
      },
      {
        isOpen: ($$value) => {
          isCustomTimeModalOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<p class="text-lg text-primary" data-svelte-h="svelte-pkre0k">Эвлүүлэлтийн хугацаа</p> <input class="mt-2 w-full rounded-lg bg-secondary p-2 pl-3 text-lg text-white" type="string" inputmode="numeric"${add_attribute("value", customTime, 0)}${add_attribute("this", customTimeRef, 0)}>`;
        }
      }
    )} <div${add_attribute("class", `${"hidden"} absolute top-1/2 left-1/2 w-64 -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-primary`, 0)}><ul class="max-h-64 overflow-y-auto rounded-xl bg-white">${each(cubeTypes, (type) => {
      return `<li class="border-b border-secondary py-3 last:border-none"><button class="w-full">${escape(cubeTypeMapper[type])}</button> </li>`;
    })}</ul> <button class="mt-2 w-full rounded-xl bg-white py-3" data-svelte-h="svelte-gy9zvh">Cancel</button></div> <div${add_attribute("class", `${"hidden"} absolute top-1/2 left-1/2 w-64 -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-primary`, 0)}><ul class="max-h-64 overflow-y-auto rounded-xl bg-white"><li class="border-b border-secondary py-3"><button class="w-full" data-svelte-h="svelte-oibyxe">+2</button></li> <li class="border-b border-secondary py-3"><button class="w-full" data-svelte-h="svelte-1o86gm5">DNF</button></li> <li class="border-b border-secondary py-3"><button class="w-full" data-svelte-h="svelte-1wb1wst">OK</button></li> <li class="py-3"><button class="w-full" data-svelte-h="svelte-s0rtl7">Gan Timer</button></li></ul> <button class="mt-2 w-full rounded-xl bg-white py-3" data-svelte-h="svelte-zcony9">Cancel</button></div>`;
  } while (!$$settled);
  $$unsubscribe_ganTimer();
  $$unsubscribe_settings();
  $$unsubscribe_cubeType();
  $$unsubscribe_session();
  $$unsubscribe_solves();
  $$unsubscribe_sortMode();
  return $$rendered;
});
export {
  Page as default
};
