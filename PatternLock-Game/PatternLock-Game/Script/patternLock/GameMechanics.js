define(['game/GameButtonFactory'], function (buttonClass) {
    return {
        defaults: {
            rows: 3,
            columns: 3,
            minimumSolution: 4,
            maximumSolution: 9,
            maxTries: 20,
            SolutionLength: 4,
            showPatternRelativePosition: true,

            directions: [
                { x: 0, y: -1 },    //north
                { x: 0, y: 1 },     //south
                { x: 1, y: 0 },     //east
                { x: -1, y: 0 }     //west
            ],

            compass: {
                north: 0,
                south: 1,
                east: 2,
                west: 3
            },

            states: {
                correct: 'correct',
                before: 'before',
                after: 'after',
                close: 'close',
                wrong: 'wrong'
            }
        },

        solutionList: [],       // The generated list of nodes which denotes the solution.
        userList: [],           // The list of nodes being chosen by the user.
        nodeElementsList: [],   // The list of all buttons. they have nodes.

        initialize: function () {
            var $this = this;

            this.solutionList = this.generateSolutionList();

            var i = 0;
            debugger;
            while (i < this.solutionList.length) {
                var button = this._getNodeElement(this.solutionList[i]);
                button.setStatus(buttonClass.overlayState.Wrong);
                ++i;
            }
        },

        generateSolutionList: function () {
            var d = this.defaults;
            var max = d.cells > d.maximumSolution ? d.maximumSolution : d.cells;
            var snodes = (Math.floor(Math.random() * (max - d.minimumSolution + 1)) + d.minimumSolution);
            var startX = Math.floor(Math.random() * d.columns);
            var startY = Math.floor(Math.random() * d.rows);

            var theList = [];
            theList.push({ x: startX, y: startY });

            var i = 1;

            var firstNode = theList[0];
            var lastNode = this._getRandomNextNode(theList);

            while (i < snodes && firstNode != lastNode) {
                if (!this._nodeIsInList(lastNode, theList)) {
                    theList.push(lastNode);
                    ++i;
                }

                lastNode = this._getRandomNextNode(theList);
            }

            return theList;

        },

        _getRandomNextNode: function (list) {
            var currentNode = list[list.length - 1];
            var possibleNodes = this._possibleNodes(currentNode);
            var nextNode = null;

            while (nextNode == null) {
                var pnodeIndex = Math.floor(Math.random() * possibleNodes.length);
                var pnode = possibleNodes[pnodeIndex];

                if (this._nodeIsInList(pnode, list)) {
                    if (possibleNodes.length == 1) {
                        nextNode = list[0];
                    }
                    else {
                        possibleNodes.splice(pnodeIndex, 1);
                    }
                }
                else {
                    nextNode = pnode;
                }
            }

            return nextNode;
        },

        _sameNode: function (nodeA, nodeB) {
            return nodeA.x == nodeB.x && nodeA.y == nodeB.y;
        },

        _nodeIsInList: function (node, list) {
            var i;

            for (i = 0; i < list.length; ++i) {
                if (this._sameNode(node, list[i])) {
                    return true;
                }
            }

            return false;
        },

        _nodeIsInBounds: function (node) {
            return !(node.x >= this.defaults.columns || node.x < 0
                || node.y >= this.defaults.rows || node.y < 0);
        },

        _testNodePossibility: function (node, list) {
            return this._nodeIsInBounds(node) && (list.length > 0 ? this._nodeIsInList(node, this._possibleNodes(list[list.length - 1])) : true);
        },

        _addNodes: function (nodeA, nodeB) {
            return { x: nodeA.x + nodeB.x, y: nodeA.y + nodeB.y };
        },

        _possibleNodes: function (node) {
            var possibleNodes = [];
            //manually look in all directions.
            var d = this.defaults.directions, c = this.defaults.compass;

            var newNode = this._addNodes(node, d[c.north]);
            if (this._nodeIsInBounds(newNode)) possibleNodes.push(newNode);

            newNode = this._addNodes(node, d[c.south]);
            if (this._nodeIsInBounds(newNode)) possibleNodes.push(newNode);

            newNode = this._addNodes(node, d[c.east]);
            if (this._nodeIsInBounds(newNode)) possibleNodes.push(newNode);

            newNode = this._addNodes(node, d[c.west]);
            if (this._nodeIsInBounds(newNode)) possibleNodes.push(newNode);

            newNode = this._addNodes(this._addNodes(node, d[c.north]), d[c.east]);
            if (this._nodeIsInBounds(newNode)) possibleNodes.push(newNode);

            newNode = this._addNodes(this._addNodes(node, d[c.north]), d[c.west]);
            if (this._nodeIsInBounds(newNode)) possibleNodes.push(newNode);

            newNode = this._addNodes(this._addNodes(node, d[c.south]), d[c.east]);
            if (this._nodeIsInBounds(newNode)) possibleNodes.push(newNode);

            newNode = this._addNodes(this._addNodes(node, d[c.south]), d[c.west]);
            if (this._nodeIsInBounds(newNode)) possibleNodes.push(newNode);

            return possibleNodes;
        },

        addToList: function (node) {
            if (this.userList.length == 0) {
                this.userList.push(node);
            } else if (this._testNodePossibility(node, this.userList)) {
                //
            }
        },

        update: function () {
        },

        _checkForWinCondition: function () {

        },

        _getNodeElement: function (node) {
            var i = 0, item = null, buttons = this.nodeElementsList.children;

            while (i < buttons.length) {
                item = buttons[i];

                if (this._sameNode(node, item._node)) {
                    return item;
                }
                ++i;
            }
        },


        _markNodeElements: function (attemptList, solutionList) {
            var i = 0;

            while (i < attemptList.length) {
                this._markNodeElement(attemptList[i], i, solutionList);
                ++i;
            }
        },

        _markNodeElement: function (node, position, solutionList) {
            var button = this._getNodeElement(node);
            button.setStatus(this._relativeNodePositionState(node, position, solutionList));
        },

        _relativeNodePositionState: function (attemptNode, position, solutionList) {
            var d = this.defaults;

            var previousList = solutionList.slice(0, position);
            if (this._nodeIsInList(attemptNode, previousList)) {
                if (!d.showPatternRelativePosition) {
                    return buttonClass.overlayState.Close;
                }
                return buttonClass.overlayState.Before;
            }

            var afterList = solutionList.slice(position + 1);
            if (this._nodeIsInList(attemptNode, afterList)) {
                if (!d.showPatternRelativePosition) {
                    return buttonClass.overlayState.Close;
                }
                return buttonClass.overlayState.After;
            }

            var solutionNode = solutionList[position];
            if (position < this.solutionList.length && this._sameNode(attemptNode, solutionNode)) {
                return buttonClass.overlayState.Correct;
            }

            return buttonClass.overlayState.Wrong;
        }
    }
});


/*
p.initialize = function (options) {
    this.gatherNodeList();


    var game = this;
    this._gameFrame().find('.reveal-pattern').on('click', function () {
        game.drawPaths(game.solutionList, game._gameSolutionLines());
    });

    this._gameFrame().find('.clear-pattern').on('click', function () {
        game._clearActiveList();
    });

    this._gameFrame().find('.restart-game').on('click', function () {
        game._startGameSequence();
    });

    this._startGameSequence();

}

p._clearNodeElementsState = function () {
    $.each(this.nodeElementsList, this._clearNodeElementState);
}

p._clearActiveList = function () {
    this.activeList = [];
    this._gameUserLines().empty();
    this._gameDebug().append('<br/>Pattern Cleared');
}

p._clearHistory = function () {

}

p._startGameSequence = function () {
    this.solutionList = this.generatePath(); // generates a path, which is stored in the activeList
    this.defaults.SolutionLength = this.solutionList.length;

    this._gameDebug().empty();
    this._gameDebug().append('New Game!');
    this._gameDebug().append("<br/>Number of Nodes in Solution: " + this.defaults.SolutionLength);
    this._clearNodeElementsState();
    this._clearActiveList();
    this._gameUserLines().empty();
    this._gameSolutionLines().empty();
    this._gameHistory().empty();
    this.historyList = [];
    this._updateScore();
}

p._clearNodeElementState = function (index, element) {
    $(element).removeClass();
    $(element).addClass('button');
};

p._updateScore = function () {
    var d = this.defaults;
    this._gameScore().text('Tries Remaining: ' + (d.maxTries - this.historyList.length));
}

p.simulateUserAttempt = function () {
    this.userList = this.generatePath();
    this.drawPaths(this.userList, this._gameUserLines());
    this.checkForWin(this.userList, this.solutionList);
    this.appendToHistory(this.userList);

    this.activeList = [];
    this._updateScore();
}

p.checkForWin = function (attemptList, solutionList) {
    this._markNodes(attemptList, solutionList);
    this._clearNodeElementsState();

    var i = 0;
    var allGreen = true; // optimism
    while (i < attemptList.length) {
        var node = attemptList[i];
        var nodeElement = this._getNodeElement(node);

        if (node.state) {
            nodeElement.addClass(node.state);
            allGreen = allGreen && node.state == this.defaults.states.correct;
        }

        ++i;
    }

    if (allGreen) {
        this._gameDebug().append("<br/> You have won the game! press new game to play again!");
    }
}


p.appendToHistory = function (list) {
    var tryNumber = $('<div onclick="histroyReplay(this)" class="try-replay"></div>');
    var attempts = this._gameHistory().find('.try-replay');

    tryNumber.text('try #' + (attempts.length + 1));
    tryNumber.data('historyIndex', attempts.length);
    this.historyList.push(list);

    this._gameHistory().append(tryNumber);
}

p.replayPath = function (historyIndex) {
    if (historyIndex < this.historyList.length) {
        this.drawPaths(this.historyList[historyIndex], this._gameUserLines());
        this.checkForWin(this.historyList[historyIndex], this.solutionList);
    }
}

*/