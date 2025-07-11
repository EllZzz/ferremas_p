import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";

interface Review {
  idReview: number;
  review_name: string;
  review_rating: number;
  review_desc: string;
  fk_idUser: number;
  fk_idProduct: number;
}

interface NewReview {
  review_name: string;
  review_rating: number;
  review_desc: string;
}

interface Props {
  onLoginRequest: () => void;
}

export default function UserReview({ onLoginRequest }: Props) {
  const { id } = useParams<{ id: string }>();
  const idProduct = Number(id);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [newReview, setNewReview] = useState<NewReview>({
    review_name: "",
    review_rating: 0,
    review_desc: "",
  });
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (!idProduct) return;

    fetch(`http://localhost:5000/api/reviews?fk_idProduct=${idProduct}`)
      .then((res) => res.json())
      .then(setReviews)
      .catch((err) => console.error("Error al cargar reviews:", err));

    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [idProduct]);

  const handleAddReview = async () => {
    const { review_name, review_desc, review_rating } = newReview;

    if (!review_name.trim() || !review_desc.trim()) {
      setErrorMsg("Por favor escriba una reseña antes de enviarla.");
      return;
    }

    if (review_rating === 0) {
      setErrorMsg("Debes seleccionar una puntuación entre 1 y 5 estrellas.");
      return;
    }

    setErrorMsg("");

    const res = await fetch(`http://localhost:5000/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...newReview,
        fk_idProduct: idProduct,
      }),
    });

    if (res.ok) {
      const added = await res.json();
      setReviews([...reviews, added]);
      setNewReview({ review_name: "", review_rating: 0, review_desc: "" });
    } else {
      setErrorMsg("Error al publicar la reseña. Inténtalo de nuevo.");
    }
  };

  const renderStars = (count: number) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={18}
        className={i < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
      />
    ));

  return (
    <div className="mt-10 border-t pt-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Opiniones de usuarios</h3>

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((rev) => (
            <div key={rev.idReview} className="border rounded p-4 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                {renderStars(rev.review_rating)}
              </div>
              <h4 className="font-semibold text-gray-800">{rev.review_name}</h4>
              <p className="text-gray-600 text-sm">{rev.review_desc}</p>
              <p className="text-xs text-gray-400 italic">Usuario #{rev.fk_idUser}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-6">Este producto aún no tiene reseñas.</p>
      )}

      <div className="mt-8">
        {!isLoggedIn ? (
          <div className="p-4 border border-gray-300 rounded text-gray-600 bg-gray-50">
            <p>¿Deseas agregar una reseña?</p>
            <button
              onClick={onLoginRequest}
              className="mt-2 text-blue-700 underline hover:text-blue-900"
            >
              Inicia sesión para dejar una reseña
            </button>
          </div>
        ) : (
          <div className="p-4 border rounded bg-gray-50 space-y-3">
            <h4 className="text-md font-bold">Agrega tu reseña</h4>

            {/* Notificación de error */}
            {errorMsg && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                {errorMsg}
              </div>
            )}

            <input
              type="text"
              placeholder="Título (ej. Excelente producto)"
              value={newReview.review_name}
              onChange={(e) =>
                setNewReview({ ...newReview, review_name: e.target.value })
              }
              className="w-full border p-2 rounded text-sm"
            />
            <textarea
              placeholder="Escribe tu opinión..."
              value={newReview.review_desc}
              onChange={(e) =>
                setNewReview({ ...newReview, review_desc: e.target.value })
              }
              className="w-full border p-2 rounded text-sm"
              rows={3}
            />
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() =>
                    setNewReview({ ...newReview, review_rating: rating })
                  }
                >
                  <Star
                    size={20}
                    className={
                      rating <= newReview.review_rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
            <button
              onClick={handleAddReview}
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Publicar reseña
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
