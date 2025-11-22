import { useEffect, useState } from "react"
import { ATTENDENCE_API } from "./api/attendence_api";

export function UserInfoView() {
    const [loading, setLoading] = useState<boolean>(true);
    const [display, setDisplay] = useState<string>('');
    const fetchData = async () => {
        try {
            setLoading(true);
            let name = await ATTENDENCE_API.getEmployeeName();
            let ref = await ATTENDENCE_API.getCurrentEmployeeId();
            setDisplay(name + '-' + ref);
        }
        catch (err) {

        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="text-right">
            {loading ? "در حال بارگذاری..." : undefined}
            <b>{display}</b>
        </div>
    )
}