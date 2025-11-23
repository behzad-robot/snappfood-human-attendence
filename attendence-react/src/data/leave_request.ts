export interface LeaveRequest {
    requestNumber: string;
    requestDate: number;
    requestDate_Display: string;

    fullName: string;
    leaveTypeTitle: string;
    isDailyTitle: string;

    fromDateTime: number;
    fromDateTime_Display: string;

    toDateTime: number;
    toDateTime_Display: string;

    substituteCode: string;
    substituteName: string;

    status: number;
    status_Display: string;

    creator: string;
    branchTitle: string;

    durationTitle: string;

    id: number;
}
