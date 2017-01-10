import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'my-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private router: Router) {
    // Do stuff
  }

  ngOnInit() {
    
  }

  onTestBoardCards(){
    this.router.navigate(['/board', 7]);
  }
}
