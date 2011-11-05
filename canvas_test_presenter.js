(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define("canvas-test-presenter", function() {
    var CanvasTestPresenter, CanvasTestView;
    CanvasTestView = require("canvas-test-view");
    return CanvasTestPresenter = (function() {
      __extends(CanvasTestPresenter, Presenter);
      function CanvasTestPresenter() {
        this.applyBindings = __bind(this.applyBindings, this);
        this.populateTests = __bind(this.populateTests, this);
        this.stop = __bind(this.stop, this);
        this.interval = __bind(this.interval, this);        this.view = new CanvasTestView();
        this.applyBindings();
      }
      CanvasTestPresenter.prototype.time = function() {
        return new Date().getTime();
      };
      CanvasTestPresenter.prototype.interval = function(func) {
        var myFunc;
        this.frameCount = 0;
        this.startTime = this.time();
        myFunc = __bind(function() {
          func();
          return this.frameCount += 1;
        }, this);
        return this._interval = setInterval(myFunc, 16);
      };
      CanvasTestPresenter.prototype.stop = function() {
        var fps, seconds;
        this.endTime = this.time();
        clearInterval(this._interval);
        seconds = (this.endTime - this.startTime) / 1000;
        fps = this.frameCount / seconds;
        return this.view.updateResults(this.currentTest, fps);
      };
      CanvasTestPresenter.prototype.populateTests = function(tests) {
        _.each(tests, function(test, index) {
          var _base;
          return (_base = tests[index]).name || (_base.name = test.description.replace(/\s/g, "_"));
        });
        return this.view.populateTests(tests);
      };
      CanvasTestPresenter.prototype.applyBindings = function() {
        return this.view.bind("test", __bind(function(test) {
          this.view.clearCanvas();
          this.currentTest = test;
          return test.code(this.view.canvas, this.view.ctx, this.interval, this.stop);
        }, this));
      };
      return CanvasTestPresenter;
    })();
  });
}).call(this);
