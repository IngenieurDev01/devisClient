import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn : string = "Valider"
  constructor(private formBuilder : FormBuilder,
     private api : ApiService,
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      NOM : ['', Validators.required],
      PRENOM : ['', Validators.required],
      NUMERO : ['', Validators.required],
    });
   console.log(this.editData);

   /* FAIRE LA MODIFICATION DU CLIENT */
   if(this.editData){
     this.actionBtn = "Update";
     this.productForm.controls['NOM'].setValue(this.editData.NOM);
     this.productForm.controls['PRENOM'].setValue(this.editData.PRENOM);
     this.productForm.controls['NUMERO'].setValue(this.editData.NUMERO);
   }
  }
  ajoutclient(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("Client enrégistrer avec succès !!!")
            this.productForm.reset();
            this.dialogRef.close('valider');
          },
          error: ()=>{
            alert("Erreur d'enrégistrement !!!")
          },
        })
      }
    }else{
      this.updateClient()
    }
  }
   updateClient(){
    this.api.putClient(this.productForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Client modifier avec succès !!!");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: ()=>{
        alert("Erreur lors de la modification !!!");
      }
    })
  }
}
