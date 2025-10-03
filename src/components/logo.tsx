import { BrainCircuit } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-primary-foreground group-data-[variant=floating]:text-sidebar-foreground group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:justify-center">
      <BrainCircuit className="h-7 w-7 text-primary group-data-[sidebar]:text-inherit" />
      <span className="font-headline text-xl font-bold group-data-[collapsible=icon]:hidden">
        Synapse
      </span>
    </div>
  );
}
