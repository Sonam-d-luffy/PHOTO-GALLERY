import { useState, useMemo, useCallback, useEffect } from 'react'

const Navbar = ({ photos = [], onFilter }) => {
  const [search, setSearch] = useState('')

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.trim().toLowerCase())
    )
  }, [photos, search])

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value)
  }, [])

  useEffect(() => {
    onFilter?.(filteredPhotos)
  }, [filteredPhotos, onFilter])

  return (
    <nav className="sticky top-0 z-50 border-b border-pink-100 bg-[#fff9fb]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5c6d6] text-3xl text-[#8f4563]">
            ♡
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#39242d]">
              Your<span className="text-[#d86f94]">.</span>gallery
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a58a95]">
              Moments in soft focus
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:w-1/2">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-[#f0dce4] bg-white px-4 py-3 transition focus-within:border-[#df91ad] focus-within:ring-4 focus-within:ring-pink-100">
            <svg
              className="h-5 w-5 shrink-0 text-[#c08ba0]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>

            <input
              type="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search by author..."
              aria-label="Search photos by author"
              className="w-full bg-transparent text-sm text-[#39242d] outline-none placeholder:text-[#b9a3ac]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="text-xs font-semibold text-[#b16d87] hover:text-[#8f4563]"
              >
                Clear
              </button>
            )}
          </div>

          <span className="whitespace-nowrap rounded-xl bg-[#fce8ef] px-3 py-3 text-sm font-semibold text-[#a65c79]">
            {filteredPhotos.length} photos
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
