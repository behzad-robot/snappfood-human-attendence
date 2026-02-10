import type { DoorKariItem } from "@/data/door_kari_item";
import type { HozuriItem } from "@/data/hozuri_item";
import type { LeaveRequest } from "@/data/leave_request";
import { MOCK_HOZURI_DATA } from "./mock_hozuri_data";
import type { AttendenceStatusDto } from "@/data/attendence_status_dto";
import { MOCK_DOOR_KARI_DATA } from "./mock_door_kari_data";

let searchParams = new URLSearchParams(window.location.search);
export let TOKEN = searchParams.get('token')?.toString() || '';
export let COOKIE = searchParams.get('cookie')?.toString() || '';
const IS_DEV = (import.meta.env.DEV);
const HOZURI_LOCAL_STORAGE = 'hozuri-local-storage';
const delay = (ms: number): Promise<void> => {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};
export const ATTENDENCE_API = {
    async getLocalHozuriList(): Promise<HozuriItem[]> {
        let str = window.localStorage.getItem(HOZURI_LOCAL_STORAGE);
        if (str == undefined)
            str = '[]';
        return JSON.parse(str) as HozuriItem[];
    },
    async setHozuriList(list: HozuriItem[]) {
        window.localStorage.setItem(HOZURI_LOCAL_STORAGE, JSON.stringify(list));
    },
    async getDoorKariList(): Promise<DoorKariItem[]> {
        if (IS_DEV) {
            await delay(1_000);
            return MOCK_DOOR_KARI_DATA;
        }
        const url = 'https://attendance.snappfood.ir/SnappPortal/api/Framework/EntityView/Query';
        const options = {
            method: 'POST',
            headers: {
                accept: '*/*',
                'accept-language': 'en-US,en;q=0.9',
                'content-type': 'application/json',
                cookie: COOKIE,
                origin: 'https://attendance.snappfood.ir',
                priority: 'u=1, i',
                referer: 'https://attendance.snappfood.ir/SnappPortal/apps/hcm-mission-portal/list-mission-documents?componentName=SystemGroup.HCM.Mission&entity=MissionDocument&view=PortalSelfServiceMissionDocuments',
                'sec-ch-ua': '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
                'x-requested-with': 'XMLHttpRequest',
                'x-xsrf-token': TOKEN,
            },
            body: '{"entityViewName":"SystemGroup.HCM.Mission/MissionDocument/PortalSelfServiceMissionDocuments","pageSize":50,"pageIndex":0,"searchText":null,"parameters":null,"sorts":null,"filters":null,"source":"list"}'
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            // console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    async createDoorkari({ employeeRef, fromDateTime, toDateTime, durationMinutes }: {
        employeeRef: number,
        fromDateTime: number,
        toDateTime: number,
        durationMinutes: number,
    }): Promise<void> {
        // const fetch = require('node-fetch');
        const url = 'https://attendance.snappfood.ir/SnappPortal/api/HCM/Mission/Portal/MissionDocument/Save';
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.9,fa;q=0.8,de;q=0.7',
                'content-type': 'application/json',
                cookie: COOKIE,
                origin: 'https://attendance.snappfood.ir',
                priority: 'u=1, i',
                referer: 'https://attendance.snappfood.ir/SnappPortal/apps/hcm-mission-portal/mission-document',
                'sec-ch-ua': '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
                'x-xsrf-token': TOKEN,
            },
            body: JSON.stringify({
                "entity": {
                    "employeeRef": employeeRef,
                    "fromDateTime": fromDateTime,
                    "durationDays": 0,
                    "durationMinutes": durationMinutes,
                    "toDateTime": toDateTime,
                    "extensionDateTime": toDateTime,
                    "missionTypeRef": 5,
                    "issueDate": 1763424000000,
                    "dispatchingDepartmentRef": null,
                    "sourceRef": null,
                    "destinationRef": null,
                    "batchMissionDocumentRef": null,
                    "officialConfirmerEmployeeRef": null,
                    "financialConfirmerEmployeeRef": null, "number": null,
                    "missionDocumentReports": [],
                    "description": "دورکاری",
                    "financialConfirmationNumber": null,
                    "officialConfirmationNumber": null,
                    "toDateTimeTitle": toDateTime.toString(),
                    "extensionDateTimeTitle": toDateTime.toString(),
                    "officialConfirmationDateTime": null,
                    "financialConfirmationDateTime": null,
                    "distance": null,
                    "travelTypeCode": null,
                    "accommodationTypeCode": null,
                    "__state": 2
                }, "extensions": []
            })
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
            throw 'failed to submit';
        }
    },
    async getEmployeeName(): Promise<string> {
        if (IS_DEV)
            return 'بهزاد تست';
        const url = 'https://attendance.snappfood.ir/SnappPortal/api/FrontEnd/Shell/StaticData';
        const options = {
            method: 'GET',
            headers: {
                accept: '*/*',
                'accept-language': 'en-US,en;q=0.9,fa;q=0.8,de;q=0.7',
                cookie: '_gcl_au=1.1.1169149196.1761657323; _ym_uid=1761657324499702902; _ym_d=1761657324; analytics_campaign={%22source%22:%22google%22%2C%22medium%22:%22organic%22}; _hjSessionUser_3300609=eyJpZCI6Ijk1NzIyODNiLTRmZTEtNTQzOC1hNDVlLTBkMzlmNDgxNTM2OSIsImNyZWF0ZWQiOjE3NjI4NjE3NDE4MDEsImV4aXN0aW5nIjp0cnVlfQ==; _clck=1loqhaz%5E2%5Eg11%5E0%5E2127; _ga_W2FYNR9BLD=GS2.1.s1763301411$o12$g0$t1763302700$j60$l0$h0; rl_page_init_referrer=RudderEncrypt%3AU2FsdGVkX1%2F58r4TtoD5ySeXlyF3g1JKjZGr%2F2xV0c8%3D; _ga=GA1.2.470503137.1761640339; rl_session=RudderEncrypt%3AU2FsdGVkX1%2FANifacMsHVehkyq8w%2FRFjWELNrZOz0q4vNvq0HU7aLgm6bKDW5iXVQW1cJ5E51g7e5KvvTC56VUit9xJCbgmmSpTNvumT4EXrDWT7HCv1ygMrSGxfNhLvTyEfIlrub8lCioatfPfhsg%3D%3D; rl_user_id=RudderEncrypt%3AU2FsdGVkX1%2Behg2JiAbifjnfDj5q1p45r11VNMLO9grUpI0VPnBcFSyay22rQ3xr; rl_trait=RudderEncrypt%3AU2FsdGVkX1%2BB62yNIbsQHsbXv3UlBF%2FM2Kr%2BmlckdElyEIRohdwRW358ryI1c42fsx0NENF9JGBsjLdSHOOlDySBdjw59XBe2idxkl6OCucAXh0W9EOnc7pFeAK%2BhO1m; rl_group_id=RudderEncrypt%3AU2FsdGVkX1%2BI26xV4zCcEx9TA%2FY9y9eh1u6uo4JmGIQ%3D; rl_group_trait=RudderEncrypt%3AU2FsdGVkX19Dm0sv9ptM55Fy0rdU1V6nZva6BMC7JZs%3D; rl_anonymous_id=RudderEncrypt%3AU2FsdGVkX1%2F1DK01RTthcJCMPA924a0w1pmFLWO8a48qDTu1CZkev5Mdfj9MpP8oe0ArQpj91v07grNmpc8MOQ%3D%3D; amplitude_id_cf620211dc906be4ab7c92f52766759dsnappfood.ir=eyJkZXZpY2VJZCI6IjQ3YjVlOGQ2LTNjMTgtNGYxOS1hOTRmLTJlMjk3YjJhOTZhZVIiLCJ1c2VySWQiOm51bGwsIm9wdE91dCI6ZmFsc2UsInNlc3Npb25JZCI6MTc2MzQ1MDU0MzE2OCwibGFzdEV2ZW50VGltZSI6MTc2MzQ1MTA1Mzk2MCwiZXZlbnRJZCI6MCwiaWRlbnRpZnlJZCI6MCwic2VxdWVuY2VOdW1iZXIiOjB9; rahkaran-culture=c=fa-IR|uic=fa-IR; rahkaran-xsrf=CfDJ8OXOtpZ5WotGuQAshYdU0XvtD8GGr6St-7vU1WtXYdhx7mTx3MoMki0f2DoDE72KE1_CeAU3ovKdywuem8UzA9ED_3LS5ri_XctKOfgSgc7Rs8gRM-pqkBbtW0UYvUl_8KriPu6AFDQZHAZShr0lnqo; XSRF-TOKEN=CfDJ8OXOtpZ5WotGuQAshYdU0Xuf0-BbwufpF7o1suMLyJN_mjiynsBduV0jJJaDCkUlPgcYRoumQYFIRJEIxz_5Xsy3bTNtV8IkJjmsZKV-9CIqqt9qMqnfFBN_eNwWNgm-AMcm0y5zF965PkhEXVP-kwsYv_jz-iEM-S1mkKQAJrP1ovZUL_X1OMAZhX1iUz0Log; rahkaran-auth=CfDJ8OXOtpZ5WotGuQAshYdU0XucpqR-TuVYLme6oIS5Hp-ds16YAEXH2bsdoB4f9PXgolMYiJXPFej8gocIeD8wTHHQaf6agSxw6eOwLAmPOXtRIXsU3CxTuwnbf3N299v8KG4X1_AqVuKLAuC2KzDnU1tR7P1hKNJL6I6aGD1aIqKtNNq9MvsLgmucyGlOw1XFKBvOi5JD3VtRjKJfzPh_hk18lBO19VSq92a4fvTOW-SkaoxwBFFnk9z_pLm3zWt0Zc_1uqaCG9voOH4GLqkXbUBWfOp0KYT_3GXp8RniVjb9Wq-pLNVzewdpqjcra3EikcM97I8lKzTQIdosSV90ppHd8v21dxDYLy70x26-EbLhyf_R5xiai5BL0rIrCKde2iVXXqeQSG_09MdYt0TZdWj_FmRMCwtdoM3akaVqNAZFqGhhWC_Q_GvqEpvyzXxkNXIhMe9pFP5ofCIUubVycT5PSWTlRj6jP-AEsR0aVPBtj2c8SsEttwKcpyvcW5EN4QblxL-82-bVPlOmCau8TK6YD-UhOQKUY7UVOSCvMUaGTYT9bL08RQ94FBEtnmd4Fso-FS_INjMbcJQTAGs12jAsJtd-1rmcjTI8uSg5qBY-2BVg19DVIrgveiU1JxhhYyxuJ2DcJSqmHrWFrN2TWaM',
                priority: 'u=1, i',
                referer: 'https://attendance.snappfood.ir/SnappPortal/',
                'sec-ch-ua': '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
                'x-xsrf-token': 'CfDJ8OXOtpZ5WotGuQAshYdU0Xuf0-BbwufpF7o1suMLyJN_mjiynsBduV0jJJaDCkUlPgcYRoumQYFIRJEIxz_5Xsy3bTNtV8IkJjmsZKV-9CIqqt9qMqnfFBN_eNwWNgm-AMcm0y5zF965PkhEXVP-kwsYv_jz-iEM-S1mkKQAJrP1ovZUL_X1OMAZhX1iUz0Log'
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data.user.displayName;
            // console.log(data);
        } catch (error) {
            console.error(error);
        }
    },
    async getCurrentEmployeeId(): Promise<number> {
        if (IS_DEV)
            return 6305;
        const url = 'https://attendance.snappfood.ir/SnappPortal/api/HCM/Mission/Portal/MissionDocument/getCurrentEmployeeId';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.9,fa;q=0.8,de;q=0.7',
                cookie: COOKIE,
                priority: 'u=1, i',
                referer: 'https://attendance.snappfood.ir/SnappPortal/apps/hcm-mission-portal/mission-document',
                'sec-ch-ua': '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
                'x-xsrf-token': TOKEN,
            }
        };
        try {
            const response = await fetch(url, options);
            const data = await response.text();
            return parseInt(data);
        } catch (error) {
            console.error(error);
        }
    },
    async getMorakhasiList(): Promise<LeaveRequest[]> {
        if (IS_DEV) {
            return [
                {
                    "requestNumber": "520576",
                    "requestDate": 1763769600000,
                    "requestDate_Display": "‎1404/09/01‏",
                    "fullName": "بهزاد عابدین زاده",
                    "leaveTypeTitle": "مرخصی استحقاقی",
                    "isDailyTitle": "روزانه",
                    "fromDateTime": 1763510400000,
                    "fromDateTime_Display": "‎00:00 1404/08/28‏",
                    "toDateTime": 1763510400000,
                    "toDateTime_Display": "‎00:00 1404/08/28‏",
                    "substituteCode": "",
                    "substituteName": "",
                    "status": 1,
                    "status_Display": "ذخیره شده",
                    "creator": "بهزاد عابدین زاده",
                    "branchTitle": "",
                    "durationTitle": "07:00",
                    "id": 558868
                },
                {
                    "requestNumber": "505238",
                    "requestDate": 1760227200000,
                    "requestDate_Display": "‎1404/07/20‏",
                    "fullName": "بهزاد عابدین زاده",
                    "leaveTypeTitle": "مرخصی استحقاقی",
                    "isDailyTitle": "روزانه",
                    "fromDateTime": 1757808000000,
                    "fromDateTime_Display": "‎00:00 1404/06/23‏",
                    "toDateTime": 1757980800000,
                    "toDateTime_Display": "‎00:00 1404/06/25‏",
                    "substituteCode": "",
                    "substituteName": "",
                    "status": 10,
                    "status_Display": "تایید نهایی",
                    "creator": "بهزاد عابدین زاده",
                    "branchTitle": "",
                    "durationTitle": "27:00",
                    "id": 541401
                },
                {
                    "requestNumber": "486247",
                    "requestDate": 1754956800000,
                    "requestDate_Display": "‎1404/05/21‏",
                    "fullName": "بهزاد عابدین زاده",
                    "leaveTypeTitle": "مرخصی استحقاقی",
                    "isDailyTitle": "روزانه",
                    "fromDateTime": 1752364800000,
                    "fromDateTime_Display": "‎00:00 1404/04/22‏",
                    "toDateTime": 1752537600000,
                    "toDateTime_Display": "‎00:00 1404/04/24‏",
                    "substituteCode": "",
                    "substituteName": "",
                    "status": 10,
                    "status_Display": "تایید نهایی",
                    "creator": "بهزاد عابدین زاده",
                    "branchTitle": "",
                    "durationTitle": "27:00",
                    "id": 521241
                },
                {
                    "requestNumber": "428159",
                    "requestDate": 1738972800000,
                    "requestDate_Display": "‎1403/11/20‏",
                    "fullName": "بهزاد عابدین زاده",
                    "leaveTypeTitle": "مرخصی استحقاقی",
                    "isDailyTitle": "روزانه",
                    "fromDateTime": 1737504000000,
                    "fromDateTime_Display": "‎00:00 1403/11/03‏",
                    "toDateTime": 1737504000000,
                    "toDateTime_Display": "‎00:00 1403/11/03‏",
                    "substituteCode": "",
                    "substituteName": "",
                    "status": 10,
                    "status_Display": "تایید نهایی",
                    "creator": "بهزاد عابدین زاده",
                    "branchTitle": "",
                    "durationTitle": "08:00",
                    "id": 459098
                },
                {
                    "requestNumber": "389129",
                    "requestDate": 1725840000000,
                    "requestDate_Display": "‎1403/06/19‏",
                    "fullName": "بهزاد عابدین زاده",
                    "leaveTypeTitle": "مرخصی استحقاقی",
                    "isDailyTitle": "روزانه",
                    "fromDateTime": 1725321600000,
                    "fromDateTime_Display": "‎00:00 1403/06/13‏",
                    "toDateTime": 1725321600000,
                    "toDateTime_Display": "‎00:00 1403/06/13‏",
                    "substituteCode": "",
                    "substituteName": "",
                    "status": 10,
                    "status_Display": "تایید نهایی",
                    "creator": "بهزاد عابدین زاده",
                    "branchTitle": "",
                    "durationTitle": "09:00",
                    "id": 417373
                }
            ];
        }
        const url = 'https://attendance.snappfood.ir/SnappPortal/api/Framework/EntityView/Query';
        const options = {
            method: 'POST',
            headers: {
                accept: '*/*',
                'accept-language': 'en-US,en;q=0.9,fa;q=0.8,de;q=0.7',
                'content-type': 'application/json',
                cookie: COOKIE,
                origin: 'https://attendance.snappfood.ir',
                priority: 'u=1, i',
                referer: 'https://attendance.snappfood.ir/SnappPortal/apps/hcm-leave-portal/list-leave-requests?componentName=SystemGroup.HCM.Leave&entity=LeaveRequest&view=PortalAllSelfServiceEmployeeLeaveRequests',
                'sec-ch-ua': '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
                'x-requested-with': 'XMLHttpRequest',
                'x-xsrf-token': TOKEN
            },
            body: '{"entityViewName":"SystemGroup.HCM.Leave/LeaveRequest/PortalAllSelfServiceEmployeeLeaveRequests","pageSize":50,"pageIndex":0,"searchText":null,"parameters":null,"sorts":null,"filters":null,"source":"list"}'
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    async getAllStatusList({
        employeeId, fromDate, toDate
    }: {
        employeeId: number,
        fromDate: string,
        toDate: string,
    }): Promise<AttendenceStatusDto[]> {
        if (IS_DEV)
            return MOCK_HOZURI_DATA;
        const url = `https://attendance.snappfood.ir/SnappPortal/api/HCM/AttendanceCalculation/Portal/AttendanceCalculation/GetAllPairAttendanceDataInfo?EmployeeId=${employeeId}&FromDate=${fromDate}&ToDate=${toDate}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.9,fa;q=0.8,de;q=0.7',
                cookie: COOKIE,
                priority: 'u=1, i',
                referer: 'https://attendance.snappfood.ir/SnappPortal/apps/hcm-leave-portal/m/leave-request',
                'sec-ch-ua': '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
                'sec-ch-ua-mobile': '?1',
                'sec-ch-ua-platform': '"Android"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36',
                'x-xsrf-token': TOKEN,
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            // console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}