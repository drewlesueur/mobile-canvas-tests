drews = require "drews-mixins"
define "canvas-tests", ->
  [
    name: "moverectangle"
    description: "move rectangle"
    code: (canvas, ctx, interval, stop) ->
      ctx.fillStyle = "black"
      x = 0
      y = 0
      interval () ->
        x += 1
        ctx.fillRect x, y, 20, 20
        #ctx.clearRect 0, 0, 320, 320
      setTimeout stop, 2000
   ,
    name: "move_2_rectangles"
    description: "move 2 rectangles"
    code: (canvas, ctx, interval, stop) ->
      ctx.fillStyle = "black"
      x = 0
      y = 0
      interval () ->
        x += 1
        ctx.fillRect x, y, 20, 20
        ctx.fillRect x, y+50, 20, 20
        #ctx.clearRect 0, 0, 320, 320
      setTimeout stop, 2000
  ,
    description: "move big rectangles"
    code: (canvas, ctx, interval, stop) ->
      ctx.fillStyle = "red"
      x = 0
      y = 0
      interval () ->
        x += 1
        ctx.fillRect x, y, 100, 100
      setTimeout stop, 2000
  ,
    description: "many rectangles with color"
    code: (canvas, ctx, interval, stop) ->
      ctx.fillStyle = "red"
      numberOfRects = 30
      interval () ->
        for i in [0..numberOfRects]
          x = drews.rnd(0,320)
          y = drews.rnd(0,320)
          ctx.fillRect x, y, 10, 10
      setTimeout stop, 2000

  ]
