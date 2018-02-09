const eventSystem = require('./event_system');

Creep.prototype[ROLE_CARRIER] = {
    onSpawn: function () {
    },
    onDie: function () {
        if (this.memory.event) {
            eventSystem.publish(this.memory.event);
        }
    },
    work: function () {
        let event = getCarryEvent.call(this);
        if (event) {
            this[event.type](event);
        }
    }
};

//TODO dodaj pauzę na wyciaganie surowców ze spawnu/extensionów kiedy w kolejce budowania jest wysoko priorytetowa jednostak (mobileworker/warrior etc)
Creep.prototype[EVENT__HIRE_TO_TRANSPORTING_ENERGY] = function (event) {
    if (this.isCarryingSomething()) {
        let target = Game.getObjectById(event.target);
        if (!target) {
            this.log(`Event(EVENT__HIRE_TO_TRANSPORTING_ENERGY) Cannot find target. Finishing event`);
            finishEvent.call(this);
            return;
        }
        let carriedEnergy = this.carry[RESOURCE_ENERGY];
        let targetAvailableCapacity = getAvailableCapacity.call(this, target);
        let result = this.transferOrMoveTo(target, RESOURCE_ENERGY);
        if (result === OK) {
            event.amountTransferred = event.amountTransferred || 0;
            event.amountTransferred += Math.min(carriedEnergy, targetAvailableCapacity);
            if (event.amountTransferred >= event.amount) {
                finishEvent.call(this);
            }
            this.log(`Transferred ${event.amountTransferred}/${event.amount} of energy`);
            return;
        }
        if (isSevere(result)) this.log(`Event ${event.type} did not finish properly. Result of last operation was: ${result}`);
    } else {
        let resource = this.pos.findDroppedEnergy();
        if (resource) {
            this.pickupOrMoveTo(resource);
        } else {
            let storage = this.pos.findStorage();
            if(storage.memory && storage.memory.highPriorityCreepUnderConstruction) {
                this.log(`High priority creep is under construction. Pausing spawn withdrawal`);
                return;
            }
            this.withdrawOrMoveTo(storage, RESOURCE_ENERGY);
        }
    }
};

function getAvailableCapacity(target) {
    if (target.carryCapacity) {
        return target.carryCapacity - _.sum(target.carry);
    } else if (target.storeCapacity) {
        return target.storeCapacity - _.sum(target.store);
    } else if (target.energyCapacity) {
        return target.energyCapacity = target.energy;
    }
}

function getCarryEvent() {
    if (this.memory.event) return this.memory.event;

    let carryEvent = eventSystem.get(isCarryEvent);
    this.memory.event = carryEvent;
    return carryEvent;
}

function isCarryEvent(event) {
    return event.type === EVENT__HIRE_TO_TRANSPORTING_ENERGY;
}

function finishEvent() {
    this.log('Event finished');
    this.memory.event = undefined;
}