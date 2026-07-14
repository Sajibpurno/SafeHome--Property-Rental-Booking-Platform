"use client";

import { useState } from "react";

const mockReviews = [
  { id: 1, name: "Tenant", rating: 5, comment: "Good" },
  { id: 2, name: "Hamba", rating: 5, comment: "Ful bokacoda" },
];

export default function ReviewBox({ propertyId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(mockReviews);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const newReview = {
      id: Date.now(),
      name: "You",
      rating: Number(rating),
      comment,
    };
    setReviews([...reviews, newReview]);
    setComment("");
    setRating(5);
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4">Reviews & Comments</h2>

      {/* Submit Form */}
      <form onSubmit={handleSubmit} className="border border-gray-200 rounded-xl p-4 mb-5 flex flex-col gap-3">
        <div className="flex gap-3">
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-16 border border-gray-200 rounded-lg px-3 h-10 text-sm outline-none text-gray-700"
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            rows={2}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none resize-none text-gray-700 placeholder:text-gray-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition"
        >
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      <div className="flex flex-col gap-3">
        {reviews.map((r) => (
          <div key={r.id} className="border border-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-gray-700 capitalize">{r.name}</span>
              <span className="text-yellow-400 text-sm">{"★".repeat(r.rating)}</span>
            </div>
            <p className="text-sm text-blue-500">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}