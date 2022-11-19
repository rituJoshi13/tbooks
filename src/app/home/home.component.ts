import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {
	ColDef,
	ICellRendererParams
  } from 'ag-grid-community';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { AddLedgerModel } from '../models/vendor-profile';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  addLedgerModel = new AddLedgerModel();
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}
  onSubmit() {
    alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    console.log(this.addLedgerModel);
  }
  columnDefs: ColDef[] = [
    { headerName:'Ledger Name',field: 'ledgerName',  flex: 1,filter: 'agTextColumnFilter' },
   
   
    { headerName:'Action',field: 'action', maxWidth:160,cellRenderer: (params) => { return '<div class="icon-wrapper"><span class="material-icons">edit</span><span class="material-icons"><span class="material-symbols-outlined">delete</span></span></div>'; }}
  ];
  
  rowData = [
    { ledgerName: 'Toyota' },
    { ledgerName: 'Toyota' },
    { ledgerName: 'Toyota' },
  ];
  
}
