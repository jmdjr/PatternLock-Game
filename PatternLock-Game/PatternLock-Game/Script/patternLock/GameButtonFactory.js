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
        
        button: function (game, x, y, xpad, ypad) {
            Phaser.Sprite.call(this, game, x * (GameButtonFactory.info.width + xpad), y * (GameButtonFactory.info.height + ypad), GameButtonFactory.info.key, GameButtonFactory.buttonState.Idle);
            this._overlay = game.make.sprite(0, 0, GameButtonFactory.info.key, GameButtonFactory.overlayState.Correct);
            this._overlay.scale = new Phaser.Point();
            this._overlay.anchor.set(0.5);

            //this.setStatus(Math.round(Math.random() * 4 + 2)); // randomize state for testing

            this._status = GameButtonFactory.overlayState.Correct;
            this.anchor.set(0.5);
            this._activePing = false;

            this.inputEnabled = true;
            this._overlay.inputEnabled = true;

            this._pos = { x: x, y: y };
        }
    }

    var p = GameButtonFactory.button.prototype = Object.create(Phaser.Sprite.prototype);
    GameButtonFactory.button.prototype.constructor = GameButtonFactory.button;

    p.activate = function () {
        this.frame = GameButtonFactory.buttonState.Active;
    }

    p.deactivate = function () {
        this.frame = GameButtonFactory.buttonState.Idle;
    }

    p.onInputDown = function (delegate, context) {
        this.events.onInputDown.add(delegate, context);
    }

    p.onInputOver = function (delegate, context) {
        this.events.onInputOver.add(delegate, context);
    }

    p.onInputUp = function (delegate, context) {
        this.events.onInputUp.add(delegate, context);
    }

    p.update = function () {

    }

    p.setStatus = function (status) {
        overlayState = GameButtonFactory.overlayState;
        if (overlayState.Correct <= status && status < overlayState.Under) {
            this._overlay.frame = status;
            this._status = status;
        }
    }

    p.animatePingIn = function () {
        this.addChild(this._overlay);
        this.game.add.tween(this._overlay.scale).to({ x: 1.0, y: 1.0 }, 500, Phaser.Easing.Bounce.Out, true);
    }

    p.animatePingOut = function () {
        var $this = this;
            this.game.add.tween(this._overlay.scale).to({ x: 0.0, y: 0.0 }, 500, Phaser.Easing.Bounce.In, true)
            .onComplete.add(function (target, tween) { $this.removeChild($this._overlay); $this._activePing = false; });
    }

    p.Ping = function () {
        var $this = this;
        if (!this._activePing) {
            this._activePing = true;
            this.animatePingIn();
            setTimeout(function () { $this.animatePingOut(); }, 1000);
        }
    }


    return GameButtonFactory;
});