import {AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild} from "@angular/core";
import {User} from "../../interfaces/user";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {HttpService} from "../../services/http.service";
import {GetUser} from "../../interfaces/getUser";
import {FormControl} from "@angular/forms";




@Component({
  selector: 'app-usersTable',
  templateUrl: './usersTable.component.html',
  styleUrls: ['./usersTable.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersTableComponent implements AfterViewInit {

constructor(public _htpServise:HttpService) {
}

  public  columnNames: string[] =
    [ 'email', 'firstName', 'lastName', 'Role' , 'Status'  ,'Delete' ,'Edit'];
  public usersDataSource!: MatTableDataSource<User>;


  @Input('data') set usersData(users: User[]) {
    this.usersDataSource = new MatTableDataSource<User>(users || []);

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;




  ngAfterViewInit(): void {
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;

  }
  ngOnInit(){
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;

    this.counts()

}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter = filterValue.trim().toLowerCase();

    if (this.usersDataSource.paginator) {
      this.usersDataSource.paginator.firstPage();
    }
  }
  public totalCount: number = 0;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public sortBy: string = 'email';
  public sortDirection: string = 'asc';
   public includes :string[]  = [];

   public excludes :string[]  = [];

   public search !:string

searchControl  = new FormControl();
getFeelList(event:PageEvent){
this.pageIndex  = event.pageIndex;
this.pageSize  = event.pageSize;
this._htpServise.findUser({search: this.searchControl.value, sortBy: this.sortBy,
  sortDirection: this.sortDirection, pageIndex: this.pageIndex, pageSize: this.pageSize  ,includes:this.includes, excludes:this.excludes}).subscribe(
  (value)=>{
    console.log(value.data.entities)
    this.usersDataSource = new MatTableDataSource<User>(value.data.entities);
    this.totalCount = value.data.total;
    this.usersDataSource.paginator
  }
)
}
counts(){
     this._htpServise.getRoles().subscribe(res=>{

     })
}

}
