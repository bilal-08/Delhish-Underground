import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function CardSkeleton() {

return <>
    <div className="mt-6 min-h-[65%] grid grid-cols-2 md:grid-cols-3 gap-1 pb-24 max-sm:min-h-[100%]">
    <Skeleton className="flex flex-col h-full object-cover" alt="">
    </Skeleton>
    <Skeleton className="flex flex-col h-full object-cover">
    </Skeleton>
    <Skeleton className="flex flex-col h-full object-cover">
    </Skeleton>

</div>
</>
}

export default CardSkeleton;