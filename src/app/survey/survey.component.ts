import {Component, OnInit} from '@angular/core';
import {ServiceService} from "../service.service";
import {Question} from "../shared/model/Question";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Score} from "../shared/model/Score";
import {Router} from "@angular/router";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) {
  }

  questions: Question[];
  form = new FormGroup({});
  myscore: Score = null;

  ngOnInit(): void {
    this.service.loadQuestions().subscribe(value => {
      this.questions = value;
      this.questions.forEach(question => {
        this.form.addControl(question.id, new FormControl(question.id, [Validators.required]));
      });
      },
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.'))
  }

  score($event: any) {
    if (this.form.valid) {
      this.service.calculateScore(this.form.value).subscribe(value => {
        this.myscore = value;
        },
        err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.'))
    }
  }

  tryAgain() {
    this.router.navigate([''])
  }
}
