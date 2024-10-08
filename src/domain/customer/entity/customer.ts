import EventInterface from "../../@shared/event/domain.event";
import CustomerAddressChanged from "../event/customer-address-changed.event";
import CustomerCreated from "../event/customer-created.event";
import Address from "../value-object/address";

export default class Customer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  events: Set<EventInterface> = new Set();

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
    this.addEvent(new CustomerCreated(this));
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  addEvent(event: EventInterface) {
    this.events.add(event);
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }


  changeAddress(address: Address) {
    this._address = address;
    this.addEvent(new CustomerAddressChanged(this));
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}
