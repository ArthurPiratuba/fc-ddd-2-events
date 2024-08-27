import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-1-handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log-2-handler";
import { v4 as uuid } from "uuid";

describe("Domain events tests", () => {

  it("should notify all event handlers when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    eventDispatcher.register("CustomerCreated", eventHandler1);
    eventDispatcher.register("CustomerCreated", eventHandler2);
    expect(eventDispatcher.getEventHandlers["CustomerCreated"][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreated"][1]).toMatchObject(eventHandler2);
    let customer = new Customer(uuid(), "Nome do Cliente");
    let events = customer.events;
    for (let event of events) {
      eventDispatcher.notify(event);
    }
    expect(spyEventHandler1).toHaveBeenCalledTimes(1);
    expect(spyEventHandler2).toHaveBeenCalledTimes(1);
  });
});

