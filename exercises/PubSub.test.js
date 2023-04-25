const PubSub = require("./PubSub"); // 引入你的发布订阅类

describe("PubSub", () => {
  let pubSub;

  beforeEach(() => {
    pubSub = new PubSub();
  });

  test("should register and emit events", () => {
    const eventType = "testEvent";
    const callback = jest.fn();

    pubSub.on(eventType, callback);
    pubSub.emit(eventType, "arg1", "arg2");

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("arg1", "arg2");
  });

  test("should not emit unregistered events", () => {
    const eventType = "testEvent";
    const unregisteredEventType = "unregisteredEvent";
    const callback = jest.fn();

    pubSub.on(eventType, callback);
    pubSub.emit(unregisteredEventType, "arg1", "arg2");

    expect(callback).toHaveBeenCalledTimes(0);
  });

  test("should register and remove event listeners", () => {
    const eventType = "testEvent";
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    pubSub.on(eventType, callback1);
    pubSub.on(eventType, callback2);
    pubSub.remove(eventType, callback1);
    pubSub.emit(eventType, "arg1", "arg2");

    expect(callback1).toHaveBeenCalledTimes(0);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith("arg1", "arg2");
  });

  test('should not fail when removing unregistered events or handlers', () => {
    const eventType = 'testEvent';
    const unregisteredEventType = 'unregisteredEvent';
    const callback = jest.fn();

    expect(() => {
      pubSub.remove(eventType, callback);
      pubSub.remove(unregisteredEventType, callback);
    }).not.toThrow();
  });
});
