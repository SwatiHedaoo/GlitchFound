import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GlitchUi';

  constructor(){

  }

  openmodal(){
    
    const modaldiv = document.getElementById('myModals');
    if(modaldiv != null)
    modaldiv.style.display = 'block';
  }


}
