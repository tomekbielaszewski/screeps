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