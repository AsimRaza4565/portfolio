import { Button } from "@/components/ui/button";
import Link from "next/link";

function Buttons() {
  return (
    <div className="flex md:justify-start xs:w-full xs:justify-center sm:w-full md:block ">
      <div className="flex gap-5 items-center">
        <Button className="cursor-pointer md:text-lg sm:px-4 sm:py-6 xs:px-2 xs:py-3 hover:scale-105 shadow-sm shadow-gray-700">
          <a href="/AsimRaza.pdf" download={"AsimRaza.pdf"} title="">
            Download CV
          </a>
        </Button>
        <Button
          variant="outline"
          className="cursor-pointer text-black hover:scale-105 xs:text-md md:text-lg md:px-4 md:py-6 xs:px-2 xs:py-3 flex items-center hover:bg-gray-300 hover:outline-none shadow-sm shadow-gray-500"
        >
          <Link href={"#projects"}>See My Work &rarr;</Link>
        </Button>
      </div>
    </div>
  );
}

export default Buttons;
