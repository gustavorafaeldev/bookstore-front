import { Livro } from './../livro.model';
import { LivroService } from './../livro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  titulo =  new FormControl('', [Validators.minLength(3)])
  nomeAutor =  new FormControl('', [Validators.minLength(3)])
  texto =  new FormControl('', [Validators.minLength(10)])

  id_cat: String = ''

  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

  constructor(
    private router: Router,
    private service: LivroService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Livro criado com sucesso!')
    }, err => {
      this.service.mensagem('Erro ao criar novo Livro!')
    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

  getMessage() {
    if(this.titulo.invalid) {
      return 'O campo TÍTULO deve conter entre 3 e 100 caracteres'
    }
    if(this.nomeAutor.invalid) {
      return 'O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres'
    }
    if(this.texto.invalid) {
      return 'O campo TEXTO deve conter entre 10 e 2000000 caracteres'
    }
    return false;
  }
}
