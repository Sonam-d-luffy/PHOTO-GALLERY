import { useState, useReducer, useEffect, useCallback } from 'react'
import Navbar from '../components/Navbar'
import useFetchPhotos from '../hooks/useFetchPhotos'
import favoritesReducer from '../reducer/favoritesReducer'
import PhotoCard from '../components/PhotoCard'

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos()
  const [filteredPhotos, setFilteredPhotos] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)

  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    [],
    () => {
      try {
        return JSON.parse(localStorage.getItem('favorites')) || []
      } catch {
        return []
      }
    }
  )

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    setFilteredPhotos(photos)
  }, [photos])

  const handleFilter = useCallback((filtered) => {
    setFilteredPhotos(filtered)
    setShowFavorites(false)
  }, [])

  const toggleFavorite = useCallback((photo) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: photo })
  }, [])

  const displayedPhotos = showFavorites ? favorites : filteredPhotos

  return (
    <div className="min-h-screen bg-[#fff9fb]">
      <Navbar photos={photos} onFilter={handleFilter} />

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <section className="mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#c47794]">
            A little corner of the internet
          </p>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-4xl font-black tracking-tight text-[#39242d] sm:text-5xl">
                Find your <span className="text-[#d86f94]">moment.</span>
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-[#9b818c]">
                A collection of beautiful frames, gathered in one place.
                Explore, discover, and save your favourites.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowFavorites((previous) => !previous)}
              className={`rounded-2xl px-5 py-3 text-sm font-bold transition ${
                showFavorites
                  ? 'bg-[#d86f94] text-white'
                  : 'border border-[#f0dce4] bg-white text-[#9d5d77] hover:bg-[#fce8ef]'
              }`}
            >
              {showFavorites
                ? '♡ Show all photos'
                : `♥ Favourites (${favorites.length})`}
            </button>
          </div>
        </section>

        {loading && (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#f5c6d6] border-t-[#d86f94]" />
            <p className="text-sm font-medium text-[#a58a95]">
              Gathering beautiful moments...
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-semibold text-red-700">
              Could not load photos.
            </p>
            <p className="mt-2 text-sm text-red-600">{error}</p>
            <p className="mt-2 text-sm text-red-600">
              Please check your internet connection and refresh the page.
            </p>
          </div>
        )}

        {!loading && !error && displayedPhotos.length === 0 && (
          <div className="rounded-3xl border border-dashed border-[#edcbd8] bg-white px-6 py-16 text-center">
            <p className="text-2xl font-bold text-[#39242d]">
              {showFavorites ? 'No favourites yet' : 'No photos found'}
            </p>
            <p className="mt-2 text-sm text-[#a58a95]">
              {showFavorites
                ? 'Tap the heart on a photo to save it here.'
                : 'Try searching with a different author name.'}
            </p>
          </div>
        )}

        {!loading && !error && displayedPhotos.length > 0 && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-semibold text-[#9b818c]">
                {showFavorites ? 'Your favourites' : 'The collection'}
              </p>
              <span className="rounded-full bg-[#fce8ef] px-3 py-1 text-xs font-bold text-[#a65c79]">
                {displayedPhotos.length} photos
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {displayedPhotos.map((photo) => {
                const isFavorite = favorites.some(
                  (favorite) => favorite.id === photo.id
                )

                return (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                  />
                )
              })}
            </div>
          </>
        )}
      </main>

      <footer className="mt-16 border-t border-[#f0dce4] px-5 py-6 text-center text-xs text-[#b9a3ac]">
        Made with ♡ · Your.gallery
      </footer>
    </div>
  )
}

export default Gallery
