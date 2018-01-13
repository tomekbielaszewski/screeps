RoomPosition.prototype.findStorage = function() {
    return this.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: function (structure) {
            return structure.structureType && (structure.structureType === STRUCTURE_SPAWN ||
                structure.structureType === STRUCTURE_EXTENSION ||
                structure.structureType === STRUCTURE_STORAGE ||
                structure.structureType === STRUCTURE_CONTAINER);
        }
    })
};

RoomPosition.prototype.findSource = function() {
    return this.findClosestByRange(FIND_SOURCES_ACTIVE);
};

RoomPosition.prototype.findDroppedResource = function() {
    return this.findClosestByRange(FIND_DROPPED_RESOURCES);
};