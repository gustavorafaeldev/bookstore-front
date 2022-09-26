import { Livro } from './../livro.model';
import { LivroService } from './../livro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

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
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }


  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta
    })
  }

  update(): void {
    this.service.update(this.livro).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro atualizado com sucesso!')
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem("Falha ao atualizar livro! Tente mais tarde")
    })
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