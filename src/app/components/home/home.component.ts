import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { SnippetsService } from 'src/app/services/snippets/snippets.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public snippets: any;
  public snippet: any;
  public snippetsInactives: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(
    private snippetsService: SnippetsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getActiveSnippetsService();
    this.opcionesDataTable();
  }

  private opcionesDataTable(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [10, 20, 30, 40],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es-cl.json',
      },
      destroy: true,
      searching: true,
      responsive: true,
      retrieve: true,
    };
  }

  open(content: any, snippet: any) {
    this.snippet = snippet;

    this.modalService.open(content, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
  }

  openInactiveSnippets(content: any) {
    this.getInactiveSnippetsService();
    this.modalService.open(content, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
  }

  copy() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: '¡Copiado en el portapapeles!',
    });
  }

  changeStatusSnippetService(snippetSlug: string) {
    this.snippetsService.changeSnippetStatus(snippetSlug).subscribe({
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      },
      complete: () => {
        this.getInactiveSnippetsService();
        this.getActiveSnippetsService();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Estado cambiado correctamente',
        });
      },
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  getActiveSnippetsService() {
    this.snippetsService.getActiveSnippets().subscribe({
      next: (snippets: any) => {
        this.snippets = snippets;
      },
    });
  }

  getInactiveSnippetsService() {
    this.snippetsService.getInactiveSnippets().subscribe({
      next: (snippets: any) => {
        this.snippetsInactives = snippets;
        this.dtTrigger.next(this.snippetsInactives);
      },
    });
  }
}
