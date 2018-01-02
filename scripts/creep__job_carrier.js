Creep.prototype[ROLE_CARRIER] = function () {
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
            if(this.pos.isNearTo(resource.pos)) {
                this.pickup(resource);
            } else {
                this.moveTo(resource.pos);
            }
        }
    }
};
