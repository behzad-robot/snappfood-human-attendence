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
export function FoodousDialog() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-cs text-red-500">اهدای فودوس 🫶</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>سامانه ثبت تردد انسان دوست</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col gap-2 w-full items-center content-center mt-2 text-right">
                        <span className="w-full text-right text-red-400">در صورتی که از این افزونه استفاده میکنید و مایل هستید در سامانه فودوس به سازنده فودوس بدهید.</span>

                        <b>افزونه کروم ساخته شده توسط:</b>
                        <div className="w-full flex flex-row gap-2 items-center content-center justify-center">
                            <img src="behzad.png" alt="behzad" className="w-12 h-12" style={{ borderRadius: '50%' }} />
                            <span>behzad abedinzadeh</span>
                        </div>
                        <b>سورس کد گیت هاب:</b>
                        <a className="text-blue-400" href="https://github.com/behzad-robot/snappfood-human-attendence" target="_blank">
                            https://github.com/behzad-robot/snappfood-human-attendence
                        </a>
                        <span>
                            در صورتی که developer هستید میتوانید به این repo کمک کنید و merge request بزنید.
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>بازگشت</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
