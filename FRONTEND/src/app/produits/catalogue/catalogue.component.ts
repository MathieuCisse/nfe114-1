import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CatalogueService} from '../service/catalogue.service';
import {Observable, fromEvent, of} from 'rxjs';
import {Store} from '@ngxs/store';
import {AddReference} from '../../../shared/actions/panier.action';
import {
  map,
  distinctUntilChanged,
  debounceTime,
  tap,
  switchMap,
  catchError,
} from 'rxjs/operators';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  @ViewChild('filterInput', { static: true }) filterInput: ElementRef;

  constructor(private catalogueService : CatalogueService, private store : Store)  { }

  observable5$ : Observable<any> = null;

  ngOnInit(): void {
    this.observable5$ = this.catalogueService.getCatalogue();
    this.observable5$ = fromEvent(this.filterInput.nativeElement, 'keyup').pipe(
      map((event) => event.target.value),
      map((catalog) => catalog.trim()),
      debounceTime(500), //fixe d'un délai
      distinctUntilChanged(),
      switchMap((term) =>  this.catalogueService.getCatalogue(term).pipe(
            catchError(() => {
              return of([]);
            })
      ))
    );
  }

  addPanier (ref : string) {
    this.store.dispatch (new AddReference ({"reference":ref}));
  }
}
