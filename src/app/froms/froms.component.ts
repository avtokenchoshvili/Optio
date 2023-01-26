import { Component } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServicesService } from '../shared/services.service';
import { Role } from '../interfaces/role';
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-froms',
  templateUrl: './froms.component.html',
  styleUrls: ['./froms.component.css'],
})


export class FromsComponent {
  form!: FormGroup;
data!:Role;

  addOnBlur = true;


  constructor (private _fb: FormBuilder,
    private _rollServise:ServicesService) {}


  ngOnInit(): void {
 this._rollServise.getRoles().subscribe(res =>{
  console.log(res)
  this.data = res;
 });

    this.form = this._fb.group({
Name:['',([Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)])],
lastName:['',[Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)]],
email:['',   [ Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
roles:['']
    });

  }
submit(){
  console.log(this.form.value)
}
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }
}
