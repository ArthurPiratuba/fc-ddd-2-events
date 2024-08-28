import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import EnviaConsoleLogHandler from "./handler/envia-console-log-handler";
import Address from "../value-object/address";

describe("Domain events tests", () => {

  it("should notify all event handlers when customer address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("CustomerAddressChanged", eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChanged"][0]).toMatchObject(eventHandler);
    let customer = new Customer(uuid(), "Nome do Cliente");
    customer.changeAddress(new Address("rua", 1, "cep", "cidade"));
    let events = customer.events;
    for (let event of events) {
      eventDispatcher.notify(event);
    }
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
  });
});

