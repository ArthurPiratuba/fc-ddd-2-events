import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChanged from "../customer-address-changed.event";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerCreatedEvent> {

  handle(event: CustomerAddressChanged): void {
    const customer = event.eventData;
    console.log(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.address}`);
  }
}
