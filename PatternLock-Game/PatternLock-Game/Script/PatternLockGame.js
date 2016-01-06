define(['game/DeviceScreen', 'game/GameButtonFactory', 'game/TouchScreenDisplayManager', 'control/DrawingControl'], function (device, buttonFactory, touchScreen, drawCont) {
    var game = new Phaser.Game(308, 492, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    var controller = null;
    var testLine = null;
    var testLineSprite = null;
    var tGroup = null;
    var isClear = true;

    function preload() {
        device.preload(game);
        buttonFactory.preload(game);
        touchScreen.preload(game);
    }

    function create() {
        device.create(game);
        touchScreen.create(game);

        //controller = drawCont.LineGroupControl(game, { x: 0, y: 0 });
        //controller.createLine();

        ////game.input.addMoveCallback(drawLine, this);

        //tGroup = game.add.group();
        //tGroup.addChild(controller.getGroup());

    }

    function update() {
        device.update(game);
        //var last = controller.points[controller.points.length - 1];
        //var point = { x: game.input.activePointer.position.x, y: game.input.activePointer.position.y };

        //if (game.input.activePointer.isDown) {
        //    isClear = false;
        //    controller.update(point);
        //}

        //if (game.input.activePointer.isUp && !isClear) {
        //    controller.createLine();
        //    controller.saveLine(point);
        //    isClear = true;
        //}
    }


    //function drawLine(pointer, x, y) {
    //    if (pointer.isDown) {
    //        controller.update({ x: x, y: y });
    //    }
    //}
});


