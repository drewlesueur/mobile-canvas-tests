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
    name: "move rectangle2"
    description: "move circle2"
    code: (canvas, ctx) ->
      ctx.fillStyle = "red"
      ctx.fillRect(10,10, 20, 20)
  
  
  ]
