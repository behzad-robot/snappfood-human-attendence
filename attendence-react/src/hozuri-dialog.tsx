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
const normalise = s => s.replace(/[\u200E\u200F]/g, '');
export function HozuriDialog({ item, reload }: { item: KarItem, reload: Function }) {
    const [startTime, setStartTime] = useState(item.hozuriItem?.startTime ?? '9:00');
    const [endTime, setEndTime] = useState(item.hozuriItem?.endTime ?? '18:00');
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
                        توجه: این قسمت فقط در مروگر شما ذخیره میشود و در حال حاضر با ثبت تردد و اثر انگشت سینک نمیباشد.
                        </div>
                        <div className="flex flex-row items-center content-center gap-3">
                            <b>شروع:</b>
                            <Input
                                placeholder="00:00"
                                value={startTime}
                                onChange={e => setStartTime(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-row items-center content-center gap-3">
                            <b>پایان:</b>
                            <Input
                                placeholder="00:00"
                                value={endTime}
                                onChange={e => setEndTime(e.target.value)}
                            />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>بازکشت</AlertDialogCancel>
                    <AlertDialogAction onClick={async () => {
                        let _items = await ATTENDENCE_API.getHozuriList();
                        let newItem = { date: item.date, startTime, endTime };
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
