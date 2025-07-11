import models from "../models/index.js";
const { Review, User, Product } = models;

export const getAllReviews = async (req, res) => {
  try {
    const { fk_idProduct } = req.query;
    const where = fk_idProduct ? { fk_idProduct } : {};

    const reviews = await Review.findAll({
    where,
    include: [
      { model: User, as: "reviewUser", attributes: ["idUser", "name", "email"] },
      { model: Product, as: "reviewProduct", attributes: ["idProduct", "product_name"] }
    ]
  });


    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reseñas", error: error.message });
  }
};


export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id, {
      include: [
        { model: User, as: "user", attributes: ["idUser", "name", "email"] },
        { model: Product, as: "product", attributes: ["idProduct", "product_name"] }
      ],
    });

    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la reseña", error: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    console.log("Payload del token:", req.user);
    const { review_name, review_rating, review_desc, fk_idProduct } = req.body;
    const fk_idUser = req.user?.idUser;

    if (!review_name || !review_desc || !review_rating || !fk_idProduct || !fk_idUser) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const newReview = await Review.create({
      review_name,
      review_rating,
      review_desc,
      fk_idProduct,
      fk_idUser,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error en createReview:", error);
    res.status(500).json({ message: "Error al crear la reseña", error: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la reseña", error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Review.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    res.json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reseña", error: error.message });
  }
};
