import CabinCard from '@/app/_components/CabinCard';
import { getCabins } from '../_lib/data-service';
import { unstable_noStore as noStore } from 'next/cache';

async function CabinsList() {
  // noStore();
  const cabins = await getCabins();

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinsList;
