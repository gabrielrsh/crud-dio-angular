import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  // FormGroup é para relacionar os inputs do template com variaveis.
  userForm: FormGroup;
  users: Array<User> = [];

  constructor(private formBuilder: FormBuilder, private userService: UserService) { 
    this.userForm = formBuilder.group({
      id: 0,
      nome: '',
      sobrenome: '',
      idade: 0,
      profissao: ''
    })
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    })
  }

  createUser() {
    this.userForm.get('id')?.patchValue(this.users.length+1);
    this.userService.postUser(this.userForm.value).subscribe(result => {
      console.log(`Usuário ${result.nome} ${result.sobrenome} cadastrado com sucesso!`);
    })
  }

}
