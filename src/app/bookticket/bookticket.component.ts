import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ViewEncapsulation
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Trainticket } from '../trainticket';
import { range } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bookticket',
  templateUrl: './bookticket.component.html',
  styleUrls: ['./bookticket.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookticketComponent implements OnInit {
  @ViewChild('ticketData') ticketData: FormGroup;

  noofticket: number;
  totalSeats: number = 80;
  error: string = '';
  Tickets: any = [];
  totalRows: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTickets();
    console.log(this.Tickets);
  }

  generateCoaches(trainTicket: any) {
    this.http
      .post<Trainticket>('https://catchmyoffer.com/generateTicket', trainTicket)
      .subscribe(
        data => {},
        error => {
          this.error = error.message;
        }
      );
  }

  saveTicket() {
    this.updateTicket(this.ticketData.value.number_of_ticket);
    console.log(this.ticketData.value.number_of_ticket);
  }

  generateTicket() {
    let row = 1;
    let match = 0;
    let PostArray = [];
    for (let index = 1; index <= this.totalSeats; index++) {
      console.log(index);

      if (index % 7 == 0) {
        match = index + 1;
      }
      if (match == index) {
        ++row;
      }

      let ticket = {
        id: index,
        seat_no: 'S' + index,
        is_occupied: 0,
        booking_user: '',
        row_no: row
      };
      PostArray.push(ticket);
    }
    console.log(PostArray);

    this.generateCoaches(PostArray);
  }

  getTickets() {
    this.http
      .get('https://catchmyoffer.com/getTickets')
      .pipe(
        map(returndata => {
          return returndata;
        })
      )
      .subscribe(
        allTickets => {
          this.Tickets = allTickets;
        },
        error => {
          this.error = error.message;
        }
      );
  }

  updateTicket(noofTicket) {
    this.http
      .post<Trainticket>('https://catchmyoffer.com/updateTicket', {
        noofTicket
      })
      .subscribe(
        data => {
          console.log('ticketupdate');
          if (data['msg']) {
            this.error = data['msg'];
          } else {
            if (data['error']) {
              this.error = data['error'];
            } else {
              this.error = 'Something Went Wrong';
            }
          }

          this.getTickets();
        },
        error => {
          this.error = error.message;
        }
      );
  }

  ticketReset() {
    this.http
      .get('https://catchmyoffer.com/resetTicket')
      .pipe(
        map(tickets => {
          return tickets;
        })
      )
      .subscribe(
        resultdata => {
          if (resultdata['status'] == '1') {
            this.getTickets();
            this.error = resultdata['msg'];
          } else {
            this.error = resultdata['msg'];
          }
        },
        error => {
          this.error = error.message;
        }
      );
  }
}
