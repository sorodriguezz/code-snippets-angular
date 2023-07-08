import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { RolesService } from '../../services/roles/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  roles: any;
  roleEdit: any;

  formularioCreate: FormGroup;

  constructor(
    private rolesService: RolesService,
    private modalService: NgbModal,
    private _fb: FormBuilder
  ) {
    this.formularioCreate = this._fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.opcionesDataTable();
    this.getRoles();
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

  openCreate(content: any) {
    this.modalService.open(content, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
  }

  private getRoles(): void {
    this.rolesService.listRoles().subscribe((resp: any) => {
      this.roles = Object.values(resp);
      this.dtTrigger.next(this.roles);
    });
  }

  closeModal() {
    this.formularioCreate.reset();
    this.modalService.dismissAll();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
