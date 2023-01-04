import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {
      console.log("params", params);
      if(params.searchTerm) 
        this.foods = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
       else if(params.tag) 
        this.foods = this.foodService.getAllFoddsByTagname(params.tag)
       else 
        this.foods = this.foodService.getAll();
  
      
      // console.log("this is the foods", this.foods);
    })
  }

}
