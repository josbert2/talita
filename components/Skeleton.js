export default function Skeleton({ className }){
    return <div className={`bg-slate-200 motion-safe:animate-pulse rounded ${className}`} />;
}