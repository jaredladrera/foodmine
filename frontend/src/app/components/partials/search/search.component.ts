import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  constructor(private activetedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      if(params.searchTerm) this.searchTerm = params.searchTerm;
    });
  }

  search(term:string) {
    // console.log(term)
    if(term) {
      this.router.navigateByUrl('/search/' + term);
    }
  }

}
