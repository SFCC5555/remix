// src/routes/$page.tsx
import { useParams } from "@remix-run/react";
import { pages } from "../pageData";

export default function Page() {
  const { page } = useParams(); // "page" será el valor dinámico de la URL
  const pageData = pages.find((p) => p.slug === page);

  if (!pageData) {
    return (
      <div>
        <h1>404 - Página no encontrada</h1>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{pageData.title}</h1>
      <p>Esta es la página de {pageData.title}.</p>
    </div>
  );
}
