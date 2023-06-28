import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { EMPTY, Observable, Subject, catchError } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos!: Curso[];

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(private service: CursosService) {}

  ngOnInit(): void {
    //this.service.list()
      //.subscribe(dados => this.cursos = dados);

      this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list()
        .pipe(
          catchError(error => {
            console.error(error);
            this.error$.next(true);
            return EMPTY;
          })
        );

    /*this.service.list()
    .pipe(
      catchError(error => EMPTY)
    )
    .subscribe(
      dados => {
        console.log(dados)
      },
      //error => console.log(error),
      //() => console.log('Observable completo!')
    );*/
  }

  onEdit(cursoId: number) {

  }

  onDelete(curso: any) {

  }

}
