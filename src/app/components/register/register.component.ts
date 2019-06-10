import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StatesService } from 'src/app/services/states.service';
import { RegisterService } from 'src/app/services/register.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  states : any;
  genders : any;
  maritalStatus : any;
  email: string;

  client : any = {};
  responseError : string = "";

  constructor(private statesService : StatesService,
    private registerService:RegisterService,
    private router: Router) {
  }
  
  ngOnInit() {
    this.states = this.statesService.getStates();
    this.genders = [{label:'Masculino', value:'M'}, {label:'Feminino', value:'F'}]
    this.maritalStatus = [{label:'Solteiro',value:'SINGLE'},
    {label:'Casado', value:'MARRIED'},
    {label:'Separado', value:'SEPARATE'},
    {label:'Divorciado', value:'DIVORCED'},
    {label:'Viúvo', value: 'WIDOWER'}]
    this.client.gender = 'M';
    this.client.maritalStatus = 'SINGLE'
    this.client.state = this.states[0];
  }

  stateChange(event){
    this.client.state = event.target.value;
  }

  genderChange(event){
    this.client.gender = event.target.value;
  }

  maritalStatusChange(event){
    this.client.maritalStatus = event.target.value;
  }
  
  nameHandler(event){
    this.client.name = event.target.value;
  }

  cpfHandler(event){
    this.client.cpf = event.target.value;
  }

  ageHandler(event){
    this.client.age = event.target.value;
  }

  dependentsHandler(event){
    this.client.dependents = event.target.value;
  }

  incomeHandler(event){
    this.client.income = event.target.value;
  }

  submit(){
    this.registerService.sendProposal(this.client).subscribe((resp) => {
      this.responseError = "";
      this.router.navigate(['/search', {cpf:this.client.cpf}]);

    },(error) => this.responseError = error.error.message );
  }

}
