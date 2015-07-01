//*******************************************************************************************************************************************************
//                   Game Resources - Buttons: Manager for all button related activities.
//*******************************************************************************************************************************************************

define(['phaser'], function () {

    var GameButtonFactory = {
        info: {
            key: 'buttons',
            src: 'Resources/ButtonsSpriteSheet.png',
            height: 34,
            width: 34
        },

        buttonState: {
            Idle: 0,
            Active: 1
        },

        overlayState: {
            Correct: 2,
            Wrong: 3,
            Over: 4,
            Close: 5,
            Under: 6
        },

        node: null,

        preload: function (game) {
            game.load.spritesheet(this.info.key, this.info.src, this.info.height, this.info.width, 7);
        },
        
        _overlay: null,

        button: function (game, x, y, xpad, ypad) {
            Phaser.Sprite.call(this, game, x * (GameButtonFactory.info.width + xpad), y * (GameButtonFactory.info.height + ypad), GameButtonFactory.info.key, GameButtonFactory.buttonState.Idle);
            this._overlay = game.make.sprite(0, 0, GameButtonFactory.info.key, GameButtonFactory.overlayState.Correct);
            this.addChild(this._overlay);

            this.anchor.set(0.5);
            this._overlay.anchor.set(0.5);
            this._overlay.scale = new Phaser.Point();
            this._active = false;
            this._pos = { x: x, y: y };

            this.animatePing(game);
        }
    }

    var p = GameButtonFactory.button.prototype = Object.create(Phaser.Sprite.prototype);
    GameButtonFactory.button.prototype.constructor = GameButtonFactory.button;

    p.activate = function () {
        this.frame = GameButtonFactory.buttonState.Active;
        this._active = true;
    }

    p.deactivate = function () {
        this.frame = GameButtonFactory.buttonState.Idle;
        this._active = false;
    }

    p.setStatus = function (status) {
        overlayState = GameButtonFactory.overlayState;
        if (overlayState.Correct <= status && status < overlayState.Under) {
            this._overlay.frame = status;
        }
    }

    p.animatePing = function (game) {
        var tween = game.add.tween(this._overlay.scale).to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Back.InOut, true);
        //.chain(game.add.tween(this.(_overlay.


    }

    p.update = function () {

    }

    return GameButtonFactory;
});