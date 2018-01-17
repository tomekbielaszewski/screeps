Game.deserializeRoomPosition = function (serializedRoomPosition) {
    return Game.rooms[serializedRoomPosition.roomName].getPositionAt(serializedRoomPosition.x, serializedRoomPosition.y);
};