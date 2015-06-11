var requirejs, require, define;
(function(global) {
    // requirejs深入学习
    var req, s, head, baseElement, dataMain, src,
        interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = '2.1.16',
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
    //PS3 indicates loaded and complete, but need to wait for complete
    //specifically. Sequence is 'loading', 'loaded', execution,
    // then 'complete'. The UA check is unfortunate, but not sure how
    //to feature test w/o causing perf issues.
        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
            /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',
    //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    // test

    var arr = [];
    var arr1 = ['1'];
    var fn = function () {
    };
    var testarr = new Array();
    console.log("[] type is Array?" + isArray(arr));
    console.log(Object.prototype.toString.call(arr));
    console.log(Object.prototype.toString.call(testarr));
    console.log(arr.toString === '[object Array');
    console.log("[1] type is Array?" + isArray(arr1));
    console.log("fn type is Function?" + isFunction(fn));

    // 上述测试可知，直接console.log(arr.toString==='[object Array');是得不到想要的结果的
    /*
     源代码部分
     */

    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    // 测试
    var arr = [1, 3, 5, 8];
    // var func=function(item,index,array){};
    each(arr, function (item, index, array) {
        console.log(item);
        console.log(index);
        console.log(arr);
        // return true;
    });
    /*
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */

    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    // 同each一样，只是迭代数组的顺序反过来，不赘述
    // 源代码 很简单，以后判断是否存在某个属性就用这种方式
    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    // 源代码
    // 获取对象属性值
    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop]; //原来这么写不是返回bool值而是返回obj[prop]的值
        // 相当于
        // return hasProp(obj,prop)?obj[prop]:false;
    }

    // 源代码
    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    // test
    var test = {
        tt: "mytest"
    };
    console.log(hasProp(test, "tt"));
    console.log(getOwn(test, "tt"));

    //源代码
    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === 'object' && value && !isArray(value) && !isFunction(value) && !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    // test
    var source = {
        "1": 1,
        "2": 2
    }
    var target = {
        "1": 3,
        "3": 4
    }
    console.log(mixin(target, source, false, true));

    // deepStringMixin模式,即深层替换，自己体会
    var source = {
        "1": 1,
        "2": 2,
        "5": {
            "6": 6,
            "7": 7
        }
    }
    var target = {
        "1": 3,
        "3": 4,
        "5": {
            "8": 8
        }
    }
    console.log(mixin(target, source, true, true));


    // 源代码
    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    // test 一般obj为this获取其他函数的上下文，获取另一个函数的方法调用
    var fn = function (a, b) {
        return a + b;
    }
    var bd = bind(this, fn);
    console.log(bd(1, 2));


    // 源代码
    function scripts() {
        return document.getElementsByTagName('script');
    }

    // test 获取所有script标签,
    console.log(scripts());


    // 源代码 抛错~~~
    function defaultOnError(err) {
        throw err;
    }


    // 源代码
    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    // test 出问题了，没有global对象？我只知道Node里面是有这个对象的，目前global还未定义，待测试
    var test = "a.b.c";
    // console.log(getGlobal(test));


    // 源代码
    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    // 返回一个封装过的错误
    console.log(makeError("test", "test error", "TEST ERROR", "testLeeBox"));


    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite an existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }
}(this))