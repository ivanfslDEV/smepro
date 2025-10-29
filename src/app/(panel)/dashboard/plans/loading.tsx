import { Loader } from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center py-20">
      <Loader label="Loading..." size="lg" />
    </div>
  );
}
