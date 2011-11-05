define "canvas-test-presenter", () ->
  CanvasTestView = require "canvas-test-view"
  class CanvasTestPresenter extends Presenter
    constructor: ->
      @view = new CanvasTestView()
      @applyBindings()
    time: () ->
      new Date().getTime()

    interval: (func) =>
      @frameCount = 0
      @startTime = @time()
      myFunc = () =>
        func()
        @frameCount += 1
        

      @_interval = setInterval myFunc, 16
    stop: () =>
      @endTime = @time()
      clearInterval(@_interval)
      seconds = (@endTime - @startTime) / 1000
      
      fps = @frameCount / seconds 
      @view.updateResults @currentTest, fps
      
        
    populateTests: (tests) =>
      _.each tests, (test, index) ->
        tests[index].name ||= test.description.replace(/\s/g, "_")

      @view.populateTests tests

    applyBindings: () =>
      @view.bind "test", (test) =>
        @view.clearCanvas()
        @currentTest = test
        test.code(@view.canvas, @view.ctx, @interval, @stop)

        



