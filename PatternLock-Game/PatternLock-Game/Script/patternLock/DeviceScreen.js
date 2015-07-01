
//*******************************************************************************************************************************************************
//                   Game Resources - DeviceScreenManager
//*******************************************************************************************************************************************************
// The Device Screen Manager deals with rendering the main game display, such as the border box, and acts as the device, loading Touch Screen Displays
// into the device layers.

define(['game/TouchScreenDisplayManager'], function (touchScreen) {
    return {
        info: {
            screenFrame: {
                ref: null,
                key: 'frame',
                src: 'Resources/cellphone.png',
            },

            height: 492,
            width: 308,
            top: 69,
            left: 27,
            bottom: 393,
            right: 283
        },

        _background: null,
        _midground: null,
        _forground: null,

        preload: function (game) {
            game.load.image(this.info.screenFrame.key, this.info.screenFrame.src);
        },

        create: function (game) {
            this._background = game.add.group();
            this._midground = game.add.group();
            this._forground = game.add.group();

            this._drawBaseGraphics(game);

            touchScreen.create(game);
            this._midground.add(touchScreen.getDisplay());
        },

        _drawBaseGraphics: function (game) {
            this.info.screenFrame.ref = game.add.sprite(0, 0, this.info.screenFrame.key, this.info.screenFrame.src);
            this._forground.add(this.info.screenFrame.ref);
        },

        update: function (game) {
            touchScreen.update(game);
        }
    }
});