import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Home() {
  return (
    <div className="flex h-screen bg-blue-400 w-full items-center justify-center">
      Home
    </div>
  );
}
