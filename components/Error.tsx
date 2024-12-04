import { toast } from 'sonner';

export default function Error({ error }: { error: Error }) {
  toast.error(error.message);

  return (
    <div className="w-full h-full bg-black/5 grid place-content-center">
      <h1 className="text-3xl font-bold text-black/90">
        Oops! Something went wrong
      </h1>
      <p className="text-lg text-black/70 text-center mt-2">
        Refresh the page or try again later
      </p>
    </div>
  );
}
