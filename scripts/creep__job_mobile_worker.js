Creep.prototype[ROLE_MOBILE_WORKER] = function () {
    if(this.isCapacityFull()) {
        let storage = this.pos.findStorage();
        if(this.pos.isNearTo(storage.pos)) {
            this.transfer(storage, RESOURCE_ENERGY);
        } else {
            this.moveTo(storage.pos);
        }
    } else {
        let source = this.pos.findSource();
        if(this.pos.isNearTo(source.pos)) {
            this.harvest(source);
        } else {
            this.moveTo(source.pos);
        }
    }
};