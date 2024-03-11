import CitySearchBar from "@/components/CitySearchBar/CitySearchBar";
import Navbar from "@/components/Navbar/Navbar";
import NavbarLink from "@/components/NavbarLink/NavbarLink";
import { ubuntuBold } from "@/fonts/ubunfu";
import Link from "next/link";

export default function Home() {
  return (
    <header className='flex justify-center w-full min-w-full p-4 header h-fit '>
      <div className='flex flex-wrap justify-around w-4/5 h-full min-h-full gap-4 header__container'>
        <div className='flex header__left'>
          <Link href={'/'} className='self-center header__title w-fit h-fit'>
            <h2 className='title__text w-fit h-fit'>
              <span className={`title__bule text-[1.7rem] text-[var(--sky-color)] ${ubuntuBold.className}`}>
                날씨
              </span>
              {" +"}
              <span className={`title__black text-[1.7rem] text-black ${ubuntuBold.className}`}>
                앱
              </span>
            </h2>
          </Link>
          <div className='header__split w-[1px] h-1/2 bg-slate-300 self-center mx-6' />
          <Navbar>
            <NavbarLink href={'/'} >
              Home
            </NavbarLink>
            <NavbarLink href={'/about'} >
              About
            </NavbarLink>
          </Navbar>
        </div>
        <div className='self-center header__right'>
          <CitySearchBar />
        </div>
      </div>
    </header>
  );
}
