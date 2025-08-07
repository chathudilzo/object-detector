import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="absolute top-0 flex w-full md:px-16 lg:px-32 px-8 py-6 justify-between items-center border border-b-2">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          src={"/logo.png"}
          alt="logo"
          width={50}
          height={50}
        />
        <h3 className="text-xl font-bold text-white">Visionary</h3>
      </div>

      <ul className="flex gap-4">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/Recordings"}>Recordings</Link>
        </li>
        <li>
          <Link href={"/live"}>Live</Link>
        </li>
        <li>
          <Link href={"/Recordings"}>Recordings</Link>
        </li>
        <li>
          <Link href={"/Share"}>Share</Link>
        </li>
        <li>
          <Link href={"/contact"}>contact</Link>
        </li>

        <div className="rounded-full bg-white">
          <Image src={"/globe.svg"} alt="profile" width={40} height={40} />
        </div>
      </ul>
    </div>
  );
};

export default NavBar;
