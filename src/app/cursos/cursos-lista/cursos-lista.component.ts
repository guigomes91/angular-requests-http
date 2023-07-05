import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, EMPTY, Observable, Subject, take, switchMap } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {

  bsModalRef?: BsModalRef;
  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  @ViewChild('deleteModal') deleteModal: any;

  cursoSelecionado!: Curso;

  constructor(
    private service: CursosService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError((error) => {
        this.handleError();
        return EMPTY;
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger(
      'Erro ao carregar cursos. Tenta novamente mais tarde.'
    );
  }

  onEdit(cursoId: number) {
    this.router.navigate(['editar', cursoId], { relativeTo: this.route });
  }

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    /*this.bsModalRef = this.modalService.show(this.deleteModal, {
      class: 'modal-sm',
    });*/

    const result$ = this.alertService.showConfirm('Confirmacao', 'Tem certeza que deseja remover esse curso?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
    )
    .subscribe(
      success => {
        this.alertService.showAlertSuccess('Curso deletado com sucesso!');
        this.onRefresh();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover curso, tente novamente mais tarde!')
      }
    )
  }

  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado.id).subscribe(
      success => {
        this.alertService.showAlertSuccess('Curso deletado com sucesso!');
        this.onRefresh();
        this.bsModalRef?.hide();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover curso, tente novamente mais tarde!')
        this.bsModalRef?.hide();
      }
    );
  }

  onDeclineDelete() {
    this.bsModalRef?.hide();
  }
}
