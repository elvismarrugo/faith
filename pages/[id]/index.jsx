import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Movie from "../../models/Movie";

const MoviePage = ({ success, error, movie }) => {
  const router = useRouter();

  if (!success) {
    return (
      <div className="container mx-auto text-center my-5">
        <h1>{error} 🤦‍♂️</h1>

        <Link href="/" className="bg-movies-green text-white rounded my-2 w-full">
          Volver...
        </Link>
      </div>
    );
  }

  const deleteData = async (id) => {
    try {
      await fetch(`/api/movie/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1>Detalle de Movie</h1>
      <div className="max-w-sm rounded overflow-hidden shadow-lg"> {/* card */}
        <div className="max-w-sm rounded overflow-hidden shadow-lg"> {/* card-body */}
          <div className="max-w-sm rounded overflow-hidden shadow-lg"> {/* card-title */}
            <h5 className="text-uppercase">{movie.title}</h5>
          </div>
          <p className="fw-light">{movie.plot}</p>
          <Link href="/" className="bg-yellow-500 text-white rounded mx-24 px-3 py-3">
            Volver...
          </Link>
          <Link href={`/${movie._id}/edit`} className="bg-yellow-500 text-white rounded mx-24 px-3 py-3"> 
            Editar
          </Link>
          <button
            className="bg-red-500 text-white rounded mx-24 px-3 py-3" //btn btn-danger btn-sm
            onClick={() => deleteData(movie._id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;

export async function getServerSideProps({ params }) {
  try {
    await dbConnect();

    const movie = await Movie.findById(params.id).lean();

    if (!movie) {
      return { props: { success: false, error: "pelicula no encontrada" } };
    }

    console.log(movie);
    movie._id = `${movie._id}`;

    return { props: { success: true, movie } };
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return { props: { success: false, error: "id no válido" } };
    }
    return { props: { success: false, error: "Error de servidor" } };
  }
}
