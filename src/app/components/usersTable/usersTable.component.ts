import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {User} from "../../interfaces/user";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort,Sort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {HttpService} from "../../services/http.service";
import {GetUser} from "../../interfaces/getUser";
import {FormControl, FormGroup, FormGroupDirective} from "@angular/forms";
import {debounceTime} from "rxjs";
import { MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import {AddUserFromComponent} from "../addUserForm/addUserFrom.component";


@Component({
  selector: 'app-usersTable',
  templateUrl: './usersTable.component.html',
  styleUrls: ['./usersTable.component.css'],
  providers: [FormGroupDirective]
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersTableComponent implements AfterViewInit {

  public totalCount: number = 0;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public sortBy: string = 'email';
  public sortDirection: string = 'asc';
  public includes :string[]  = [];

  public excludes :string[]  = [];
  form!: FormGroup;
constructor(public _htpServise:HttpService,
            private _matDialog: MatDialog,

          ) {
  //
  this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe((text: string) => {
    this._htpServise.findUser({search: this.searchControl.value, sortBy: this.sortBy,
      sortDirection: this.sortDirection, pageIndex: this.pageIndex, pageSize: this.pageSize  ,includes:this.includes, excludes:this.excludes}).subscribe({
      next: ({ data }) => {
        this.usersDataSource.data = data.entities;
        this.totalCount = data.total
        this.usersDataSource.paginator = this.paginator;
        this.usersDataSource.sort = this.sort;
      },

    })
  })






}






  public  columnNames: string[] =
    [ 'email', 'firstName', 'lastName', 'Role' , 'Status'  ,'Delete' ,];
  public usersDataSource!: MatTableDataSource<User>;


  @Input('data') set usersData(users: User[]) {
    this.usersDataSource = new MatTableDataSource<User>(users || []);

  }

  @ViewChild(AddUserFromComponent) addUserFromComponent!:AddUserFromComponent;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;





  ngAfterViewInit(): void {
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;
    // this.form.addControl(this.addUserFromComponent.form);


  }
  ngOnInit(){
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;



}

@Output() notifyParent: EventEmitter<any> = new EventEmitter();



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter = filterValue.trim().toLowerCase();

    if (this.usersDataSource.paginator) {
      this.usersDataSource.paginator.firstPage();
    }
  }




searchControl  = new FormControl();
getFeelList(event:PageEvent){
this.pageIndex  = event.pageIndex;
this.pageSize  = event.pageSize;
this._htpServise.findUser({search: this.searchControl.value, sortBy: this.sortBy,
  sortDirection: this.sortDirection, pageIndex: this.pageIndex, pageSize: this.pageSize  ,includes:this.includes, excludes:this.excludes}).subscribe(
  (value)=>{
    console.log(value.data)
    this.usersDataSource = new MatTableDataSource<User>(value.data.entities);
    this.totalCount = value.data.total;
    this.usersDataSource.paginator
  }
)
}

deleteUser(data:User){
  const dialog  = this._matDialog.open(ConfirmationDialogComponent,{
    width: '440px',

  })

  dialog.afterClosed().subscribe(res =>{
    if(res){
      this._htpServise.deleteUser(data.id!).subscribe((res)=>{
        console.log(res)
        if(res.success){
          this.usersDataSource.data = this.usersDataSource.data.filter(user => user.id !== data.id);
          this.paginator.length = this.usersDataSource.data.length;
          this.paginator._changePageSize(this.paginator.pageSize);
        }
        this.ngOnInit();

      })
    }
  })

}
}
