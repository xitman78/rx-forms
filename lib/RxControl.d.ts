import { IControlState, RxValidator, RxCommon } from './types';
declare class RxControl implements RxCommon {
    private initialValue;
    private validators;
    private state;
    private subject;
    private observer;
    private stateSubject;
    private stateObserver;
    constructor(initialValue?: any, validators?: RxValidator[]);
    setName(name: string): void;
    loadValue(value: any): void;
    reset(notifyState?: boolean): void;
    handleInputEvent(value: any): void;
    getState(): IControlState;
    subscribe(cb: (state: IControlState) => void): import("rxjs/internal/Subscription").Subscription;
    subscribeToStateChange(cb: (state: IControlState) => void): import("rxjs/internal/Subscription").Subscription;
    markAsTouched(dontNotify: boolean): void;
    markAsDirty(dontNotify: boolean): void;
    private validateValue;
    private isStateChanged;
}
export default RxControl;
