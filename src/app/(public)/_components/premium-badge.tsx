import { Star } from "lucide-react";

export function PremiumCardBadge(){
    return(
        <div className="absolute top-2 right-2 bg-warning w-12 h-12 z-[2] rounded-full flex items-center justify-center">
            <Star className="text-warning-foreground"/>
        </div>
    )
}
