import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { error } from 'util';
import {  } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CurrencyFormatPipeService } from 'src/app/services/currency-format-pipe.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
@Pipe({
  name: 'currencyformat'
})
export class SearchComponent implements OnInit {

  constructor(private searchService : SearchService,
     private currencyFormatPipe : CurrencyFormatPipeService,
     private route : ActivatedRoute) { }

  proposal : any = {};
  responseError : any = "";
  cpf : string;
  validation : string = "";
  ngOnInit() {
    this.cpf = this.route.snapshot.paramMap.get("cpf");
    console.log(this.cpf)
    if(this.cpf){
      this.submit();
    }
  }
  
  public testCPF(cpf) {
    var sum;
    var rest;
    sum = 0;
   if (cpf == "00000000000" || !cpf) return false;

   let strCPF = cpf.replace(".", "").replace(".", "").replace("-", "");
   for (let i=1; i<=9; i++) sum = sum + parseInt(strCPF.substring(i-1, i)) * (11 - i);
   rest = (sum * 10) % 11;
    
     if ((rest == 10) || (rest == 11))  rest = 0;
     if (rest != parseInt(strCPF.substring(9, 10)) ) return false;
    
     sum = 0;
     for (let i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i-1, i)) * (12 - i);
     rest = (sum * 10) % 11;
    
     if ((rest == 10) || (rest == 11))  rest = 0;
     if (rest != parseInt(strCPF.substring(10, 11) ) ) return false;
     return true;
 }

  cpfHandler(event) {
    this.cpf = event.target.value;
  }

  submit(){
    if(this.testCPF(this.cpf)){
      this.searchService.getProposalByCpf(this.cpf).subscribe((resp) => {
        this.validation = "";
        this.responseError = "";
        this.proposal = resp;
        this.proposal.income = this.currencyFormatPipe.transform(this.proposal.income, "BRL", false, "1.2-2");
        if(this.proposal.limit){
          let limit = this.proposal.limit.replace(".", "");
          if(Number.isInteger(Number(limit))){
            this.proposal.limit = this.currencyFormatPipe.transform(this.proposal.limit, "BRL", false, "1.2-2");
          }
        }
      }, (error) => {
        console.error(error);
        this.responseError = error.error.message
      });
    }else{
      this.validation = "CPF inválido"
    }
  }
}
