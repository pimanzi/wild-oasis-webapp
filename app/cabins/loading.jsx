import Spinner from '@/app/_components/Spinner';

export default function Looder() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Spinner></Spinner>
      <p className="text-xl text-primary-200">Loading cabin data</p>
    </div>
  );
}
