define(['game/DeviceScreen', 'game/GameButtonFactory', 'game/TouchScreenDisplayManager', 'control/DrawingControl'], function (device, buttonFactory, touchScreen, drawCont) {
    var game = new Phaser.Game(308, 492, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
    var controller = null;
    function preload() {
        device.preload(game);
        buttonFactory.preload(game);
        touchScreen.preload(game);
    }

    function create() {
        device.create(game);
        touchScreen.create(game);
        controller = drawCont.GeneratePathController(game, { x: 0, y: 0 });
        controller.addPoint({ x: 10, y: 10 });
    }

    function update() {
        device.update(game);
    }

    function render() {
        touchScreen.render(game);
    }
});


