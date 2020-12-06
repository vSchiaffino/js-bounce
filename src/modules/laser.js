import { LASER_H, LASER_V, LASER_W } from './constants.js'
import Proyectil from './proyectil.js'

export default class Laser extends Proyectil {
    constructor(pos){
        super(pos, {w: LASER_W, h: LASER_H}, LASER_V)
    }

    Collide(collider){
        collider.getDamaged(1)
    }
};
