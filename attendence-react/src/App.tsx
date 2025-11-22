import {
  Table,
  TableBody,
  TableCaption,
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
const normalise = s => s.replace(/[\u200E\u200F]/g, '');
const weekdayName = (n: number) =>
  moment().locale('fa').day(n).format('dddd');

function App() {
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
      let doorKariItems = await ATTENDENCE_API.getDoorKariList();
      let hozuriItems = await ATTENDENCE_API.getHozuriList();
      console.log(`door kari api:`, doorKariItems);
      let _items: KarItem[] = [];
      let offset = 0;
      let todayMoment = moment().locale('fa');
      console.log(`today=`, todayMoment.format('YYYY/MM/DD'))
      while (offset < 65) {
        let d = moment().locale('fa').subtract(offset, "days");
        let dateStr = d.format('YYYY/MM/DD');
        let doorKariItem = doorKariItems.find(t => normalise(t.fromDateTime_Display) == normalise(dateStr));
        let hozuriItem = doorKariItem != undefined ? undefined : hozuriItems.find(c => normalise(c.date) == normalise(dateStr));
        let item: KarItem = {
          date: dateStr,
          weekday: d.weekday(),
          doorKariItem: doorKariItem,
          hozuriItem: hozuriItem,
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
  if (loading)
    return (
      <div>Loading...</div>
    );
  if (error) {
    return (
      <div className="w-full text-center my-2 text-red-500 font-bold">{error}</div>
    )
  }
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="w-full flex flex-row gap-2 items-center content-center mb-2 mt-4">
          <h1 className="font-black">سامانه ثبت تردد انسان دوست اسنپفود</h1>
          <h3>{todayString}</h3>
          <Button variant="outline" size="icon-sm" onClick={reloadListData}>🔄</Button>
          <div className="grow" />
          <div className="text-xs">ساخته شده توسط همکاران اسنپفود</div>
          <FoodousDialog />
        </div>
        <DoorkariTable items={items} reload={reloadListData} />
      </div>
    </>
  )
}
export function DoorkariTable({ items, reload }: { items: KarItem[], reload: Function }) {
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
          else if (item.hozuriItem) {
            fromTime = item.hozuriItem.startTime;
            toTime = item.hozuriItem.endTime;
            creator = 'انشالله';
            status_display = 'انشالله';
            description = 'حضوری';
            status = RecordStatus.Hozuri
          }
          else if (isOffDay) {
            status_display = 'تعطیل';
            description = 'تعطیل';
          }
          else {
            status_display = 'ثبت نشده';
            description = '';
          }
          return (
            <TableRow key={index} className={item.weekday >= 5 ? "bg-gray-300 hover:bg-gray-400" : (status == RecordStatus.None ? "bg-red-200 hover:bg-red-300" : (status == RecordStatus.DoorKari ? "bg-green-100" : ""))}>
              <TableCell className="text-center">{item.date}-{weekdayName(item.weekday - 1)}</TableCell>
              <TableCell className="text-center">{fromTime}-{toTime}</TableCell>
              <TableCell className="text-center">{status != RecordStatus.None ? calculateTimeSpent(fromTime, toTime) : '.'}</TableCell>
              <TableCell className="text-center">{creator}</TableCell>
              <TableCell className="text-center">{status_display}</TableCell>
              <TableCell className="text-center">{description}</TableCell>
              <TableCell className="text-center">
                {isOffDay ? <></> : <ActionButton status={status} item={item} reload={reload} />}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  )
}
function ActionButton({ status, item, reload }: { status: string, item: KarItem, reload: Function }) {
  if (status == RecordStatus.None)
    return (
      <>
        <DoorkariDialog item={item} reload={reload} />
        <HozuriDialog item={item} reload={reload} />
      </>
    );
  if (status == RecordStatus.Hozuri)
    return (<HozuriDialog item={item} reload={reload} />);
  if (status == RecordStatus.DoorKari)
    return (<DoorkariDialog item={item} reload={reload} />)
  return undefined;
}
export default App
