RoomPosition.prototype.findStorage = function() {
    return this.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: function (object) {
            return object.structureType && (object.structureType === STRUCTURE_SPAWN ||
                object.structureType === STRUCTURE_EXTENSION ||
                object.structureType === STRUCTURE_STORAGE ||
                object.structureType === STRUCTURE_CONTAINER);
        }
    })
};

RoomPosition.prototype.findSource = function() {
    return this.findClosestByRange(FIND_SOURCES_ACTIVE);
};