import { AppError } from './../../common/app.error';
import { BadInputError } from './../../common/bad.input.error';
import { TaskService } from './../../services/task/task.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
	
	public taskList: any[];
	showLoader = true;
	constructor(private service: TaskService, private fb: FormBuilder) {
	}

	public taskForm = this.fb.group({
		'title': ['', 
			[
				Validators.required
			]
		],
		'body': ['', 
			[
				Validators.required
			]
		]
	});

	ngOnInit() {
		this.service.getAll()
		.subscribe(task => {
			this.taskList = task;
			this.showLoader = false;
		});
	}
	
	/**
	 * createTask
	 */
	public createTask() {
		console.log(this.taskForm.value)
		let data = this.taskForm.value;
		this.taskList.splice(0, 0, data);
		this.service.create(data)
		.subscribe(
			task => {
				data['id'] = task.id;
			},
			(error: AppError) => {
				this.taskList.splice(0, 1);

				if (error instanceof BadInputError) {
					this.taskForm.setErrors(error.OriginalError)
				} else throw error;
			});
	}

	/**
	 * deleteTask
	 */
	public deleteTask(post: any) {
		let index = this.taskList.indexOf(post);
		this.taskList.splice(index, 1);
		
		this.service.delete(post.id)
		.subscribe(
			null,
			(error: AppError) => {
				this.taskList.splice(0, 0, post);

				if (error instanceof BadInputError) {
					this.taskForm.setErrors(error.OriginalError)
				} else throw error;
			}
		);
	}
}

