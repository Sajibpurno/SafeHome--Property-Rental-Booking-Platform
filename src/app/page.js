import Image from "next/image";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="">
      <Navbar/>
      <Banner/>
      <Footer/>
    </div>
  );
}
