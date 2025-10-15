import { SidebarDashboard } from "./_components/sidebar";
import { Toaster } from 'sonner';

export default function DashboardLayout({
    children,
}: {
    children:React.ReactNode
}) {
    return (
        <>
            <SidebarDashboard>
                <Toaster duration={2500}/>
                {children}
            </SidebarDashboard>
        </>
    )
}