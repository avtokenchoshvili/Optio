import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent, MatChipListbox, } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { ServicesService } from '../shared/services.service';
import { Role } from '../interfaces/role';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Entities,  } from '../interfaces/entities';
import { User } from '../interfaces/user';



@Component({
  selector: 'app-froms',
  templateUrl: './froms.component.html',
  styleUrls: ['./froms.component.css'],
})


export class FromsComponent {
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  form!: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  roleControl = new FormControl('');
  selecedEntities: string[] = [];
  entities!: Observable<Role[]>;
  allEntities:any[] = [];
  data$!: Observable<Entities[]>;

  @ViewChild('roleInput') roleInput!: ElementRef<HTMLInputElement>;

  constructor (private _fb: FormBuilder,
    private _rollServise:ServicesService,
    ) {
      this.entities = this.roleControl.valueChanges.pipe(
        startWith(null),
        map((query: string | null) => {
          console.log(query);
          return (query ? this._filter(query) : this.allEntities.slice())
        }
        ),
      );
    }












    add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();

      // Add our fruit
      if (value) {
        this.selecedEntities.push(value);
      }

      // Clear the input value
      event.chipInput!.clear();

      this.roleControl.setValue(null);
    }




    remove(fruit: string): void {
      const index = this.selecedEntities.indexOf(fruit);

      if (index >= 0) {
        this.selecedEntities.splice(index, 1);
      }
    }
    private _filter(value: string): Entities[] {
      const filterValue = value.toLowerCase();

      return this.allEntities.filter(el => el.name.toLowerCase().includes(filterValue));
    }
    selected(event: MatAutocompleteSelectedEvent): void {
      console.log(event.option.viewValue);
    if (!this.selecedEntities.includes(event.option.viewValue)) {
      this.selecedEntities.push(event.option.viewValue);
      this.roleInput.nativeElement.value = '';
      this.roleControl.setValue(null);
    }
    }




  ngOnInit(): void {
    this.data$ = this._rollServise.getRoles().pipe(
      tap(data => this.allEntities = data)

    )
console.log(this.data$)

    this.form = this._fb.group({
Name:['',([Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)])],
lastName:['',[Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)]],
email:['',   [ Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
roles:[''],
userStatus:['']
    });

  }



submit(){
  const lockedStatus = this.form.value!.userStatus! === 'active';
  let userData = {

    firstName: this.form.value.Name,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      // userStatus:this.form.value.userStatus,
      locked:lockedStatus,
      roles: this.selecedEntities

  }
console.log(userData)

this._rollServise.saveUser(userData).subscribe((res:any )=>{
console.log(res)
})
}


}
