import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className }: SkeletonProps): JSX.Element {
  return <div className={cn("h-4 w-[550px] rounded-md bg-white/5", className)} />;
}
