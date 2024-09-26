import SkeletonCard from "@/components/skeleton-card";

export default function Loading(): JSX.Element {
  return (
    <div className="flex flex-wrap max-w-[1100px] justify-center mx-auto px-[20px] py-24 gap-20">
      {Array.from({ length: 9 }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
