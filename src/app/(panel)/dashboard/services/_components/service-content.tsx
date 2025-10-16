import { getAllServices } from "../_data-access/gel-all-services";
import { ServicesList } from "./services-list";

interface ServicesContentProps {
    userId: string;
}

export async function ServicesContent({ userId }: ServicesContentProps) {

    const services = await getAllServices({ userId: userId});
    return(
        <div>
            <ServicesList services={services.data || []}/>
        </div>
    )
}