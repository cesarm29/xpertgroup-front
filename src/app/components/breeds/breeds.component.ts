import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { CatService } from '../../services/cat.service';
import { Breed } from '../../models/cat.models';

@Component({
  selector: 'app-breeds',
  standalone: true,
  imports: [CommonModule, RouterModule, NavComponent],
  templateUrl: './breeds.component.html',
  styleUrls: ['./breeds.component.css']
})
export class BreedsComponent implements OnInit {
  get breeds() {
    return this.cat.breeds;
  }
  selectedBreed = signal<Breed | null>(null);
  images = signal<any[]>([]);
  index = signal(0);
  loadingBreeds = signal(false);
  imageLoading = signal(false);

  constructor(private cat: CatService) {}

  ngOnInit(): void {
    if (this.breeds().length === 0) {
      this.loadingBreeds.set(true);
      const obs = this.cat.loadBreeds();
      if (obs && obs.subscribe) {
        obs.subscribe({ next: () => this.loadingBreeds.set(false), error: () => this.loadingBreeds.set(false) });
      } else {
        this.loadingBreeds.set(false);
      }
    }
  }

  onSelect(id: string) {
    const found = this.breeds().find((b) => b.id === id) ?? null;
    this.selectedBreed.set(found);
    this.index.set(0);
    if (found) {
      this.imageLoading.set(true);
      this.cat.fetchImagesForBreed(found.id, 6).subscribe({ next: (imgs) => { this.images.set(imgs); this.imageLoading.set(false); }, error: () => { this.images.set([]); this.imageLoading.set(false); } });
    } else this.images.set([]);
  }

  prev() {
    const i = this.index();
    this.index.set(Math.max(0, i - 1));
  }

  next() {
    const i = this.index();
    this.index.set(Math.min(this.images().length - 1, i + 1));
  }
}
