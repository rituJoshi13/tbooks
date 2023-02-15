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
import { TokenStorageService } from '../services/token-storage.service';
import { CompanyProfileService } from '../services/company-profile.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
  public companyName='';

  allStates=[];
  constructor(
    private modalService: NgbModal,
    private _token:TokenStorageService,
    private _vendor:VendorService,
    private _company:CompanyProfileService,
    ) { }
  closeResult = '';
  ngOnInit(): void {
    this.getState();
    this.getCompanyInfo();
    this.gridOptions = {
      columnDefs: [
        { headerName:'Vendor Name',field: 'vendorName',  flex: 1,filter: 'agTextColumnFilter' },
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
  async getCompanyInfo(){
    var promise =  await new Promise<boolean>((resolve, reject) => {
       this._vendor.getCompanyById().subscribe({
         next: (res: any) => {
          
          this.companyName = res[0].compnay_name;
          
          console.log(res);
           resolve(true);
         },
         error: (err: any) => {
           resolve(false);
         }
       });
     });
    
     return promise;
   }
  async getState(){
    var promise =  await new Promise<boolean>((resolve, reject) => {
       this._company.getAllState().subscribe({
         next: (res: any) => {
          this.allStates=res;
          console.log(this.allStates);
           resolve(true);
         },
         error: (err: any) => {
           resolve(false);
         }
       });
     });
    
     return promise;
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
  var rowData = [];
    this.vendorData = await this.getVendorDataFromApi();
    this.vendorData.forEach((key, value) => {
      rowData.push({'vendorName':key['vendor_name']});
     });
     this.gridOptions.api.setRowData(rowData);
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
    this.addVendor();
  
  }
	async addVendor(){
    var myVendor ={
      "vendor_name":this.vendorProfileModel.vendor_name,
      "gst_number":this.vendorProfileModel.gst_number,
      "state":this.vendorProfileModel.state,
    
    }
    var promise =  await new Promise<VendorProfileModel>((resolve, reject) => {
     
      this._vendor.addVendorApi(myVendor).subscribe({
        next: (res: any) => {
          this.modalService.dismissAll();
          Swal.fire({
            text: "The Vendor is added",
            icon: 'succcess',
            confirmButtonColor: '#098EE2',
            confirmButtonText: 'OK'
          })
          this.getVendorData();
          resolve(res);
        },
        error: (err: any) => {
        
          resolve(err);
        }
      });
    });
    return promise;
  }
}
