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
        this.createEl = __bind(this.createEl, this);
        this.dom = __bind(this.dom, this);        this.testsEl = this.dom("#tests");
      }
      CanvasTestView.prototype.dom = function(selector) {
        return $(selector);
      };
      CanvasTestView.prototype.createEl = function(code) {
        return $(code);
      };
      CanvasTestView.prototype.makeTestItem = function(caption, name) {
        var testItem;
        testItem = this.createEl("<div>\n  <a id=\"" + name + "\" href=\"#" + name + "\">" + caption + "</a>\n</div>");
        return testItem.bind("click", __bind(function() {
          return this.trigger("test", name);
        }, this));
      };
      CanvasTestView.prototype.populateTests = function(tests) {
        this.testsEl.empty();
        return _.each(tests, __bind(function(caption, name) {
          var newItem;
          newItem = this.makeTestItem(caption, name);
          return this.testsEl.append(newItem);
        }, this));
      };
      return CanvasTestView;
    })();
  });
}).call(this);
