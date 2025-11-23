import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
// const normalise = s => s.replace(/[\u200E\u200F]/g, '');
export function GuideDialog() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-cs">📗 راهنمای استفاده</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>📗 راهنمای استفاده</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col gap-4 w-full items-center content-start justify-start mt-2 text-right max-h-[80vh] overflow-y-scroll">
                        <img src="guide-0.png" className="w-full"/>
                        <p className="font-bold text-md w-full text-right">مرحله اول: ابتدا سامانه اصلی را باز کنید و لاگین کنید.</p>
                        <img src="guide-1.png"/>
                        <p className="font-bold text-md w-full text-right">مرحله دوم:پاپ آپ باز شده اگر تیک خورده بود روی بزن بریم بزنید.</p>
                        <p className="text-sm">اگر پاپ آپ اتوماتیک باز نشد روی آیکون extension بزنید‌( ترجیحا extension را pin کنید(</p>
                        <b>نکات مهم:</b>
                        <p>هر چند ساعت یکبار ممکن است نیاز به لاگین مجدد داشته باشید.به زمان گذشته از آخرین دریافت توکن دقت کنید.</p>
                        <p>به صفحه لیست امکانات دقت کنید در حال حاضر روزهایی که ثبت حضوری میکنید فقط به صورت local ذخیره میشوند و با سامانه سینک نیست.</p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>بازگشت</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
