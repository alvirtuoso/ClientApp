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
    this.router.navigate(['/board', '2b6aa40b-84b6-4088-99e9-1aa96f093572']);
  }
}
