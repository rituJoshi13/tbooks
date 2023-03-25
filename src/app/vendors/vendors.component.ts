import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
  @ViewChild('content') content;

  vendorProfileModel = new VendorProfileModel();
  private gridApi: GridApi;
  private gridColumnApi: any;
  public modules: any;
  public gridOptions: GridOptions;
  public rowData: Array<any>;
  public vendorData: Array<VendorProfileModel>;
  public companyName='';
  public vendorId="";
  public myState ;
  public isEditing = false;
  public myVendorId="";
  allStates=[];
  constructor(
    private modalService: NgbModal,
    private _vendor:VendorService,
    private _company:CompanyProfileService,
    ) { }
  closeResult = '';
  ngOnInit(): void {
   
    this.getState();
    this.getCompanyInfo();
    this.gridOptions = {
      columnDefs: [
        { headerName:'Vendor Id',field: 'vendorId',  flex: 1,filter: 'agTextColumnFilter',hide:true },
        { headerName:'Vendor Name',field: 'vendorName',  flex: 1,filter: 'agTextColumnFilter' },
        { headerName:'GST Number',field: 'gstNumber',  flex: 1 ,hide:true},
        { headerName:'State',field: 'state',  flex: 1 ,hide:true},
        { headerName:'Pending Files',field: 'pendingFiles', flex: 1, type: 'rightAligned',cellRenderer: (params: ICellRendererParams) => {
          params.data    // here the data is the row object you need
          return `<a href="YOUR_URL/${params.data.PrndingFiles}">${params.value}</a>`;
        }},
        { headerName:'Total Ledgers',field: 'totalLedgers',  flex: 1,type: 'rightAligned',cellRenderer: (params: ICellRendererParams) => {
          params.data    // here the data is the row object you need
          return `<a href="YOUR_URL/${params.data.TotalLedgers}">${params.value}</a>`;
       }},
        { headerName:'Action',field: 'action', maxWidth:160,cellRenderer: (params) => { 
         
          return `<div class="icon-wrapper"><button data-action="edit" class="material-icons" >edit</button><button data-action="delete" class="material-icons">delete</button><a href="/home?vId=${params.data.vendorId}" class="material-icons">downloading</a></div>`; }}
      ],
      pagination: true
    }
  } 
  
  onCellClicked(params) {
    // Handle click event for action cells
    
    if (params.column.colId === "action" && params.event.target.dataset.action) {
      let action = params.event.target.dataset.action;
      
      if (action === "edit") {
        this.isEditing = true;
        this.myVendorId = params.data.vendorId;
        this.vendorProfileModel.vendor_name =params.data.vendorName;
        this.vendorProfileModel.gst_number=params.data.gstNumber;
        this.vendorProfileModel.state = params.data.state;
        this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
      }

      if (action === "delete") {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.destroyVendor(params.data.vendorId);
          
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your vendor is safe :)',
              'error'
            )
          }
        })
       
      }

      if (action === "update") {
        params.api.stopEditing(false);
      }

      if (action === "cancel") {
        params.api.stopEditing(true);
      }
    }
  }
  async getCompanyInfo(){
    var promise =  await new Promise<boolean>((resolve, reject) => {
       this._vendor.getCompanyById().subscribe({
         next: (res: any) => {
          
          this.companyName = res[0].compnay_name;
          
        
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
    this.clearFields();
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
      rowData.push(
        {'vendorId':key['customer_vendor_id'],
         'vendorName':key['vendor_name'],
         'gstNumber':key['gst_number'],
         'state':key['state'],
      });
     });
     this.gridOptions.api.setRowData(rowData);
  }
  async getVendorDataFromApi(){
    var promise =  await new Promise<VendorProfileModel[]>((resolve, reject) => {
     
      this._vendor.getVendors().subscribe({
        next: (res: any) => {
          
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
    this.isEditing ? this.updateVendor(this.myVendorId): this.addVendor();

   
  
  }
  clearFields(){
    this.vendorProfileModel.vendor_name ="";
    this.vendorProfileModel.gst_number="";
    this.vendorProfileModel.state=undefined;
  }
	async addVendor(){
    var myVendor ={
      "vendor_name":this.vendorProfileModel.vendor_name,
      "gst_number":this.vendorProfileModel.gst_number ?? " ",
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
        this. clearFields();
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
  async updateVendor(vendorId:string){
    var myVendor ={
      "vendor_name":this.vendorProfileModel.vendor_name,
      "gst_number":this.vendorProfileModel.gst_number ?? " ",
      "state":this.vendorProfileModel.state,
    
    }
    var promise =  await new Promise<VendorProfileModel>((resolve, reject) => {
     
      this._vendor.updateVendorApi(vendorId,myVendor).subscribe({
        next: (res: any) => {
          this.modalService.dismissAll();
          Swal.fire({
            text: "The Vendor is updated",
            icon: 'succcess',
            confirmButtonColor: '#098EE2',
            confirmButtonText: 'OK'
          })
          this.isEditing =false;
        this. clearFields();
          this.getVendorData();
          resolve(res);
        },
        error: (err: any) => {
          Swal.fire({
            text: "The Vendor is not updated",
            icon: 'error',
            confirmButtonColor: '#ff0000',
            confirmButtonText: 'OK'
          })
          resolve(err);
        }
      });
    });
    return promise;
  }
  async destroyVendor(vendorId:string){
   
    var promise =  await new Promise<VendorProfileModel>((resolve, reject) => {
     
      this._vendor.destroyVendorApi(vendorId).subscribe({
        next: (res: any) => {
         
          Swal.fire({
            text: "The Vendor is deleted",
            icon: 'succcess',
            confirmButtonColor: '#098EE2',
            confirmButtonText: 'OK'
          })
          this.getVendorData();
          resolve(res);
        },
        error: (err: any) => {
          Swal.fire({
            text: "The Vendor is not deleted",
            icon: 'error',
            confirmButtonColor: '#ff0000',
            confirmButtonText: 'OK'
          })
          resolve(err);
        }
      });
    });
    return promise;
  }
}
