import RxControl from './RxControl';
import { IControlState, RxCommon } from './types';
declare type RxControlsMap<T> = {
    [name in keyof T]: RxControl;
};
declare type RxGroupsMap<T> = {
    [name in keyof T]: RxFormGroup;
};
declare type DefaultMapType = {
    [name: string]: any;
};
declare class RxFormGroup<T = DefaultMapType, G = DefaultMapType> implements RxCommon {
    controls: RxControlsMap<T>;
    groups: RxGroupsMap<G>;
    private state;
    private subject;
    private observer;
    constructor(controlsMap?: RxControlsMap<T>, groupsMap?: RxGroupsMap<G>);
    setName(name: string): void;
    subscribe(cb: (state: IControlState) => void): import("rxjs/internal/Subscription").Subscription;
    reset(notifyState?: boolean): void;
    getState(): IControlState;
    getValues(): T & G;
    private handleControlStateChange;
    private isStateChanged;
}
export default RxFormGroup;
