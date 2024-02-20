import noticiasData from "../../base/json/noticias.json";
import { useState, useEffect } from "react";
import "../styles/new.css";

export default function NewsDashboard() {
  const storedCategoria = localStorage.getItem("categoriaSeleccionada");
  const initialCategoria = storedCategoria ? storedCategoria : "Todas";

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState(initialCategoria);
  const [paginaActual, setPaginaActual] = useState(1);
  const noticiasPorPagina = 2;

  const [noticiasFiltradas, setNoticiasFiltradas] = useState([]);
  const [noticiasFavoritas, setNoticiasFavoritas] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Actualizando noticias...");
      filtrarNoticias();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const filtrarNoticias = () => {
      const noticiasFiltradas =
        categoriaSeleccionada === "Todas"
          ? noticiasData.noticias
          : noticiasData.noticias.filter(
              (noticia) => noticia.categoria === categoriaSeleccionada
            );
      setNoticiasFiltradas(noticiasFiltradas);
    };

    filtrarNoticias();
  }, [categoriaSeleccionada]);

  useEffect(() => {
    localStorage.setItem("categoriaSeleccionada", categoriaSeleccionada);
    localStorage.setItem(
      "noticiasFavoritas",
      JSON.stringify(noticiasFavoritas)
    );
  }, [categoriaSeleccionada, noticiasFavoritas]);

  const handlePaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const handlePaginaSiguiente = () => {
    const totalPaginas = Math.ceil(
      noticiasFiltradas.length / noticiasPorPagina
    );
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const handleGuardarFavorita = (id) => {
    const noticiaFavorita = noticiasFiltradas.find(
      (noticia) => noticia.id === id
    );
    if (noticiaFavorita && !noticiasFavoritas[id]) {
      setNoticiasFavoritas((prevFavoritas) => ({
        ...prevFavoritas,
        [id]: noticiaFavorita,
      }));
    }
  };

  const handleToggleFavorita = (id) => {
    if (noticiasFavoritas[id]) {
      const { [id]: omit, ...rest } = noticiasFavoritas;
      setNoticiasFavoritas(rest);
    } else {
      handleGuardarFavorita(id);
    }
  };

  const noticiasPaginadas = noticiasFiltradas.slice(
    (paginaActual - 1) * noticiasPorPagina,
    paginaActual * noticiasPorPagina
  );

  const noticiasFavoritasArray = Object.values(noticiasFavoritas);

  return (
    <div className="feed">
      <h1>Feed de noticias</h1>

      <select
        className="select"
        value={categoriaSeleccionada}
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
        <option value="Todas">Todas las categorías</option>
        <option value="Tecnología">Tecnología</option>
        <option value="Deportes">Deportes</option>
        <option value="Belleza">Belleza</option>
        <option value="Cocina">Cocina</option>
        <option value="Manualidades">Manualidades</option>
        <option value="Redes sociales">Redes sociales</option>
        <option value="Política">Política</option>
        <option value="Moda">Moda</option>
        <option value="Arte">Arte</option>
        <option value="Educación">Educación</option>
      </select>

      <div className="columns">
        {noticiasPaginadas.map((noticia) => (
          <div key={noticia.id} className="card">
            <div className="heart-container" title="Like">
              <input
                type="checkbox"
                className="checkbox"
                id="Give-It-An-Id"
                checked={!!noticiasFavoritas[noticia.id]}
                onChange={() => handleToggleFavorita(noticia.id)}
              />
              <div className="svg-container">
                <svg
                  viewBox="0 0 24 24"
                  className="svg-outline"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className="svg-filled"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                </svg>
                <svg
                  className="svg-celebrate"
                  width="100"
                  height="100"
                  xmlns="http://www.w3.org/2000/svg">
                  <polygon points="10,10 20,20"></polygon>
                  <polygon points="10,50 20,50"></polygon>
                  <polygon points="20,80 30,70"></polygon>
                  <polygon points="90,10 80,20"></polygon>
                  <polygon points="90,50 80,50"></polygon>
                  <polygon points="80,80 70,70"></polygon>
                </svg>
              </div>
            </div>
            <h4>{noticia.titulo}</h4>
            <p>{noticia.descripcion}</p>
            <p>
              {" "}
              <strong>Autor:</strong> {noticia.fuente}
            </p>
            <p>
              {" "}
              <strong>Fuente:</strong> {noticia.fuente}
            </p>
            <h6 className={`categoria categoria-${noticia.categoria}`}>
              {" "}
              {noticia.categoria}
            </h6>
          </div>
        ))}
      </div>

      <div className="center">
        <button onClick={handlePaginaAnterior} disabled={paginaActual === 1}>
          Anterior
        </button>
        <span>
          Página {paginaActual} de{" "}
          {Math.ceil(noticiasFiltradas.length / noticiasPorPagina)}
        </span>
        <button
          onClick={handlePaginaSiguiente}
          disabled={
            paginaActual ===
            Math.ceil(noticiasFiltradas.length / noticiasPorPagina)
          }>
          Siguiente
        </button>
      </div>

      <div className="favoritas">
        <h1>Noticias favoritas</h1>
        {noticiasFavoritasArray.map((favorita) => (
          <div key={favorita.id} className="card">
            <h4>{favorita.titulo}</h4>
            <p>{favorita.descripcion}</p>
            <p>
              {" "}
              <strong>Autor:</strong> {favorita.fuente}
            </p>
            <p>
              {" "}
              <strong>Fuente:</strong> {favorita.fuente}
            </p>
            <h6 className={`categoria categoria-${favorita.categoria}`}>
              {" "}
              {favorita.categoria}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
}
