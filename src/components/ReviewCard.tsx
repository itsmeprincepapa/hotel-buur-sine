// src/components/ReviewCard.tsx
import { Review } from '../types/review.types';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white border border-[#EADFC5] p-6 h-full flex flex-col">
      <StarRating note={review.note} className="mb-3" />
      <p className="text-sm text-[#5C5348] italic mb-4 flex-1">"{review.commentaire}"</p>
      <div className="flex items-center justify-between text-sm">
        <p className="font-display text-[#201C18]">{review.nom}</p>
        <p className="text-[#8A5A34]">{review.pays}</p>
      </div>
      <p className="text-xs text-[#B0A98F] mt-1">{review.date}</p>
    </div>
  );
}
