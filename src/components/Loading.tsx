import { CircleNotch } from "@phosphor-icons/react";

export function Loading() {
  return (
    <div className="flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] z-50">
      <div className="p-4 rounded-lg bg-zinc-100 flex flex-col items-center gap-4">
        <CircleNotch
          size={42}
          weight="bold"
          className="animate-spin text-zinc-900"
        />
        <span className="font-medium font-poppins text-lg">
          Loading recipes...
        </span>
      </div>
    </div>
  );
}
