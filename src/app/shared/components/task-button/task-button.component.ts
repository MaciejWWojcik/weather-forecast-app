import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

enum State {
  Default = 'default',
  Working = 'working',
  Done = 'done',
}

@Component({
  selector: 'app-task-button',
  templateUrl: './task-button.component.html',
  styleUrls: ['./task-button.component.scss']
})
export class TaskButtonComponent implements OnInit {

  @Input('task$') taskInProgress$: Observable<boolean> | undefined;
  @Output('onClick') clickEvent: EventEmitter<Event> = new EventEmitter<Event>();

  state$: Observable<State> | undefined;
  readonly State = State;

  private readonly state: BehaviorSubject<State> = new BehaviorSubject<State>(State.Default);
  private readonly timeToReset: number = 5000;

  constructor() {
  }

  ngOnInit(): void {
    const taskInProgress$ = (this.taskInProgress$ || of(false)).pipe(startWith(false));

    this.state$ = combineLatest([
      this.state.asObservable(),
      taskInProgress$,
    ]).pipe(
      map(([state, taskInProgress]) => {
        if (state === State.Default && taskInProgress) {
          return State.Working;
        }

        if (state === State.Working && !taskInProgress) {
          return State.Done;
        }

        return state;
      }),
      tap((state) => {
        if (state === State.Done) {
          setTimeout(() => this.state.next(State.Default), this.timeToReset);
        }
      })
    );
  }

  onClick(event: Event): void {
    this.state.next(State.Working);
    this.clickEvent.emit(event);
  }

  reset(): void {
    this.state.next(State.Default);
  }

}
