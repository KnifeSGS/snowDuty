import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Journal } from '../../models/journal';
import { JournalService } from '../../services/journal.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ViewerComponent {

  Delete: string = "Törlés"
  journalDialog!: boolean;

  journals!: Journal[];

  journal!: Journal;

  selectedjournals!: Journal[];

  submitted!: boolean;

  statuses!: any[];

  constructor(
    private journalService: JournalService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.journalService.getAll().subscribe(data => this.journals = data);

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  openNew() {
    this.journal = new Journal();
    this.submitted = false;
    this.journalDialog = true;
  }

  deleteSelectedjournals() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected journals?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.journals = this.journals.filter(val => !this.selectedjournals.includes(val));
        // this.selectedjournals = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'journals Deleted', life: 3000 });
      }
    });
  }

  editjournal(journal: Journal) {
    this.journal = { ...journal };
    this.journalDialog = true;
  }

  deletejournal(journal: Journal) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + journal.date + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.journals = this.journals.filter(val => val._id !== journal._id);
        // this.journal = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'journal Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.journalDialog = false;
    this.submitted = false;
  }

  savejournal() {
    this.submitted = true;

    // if (this.journal.name.trim()) {
    //   if (this.journal.id) {
    //     this.journals[this.findIndexById(this.journal.id)] = this.journal;
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'journal Updated', life: 3000 });
    //   }
    //   else {
    //     this.journal.id = this.createId();
    //     this.journal.image = 'journal-placeholder.svg';
    //     this.journals.push(this.journal);
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'journal Created', life: 3000 });
    //   }

    //   this.journals = [...this.journals];
    //   this.journalDialog = false;
    //   this.journal = {};
    // }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.journals.length; i++) {
      if (this.journals[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

}
