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

    // helper function
    /**
     * 
     * @param {number[]} position
     * @returns positions of the coordinate neighbor
     */
    private getNeighbor(position) {
        let x = position[0];
        let y = position[1];

        return [[x, y - 1], [x, y + 1], [x - 1, y], ]
    }

    private isSamePostion(a, b) {
        return a[0] == b[0] && a[1] == b[1];
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