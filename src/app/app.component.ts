import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'devisclient';
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'numero', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  

  constructor(private dialog : MatDialog, private api : ApiService){

  }
  ngOnInit(): void {
    this.getAllClients();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
     width: '30%'
    }).afterClosed().subscribe(val =>{
      if(val === 'Valider'){
        this.getAllClients();
      }
    })
  }
  getAllClients(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
       
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      },
      error: (err)=>{
        alert("Erreur lors du rechargement !!!")
      }
    })
  }
  editClient(row : any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data: row
    }).afterClosed().subscribe(val =>{
      if(val === 'update'){
        this.getAllClients();
      }
    })
  }
  deleteClient(id: number){
    this.api.deleteClient(id)
    .subscribe({
      next: (res)=>{
        alert("Client supprimer avec succès !!!");
        this.getAllClients();
      },
      error:()=>{
        alert("Erreur lors de la suppression du client !!!");
      }
    })
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
  
}
