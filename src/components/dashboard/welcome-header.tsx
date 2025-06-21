import Image from "next/image";

export function WelcomeHeader() {
  return (
    <div className="relative w-full h-56 rounded-lg overflow-hidden shadow-lg">
      <Image
        src="https://placehold.co/1200x400.png"
        alt="Financial planning illustration"
        fill
        className="object-cover"
        data-ai-hint="finance planning"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Welcome back, User!</h1>
        <p className="text-lg text-white/90 mt-2 max-w-2xl">Here's a summary of your financial health.</p>
      </div>
    </div>
  );
}
