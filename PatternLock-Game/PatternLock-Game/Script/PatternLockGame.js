define(['game/DeviceScreen', 'game/GameButtonFactory', 'game/TouchScreenDisplayManager'], function (device, buttonFactory, touchScreen) {
    var game = new Phaser.Game(308, 492, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    function preload() {
        device.preload(game);
        buttonFactory.preload(game);
        touchScreen.preload(game);
    }

    function create() {
        device.create(game);
    }

    function update() {
        device.update(game);
    }
});


