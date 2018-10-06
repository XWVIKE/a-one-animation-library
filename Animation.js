(function () {

    var updateTime = 1000 / 60;
    var Animation = function (ele) {
        this.ele = ele;
        this.arr = [];
        if (this.ele.indexOf('#') === 0) {
            this.arr.push(document.getElementById(this.ele.slice(1)))
        } else if (this.ele.indexOf('.') === 0) {
            var classDom = document.getElementsByClassName(this.ele);
            for (var i = 0; i < classDom.length; i++) {
                this.arr.push(classDom[i])
            }
        } else {
            var dom = document.getElementsByTagName(this.ele);
            for (var j = 0; j < dom.length; j++) {
                this.arr.push(dom[j])
            }
        }
    };


    window.Animation = Animation;
    var request = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame||function (fn) {
            setTimeout(fn,updateTime)
        },
    _fn = Animation.prototype;
    _fn.each = function (fn) {
        for (var i = 0; i < this.arr.length; i++) {
            fn.call(this, this.arr[i])
        }
        return this;
    };
    _fn.setStyle = function (name, value) {
        this.each(function (el) {
            el.style[name] = value;
        });
        return this;
    };
    _fn.event = function (ev, fn) {
        ev = ev || window.onload;
        this.each(function (el) {
            el.addEventListener(ev, function () {
                fn.call(this)
            })
        });
        return this;
    };


    var pow = Math.pow,
        sqrt = Math.sqrt,
        sin = Math.sin,
        cos = Math.cos,
        PI = Math.PI,
        c1 = 1.70158,
        c2 = c1 * 1.525,
        c3 = c1 + 1,
        c4 = (2 * PI) / 3,
        c5 = (2 * PI) / 4.5;


    function bounceOut(x) {
        var n1 = 7.5625,
            d1 = 2.75;
        if (x < 1 / d1) {
            return n1 * x * x;
        } else if (x < 2 / d1) {
            return n1 * (x -= (1.5 / d1)) * x + .75;
        } else if (x < 2.5 / d1) {
            return n1 * (x -= (2.25 / d1)) * x + .9375;
        } else {
            return n1 * (x -= (2.625 / d1)) * x + .984375;
        }
    }

    easing = {
        easeInQuad: function (x) {
            return x * x;
        },
        easeOutQuad: function (x) {
            return 1 - (1 - x) * (1 - x);
        },
        easeInOutQuad: function (x) {
            return x < 0.5 ?
                2 * x * x :
                1 - pow(-2 * x + 2, 2) / 2;
        },
        easeInCubic: function (x) {
            return x * x * x;
        },
        easeOutCubic: function (x) {
            return 1 - pow(1 - x, 3);
        },
        easeInOutCubic: function (x) {
            return x < 0.5 ?
                4 * x * x * x :
                1 - pow(-2 * x + 2, 3) / 2;
        },
        easeInQuart: function (x) {
            return x * x * x * x;
        },
        easeOutQuart: function (x) {
            return 1 - pow(1 - x, 4);
        },
        easeInOutQuart: function (x) {
            return x < 0.5 ?
                8 * x * x * x * x :
                1 - pow(-2 * x + 2, 4) / 2;
        },
        easeInQuint: function (x) {
            return x * x * x * x * x;
        },
        easeOutQuint: function (x) {
            return 1 - pow(1 - x, 5);
        },
        easeInOutQuint: function (x) {
            return x < 0.5 ?
                16 * x * x * x * x * x :
                1 - pow(-2 * x + 2, 5) / 2;
        },
        easeInSine: function (x) {
            return 1 - cos(x * PI / 2);
        },
        easeOutSine: function (x) {
            return sin(x * PI / 2);
        },
        easeInOutSine: function (x) {
            return -(cos(PI * x) - 1) / 2;
        },
        easeInExpo: function (x) {
            return x === 0 ? 0 : pow(2, 10 * x - 10);
        },
        easeOutExpo: function (x) {
            return x === 1 ? 1 : 1 - pow(2, -10 * x);
        },
        easeInOutExpo: function (x) {
            return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
                pow(2, 20 * x - 10) / 2 :
                (2 - pow(2, -20 * x + 10)) / 2;
        },
        easeInCirc: function (x) {
            return 1 - sqrt(1 - pow(x, 2));
        },
        easeOutCirc: function (x) {
            return sqrt(1 - pow(x - 1, 2));
        },
        easeInOutCirc: function (x) {
            return x < 0.5 ?
                (1 - sqrt(1 - pow(2 * x, 2))) / 2 :
                (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
        },
        easeInElastic: function (x) {
            return x === 0 ? 0 : x === 1 ? 1 :
                -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
        },
        easeOutElastic: function (x) {
            return x === 0 ? 0 : x === 1 ? 1 :
                pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
        },
        easeInOutElastic: function (x) {
            return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
                -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 :
                pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
        },
        easeInBack: function (x) {
            return c3 * x * x * x - c1 * x * x;
        },
        easeOutBack: function (x) {
            return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
        },
        easeInOutBack: function (x) {
            return x < 0.5 ?
                (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 :
                (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
        },
        easeInBounce: function (x) {
            return 1 - bounceOut(1 - x);
        },
        easeOutBounce: bounceOut,
        easeInOutBounce: function (x) {
            return x < 0.5 ?
                (1 - bounceOut(1 - 2 * x)) / 2 :
                (1 + bounceOut(2 * x - 1)) / 2;
        }
    };

    _fn.move = function () {
        this.each(function (el) {
            var ease, distance, time, callback;
            for (var i = 0; i < this.move.arguments.length; i++) {
                if (typeof this.move.arguments[i] === "object") {
                    distance = this.move.arguments[i]
                }
                else if (typeof this.move.arguments[i] === "number") {
                    time = this.move.arguments[i]
                }
                else if (typeof this.move.arguments[i] === "function") {
                    callback = this.move.arguments[i]
                }
                else if (typeof this.move.arguments[i] === "string") {
                    ease = this.move.arguments[i]
                }
            }
            ease = ease || 'easeInQuad';
            distance = distance || [0, 500, 0];
            time = time || 500;
            var start = distance[0], end = distance[1], direction = distance[2] || 0;
            var changeValue = end - start;
            var updateCount = time / updateTime;
            var a = 0, b = 1, c = b / updateCount, temp;
            var pixel = a;

            function step() {
                if (direction === 0) {
                    temp = start + changeValue * easing[ease](pixel);
                    el.style.left = temp + 'px';
                    pixel += c;
                    if (pixel < b) {
                        request(step)
                    } else {
                        setTimeout(callback, 0)
                    }
                } else if (direction === 1) {
                    temp = start + changeValue * easing[ease](pixel);
                    el.style.top = temp + 'px';
                    pixel += c;
                    if (pixel < b) {
                        request(step)
                    } else {
                        setTimeout(callback, 0)
                    }
                }
            }

            request(step);
        });
        return this;
    };
    _fn.changeOpacity = function () {
        this.each(function (el) {
            var distance, ease, time, callback;
            for (var i = 0; i < this.changeOpacity.arguments.length; i++) {
                if (typeof this.changeOpacity.arguments[i] === "object") {
                    distance = this.changeOpacity.arguments[i]
                }
                else if (typeof this.changeOpacity.arguments[i] === "number") {
                    time = this.changeOpacity.arguments[i]
                }
                else if (typeof this.changeOpacity.arguments[i] === "function") {
                    callback = this.changeOpacity.arguments[i]
                }
                else if (typeof this.changeOpacity.arguments[i] === "string") {
                    ease = this.changeOpacity.arguments[i]
                }
            }
            ease = ease || 'easeInQuad';
            distance = distance || [0, 100,'yes'];
            time = time || 500;
            var start = distance[0], end = distance[1],hide = distance[2]||'yes';
            var changeValue = end - start;
            var updateTime = 1000 / 60;
            var updateCount = time / updateTime;
            var a = 0, b = 1, c = b / updateCount, temp;
            var pixel = a;

            function step() {
                temp = start + changeValue * easing[ease](pixel);
                el.style.opacity = temp / 100;
                pixel += c;
                if (temp<0.01&&hide==='yes'){
                    el.style.display = 'none';
                }
                if (start>end?temp>=end:temp<=end) {
                    request(step)
                } else {
                    setTimeout(callback, 0)
                }
            }

            request(step)

        });
        return this
    }
})();