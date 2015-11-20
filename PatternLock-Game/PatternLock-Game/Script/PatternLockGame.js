define(['game/DeviceScreen', 'game/GameButtonFactory', 'game/TouchScreenDisplayManager', 'control/DrawingControl'], function (device, buttonFactory, touchScreen, drawCont) {
    var game = new Phaser.Game(308, 492, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
    var controller = null;
    var tGroup = null;
    function preload() {
        device.preload(game);
        buttonFactory.preload(game);
        touchScreen.preload(game);
    }

    function create() {
        //device.create(game);
        //touchScreen.create(game);

        controller = drawCont.GeneratePathController(game, { x: 0, y: 0 });
        controller.addPoint({ x: 10, y: 10 });

        tGroup = game.add.group();
        tGroup.addChild(controller.getSprite());
    }

    function update() {
        //device.update(game);
        var last = controller.points[controller.points.length - 1];

        controller.addPoint({ x: last.x + 1, y: last.y + 1 });
    }

    function render() {
        //touchScreen.render(game);
    }
});


