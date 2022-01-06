import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AppComponent {
  title = 'medical-history';

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) {}

}
