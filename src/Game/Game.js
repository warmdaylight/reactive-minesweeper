import React, {Component} from 'react';

function MineField(props) {
    return (
        <span className={props.status} onClick={props.onClick}></span>
    );
} 

export class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            explosiveMap: Array(size[0]).fill(Array[1].fill(null)),
            explosive: props.explosive || 25
        }
    }

    /**
     * generate a map
     * @param {number} startX start position x
     * @param {number} startY start position y
     */
    generateMap(startX, startY) {
        let placedBomb = [];
        const start = [startX, startY];

        // generate bomb
        const bombDrop = (range) => Math.floor(Math.random() * range);
        const isSamePostion = (a, b) => a[0] == b[0] && a[1] == b[1];

        let explosiveMap = this.state.explosiveMap.map((e) => e.slice());
        

        while(placedBomb.length <= this.state.explosive) {
            // get coordinate
            let position = [bombDrop(this.explosiveMap.length), bombDrop(this.explosiveMap[0].length)];

            if (!isSamePostion(position, start) && !placedBomb.some((e) => isSamePostion(e, position))) {
                placedBomb.push(position);
                explosiveMap[position[0], position[1]] = -1;
            }
        }
        // mark the numbers

        for (var i = 0; i < explosiveMap.length; i++) {
            for (var j = 0; j < explosiveMap[0].length; j++) {
                
            }
        }
    }

    /**
     * open a field
     * @param {number} x 
     * @param {number} y 
     */
    excavate(x, y) {
        // if the first click, generate a map
        if (!this.state.explosiveMap[x][y]) {
            this.generateMap(x, y);
        }
    } 

    render() {
        return (
            <table>

            </table>
        );
    }
}

class position {

    /**
     * Constructor for position
     * @param {number} x 
     * @param {number} y 
     * @param {position} pos minefiled size
     */
    constructor(x, y, pos = null) {
        this.x = x;
        this.y = y;
        this.boundary = pos
    }
    
    /**
     * check if two position is equal
     * @param {position} pos 
     */
    isEqual(pos) {
        return this.x === pos.x && this.y === pos.y;
    }

    /**
     * return left and right positions
     */
    neighbor() {
        return [new position(this.x, this.y -1, this.boundary), new position(this.x, this.y + 1, this.boundary)];
    }

    /**
     * get element number in 1 diamension array
     */
    toNumber() {
        if (this.boundary === null) return -1;
        else return this.x * this.boundary.y + this.y; 
    }

    /**
     * get serrounding of the position
     */
    around() {
        let top = new position(this.x - 1, this.y, this.boundary)
        let bottom = new position(this.x + 1, this.y, this.boundary)

        return [top, bottom].concat(top.neighbor().concat(this.neighbor()).concat(bottom.neighbor()));
    }

    