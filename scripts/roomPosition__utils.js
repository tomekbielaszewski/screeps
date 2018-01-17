const nonBuildableTypes = [
    LOOK_SOURCES,
    LOOK_MINERALS,
    LOOK_STRUCTURES,
    LOOK_CONSTRUCTION_SITES,
    LOOK_NUKES
];

RoomPosition.prototype.isBuildable = function() {
    const look = this.look();
    for (let item of look) {
        if (nonBuildableTypes.indexOf(item.type) > -1) {
            return false;
        }
        if (item.terrain === 'wall') {
            return false;
        }
    }
    return true;
};