import HeaderTopBar from "./HeaderTopBar";
import MainHeader from "./MainHeader";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="w-full flex justify-center flex-col relative z-40 bg-background">
      <HeaderTopBar />
      <MainHeader />
      <Navbar />
    </header>
  );
}
