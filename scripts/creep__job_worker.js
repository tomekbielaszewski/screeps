Creep.prototype[ROLE_WORKER] = {
    onSpawn: function () {
    },
    onDie: function () {
    },
    work: function () {
        let source = this.pos.findSource();
        this.harvestOrMoveTo(source)
    }
};