
import type { Route } from "./+types/home";
import { Welcome } from "./welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dulce Alma" },
    { name: "description", content: "Bienvenido a Dulce Alma!" },
    
  ];
}

export default function Home() {
  return <Welcome />;
}



