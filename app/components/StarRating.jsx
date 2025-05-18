'use client';

export default function StarRating({ rating, size = 'md', showNumber = true }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  const starSize = starSizes[size] || starSizes.md;

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} className={`${starSize} text-yellow-400`} filled />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <StarIcon className={`${starSize} text-yellow-400`} half />
        )}
        
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon key={`empty-${i}`} className={`${starSize} text-gray-300`} />
        ))}
      </div>
      
      {showNumber && (
        <span className="text-sm text-gray-600 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

function StarIcon({ className, filled, half }) {
  if (half) {
    return (
      <svg className={className} viewBox="0 0 20 20" fill="currentColor">
        <defs>
          <linearGradient id="half-fill">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="#D1D5DB" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half-fill)"
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      />
    </svg>
  );
} 