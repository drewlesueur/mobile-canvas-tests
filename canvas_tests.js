(function() {
  define("canvas-tests", function() {
    return [
      {
        name: "moverectangle",
        description: "move rectangle",
        code: function(canvas, ctx, interval, stop) {
          var x, y;
          ctx.fillStyle = "black";
          x = 0;
          y = 0;
          interval(function() {
            x += 1;
            return ctx.fillRect(x, y, 20, 20);
          });
          return setTimeout(stop, 2000);
        }
      }, {
        name: "move rectangle2",
        description: "move circle2",
        code: function(canvas, ctx) {
          ctx.fillStyle = "red";
          return ctx.fillRect(10, 10, 20, 20);
        }
      }
    ];
  });
}).call(this);
