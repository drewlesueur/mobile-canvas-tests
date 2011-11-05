(function() {
  describe("presenter", function() {
    var CanvasTestPresenter, app, view;
    CanvasTestPresenter = require("canvas-test-presenter");
    app = null;
    view = null;
    beforeEach(function() {
      app = new CanvasTestPresenter();
      return view = app.view;
    });
    it("should instantiate the view", function() {
      return expect(app.view).toBeTruthy();
    });
    it("should populateTests on the view", function() {
      var testsFixture;
      spyOn(app.view, "populateTests");
      testsFixture = [];
      app.populateTests(testsFixture);
      return expect(app.view.populateTests).toHaveBeenCalledWith(testsFixture);
    });
    it("should listen for tests to be ran and run them", function() {
      var fakeTest;
      fakeTest = {
        description: "fakeTest",
        name: "fakeTest",
        code: function() {}
      };
      spyOn(fakeTest, "code");
      spyOn(app.view, "clearCanvas");
      app.view.trigger("test", fakeTest);
      expect(app.view.clearCanvas).toHaveBeenCalled();
      false && expect(fakeTest.code).toHaveBeenCalledWith(app.view.canvas, app.view.ctx);
      expect(fakeTest.code).toHaveBeenCalledWith(view.canvas, view.ctx, app.interval, app.stop);
      return expect(app.currentTest).toBe(fakeTest);
    });
    it("should have an interval function", function() {
      var fakeTimer, x;
      fakeTimer = new jasmine.FakeTimer();
      window.setInterval = function(func, time) {
        return fakeTimer.setInterval(func, time);
      };
      window.clearInterval = function(interval) {
        return fakeTimer.clearInterval(interval);
      };
      console.log(fakeTimer);
      app.time = function() {
        return fakeTimer.nowMillis;
      };
      x = 0;
      app.interval(function() {
        return x += 2;
      });
      expect(app.startTime).toBe(0);
      fakeTimer.tick(16);
      expect(x).toBe(2);
      expect(app.frameCount).toBe(1);
      fakeTimer.tick(16);
      expect(x).toBe(4);
      expect(app.frameCount).toBe(2);
      spyOn(window, "setInterval").andReturn("xx");
      spyOn(window, "clearInterval");
      spyOn(view, "updateResults");
      app.currentTest = {
        name: "yoyo"
      };
      app.stop();
      expect(window.clearInterval).toHaveBeenCalledWith(app._interval);
      expect(app.endTime).toBe(32);
      return expect(view.updateResults).toHaveBeenCalledWith(app.currentTest, 62.5);
    });
    return it("should have a stop function", function() {});
  });
}).call(this);
