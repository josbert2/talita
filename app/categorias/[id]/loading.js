import Skeleton from "../../../components/Skeleton"

export default function Loading(){
    return (
        <div className="grid grid-cols-2 gap-6 space-y-6">
            <div className="space-y-2">
                <Skeleton className="w-[100%] h-[20.25rem]"/>
            </div>
            <div className="space-y-2">
                <Skeleton className="w-[30ch] h-[1.25rem]"/>
                <Skeleton className="w-[45ch] h-[1rem]"/>
                <Skeleton className="w-[45ch] h-[1rem]"/>
                <Skeleton className="w-[45ch] h-[1rem]"/>
                <div class="pt-6">
                    <Skeleton className="w-[100%] h-[1rem]"/>
                </div>
            </div>
        </div>
    )
}