describe "view", ->
  CanvasTestView = require "canvas-test-view"
  view = null
  
  moveCircleCode = ->
  moveCircleTest = 
    name: "moveCircle"
    description: "Move circle"
    code: moveCircleCode

  testsFixture =  [
    moveCircleTest
  ,
    name: "redraw"
    description: "redraw"
    code: ->
  ]

  beforeEach ->
    htmlFixture = $("#htmlFixture").contents()
    CanvasTestView.prototype.dom = (selector) ->
      htmlFixture.find(selector)
    view = new CanvasTestView()


  it "should have a canvas element", ->
    expect(view.dom("#canvas").length).toBe 1

  it "should have a canvasEl and a canvas context", ->
    canvas = view.dom("#canvas")[0]
    expect(view.canvas).toBe(canvas)
    ctx = canvas.getContext('2d') 
    expect(view.ctx).toBe(ctx)

  it "should have the tests el", ->
    expect(view.testsEl.length).toBe(1)

  it "should show a list of tests", ->
    view.populateTests(testsFixture)
    expect(view.dom("#moveCircle a").text()).toBe("Move circle")
    expect(view.dom("#redraw a").text()).toBe("redraw")

  it "should trigger a new test when you click on the test item", ->
    spyOn(view, "trigger")
    spyOn(view.ctx, "save")
    view.populateTests(testsFixture)
    view.dom("#moveCircle").click()
    expect(view.ctx.save).toHaveBeenCalled()
    expect(view.trigger).toHaveBeenCalledWith("test", moveCircleTest)

  it "should clear the canvas", ->
    spyOn view.ctx, "clearRect"
    spyOn view.ctx, "restore"
    view.clearCanvas()
    expect(view.ctx.clearRect).toHaveBeenCalledWith(0, 0, 320, 320)
    expect(view.ctx.restore).toHaveBeenCalledWith()

  it "should update the results", ->
    view.updateResults moveCircleTest, 60
    expect(view.dom("#moveCircle .results").text()).toBe("60 fps")


    
