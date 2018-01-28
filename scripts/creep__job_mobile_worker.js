Creep.prototype[ROLE_MOBILE_WORKER] = {
    onSpawn: function () {
    },
    onDie: function () {
    },
    work: function () {
        if (this.isCapacityFull()) {
            let storage = this.pos.findStorage();
            this.transferOrMoveTo(storage, RESOURCE_ENERGY);
        } else {
            let source = this.pos.findSource();
            this.harvestOrMoveTo(source);
        }
    }
};