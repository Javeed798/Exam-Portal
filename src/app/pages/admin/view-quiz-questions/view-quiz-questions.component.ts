import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../../../services/question.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{
    constructor(private _route: ActivatedRoute,
                private _question:QuestionService,
                private _snack: MatSnackBar
                ) {
    }

    qid:any;
    qTitle:any;
    questions:any = [];

    ngOnInit(): void {
        this.qid = this._route.snapshot.params['qid']
        this.qTitle = this._route.snapshot.params['title']
        // console.log(this.qid + " " + this.qTitle)
        this._question.getQuestionsOfQuiz(this.qid).subscribe((data:any) => {
            this.questions = data
        }, (error) => {
            this._snack.open("Something went wrong",'ok',{
                duration:1500,
                verticalPosition:"top"
            })
        })
    }

}
