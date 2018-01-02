Creep.prototype[ROLE_CARRIER] = function () {
    const states

    if(this.isCapacityFull()) {
        let storage = this.pos.findStorage();
        if(this.pos.isNearTo(storage.pos)) {
            this.transfer(storage, RESOURCE_ENERGY);
        } else {
            this.moveTo(storage.pos);
        }
    } else {
        let resource = this.pos.findDroppedResource();
        if(resource) {

        } else {

        }
    }
};
