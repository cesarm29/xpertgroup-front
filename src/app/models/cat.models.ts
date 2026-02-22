export interface Breed {
  id: string;
  name: string;
  temperament?: string;
  origin?: string;
  description?: string;
  life_span?: string;
}

export interface BreedImage {
  id?: string;
  url: string;
  width?: number;
  height?: number;
}
