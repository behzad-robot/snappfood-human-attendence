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
export function HelperLinksDialog() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-cs">دسترسی سریع</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>لینک های سامانه اصلی</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col gap-4 w-full items-center content-center mt-2 text-right">
                        <a className="text-blue-400 hover:text-blue-600" target="_blank" href="https://attendance.snappfood.ir/SnappPortal/~/hcm-mission-portal/list-mission-documents/?componentName=SystemGroup.HCM.Mission&entity=MissionDocument&view=PortalSelfServiceMissionDocuments">لیست دورکاری ها</a>
                        <a className="text-blue-400 hover:text-blue-600" target="_blank" href="https://attendance.snappfood.ir/SnappPortal/~/hcm-leave-portal/list-leave-requests/?componentName=SystemGroup.HCM.Leave&entity=LeaveRequest&view=PortalAllSelfServiceEmployeeLeaveRequests">لیست مرخصی ها</a>
                        <a className="text-blue-400 hover:text-blue-600" target="_blank" href="https://attendance.snappfood.ir/SnappPortal/~/hcm-attendance-portal/attendance-status-report/">وضعیت تردد</a>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>بازگشت</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
