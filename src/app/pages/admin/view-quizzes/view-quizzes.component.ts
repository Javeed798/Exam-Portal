import {Component, OnInit} from '@angular/core';
import {QuizService} from "../../../services/quiz.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{
    constructor(private _quiz:QuizService) {
    }
    quizzes :any = null;

    ngOnInit(): void {
        this._quiz.quizzes().subscribe((data:any) => {
            this.quizzes = data
        }, (error) => {
            console.log(error)
            Swal.fire("Error!","Error in loading data","error");
        })
    }

    deleteQuiz(qId: any) {
        //console.log(quiz);
        Swal.fire({
            title: "Do you want to delete quiz: '?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Yes`,
        }).then((result) => {
            if (result.isConfirmed) {
                this._quiz.deleteQuiz(qId).subscribe(
                    (data) => {
                        //console.log(data);
                        if (data) {
                            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId != qId);
                            Swal.fire("Success","Deleted",'success');
                            window.location.reload();
                        }
                        else {
                            Swal.fire("Quiz " + " could not be deleted" , 'try Agin', 'error');
                            window.location.reload();

                        }
                    },
                    (error) => {
                        Swal.fire('Server error while deleting Quiz: ' , " please try again",  'error');
                        window.location.reload();
                    }
                );
            }
        })


    }

}
