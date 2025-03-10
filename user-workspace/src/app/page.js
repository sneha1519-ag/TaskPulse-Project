import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Button variant="my_variant">TaskPulse</Button>
      </main>
  );
}
