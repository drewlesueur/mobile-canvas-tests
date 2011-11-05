(function() {
  describe("view", function() {
    var CanvasTestView, moveCircleCode, moveCircleTest, testsFixture, view;
    CanvasTestView = require("canvas-test-view");
    view = null;
    moveCircleCode = function() {};
    moveCircleTest = {
      name: "moveCircle",
      description: "Move circle",
      code: moveCircleCode
    };
    testsFixture = [
      moveCircleTest, {
        name: "redraw",
        description: "redraw",
        code: function() {}
      }
    ];
    beforeEach(function() {
      var htmlFixture;
      htmlFixture = $("#htmlFixture").contents();
      CanvasTestView.prototype.dom = function(selector) {
        return htmlFixture.find(selector);
      };
      return view = new CanvasTestView();
    });
    it("should have a canvas element", function() {
      return expect(view.dom("#canvas").length).toBe(1);
    });
    it("should have a canvasEl and a canvas context", function() {
      var canvas, ctx;
      canvas = view.dom("#canvas")[0];
      expect(view.canvas).toBe(canvas);
      ctx = canvas.getContext('2d');
      return expect(view.ctx).toBe(ctx);
    });
    it("should have the tests el", function() {
      return expect(view.testsEl.length).toBe(1);
    });
    it("should show a list of tests", function() {
      view.populateTests(testsFixture);
      expect(view.dom("#moveCircle a").text()).toBe("Move circle");
      return expect(view.dom("#redraw a").text()).toBe("redraw");
    });
    it("should trigger a new test when you click on the test item", function() {
      spyOn(view, "trigger");
      spyOn(view.ctx, "save");
      view.populateTests(testsFixture);
      view.dom("#moveCircle").click();
      expect(view.ctx.save).toHaveBeenCalled();
      return expect(view.trigger).toHaveBeenCalledWith("test", moveCircleTest);
    });
    it("should clear the canvas", function() {
      spyOn(view.ctx, "clearRect");
      spyOn(view.ctx, "restore");
      view.clearCanvas();
      expect(view.ctx.clearRect).toHaveBeenCalledWith(0, 0, 320, 320);
      return expect(view.ctx.restore).toHaveBeenCalledWith();
    });
    return it("should update the results", function() {
      view.updateResults(moveCircleTest, 60);
      return expect(view.dom("#moveCircle .results").text()).toBe("60 fps");
    });
  });
}).call(this);
