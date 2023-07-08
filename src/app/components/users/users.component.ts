import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Properties } from 'src/app/properties/properties';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  users: any;
  userEdit: any;

  formularioEdit: FormGroup;
  formularioCreate: FormGroup;

  constructor(
    private usersService: UsersService,
    private modalService: NgbModal,
    private _fb: FormBuilder
  ) {
    this.formularioEdit = this._fb.group({
      username: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.pattern(Properties.VALIDATION_EMAIL)],
      ],
    });

    this.formularioCreate = this._fb.group({
      username: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.pattern(Properties.VALIDATION_EMAIL)],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.opcionesDataTable();
    this.getUsers();
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

  open(content: any, user: any) {
    this.userEdit = user;
    let controls = this.formularioEdit.controls;

    controls['username'].setValue(this.userEdit.username);
    controls['email'].setValue(this.userEdit.email);

    this.modalService.open(content, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
  }

  openCreate(content: any) {
    this.modalService.open(content, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
  }

  changeStatusUserService(userSlug: string) {
    this.usersService.changeUserStatus(userSlug).subscribe({
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      },
      complete: () => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Estado cambiado correctamente',
        });
      },
    });
  }

  createUser() {
    let controls = this.formularioCreate.controls;

    let userData = {
      username: controls['username'].value,
      email: controls['email'].value,
      password: controls['password'].value,
    };

    this.usersService.createUser(userData).subscribe({
      next: (resp: any) => {
        console.log(resp);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario no creado',
        });
      },
      complete: () => {
        this.closeModal();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario creado correctamente',
        });
        this.getUsers();
      },
    });
  }

  private getUsers(): void {
    this.usersService.listUsers().subscribe((resp) => {
      this.users = Object.values(resp);
      this.dtTrigger.next(this.users);
    });
  }

  closeModal() {
    this.formularioEdit.reset();
    this.formularioCreate.reset();
    this.modalService.dismissAll();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
