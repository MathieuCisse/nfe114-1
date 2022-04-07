import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nom : string = "TP02";
  constructor(private store : Store) { }

  nbElementPanier = 0;
  
  ngOnInit(): void {
    this.store.select(state=>state.panier.panier.length).subscribe (l => this.nbElementPanier = l);
  }

}
