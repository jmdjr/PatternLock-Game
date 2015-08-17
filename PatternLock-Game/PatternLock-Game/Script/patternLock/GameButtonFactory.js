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

        preload: function (game) {
            game.load.spritesheet(this.info.key, this.info.src, this.info.height, this.info.width, 7);
        },
        
        _overlay: null,

        button: function (game, x, y, xpad, ypad) {
            Phaser.Sprite.call(this, game, x * (GameButtonFactory.info.width + xpad), y * (GameButtonFactory.info.height + ypad), GameButtonFactory.info.key, GameButtonFactory.buttonState.Idle);
            this._overlay = game.make.sprite(0, 0, GameButtonFactory.info.key, GameButtonFactory.overlayState.Correct);
            this.setStatus(Math.round(Math.random() * 4 + 2));
            this._overlay.scale = new Phaser.Point();
            this._status = GameButtonFactory.overlayState.Correct;
            this.addChild(this._overlay);
            this.anchor.set(0.5);
            this._overlay.anchor.set(0.5);
            this._active = false;
            this.inputEnabled = true;
            this.interactive = true;

            this._pos = { x: x, y: y };
            //this.events.onInputDown.add(this._buttonDown, this);
            //this.body.setSize(GameButtonFactory.info.width, GameButtonFactory.info.height, 0, 0);
            //debugger;
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
            this._status = status;
        }
    }

    p.animatePingIn = function (game) {
        game.add.tween(this._overlay.scale).to({ x: 1.0, y: 1.0 }, 500, Phaser.Easing.Bounce.Out, true);
    }

    p.animatePingOut = function (game) {
        game.add.tween(this._overlay.scale).to({ x: 0.0, y: 0.0 }, 500, Phaser.Easing.Bounce.In, true);
    }

    p._buttonDown = function (button, pointer) {
        debugger;
    }

    p.update = function () {
        //if (this.input.justPressed()) {
        //    //this._buttonDown(button);
        //    debugger;
        //}
        //if (this.input.justOver()) {
        //    //this._buttonOver(button);
        //    debugger;
        //}
        //if (this.input.justReleased()) {
        //    //this._buttonUp(button);
        //    debugger;
        //}
    }

    return GameButtonFactory;
});