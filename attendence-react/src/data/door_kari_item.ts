export interface DoorKariItem {
  number: string;
  issueDate: number; // Unix timestamp in ms
  issueDate_Display: string;
  fullName: string;
  missionTypeTitle: string;
  missionTypeCode: number;
  missionTypeCode_Display: string;
  sourceTitle: string;
  destinationTitle: string;
  fromDateTime: number;
  fromDateTime_Display: string;
  fromTime: string; // e.g., "09:00"
  toDateTime: number;
  toDateTime_Display: string;
  toTime: string; // e.g., "19:00"
  durationMinutes: string; // e.g., "10:00"
  extensionDateTime: number;
  extensionDateTime_Display: string;
  status: number;
  status_Display: string;
  creator: string;
  branchTitle: string;
  description: string;
  id: number;
};
