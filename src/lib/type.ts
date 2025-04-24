type ImageUrl = {
  image_url: string;
  large_image_url: string;
  small_image_url: string;
};

export type GetAnime = {
  mal_id: number;
  background: string;
  duration: string;
  episodes: number;
  genres: { name: string }[];
  images: {
    jpg: ImageUrl;
    webp: ImageUrl;
  };
  score: number;
  status: string;
  synopsis: string;
  title: string;
  title_english: string;
  title_japanese: string;
  year: number;
  url: string;
};

export type PaginationType = {
  current_page: number;
  has_next_page: boolean;
  last_visible_page: number;
  items: {
    count: number;
    per_page: number;
    total: number;
  };
};

export type FetchResponse = {
  data: GetAnime[];
  pagination: PaginationType;
};
