import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { UserCreatorComponent } from '../user-creator/user-creator.component';

@Component({
  selector: 'app-user-viewer',
  templateUrl: './user-viewer.component.html',
  styleUrls: ['./user-viewer.component.scss'],
  providers: [MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserViewerComponent {

  @ViewChild(UserCreatorComponent)
  childUser!: UserCreatorComponent;

  // feliratok
  Delete: string = "Törlés";
  NewJournal: string = "Új napló";
  NewWorker: string = "Új dolgozó";
  Import: string = "Feltöltés";
  Export: string = "Letöltés";
  Search: string = "Keresés . . .";
  Clear: string = "Keresés törlése";

  paginatorTemplate = "";

  defaultSortOrder: number = 1

  openedDialogName!: string
  dialogs: { [key: string]: boolean } = {
    userDialog: false
  }

  users$: BehaviorSubject<User[]> = this.userService.list$;
  userNames: string[] = [];
  submitted!: boolean;
  statuses!: any[];
  mobile: boolean = false
  selectedUsers!: User[];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.userService.getAll$();
    this.users$.subscribe(users => users.forEach(user => {
      this.userNames.push(user.full_name)
    }))

    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };
    this.ref.detectChanges();

    console.log(this.mobile);
  }

  openDialog(event: any) {
    this.openedDialogName = event.target.parentElement.id
    this.submitted = false;
    this.dialogs[event.target.parentElement.id] = true;
  }

  hideDialog() {
    this.dialogs[this.openedDialogName] = false
    this.submitted = false;
  }

  saveUser() {
    this.childUser.buildForm();
    this.userService.getAll$();
    this.dialogs[this.openedDialogName] = false;
  }

  deleteUser(userId: string, userName: string) {
    this.confirmationService.confirm({
      message: 'Biztosan törlöd a ' + userName + 'nevű felhasználót?',
      header: 'Megerősítés',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (userId) {
          this.userService.remove(userId).subscribe(
            () => {
              this.userService.getAll()
            }
          )
        }
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Napló törölve', life: 3000 });
      }
    });
  }

  clear(table: Table) {
    table.clear();
  }

}
