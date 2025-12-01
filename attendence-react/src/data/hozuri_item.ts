import type { AttendenceStatusDto } from "./attendence_status_dto";

export interface HozuriItem {
    date: string;
    startTime: string;
    endTime: string;
    status_dtos: AttendenceStatusDto[];
}