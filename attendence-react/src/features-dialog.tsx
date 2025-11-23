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
export function FeaturesDialog() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-cs">امکانات</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>امکانات نسخه 0.0.4</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col gap-4 w-full items-center content-start justify-start mt-2 text-right max-h-[80vh] overflow-y-scroll">
                        <ul>
                            <li>✅ لیست دورکاری ها با سامانه اصلی سینک است.</li>
                            <li>✅ ثبت دورکاری با سامانه اصلی سینک است.</li>
                            <li>✅ لیست مرخصی ها با سامانه اصلی سینک است.</li>
                            <li>🔔 یادآور ثبت تردد هر دوساعت یکبار!</li>
                            <li>❌ امکان ثبت آسان مرخصی</li>
                            <li>❌ لیست حضوری و ثبت حضوری با سامانه اصلی سینک نیست! </li>
                        </ul>
                        <div className="w-full text-center text-xs">
                            <p>برای دریافت نسخه جدید به repo در گیت هاب و قسمت releases مراجعه کنید:</p>
                            <a className="underline text-blue-300" target="_blank" href="https://github.com/behzad-robot/snappfood-human-attendence/releases">
                                https://github.com/behzad-robot/snappfood-human-attendence/releases
                            </a>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>بازگشت</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
