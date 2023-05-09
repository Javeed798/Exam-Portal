import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit{

    constructor(private _category: CategoryService) {
    }

    categories = [
        {
            title: "",
            description: ""
        }

    ]

    ngOnInit(): void {
        this._category.categories().subscribe((data:any) => {
            this.categories = data;
            console.log(this.categories)
        }, (error) =>  {
            console.log(error);
            Swal.fire("Krrrrrr Error","error in loading data","error")
        })
    }
}
