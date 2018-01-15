Creep.prototype[ROLE_MOBILE_WORKER] = {
    onSpawn: function () {
    },
    onDie: function () {
    },
    work: function () {
        if (this.isCapacityFull()) {
            let storage = this.pos.findStorage();
            if (this.pos.isNearTo(storage.pos)) {//TODO jesli nie wyszuka sciezki do zadnego z magazynow - storage bedzie undefined
                this.transfer(storage, RESOURCE_ENERGY);
            } else {
                this.moveTo(storage.pos);
            }
        } else {
            let source = this.pos.findSource();
            if (this.pos.isNearTo(source.pos)) {
                this.harvest(source);
            } else {
                this.moveTo(source.pos);
            }
        }
    }
};