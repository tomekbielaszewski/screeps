require('./cache__core');

Creep.prototype.cachedMoveTo = function (pos, moveToExactPosition) {
    if(!pos) return;

    if(this.pos.isNearTo(pos) && !moveToExactPosition) {
        this.memory.isMoving = false;
        this.memory.path = false;
        return;
    }
    if(this.pos.isEqualTo(pos)) {
        this.memory.isMoving = false;
        this.memory.path = false;
        return;
    }


};