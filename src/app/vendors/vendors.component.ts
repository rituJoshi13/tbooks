import { Component, OnInit } from '@angular/core';

import {
	ColDef,
	GridApi,
	GridOptions,
	ICellRendererParams
  } from 'ag-grid-community';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { VendorProfileModel } from '../models/vendor-profile';

import { VendorService } from '../services/vendor.service';
@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
  vendorProfileModel = new VendorProfileModel();
  private gridApi: GridApi;
  private gridColumnApi: any;
  public modules: any;
  public gridOptions: GridOptions;
  public rowData: Array<any>;
  public vendorData: Array<VendorProfileModel>;
  constructor(
    private modalService: NgbModal,
    
    private _vendor:VendorService,
  
    ) { }
  closeResult = '';
  ngOnInit(): void {
    this.gridOptions = {
      columnDefs: [
        { headerName:'Vendor Name',field: 'companyName',  flex: 1,filter: 'agTextColumnFilter' },
        { headerName:'Pending Files',field: 'pendingFiles', flex: 1, type: 'rightAligned',cellRenderer: (params: ICellRendererParams) => {
          params.data    // here the data is the row object you need
          return `<a href="YOUR_URL/${params.data.PrndingFiles}">${params.value}</a>`;
        }},
        { headerName:'Total Ledgers',field: 'totalLedgers',  flex: 1,type: 'rightAligned',cellRenderer: (params: ICellRendererParams) => {
          params.data    // here the data is the row object you need
          return `<a href="YOUR_URL/${params.data.TotalLedgers}">${params.value}</a>`;
       }},
        { headerName:'Action',field: 'action', maxWidth:160,cellRenderer: (params) => { return '<div class="icon-wrapper"><span class="material-icons">edit</span><span class="material-icons"><span class="material-symbols-outlined">delete</span></span><span class="material-icons">downloading</span></div>'; }}
      ],
      pagination: true
    }
  }
	open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;   
    this.gridApi.sizeColumnsToFit(); 
    this.getVendorData();
  }
 async getVendorData(){
    this.vendorData = await this.getVendorDataFromApi();

  }
  async getVendorDataFromApi(){
    var promise =  await new Promise<VendorProfileModel[]>((resolve, reject) => {
     
      this._vendor.getVendors().subscribe({
        next: (res: any) => {
       console.log(res);
          resolve(res);
        },
        error: (err: any) => {
        
          resolve([]);
        }
      });
    });
    return promise;
  }
  onSubmit() {
   
    this._vendor.addVendor(this.vendorProfileModel).subscribe({
      next: (v) => {
        
        this.modalService.dismissAll();
      },
      error: (e) => {
      console.log(e);
      }
  });
   
  }
	
}
