import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EditorModule,SharedModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
// import { InlineEditorComponent } from 'ng2-inline-editor';

@Component({
  selector: 'my-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private router: Router) {
    // Do stuff
  }

 showDialog = false;
  ngOnInit() {

  }

  onTestBoardCards(){
    this.router.navigate(['/board', '2b6aa40b-84b6-4088-99e9-1aa96f093572']);
  }

  title = 'My component!';
  val: number = 30;
  editableContent = 'myText';
  editablePassword = 'myPassword';
  editableTextArea = 'Text in text area';
  editableSelect = 2;
  showEditor: boolean = false;
  editableSelectOptions =[
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ];
  // toolbarOptions = {
  //   toolbar: [
  //     'bold', 'italic', 'underline', 'strike'
  //   ]
  // };
text1: string = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';

/**
 * Handles inline text editor's change event
 * @param event object
  {
    editor: editorInstance,
    html: html,
    text: text,
    delta: delta,
    oldDelta: oldDelta,
    source: source
  }
 */
  saveEditable(value) {
     console.log('editable: ', value.html);

  }


  //   onContentChanged({ quill, html, text }) {
  //   console.log(quill, html, text);
  // }

}
