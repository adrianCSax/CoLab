import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements AfterViewInit {

  @ViewChild('background') background : any;
  myAvatar : any;
  private activeUsers : [] = [];
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event.key);

    if (event.key === 's') {
      this.moveDown(this.myAvatar);
    }
    if (event.key === 'w') {
      this.moveUp(this.myAvatar);
    }
    if (event.key === 'a') {
      this.moveLeft(this.myAvatar);
    }
    if (event.key === 'd') {
      this.moveRight(this.myAvatar);
    }
  }

  constructor(private render: Renderer2, private el : ElementRef) { }

  ngAfterViewInit(): void {
    let element = this.render.createElement('div');
    this.render.setAttribute(element, 'class', 'bacteria');
    this.render.appendChild(this.background.nativeElement, element);
    this.myAvatar = element;
  }


  moveUp(element : any) {
    element.nativeElement.y += 10;
  }
  moveDown(element : any) {}
  moveLeft(element : any) {}
  moveRight(element : any) {}

}
