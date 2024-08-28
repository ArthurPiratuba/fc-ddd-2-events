import EventInterface from './domain.event';
export default interface EventHandlerInterface<T extends EventInterface=EventInterface> {
    handle(event: T): void;
}