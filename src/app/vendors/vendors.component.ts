import { Component, OnInit } from '@angular/core';

import {
	ColDef,
	
  } from 'ag-grid-community';


@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  columnDefs: ColDef[] = [
	{ field: 'CompanyName',  flex: 1 },
	{ field: 'PrndingFiles', flex: 1 },
	{ field: 'TotalLedgers',  flex: 1},
  { field: 'Action', maxWidth:260}
];

rowData = [
	{ CompanyName: 'Toyota', PrndingFiles: '14', TotalLedgers: '14' },
	{ CompanyName: 'Toyota', PrndingFiles: '14', TotalLedgers: '14' },
  { CompanyName: 'Toyota', PrndingFiles: '14', TotalLedgers: '14' },
];




}
