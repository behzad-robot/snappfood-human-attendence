import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from 'react'
import './App.css'
import { ATTENDENCE_API } from './api/attendence_api'
import moment from "jalali-moment"
import type { KarItem } from "./data/kar_item"
import { HozuriDialog } from "./hozuri-dialog"
import { calculateTimeSpent } from "./data/time_spent"
import { RecordStatus } from "./data/record_status"
import { DoorkariDialog } from "./doorkari-dialog"
import { Button } from "./components/ui/button"
import { FoodousDialog } from "./foodous-dialog"
import { UserInfoView } from "./user-info-view"
import { HelperLinksDialog } from "./helper-links-dialog"
import { Spinner } from "./components/ui/spinner"
import { GuideDialog } from "./guide-dialog"
import { FeaturesDialog } from "./features-dialog"
import type { HozuriItem } from "./data/hozuri_item"
import { normalise } from "./data/normalize"
import { getLocalHolidays, isLocalHoliday, setLocalHolidays } from "./api/local_holidays"

const weekdayName = (n: number) =>
  moment().locale('fa').day(n).format('dddd');

function App() {
  const [employeeRef, setEmployeeRef] = useState<number>(-1);
  const [employeeName, setEmployeeName] = useState<string>('');
  const [items, setItems] = useState<KarItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const todayString = moment().locale('fa').format('YYYY/MM/DD');
  // const [items, setItems] = useState<[]>([]);
  const reloadListData = async () => {
    try {
      setError(undefined);
      setLoading(true);
      setItems([]);

      let ref = await ATTENDENCE_API.getCurrentEmployeeId();
      let name = await ATTENDENCE_API.getEmployeeName();
      setEmployeeRef(ref);
      setEmployeeName(name);

      let doorKariItems = await ATTENDENCE_API.getDoorKariList();
      let localHozuriItems = await ATTENDENCE_API.getLocalHozuriList();
      let leaveRequests = await ATTENDENCE_API.getMorakhasiList();
      const endOfToday = moment().endOf('day').valueOf();
      const sixtyDaysAgo = moment().subtract(60, 'days').startOf('day').valueOf();
      console.log(`endOfToday=`, endOfToday, 'sixtyDaysAgo=', sixtyDaysAgo);
      let status_list = await ATTENDENCE_API.getAllStatusList({
        employeeId: ref,
        toDate: endOfToday.toString(),
        fromDate: sixtyDaysAgo.toString(),
      });
      console.log(`door kari api:`, doorKariItems);
      let _items: KarItem[] = [];
      let offset = 0;
      let todayMoment = moment().locale('fa');
      console.log(`today=`, todayMoment.format('YYYY/MM/DD'))
      while (offset < 65) {
        let d = moment().locale('fa').subtract(offset, "days");
        let dateStr = d.format('YYYY/MM/DD');
        let doorKariItem = doorKariItems.find(t => normalise(t.fromDateTime_Display) == normalise(dateStr));
        // let hozuriItem = doorKariItem != undefined ? undefined : hozuriItems.find(c => normalise(c.date) == normalise(dateStr));
        let leaveRequest = leaveRequests.find(t => normalise(moment(t.fromDateTime).locale('fa').format('YYYY/MM/DD')) == normalise(dateStr));
        // if (hozuriItem != undefined) {
        //   hozuriItem.status_dtos = status_list.filter(c => normalise(c.aaA_Range).indexOf(dateStr) != -1);
        //   if (hozuriItem.status_dtos == undefined)
        //     hozuriItem.status_dtos = [];
        // }
        let localHozuriItem = localHozuriItems.find(c => normalise(c.date) == normalise(dateStr));
        let apiHozuriItem: HozuriItem = undefined;
        let status_dtos = status_list.filter(c => normalise(c.aaA_Range).indexOf(dateStr) != -1);
        if (status_dtos.length != 0) {
          apiHozuriItem = { date: dateStr, startTime: '09:00', endTime: '6:00', status_dtos };
        }
        let item: KarItem = {
          date: dateStr,
          weekday: d.weekday(),
          doorKariItem: doorKariItem,
          localHouzriItem: localHozuriItem,
          apiHozuriItem: apiHozuriItem,
          leaveRequest: leaveRequest,
        };
        // console.log(d.format('YYYY/MM/DD'), item);
        _items.push(item);
        offset++;
      }
      setItems(_items);

    }
    catch (err) {
      setError(err.toString());
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    reloadListData();
  }, []);
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="w-full flex flex-row gap-2 items-center content-center mb-2 mt-4">
          <h1 className="font-black">افزونه ثبت تردد انسان دوست اسنپفود</h1>
          <h3>{todayString}</h3>
          <UserInfoView />
          <HelperLinksDialog />
          <Button variant="outline" size="icon-sm" onClick={reloadListData}>🔄</Button>
          <div className="grow" />
          <GuideDialog />
          <FeaturesDialog />
          <div className="text-xs">ساخته شده توسط همکاران اسنپفود</div>
          <FoodousDialog />
        </div>
        {loading ? <div className="text-center py-4 flex flex-row justify-center items-center content-center"><Spinner className="size-12" /></div> : undefined}
        {error ? <div className="bg-gray-800 text-white text-2xl rounded-md py-2 px-4 flex flex-col gap-2 font-sans">
          <h1>خطا:</h1>
          <p>وضعیت اتصال vpn خود را چک کنید.</p>
          <p>حتما یکبار در attendence لاگین کرده باشید و سپس این افزونه رو باز کنید.</p>
          <p className="text-xs">{error}</p>
          <small>در صورتی که این خطا ادامه یافت این تب رو ببندید و مجددا به attendence بروید.</small>
          <Button variant="destructive" onClick={reloadListData}>تلاش مجدد</Button>
        </div> : undefined}
        {(!loading && error == undefined) ? <DaysTable items={items} reload={reloadListData} employeeName={employeeName} employeeRef={employeeRef} /> : undefined}

      </div>
    </>
  )
}
export function DaysTable({ items, reload, employeeName, employeeRef }: { items: KarItem[], reload: Function, employeeRef: number, employeeName: string }) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">تاریخ</TableHead>
          <TableHead className="text-center">شروع-پایان</TableHead>
          <TableHead className="text-center">مدت</TableHead>
          <TableHead className="text-center">ثبت توسط</TableHead>
          <TableHead className="text-center">وضعیت</TableHead>
          <TableHead className="text-center">توضیحات</TableHead>
          <TableHead className="text-center">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => {
          let fromTime = '', toTime = '', creator = '', status_display = '', description = '';
          let status = RecordStatus.None;
          let isOffDay = item.weekday >= 5;
          if (item.doorKariItem) {
            fromTime = item.doorKariItem.fromTime;
            toTime = item.doorKariItem.toTime;
            creator = item.doorKariItem.creator;
            status_display = item.doorKariItem.status_Display;
            description = item.doorKariItem.description;
            status = RecordStatus.DoorKari;
          }
          else if (item.localHouzriItem != undefined || item.apiHozuriItem != undefined) {
            status = RecordStatus.Hozuri;
            if (item.apiHozuriItem) {
              fromTime = item.apiHozuriItem.startTime;
              toTime = item.apiHozuriItem.endTime;
              creator = item.apiHozuriItem.status_dtos[0].shiftTitle;
              status_display = item.apiHozuriItem.status_dtos.length == 0 ? 'انشالله' : item.apiHozuriItem.status_dtos[0].attendanceStatusTitle;
              description = ('حضوری سیستمی - ' + item.apiHozuriItem.status_dtos[0].startRfidGateTitle);
            }
            else {
              fromTime = item.localHouzriItem.startTime;
              toTime = item.localHouzriItem.endTime;
              creator = 'با اطلاعات سیستم همخوانی ندارد!'
              status_display = 'انشالله';
              description = 'جضوری';
            }
          }
          else if (item.leaveRequest) {
            fromTime = '00:00';
            toTime = fromTime;
            creator = item.leaveRequest.creator;
            status_display = item.leaveRequest.status_Display;
            description = item.leaveRequest.leaveTypeTitle + '-' + item.leaveRequest.isDailyTitle;
            status = RecordStatus.Morakhasi;
          }
          else if (isOffDay) {
            status_display = 'تعطیل';
            description = 'تعطیل';
          }
          else {
            status_display = 'ثبت نشده';
            description = '';
          }
          if(isLocalHoliday(item.date))
            status_display = 'تعطیل رسمی'
          return (
            <TableRow key={index} className={
              isOffDay || isLocalHoliday(item.date) ? "bg-gray-300 hover:bg-gray-400" :
                (
                  status == RecordStatus.None ? "bg-red-200 hover:bg-red-300" :
                    (status == RecordStatus.DoorKari ? "bg-green-100 hover:bg-green-200" :
                      (status == RecordStatus.Morakhasi ? "bg-orange-300 hover:bg-orange-400" :
                        (item.apiHozuriItem != undefined ? "bg-green-100 hover:bg-green-200" :
                          "bg-blue-400 hover:bg-blue-500"
                        )
                      )
                    )
                )
            }>
              <TableCell className="text-center">{item.date}-{weekdayName(item.weekday - 1)}</TableCell>
              <TableCell className="text-center">{fromTime}-{toTime}</TableCell>
              <TableCell className="text-center">{status != RecordStatus.None && status != RecordStatus.Morakhasi ? calculateTimeSpent(fromTime, toTime) : '.'}</TableCell>
              <TableCell className="text-center">{creator}</TableCell>
              <TableCell className="text-center">{status_display}</TableCell>
              <TableCell className="text-center">{description}</TableCell>
              <TableCell className="text-center">
                {isOffDay ? <></> : <ActionButton employeeName={employeeName} employeeRef={employeeRef} status={status} item={item} reload={reload} />}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table >
  )
}
function ActionButton({ status, item, reload, employeeRef, employeeName }: { status: string, item: KarItem, reload: Function, employeeRef: number, employeeName: string }) {
  if (status == RecordStatus.None) {
    let isHoliday = isLocalHoliday(item.date);
    return (
      <>
        {isHoliday ? undefined :
          <>
            <DoorkariDialog employeeName={employeeName} employeeRef={employeeRef} item={item} reload={reload} />
            <HozuriDialog item={item} reload={reload} />
            <Button size="sm" variant="destructive">
              <a href="https://attendance.snappfood.ir/SnappPortal/~/hcm-leave-portal/leave-request/" target="_blank">ثبت مرخصی</a>
            </Button>
          </>
        }
        <Button size="sm" variant="secondary" className={isHoliday ? "bg-amber-400 hover:bg-amber-500" : "bg-gray-400 hover:bg-gray-500"} onClick={() => {
          let allHolidays = getLocalHolidays();
          if (isHoliday) {
            let index = allHolidays.findIndex(c => normalise(c) == normalise(item.date));
            if (index == -1) {
              window.alert('error:sth went wrong');
              return;
            }
            allHolidays.splice(index, 1);
            setLocalHolidays(allHolidays);
            reload();
          }
          else {
            allHolidays.push(item.date);
            setLocalHolidays(allHolidays);
            reload();
          }
        }}>
          {isHoliday ? 'تبدیل به روز عادی' : 'تعطیل رسمی'}
        </Button>
      </>
    );
  }
  if (status == RecordStatus.Hozuri)
    return (<HozuriDialog item={item} reload={reload} />);
  if (status == RecordStatus.DoorKari)
    return (<DoorkariDialog employeeName={employeeName} employeeRef={employeeRef} item={item} reload={reload} />)
  return undefined;
}
export default App
