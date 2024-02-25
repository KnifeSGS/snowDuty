import { Component, OnInit, inject } from '@angular/core';
import { WorkerStore } from '../../store/worker.store';
import { WorkerData } from '../../models/worker-data';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-worker-creator',
  templateUrl: './worker-creator.component.html',
  styleUrl: './worker-creator.component.scss'
})
export class WorkerCreatorComponent implements OnInit {

  #fb = inject(FormBuilder)

  // store
  #workerStore = inject(WorkerStore)

  // view
  worker: WorkerData = new WorkerData()
  mobile: boolean = false
  workerForm: FormGroup

  constructor() {
    this.workerForm = this.#fb.group({
      first_name: [''],
      last_name: [''],
    })
  }

  ngOnInit(): void {
    if (window.screen.width < 420) { // 768px portrait
      this.mobile = true;
    };
  }

  workerDataBuilder() {
    const { first_name, last_name } = this.workerForm.value
    this.worker = {
      first_name,
      last_name
    }
  }

  buildForm() {
    this.workerDataBuilder()
    console.log(this.worker);
    this.#workerStore.create(this.worker)
  }

}
