import { Component, Input, NgZone, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { take } from 'rxjs/operators';
import { TasksService } from '../../core';
import { CardSchema, ListSchema } from './../../core/models';
import { generateUniqueId } from './../../shared/utils';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss']
})
export class FormTaskComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @Input() connectedOverlay: CdkConnectedOverlay;
  @Input() list: ListSchema;
  @Input() card?: CardSchema;

  addTask: FormGroup;
  selectedPriority: string;
  buttonText: string;

  priorities: any[] = [
    {value: 'urgent', viewValue: 'Urgent'},
    {value: 'moderate', viewValue: 'Moderate'},
    {value: 'low', viewValue: 'Low'}
  ];

  constructor(private fb: FormBuilder, private _ngZone: NgZone, public tasksService: TasksService) { 
  }

  ngOnInit(): void {
    this.setForm();
    this.buttonText = 'Crear Tarea';
    this.selectedPriority = '';
    if(this.card){
      this.setValuesOnForm(this.card);
      this.buttonText = 'Editar Tarea';
      this.selectedPriority = this.card.priority;
    }
  }

  setForm(): void {
    this.addTask = this.fb.group({
      date : [new  Date(), Validators.required],
      priority: ['urgent', Validators.required],
      description : [ '', Validators.required ]
    });
  }

  setValuesOnForm(form: CardSchema): void {
    this.addTask.setValue({
      date: new Date(form.date),
      priority: form.priority,
      description: form.description 
   });
  }

  onFormAdd(form: CardSchema): void {
    if (this.addTask.valid && !this.card) {
      form.id = generateUniqueId();
      this.tasksService.addCard(form, this.list);
      this.close();
    }else {
      const findPriority = this.priorities.find(element => form.priority === element.value);
      form.id = this.card.id;
      form.priority = !findPriority ? this.card.priority : form.priority;
      form.date = !findPriority ? this.card.date : new Date(form.date);
      if(form.priority)
      this.tasksService.updateTask(form, this.list);
      this.close();
    }
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  close(): void {
    this.connectedOverlay.overlayRef.detach();
  }

}
