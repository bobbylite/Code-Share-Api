import { Listener, Disposable } from "../../Infrastructure/Types/Events/IEvent";
import { injectable } from "../../../node_modules/inversify";

@injectable()
export class EventHandler<T> {
    private listeners: Listener<T>[] = [];

    public on(listener: Listener<T>): Disposable {
        this.listeners.push(listener);
        return {
            dispose: () => this.off(listener)
        };
    }

    public emit (event: T) {
        this.listeners.forEach((listener) => listener(event));
    }

    private off(listener: Listener<T>) {
        let callbackIndex = this.listeners.indexOf(listener);
        if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
    }

    private pipe(te: EventHandler<T>): Disposable {
        return this.on((e) => te.emit(e));
    }
}