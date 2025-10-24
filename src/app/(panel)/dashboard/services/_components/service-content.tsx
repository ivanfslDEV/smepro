import { CanPermission } from "@/utils/permissions/canPermission";
import { getAllServices } from "../_data-access/gel-all-services";
import { ServicesList } from "./services-list";

interface ServicesContentProps {
    userId: string;
}

export async function ServicesContent({ userId }: ServicesContentProps) {

    const services = await getAllServices({ userId: userId});
    const permissions = await CanPermission({type: "service"});

    return(
        <div>
            <ServicesList services={services.data || []} permission={permissions}/>
        </div>
    )
}