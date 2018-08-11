import { EventHandler } from "../../../App/Handlers/EventHandler";

export interface IEvent<T> extends EventHandler<T>{}

export interface Listener<T> {
    (event: T): any;
  }
  
  export interface Disposable {
    dispose();
  }