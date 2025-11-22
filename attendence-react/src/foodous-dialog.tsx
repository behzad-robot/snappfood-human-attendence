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
                    <AlertDialogDescription className="flex flex-col gap-2 w-full items-center content-center mt-2">
                        <b>افزونه کروم ساخته شده توسط:</b>
                        <span>behzad abedinzadeh</span>
                        <b>سورس کد گیت هاب:</b>
                        <a className="text-blue-400" href="https://github.com/behzad-robot/snappfood-human-attendence" target="_blank">
                            https://github.com/behzad-robot/snappfood-human-attendence
                        </a>
                        <span className="w-full text-right">در صورتی که از این افزونه استفاده میکنید و مایل هستید در سامانه فودوس به سازنده فودوس بدهید.</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>بازگشت</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
