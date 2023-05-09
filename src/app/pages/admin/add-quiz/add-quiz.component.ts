import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import Swal from "sweetalert2";
import {MatSnackBar} from "@angular/material/snack-bar";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{
    categories = [
        {
            cid: '',
            title:''
        }
    ]

    quizData = {
        title:"",
        description:'',
        maxMarks:'',
        numberOfQuestions:'',
        active:true,
        category:{
            cid:''
        }
    }

    constructor(private _cat: CategoryService, private _snack: MatSnackBar, private _quiz:QuizService) {
    }

    ngOnInit(): void {
        this._cat.categories().subscribe((data:any) => {
            this.categories = data
        }, (error) => {
            Swal.fire(error,"Something went wrong","error")
        } )
    }

    addQuiz() {
        if (this.quizData.title.trim() == '' || this.quizData.title == null){
            this._snack.open("Title cannot be empty",'ok',{
                duration:2000,
                verticalPosition:"top"
            })
            return;
        } else {
           return this._quiz.addQuiz(this.quizData).subscribe((data) => {
               Swal.fire('Success',"Quiz Is added","success")
              this.quizData = {
                  title: "",
                  description: '',
                  maxMarks: '',
                  numberOfQuestions: '',
                  active: true,
                  category: {
                      cid: ''
                  }
              }
           },(error) => {
               Swal.fire("Error","Something went wrong",'error')
           })
        }
    }
}

