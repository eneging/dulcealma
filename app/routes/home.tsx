
import type { Route } from "./+types/home";
import { Welcome } from "./welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Puerto Rico Restobar" },
    { name: "description", content: "Bienvenido a Puerto Rico restobar!" },
    
  ];
}

export default function Home() {
  return <Welcome />;
}



