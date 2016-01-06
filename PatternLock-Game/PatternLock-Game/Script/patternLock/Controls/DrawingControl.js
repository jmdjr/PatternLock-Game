// used to draw some basic game elements.
// color control

define(function () {
    return {
        DefaultLine: {
            color: "rgba(100, 100, 100, 0.75)",
            width: "5"
        },

        DrawLine: function (bitmapData, pointA, pointB, lineDetails) {
            bitmapData.clear();
            bitmapData.ctx.beginPath();
            bitmapData.ctx.beginPath();
            bitmapData.ctx.moveTo(pointA.x, pointA.y);
            bitmapData.ctx.lineTo(pointB.x, pointB.y);
            bitmapData.ctx.lineWidth = lineDetails.width;
            bitmapData.ctx.strokeStyle = lineDetails.color;
            bitmapData.ctx.stroke();
            bitmapData.ctx.closePath();
            bitmapData.render();
        },

        LineGroupControl: function (game, start, line) {
            // second attempt at drawing line controller.
            // returns an object with referencable sprite group of lines.
            // lines will be indexed, and kept in seperate sprites for speed purposes (no redrawing a line unless needed)
            
            var _line = $.extend({}, this.DefaultLine, line);
            var spriteGroup = game.make.group();
            return {
                lines: [],
                _group: spriteGroup,
                activeLine: null,
                activeBmd: null,
                lastPoint: start,
                drawLine: _line,
                game: game,
                //update will display the line from the last point to the updated point.
                update: function (point) {
                    if (this.activeBmd) {
                        this.activeBmd.clear();
                        this.activeBmd.ctx.beginPath();
                        this.activeBmd.ctx.beginPath();
                        this.activeBmd.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
                        this.activeBmd.ctx.lineTo(point.x, point.y);
                        this.activeBmd.ctx.lineWidth = this.drawLine.width;
                        this.activeBmd.ctx.strokeStyle = this.drawLine.color;
                        this.activeBmd.ctx.stroke();
                        this.activeBmd.ctx.closePath();
                        this.activeBmd.render();
                    }
                },

                // creates a new line, starting from the last point used.
                createLine: function () {
                    this.activeBmd = this.game.add.bitmapData(this.game.width, this.game.height);
                    this.activeBmd.ctx.beginPath();
                    this.activeBmd.ctx.lineWidth = this.drawLine.width;
                    this.activeBmd.ctx.strokeStyle = this.drawLine.color;
                    this.activeBmd.ctx.stroke();
                    this.activeLine = this.game.make.sprite(0, 0, this.activeBmd);
                    this._group.add(this.activeLine);
                },

                // saves the line as a sprite, saving it and updating the last point to the one provided.
                saveLine: function (point) {
                    this.lastPoint = point;
                    this.lines.push(this.activeLine);
                    this.createLine();
                },
                removeLine: function() {
                    this._group.remove(this.activeLine, true);
                },

                getGroup: function () {
                    return this._group;
                }

            }
        },

        
        //Color codes
        ColorArray: {
            "aqua": "#00ffff",
            "aliceblue": "#f0f8ff",
            "antiquewhite": "#faebd7",
            "black": "#000000",
            "blue": "#0000ff",
            "cyan": "#00ffff",
            "darkblue": "#00008b",
            "darkcyan": "#008b8b",
            "darkgreen": "#006400",
            "darkturquoise": "#00ced1",
            "deepskyblue": "#00bfff",
            "green": "#008000",
            "lime": "#00ff00",
            "mediumblue": "#0000cd",
            "mediumspringgreen": "#00fa9a",
            "navy": "#000080",
            "springgreen": "#00ff7f",
            "teal": "#008080",
            "midnightblue": "#191970",
            "dodgerblue": "#1e90ff",
            "lightseagreen": "#20b2aa",
            "forestgreen": "#228b22",
            "seagreen": "#2e8b57",
            "darkslategray": "#2f4f4f",
            "darkslategrey": "#2f4f4f",
            "limegreen": "#32cd32",
            "mediumseagreen": "#3cb371",
            "turquoise": "#40e0d0",
            "royalblue": "#4169e1",
            "steelblue": "#4682b4",
            "darkslateblue": "#483d8b",
            "mediumturquoise": "#48d1cc",
            "indigo": "#4b0082",
            "darkolivegreen": "#556b2f",
            "cadetblue": "#5f9ea0",
            "cornflowerblue": "#6495ed",
            "mediumaquamarine": "#66cdaa",
            "dimgray": "#696969",
            "dimgrey": "#696969",
            "slateblue": "#6a5acd",
            "olivedrab": "#6b8e23",
            "slategray": "#708090",
            "slategrey": "#708090",
            "lightslategray": "#778899",
            "lightslategrey": "#778899",
            "mediumslateblue": "#7b68ee",
            "lawngreen": "#7cfc00",
            "aquamarine": "#7fffd4",
            "chartreuse": "#7fff00",
            "gray": "#808080",
            "grey": "#808080",
            "maroon": "#800000",
            "olive": "#808000",
            "purple": "#800080",
            "lightskyblue": "#87cefa",
            "skyblue": "#87ceeb",
            "blueviolet": "#8a2be2",
            "darkmagenta": "#8b008b",
            "darkred": "#8b0000",
            "saddlebrown": "#8b4513",
            "darkseagreen": "#8fbc8f",
            "lightgreen": "#90ee90",
            "mediumpurple": "#9370db",
            "darkviolet": "#9400d3",
            "palegreen": "#98fb98",
            "darkorchid": "#9932cc",
            "yellowgreen": "#9acd32",
            "sienna": "#a0522d",
            "brown": "#a52a2a",
            "darkgray": "#a9a9a9",
            "darkgrey": "#a9a9a9",
            "greenyellow": "#adff2f",
            "lightblue": "#add8e6",
            "paleturquoise": "#afeeee",
            "lightsteelblue": "#b0c4de",
            "powderblue": "#b0e0e6",
            "firebrick": "#b22222",
            "darkgoldenrod": "#b8860b",
            "mediumorchid": "#ba55d3",
            "rosybrown": "#bc8f8f",
            "darkkhaki": "#bdb76b",
            "silver": "#c0c0c0",
            "mediumvioletred": "#c71585",
            "indianred": "#cd5c5c",
            "peru": "#cd853f",
            "chocolate": "#d2691e",
            "tan": "#d2b48c",
            "lightgray": "#d3d3d3",
            "lightgrey": "#d3d3d3",
            "thistle": "#d8bfd8",
            "goldenrod": "#daa520",
            "orchid": "#da70d6",
            "palevioletred": "#db7093",
            "crimson": "#dc143c",
            "gainsboro": "#dcdcdc",
            "plum": "#dda0dd",
            "burlywood": "#deb887",
            "lightcyan": "#e0ffff",
            "lavender": "#e6e6fa",
            "darksalmon": "#e9967a",
            "palegoldenrod": "#eee8aa",
            "violet": "#ee82ee",
            "azure": "#f0ffff",
            "honeydew": "#f0fff0",
            "khaki": "#f0e68c",
            "lightcoral": "#f08080",
            "sandybrown": "#f4a460",
            "beige": "#f5f5dc",
            "mintcream": "#f5fffa",
            "wheat": "#f5deb3",
            "whitesmoke": "#f5f5f5",
            "ghostwhite": "#f8f8ff",
            "lightgoldenrodyellow": "#fafad2",
            "linen": "#faf0e6",
            "salmon": "#fa8072",
            "oldlace": "#fdf5e6",
            "bisque": "#ffe4c4",
            "blanchedalmond": "#ffebcd",
            "coral": "#ff7f50",
            "cornsilk": "#fff8dc",
            "darkorange": "#ff8c00",
            "deeppink": "#ff1493",
            "floralwhite": "#fffaf0",
            "fuchsia": "#ff00ff",
            "gold": "#ffd700",
            "hotpink": "#ff69b4",
            "ivory": "#fffff0",
            "lavenderblush": "#fff0f5",
            "lemonchiffon": "#fffacd",
            "lightpink": "#ffb6c1",
            "lightsalmon": "#ffa07a",
            "lightyellow": "#ffffe0",
            "magenta": "#ff00ff",
            "mistyrose": "#ffe4e1",
            "moccasin": "#ffe4b5",
            "navajowhite": "#ffdead",
            "orange": "#ffa500",
            "orangered": "#ff4500",
            "papayawhip": "#ffefd5",
            "peachpuff": "#ffdab9",
            "pink": "#ffc0cb",
            "red": "#ff0000",
            "seashell": "#fff5ee",
            "snow": "#fffafa",
            "tomato": "#ff6347",
            "white": "#ffffff",
            "yellow": "#ffff00"
},
    }
});

////create the game state
//function DemoState() { }

//DemoState.prototype.preload = function () {
//}

//DemoState.prototype.create = function () {
//    bmd = game.add.bitmapData(600, 300);
//    var color = 'white';

//    bmd.ctx.beginPath();
//    bmd.ctx.lineWidth = "4";
//    bmd.ctx.strokeStyle = color;
//    bmd.ctx.stroke();
//    sprite = game.add.sprite(0, 0, bmd);
//}

//DemoState.prototype.drawLine = function () {
//    bmd.clear();
//    bmd.ctx.beginPath();
//    bmd.ctx.beginPath();
//    bmd.ctx.moveTo(10, 10);
//    bmd.ctx.lineTo(game.input.x, game.input.y);
//    bmd.ctx.lineWidth = 4;
//    bmd.ctx.stroke();
//    bmd.ctx.closePath();
//    bmd.render();
//    bmd.refreshBuffer();
//};

//DemoState.prototype.update = function () {
//    this.drawLine();
//};

//// Game Bootstrapper
//window.onload = function () {
//    game = new Phaser.Game(600, 300, Phaser.AUTO, 'phaser-demo');
//    // add the game state to the state manager
//    game.state.add('demo', DemoState);
//    // and start the game
//    game.state.start('demo');


//};

//colors = {
    
//}

//colorArray = [];
//function pickRandomProperty(obj) {
//    var result;
//    var count = 0;
//    for (var prop in obj)
//        if (Math.random() < 1 / ++count)
//            result = prop;
//    return result;
//}