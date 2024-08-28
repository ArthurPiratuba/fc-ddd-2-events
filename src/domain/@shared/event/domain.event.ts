export default abstract class DomainEvent {
  readonly dataTimeOccurred: Date;
  readonly eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
