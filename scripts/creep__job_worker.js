Creep.prototype[ROLE_WORKER] = {
    onSpawn: function () {
    },
    onDie: function () {
    },
    work: function () {
        let source = this.pos.findSource();
        if (this.pos.isNearTo(source.pos)) {
            this.harvest(source);
        } else {
            this.moveTo(source.pos);
        }
    }
};