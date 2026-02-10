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
import type { HozuriItem } from "./data/hozuri_item";
const normalise = s => s.replace(/[\u200E\u200F]/g, '');
export function HozuriDialog({ item, reload }: { item: KarItem, reload: Function }) {
    const [startTime, setStartTime] = useState(item.localHouzriItem?.startTime ?? '9:00');
    const [endTime, setEndTime] = useState(item.localHouzriItem?.endTime ?? '18:00');
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="secondary">اصلاح حضوری</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>اصلاح حضوری</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="text-right">
                            توجه: زمان شروع و پایانی که وارد میکنید برای لیست خودتان است و ممکن است با زمان ثبتی سیستم متفاوت باشد.همچنین زمان های حضوری ممکن است با تاخیر بروزرسانی شوند.
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <div className="flex flex-row items-center content-center gap-3">
                                <b className="w-16 text-right">شروع:</b>
                                <Input
                                    placeholder="00:00"
                                    value={startTime}
                                    onChange={e => setStartTime(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-row items-center content-center gap-3">
                                <b className="w-16 text-right">پایان:</b>
                                <Input
                                    placeholder="00:00"
                                    value={endTime}
                                    onChange={e => setEndTime(e.target.value)}
                                />
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="w-full text-right">
                            <div className="w-full flex flex-row items-center content-center mb-2 gap-1">
                                <h3 className="font-bold text-black text-lg">وضعیت سیستمی:</h3>
                                <div className="bg-orange-300 text-xs text-black py-1 px-2 rounded-2xl">با تاخیر بروز میشود</div>
                                <div className="grow" />
                            </div>
                            {item.apiHozuriItem == undefined || item.apiHozuriItem?.status_dtos.length == 0 ?
                                <div>نامشخص</div>
                                :
                                <>
                                    {item.apiHozuriItem.status_dtos.map((dto, index) => {
                                        return (
                                            <div className="w-full py-3" key={index}>
                                                <div className="w-full grid grid-cols-4 text-center">
                                                    <span className="text-xs">{dto.aaA_Range}</span>
                                                    <span className="text-xs">{dto.dayTitle}</span>
                                                    <span className="font-black" style={{ color: dto.attendanceStatusColor }}>{dto.attendanceStatusTitle}</span>
                                                    <span>{dto.startRfidGateTitle}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            }
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>بازگشت</AlertDialogCancel>
                    <AlertDialogAction onClick={async () => {
                        let _items = await ATTENDENCE_API.getLocalHozuriList();
                        let newItem: HozuriItem = { date: item.date, startTime, endTime, status_dtos: [] };
                        let index = _items.findIndex(t => normalise(item.date) == normalise(t.date));
                        if (index == -1)
                            _items.push(newItem);
                        else
                            _items[index] = newItem;
                        await ATTENDENCE_API.setHozuriList(_items);
                        reload();
                    }}>ذخیره</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
