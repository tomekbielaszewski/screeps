Creep.prototype[ROLE_WORKER] = function () {
    let source = this.pos.findSource();
    if(this.pos.isNearTo(source.pos)) {
        this.harvest(source);
    } else {
        this.moveTo(source.pos);
    }
};