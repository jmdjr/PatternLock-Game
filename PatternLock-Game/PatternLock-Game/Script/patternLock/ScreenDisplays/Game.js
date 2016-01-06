
define(['game/GameButtonFactory', 'game/GameMechanics', 'control/DrawingControl'], function (buttonFactory, mechanics, draw) {
    return {
        _created: false,
        _game: null,
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
                left: 78,
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

        _initGameMechanics: function () {
            mechanics.defaults.cells = this._lockPattern.v * this._lockPattern.h;
            mechanics.defaults.rows = this._lockPattern.v;
            mechanics.defaults.columns = this._lockPattern.h;
            mechanics.nodeElementsList = this._lockButtons;

            mechanics.initialize();
        },

        _nodeElements: function () {
            return this._lockButtons;
        },

        create: function (game) {
            this._lockPattern = this.lockPatterns.odd5x3;

            this._createDisplay(game);

            this._createLockButtons(game);

            this._initGameMechanics();

            this._UserLineCreation = false;
            this._game = game;
        },

        _createDisplay: function (game) {
            this._lockButtons = game.make.group();
            this._display = game.make.group();

            this._baseGraphics.screenBackground = game.make.sprite(0, 0, this.screenBackground.key);
            this._baseGraphics.screenBackground.inputEnabled = false;

            this._lockButtons.x = this._lockPattern.left;
            this._lockButtons.y = this._lockPattern.top;

            this._display.add(this._baseGraphics.screenBackground);
            this._display.add(this._lockButtons);
        },

        // returns the assets which belong in the foreground
        getDisplay: function (game) {
            return this._display;
        },
        _historyOfLines: [],

        _lineDisplay: {
            _activeLine: null,
            _selectedButtons: [],
            _isActive: false,
            _game: null,
            _lockPattern: null,

            New: function (game, lockPattern, startButton, display) {
                this._game = game;
                this._lockPattern = lockPattern;
                this._activeLine = draw.LineGroupControl(this._game);
                display.add(this._activeLine.getGroup());

                this._selectedButtons.push(startButton);
                this._activeLine.lastPoint = { x: startButton.x + lockPattern.left, y: startButton.y + lockPattern.top };
                this._activeLine.createLine();

                this._isActive = true;
            },
            Update: function (game) {
                if (this._isActive) {
                    var position = { x: game.input.activePointer.x, y: game.input.activePointer.position.y };
                    position.x -= 26;
                    position.y -= 70;
                    this._activeLine.update(position);
                }
            },
            Snap: function (button) {
                var inCollection = this._selectedButtons.indexOf(button) != -1;

                if (this._isActive && !inCollection) {
                    this._selectedButtons.push(button);

                    lastPosition = { x: button.x + this._lockPattern.left, y: button.y + this._lockPattern.top };
                    this._activeLine.update(lastPosition);
                    this._activeLine.saveLine(lastPosition);
                    this._activeLine.createLine();
                }
            },
            Finalize: function () {
                if (this._isActive) {
                    this._activeLine.removeLine();
                    //var 
                    this._historyOfLines.push(this._activeLine);

                    this._display.remove(this._activeLine.getGroup());
                    
                    this._activeLine = null;
                    this._selectedButtons = [];

                    this._isActive = false;
                }
            }
        },

        update: function (game) {
            this._lineDisplay.Update(game);
        },

        _buttonDown: function (button) {
            this._lineDisplay.New(this._game, this._lockPattern, button, this._display);
        },

        _buttonOver: function (button) {
            this._lineDisplay.Snap(button);
        },

        _buttonUp: function (pointer) {
            if (pointer.targetObject) {
                var button = pointer.targetObject.sprite;
                if (button instanceof buttonFactory.button) {
                    //might not be necessary to denote which one is the last one.
                    //button.setStatus(buttonFactory.overlayState.Wrong);
                    //button.Ping();
                }
            }

            if (this._activeLine) {
                this._activeLine.removeLine();
                this._UserLineCreation = false;
                this._historyOfLines.push(this._activeLine);

                this._display.remove(this._activeLine.getGroup());

                this._activeLine = null;
                this._selectedButtons = [];
            }
            // this means the 
        },

        _establishDisplay: function() {
        
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

                    button.onInputDown(this._buttonDown, this);
                    button.onInputOver(this._buttonOver, this);
                }
            }

            game.input.onUp.add(this._buttonUp, this);
        },

        render: function (game) {
            //game.debug.spriteInputInfo(this._lockButtons.children[this._lockButtons.length - 1], 0, 50, 'rgba(0, 255, 0, .5)');
            //game.debug.spriteInputInfo(this._lockButtons, 'rgba(145, 145, 0, .5)', true);
            //game.debug.spriteBounds(this._lockButtons.children[this._lockButtons.length - 1], 'rgba(0, 255, 0, .5)', true)
        }
    };
});