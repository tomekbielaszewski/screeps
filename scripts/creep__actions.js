Creep.prototype.buildOrMoveTo = function(constructionSite) {
    if (this.pos.inRangeTo(constructionSite.pos, 3)) {
        return this.build(constructionSite);
    } else {
        this.moveTo(constructionSite.pos);
    }
};

Creep.prototype.withdrawOrMoveTo = function(storage, resourceType) {
    if (this.pos.isNearTo(storage.pos)) {
        return this.withdraw(storage, resourceType);
    } else {
        this.moveTo(storage.pos);
    }
};

Creep.prototype.pickupOrMoveTo = function(resource) {
    if (this.pos.isNearTo(resource.pos)) {
        return this.pickup(resource);
    } else {
        this.moveTo(resource.pos);
    }
};

Creep.prototype.transferOrMoveTo = function(storage, resourceType) {
    if (this.pos.isNearTo(storage.pos)) {
        return this.transfer(storage, resourceType);
    } else {
        this.moveTo(storage.pos);
    }
};

Creep.prototype.dropOrMoveTo = function(pos, resourceType) {
    if (this.pos === pos) { //TODO zle porownanie - porownuj przez equal albo isNearTo
        return this.drop(resourceType);
    } else {
        this.moveTo(pos);
    }
};

Creep.prototype.harvestOrMoveTo = function(source) {
    if (this.pos.isNearTo(source.pos)) {
        this.harvest(source);
    } else {
        this.moveTo(source.pos);
    }
};
