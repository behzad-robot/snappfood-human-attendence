import type { DoorKariItem } from "./door_kari_item";
import type { HozuriItem } from "./hozuri_item";
import type { LeaveRequest } from "./leave_request";

export interface KarItem {
    date: string;
    weekday: number;
    // hozuriItem?: HozuriItem;
    apiHozuriItem?: HozuriItem;
    localHouzriItem?: HozuriItem;
    doorKariItem?: DoorKariItem;
    leaveRequest?: LeaveRequest;
}