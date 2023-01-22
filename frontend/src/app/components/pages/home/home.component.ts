import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // console.log("test")
    let foodObservable: Observable<Food[]>;
    this.activatedRoute.params.subscribe((params) => {
      console.log("params", params);
      if(params.searchTerm)
        foodObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
       else if(params.tag)
        foodObservable = this.foodService.getAllFoddsByTagname(params.tag)
       else
        foodObservable = this.foodService.getAll();

       foodObservable.subscribe(subFood => {
          this.foods = subFood;
       })
    })
  }

}
