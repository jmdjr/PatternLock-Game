
define(['game/GameButtonFactory', 'game/GameMechanics'], function (buttonFactory, gameLogic) {
    return {
        _created: false,
        screenBackground: {
            key: 'screenBackground',
            src: 'Resources/background_1.png'
        },

        lockPatterns: {
            small3x3: {
                v: 3,
                h: 3,
                vpad: 20,
                hpad: 20,
                top: 130,
                left: 66,
            },
            medium4x4: {
                v: 4,
                h: 4,
                vpad: 10,
                hpad: 10,
                top: 131,
                left: 43,
            },
            odd5x3: {
                v: 5,
                h: 3,
                vpad: 10,
                hpad: 10,
                top: 96,
                left: 68,
            }
        },

        _baseGraphics: {
            textGraphic: null
        },

        _controls: {
            Restart: null,
            Help: null,
            History: null
        },

        _lockButtons: null,
        _display: null,
        
        preload: function (game) {
            game.load.image(this.screenBackground.key, this.screenBackground.src);
        },

        _initGame: function () {
            gameLogic.defaults.cells = this._lockPattern.v * this._lockPattern.h;
            gameLogic.defaults.rows = this._lockPattern.v;
            gameLogic.defaults.columns = this._lockPattern.h;
            gameLogic.nodeElementsList = this._lockButtons;

            gameLogic.initialize();
        },

        _nodeElements: function () {
            return this._lockButtons;
        },

        create: function (game) {
            this._lockPattern = this.lockPatterns.small3x3;
            this._lockButtons = game.make.group();

            //this._controls.History = 
            this._baseGraphics.screenBackground = game.make.sprite(0, 0, this.screenBackground.key);

            this._lockButtons.x = this._lockPattern.left;
            this._lockButtons.y = this._lockPattern.top;

            this._display = game.make.group();

            this._display.add(this._baseGraphics.screenBackground);
            this._display.add(this._lockButtons);

            this._createLockButtons(game);
            this._created = true;

            this._initGame();

            this._lockButtons.setAll('inputEnabled', true);

        },

        // returns the assets which belong in the foreground
        getDisplay: function (game) {
            return this._display;
        },

        update: function (game) {
            //debugger;
            //this._lockButtons.forEach(function (button) {
                
            //}, this, false, {});
        },

        _buttonDown: function(lockButton) {
        },
        
        _buttonOver: function (lockButton) {
            debugger;
        },

        _buttonUp: function (lockButton) {

        },

        _createLockButtons: function (game) {
            if (this._lockPattern == null) {
                return null;
            }

            var vp = this._lockPattern.vpad || 0;
            var hp = this._lockPattern.hpad || 0;

            for (var i = 0; i < this._lockPattern.v; ++i) {
                for (var j = 0; j < this._lockPattern.h; ++j) {
                    var button = new buttonFactory.button(game, j, i, vp, hp);
                    this._lockButtons.add(button);
                }
            }
        }
    };
});