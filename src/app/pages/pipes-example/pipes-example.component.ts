import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipes-example',
  templateUrl: './pipes-example.component.html',
  styleUrls: ['./pipes-example.component.css']
})
export class PipesExampleComponent implements OnInit {

  number = 0;
  text = 'hello world!';
  data =  new Date;

  pessoa = {
    nome: 'Lionel Messi',
    idade: 35,
    profissao: 'Jogador de Futebol'
  }

  nomes = ['Gabriel']

  constructor() { }

  ngOnInit(): void {
  }

  mudaValor():void {
    this.text = "novo texto";
  }

  add(text: string):void {
    this.nomes.push(text);
  }

}
