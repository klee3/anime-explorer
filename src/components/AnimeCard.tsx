import { GetAnime } from "../lib/type";
import { truncateString } from "../lib/uitls";

const AnimeCard = (anime: GetAnime) => {
  return (
    <div className="rounded-md bg-gray-800 shadow-lg p-4 md:p-8 cursor-pointer">
      <div className="md:flex px-4 leading-none max-w-4xl gap-4">
        <div className="flex-none ">
          <img
            src={anime.images.jpg.image_url}
            alt="pic"
            className="h-72 w-56 rounded-md transform -translate-y-4 border-4 border-gray-300 shadow-lg"
          />
        </div>

        <div className="flex-col text-gray-300">
          <p className="pt-4 text-2xl font-bold">
            {anime.title_english ?? anime.title ?? anime.title_japanese}
          </p>
          <hr className="hr-text" data-content="" />
          <div className="text-md flex justify-between px-4 my-2">
            <span className="font-bold">
              {anime.year} | Rating: {anime.score} | {anime.status}
            </span>
            <span className="font-bold"></span>
          </div>
          <p className="hidden md:block px-4 my-4 text-sm text-left">
            {truncateString(anime.synopsis ?? anime.background, 300) ??
              "NO DESCRIPTON AVAILABLE"}
          </p>

          <p className="flex text-md px-4 my-2">
            {anime.episodes} episode
            <span className="font-bold px-2">|</span>
            {anime.duration}
          </p>

          <div className="text-xs">
            {anime.genres.map((v) => (
              <button
                key={v.name}
                type="button"
                className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-4 mb-4 w-full">
        <div className="flex text-white">
          <a href={anime.url} target="_blank">
            My Anime List
          </a>
        </div>
        <div className="flex">{/* Something on bottom right */}</div>
      </div>
    </div>
  );
};
export default AnimeCard;
