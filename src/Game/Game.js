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
            bombCount: 64,
            mapSize: new position(16, 16),
            map: null
        }
    }

    /**
     * generate a map
     * @param {position} startPos start position
     */
    generateMap(startPos) {

        // generate bomb
        const dropBomb = (range) => Math.floor(Math.random() * range);
        const totalSize = this.state.mapSize.x * this.state.mapSize.y;
        var dropNumbers = []

        while(dropNumbers.length <= this.state.explosive) {
            // get postion
            let x = dropBomb(totalSize);
            if (!dropNumbers.some((e) => e === x)) {
                dropNumbers.push(x);
            }
        }

        // mark the numbers
        let map = Array(totalSize).map((_, index) => {
            if (dropNumbers.includes(index)) {
                return -1;
            }
            // count neighbors
            else {
                let neighbors = position.from(index, this.state.mapSize).around();
                var count = 0;
                neighbors.forEach((pos) => {
                    if(dropNumbers.includes(pos.toNumber())) count++;
                })
                return count;
            }
        })

        this.setState({
            bombCount: this.state.bombCount,
            mapSize: this.state.mapSize,
            map: map
        })
    }

    /**
     * open a field
     * @param {position} pos
     */
    excavate(pos) {
        // first click
        if (this.state.map === null) {
            this.generateMap(pos);
        }
        
        // TODO: open the field up
        
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
     * get position from element number
     * @param {number} n element number
     * @param {position} boundary map size
     */
    static from(n, boundary) {
        let x = Math.floor(n / boundary.y);
        let y = n % boundary.y;
        return new position(x, y, boundary);
    }
    
    /**
     * check if two position is equal
     * @param {position} pos 
     */
    isEqual(pos) {
        return this.x === pos.x && this.y === pos.y;
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
        var neighbors = []

        for (var i = this.x - 1; i <= this.boundary.x && i <= this.x + 1; i++) {
            for (var j = this.y - 1; j <= this.boundary.y && j <= this.y + 1; j++) {
                let neighbor = new position(i, j, this.boundary);
                if (!this.isEqual(neighbor)) {
                    neighbors.push(neighbor)
                }
            }
        }
        return neighbors;
    }
}