import react from 'react'
const PhotoCard = ({ photo, isFavorite, onToggleFavorite }) => {
  return (
    <article className="group overflow-hidden rounded-3xl border border-[#f3e3e9] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-100/70">
      <div className="relative overflow-hidden bg-[#fce8ef]">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/450`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={() => onToggleFavorite(photo)}
          aria-label={
            isFavorite
              ? `Remove photo by ${photo.author} from favourites`
              : `Add photo by ${photo.author} to favourites`
          }
          aria-pressed={isFavorite}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-xl shadow-md backdrop-blur transition ${
            isFavorite
              ? 'bg-[#d86f94] text-white'
              : 'bg-white/90 text-[#a65c79] hover:bg-[#d86f94] hover:text-white'
          }`}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#c08ba0]">
          Captured by
        </p>

        <h3 className="mt-1 truncate text-base font-bold text-[#39242d]">
          {photo.author}
        </h3>

        <p className="mt-2 text-xs text-[#b9a3ac]">
          Photo ID: {photo.id}
        </p>
      </div>
    </article>
  )
}

export default PhotoCard
