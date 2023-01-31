import {
  Component,
  ElementRef,
  EventEmitter, OnInit,
  Output,
  ViewChild, ViewContainerRef,
} from '@angular/core';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipListbox,
} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { HttpService } from '../../services/http.service';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Entities } from '../../interfaces/entities';
import { User } from '../../interfaces/user';

import { Subject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core'

@Component({
  selector: 'app-addUserForm',
  templateUrl: './addUserFrom.component.html',
  styleUrls: ['./addUserFrom.component.css'],
})


export class AddUserFromComponent implements OnInit {
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  form!: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  roleControl = new FormControl('');
  selecedEntities: string[] = [];
  entities!: Observable<Entities[]>;
  allEntities: Entities[] = [];
  data$!: Observable<Entities[]>;

  userData!: User;

  dataSubject = new Subject<any>();
  userData$ = this.dataSubject.asObservable();

  @Output() dataEvent = new EventEmitter<User>();

  @ViewChild('roleInput') roleInput!: ElementRef<HTMLInputElement>;

  constructor(private _fb: FormBuilder, private _htpServise: HttpService,) {
    this.entities = this.roleControl.valueChanges.pipe(
      startWith(null),
      map((query: string | null) => {
        console.log(query);
        return query ? this._filter(query) : this.allEntities.slice();
      })
    );
  }
  // @ViewChild('edit')

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

    return this.allEntities.filter((el) =>
      el.name.toLowerCase().includes(filterValue)
    );
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
    this.data$ = this._htpServise
      .getRoles()
      .pipe(tap((data) => (this.allEntities = data)));
    console.log(this.data$);

    this.form = this._fb.group({
      Name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      roles: [''],
      userStatus: [''],
    });
  }

  submit() {
    const lockedStatus = this.form.value!.userStatus! === 'active';
    const {email, firstName, lastName } = this.form.value;

    this._htpServise.addUser({email, firstName, lastName, roles: this.selecedEntities, locked: lockedStatus })
      .subscribe(res =>{
        console.log(res );
      });


  }
}
