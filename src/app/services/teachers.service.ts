import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iteachers } from '../models/teachers';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class TeachersService {
  constructor(private http: HttpClient) {}
  private calendarSource = new BehaviorSubject<object>({
    firstDayOfWeek: 1,
    dayNames: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'],
    dayNamesShort: ['Нед', 'Пон', 'Вів', 'Сер', 'Чет', 'П\'ят', 'Суб'],
    dayNamesMin: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    monthNames: [ 'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень',
     'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень' ],
    monthNamesShort: [ 'Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру' ],
    today: 'Сьогодні',
    clear: 'Clear'
  });
  currentCalendar = this.calendarSource.asObservable();
  public formatDate(date) {
      const d = new Date(date);
      const  year = d.getFullYear();
      let  month = '' + (d.getMonth() + 1);
      let  day = '' + d.getDate();
      if (month.length < 2) { month = '0' + month; }
      if (day.length < 2) { day = '0' + day; }
      return [year, month, day].join('-');
  }
  public getTeachers(): Observable<Iteachers[]> {
    return this.http.get<Iteachers[]>('teachers')
      .map((response: any) => {
        return response.data;
      });
    }
  public postTeacher(teacher: Iteachers): Observable<Iteachers> {
   return this.http.post<Iteachers>('teachers', teacher)
      .map((response: any) => {
        return response.data;
      });
  }
  public putTeacher(teacher: Iteachers): Observable<Iteachers> {
    return this.http.put<Iteachers>(`/admin/teachers/${teacher.id}`, teacher)
    .map((response: any) => {
      return response.data;
    });
  }
}
