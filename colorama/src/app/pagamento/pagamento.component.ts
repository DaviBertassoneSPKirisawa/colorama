import { Component } from '@angular/core';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent {
  metodoSelecionado: string = '';
  exibirOpcoesPagamento: boolean = false;

  mostrarOpcoesPagamento() {
    this.exibirOpcoesPagamento = true;
  }

  selecionarPagamento(metodo: string) {
    this.metodoSelecionado = metodo;
  }
}
