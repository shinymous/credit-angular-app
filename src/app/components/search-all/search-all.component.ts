import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit {

  constructor(private searchService : SearchService) { }
  proposals : any = [];
  quantity : number;
  total : number;
  pages : number;
  actualPage : number;
  ngOnInit() {
    this.actualPage = 1;
    this.loadData();
  }

  nextPage(){
    if(this.actualPage+1 <= this.pages){
      this.actualPage ++;
      this.loadData();
    }
  }

  previousPage(){
    if(this.actualPage-1 >= 1){
      this.actualPage --;
      this.loadData();
    }
  }

  loadData(){
    this.searchService.getAllProposals(this.actualPage-1, 10).subscribe(resp => {
      this.proposals = resp['elements'];
      this.actualPage = resp['page']+1;
      this.total = resp['totalElements']
      this.quantity = resp['limit'];
      if(this.total > this.quantity && this.quantity == 10){
        this.pages = Math.ceil(this.total/this.quantity);
      }else{
        this.pages = this.actualPage;
      }
    }, (error) => console.error(error))
  }
  
}
