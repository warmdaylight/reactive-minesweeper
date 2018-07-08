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