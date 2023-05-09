import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import Swal from "sweetalert2";
import {CategoryService} from "../../../services/category.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
    constructor(private _route:ActivatedRoute, private _quiz : QuizService, private _cat: CategoryService,
                private _snack:MatSnackBar, private _router: Router) {
    }

    quiz:any;

    qId = 0;

    categories:any=null;

    ngOnInit(): void {
        this.qId = this._route.snapshot.params['qid']
        // alert(this.qId)
        this._quiz.getQuiz(this.qId).subscribe((data) => {
            this.quiz = data
            console.log(this.quiz)
        }, (error) => {
            Swal.fire("Failed","Something went wrong",'error')
        })

        this._cat.categories().subscribe((data : any ) => {
            this.categories = data
        },(error) => {
            this._snack.open("Something wrong while fetching categories",'ok',{
                verticalPosition:'top',
                duration:1800
            })
        })
    }

    updateForm() {

        if (this.quiz.title.trim() == '' || this.quiz.title == null) {
            this._snack.open("Cannot be empty",'ok', {
                duration:1585,
            })
            return;
        }

        this._quiz.updateQuiz(this.quiz).subscribe((data) => {
            Swal.fire("Success","Quiz Updated",'success')
            this._router.navigate(['admin/quizzes'])

        }, (error) => {
            Swal.fire('Failed','Not updated ','error')
        })
    }

}

