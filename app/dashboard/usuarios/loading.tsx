import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="p-8 pt-10 flex flex-col gap-5 ">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-4xl font-medium  ">Usuarios</h1>
        {/* <Link href={"usuarios/create"}>
      <Button className="flex gap-2 text-xs pl-2.5 capitalize py-2 h-auto bg-indigo-600 hover:bg-indigo-700 text-white">
        <Lucide_Icon name="Plus" size={18} />
        <span>nuevo usuario</span>
      </Button>
    </Link> */}
      </div>
      <Skeleton className="w-full h-56  mt-5  bg-white  " />
      {/* <div className="bg-white rounded-xl py-2h-60 animate-pulse ">
        
      </div> */}
    </div>
  );
}
