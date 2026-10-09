import Banner from "@/components/Banner";
import AllProducts from "@/components/products/AllProducts";
import DecreasePrice from "@/components/products/DecreasePrice";
import IncreasePrice from "@/components/products/IncreasePrice";

export default function Home() {
  return (
    <div>
      <Banner />
      <IncreasePrice />
      <DecreasePrice />
      <AllProducts />
    </div>
  );
}
