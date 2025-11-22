import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ATTENDENCE_API } from "./api/attendence_api";
import type { KarItem } from "./data/kar_item";
import { useState } from "react";
import { Input } from "./components/ui/input";
import moment from "jalali-moment";
// const normalise = s => s.replace(/[\u200E\u200F]/g, '');
export function DoorkariDialog({ item, reload }: { item: KarItem, reload: Function }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [startTime, setStartTime] = useState(item.doorKariItem?.fromTime ?? '9:00');
    const [endTime, setEndTime] = useState(item.doorKariItem?.toTime ?? '18:00');
    const [description, setDescription] = useState(item.doorKariItem?.description ?? 'دورکاری');
    // console.log(`1763492400000`, moment(1763492400000).format());
    const save = async () => {
        setLoading(true);
        try {
            let fromParts = startTime.split(':');
            let fromHours = parseInt(fromParts[0]);
            let fromMinutes = parseInt(fromParts[1]);
            let startTimeMoment = moment.from(item.date, 'fa', 'YYYY/MM/DD');
            startTimeMoment.set('hour', fromHours);
            startTimeMoment.set('minute', fromMinutes);
            startTimeMoment.set('second', 0);
            startTimeMoment = startTimeMoment.add(3, 'hour');
            startTimeMoment = startTimeMoment.add(30, 'minute');
            // console.log(startTimeMoment.format());
            console.log(`sample fromDateTime was=`, 1763456400000, moment(1763456400000).format());
            console.log(`generated fromDateTime is=`, startTimeMoment.valueOf(), moment(startTimeMoment.valueOf()).format());

            let toParts = endTime.split(':');
            let toHours = parseInt(toParts[0]);
            let toMinutes = parseInt(toParts[1]);
            let endTimeMoment = moment.from(item.date, 'fa', 'YYYY/MM/DD');
            endTimeMoment.set('hour', toHours);
            endTimeMoment.set('minute', toMinutes);
            endTimeMoment.set('second', 0);
            endTimeMoment = endTimeMoment.add(3, 'hour');
            endTimeMoment = endTimeMoment.add(30, 'minute');
            // console.log(toTimeMoment.format());
            console.log(`sample toDateTime was=`, 1763492400000, moment(1763492400000).format());
            console.log(`generated toDateTime is=`, endTimeMoment.valueOf(), moment(endTimeMoment).format());
            let durationMinutes = endTimeMoment.diff(startTimeMoment, 'minute', true);
            console.log(`duration minutes=`, durationMinutes);
            await ATTENDENCE_API.createDoorkari({
                employeeRef: 6305,
                durationMinutes,
                fromDateTime: startTimeMoment.valueOf(),
                toDateTime: endTimeMoment.valueOf(),
            });
            reload();
        }
        catch (err) {
            window.alert(err.toString());
        }
        finally {
            setLoading(false);
        }
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="default">اصلاح دورکاری</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>اصلاح دورکاری</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col gap-2 w-full">
                        <div className="w-full text-right">
                            وضعیت دورکاری روز {item.date}
                        </div>
                        <div className="flex flex-row items-center content-center gap-3">
                            <div className="w-[100px] font-bold">ساعت شروع:</div>
                            <Input
                                placeholder="00:00"
                                value={startTime}
                                onChange={e => setStartTime(e.target.value)}
                                readOnly={item.doorKariItem != undefined}
                            />
                        </div>
                        <div className="flex flex-row items-center content-center gap-3">
                            <div className="w-[100px] font-bold">ساعت پایان:</div>
                            <Input
                                placeholder="00:00"
                                value={endTime}
                                onChange={e => setEndTime(e.target.value)}
                                readOnly={item.doorKariItem != undefined}
                            />
                        </div>
                        <div className="flex flex-row items-center content-center gap-3">
                            <div className="w-[100px] font-bold">توضیحات:</div>
                            <Input
                                placeholder="00:00"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                readOnly={item.doorKariItem != undefined}
                            />
                        </div>
                        {item.doorKariItem == undefined ? undefined :
                            <>
                                <a target="_blank" className="text-blue-500 hover:text-blue-700 underline"
                                    href={`https://attendance.snappfood.ir/SnappPortal/~/hcm-mission-portal/mission-document/${item.doorKariItem.id}/`}>مشاهده و اصلاح در سامانه اصلی</a>
                            </>}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {loading ? <div>Loading...</div> :
                        <>
                            <AlertDialogCancel>بازگشت</AlertDialogCancel>
                            {item.doorKariItem != undefined ? undefined :
                                <AlertDialogAction onClick={async () => {
                                    save();
                                }}>ذخیره</AlertDialogAction>
                            }
                        </>
                    }
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
