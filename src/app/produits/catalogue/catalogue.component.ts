import { Component, OnInit } from '@angular/core';
import {FirstService} from '../service/first.service';
import {Observable,of,from} from 'rxjs';
import {filter} from 'rxjs/operators';
import { Store } from '@ngxs/store';
import {AddReference} from '../../../shared/actions/panier.action';
import {Reference} from '../../../shared/models/reference';
import { PanierState } from 'src/shared/states/panier-state';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  constructor(private firstService : FirstService, private store : Store)  { }

  observable$ : Observable<any> = null;
 
  tabData : Array<String> = [];
  subscribe : any;

  tabLivre : Array<any> = [];

  ngOnInit(): void {

    this.observable$ = this.firstService.getCatalogue ();
    

  }
  onClick () {
  } 

  onClickBackeng () {
   
  }

  addPanier (ref : string) {
    console.log (ref);
    
    this.store.dispatch (new AddReference ({"reference":ref}));
  }
}
