(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var colors = exports.colors = {
    0: '#CCCCCC',
    1: '#888888',
    2: '#31C7EF',
    3: '#5A65AD',
    4: '#EF7921',
    5: '#F7D308',
    6: '#42B642',
    7: '#AD4D9C',
    8: '#EF2029',
    9: '#BBBBBB'
};

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var keys = exports.keys = {
    ArrowUp: 38,
    ArrowDown: 40,
    ArrowLeft: 37,
    ArrowRight: 39,
    Space: 32,
    KeyP: 80,
    KeyH: 72,
    KeyC: 67
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = require('../const/colors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Field = function () {
    function Field() {
        _classCallCheck(this, Field);
    }

    _createClass(Field, [{
        key: 'draw',

        /*
         Draw everything to the canvas.
         */
        value: function draw(ctx) {
            var tempField = this.renderTempField();

            tempField.map(function (val, y) {
                val.map(function (val, x) {
                    ctx.fillStyle = _colors.colors[val];
                    ctx.fillRect(x * 20, y * 20, 20, 20);
                });
            });
        }

        /*
         Returns a new playfield with the currentblock and ghostblock merged into them.
         */

    }, {
        key: 'renderTempField',
        value: function renderTempField() {
            var _this = this;

            /*
             Create a new derefferenced playfield from the current playfield
             by splicing the rows
             */
            var tempField = this.canvas.map(function (arr) {
                return arr.slice();
            });

            //Merge the blocks with the playfield
            Object.keys(this.blocks).forEach(function (key) {
                _this.renderBlock(tempField, _this.blocks[key]);
            });

            return tempField;
        }

        /*
         Merges a block with a field
         */

    }, {
        key: 'renderBlock',
        value: function renderBlock(field, tetrimino) {
            if (!tetrimino) {
                return;
            }

            tetrimino.shape.map(function (arr, j) {
                arr.map(function (val, i) {
                    if (val === 0) {
                        return;
                    }

                    field[j + tetrimino.y][i + tetrimino.x + 2] = val;
                });
            });
        }
    }]);

    return Field;
}();

exports.default = Field;

},{"../const/colors":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Holdfield = function (_Field) {
    _inherits(Holdfield, _Field);

    function Holdfield() {
        _classCallCheck(this, Holdfield);

        var _this = _possibleConstructorReturn(this, (Holdfield.__proto__ || Object.getPrototypeOf(Holdfield)).call(this));

        _this.canvas = [[1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1]];
        _this.canHold = true;
        _this.blocks = {
            currentBlock: null
        };

        _this.registerListeners();
        return _this;
    }

    /*
     Registers the events and add actions accordingly.
     */


    _createClass(Holdfield, [{
        key: 'registerListeners',
        value: function registerListeners() {
            var self = this;

            document.addEventListener('TetrisNewHoldBlock', function (e) {
                self.setBlock(e);
            });

            document.addEventListener('TetrisHold', function () {
                self.sendHoldBlock();
            });

            document.addEventListener('TetrisNewNextBlock', function () {
                self.resetHold();
            });
        }

        /*
         Set the block to a local variable
         */

    }, {
        key: 'setBlock',
        value: function setBlock(e) {
            this.blocks.currentBlock = e.detail.holdBlock;
            this.blocks.currentBlock.x = 0;
            this.blocks.currentBlock.y = 2;

            while (this.blocks.currentBlock.rotation !== 0) {
                this.blocks.currentBlock.rotateLeft();
            }
        }

        /*
         Resets the hold
         */

    }, {
        key: 'resetHold',
        value: function resetHold() {
            this.canHold = true;
        }

        /*
         Sends the hold block back to the playfield
         */

    }, {
        key: 'sendHoldBlock',
        value: function sendHoldBlock() {
            if (!this.canHold) {
                return;
            }

            var event = new CustomEvent('TetrisTransferHoldBlock', { detail: { holdBlock: this.blocks.currentBlock } });

            document.dispatchEvent(event);

            this.canHold = false;
        }
    }]);

    return Holdfield;
}(_field2.default);

exports.default = Holdfield;

},{"./field":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nextfield = function (_Field) {
    _inherits(Nextfield, _Field);

    function Nextfield() {
        _classCallCheck(this, Nextfield);

        var _this = _possibleConstructorReturn(this, (Nextfield.__proto__ || Object.getPrototypeOf(Nextfield)).call(this));

        _this.canvas = [[1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1]];

        _this.blocks = {
            currentBlock: null
        };

        _this.registerListeners();
        return _this;
    }

    /*
     Registers the events and add actions accordingly.
     */


    _createClass(Nextfield, [{
        key: 'registerListeners',
        value: function registerListeners() {
            var self = this;

            document.addEventListener('TetrisNewNextBlock', function (e) {
                self.setBlock(e);
            });
        }

        /*
         Set the block to a local variable
         */

    }, {
        key: 'setBlock',
        value: function setBlock(e) {
            var blockType = e.detail.nextBlock;

            this.blocks.currentBlock = new blockType(0, 2);
        }
    }]);

    return Nextfield;
}(_field2.default);

exports.default = Nextfield;

},{"./field":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _iblock = require('../tetriminos/iblock');

var _iblock2 = _interopRequireDefault(_iblock);

var _jblock = require('../tetriminos/jblock');

var _jblock2 = _interopRequireDefault(_jblock);

var _lblock = require('../tetriminos/lblock');

var _lblock2 = _interopRequireDefault(_lblock);

var _oblock = require('../tetriminos/oblock');

var _oblock2 = _interopRequireDefault(_oblock);

var _sblock = require('../tetriminos/sblock');

var _sblock2 = _interopRequireDefault(_sblock);

var _tblock = require('../tetriminos/tblock');

var _tblock2 = _interopRequireDefault(_tblock);

var _zblock = require('../tetriminos/zblock');

var _zblock2 = _interopRequireDefault(_zblock);

var _block = require('../tetriminos/block');

var _block2 = _interopRequireDefault(_block);

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Playfield = function (_Field) {
    _inherits(Playfield, _Field);

    function Playfield() {
        _classCallCheck(this, Playfield);

        var _this = _possibleConstructorReturn(this, (Playfield.__proto__ || Object.getPrototypeOf(Playfield)).call(this));

        _this.canvas = [[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
        _this.bag = [];
        _this.blocks = {
            ghostBlock: null,
            currentBlock: null
        };

        _this.registerListeners();
        _this.generateNewBag(true);
        _this.newBlockFromBag();
        return _this;
    }

    /*
     Generates a new random bag of 7 tetriminos.
     https://tetris.wiki/Random_Generator
     */


    _createClass(Playfield, [{
        key: 'generateNewBag',
        value: function generateNewBag(fromConstructor) {
            this.bag = [_iblock2.default, _jblock2.default, _lblock2.default, _oblock2.default, _sblock2.default, _tblock2.default, _zblock2.default];
            this.shuffleBag(fromConstructor);
        }

        /*
         Takes the first block from the bag and assign it to the current block.
         If the bag is empty, generate a new one.
         */

    }, {
        key: 'newBlockFromBag',
        value: function newBlockFromBag() {
            var blockType = this.bag.shift();

            this.blocks.currentBlock = new blockType(3, 0);
            this.updateGhostBlock();

            if (this.bag.length === 0) {
                this.generateNewBag(false);
            }

            var event = new CustomEvent('TetrisNewNextBlock', { detail: { nextBlock: this.bag[0] } });
            document.dispatchEvent(event);

            if (this.checkCollision(this.blocks.currentBlock)) {
                var _event = new Event('TetrisGameOver');
                document.dispatchEvent(_event);
            }
        }

        /*
         Shuffles the tertriminos
         */

    }, {
        key: 'shuffleBag',
        value: function shuffleBag(firstBag) {
            for (var i = this.bag.length; i; i--) {
                var j = Math.floor(Math.random() * i);
                var _ref = [this.bag[j], this.bag[i - 1]];
                this.bag[i - 1] = _ref[0];
                this.bag[j] = _ref[1];
            }

            if (firstBag) {
                if (this.bag[0] == _sblock2.default || this.bag[0] == _zblock2.default || this.bag[0] == _oblock2.default) {
                    this.shuffleBag(true);
                }
            }
        }

        /*
        Move the current block to hold
         */

    }, {
        key: 'holdBlock',
        value: function holdBlock(e) {
            var event = new CustomEvent('TetrisNewHoldBlock', { detail: { holdBlock: this.blocks.currentBlock } });

            document.dispatchEvent(event);

            if (!e.detail.holdBlock) {
                this.newBlockFromBag();
            } else {
                this.blocks.currentBlock = e.detail.holdBlock;
                this.blocks.currentBlock.x = 3;
                this.blocks.currentBlock.y = 0;
                this.updateGhostBlock();
            }
        }

        /*
         Moves the current block to the right. If collision is detected
         restore it's old position.
         */

    }, {
        key: 'moveCurrentBlockRight',
        value: function moveCurrentBlockRight() {
            this.blocks.currentBlock.x++;

            if (this.checkCollision(this.blocks.currentBlock)) {
                this.blocks.currentBlock.x--;
            }

            this.updateGhostBlock();
        }

        /*
         Moves the current block to the left. If collision is detected
         restore it's old position.
         */

    }, {
        key: 'moveCurrentBlockLeft',
        value: function moveCurrentBlockLeft() {
            this.blocks.currentBlock.x--;

            if (this.checkCollision(this.blocks.currentBlock)) {
                this.blocks.currentBlock.x++;
            }

            this.updateGhostBlock();
        }

        /*
         Moves the current block downwards. If collision is detected
         restore it's old position and save it to the playfield.
         Check if any lines are formed and created a new block.
         */

    }, {
        key: 'moveCurrentBlockDown',
        value: function moveCurrentBlockDown() {
            this.blocks.currentBlock.y++;

            if (this.checkCollision(this.blocks.currentBlock)) {
                this.blocks.currentBlock.y--;

                this.saveBlock();
                this.checkLines();
                this.newBlockFromBag();

                return false;
            }

            return true;
        }
    }, {
        key: 'rotateCurrentBlock',
        value: function rotateCurrentBlock() {
            this.blocks.currentBlock.rotateRight();

            if (this.checkCollision(this.blocks.currentBlock)) {
                this.blocks.currentBlock.rotateLeft();
            }

            this.updateGhostBlock();
        }

        /*
         Stores the currentblock into the playfield.
         */

    }, {
        key: 'saveBlock',
        value: function saveBlock() {
            this.canvas = this.renderTempField();
        }

        /*
         Check if there are new lines formed.
         */

    }, {
        key: 'checkLines',
        value: function checkLines() {
            var clearedRows = 0;

            for (var y = 0; y < this.canvas.length; y++) {
                var sumRow = 0;

                for (var x = 0; x < this.canvas[y].length; x++) {
                    //If the row contains a 0, skip the row
                    if (this.canvas[y][x] == 0) {
                        sumRow = 0;
                        break;
                    }

                    sumRow += this.canvas[y][x];
                }

                //If the sum of the row is higher than 14, it means a block is present since it's bigger than 1,1,1,1,1,1,1,1,1,1,1,1,1,1
                if (sumRow > 14) {
                    this.canvas.splice(y, 1);
                    this.addNewRow();

                    clearedRows++;
                }
            }

            if (clearedRows > 0) {
                var event = new CustomEvent('TetrisRowsCleared', { detail: { clearedRows: clearedRows } });

                document.dispatchEvent(event);
            }
        }

        /*
         Adds a new row on top of the playfield.
         */

    }, {
        key: 'addNewRow',
        value: function addNewRow() {
            this.canvas.unshift([1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1]);
        }

        /*
         Lowers the currentblock until there is collision detected.
         */

    }, {
        key: 'dropBlock',
        value: function dropBlock() {
            var result = void 0;

            do {
                result = this.moveCurrentBlockDown();
            } while (result);
        }

        /*
         Clones the currentblock in position and shape. Give it a gray color and
         lower it until collision is detected.
         */

    }, {
        key: 'updateGhostBlock',
        value: function updateGhostBlock() {
            var colission = false;

            this.blocks.ghostBlock = new _block2.default(this.blocks.currentBlock.x, this.blocks.currentBlock.y);
            //Because the shape is a multi-dimensional array we need to derefference it when copying.
            this.blocks.ghostBlock.shape = this.blocks.currentBlock.shape.map(function (row) {
                return row.slice();
            });
            this.blocks.ghostBlock.makeGhost();

            do {
                this.blocks.ghostBlock.y += 1;

                colission = this.checkCollision(this.blocks.ghostBlock);
                if (colission) {
                    this.blocks.ghostBlock.y -= 1;
                }
            } while (!colission);
        }

        /*
         Check if there is collision.
         */

    }, {
        key: 'checkCollision',
        value: function checkCollision(block) {
            var collision = false;

            loop1: for (var y = 0; y < block.shape.length; y++) {
                for (var x = 0; x < block.shape[y].length; x++) {
                    //When the value of the block is not 0 and on that place in the playfield the value
                    //of the playfield is also not 0, we have collision.
                    if (block.shape[y][x] !== 0 && this.canvas[y + block.y][x + block.x + 2] !== 0) {
                        collision = true;
                        break loop1;
                    }
                }
            }

            return collision;
        }

        /*
         Registers the events and add actions accordingly.
         */

    }, {
        key: 'registerListeners',
        value: function registerListeners() {
            var self = this;

            document.addEventListener('TetrisArrowLeft', function () {
                self.moveCurrentBlockLeft();
            });

            document.addEventListener('TetrisArrowRight', function () {
                self.moveCurrentBlockRight();
            });

            document.addEventListener('TetrisArrowUp', function () {
                self.rotateCurrentBlock();
            });

            document.addEventListener('TetrisArrowDown', function () {
                self.moveCurrentBlockDown();
            });

            document.addEventListener('TetrisSpace', function () {
                self.dropBlock();
            });

            document.addEventListener('TetrisTransferHoldBlock', function (e) {
                self.holdBlock(e);
            });
        }
    }]);

    return Playfield;
}(_field2.default);

exports.default = Playfield;

},{"../tetriminos/block":7,"../tetriminos/iblock":8,"../tetriminos/jblock":9,"../tetriminos/lblock":10,"../tetriminos/oblock":11,"../tetriminos/sblock":12,"../tetriminos/tblock":13,"../tetriminos/zblock":14,"./field":3}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Block = function () {
    function Block(x, y) {
        _classCallCheck(this, Block);

        this.x = x;
        this.y = y;
        this.rotation = 0;
    }

    _createClass(Block, [{
        key: "rotateRight",
        value: function rotateRight() {
            this.transpose();
            this.rowReverse();

            this.rotation++;
            if (this.rotation > 3) {
                this.rotation = 0;
            }
        }
    }, {
        key: "rotateLeft",
        value: function rotateLeft() {
            this.transpose();
            this.columnReverse();

            this.rotation--;
            if (this.rotation < 0) {
                this.rotation = 3;
            }
        }
    }, {
        key: "transpose",
        value: function transpose() {
            var oldShape = this.shape;

            this.shape = oldShape[0].map(function (col, i) {
                return oldShape.map(function (row) {
                    return row[i];
                });
            });
        }
    }, {
        key: "rowReverse",
        value: function rowReverse() {
            this.shape = this.shape.map(function (row) {
                return row.reverse();
            });
        }
    }, {
        key: "columnReverse",
        value: function columnReverse() {
            this.shape.reverse();
        }
    }, {
        key: "makeGhost",
        value: function makeGhost() {
            for (var y = 0; y < this.shape.length; y++) {
                for (var x = 0; x < this.shape[y].length; x++) {
                    if (this.shape[y][x] == 0) {
                        continue;
                    }

                    this.shape[y][x] = 9;
                }
            }
        }
    }]);

    return Block;
}();

exports.default = Block;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IBlock = function (_Block) {
    _inherits(IBlock, _Block);

    function IBlock(x, y) {
        _classCallCheck(this, IBlock);

        var _this = _possibleConstructorReturn(this, (IBlock.__proto__ || Object.getPrototypeOf(IBlock)).call(this, x, y));

        _this.shape = [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]];
        return _this;
    }

    return IBlock;
}(_block2.default);

exports.default = IBlock;

},{"./block":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JBlock = function (_Block) {
    _inherits(JBlock, _Block);

    function JBlock(x, y) {
        _classCallCheck(this, JBlock);

        var _this = _possibleConstructorReturn(this, (JBlock.__proto__ || Object.getPrototypeOf(JBlock)).call(this, x, y));

        _this.shape = [[3, 0, 0], [3, 3, 3], [0, 0, 0]];
        return _this;
    }

    return JBlock;
}(_block2.default);

exports.default = JBlock;

},{"./block":7}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LBlock = function (_Block) {
    _inherits(LBlock, _Block);

    function LBlock(x, y) {
        _classCallCheck(this, LBlock);

        var _this = _possibleConstructorReturn(this, (LBlock.__proto__ || Object.getPrototypeOf(LBlock)).call(this, x, y));

        _this.shape = [[0, 0, 4], [4, 4, 4], [0, 0, 0]];
        return _this;
    }

    return LBlock;
}(_block2.default);

exports.default = LBlock;

},{"./block":7}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OBlock = function (_Block) {
    _inherits(OBlock, _Block);

    function OBlock(x, y) {
        _classCallCheck(this, OBlock);

        var _this = _possibleConstructorReturn(this, (OBlock.__proto__ || Object.getPrototypeOf(OBlock)).call(this, x, y));

        _this.shape = [[5, 5], [5, 5]];
        return _this;
    }

    return OBlock;
}(_block2.default);

exports.default = OBlock;

},{"./block":7}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SBlock = function (_Block) {
    _inherits(SBlock, _Block);

    function SBlock(x, y) {
        _classCallCheck(this, SBlock);

        var _this = _possibleConstructorReturn(this, (SBlock.__proto__ || Object.getPrototypeOf(SBlock)).call(this, x, y));

        _this.shape = [[0, 6, 6], [6, 6, 0], [0, 0, 0]];
        return _this;
    }

    return SBlock;
}(_block2.default);

exports.default = SBlock;

},{"./block":7}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TBlock = function (_Block) {
    _inherits(TBlock, _Block);

    function TBlock(x, y) {
        _classCallCheck(this, TBlock);

        var _this = _possibleConstructorReturn(this, (TBlock.__proto__ || Object.getPrototypeOf(TBlock)).call(this, x, y));

        _this.shape = [[0, 7, 0], [7, 7, 7], [0, 0, 0]];
        return _this;
    }

    return TBlock;
}(_block2.default);

exports.default = TBlock;

},{"./block":7}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ZBlock = function (_Block) {
    _inherits(ZBlock, _Block);

    function ZBlock(x, y) {
        _classCallCheck(this, ZBlock);

        var _this = _possibleConstructorReturn(this, (ZBlock.__proto__ || Object.getPrototypeOf(ZBlock)).call(this, x, y));

        _this.shape = [[8, 8, 0], [0, 8, 8], [0, 0, 0]];
        return _this;
    }

    return ZBlock;
}(_block2.default);

exports.default = ZBlock;

},{"./block":7}],15:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _playfield = require('./fields/playfield');

var _playfield2 = _interopRequireDefault(_playfield);

var _holdfield = require('./fields/holdfield');

var _holdfield2 = _interopRequireDefault(_holdfield);

var _nextfield = require('./fields/nextfield');

var _nextfield2 = _interopRequireDefault(_nextfield);

var _anim = require('./utils/anim');

var _anim2 = _interopRequireDefault(_anim);

var _keys = require('./const/keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tetris = function () {
    function Tetris() {
        _classCallCheck(this, Tetris);

        this.selectors = {
            tetris: 'tetris',
            score: 'score',
            rows: 'rows',
            level: 'level',
            hold: 'hold',
            next: 'next',
            time: 'time'
        };
        this.tetrisCnvs = document.getElementById(this.selectors.tetris);
        this.holdCnvs = document.getElementById(this.selectors.hold);
        this.nextCnvs = document.getElementById(this.selectors.next);
        this.holdfield = new _holdfield2.default();
        this.nextfield = new _nextfield2.default();
        this.playfield = new _playfield2.default();
        this.fps = 50;
        this.level = 1;
        this.rows = 0;
        this.score = 0;
        this.loopCount = 0;
        this.pause = false;
        this.timeout = 1000 / this.fps; // 20 ms im fuckiong retsraded
        this.anims = [];
        this.registerListeners();
        this.startGame();
    }

    /*
     Register all listeners.
     */


    _createClass(Tetris, [{
        key: 'registerListeners',
        value: function registerListeners() {
            var self = this;

            document.addEventListener("keydown", function (e) {
                self.handleKeyEvents(e);
            });

            document.addEventListener("TetrisGameOver", function () {
                self.gameOver();
            });

            document.addEventListener("TetrisPause", function () {
                self.pauseGame();
            });

            document.addEventListener("TetrisRowsCleared", function (e) {
                self.updateScores(e);
            });
        }

        /*
         Pauses the game
         */

    }, {
        key: 'pauseGame',
        value: function pauseGame() {
            if (!this.pause) {
                this.pause = true;

                this.stopGame();
                this.drawText("Pause");
            } else {
                this.pause = false;

                this.startGame();
            }
        }

        /*
         Starts the gameloop
         */

    }, {
        key: 'startGame',
        value: function startGame() {
            var self = this;

            this.gameLoop = setInterval(function () {
                self.loop(self);
            }, this.timeout);
        }

        /*
         Stops the gameloop
         */

    }, {
        key: 'stopGame',
        value: function stopGame() {
            clearInterval(this.gameLoop);
        }

        /*
         Handles the game over
         */

    }, {
        key: 'gameOver',
        value: function gameOver() {
            this.stopGame();
            this.drawText("Game Over");
        }

        /*
         Update the visual scores
         */

    }, {
        key: 'updateScores',
        value: function updateScores(e) {
            var clearedRows = e.detail.clearedRows;
            if (clearedRows > 0) {
                this.anims.push(new _anim2.default());
            }
            this.rows += clearedRows;
            this.score += Math.floor(50 * Math.pow(1.1, clearedRows) * clearedRows);
            this.level = Math.floor(this.rows / 20) + 1;

            if (this.level > 9) {
                this.level = 9;
            }
        }

        /*
         The game loop itself.
         */

    }, {
        key: 'loop',
        value: function loop(self) {
            self.update();
            self.draw();
        }

        /*
         Update all values of the game.
         */

    }, {
        key: 'update',
        value: function update() {
            this.loopCount++;
            if (this.loopCount % (this.fps * 2 - this.level * 10) === 0) {
                this.playfield.moveCurrentBlockDown();
            }
        }

        /*
         Draw everything to the screen.
         */

    }, {
        key: 'draw',
        value: function draw() {
            var _this = this;

            var tetrisCtx = this.tetrisCnvs.getContext("2d");
            var holdCtx = this.holdCnvs.getContext("2d");
            var nextCtx = this.nextCnvs.getContext("2d");

            this.playfield.draw(tetrisCtx);
            this.holdfield.draw(holdCtx);
            this.nextfield.draw(nextCtx);

            document.getElementById(this.selectors.score).innerText = this.score;
            document.getElementById(this.selectors.rows).innerText = this.rows;
            document.getElementById(this.selectors.level).innerText = this.level;
            document.getElementById(this.selectors.time).innerText = this.getTime();

            this.anims = this.anims.filter(function (anim) {
                return anim.tick(_this);
            });
        }

        /*
         Writes text on the main canvas
         */

    }, {
        key: 'drawText',
        value: function drawText(text) {
            var ctx = this.tetrisCnvs.getContext("2d");

            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)";

            ctx.fillRect(0, 0, 300, 600);

            ctx.fillStyle = "#666666";

            ctx.fillText(text, 150, 250);
        }
    }, {
        key: 'drawBigVilledo',
        value: function drawBigVilledo(text) {
            var ctx = this.tetrisCnvs.getContext("2d");
            var villedo = document.getElementById("bigvilledo");
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)";

            ctx.fillRect(0, 0, 300, 600);

            ctx.fillStyle = "#666666";

            ctx.fillText(text, 150, 250);
            ctx.drawImage(villedo, 125, 300, 50, 50); // y u gotta be so rude
        }

        /*
        Returns a time string
         */

    }, {
        key: 'getTime',
        value: function getTime() {
            return new Date(Math.floor(this.loopCount / this.fps) * 1000).toISOString().substr(11, 8);
        }

        /*
         When a key is pressed, fire a custom event so different components can handle
         the events themself.
         */

    }, {
        key: 'handleKeyEvents',
        value: function handleKeyEvents(e) {
            var event = void 0;

            if (this.pause && e.keyCode !== _keys.keys.KeyP) {
                return;
            }

            switch (e.keyCode) {
                case _keys.keys.ArrowUp:
                    e.preventDefault();
                    event = new Event('TetrisArrowUp');
                    break;
                case _keys.keys.ArrowDown:
                    e.preventDefault();
                    event = new Event('TetrisArrowDown');
                    break;
                case _keys.keys.ArrowLeft:
                    e.preventDefault();
                    event = new Event('TetrisArrowLeft');
                    break;
                case _keys.keys.ArrowRight:
                    e.preventDefault();
                    event = new Event('TetrisArrowRight');
                    break;
                case _keys.keys.Space:
                    e.preventDefault();
                    event = new Event('TetrisSpace');
                    break;
                case _keys.keys.KeyP:
                    e.preventDefault();
                    event = new Event('TetrisPause');
                    break;
                case _keys.keys.KeyC:
                    e.preventDefault();
                    event = new Event('TetrisHold');
                    break;
            }

            if (event) {
                document.dispatchEvent(event);
            }
        }
    }]);

    return Tetris;
}();

new Tetris();

},{"./const/keys":2,"./fields/holdfield":4,"./fields/nextfield":5,"./fields/playfield":6,"./utils/anim":16}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Anim = function () {
    function Anim() {
        _classCallCheck(this, Anim);

        this.ticks = 2 * 20;
    }

    _createClass(Anim, [{
        key: "tick",
        value: function tick(t) {
            this.ticks -= 1;
            t.drawBigVilledo("Big Villedo!");
            return this.ticks >= 0;
        }
    }]);

    return Anim;
}();

exports.default = Anim;

},{}]},{},[15])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczZcXGNvbnN0XFxjb2xvcnMuanMiLCJlczZcXGNvbnN0XFxrZXlzLmpzIiwiZXM2XFxmaWVsZHNcXGZpZWxkLmpzIiwiZXM2XFxmaWVsZHNcXGhvbGRmaWVsZC5qcyIsImVzNlxcZmllbGRzXFxuZXh0ZmllbGQuanMiLCJlczZcXGZpZWxkc1xccGxheWZpZWxkLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcaWJsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxqYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXGxibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcb2Jsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxzYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXHRibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcemJsb2NrLmpzIiwiZXM2XFx0ZXRyaXMuanMiLCJlczZcXHV0aWxzXFxhbmltLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBTyxJQUFNLDBCQUFTO0FBQ2xCLE9BQUcsU0FEZTtBQUVsQixPQUFHLFNBRmU7QUFHbEIsT0FBRyxTQUhlO0FBSWxCLE9BQUcsU0FKZTtBQUtsQixPQUFHLFNBTGU7QUFNbEIsT0FBRyxTQU5lO0FBT2xCLE9BQUcsU0FQZTtBQVFsQixPQUFHLFNBUmU7QUFTbEIsT0FBRyxTQVRlO0FBVWxCLE9BQUc7QUFWZSxDQUFmOzs7Ozs7OztBQ0FBLElBQU0sc0JBQU87QUFDaEIsYUFBWSxFQURJO0FBRWhCLGVBQVksRUFGSTtBQUdoQixlQUFZLEVBSEk7QUFJaEIsZ0JBQVksRUFKSTtBQUtoQixXQUFZLEVBTEk7QUFNaEIsVUFBWSxFQU5JO0FBT2hCLFVBQVksRUFQSTtBQVFoQixVQUFZO0FBUkksQ0FBYjs7Ozs7Ozs7Ozs7QUNBUDs7OztJQUVxQixLOzs7Ozs7OztBQUNqQjs7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RCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FEVSxFQUVWLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FGVSxFQUdWLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FIVSxFQUlWLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FKVSxFQUtWLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FMVSxFQU1WLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FOVSxFQU9WLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FQVSxFQVFWLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FSVSxFQVNWLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FUVSxFQVVWLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FWVSxFQVdWLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FYVSxFQVlWLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxD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QVEsSUFBSSxLQUFKLENBQVUsYUFBVixDQUFSO0FBQ0E7QUFDSixxQkFBSyxXQUFLLElBQVY7QUFDSSxzQkFBRSxjQUFGO0FBQ0EsNEJBQVEsSUFBSSxLQUFKLENBQVUsWUFBVixDQUFSO0FBQ0E7QUE1QlI7O0FBK0JBLGdCQUFHLEtBQUgsRUFBUztBQUNMLHlCQUFTLGFBQVQsQ0FBdUIsS0FBdkI7QUFDSDtBQUNKOzs7Ozs7QUFHTCxJQUFJLE1BQUo7Ozs7Ozs7Ozs7Ozs7SUNsUHFCLEk7QUFDakIsb0JBQWE7QUFBQTs7QUFDVCxhQUFLLEtBQUwsR0FBYSxJQUFJLEVBQWpCO0FBQ0g7Ozs7NkJBRUksQyxFQUFFO0FBQ0gsaUJBQUssS0FBTCxJQUFjLENBQWQ7QUFDQSxjQUFFLGNBQUYsQ0FBaUIsY0FBakI7QUFDQSxtQkFBTyxLQUFLLEtBQUwsSUFBYyxDQUFyQjtBQUNIOzs7Ozs7a0JBVGdCLEkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNvbnN0IGNvbG9ycyA9IHtcclxuICAgIDA6ICcjQ0NDQ0NDJyxcclxuICAgIDE6ICcjODg4ODg4JyxcclxuICAgIDI6ICcjMzFDN0VGJyxcclxuICAgIDM6ICcjNUE2NUFEJyxcclxuICAgIDQ6ICcjRUY3OTIxJyxcclxuICAgIDU6ICcjRjdEMzA4JyxcclxuICAgIDY6ICcjNDJCNjQyJyxcclxuICAgIDc6ICcjQUQ0RDlDJyxcclxuICAgIDg6ICcjRUYyMDI5JyxcclxuICAgIDk6ICcjQkJCQkJCJ1xyXG59OyIsImV4cG9ydCBjb25zdCBrZXlzID0ge1xyXG4gICAgQXJyb3dVcCAgIDogMzgsXHJcbiAgICBBcnJvd0Rvd24gOiA0MCxcclxuICAgIEFycm93TGVmdCA6IDM3LFxyXG4gICAgQXJyb3dSaWdodDogMzksXHJcbiAgICBTcGFjZSAgICAgOiAzMixcclxuICAgIEtleVAgICAgICA6IDgwLFxyXG4gICAgS2V5SCAgICAgIDogNzIsXHJcbiAgICBLZXlDICAgICAgOiA2N1xyXG59O1xyXG4iLCJpbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuLi9jb25zdC9jb2xvcnMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmllbGR7XHJcbiAgICAvKlxyXG4gICAgIERyYXcgZXZlcnl0aGluZyB0byB0aGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBkcmF3KGN0eCl7XHJcbiAgICAgICAgY29uc3QgdGVtcEZpZWxkID0gdGhpcy5yZW5kZXJUZW1wRmllbGQoKTtcclxuXHJcbiAgICAgICAgdGVtcEZpZWxkLm1hcChmdW5jdGlvbih2YWwsIHkpe1xyXG4gICAgICAgICAgICB2YWwubWFwKGZ1bmN0aW9uKHZhbCwgeCl7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3JzW3ZhbF07XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoeCoyMCwgeSoyMCwgMjAsIDIwKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFJldHVybnMgYSBuZXcgcGxheWZpZWxkIHdpdGggdGhlIGN1cnJlbnRibG9jayBhbmQgZ2hvc3RibG9jayBtZXJnZWQgaW50byB0aGVtLlxyXG4gICAgICovXHJcbiAgICByZW5kZXJUZW1wRmllbGQoKXtcclxuICAgICAgICAvKlxyXG4gICAgICAgICBDcmVhdGUgYSBuZXcgZGVyZWZmZXJlbmNlZCBwbGF5ZmllbGQgZnJvbSB0aGUgY3VycmVudCBwbGF5ZmllbGRcclxuICAgICAgICAgYnkgc3BsaWNpbmcgdGhlIHJvd3NcclxuICAgICAgICAgKi9cclxuICAgICAgICBsZXQgdGVtcEZpZWxkID0gdGhpcy5jYW52YXMubWFwKGZ1bmN0aW9uKGFycil7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnIuc2xpY2UoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9NZXJnZSB0aGUgYmxvY2tzIHdpdGggdGhlIHBsYXlmaWVsZFxyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuYmxvY2tzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQmxvY2sodGVtcEZpZWxkLCB0aGlzLmJsb2Nrc1trZXldKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGVtcEZpZWxkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgTWVyZ2VzIGEgYmxvY2sgd2l0aCBhIGZpZWxkXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckJsb2NrKGZpZWxkLCB0ZXRyaW1pbm8pe1xyXG4gICAgICAgIGlmKCF0ZXRyaW1pbm8pe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXRyaW1pbm8uc2hhcGUubWFwKGZ1bmN0aW9uKGFyciwgail7XHJcbiAgICAgICAgICAgIGFyci5tYXAoZnVuY3Rpb24odmFsLCBpKXtcclxuICAgICAgICAgICAgICAgIGlmKHZhbCA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkW2ogKyB0ZXRyaW1pbm8ueV1baSArIHRldHJpbWluby54ICsgMl0gPSB2YWw7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi9maWVsZCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb2xkZmllbGQgZXh0ZW5kcyBGaWVsZHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBbXHJcbiAgICAgICAgICAgIFsxLDEsMSwxLDEsMSwxLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMCwwLDAsMCwwLDAsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMV1cclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuY2FuSG9sZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ibG9ja3MgPSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRCbG9jazogbnVsbFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFJlZ2lzdGVycyB0aGUgZXZlbnRzIGFuZCBhZGQgYWN0aW9ucyBhY2NvcmRpbmdseS5cclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJMaXN0ZW5lcnMoKXtcclxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzTmV3SG9sZEJsb2NrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0QmxvY2soZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc0hvbGQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLnNlbmRIb2xkQmxvY2soKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzTmV3TmV4dEJsb2NrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5yZXNldEhvbGQoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU2V0IHRoZSBibG9jayB0byBhIGxvY2FsIHZhcmlhYmxlXHJcbiAgICAgKi9cclxuICAgIHNldEJsb2NrKGUpe1xyXG4gICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jayA9IGUuZGV0YWlsLmhvbGRCbG9jaztcclxuICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sueCA9IDA7XHJcbiAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLnkgPSAyO1xyXG5cclxuICAgICAgICB3aGlsZSh0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sucm90YXRpb24gIT09IDApe1xyXG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sucm90YXRlTGVmdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFJlc2V0cyB0aGUgaG9sZFxyXG4gICAgICovXHJcbiAgICByZXNldEhvbGQoKXtcclxuICAgICAgICB0aGlzLmNhbkhvbGQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU2VuZHMgdGhlIGhvbGQgYmxvY2sgYmFjayB0byB0aGUgcGxheWZpZWxkXHJcbiAgICAgKi9cclxuICAgIHNlbmRIb2xkQmxvY2soKXtcclxuICAgICAgICBpZighdGhpcy5jYW5Ib2xkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ1RldHJpc1RyYW5zZmVySG9sZEJsb2NrJywge2RldGFpbDoge2hvbGRCbG9jazogdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrfX0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5jYW5Ib2xkID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi9maWVsZCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXh0ZmllbGQgZXh0ZW5kcyBGaWVsZHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBbXHJcbiAgICAgICAgICAgIFsxLDEsMSwxLDEsMSwxLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMCwwLDAsMCwwLDAsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMV1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB0aGlzLmJsb2NrcyA9IHtcclxuICAgICAgICAgICAgY3VycmVudEJsb2NrOiBudWxsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmVnaXN0ZXJzIHRoZSBldmVudHMgYW5kIGFkZCBhY3Rpb25zIGFjY29yZGluZ2x5LlxyXG4gICAgICovXHJcbiAgICByZWdpc3Rlckxpc3RlbmVycygpe1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNOZXdOZXh0QmxvY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5zZXRCbG9jayhlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFNldCB0aGUgYmxvY2sgdG8gYSBsb2NhbCB2YXJpYWJsZVxyXG4gICAgICovXHJcbiAgICBzZXRCbG9jayhlKXtcclxuICAgICAgICBjb25zdCBibG9ja1R5cGUgPSBlLmRldGFpbC5uZXh0QmxvY2s7XHJcblxyXG4gICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jayA9IG5ldyBibG9ja1R5cGUoMCwgMik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgSUJsb2NrIGZyb20gJy4uL3RldHJpbWlub3MvaWJsb2NrJztcclxuaW1wb3J0IEpCbG9jayBmcm9tICcuLi90ZXRyaW1pbm9zL2pibG9jayc7XHJcbmltcG9ydCBMQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy9sYmxvY2snO1xyXG5pbXBvcnQgT0Jsb2NrIGZyb20gJy4uL3RldHJpbWlub3Mvb2Jsb2NrJztcclxuaW1wb3J0IFNCbG9jayBmcm9tICcuLi90ZXRyaW1pbm9zL3NibG9jayc7XHJcbmltcG9ydCBUQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy90YmxvY2snO1xyXG5pbXBvcnQgWkJsb2NrIGZyb20gJy4uL3RldHJpbWlub3MvemJsb2NrJztcclxuaW1wb3J0IEJsb2NrIGZyb20gJy4uL3RldHJpbWlub3MvYmxvY2snO1xyXG5pbXBvcnQgRmllbGQgZnJvbSAnLi9maWVsZCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZmllbGQgZXh0ZW5kcyBGaWVsZHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBbXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLmJhZyA9IFtdO1xyXG4gICAgICAgIHRoaXMuYmxvY2tzID0ge1xyXG4gICAgICAgICAgICBnaG9zdEJsb2NrICA6IG51bGwsXHJcbiAgICAgICAgICAgIGN1cnJlbnRCbG9jazogbnVsbFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnMoKTtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlTmV3QmFnKHRydWUpO1xyXG4gICAgICAgIHRoaXMubmV3QmxvY2tGcm9tQmFnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBHZW5lcmF0ZXMgYSBuZXcgcmFuZG9tIGJhZyBvZiA3IHRldHJpbWlub3MuXHJcbiAgICAgaHR0cHM6Ly90ZXRyaXMud2lraS9SYW5kb21fR2VuZXJhdG9yXHJcbiAgICAgKi9cclxuICAgIGdlbmVyYXRlTmV3QmFnKGZyb21Db25zdHJ1Y3Rvcil7XHJcbiAgICAgICAgdGhpcy5iYWcgPSBbSUJsb2NrLCBKQmxvY2ssIExCbG9jaywgT0Jsb2NrLCBTQmxvY2ssIFRCbG9jaywgWkJsb2NrXTtcclxuICAgICAgICB0aGlzLnNodWZmbGVCYWcoZnJvbUNvbnN0cnVjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFRha2VzIHRoZSBmaXJzdCBibG9jayBmcm9tIHRoZSBiYWcgYW5kIGFzc2lnbiBpdCB0byB0aGUgY3VycmVudCBibG9jay5cclxuICAgICBJZiB0aGUgYmFnIGlzIGVtcHR5LCBnZW5lcmF0ZSBhIG5ldyBvbmUuXHJcbiAgICAgKi9cclxuICAgIG5ld0Jsb2NrRnJvbUJhZygpe1xyXG4gICAgICAgIGNvbnN0IGJsb2NrVHlwZSA9IHRoaXMuYmFnLnNoaWZ0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jayA9IG5ldyBibG9ja1R5cGUoMywgMCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVHaG9zdEJsb2NrKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuYmFnLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVOZXdCYWcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ1RldHJpc05ld05leHRCbG9jaycsIHtkZXRhaWw6IHtuZXh0QmxvY2s6IHRoaXMuYmFnWzBdfX0pO1xyXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jaykpe1xyXG4gICAgICAgICAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzR2FtZU92ZXInKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU2h1ZmZsZXMgdGhlIHRlcnRyaW1pbm9zXHJcbiAgICAgKi9cclxuICAgIHNodWZmbGVCYWcoZmlyc3RCYWcpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmJhZy5sZW5ndGg7IGk7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpO1xyXG4gICAgICAgICAgICBbdGhpcy5iYWdbaSAtIDFdLCB0aGlzLmJhZ1tqXV0gPSBbdGhpcy5iYWdbal0sIHRoaXMuYmFnW2kgLSAxXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihmaXJzdEJhZyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYmFnWzBdID09IFNCbG9jayB8fCB0aGlzLmJhZ1swXSA9PSBaQmxvY2sgfHwgdGhpcy5iYWdbMF0gPT0gT0Jsb2NrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2h1ZmZsZUJhZyh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgTW92ZSB0aGUgY3VycmVudCBibG9jayB0byBob2xkXHJcbiAgICAgKi9cclxuICAgIGhvbGRCbG9jayhlKXtcclxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnVGV0cmlzTmV3SG9sZEJsb2NrJywge2RldGFpbDoge2hvbGRCbG9jazogdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrfX0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuXHJcbiAgICAgICAgaWYoIWUuZGV0YWlsLmhvbGRCbG9jayl7XHJcbiAgICAgICAgICAgIHRoaXMubmV3QmxvY2tGcm9tQmFnKClcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrICAgPSBlLmRldGFpbC5ob2xkQmxvY2s7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay54ID0gMztcclxuICAgICAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLnkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdob3N0QmxvY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBNb3ZlcyB0aGUgY3VycmVudCBibG9jayB0byB0aGUgcmlnaHQuIElmIGNvbGxpc2lvbiBpcyBkZXRlY3RlZFxyXG4gICAgIHJlc3RvcmUgaXQncyBvbGQgcG9zaXRpb24uXHJcbiAgICAgKi9cclxuICAgIG1vdmVDdXJyZW50QmxvY2tSaWdodCgpe1xyXG4gICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay54Kys7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5ibG9ja3MuY3VycmVudEJsb2NrKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay54LS07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUdob3N0QmxvY2soKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIE1vdmVzIHRoZSBjdXJyZW50IGJsb2NrIHRvIHRoZSBsZWZ0LiBJZiBjb2xsaXNpb24gaXMgZGV0ZWN0ZWRcclxuICAgICByZXN0b3JlIGl0J3Mgb2xkIHBvc2l0aW9uLlxyXG4gICAgICovXHJcbiAgICBtb3ZlQ3VycmVudEJsb2NrTGVmdCgpe1xyXG4gICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay54LS07XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5ibG9ja3MuY3VycmVudEJsb2NrKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay54Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUdob3N0QmxvY2soKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIE1vdmVzIHRoZSBjdXJyZW50IGJsb2NrIGRvd253YXJkcy4gSWYgY29sbGlzaW9uIGlzIGRldGVjdGVkXHJcbiAgICAgcmVzdG9yZSBpdCdzIG9sZCBwb3NpdGlvbiBhbmQgc2F2ZSBpdCB0byB0aGUgcGxheWZpZWxkLlxyXG4gICAgIENoZWNrIGlmIGFueSBsaW5lcyBhcmUgZm9ybWVkIGFuZCBjcmVhdGVkIGEgbmV3IGJsb2NrLlxyXG4gICAgICovXHJcbiAgICBtb3ZlQ3VycmVudEJsb2NrRG93bigpe1xyXG4gICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay55Kys7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5ibG9ja3MuY3VycmVudEJsb2NrKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay55LS07XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNhdmVCbG9jaygpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrTGluZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5uZXdCbG9ja0Zyb21CYWcoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJvdGF0ZUN1cnJlbnRCbG9jaygpe1xyXG4gICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay5yb3RhdGVSaWdodCgpO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jaykpe1xyXG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sucm90YXRlTGVmdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVHaG9zdEJsb2NrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTdG9yZXMgdGhlIGN1cnJlbnRibG9jayBpbnRvIHRoZSBwbGF5ZmllbGQuXHJcbiAgICAgKi9cclxuICAgIHNhdmVCbG9jaygpe1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gdGhpcy5yZW5kZXJUZW1wRmllbGQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIENoZWNrIGlmIHRoZXJlIGFyZSBuZXcgbGluZXMgZm9ybWVkLlxyXG4gICAgICovXHJcbiAgICBjaGVja0xpbmVzKCl7XHJcbiAgICAgICAgbGV0IGNsZWFyZWRSb3dzID0gMDtcclxuXHJcbiAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IHRoaXMuY2FudmFzLmxlbmd0aDsgeSsrKXtcclxuICAgICAgICAgICAgbGV0IHN1bVJvdyA9IDA7XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgdGhpcy5jYW52YXNbeV0ubGVuZ3RoOyB4Kyspe1xyXG4gICAgICAgICAgICAgICAgLy9JZiB0aGUgcm93IGNvbnRhaW5zIGEgMCwgc2tpcCB0aGUgcm93XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNhbnZhc1t5XVt4XSA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBzdW1Sb3cgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHN1bVJvdyArPSB0aGlzLmNhbnZhc1t5XVt4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9JZiB0aGUgc3VtIG9mIHRoZSByb3cgaXMgaGlnaGVyIHRoYW4gMTQsIGl0IG1lYW5zIGEgYmxvY2sgaXMgcHJlc2VudCBzaW5jZSBpdCdzIGJpZ2dlciB0aGFuIDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMVxyXG4gICAgICAgICAgICBpZihzdW1Sb3cgPiAxNCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5zcGxpY2UoeSwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE5ld1JvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNsZWFyZWRSb3dzKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGNsZWFyZWRSb3dzID4gMCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdUZXRyaXNSb3dzQ2xlYXJlZCcsIHtkZXRhaWw6IHtjbGVhcmVkUm93czogY2xlYXJlZFJvd3N9fSk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBBZGRzIGEgbmV3IHJvdyBvbiB0b3Agb2YgdGhlIHBsYXlmaWVsZC5cclxuICAgICAqL1xyXG4gICAgYWRkTmV3Um93KCl7XHJcbiAgICAgICAgdGhpcy5jYW52YXMudW5zaGlmdChbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBMb3dlcnMgdGhlIGN1cnJlbnRibG9jayB1bnRpbCB0aGVyZSBpcyBjb2xsaXNpb24gZGV0ZWN0ZWQuXHJcbiAgICAgKi9cclxuICAgIGRyb3BCbG9jaygpe1xyXG4gICAgICAgIGxldCByZXN1bHQ7XHJcblxyXG4gICAgICAgIGRve1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLm1vdmVDdXJyZW50QmxvY2tEb3duKClcclxuICAgICAgICB9d2hpbGUocmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIENsb25lcyB0aGUgY3VycmVudGJsb2NrIGluIHBvc2l0aW9uIGFuZCBzaGFwZS4gR2l2ZSBpdCBhIGdyYXkgY29sb3IgYW5kXHJcbiAgICAgbG93ZXIgaXQgdW50aWwgY29sbGlzaW9uIGlzIGRldGVjdGVkLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVHaG9zdEJsb2NrKCl7XHJcbiAgICAgICAgbGV0IGNvbGlzc2lvbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmJsb2Nrcy5naG9zdEJsb2NrICAgICAgID0gbmV3IEJsb2NrKHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay54LCB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sueSk7XHJcbiAgICAgICAgLy9CZWNhdXNlIHRoZSBzaGFwZSBpcyBhIG11bHRpLWRpbWVuc2lvbmFsIGFycmF5IHdlIG5lZWQgdG8gZGVyZWZmZXJlbmNlIGl0IHdoZW4gY29weWluZy5cclxuICAgICAgICB0aGlzLmJsb2Nrcy5naG9zdEJsb2NrLnNoYXBlID0gdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLnNoYXBlLm1hcChmdW5jdGlvbihyb3cpe1xyXG4gICAgICAgICAgICByZXR1cm4gcm93LnNsaWNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5ibG9ja3MuZ2hvc3RCbG9jay5tYWtlR2hvc3QoKTtcclxuXHJcbiAgICAgICAgZG97XHJcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLmdob3N0QmxvY2sueSArPSAxO1xyXG5cclxuICAgICAgICAgICAgY29saXNzaW9uID0gdGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmJsb2Nrcy5naG9zdEJsb2NrKTtcclxuICAgICAgICAgICAgaWYoY29saXNzaW9uKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tzLmdob3N0QmxvY2sueSAtPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfXdoaWxlKCFjb2xpc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgQ2hlY2sgaWYgdGhlcmUgaXMgY29sbGlzaW9uLlxyXG4gICAgICovXHJcbiAgICBjaGVja0NvbGxpc2lvbihibG9jayl7XHJcbiAgICAgICAgbGV0IGNvbGxpc2lvbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsb29wMTpcclxuICAgICAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IGJsb2NrLnNoYXBlLmxlbmd0aDsgeSsrKXtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCBibG9jay5zaGFwZVt5XS5sZW5ndGg7IHgrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9XaGVuIHRoZSB2YWx1ZSBvZiB0aGUgYmxvY2sgaXMgbm90IDAgYW5kIG9uIHRoYXQgcGxhY2UgaW4gdGhlIHBsYXlmaWVsZCB0aGUgdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAvL29mIHRoZSBwbGF5ZmllbGQgaXMgYWxzbyBub3QgMCwgd2UgaGF2ZSBjb2xsaXNpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYmxvY2suc2hhcGVbeV1beF0gIT09IDAgJiYgdGhpcy5jYW52YXNbeSArIGJsb2NrLnldW3ggKyBibG9jay54ICsgMl0gIT09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhayBsb29wMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbGxpc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFJlZ2lzdGVycyB0aGUgZXZlbnRzIGFuZCBhZGQgYWN0aW9ucyBhY2NvcmRpbmdseS5cclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJMaXN0ZW5lcnMoKXtcclxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzQXJyb3dMZWZ0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5tb3ZlQ3VycmVudEJsb2NrTGVmdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNBcnJvd1JpZ2h0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5tb3ZlQ3VycmVudEJsb2NrUmlnaHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzQXJyb3dVcCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYucm90YXRlQ3VycmVudEJsb2NrKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc0Fycm93RG93bicsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYubW92ZUN1cnJlbnRCbG9ja0Rvd24oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzU3BhY2UnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLmRyb3BCbG9jaygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNUcmFuc2ZlckhvbGRCbG9jaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLmhvbGRCbG9jayhlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgdGhpcy54ICAgICAgICA9IHg7XHJcbiAgICAgICAgdGhpcy55ICAgICAgICA9IHk7XHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcm90YXRlUmlnaHQoKXtcclxuICAgICAgICB0aGlzLnRyYW5zcG9zZSgpO1xyXG4gICAgICAgIHRoaXMucm93UmV2ZXJzZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnJvdGF0aW9uKys7XHJcbiAgICAgICAgaWYodGhpcy5yb3RhdGlvbiA+IDMpe1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcm90YXRlTGVmdCgpe1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5jb2x1bW5SZXZlcnNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMucm90YXRpb24tLTtcclxuICAgICAgICBpZih0aGlzLnJvdGF0aW9uIDwgMCl7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSAzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0cmFuc3Bvc2UoKXtcclxuICAgICAgICBsZXQgb2xkU2hhcGUgPSB0aGlzLnNoYXBlO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gb2xkU2hhcGVbMF0ubWFwKGZ1bmN0aW9uKGNvbCwgaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gb2xkU2hhcGUubWFwKGZ1bmN0aW9uKHJvdykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvd1tpXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJvd1JldmVyc2UoKXtcclxuICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5zaGFwZS5tYXAoZnVuY3Rpb24ocm93KXtcclxuICAgICAgICAgICAgcmV0dXJuIHJvdy5yZXZlcnNlKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb2x1bW5SZXZlcnNlKCl7XHJcbiAgICAgICAgdGhpcy5zaGFwZS5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZUdob3N0KCl7XHJcbiAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IHRoaXMuc2hhcGUubGVuZ3RoOyB5Kyspe1xyXG4gICAgICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgdGhpcy5zaGFwZVt5XS5sZW5ndGg7IHgrKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNoYXBlW3ldW3hdID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2hhcGVbeV1beF0gPSA5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSUJsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzAsMCwwLDBdLFxyXG4gICAgICAgICAgICBbMiwyLDIsMl0sXHJcbiAgICAgICAgICAgIFswLDAsMCwwXSxcclxuICAgICAgICAgICAgWzAsMCwwLDBdXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFszLDAsMF0sXHJcbiAgICAgICAgICAgIFszLDMsM10sXHJcbiAgICAgICAgICAgIFswLDAsMF1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbMCwwLDRdLFxyXG4gICAgICAgICAgICBbNCw0LDRdLFxyXG4gICAgICAgICAgICBbMCwwLDBdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0Jsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzUsNV0sXHJcbiAgICAgICAgICAgIFs1LDVdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU0Jsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzAsNiw2XSxcclxuICAgICAgICAgICAgWzYsNiwwXSxcclxuICAgICAgICAgICAgWzAsMCwwXVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFswLDcsMF0sXHJcbiAgICAgICAgICAgIFs3LDcsN10sXHJcbiAgICAgICAgICAgIFswLDAsMF1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBaQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbOCw4LDBdLFxyXG4gICAgICAgICAgICBbMCw4LDhdLFxyXG4gICAgICAgICAgICBbMCwwLDBdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBsYXlmaWVsZCBmcm9tICcuL2ZpZWxkcy9wbGF5ZmllbGQnO1xyXG5pbXBvcnQgSG9sZGZpZWxkIGZyb20gJy4vZmllbGRzL2hvbGRmaWVsZCc7XHJcbmltcG9ydCBOZXh0ZmllbGQgZnJvbSAnLi9maWVsZHMvbmV4dGZpZWxkJztcclxuaW1wb3J0IEFuaW0gZnJvbSAnLi91dGlscy9hbmltJztcclxuaW1wb3J0IHsga2V5cyB9IGZyb20gJy4vY29uc3Qva2V5cyc7XHJcblxyXG5jbGFzcyBUZXRyaXN7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3JzID0ge1xyXG4gICAgICAgICAgICB0ZXRyaXM6ICd0ZXRyaXMnLFxyXG4gICAgICAgICAgICBzY29yZSA6ICdzY29yZScsXHJcbiAgICAgICAgICAgIHJvd3MgIDogJ3Jvd3MnLFxyXG4gICAgICAgICAgICBsZXZlbCA6ICdsZXZlbCcsXHJcbiAgICAgICAgICAgIGhvbGQgIDogJ2hvbGQnLFxyXG4gICAgICAgICAgICBuZXh0ICA6ICduZXh0JyxcclxuICAgICAgICAgICAgdGltZSAgOiAndGltZSdcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudGV0cmlzQ252cz0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZWxlY3RvcnMudGV0cmlzKTtcclxuICAgICAgICB0aGlzLmhvbGRDbnZzICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLmhvbGQpO1xyXG4gICAgICAgIHRoaXMubmV4dENudnMgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZWxlY3RvcnMubmV4dCk7XHJcbiAgICAgICAgdGhpcy5ob2xkZmllbGQgPSBuZXcgSG9sZGZpZWxkKCk7XHJcbiAgICAgICAgdGhpcy5uZXh0ZmllbGQgPSBuZXcgTmV4dGZpZWxkKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZmllbGQgPSBuZXcgUGxheWZpZWxkKCk7XHJcbiAgICAgICAgdGhpcy5mcHMgICAgICAgPSA1MDtcclxuICAgICAgICB0aGlzLmxldmVsICAgICA9IDE7XHJcbiAgICAgICAgdGhpcy5yb3dzICAgICAgPSAwO1xyXG4gICAgICAgIHRoaXMuc2NvcmUgICAgID0gMDtcclxuICAgICAgICB0aGlzLmxvb3BDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXVzZSAgICAgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRpbWVvdXQgICA9IDEwMDAvdGhpcy5mcHM7IC8vIDIwIG1zIGltIGZ1Y2tpb25nIHJldHNyYWRlZFxyXG4gICAgICAgIHRoaXMuYW5pbXMgPSBbXTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFJlZ2lzdGVyIGFsbCBsaXN0ZW5lcnMuXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLmhhbmRsZUtleUV2ZW50cyhlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIlRldHJpc0dhbWVPdmVyXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYuZ2FtZU92ZXIoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIlRldHJpc1BhdXNlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYucGF1c2VHYW1lKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJUZXRyaXNSb3dzQ2xlYXJlZFwiLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi51cGRhdGVTY29yZXMoZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFBhdXNlcyB0aGUgZ2FtZVxyXG4gICAgICovXHJcbiAgICBwYXVzZUdhbWUoKXtcclxuICAgICAgICBpZighdGhpcy5wYXVzZSl7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9wR2FtZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdUZXh0KFwiUGF1c2VcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU3RhcnRzIHRoZSBnYW1lbG9vcFxyXG4gICAgICovXHJcbiAgICBzdGFydEdhbWUoKXtcclxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lTG9vcCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYubG9vcChzZWxmKVxyXG4gICAgICAgIH0sIHRoaXMudGltZW91dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTdG9wcyB0aGUgZ2FtZWxvb3BcclxuICAgICAqL1xyXG4gICAgc3RvcEdhbWUoKXtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZ2FtZUxvb3ApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgSGFuZGxlcyB0aGUgZ2FtZSBvdmVyXHJcbiAgICAgKi9cclxuICAgIGdhbWVPdmVyKCl7XHJcbiAgICAgICAgdGhpcy5zdG9wR2FtZSgpO1xyXG4gICAgICAgIHRoaXMuZHJhd1RleHQoXCJHYW1lIE92ZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBVcGRhdGUgdGhlIHZpc3VhbCBzY29yZXNcclxuICAgICAqL1xyXG4gICAgdXBkYXRlU2NvcmVzKGUpe1xyXG4gICAgICAgIGNvbnN0IGNsZWFyZWRSb3dzID0gZS5kZXRhaWwuY2xlYXJlZFJvd3M7XHJcbiAgICAgICAgaWYoY2xlYXJlZFJvd3MgPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5hbmltcy5wdXNoKG5ldyBBbmltKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvd3MgICs9IGNsZWFyZWRSb3dzO1xyXG4gICAgICAgIHRoaXMuc2NvcmUgKz0gTWF0aC5mbG9vcig1MCAqIE1hdGgucG93KDEuMSwgY2xlYXJlZFJvd3MpICogY2xlYXJlZFJvd3MpO1xyXG4gICAgICAgIHRoaXMubGV2ZWwgID0gTWF0aC5mbG9vcih0aGlzLnJvd3MgLyAyMCkgKyAxO1xyXG5cclxuICAgICAgICBpZih0aGlzLmxldmVsID4gOSl7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSA5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFRoZSBnYW1lIGxvb3AgaXRzZWxmLlxyXG4gICAgICovXHJcbiAgICBsb29wKHNlbGYpe1xyXG4gICAgICAgIHNlbGYudXBkYXRlKCk7XHJcbiAgICAgICAgc2VsZi5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBVcGRhdGUgYWxsIHZhbHVlcyBvZiB0aGUgZ2FtZS5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgdGhpcy5sb29wQ291bnQrKztcclxuICAgICAgICBpZigodGhpcy5sb29wQ291bnQgJSAoKHRoaXMuZnBzICogMikgLSAodGhpcy5sZXZlbCAqIDEwKSkpID09PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGQubW92ZUN1cnJlbnRCbG9ja0Rvd24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBEcmF3IGV2ZXJ5dGhpbmcgdG8gdGhlIHNjcmVlbi5cclxuICAgICAqL1xyXG4gICAgZHJhdygpe1xyXG4gICAgICAgIGNvbnN0IHRldHJpc0N0eCA9IHRoaXMudGV0cmlzQ252cy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgY29uc3QgaG9sZEN0eCAgID0gdGhpcy5ob2xkQ252cy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgY29uc3QgbmV4dEN0eCAgID0gdGhpcy5uZXh0Q252cy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgIHRoaXMucGxheWZpZWxkLmRyYXcodGV0cmlzQ3R4KTtcclxuICAgICAgICB0aGlzLmhvbGRmaWVsZC5kcmF3KGhvbGRDdHgpO1xyXG4gICAgICAgIHRoaXMubmV4dGZpZWxkLmRyYXcobmV4dEN0eCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLnNjb3JlKS5pbm5lclRleHQgPSB0aGlzLnNjb3JlO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLnJvd3MpLmlubmVyVGV4dCAgPSB0aGlzLnJvd3M7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZWxlY3RvcnMubGV2ZWwpLmlubmVyVGV4dCA9IHRoaXMubGV2ZWw7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZWxlY3RvcnMudGltZSkuaW5uZXJUZXh0ICA9IHRoaXMuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmFuaW1zID0gdGhpcy5hbmltcy5maWx0ZXIoYW5pbSA9PiBhbmltLnRpY2sodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgV3JpdGVzIHRleHQgb24gdGhlIG1haW4gY2FudmFzXHJcbiAgICAgKi9cclxuICAgIGRyYXdUZXh0KHRleHQpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMudGV0cmlzQ252cy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgIGN0eC5mb250ICAgICAgPSBcIjMwcHggQXJpYWxcIjtcclxuICAgICAgICBjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMylcIjtcclxuXHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIDMwMCwgNjAwKTtcclxuXHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzY2NjY2NlwiO1xyXG5cclxuICAgICAgICBjdHguZmlsbFRleHQodGV4dCwgMTUwLCAyNTApO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdCaWdWaWxsZWRvKHRleHQpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMudGV0cmlzQ252cy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgY29uc3QgdmlsbGVkbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmlndmlsbGVkb1wiKTtcclxuICAgICAgICBjdHguZm9udCAgICAgID0gXCIzMHB4IEFyaWFsXCI7XHJcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpXCI7XHJcblxyXG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCAzMDAsIDYwMCk7XHJcblxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiM2NjY2NjZcIjtcclxuXHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQsIDE1MCwgMjUwKTtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHZpbGxlZG8sIDEyNSwgMzAwLCA1MCwgNTApOyAvLyB5IHUgZ290dGEgYmUgc28gcnVkZVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBSZXR1cm5zIGEgdGltZSBzdHJpbmdcclxuICAgICAqL1xyXG4gICAgZ2V0VGltZSgpe1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShNYXRoLmZsb29yKHRoaXMubG9vcENvdW50IC8gdGhpcy5mcHMpICogMTAwMCkudG9JU09TdHJpbmcoKS5zdWJzdHIoMTEsIDgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgV2hlbiBhIGtleSBpcyBwcmVzc2VkLCBmaXJlIGEgY3VzdG9tIGV2ZW50IHNvIGRpZmZlcmVudCBjb21wb25lbnRzIGNhbiBoYW5kbGVcclxuICAgICB0aGUgZXZlbnRzIHRoZW1zZWxmLlxyXG4gICAgICovXHJcbiAgICBoYW5kbGVLZXlFdmVudHMoZSl7XHJcbiAgICAgICAgbGV0IGV2ZW50O1xyXG5cclxuICAgICAgICBpZih0aGlzLnBhdXNlICYmIGUua2V5Q29kZSAhPT0ga2V5cy5LZXlQKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoKGUua2V5Q29kZSl7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5BcnJvd1VwOlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0Fycm93VXAnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuQXJyb3dEb3duOlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0Fycm93RG93bicpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5BcnJvd0xlZnQ6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dMZWZ0Jyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLkFycm93UmlnaHQ6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dSaWdodCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5TcGFjZTpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNTcGFjZScpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5LZXlQOlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc1BhdXNlJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLktleUM6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzSG9sZCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihldmVudCl7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubmV3IFRldHJpcygpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltIHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy50aWNrcyA9IDIgKiAyMDtcclxuICAgIH1cclxuXHJcbiAgICB0aWNrKHQpe1xyXG4gICAgICAgIHRoaXMudGlja3MgLT0gMSA7XHJcbiAgICAgICAgdC5kcmF3QmlnVmlsbGVkbyhcIkJpZyBWaWxsZWRvIVwiKTtcclxuICAgICAgICByZXR1cm4gdGhpcy50aWNrcyA+PSAwO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
