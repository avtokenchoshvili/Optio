import {AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild} from "@angular/core";
import {User} from "../../interfaces/user";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'app-usersTable',
  templateUrl: './usersTable.component.html',
  styleUrls: ['./usersTable.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent implements AfterViewInit {
  public readonly columnNames: string[] =
    ['Picture', 'email', 'firstName', 'lastName'];
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter = filterValue.trim().toLowerCase();

    if (this.usersDataSource.paginator) {
      this.usersDataSource.paginator.firstPage();
    }
  }
}
