import { cn } from "@/utilities/helper";

export default function Skeleton({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            className={cn("animate-pulse block w-full rounded bg-zinc-200 dark:bg-zinc-700", className)}
            {...props}
        />
    )
}