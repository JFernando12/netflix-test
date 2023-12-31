export interface MovieCreateDto {
  title: string;
  image: string;
  director: string;
  platforms: string[];
}

export interface MovieUpdateDto {
  id: string;
  title?: string;
  image?: string;
  director?: string;
  platforms?: string[];
}
