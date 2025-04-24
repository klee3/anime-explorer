import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { API_BASE_URL, API_OPTIONS } from "./lib/constant";
import Search from "./components/search";
import Spinner from "./components/spinner";
import AnimeCard from "./components/AnimeCard";
import { FetchResponse, GetAnime, PaginationType } from "./lib/type";
import Pagination from "./components/Pagination";

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [pagination, setPagination] = useState<null | PaginationType>(null);
  const [page, setPage] = useState(1);
  const [animeList, setAnimeList] = useState<GetAnime[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchAnime = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}`
        : `${API_BASE_URL}/top/anime?page=${page}`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch anime");
      }

      const data: FetchResponse = await response.json();

      if (!data.data || !data.data.length) {
        setErrorMessage("Failed to fetch anime");
        setAnimeList([]);
        return;
      }
      console.log(data.data);
      setAnimeList(data.data || []);
      setPagination(data.pagination || null);
    } catch (error) {
      console.error(`Error fetching anime: ${error}`);
      setErrorMessage("Error fetching anime. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime(debouncedSearchTerm);
  }, [page, debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Anime</span> You'll Enjoy
            Without the Hassle
          </h1>

          <Search
            searchTerm={searchTerm}
            setSearchTerm={(e) => {
              setSearchTerm(e);
              setPage(1);
            }}
          />
        </header>

        <section className="all-anime">
          <h2>
            {debouncedSearchTerm
              ? `Result for "${debouncedSearchTerm}"`
              : "All Anime"}
          </h2>
          {isLoading ? (
            <div className="flex items-center justify-center w-full">
              <Spinner />
            </div>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {animeList.map((anime) => (
                <AnimeCard key={anime.mal_id} {...anime} />
              ))}
            </ul>
          )}
        </section>
        <div className="flex">
          <Pagination
            currentPage={pagination?.current_page || 1}
            totalItems={pagination?.items.total ?? 0}
            perPage={pagination?.items.per_page ?? 25}
            onPageChange={(page: number) => {
              setPage(page);
            }}
            siblingCount={2}
            boundaryCount={1}
          />
        </div>
      </div>
    </main>
  );
};

export default App;
