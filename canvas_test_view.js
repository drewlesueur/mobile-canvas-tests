(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define("canvas-test-view", function() {
    var CanvasTestView;
    return CanvasTestView = (function() {
      __extends(CanvasTestView, Backbone.View);
      function CanvasTestView() {
        this.makeTestItem = __bind(this.makeTestItem, this);
        this.clearCanvas = __bind(this.clearCanvas, this);
        this.updateResults = __bind(this.updateResults, this);
        this.createEl = __bind(this.createEl, this);
        this.dom = __bind(this.dom, this);        this.testsEl = this.dom("#tests");
        this.canvasEl = this.dom("#canvas");
        this.canvas = this.canvasEl[0];
        this.ctx = this.canvas.getContext('2d');
      }
      CanvasTestView.prototype.dom = function(selector) {
        return $(selector);
      };
      CanvasTestView.prototype.createEl = function(code) {
        return $(code);
      };
      CanvasTestView.prototype.updateResults = function(test, fps) {
        return this.dom("#" + test.name).find(".results").text(fps + " fps");
      };
      CanvasTestView.prototype.clearCanvas = function() {
        this.ctx.clearRect(0, 0, 320, 320);
        return this.ctx.restore();
      };
      CanvasTestView.prototype.makeTestItem = function(test) {
        var testItem;
        testItem = this.createEl("<div id=\"" + test.name + "\">\n  <a href=\"#" + name + "\">" + test.description + "</a>\n  <span class=\"results\"></span>\n</div>");
        return testItem.bind("click", __bind(function(e) {
          e.preventDefault();
          this.ctx.save();
          return this.trigger("test", test);
        }, this));
      };
      CanvasTestView.prototype.populateTests = function(tests) {
        this.testsEl.empty();
        return _.each(tests, __bind(function(test) {
          var newItem;
          newItem = this.makeTestItem(test);
          return this.testsEl.append(newItem);
        }, this));
      };
      return CanvasTestView;
    })();
  });
}).call(this);
