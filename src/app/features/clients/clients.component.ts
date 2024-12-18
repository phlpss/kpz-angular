import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ClientsDialogComponent} from './clients-dialog/clients-dialog.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {CapitalizeWordsPipe} from '../../shared/capitalize-words.pipe';
import {ClientDataService} from '../../core/services/client-data.service';
import {Client} from '../../core/types';

@Component({
    selector: 'app-clients',
    standalone: true,
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    CapitalizeWordsPipe,
    // Dialog component for Add/Edit
  ],
})
export class ClientsComponent implements OnInit {

    users: MatTableDataSource<any> = new MatTableDataSource();
    displayedColumns: string[] = ['id', 'fullName', 'email', 'contactNumber', 'actions'];

    constructor(
      private dataService: ClientDataService,
      private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
      this.dataService.getClients().subscribe((data: Client[]) => {
            this.users.data = data; // Update the dataSource
        });
    }

    addUser(): void {
        const dialogRef = this.dialog.open(ClientsDialogComponent, {
            width: '400px',
            data: {action: 'Add'},
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.dataService.addClient(result).subscribe(() => {
                    this.getUsers();
                });
            }
        });
    }

    editUser(user: any): void {
        const dialogRef = this.dialog.open(ClientsDialogComponent, {
            width: '400px',
            data: {action: 'Edit', user},
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                result.id = user.id;
              this.dataService.updateClient(result).subscribe(() => {
                    this.getUsers(); // Refresh table after editing
                });
            }
        });
    }

    deleteUser(id: number): void {
        if (confirm('Are you sure you want to delete this user?')) {
          this.dataService.deleteClient(id).subscribe(() => {
                this.getUsers(); // Refresh table after deletion
            });
        }
    }
}
