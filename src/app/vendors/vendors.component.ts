import { Component, OnInit } from '@angular/core';

import {
	ColDef,
	ICellRendererParams
  } from 'ag-grid-community';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { VendorProfileModel } from '../models/vendor-profile';
@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
  vendorProfileModel = new VendorProfileModel();
  constructor(private modalService: NgbModal) { }
  closeResult = '';
  ngOnInit(): void {
  }
	open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}
  onSubmit() {
    alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    console.log(this.vendorProfileModel);
  }
	
  columnDefs: ColDef[] = [
	{ headerName:'Company Name',field: 'companyName',  flex: 1,filter: 'agTextColumnFilter' },
	{ headerName:'Prnding Files',field: 'pendingFiles', flex: 1, type: 'rightAligned',cellRenderer: (params: ICellRendererParams) => {
    params.data    // here the data is the row object you need
    return `<a href="YOUR_URL/${params.data.PrndingFiles}">${params.value}</a>`;
 } },
	{ headerName:'Total Ledgers',field: 'totalLedgers',  flex: 1,type: 'rightAligned',cellRenderer: (params: ICellRendererParams) => {
    params.data    // here the data is the row object you need
    return `<a href="YOUR_URL/${params.data.TotalLedgers}">${params.value}</a>`;
 }},
  { headerName:'Action',field: 'action', maxWidth:160,cellRenderer: (params) => { return '<div class="icon-wrapper"><span class="material-icons">edit</span><span class="material-icons"><span class="material-symbols-outlined">delete</span></span><span class="material-icons">downloading</span></div>'; }}
];

rowData = [
	{ companyName: 'Toyota', pendingFiles: '14', totalLedgers: '14' },
	{ companyName: 'Toyota', pendingFiles: '14', totalLedgers: '14' },
  { companyName: 'Toyota', pendingFiles: '14', totalLedgers: '14' },
];




}
