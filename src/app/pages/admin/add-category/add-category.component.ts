import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import Swal from "sweetalert2";
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{

    constructor(private _category:CategoryService, private _snack:MatSnackBar) {
    }

    category = {
        cid:'',
        title : '',
        description: ''
    }

    formSubmit() {
        if (this.category.title.trim() == '' || this.category.title.trim() == null) {
            this._snack.open("Title should not be empty",'ok',{
                verticalPosition:"top",
                duration:2000,
            })
            return;
        }

        this._category.addCategory(this.category).subscribe((data:any) => {
            this.category.title = '';
            this.category.description ='';
            Swal.fire("Data added Successfully",'success','success')
        }, (error) => {
            this._snack.open("Error while saving to db",'ok',{
                 verticalPosition:'top',
                duration:2100
            })
        })
    }

    ngOnInit(): void {
    }

}
