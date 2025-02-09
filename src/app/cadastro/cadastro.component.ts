import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  etapa: number = 1; // Controle da etapa do formulário
  dadosPessoaisForm: FormGroup;
  enderecoForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Formulário de Dados Pessoais
    this.dadosPessoaisForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
      dataDeNascimento: ['', Validators.required]
    });

    // Formulário de Endereço
    this.enderecoForm = this.fb.group({
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      rua: [{ value: '', disabled: true }],
      bairro: [{ value: '', disabled: true }],
      cidade: [{ value: '', disabled: true }],
      estado: [{ value: '', disabled: true }],
      numero: ['', Validators.required],
      complemento: ['']
    });
  }

  ngOnInit(): void {}

  buscarCEP() {
    const cep = this.enderecoForm.get('cep')?.value.replace('-', '');
    if (cep && cep.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe(
        (data: any) => {
          if (data.erro) {
            alert('CEP não encontrado!');
          } else {
            this.enderecoForm.patchValue({
              rua: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf
            });
          }
        },
        () => {
          alert('Erro ao consultar o CEP.');
        }
      );
    } else {
      alert('Digite um CEP válido!');
    }
  }

  proximaEtapa() {
    this.etapa = 2; // Avança para a próxima etapa (endereço)
  }
  
  

  voltarEtapa() {
    this.etapa = 1;
  }

  cadastrar() {
    if (this.dadosPessoaisForm.valid && this.enderecoForm.valid) {
      const dadosCliente = {
        ...this.dadosPessoaisForm.value,
        ...this.enderecoForm.value
      };
      console.log('Cadastro realizado:', dadosCliente);
      alert('Cadastro realizado com sucesso!');
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }
}
