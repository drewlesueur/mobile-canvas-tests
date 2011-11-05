describe "presenter", ->
  CanvasTestPresenter = require "canvas-test-presenter"
  app = null
  view = null

  beforeEach ->
    app = new CanvasTestPresenter()
    view = app.view

  it "should instantiate the view", ->
    expect(app.view).toBeTruthy()
    
  it "should populateTests on the view", ->
    spyOn(app.view, "populateTests")
    codeFunc = ->
    testsFixture = [
      description: "a cool test"
      code: codeFunc
    ]
    app.populateTests(testsFixture)
    expect(app.view.populateTests).toHaveBeenCalledWith([
      name: "a_cool_test"
      description: "a cool test"
      code: codeFunc
    ])

  it "should listen for tests to be ran and run them", ->
    fakeTest =
      description: "fakeTest"
      name: "fakeTest"
      code: () ->
    
    spyOn(fakeTest, "code")
    spyOn(app.view, "clearCanvas")
    app.view.trigger "test", fakeTest
    expect(app.view.clearCanvas).toHaveBeenCalled()
    false and expect(fakeTest.code).toHaveBeenCalledWith(
      app.view.canvas, app.view.ctx
    )
    expect(fakeTest.code).toHaveBeenCalledWith(
      view.canvas, view.ctx, app.interval, app.stop
    )
    expect(app.currentTest).toBe(fakeTest)

  it "should have an interval function", () ->
    fakeTimer = new jasmine.FakeTimer()
    window.setInterval = (func, time) ->
      fakeTimer.setInterval(func, time)
    window.clearInterval = (interval) ->
      fakeTimer.clearInterval(interval)
    console.log(fakeTimer)
    app.time = () ->
      fakeTimer.nowMillis

    x = 0
    app.interval -> x+=2
    expect(app.startTime).toBe(0)
    fakeTimer.tick(16)
    expect(x).toBe(2)
    expect(app.frameCount).toBe(1)
    fakeTimer.tick(16)
    expect(x).toBe(4)
    expect(app.frameCount).toBe(2)

    spyOn(window, "setInterval").andReturn("xx")
    spyOn(window, "clearInterval")
    spyOn(view, "updateResults")
    app.currentTest = name: "yoyo"
    app.stop()
    expect(window.clearInterval).toHaveBeenCalledWith(app._interval)
    expect(app.endTime).toBe(32)
    expect(view.updateResults).toHaveBeenCalledWith(app.currentTest, 62.5)




  it "should have a stop function", () ->


     
