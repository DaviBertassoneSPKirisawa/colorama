import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PagamentoRequest {
  metodo: number;  // 1 - Pix, 2 - Boleto, 3 - Cartão
  valor: number;
  vencimento?: string;  // Formato: 'YYYY-MM-DD'
}

export interface PagamentoResponse {
  metodo: string;
  detalhes: string;
  qrCodeBase64?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  private apiUrl = 'http://localhost:5039/swagger/index.html';  // Altere para a URL correta da API

  constructor(private http: HttpClient) {}

  simularPagamento(request: PagamentoRequest): Observable<PagamentoResponse> {
    return this.http.post<PagamentoResponse>(`${this.apiUrl}/FormaDePagamento`, request);
  }
}   
