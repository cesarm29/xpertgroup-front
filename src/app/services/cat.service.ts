import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Breed, BreedImage } from '../models/cat.models';

@Injectable({ providedIn: 'root' })
export class CatService {
  private api = 'https://api.thecatapi.com/v1';
  public breeds = signal<Breed[]>([]);

  constructor(private http: HttpClient) {}

  loadBreeds() {
    const req = this.http.get<Breed[]>(`${this.api}/breeds`);
    req.subscribe((b) => this.breeds.set(b));
    return req;
  }

  fetchImagesForBreed(breedId: string, limit = 5) {
    return this.http.get<BreedImage[]>(`${this.api}/images/search?breed_id=${breedId}&limit=${limit}`);
  }
}
