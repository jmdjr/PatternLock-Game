
define(['game/TouchScreenDisplayManager'], function () {
    return {
        _created: false,
        Logo: {
            key: 'logoImage',
            src: 'Resources/FlipStickLogo.png',
            frames: 29,
            height: 600,
            width: 120,
            rate: 24,
            ref: null,
            top: 0,
            left: 85,
            scale: new Phaser.Point(0.75, 0.50)
        },

        displayTimerRef: null,
        _displayGroup: null,

        preload: function (game) {
            game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
            game.load.spritesheet(this.Logo.key, this.Logo.src, this.Logo.width, this.Logo.height);
        },

        create: function (game, touchScreen) {
            game.stage.setBackgroundColor(0x33CC33);
            this.Logo.ref = game.make.sprite(this.Logo.left, this.Logo.top, this.Logo.key);
            this.Logo.ref.scale = this.Logo.scale;
            this.Logo.ref.animations.add('flip', null, this.Logo.rate, false);
            this.Logo.ref.animations.play('flip');

            this._displayGroup = game.make.group();
            this._displayGroup.add(this.Logo.ref);

            this.displayTimerRef = game.time.create();
            this.displayTimerRef.add(1000, this._createLogoTitle, this, game);
            this.displayTimerRef.add(3000, this._transition, this, touchScreen);
            this.displayTimerRef.start();
            this._created = true;
        },

        _createLogoTitle: function (game) {
            var text = game.make.text(128, 50, "\\ Flip Stick Games /");

            text.anchor.set(0.5);
            text.align = 'center';
            text.font = 'Audiowide';
            text.fontWeight = 'bold';
            text.fontSize = 20;
            text.fill = '#000000';
            this._displayGroup.add(text);
        },

        _transition: function (touchScreen) {
            touchScreen.nextDisplay();
        },

        getDisplay: function (game) {
            return this._displayGroup;
        },

        update: function (game) {

        }
    };
});