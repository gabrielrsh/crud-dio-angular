import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  userId:any = '';

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private actRoute: ActivatedRoute, private router: Router) { 
    this.userForm = formBuilder.group({
      id: 0,
      nome: '',
      sobrenome: '',
      idade: 0,
      profissao: ''
    })
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
      console.log(this.userId)
      if(this.userId !== null){
        this.userService.getUserById(this.userId).subscribe({
          next: result => {
            this.userForm.patchValue({
              id: result[0].id,
              nome: result[0].nome,
              sobrenome: result[0].sobrenome,
              idade: result[0].idade,
              profissao: result[0].profissao
            })
          }
        })
      }
    })

    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    })
  }

  createUser() {
    this.userForm.get('id')?.patchValue(this.users.length+1);
    this.userService.postUser(this.userForm.value).subscribe({
      next: result => {
        console.log(`Usuário ${result.nome} ${result.sobrenome} cadastrado com sucesso!`);
      },
      complete: () => this.router.navigate(['/'])
    })
  }

  updateUser() {
    this.userService.updateUser(this.userId, this.userForm.value).subscribe({
      next: result => {
        console.log('Usuario atualizado', result);
      },
      complete: () => this.router.navigate(['/'])
    })
  }

  actionButton() {
    if(this.userId !== null){
      this.updateUser()
    }
    else {
      this.createUser();
    }
  }
}
