import { Component, OnInit, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';
import { CatService } from '../../services/cat.service';

@Component({
  selector: 'app-breeds-table',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent],
  templateUrl: './breeds-table.component.html',
  styleUrls: ['./breeds-table.component.css']
})
export class BreedsTableComponent implements OnInit {
  all: any[] = [];
  displayed: any[] = [];
  filter = '';
  loading = signal(false);
  Math = Math;
  page = 1;
  pageSize = 20;
  pageSizes = [10, 20, 50];
  paged: any[] = [];

  constructor(private cat: CatService) {
    effect(() => {
      const b = this.cat.breeds();
      Promise.resolve().then(() => {
        this.all = b;
        this.displayed = b;
        this.resetPagination();
      });
    });
  }

  ngOnInit(): void {
    this.loading.set(true);
    const obs = this.cat.loadBreeds();
    if (obs && obs.subscribe) {
      obs.subscribe({
        next: () => {
          this.loading.set(false);
          this.resetPagination();
        },
        error: () => {
          this.loading.set(false);
          this.resetPagination();
        },
      });
    } else {
      this.loading.set(false);
      this.resetPagination();
    }
  }

  applyFilter() {
    const q = this.filter.trim().toLowerCase();
    if (!q) {
      this.displayed = this.all;
      this.resetPagination();
      return;
    }
    this.displayed = this.all.filter((it) =>
      [it.name, it.temperament, it.origin, it.description]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
    this.resetPagination();
  }

  resetPagination() {
    this.page = 1;
    this.applyPagination();
  }

  applyPagination() {
    const start = (this.page - 1) * this.pageSize;
    this.paged = this.displayed.slice(start, start + this.pageSize);
  }

  setPage(p: number) {
    const tp = this.totalPages();
    if (p < 1) p = 1;
    if (p > tp) p = tp;
    this.page = p;
    this.applyPagination();
  }

  nextPage() {
    this.setPage(this.page + 1);
  }

  prevPage() {
    this.setPage(this.page - 1);
  }

  setPageSize(sz: number) {
    this.pageSize = sz;
    this.resetPagination();
  }

  totalPages() {
    return Math.max(1, Math.ceil(this.displayed.length / this.pageSize));
  }
}
