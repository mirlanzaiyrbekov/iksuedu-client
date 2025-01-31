import { Separator } from "../ui/separator";

export const Header = () => {
  return (
    <div className="flex flex-col gap-1.5 bg-primary/90">
      <div className="flex items-center justify-between py-2 px-10">
        <div className="p-2">
          <span className="text-white font-bold">IKSU - Academy</span>
        </div>
        <div className="flex items-center gap-2 text-white">
          Username
          <div className="w-9 h-9 rounded-full bg-muted/95"></div>
        </div>
      </div>
      <Separator />
    </div>
  );
};
