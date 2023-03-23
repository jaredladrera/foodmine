import { Component, OnInit } from '@angular/core';
import { LoadingService } from './../../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  isLoading!: boolean;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    // this.loadingService.showLoading();
  }

}
