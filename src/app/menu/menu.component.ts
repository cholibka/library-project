import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbService, Option } from '../db.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  @Input() options!: Array<Option> | null;
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(private dbService: DbService) { }

  changeTheme(themeToSet: string) {
    this.themeChange.emit(themeToSet);
  }

}
