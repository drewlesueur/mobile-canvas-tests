(function() {
  var drews;
  drews = require("drews-mixins");
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
        name: "move_2_rectangles",
        description: "move 2 rectangles",
        code: function(canvas, ctx, interval, stop) {
          var x, y;
          ctx.fillStyle = "black";
          x = 0;
          y = 0;
          interval(function() {
            x += 1;
            ctx.fillRect(x, y, 20, 20);
            return ctx.fillRect(x, y + 50, 20, 20);
          });
          return setTimeout(stop, 2000);
        }
      }, {
        description: "move big rectangles",
        code: function(canvas, ctx, interval, stop) {
          var x, y;
          ctx.fillStyle = "red";
          x = 0;
          y = 0;
          interval(function() {
            x += 1;
            return ctx.fillRect(x, y, 100, 100);
          });
          return setTimeout(stop, 2000);
        }
      }, {
        description: "many rectangles with color",
        code: function(canvas, ctx, interval, stop) {
          var numberOfRects;
          ctx.fillStyle = "red";
          numberOfRects = 30;
          interval(function() {
            var i, x, y, _results;
            _results = [];
            for (i = 0; 0 <= numberOfRects ? i <= numberOfRects : i >= numberOfRects; 0 <= numberOfRects ? i++ : i--) {
              x = drews.rnd(0, 320);
              y = drews.rnd(0, 320);
              _results.push(ctx.fillRect(x, y, 10, 10));
            }
            return _results;
          });
          return setTimeout(stop, 2000);
        }
      }
    ];
  });
}).call(this);
