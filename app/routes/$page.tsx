// src/routes/$page.tsx
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// Loader para hacer el fetch de la API
export const loader: LoaderFunction = async ({ params }) => {
  const { page } = params; // Obtenemos el slug de la URL

  try {
    // Hacemos el fetch a la API de Strapi para obtener los datos de la página
    const res = await fetch(
      `http://localhost:1337/api/pages?locale=es&filters[slug][$eq]=${page}&populate=*`
    );

    // Verificamos si la respuesta fue exitosa
    if (!res.ok) {
      throw new Error("Error al obtener los datos de la API");
    }

    // Parseamos la respuesta JSON
    const data = await res.json();

    // Verificamos si encontramos la página con el slug correspondiente
    if (data.data.length === 0) {
      throw new Error("Página no encontrada");
    }

    // Si todo está bien, devolvemos los datos de la página
    return json({ pageData: data.data[0] });
  } catch (error) {
    // En caso de error, devolvemos un mensaje de error
    throw new Response(error.message || "Error interno del servidor", {
      status: 500,
    });
  }
};

// Componente para renderizar la página
export default function Page() {
  // Obtenemos los datos del loader
  const { pageData } = useLoaderData();

  // Si no encontramos los datos de la página, mostramos un 404
  if (!pageData) {
    return (
      <div>
        <h1>404 - Página no encontrada</h1>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
      </div>
    );
  }

  // Renderizamos los datos de la página, en este caso solo el slug para empezar
  return (
    <div>
      <h1>Datos de la página:</h1>
      <p>Slug de la página: {pageData.slug}</p>
    </div>
  );
}
