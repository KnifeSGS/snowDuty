import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal, Signal, ViewChild, WritableSignal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { UserCreatorComponent } from '../user-creator/user-creator.component';
import { UserEditorComponent } from '../user-editor/user-editor.component';

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

  @ViewChild(UserEditorComponent)
  editChildUser!: UserEditorComponent;

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

  userSignal: WritableSignal<User[]> = signal([]);
  // user: WritableSignal<User | null> = signal(null);
  user!: User;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private ref: ChangeDetectorRef,
  ) {
    this.getUsers()
  }

  ngOnInit() {
    // this.userService.getAll$();
    // this.users$.subscribe(users => users.forEach(user => {
    //   if (user.full_name) {
    //     this.userNames.push(user.full_name)
    //   } else {
    //     this.userNames.push(user.email)
    //   }
    // }))

    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };
    this.ref.detectChanges();
  }

  async getUsers() {
    // const users: User[] = await this.userService.fetchForSignal(`?page_size=1000`);
    await this.userService.fetchForSignal(`?page_size=1000`)
      .then(
        users => {
          console.log(users);
          users.forEach((user: User) => {
            const full_name = user.last_name || user.first_name ? `${user.last_name} ${user.first_name}` : `${user.email}`
            this.userNames.push(full_name)
          })
          return this.userSignal.set(users)
        }
      );
    // console.log(users);
    // journals.forEach((journal: any) => {
    //   const journalKey =
    // })
    // users.forEach(user => {
    //   const full_name = `${user.last_name} ${user.first_name} ${user.email}`
    //   this.userNames.push(full_name)
    // })
    // this.userSignal.set(users)
    // this.userSignal.update((value) => value)
  }

  async getOneUser(id: number) {
    const user: User = await this.userService.fetchForSignal(`${id}`);
    // this.user.set(user)
  }

  openDialog(event: any) {
    this.openedDialogName = event.target.parentElement.id
    this.submitted = false;
    this.dialogs[event.target.parentElement.id] = true;
  }
  openEditDialog(event: any, user: User) {
    console.log(event);
    console.log(user);
    this.user = user
    this.openedDialogName = event.target.parentElement.id
    this.submitted = false;
    this.dialogs[event.target.parentElement.id] = true;
    this.editChildUser.userFormBuilder(user)
  }

  hideDialog() {
    this.dialogs[this.openedDialogName] = false
    this.submitted = false;
  }

  saveUser() {
    this.childUser.buildForm();
    this.getUsers();
    // this.userService.getAll$();
    this.dialogs[this.openedDialogName] = false;
  }

  editUser() {
    this.editChildUser.buildForm();
    // this.userService.getAll$();
    this.getUsers()
    this.dialogs[this.openedDialogName] = false;
  }

  deleteUser(userId: string, userLastName: string, userFirstName: string) {
    this.confirmationService.confirm({
      message: 'Biztosan törlöd a ' + userLastName + ' ' + userFirstName + 'nevű felhasználót?',
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
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Felhasználó törölve', life: 3000 });
      }
    });
  }

  clear(table: Table) {
    table.clear();
  }

}
