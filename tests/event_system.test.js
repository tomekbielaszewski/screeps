require('./screeps_api_mock');
const eventSystem = require('../scripts/event_system');

test('Publishing adds event to Memory', () => {
    let event = {some:'thing'};
    eventSystem.publish(event);

    expect(Memory.events).toBeDefined();
    expect(Memory.events.length).toBe(1);
    expect(Memory.events[0]).toBe(event);
});

test('Publishing again adds second event to Memory', () => {
    let event = {some:'thingelse'};
    eventSystem.publish(event);

    expect(Memory.events.length).toBe(2);
    expect(Memory.events[1]).toBe(event);
});

test('Getting first event removes it from Memory', () => {
    let event = {some:'thing'};
    let result = eventSystem.get((e) => {
        return e.some === event.some;
    });

    expect(Memory.events.length).toBe(1);
    expect(result).toEqual(event);
});