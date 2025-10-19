import { getTimesBusiness } from "../../_data-access/get-times-business"
import { CalendarList } from "./calendar-list";

export async function Calendar({userId}: {userId: string}) {

    const { times, userId: id} = await getTimesBusiness({userId: userId});

    return (
        <CalendarList times={times}/>
    )
}