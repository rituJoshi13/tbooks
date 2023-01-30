import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {
	ColDef,
	ICellRendererParams,
  GridOptions,
  GridApi
  } from "ag-grid-community";
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { AddLedgerModel } from '../models/vendor-profile';
  import * as XLSX from 'xlsx';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  addLedgerModel = new AddLedgerModel();
  private gridApi: GridApi;
  private gridColumnApi: any;
  public modules: any;
  public gridOptions: GridOptions;
  public rowData: Array<any>;
 
  constructor(private modalService: NgbModal) {
      this.gridOptions = {
        columnDefs: [
          { headerName:'Ledger Name',field: 'ledgerName',  flex: 1,filter: 'agTextColumnFilter' },
          { headerName:'Action',field: 'action', maxWidth:160,cellRenderer: (params) => { return '<div class="icon-wrapper"><span class="material-icons">edit</span><span class="material-icons"><span class="material-symbols-outlined">delete</span></span></div>'; }}
        ],
        pagination: true
      }
  }
   
  ngOnInit(): void {
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;   
    this.gridApi.sizeColumnsToFit(); 
  }
  importExcel(event: any) {
    var rowData = [];
    if (event.target.files.length > 0) {
      const target: DataTransfer = <DataTransfer>(event.target);
      if (target.files.length !== 1) {
        throw new Error('Cannot use multiple files');
      }
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(target.files[0]);
      reader.onload = (e: any) => {
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws); 
       data.forEach((key, value) => {
        rowData.push({'ledgerName':key['Ledger Name']});
       });
       this.gridOptions.api.setRowData(rowData);
      };
    }
  }
  
  storeCompanyInfo(data){
    
  }
  open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}
  onSubmit() {
    alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    console.log(this.addLedgerModel);
  }

}