define "canvas-test-view", () ->
  class CanvasTestView extends Backbone.View
    constructor: ->
      @testsEl = @dom("#tests")
      @canvasEl = @dom("#canvas")
      @canvas = @canvasEl[0]
      @ctx = @canvas.getContext '2d'

    dom: (selector) => $ selector
    createEl: (code) => $ code
    updateResults: (test, fps) =>
      @dom("#" + test.name).find(".results").text fps + " fps"

    clearCanvas: => 
      @ctx.clearRect(0, 0, 320, 320)
      @ctx.restore()
    makeTestItem: (test) =>
      testItem = @createEl """
          <div id="#{test.name}">
            <a href="##{name}">#{test.description}</a>
            <span class="results"></span>
          </div>
      """
      testItem.bind "click", (e) =>
        e.preventDefault()
        @ctx.save()
        @trigger "test", test
    populateTests: (tests) ->
      @testsEl.empty() 
      _.each tests, (test) =>
        newItem = @makeTestItem test
        @testsEl.append newItem
        
