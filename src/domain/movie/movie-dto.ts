export interface MovieCreateDto {
  id: string;
  title: string;
  slug: string;
  image: string;
  director: string;
  platforms: string[];
  score: number;
  reviews: string[];
}

export interface MovieUpdateDto {
  id: string;
  title?: string;
  slug?: string;
  image?: string;
  director?: string;
  platforms?: string[];
  score?: number;
}
