import { Injectable } from '@angular/core';

declare const Swal: any;

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private toast = (Swal && Swal.mixin) ? Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast: any) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  }) : null;

  success(message: string, title = '') {
    if (this.toast) this.toast.fire({ icon: 'success', title: title || message });
    else alert(message);
  }

  error(message: string, title = '') {
    if (this.toast) this.toast.fire({ icon: 'error', title: title || message });
    else alert(message);
  }

  info(message: string, title = '') {
    if (this.toast) this.toast.fire({ icon: 'info', title: title || message });
    else alert(message);
  }
}
