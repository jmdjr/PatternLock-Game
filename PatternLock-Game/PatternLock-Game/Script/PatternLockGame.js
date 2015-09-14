define(['game/DeviceScreen', 'game/GameButtonFactory', 'game/TouchScreenDisplayManager'], function (device, buttonFactory, touchScreen) {
    var game = new Phaser.Game(308, 492, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

    function preload() {
        device.preload(game);
        buttonFactory.preload(game);
        touchScreen.preload(game);
    }

    function create() {
        device.create(game);

        //var test1 = new buttonFactory.button(game, 1, 1, 0, 0);
        //var test2 = new buttonFactory.button(game, 2, 1, 0, 0);

        //test1.onInputDown(function () {
        //    this.Ping();
        //});

        //game.add.existing(test1);
        //game.add.existing(test2);
    }

    function update() {
        device.update(game);
    }

    function render() {
        //touchscreen.render(game);
    }
});


