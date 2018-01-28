require('./enums__creep_roles');
require('./enums__game_events');

global.isSevere = function(result) {
    return result === ERR_NOT_OWNER ||
        result === ERR_BUSY ||
        result === ERR_NOT_ENOUGH_RESOURCES	 ||
        result === ERR_INVALID_TARGET ||
        result === ERR_NOT_IN_RANGE ||
        result === ERR_INVALID_ARGS ||
        result === ERR_NO_BODYPART ||
        result === ERR_NAME_EXISTS ||
        result === ERR_RCL_NOT_ENOUGH;
};

global.fromErrorCode = function (errorCode) {
    if(errorCode === OK) return 'OK';
    if(errorCode === ERR_NOT_OWNER) return 'ERR_NOT_OWNER';
    if(errorCode === ERR_NO_PATH) return 'ERR_NO_PATH';
    if(errorCode === ERR_NAME_EXISTS) return 'ERR_NAME_EXISTS';
    if(errorCode === ERR_BUSY) return 'ERR_BUSY';
    if(errorCode === ERR_NOT_FOUND) return 'ERR_NOT_FOUND';
    if(errorCode === ERR_NOT_ENOUGH_ENERGY) return 'ERR_NOT_ENOUGH_ENERGY';
    if(errorCode === ERR_NOT_ENOUGH_RESOURCES) return 'ERR_NOT_ENOUGH_RESOURCES';
    if(errorCode === ERR_INVALID_TARGET) return 'ERR_INVALID_TARGET';
    if(errorCode === ERR_FULL) return 'ERR_FULL';
    if(errorCode === ERR_NOT_IN_RANGE) return 'ERR_NOT_IN_RANGE';
    if(errorCode === ERR_INVALID_ARGS) return 'ERR_INVALID_ARGS';
    if(errorCode === ERR_TIRED) return 'ERR_TIRED';
    if(errorCode === ERR_NO_BODYPART) return 'ERR_NO_BODYPART';
    if(errorCode === ERR_NOT_ENOUGH_EXTENSIONS) return 'ERR_NOT_ENOUGH_EXTENSIONS';
    if(errorCode === ERR_RCL_NOT_ENOUGH) return 'ERR_RCL_NOT_ENOUGH';
    if(errorCode === ERR_GCL_NOT_ENOUGH) return 'ERR_GCL_NOT_ENOUGH';
};
