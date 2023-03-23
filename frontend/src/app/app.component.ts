import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  ngOnInit(): void {
    console.log('oninit')
  }
}
function speedtest(arg0: { maxTime: number; }) {
  throw new Error('Function not implemented.');
}

