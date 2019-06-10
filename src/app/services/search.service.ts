import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }
  endpoint = 'http://localhost:8080/newcredit/api/v1/';
  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      })

  };
  public getProposalByCpf(cpf : string){
    return this.http.get(this.endpoint+'proposal/'+cpf);
  }

  public getAllProposals(page, limit){
    return this.http.get(this.endpoint+`proposal?page=${page}&limit=${limit}`)
  }
}
