export default class Anim {
    constructor(){
        this.ticks = 2 * 20;
    }

    tick(t){
        this.ticks -= 1 ;
        t.drawBigVilledo("Big Villedo!");
        return this.ticks >= 0;
    }
}
