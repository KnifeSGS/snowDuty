import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-subcontracts',
  templateUrl: './subcontracts.component.html',
  styleUrls: ['./subcontracts.component.scss']
})
export class SubcontractsComponent {
  customers: any[] = [
    {
      id: 1000,
      name: 'James Butt',
      country: {
        name: 'Algeria',
        code: 'dz'
      },
      company: 'Benton, John B Jr',
      date: '2015-09-13',
      status: 'unqualified',
      verified: true,
      activity: 17,
      representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png'
      },
      balance: 70663
    }
  ];

  representatives!: any[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor() { }

  ngOnInit() {
    // this.customerService.getCustomersLarge().then((customers) => {
    //     this.customers = customers;
    //     this.loading = false;

    //     this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));
    // });

    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ];
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string) {
    // switch (status.toLowerCase()) {
    //   case 'unqualified':
    //     return 'danger';

    //   case 'qualified':
    //     return 'success';

    //   case 'new':
    //     return 'info';

    //   case 'negotiation':
    //     return 'warning';

    //   case 'renewal':
    //     return null;
    // }
  }
}
