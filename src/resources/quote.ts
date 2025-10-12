// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as QuoteAPI from './quote';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Quote extends APIResource {
  /**
   * Este endpoint é a principal forma de obter informações detalhadas sobre um ou
   * mais ativos financeiros (ações, FIIs, ETFs, BDRs, índices) listados na B3,
   * identificados pelos seus respectivos **tickers**.
   *
   * ### Funcionalidades Principais:
   *
   * - **Cotação Atual:** Retorna o preço mais recente, variação diária, máximas,
   *   mínimas, volume, etc.
   * - **Dados Históricos:** Permite solicitar séries históricas de preços usando os
   *   parâmetros `range` e `interval`.
   * - **Dados Fundamentalistas:** Opcionalmente, inclui dados fundamentalistas
   *   básicos (P/L, LPA) com o parâmetro `fundamental=true`.
   * - **Dividendos:** Opcionalmente, inclui histórico de dividendos e JCP com
   *   `dividends=true`.
   * - **Módulos Adicionais:** Permite requisitar conjuntos de dados financeiros mais
   *   aprofundados através do parâmetro `modules` (veja detalhes abaixo).
   *
   * ### 🧪 Ações de Teste (Sem Autenticação):
   *
   * Para facilitar o desenvolvimento e teste, as seguintes **4 ações têm acesso
   * irrestrito** e **não requerem autenticação**:
   *
   * - **PETR4** (Petrobras PN)
   * - **MGLU3** (Magazine Luiza ON)
   * - **VALE3** (Vale ON)
   * - **ITUB4** (Itaú Unibanco PN)
   *
   * **Importante:** Você pode consultar essas ações sem token e com acesso a todos
   * os recursos (históricos, módulos, dividendos). Porém, se misturar essas ações
   * com outras na mesma requisição, a autenticação será obrigatória.
   *
   * ### Autenticação:
   *
   * Para **outras ações** (além das 4 de teste), é **obrigatório** fornecer um token
   * de autenticação válido, seja via query parameter `token` ou via header
   * `Authorization: Bearer seu_token`.
   *
   * ### Exemplos de Requisição:
   *
   * **1. Cotação simples de PETR4 e VALE3 (ações de teste - sem token):**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/quote/PETR4,VALE3"
   * ```
   *
   * **2. Cotação de MGLU3 com dados históricos do último mês (ação de teste - sem
   * token):**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/quote/MGLU3?range=1mo&interval=1d"
   * ```
   *
   * **3. Cotação de ITUB4 incluindo dividendos e dados fundamentalistas (ação de
   * teste - sem token):**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/quote/ITUB4?fundamental=true&dividends=true"
   * ```
   *
   * **4. Cotação de WEGE3 com Resumo da Empresa e Balanço Patrimonial Anual (via
   * módulos - requer token):**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/quote/WEGE3?modules=summaryProfile,balanceSheetHistory&token=SEU_TOKEN"
   * ```
   *
   * **5. Exemplo de requisição mista (requer token):**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/quote/PETR4,BBAS3?token=SEU_TOKEN"
   * ```
   *
   * _Nota: Como BBAS3 não é uma ação de teste, toda a requisição requer
   * autenticação, mesmo contendo PETR4._
   *
   * ### Parâmetro `modules` (Detalhado):
   *
   * O parâmetro `modules` é extremamente poderoso para enriquecer a resposta com
   * dados financeiros detalhados. Você pode solicitar um ou mais módulos, separados
   * por vírgula.
   *
   * **Módulos Disponíveis:**
   *
   * - `summaryProfile`: Informações cadastrais da empresa (endereço, setor,
   *   descrição do negócio, website, número de funcionários).
   * - `balanceSheetHistory`: Histórico **anual** do Balanço Patrimonial.
   * - `balanceSheetHistoryQuarterly`: Histórico **trimestral** do Balanço
   *   Patrimonial.
   * - `defaultKeyStatistics`: Principais estatísticas da empresa (Valor de Mercado,
   *   P/L, ROE, Dividend Yield, etc.) - **TTM (Trailing Twelve Months)**.
   * - `defaultKeyStatisticsHistory`: Histórico **anual** das Principais
   *   Estatísticas.
   * - `defaultKeyStatisticsHistoryQuarterly`: Histórico **trimestral** das
   *   Principais Estatísticas.
   * - `incomeStatementHistory`: Histórico **anual** da Demonstração do Resultado do
   *   Exercício (DRE).
   * - `incomeStatementHistoryQuarterly`: Histórico **trimestral** da Demonstração do
   *   Resultado do Exercício (DRE).
   * - `financialData`: Dados financeiros selecionados (Receita, Lucro Bruto, EBITDA,
   *   Dívida Líquida, Fluxo de Caixa Livre, Margens) - **TTM (Trailing Twelve
   *   Months)**.
   * - `financialDataHistory`: Histórico **anual** dos Dados Financeiros.
   * - `financialDataHistoryQuarterly`: Histórico **trimestral** dos Dados
   *   Financeiros.
   * - `valueAddedHistory`: Histórico **anual** da Demonstração do Valor Adicionado
   *   (DVA).
   * - `valueAddedHistoryQuarterly`: Histórico **trimestral** da Demonstração do
   *   Valor Adicionado (DVA).
   * - `cashflowHistory`: Histórico **anual** da Demonstração do Fluxo de Caixa
   *   (DFC).
   * - `cashflowHistoryQuarterly`: Histórico **trimestral** da Demonstração do Fluxo
   *   de Caixa (DFC).
   *
   * **Exemplo de Uso do `modules`:**
   *
   * Para obter a cotação de BBDC4 junto com seu DRE trimestral e Fluxo de Caixa
   * anual:
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/quote/BBDC4?modules=incomeStatementHistoryQuarterly,cashflowHistory&token=SEU_TOKEN"
   * ```
   *
   * ### Resposta:
   *
   * A resposta é um objeto JSON contendo a chave `results`, que é um array. Cada
   * elemento do array corresponde a um ticker solicitado e contém os dados da
   * cotação e os módulos adicionais requisitados.
   *
   * - **Sucesso (200 OK):** Retorna os dados conforme solicitado.
   * - **Bad Request (400 Bad Request):** Ocorre se um parâmetro for inválido (ex:
   *   `range=invalid`) ou se a formatação estiver incorreta.
   * - **Unauthorized (401 Unauthorized):** Token inválido ou ausente.
   * - **Payment Required (402 Payment Required):** Limite de requisições do plano
   *   atual excedido.
   * - **Not Found (404 Not Found):** Um ou mais tickers solicitados não foram
   *   encontrados.
   */
  retrieve(
    tickers: string,
    query: QuoteRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<QuoteRetrieveResponse> {
    return this._client.get(path`/api/quote/${tickers}`, { query, ...options });
  }

  /**
   * Obtenha uma lista paginada de cotações de diversos ativos (ações, FIIs, BDRs)
   * negociados na B3, com opções avançadas de busca, filtragem e ordenação.
   *
   * ### Funcionalidades:
   *
   * - **Busca por Ticker:** Filtre por parte do ticker usando `search`.
   * - **Filtragem por Tipo:** Restrinja a lista a `stock`, `fund` (FII) ou `bdr` com
   *   o parâmetro `type`.
   * - **Filtragem por Setor:** Selecione ativos de um setor específico usando
   *   `sector`.
   * - **Ordenação:** Ordene os resultados por diversos campos (preço, variação,
   *   volume, etc.) usando `sortBy` e `sortOrder`.
   * - **Paginação:** Controle o número de resultados por página (`limit`) e a página
   *   desejada (`page`).
   *
   * ### Autenticação:
   *
   * Requer token de autenticação via `token` (query) ou `Authorization` (header).
   *
   * ### Exemplo de Requisição:
   *
   * **Listar as 10 ações do setor Financeiro com maior volume, ordenadas de forma
   * decrescente:**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/quote/list?sector=Finance&sortBy=volume&sortOrder=desc&limit=10&page=1&token=SEU_TOKEN"
   * ```
   *
   * **Buscar por ativos cujo ticker contenha 'ITUB' e ordenar por nome ascendente:**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/quote/list?search=ITUB&sortBy=name&sortOrder=asc&token=SEU_TOKEN"
   * ```
   *
   * ### Resposta:
   *
   * A resposta contém a lista de `stocks` (e `indexes` relevantes), informações
   * sobre os filtros aplicados, detalhes da paginação (`currentPage`, `totalPages`,
   * `itemsPerPage`, `totalCount`, `hasNextPage`) e listas de setores
   * (`availableSectors`) e tipos (`availableStockTypes`) disponíveis para filtragem.
   */
  list(
    query: QuoteListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<QuoteListResponse> {
    return this._client.get('/api/quote/list', { query, ...options });
  }
}

/**
 * Representa os dados de um Balanço Patrimonial para um período específico (anual
 * ou trimestral).
 */
export interface BalanceSheetEntry {
  /**
   * Contas a pagar (fornecedores).
   */
  accountsPayable?: number | null;

  /**
   * Contas a receber de clientes (bruto).
   */
  accountsReceivableFromClients?: number | null;

  /**
   * Lucros ou prejuízos acumulados.
   */
  accumulatedProfitsOrLosses?: number | null;

  /**
   * Adiantamento para futuro aumento de capital (AFAC).
   */
  advanceForFutureCapitalIncrease?: number | null;

  /**
   * Ativos biológicos.
   */
  biologicalAssets?: number | null;

  /**
   * Obrigações de capitalização.
   */
  capitalization?: number | null;

  /**
   * Reservas de capital (sinônimo de `capitalSurplus`).
   */
  capitalReserves?: number | null;

  /**
   * Reservas de capital.
   */
  capitalSurplus?: number | null;

  /**
   * Caixa e equivalentes de caixa.
   */
  cash?: number | null;

  /**
   * Depósitos compulsórios no Banco Central.
   */
  centralBankCompulsoryDeposit?: number | null;

  /**
   * Capital social realizado.
   */
  commonStock?: number | null;

  /**
   * Obrigações de previdência complementar.
   */
  complementaryPension?: number | null;

  /**
   * Empréstimos e depósitos compulsórios.
   */
  compulsoryLoansAndDeposits?: number | null;

  /**
   * Patrimônio líquido atribuível aos controladores.
   */
  controllerShareholdersEquity?: number | null;

  /**
   * Créditos oriundos de operações (instituições financeiras/seguradoras).
   */
  creditsFromOperations?: number | null;

  /**
   * Créditos com partes relacionadas.
   */
  creditsWithRelatedParties?: number | null;

  /**
   * Ajustes acumulados de conversão.
   */
  cumulativeConversionAdjustments?: number | null;

  /**
   * Tributos correntes e diferidos no ativo.
   */
  currentAndDeferredTaxes?: number | null;

  /**
   * Total do passivo circulante (sinônimo de `totalCurrentLiabilities`).
   */
  currentLiabilities?: number | null;

  /**
   * Debêntures (passivo circulante).
   */
  debentures?: number | null;

  /**
   * Débitos de operações de capitalização.
   */
  debitsFromCapitalization?: number | null;

  /**
   * Débitos de operações de previdência complementar.
   */
  debitsFromComplementaryPension?: number | null;

  /**
   * Débitos de operações de seguros e resseguros.
   */
  debitsFromInsuranceAndReinsurance?: number | null;

  /**
   * Débitos oriundos de operações.
   */
  debitsFromOperations?: number | null;

  /**
   * Débitos de outras operações.
   */
  debitsFromOtherOperations?: number | null;

  /**
   * Encargos diferidos de ativos de longo prazo.
   */
  deferredLongTermAssetCharges?: number | null;

  /**
   * Passivos fiscais diferidos (longo prazo).
   */
  deferredLongTermLiab?: number | null;

  /**
   * Despesas de comercialização diferidas.
   */
  deferredSellingExpenses?: number | null;

  /**
   * Tributos diferidos no ativo.
   */
  deferredTaxes?: number | null;

  /**
   * Data de término do período fiscal ao qual o balanço se refere (YYYY-MM-DD).
   */
  endDate?: string;

  /**
   * Ajustes de avaliação patrimonial.
   */
  equityValuationAdjustments?: number | null;

  /**
   * Ativos financeiros (agregado de instrumentos financeiros no ativo).
   */
  financialAssets?: number | null;

  /**
   * Ativos financeiros ao custo amortizado.
   */
  financialAssetsAtAmortizedCost?: number | null;

  /**
   * Ativos financeiros mensurados a valor justo por outros resultados abrangentes
   * (FVOCI).
   */
  financialAssetsMeasuredAtFairValueThroughOtherComprehensiveIncome?: number | null;

  /**
   * Ativos financeiros mensurados a valor justo por meio do resultado (FVTPL).
   */
  financialAssetsMeasuredAtFairValueThroughProfitOrLoss?: number | null;

  /**
   * Investimentos financeiros mensurados ao custo amortizado.
   */
  financialInvestmentsMeasuredAtAmortizedCost?: number | null;

  /**
   * Investimentos financeiros mensurados a valor justo por outros resultados
   * abrangentes.
   */
  financialInvestmentsMeasuredAtFairValueThroughOtherComprehensiveIncome?: number | null;

  /**
   * Passivos financeiros ao custo amortizado.
   */
  financialLiabilitiesAtAmortizedCost?: number | null;

  /**
   * Passivos financeiros mensurados a valor justo por meio do resultado.
   */
  financialLiabilitiesMeasuredAtFairValueThroughIncome?: number | null;

  /**
   * Fornecedores estrangeiros.
   */
  foreignSuppliers?: number | null;

  /**
   * Ágio por expectativa de rentabilidade futura (Goodwill).
   */
  goodWill?: number | null;

  /**
   * Provisões/obrigações de seguros e resseguros.
   */
  insuranceAndReinsurance?: number | null;

  /**
   * Ativo intangível (valor agregado).
   */
  intangibleAsset?: number | null;

  /**
   * Ativos intangíveis (marcas, patentes, etc.).
   */
  intangibleAssets?: number | null;

  /**
   * Estoques.
   */
  inventory?: number | null;

  /**
   * Propriedades para investimento.
   */
  investmentProperties?: number | null;

  /**
   * Investimentos (participações e outros).
   */
  investments?: number | null;

  /**
   * Financiamento por arrendamento mercantil (circulante).
   */
  leaseFinancing?: number | null;

  /**
   * Empréstimos e financiamentos (circulante).
   */
  loansAndFinancing?: number | null;

  /**
   * Empréstimos e financiamentos em moeda estrangeira (circulante).
   */
  loansAndFinancingInForeignCurrency?: number | null;

  /**
   * Empréstimos e financiamentos em moeda nacional (circulante).
   */
  loansAndFinancingInNationalCurrency?: number | null;

  /**
   * Fornecedores/contas a pagar de longo prazo.
   */
  longTermAccountsPayable?: number | null;

  /**
   * Contas a receber de clientes - longo prazo.
   */
  longTermAccountsReceivableFromClients?: number | null;

  /**
   * Total do ativo não circulante (agregado).
   */
  longTermAssets?: number | null;

  /**
   * Ativos biológicos de longo prazo.
   */
  longTermBiologicalAssets?: number | null;

  /**
   * Obrigações de capitalização de longo prazo.
   */
  longTermCapitalization?: number | null;

  /**
   * Obrigações de previdência complementar de longo prazo.
   */
  longTermComplementaryPension?: number | null;

  /**
   * Debêntures (passivo não circulante).
   */
  longTermDebentures?: number | null;

  /**
   * Débitos de operações (longo prazo).
   */
  longTermDebitsFromOperations?: number | null;

  /**
   * Dívida de longo prazo (empréstimos e financiamentos não circulantes).
   */
  longTermDebt?: number | null;

  /**
   * Tributos diferidos (Ativo Não Circulante).
   */
  longTermDeferredTaxes?: number | null;

  /**
   * Investimentos financeiros de longo prazo mensurados a valor justo por meio do
   * resultado.
   */
  longTermFinancialInvestmentsMeasuredAtFairValueThroughIncome?: number | null;

  /**
   * Obrigações de seguros e resseguros de longo prazo.
   */
  longTermInsuranceAndReinsurance?: number | null;

  /**
   * Estoques de longo prazo.
   */
  longTermInventory?: number | null;

  /**
   * Investimentos de longo prazo.
   */
  longTermInvestments?: number | null;

  /**
   * Financiamento por arrendamento mercantil (não circulante).
   */
  longTermLeaseFinancing?: number | null;

  /**
   * Total do passivo de longo prazo.
   */
  longTermLiabilities?: number | null;

  /**
   * Empréstimos e financiamentos (não circulante).
   */
  longTermLoansAndFinancing?: number | null;

  /**
   * Empréstimos e financiamentos em moeda estrangeira (não circulante).
   */
  longTermLoansAndFinancingInForeignCurrency?: number | null;

  /**
   * Empréstimos e financiamentos em moeda nacional (não circulante).
   */
  longTermLoansAndFinancingInNationalCurrency?: number | null;

  /**
   * Despesas antecipadas de longo prazo.
   */
  longTermPrepaidExpenses?: number | null;

  /**
   * Provisões (passivo não circulante).
   */
  longTermProvisions?: number | null;

  /**
   * Ativo realizável a longo prazo.
   */
  longTermRealizableAssets?: number | null;

  /**
   * Contas a receber de longo prazo.
   */
  longTermReceivables?: number | null;

  /**
   * Provisões técnicas de longo prazo.
   */
  longTermTechnicalProvisions?: number | null;

  /**
   * Participação de não controladores (no patrimônio líquido).
   */
  minorityInterest?: number | null;

  /**
   * Fornecedores nacionais.
   */
  nationalSuppliers?: number | null;

  /**
   * Contas a receber líquidas (clientes).
   */
  netReceivables?: number | null;

  /**
   * Ativos tangíveis líquidos (Ativo Total - Intangíveis - Passivo Total).
   */
  netTangibleAssets?: number | null;

  /**
   * Participação dos não controladores no patrimônio líquido.
   */
  nonControllingShareholdersEquity?: number | null;

  /**
   * Total do ativo não circulante (sinônimo de `longTermAssets`).
   */
  nonCurrentAssets?: number | null;

  /**
   * Total do passivo não circulante.
   */
  nonCurrentLiabilities?: number | null;

  /**
   * Outras contas a receber.
   */
  otherAccountsReceivable?: number | null;

  /**
   * Outros ativos não circulantes.
   */
  otherAssets?: number | null;

  /**
   * Outros resultados abrangentes.
   */
  otherComprehensiveResults?: number | null;

  /**
   * Outros ativos circulantes.
   */
  otherCurrentAssets?: number | null;

  /**
   * Outros passivos circulantes.
   */
  otherCurrentLiab?: number | null;

  /**
   * Outros passivos circulantes (sinônimo de `otherCurrentLiab`).
   */
  otherCurrentLiabilities?: number | null;

  /**
   * Outros débitos.
   */
  otherDebits?: number | null;

  /**
   * Outros passivos não circulantes.
   */
  otherLiab?: number | null;

  /**
   * Outros passivos.
   */
  otherLiabilities?: number | null;

  /**
   * Outras obrigações (passivo não circulante).
   */
  otherLongTermObligations?: number | null;

  /**
   * Outras provisões de longo prazo.
   */
  otherLongTermProvisions?: number | null;

  /**
   * Outros créditos/recebíveis de longo prazo.
   */
  otherLongTermReceivables?: number | null;

  /**
   * Outros ativos não circulantes (detalhamento).
   */
  otherNonCurrentAssets?: number | null;

  /**
   * Outros passivos não circulantes.
   */
  otherNonCurrentLiabilities?: number | null;

  /**
   * Outras obrigações (circulante).
   */
  otherObligations?: number | null;

  /**
   * Outras contas operacionais no ativo.
   */
  otherOperations?: number | null;

  /**
   * Outras provisões (diversas).
   */
  otherProvisions?: number | null;

  /**
   * Outros componentes do patrimônio líquido.
   */
  otherStockholderEquity?: number | null;

  /**
   * Outros valores e bens.
   */
  otherValuesAndAssets?: number | null;

  /**
   * Despesas antecipadas.
   */
  prepaidExpenses?: number | null;

  /**
   * Reservas de lucros.
   */
  profitReserves?: number | null;

  /**
   * Lucros e receitas a apropriar.
   */
  profitsAndRevenuesToBeAppropriated?: number | null;

  /**
   * Imobilizado (propriedades, instalações e equipamentos).
   */
  propertyPlantEquipment?: number | null;

  /**
   * Fornecedores (sinônimo de `accountsPayable`).
   */
  providers?: number | null;

  /**
   * Provisões (passivo).
   */
  provisions?: number | null;

  /**
   * Capital social realizado (sinônimo de `commonStock`).
   */
  realizedShareCapital?: number | null;

  /**
   * Lucros/Prejuízos acumulados.
   */
  retainedEarnings?: number | null;

  /**
   * Reservas de reavaliação.
   */
  revaluationReserves?: number | null;

  /**
   * Títulos e créditos a receber.
   */
  securitiesAndCreditsReceivable?: number | null;

  /**
   * Patrimônio líquido (sinônimo de `totalStockholderEquity`).
   */
  shareholdersEquity?: number | null;

  /**
   * Participações societárias.
   */
  shareholdings?: number | null;

  /**
   * Dívida de curto prazo (empréstimos e financiamentos circulantes).
   */
  shortLongTermDebt?: number | null;

  /**
   * Aplicações financeiras de curto prazo.
   */
  shortTermInvestments?: number | null;

  /**
   * Obrigações sociais e trabalhistas.
   */
  socialAndLaborObligations?: number | null;

  /**
   * Ticker do ativo ao qual o balanço se refere.
   */
  symbol?: string;

  /**
   * Impostos a recuperar.
   */
  taxesToRecover?: number | null;

  /**
   * Obrigações fiscais (passivo).
   */
  taxLiabilities?: number | null;

  /**
   * Obrigações fiscais (passivo circulante).
   */
  taxObligations?: number | null;

  /**
   * Provisões técnicas (seguradoras/previdência).
   */
  technicalProvisions?: number | null;

  /**
   * Depósitos de terceiros.
   */
  thirdPartyDeposits?: number | null;

  /**
   * Total do ativo.
   */
  totalAssets?: number | null;

  /**
   * Total do ativo circulante.
   */
  totalCurrentAssets?: number | null;

  /**
   * Total do passivo circulante.
   */
  totalCurrentLiabilities?: number | null;

  /**
   * Total do passivo (circulante + não circulante).
   */
  totalLiab?: number | null;

  /**
   * Total do passivo.
   */
  totalLiabilities?: number | null;

  /**
   * Total do patrimônio líquido.
   */
  totalStockholderEquity?: number | null;

  /**
   * Ações em tesouraria.
   */
  treasuryStock?: number | null;

  /**
   * Indica a periodicidade do balanço: `yearly` (anual) ou `quarterly` (trimestral).
   */
  type?: 'yearly' | 'quarterly';

  /**
   * Data da última atualização deste registro (YYYY-MM-DD).
   */
  updatedAt?: string | null;
}

/**
 * Representa os dados de uma Demonstração do Fluxo de Caixa (DFC) para um período
 * específico (anual ou trimestral).
 */
export interface CashflowEntry {
  /**
   * Ajustes ao lucro/prejuízo (depreciação, amortização, equivalência patrimonial,
   * variações não caixa).
   */
  adjustmentsToProfitOrLoss?: number | null;

  /**
   * Caixa gerado nas operações (após variações no capital de giro).
   */
  cashGeneratedInOperations?: number | null;

  /**
   * Variações em Ativos e Passivos Operacionais (Clientes, Estoques, Fornecedores,
   * etc.).
   */
  changesInAssetsAndLiabilities?: number | null;

  /**
   * Data de término do período fiscal ao qual a DFC se refere (YYYY-MM-DD).
   */
  endDate?: string;

  /**
   * Variação cambial sem efeito caixa (ajuste de conversão).
   */
  exchangeVariationWithoutCash?: number | null;

  /**
   * Saldo Final de Caixa e Equivalentes no final do período.
   */
  finalCashBalance?: number | null;

  /**
   * Fluxo de Caixa das Atividades de Financiamento (FCF) (Captação/Pagamento de
   * Empréstimos, Emissão/Recompra de Ações, Dividendos pagos).
   */
  financingCashFlow?: number | null;

  /**
   * Efeito da Variação Cambial sobre o Caixa e Equivalentes.
   */
  foreignExchangeRateWithoutCash?: number | null;

  /**
   * Caixa Gerado nas Operações (antes das variações de ativos/passivos).
   */
  incomeFromOperations?: number | null;

  /**
   * Aumento ou Redução Líquida de Caixa e Equivalentes (FCO + FCI + FCF + Variação
   * Cambial).
   */
  increaseOrDecreaseInCash?: number | null;

  /**
   * Saldo Inicial de Caixa e Equivalentes no início do período.
   */
  initialCashBalance?: number | null;

  /**
   * Fluxo de Caixa das Atividades de Investimento (FCI) (Compra/Venda de
   * Imobilizado, Investimentos).
   */
  investmentCashFlow?: number | null;

  /**
   * Lucro líquido antes dos impostos (base para reconciliação pelo método indireto).
   */
  netIncomeBeforeTaxes?: number | null;

  /**
   * Fluxo de Caixa das Atividades Operacionais (FCO).
   */
  operatingCashFlow?: number | null;

  /**
   * Outras Atividades Operacionais (Juros pagos/recebidos, Impostos pagos, etc.).
   */
  otherOperatingActivities?: number | null;

  /**
   * Ticker do ativo ao qual a DFC se refere.
   */
  symbol?: string;

  /**
   * Indica a periodicidade da DFC: `yearly` (anual) ou `quarterly` (trimestral).
   */
  type?: 'yearly' | 'quarterly';

  /**
   * Data da última atualização deste registro específico na fonte de dados
   * (YYYY-MM-DD).
   */
  updatedAt?: string;
}

/**
 * Representa um conjunto de principais indicadores e estatísticas financeiras para
 * um período (TTM, anual ou trimestral).
 */
export interface DefaultKeyStatisticsEntry {
  /**
   * Variação percentual do preço da ação nas últimas 52 semanas.
   */
  '52WeekChange'?: number | null;

  /**
   * Beta da ação (sensibilidade em relação ao mercado).
   */
  beta?: number | null;

  /**
   * Valor Patrimonial por Ação (VPA): Patrimônio Líquido / Ações em Circulação.
   */
  bookValue?: number | null;

  /**
   * Dividend Yield (provento anualizado sobre o preço atual).
   */
  dividendYield?: number | null;

  /**
   * Crescimento percentual do lucro líquido no último ano fiscal completo em relação
   * ao ano anterior.
   */
  earningsAnnualGrowth?: number | null;

  /**
   * Crescimento percentual do lucro líquido no último trimestre em relação ao mesmo
   * trimestre do ano anterior (YoY).
   */
  earningsQuarterlyGrowth?: number | null;

  /**
   * Múltiplo EV/EBITDA (Enterprise Value / EBITDA TTM).
   */
  enterpriseToEbitda?: number | null;

  /**
   * Múltiplo EV/Receita (Enterprise Value / Receita Líquida TTM).
   */
  enterpriseToRevenue?: number | null;

  /**
   * Valor da Firma (Enterprise Value - EV): Market Cap + Dívida Total - Caixa.
   */
  enterpriseValue?: number | null;

  /**
   * Ações em livre circulação (free float).
   */
  floatShares?: number | null;

  /**
   * Lucro Por Ação projetado (próximo período).
   */
  forwardEps?: number | null;

  /**
   * Preço / Lucro Projetado (Forward P/E): Preço da Ação / LPA estimado para o
   * próximo período.
   */
  forwardPE?: number | null;

  /**
   * Percentual de ações detidas por insiders (administradores, controladores).
   */
  heldPercentInsiders?: number | null;

  /**
   * Percentual de ações detidas por instituições (fundos, investidores
   * institucionais).
   */
  heldPercentInstitutions?: number | null;

  /**
   * Ações implícitas em circulação (considerando diluição/derivativos).
   */
  impliedSharesOutstanding?: number | null;

  /**
   * Data de pagamento (ou 'Data Com') do último dividendo/JCP (YYYY-MM-DD).
   */
  lastDividendDate?: string | null;

  /**
   * Valor do último dividendo ou JCP pago por ação.
   */
  lastDividendValue?: number | null;

  /**
   * Data de encerramento do último ano fiscal (YYYY-MM-DD).
   */
  lastFiscalYearEnd?: string | null;

  /**
   * Data do último desdobramento/grupamento (timestamp UNIX em segundos).
   */
  lastSplitDate?: number | null;

  /**
   * Fator do último desdobramento/grupamento (ex.: 2:1, 1:10).
   */
  lastSplitFactor?: string | null;

  /**
   * Data de término do trimestre mais recente considerado nos cálculos (YYYY-MM-DD).
   */
  mostRecentQuarter?: string | null;

  /**
   * Lucro Líquido atribuível aos acionistas ordinários (controladores).
   */
  netIncomeToCommon?: number | null;

  /**
   * Data de encerramento do próximo ano fiscal (YYYY-MM-DD).
   */
  nextFiscalYearEnd?: string | null;

  /**
   * Índice PEG (P/E dividido pelo crescimento esperado dos lucros).
   */
  pegRatio?: number | null;

  /**
   * Preço sobre Valor Patrimonial (P/VP): Preço da Ação / VPA.
   */
  priceToBook?: number | null;

  /**
   * Margem de Lucro Líquida (Lucro Líquido / Receita Líquida). Geralmente em base
   * TTM ou anual.
   */
  profitMargins?: number | null;

  /**
   * Variação percentual do índice S&P 500 nas últimas 52 semanas (para referência).
   */
  SandP52WeekChange?: number | null;

  /**
   * Número total de ações ordinárias em circulação.
   */
  sharesOutstanding?: number | null;

  /**
   * Ticker do ativo ao qual as estatísticas se referem.
   */
  symbol?: string;

  /**
   * Valor total dos ativos registrado no último balanço (anual ou trimestral).
   */
  totalAssets?: number | null;

  /**
   * Lucro Por Ação (LPA) dos Últimos 12 Meses (TTM).
   */
  trailingEps?: number | null;

  /**
   * Periodicidade dos dados: `yearly` (anual), `quarterly` (trimestral), `ttm`
   * (Trailing Twelve Months - últimos 12 meses).
   */
  type?: 'yearly' | 'quarterly' | 'ttm';

  /**
   * Data da última atualização deste registro específico na fonte de dados
   * (YYYY-MM-DD).
   */
  updatedAt?: string | null;

  /**
   * Retorno percentual do preço da ação desde o início do ano atual (Year-to-Date).
   */
  ytdReturn?: number | null;
}

/**
 * Representa um conjunto de dados e indicadores financeiros calculados para um
 * período (TTM, anual ou trimestral).
 */
export interface FinancialDataEntry {
  /**
   * Preço atual da ação (pode ser ligeiramente defasado).
   */
  currentPrice?: number | null;

  /**
   * Índice de Liquidez Corrente (Ativo Circulante / Passivo Circulante).
   */
  currentRatio?: number | null;

  /**
   * Índice Dívida Líquida / Patrimônio Líquido.
   */
  debtToEquity?: number | null;

  /**
   * Crescimento do Lucro Líquido (geralmente trimestral YoY, como
   * `earningsQuarterlyGrowth`).
   */
  earningsGrowth?: number | null;

  /**
   * Lucro Antes de Juros, Impostos, Depreciação e Amortização (LAJIDA ou EBITDA).
   * Geralmente TTM.
   */
  ebitda?: number | null;

  /**
   * Margem EBITDA (EBITDA TTM / Receita Líquida TTM).
   */
  ebitdaMargins?: number | null;

  /**
   * Moeda na qual os dados financeiros são reportados (ex: `BRL`, `USD`).
   */
  financialCurrency?: string | null;

  /**
   * Fluxo de Caixa Livre (FCO - CAPEX) - (geralmente TTM).
   */
  freeCashflow?: number | null;

  /**
   * Margem Bruta (Lucro Bruto TTM / Receita Líquida TTM).
   */
  grossMargins?: number | null;

  /**
   * Lucro Bruto (geralmente TTM).
   */
  grossProfits?: number | null;

  /**
   * Número de opiniões de analistas consideradas.
   */
  numberOfAnalystOpinions?: number | null;

  /**
   * Fluxo de Caixa das Operações (FCO) - (geralmente TTM).
   */
  operatingCashflow?: number | null;

  /**
   * Margem Operacional (EBIT TTM / Receita Líquida TTM).
   */
  operatingMargins?: number | null;

  /**
   * Margem Líquida (Lucro Líquido TTM / Receita Líquida TTM). Sinônimo do campo de
   * mesmo nome em `DefaultKeyStatisticsEntry`.
   */
  profitMargins?: number | null;

  /**
   * Índice de Liquidez Seca ((Ativo Circulante - Estoques) / Passivo Circulante).
   */
  quickRatio?: number | null;

  /**
   * Resumo da recomendação (ex.: strong_buy, buy, hold, sell, strong_sell).
   */
  recommendationKey?: string | null;

  /**
   * Média de recomendações dos analistas (1=Compra Forte, 5=Venda Forte).
   */
  recommendationMean?: number | null;

  /**
   * Retorno sobre Ativos (ROA): Lucro Líquido TTM / Ativo Total Médio.
   */
  returnOnAssets?: number | null;

  /**
   * Retorno sobre Patrimônio Líquido (ROE): Lucro Líquido TTM / Patrimônio Líquido
   * Médio.
   */
  returnOnEquity?: number | null;

  /**
   * Crescimento da Receita Líquida (geralmente trimestral YoY).
   */
  revenueGrowth?: number | null;

  /**
   * Receita Líquida por Ação (Receita Líquida TTM / Ações em Circulação).
   */
  revenuePerShare?: number | null;

  /**
   * Ticker do ativo ao qual os dados se referem.
   */
  symbol?: string;

  /**
   * Preço-alvo mais alto estimado por analistas.
   */
  targetHighPrice?: number | null;

  /**
   * Preço-alvo mais baixo estimado por analistas.
   */
  targetLowPrice?: number | null;

  /**
   * Preço-alvo médio estimado por analistas.
   */
  targetMeanPrice?: number | null;

  /**
   * Preço-alvo mediano estimado por analistas.
   */
  targetMedianPrice?: number | null;

  /**
   * Caixa e Equivalentes de Caixa + Aplicações Financeiras de Curto Prazo (último
   * balanço).
   */
  totalCash?: number | null;

  /**
   * Caixa Total por Ação (Caixa Total / Ações em Circulação).
   */
  totalCashPerShare?: number | null;

  /**
   * Dívida Bruta Total (Dívida de Curto Prazo + Dívida de Longo Prazo - último
   * balanço).
   */
  totalDebt?: number | null;

  /**
   * Receita Líquida Total (geralmente TTM).
   */
  totalRevenue?: number | null;

  /**
   * Periodicidade dos dados: `yearly` (anual), `quarterly` (trimestral), `ttm`
   * (Trailing Twelve Months).
   */
  type?: 'yearly' | 'quarterly' | 'ttm';

  /**
   * Data da última atualização deste registro específico na fonte de dados
   * (YYYY-MM-DD).
   */
  updatedAt?: string;
}

/**
 * Representa os dados de uma Demonstração do Resultado do Exercício (DRE) para um
 * período específico (anual ou trimestral).
 */
export interface IncomeStatementEntry {
  /**
   * Identificador único deste registro de DRE (interno).
   */
  id?: string;

  /**
   * Despesas Administrativas (detalhamento, pode estar contido em SG&A).
   */
  administrativeCosts?: number | null;

  /**
   * Lucro Básico por Ação Ordinária (ON).
   */
  basicEarningsPerCommonShare?: number | null;

  /**
   * Lucro Básico por Ação Preferencial (PN).
   */
  basicEarningsPerPreferredShare?: number | null;

  /**
   * Lucro Básico por Ação (LPA Básico) - Geral.
   */
  basicEarningsPerShare?: number | null;

  /**
   * Resultado de Operações de Capitalização (específico para Seguradoras).
   */
  capitalizationOperations?: number | null;

  /**
   * Custos com Sinistros e Operações (específico para Seguradoras).
   */
  claimsAndOperationsCosts?: number | null;

  /**
   * Resultado de Operações de Previdência Complementar (específico para
   * Seguradoras/Previdência).
   */
  complementaryPensionOperations?: number | null;

  /**
   * Custo dos Produtos Vendidos (CPV) ou Custo dos Serviços Prestados (CSP).
   */
  costOfRevenue?: number | null;

  /**
   * Imposto de Renda e Contribuição Social Correntes.
   */
  currentTaxes?: number | null;

  /**
   * Imposto de Renda e Contribuição Social Diferidos.
   */
  deferredTaxes?: number | null;

  /**
   * Lucro Diluído por Ação Ordinária (ON).
   */
  dilutedEarningsPerCommonShare?: number | null;

  /**
   * Lucro Diluído por Ação Preferencial (PN).
   */
  dilutedEarningsPerPreferredShare?: number | null;

  /**
   * Lucro Diluído por Ação (LPA Diluído) - Geral.
   */
  dilutedEarningsPerShare?: number | null;

  /**
   * Resultado Líquido das Operações Descontinuadas.
   */
  discontinuedOperations?: number | null;

  /**
   * Lucro por Ação (LPA) - Geral (pode ser básico ou diluído, verificar contexto).
   */
  earningsPerShare?: number | null;

  /**
   * Lucro Antes dos Juros e Impostos (LAJIR ou EBIT). Geralmente igual a
   * `operatingIncome`.
   */
  ebit?: number | null;

  /**
   * Efeito de Mudanças Contábeis.
   */
  effectOfAccountingCharges?: number | null;

  /**
   * Data de término do período fiscal ao qual a DRE se refere (YYYY-MM-DD).
   */
  endDate?: string;

  /**
   * Resultado de Equivalência Patrimonial.
   */
  equityIncomeResult?: number | null;

  /**
   * Itens Extraordinários.
   */
  extraordinaryItems?: number | null;

  /**
   * Despesas Financeiras (valor positivo aqui, diferente de `interestExpense`).
   */
  financialExpenses?: number | null;

  /**
   * Receitas Financeiras.
   */
  financialIncome?: number | null;

  /**
   * Resultado Financeiro Líquido.
   */
  financialResult?: number | null;

  /**
   * Lucro Bruto (Receita Líquida - CPV/CSP).
   */
  grossProfit?: number | null;

  /**
   * Resultado Antes das Participações Estatutárias.
   */
  incomeBeforeStatutoryParticipationsAndContributions?: number | null;

  /**
   * Lucro Antes do Imposto de Renda e Contribuição Social (LAIR). EBIT + Resultado
   * Financeiro.
   */
  incomeBeforeTax?: number | null;

  /**
   * Imposto de Renda e Contribuição Social sobre o Lucro.
   */
  incomeTaxExpense?: number | null;

  /**
   * Resultado de Operações de Seguros (específico para Seguradoras).
   */
  insuranceOperations?: number | null;

  /**
   * Despesas Financeiras (Juros pagos). Note que este campo é negativo.
   */
  interestExpense?: number | null;

  /**
   * Perdas por Não Recuperabilidade de Ativos (Impairment).
   */
  lossesDueToNonRecoverabilityOfAssets?: number | null;

  /**
   * Participação de Acionistas Não Controladores (no Lucro Líquido).
   */
  minorityInterest?: number | null;

  /**
   * Lucro Líquido Consolidado do Período.
   */
  netIncome?: number | null;

  /**
   * Lucro Líquido Atribuível aos Acionistas Controladores (Ações Ordinárias).
   */
  netIncomeApplicableToCommonShares?: number | null;

  /**
   * Lucro Líquido das Operações Continuadas.
   */
  netIncomeFromContinuingOps?: number | null;

  /**
   * Itens Não Recorrentes (pode incluir outras despesas/receitas operacionais).
   */
  nonRecurring?: number | null;

  /**
   * Lucro Operacional (EBIT - Earnings Before Interest and Taxes). Lucro Bruto -
   * Despesas Operacionais.
   */
  operatingIncome?: number | null;

  /**
   * Outros Itens.
   */
  otherItems?: number | null;

  /**
   * Outras Despesas Operacionais.
   */
  otherOperatingExpenses?: number | null;

  /**
   * Outras Receitas Operacionais (detalhamento).
   */
  otherOperatingIncome?: number | null;

  /**
   * Outras Receitas e Despesas Operacionais (agregado).
   */
  otherOperatingIncomeAndExpenses?: number | null;

  /**
   * Participações nos Lucros e Contribuições Estatutárias.
   */
  profitSharingAndStatutoryContributions?: number | null;

  /**
   * Resultado de Operações de Resseguros (específico para Seguradoras).
   */
  reinsuranceOperations?: number | null;

  /**
   * Despesas com Pesquisa e Desenvolvimento.
   */
  researchDevelopment?: number | null;

  /**
   * Despesas com Vendas (detalhamento, pode estar contido em SG&A).
   */
  salesExpenses?: number | null;

  /**
   * Despesas com Vendas, Gerais e Administrativas.
   */
  sellingGeneralAdministrative?: number | null;

  /**
   * Ticker do ativo ao qual a DRE se refere.
   */
  symbol?: string;

  /**
   * Total das Despesas Operacionais (P&D + SG&A + Outras).
   */
  totalOperatingExpenses?: number | null;

  /**
   * Resultado Financeiro Líquido + Outras Receitas/Despesas.
   */
  totalOtherIncomeExpenseNet?: number | null;

  /**
   * Receita Operacional Líquida.
   */
  totalRevenue?: number | null;

  /**
   * Indica a periodicidade da DRE: `yearly` (anual) ou `quarterly` (trimestral).
   */
  type?: 'yearly' | 'quarterly';

  /**
   * Data da última atualização deste registro específico na fonte de dados
   * (YYYY-MM-DD).
   */
  updatedAt?: string | null;
}

/**
 * Representa os dados de uma Demonstração do Valor Adicionado (DVA) para um
 * período específico (anual ou trimestral). A DVA mostra como a riqueza gerada
 * pela empresa foi distribuída.
 */
export interface ValueAddedEntry {
  /**
   * Valor Adicionado Recebido em Transferência (Resultado de Equivalência
   * Patrimonial, Receitas Financeiras, etc.). Item 6 da DVA.
   */
  addedValueReceivedByTransfer?: number | null;

  /**
   * Valor Adicionado Recebido em Transferência (sinônimo de
   * `addedValueReceivedByTransfer`).
   */
  addedValueReceivedOnTransfer?: number | null;

  /**
   * Valor Adicionado Total a Distribuir (Líquido Produzido + Recebido em
   * Transferência). Item 7 da DVA.
   */
  addedValueToDistribute?: number | null;

  /**
   * Sinistros Retidos e Benefícios.
   */
  claimsAndBenefits?: number | null;

  /**
   * Receita com Operações de Previdência Complementar.
   */
  complementaryPensionOperationsRevenue?: number | null;

  /**
   * Construção de Ativos Próprios.
   */
  constructionOfOwnAssets?: number | null;

  /**
   * Custos dos Produtos, Mercadorias e Serviços Vendidos (detalhamento).
   */
  costsWithProductsSold?: number | null;

  /**
   * Depreciação e Amortização.
   */
  depreciationAndAmortization?: number | null;

  /**
   * Distribuição do Valor Adicionado (Soma dos itens seguintes). Item 8 da DVA.
   */
  distributionOfAddedValue?: number | null;

  /**
   * Dividendos Distribuídos.
   */
  dividends?: number | null;

  /**
   * Data de término do período fiscal ao qual a DVA se refere (YYYY-MM-DD).
   */
  endDate?: string;

  /**
   * Resultado de Equivalência Patrimonial (como receita na DVA).
   */
  equityIncomeResult?: number | null;

  /**
   * Remuneração de Capitais Próprios (JCP, Dividendos, Lucros Retidos).
   */
  equityRemuneration?: number | null;

  /**
   * Impostos Federais (IRPJ, CSLL, PIS, COFINS, IPI).
   */
  federalTaxes?: number | null;

  /**
   * Receita com Taxas e Comissões.
   */
  feesRevenue?: number | null;

  /**
   * Receitas Financeiras (como valor recebido em transferência).
   */
  financialIncome?: number | null;

  /**
   * Despesas de Intermediação Financeira (específico para bancos).
   */
  financialIntermediationExpenses?: number | null;

  /**
   * Receita de Intermediação Financeira (específico para bancos).
   */
  financialIntermediationRevenue?: number | null;

  /**
   * Valor Adicionado Bruto (Receitas - Insumos). Item 3 da DVA.
   */
  grossAddedValue?: number | null;

  /**
   * Receita com Operações de Seguros (específico para Seguradoras).
   */
  insuranceOperationsRevenue?: number | null;

  /**
   * Variações de Operações de Seguros.
   */
  insuranceOperationsVariations?: number | null;

  /**
   * Juros sobre o Capital Próprio (JCP).
   */
  interestOnOwnEquity?: number | null;

  /**
   * Perda/Recuperação de Valores de Ativos (Impairment - como custo/receita).
   */
  lossOrRecoveryOfAssets?: number | null;

  /**
   * Perda / Recuperação de Valores de Ativos (Impairment).
   */
  lossOrRecoveryOfAssetValues?: number | null;

  /**
   * Custos com Materiais, Energia, Serviços de Terceiros e Outros.
   */
  materialsEnergyAndOthers?: number | null;

  /**
   * Impostos Municipais (ISS).
   */
  municipalTaxes?: number | null;

  /**
   * Valor Adicionado Líquido Produzido pela Entidade (Bruto - Retenções). Item 5 da
   * DVA.
   */
  netAddedValue?: number | null;

  /**
   * Valor Adicionado Líquido Produzido (sinônimo de `netAddedValue`).
   */
  netAddedValueProduced?: number | null;

  /**
   * Receita Operacional Líquida (detalhamento).
   */
  netOperatingRevenue?: number | null;

  /**
   * Participação dos Não Controladores nos Lucros Retidos.
   */
  nonControllingShareOfRetainedEarnings?: number | null;

  /**
   * Outras Distribuições.
   */
  otherDistributions?: number | null;

  /**
   * Outras Retenções (Exaustão, etc.).
   */
  otherRetentions?: number | null;

  /**
   * Outras Receitas.
   */
  otherRevenues?: number | null;

  /**
   * Outros Insumos.
   */
  otherSupplies?: number | null;

  /**
   * Outros Valores Recebidos (Receitas Financeiras, Aluguéis, etc.).
   */
  otherValuesReceivedByTransfer?: number | null;

  /**
   * Outras Variações.
   */
  otherVariations?: number | null;

  /**
   * Remuneração de Capitais Próprios (sinônimo de `equityRemuneration`).
   */
  ownEquityRemuneration?: number | null;

  /**
   * Variações de Operações de Previdência.
   */
  pensionOperationsVariations?: number | null;

  /**
   * Venda de Produtos e Serviços (detalhamento).
   */
  productSales?: number | null;

  /**
   * Provisão/Reversão para Créditos de Liquidação Duvidosa (PCLD - como
   * receita/despesa na DVA).
   */
  provisionOrReversalOfDoubtfulAccounts?: number | null;

  /**
   * Provisão/Reversão de Perdas com Risco de Crédito (PCLD).
   */
  provisionOrReversalOfExpectedCreditRiskLosses?: number | null;

  /**
   * Remuneração de Capitais de Terceiros (Juros, Aluguéis).
   */
  remunerationOfThirdPartyCapitals?: number | null;

  /**
   * Resultado de Operações de Cosseguros Cedidos.
   */
  resultOfCoinsuranceOperationsAssigned?: number | null;

  /**
   * Resultados de Operações de Resseguros Cedidos.
   */
  resultsOfCededReinsuranceOperations?: number | null;

  /**
   * Lucros Retidos ou Prejuízo do Exercício.
   */
  retainedEarningsOrLoss?: number | null;

  /**
   * Retenções (Depreciação, Amortização e Exaustão). Item 4 da DVA.
   */
  retentions?: number | null;

  /**
   * Receitas (Venda de Mercadorias, Produtos e Serviços, etc.). Item 1 da DVA.
   */
  revenue?: number | null;

  /**
   * Receita da Prestação de Serviços (detalhamento).
   */
  revenueFromTheProvisionOfServices?: number | null;

  /**
   * Serviços de Terceiros (detalhamento).
   */
  services?: number | null;

  /**
   * Impostos Estaduais (ICMS).
   */
  stateTaxes?: number | null;

  /**
   * Insumos Adquiridos de Terceiros (Custo de Mercadorias, Matérias-Primas). Item 2
   * da DVA.
   */
  suppliesPurchasedFromThirdParties?: number | null;

  /**
   * Ticker do ativo ao qual a DVA se refere.
   */
  symbol?: string;

  /**
   * Impostos, Taxas e Contribuições (Federais, Estaduais, Municipais).
   */
  taxes?: number | null;

  /**
   * Pessoal e Encargos (Salários, Benefícios, FGTS).
   */
  teamRemuneration?: number | null;

  /**
   * Materiais, Energia, Serviços de Terceiros.
   */
  thirdPartyMaterialsAndServices?: number | null;

  /**
   * Valor Adicionado Total a Distribuir (sinônimo de `addedValueToDistribute`).
   */
  totalAddedValueToDistribute?: number | null;

  /**
   * Indica a periodicidade da DVA: `yearly` (anual) ou `quarterly` (trimestral).
   */
  type?: 'yearly' | 'quarterly';

  /**
   * Data da última atualização deste registro específico na fonte de dados
   * (YYYY-MM-DD).
   */
  updatedAt?: string;

  /**
   * Variação nas Despesas de Comercialização Diferidas.
   */
  variationInDeferredSellingExpenses?: number | null;

  /**
   * Variações das Provisões Técnicas (específico para Seguradoras).
   */
  variationsOfTechnicalProvisions?: number | null;
}

/**
 * Resposta principal do endpoint `/api/quote/{tickers}`.
 */
export interface QuoteRetrieveResponse {
  /**
   * Timestamp indicando quando a requisição foi recebida pelo servidor. Formato
   * ISO 8601.
   */
  requestedAt?: string;

  /**
   * Array contendo os resultados detalhados para cada ticker solicitado.
   */
  results?: Array<QuoteRetrieveResponse.Result>;

  /**
   * Tempo aproximado que o servidor levou para processar a requisição, em formato de
   * string (ex: `746ms`).
   */
  took?: string;
}

export namespace QuoteRetrieveResponse {
  /**
   * Contém os dados detalhados de um ativo específico retornado pelo endpoint
   * `/api/quote/{tickers}`.
   */
  export interface Result {
    /**
     * Média do volume financeiro diário negociado nos últimos 10 dias.
     */
    averageDailyVolume10Day?: number | null;

    /**
     * Média do volume financeiro diário negociado nos últimos 3 meses.
     */
    averageDailyVolume3Month?: number | null;

    /**
     * Histórico **anual** do Balanço Patrimonial. Retornado apenas se `modules`
     * incluir `balanceSheetHistory`.
     */
    balanceSheetHistory?: Array<QuoteAPI.BalanceSheetEntry> | null;

    /**
     * Histórico **trimestral** do Balanço Patrimonial. Retornado apenas se `modules`
     * incluir `balanceSheetHistoryQuarterly`.
     */
    balanceSheetHistoryQuarterly?: Array<QuoteAPI.BalanceSheetEntry> | null;

    /**
     * Histórico **anual** da Demonstração do Fluxo de Caixa (DFC). Retornado apenas se
     * `modules` incluir `cashflowHistory`.
     */
    cashflowHistory?: Array<QuoteAPI.CashflowEntry> | null;

    /**
     * Histórico **trimestral** da Demonstração do Fluxo de Caixa (DFC). Retornado
     * apenas se `modules` incluir `cashflowHistoryQuarterly`.
     */
    cashflowHistoryQuarterly?: Array<QuoteAPI.CashflowEntry> | null;

    /**
     * Moeda na qual os valores monetários são expressos (geralmente `BRL`).
     */
    currency?: string;

    /**
     * Principais estatísticas financeiras atuais/TTM. Retornado apenas se `modules`
     * incluir `defaultKeyStatistics`.
     */
    defaultKeyStatistics?: QuoteAPI.DefaultKeyStatisticsEntry | null;

    /**
     * Histórico **anual** das principais estatísticas. Retornado apenas se `modules`
     * incluir `defaultKeyStatisticsHistory`.
     */
    defaultKeyStatisticsHistory?: Array<QuoteAPI.DefaultKeyStatisticsEntry> | null;

    /**
     * Histórico **trimestral** das principais estatísticas. Retornado apenas se
     * `modules` incluir `defaultKeyStatisticsHistoryQuarterly`.
     */
    defaultKeyStatisticsHistoryQuarterly?: Array<QuoteAPI.DefaultKeyStatisticsEntry> | null;

    /**
     * Objeto contendo informações sobre dividendos, JCP e outros eventos corporativos.
     * Retornado apenas se `dividends=true` for especificado na requisição.
     */
    dividendsData?: Result.DividendsData | null;

    /**
     * Lucro Por Ação (LPA) dos últimos 12 meses (TTM). Retornado se
     * `fundamental=true`.
     */
    earningsPerShare?: number | null;

    /**
     * Preço máximo atingido nas últimas 52 semanas.
     */
    fiftyTwoWeekHigh?: number | null;

    /**
     * Variação absoluta entre o preço atual e o preço máximo das últimas 52 semanas.
     */
    fiftyTwoWeekHighChange?: number | null;

    /**
     * Variação percentual entre o preço atual e o preço máximo das últimas 52 semanas.
     */
    fiftyTwoWeekHighChangePercent?: number | null;

    /**
     * Preço mínimo atingido nas últimas 52 semanas.
     */
    fiftyTwoWeekLow?: number | null;

    /**
     * Variação absoluta entre o preço atual e o preço mínimo das últimas 52 semanas.
     */
    fiftyTwoWeekLowChange?: number | null;

    /**
     * String formatada mostrando o intervalo de preço das últimas 52 semanas (Mínimo -
     * Máximo).
     */
    fiftyTwoWeekRange?: string | null;

    /**
     * Dados financeiros e indicadores TTM. Retornado apenas se `modules` incluir
     * `financialData`.
     */
    financialData?: QuoteAPI.FinancialDataEntry | null;

    /**
     * Histórico **anual** de dados financeiros e indicadores. Retornado apenas se
     * `modules` incluir `financialDataHistory`.
     */
    financialDataHistory?: Array<QuoteAPI.FinancialDataEntry> | null;

    /**
     * Histórico **trimestral** de dados financeiros e indicadores. Retornado apenas se
     * `modules` incluir `financialDataHistoryQuarterly`.
     */
    financialDataHistoryQuarterly?: Array<QuoteAPI.FinancialDataEntry> | null;

    /**
     * Array contendo a série histórica de preços, retornado apenas se os parâmetros
     * `range` e/ou `interval` forem especificados na requisição.
     */
    historicalDataPrice?: Array<Result.HistoricalDataPrice> | null;

    /**
     * Histórico **anual** da Demonstração do Resultado (DRE). Retornado apenas se
     * `modules` incluir `incomeStatementHistory`.
     */
    incomeStatementHistory?: Array<QuoteAPI.IncomeStatementEntry> | null;

    /**
     * Histórico **trimestral** da Demonstração do Resultado (DRE). Retornado apenas se
     * `modules` incluir `incomeStatementHistoryQuarterly`.
     */
    incomeStatementHistoryQuarterly?: Array<QuoteAPI.IncomeStatementEntry> | null;

    /**
     * URL da imagem do logo do ativo/empresa.
     */
    logourl?: string;

    /**
     * Nome longo ou completo da empresa ou ativo.
     */
    longName?: string | null;

    /**
     * Capitalização de mercado total do ativo (Preço Atual x Ações em Circulação).
     */
    marketCap?: number | null;

    /**
     * Indicador Preço/Lucro (P/L): Preço Atual / Lucro Por Ação (LPA) TTM. Retornado
     * se `fundamental=true`.
     */
    priceEarnings?: number | null;

    /**
     * Variação absoluta do preço no dia atual em relação ao fechamento anterior.
     */
    regularMarketChange?: number | null;

    /**
     * Variação percentual do preço no dia atual em relação ao fechamento anterior.
     */
    regularMarketChangePercent?: number | null;

    /**
     * Preço máximo atingido no dia de negociação atual.
     */
    regularMarketDayHigh?: number | null;

    /**
     * Preço mínimo atingido no dia de negociação atual.
     */
    regularMarketDayLow?: number | null;

    /**
     * String formatada mostrando o intervalo de preço do dia (Mínimo - Máximo).
     */
    regularMarketDayRange?: string | null;

    /**
     * Preço de abertura no dia de negociação atual.
     */
    regularMarketOpen?: number | null;

    /**
     * Preço de fechamento do pregão anterior.
     */
    regularMarketPreviousClose?: number | null;

    /**
     * Preço atual ou do último negócio registrado.
     */
    regularMarketPrice?: number | null;

    /**
     * Data e hora da última atualização da cotação (último negócio registrado).
     * Formato ISO 8601.
     */
    regularMarketTime?: string | null;

    /**
     * Volume financeiro negociado no dia atual.
     */
    regularMarketVolume?: number | null;

    /**
     * Nome curto ou abreviado da empresa ou ativo.
     */
    shortName?: string | null;

    /**
     * Resumo do perfil da empresa. Retornado apenas se `modules` incluir
     * `summaryProfile`.
     */
    summaryProfile?: Result.SummaryProfile | null;

    /**
     * Ticker (símbolo) do ativo (ex: `PETR4`, `^BVSP`).
     */
    symbol?: string;

    /**
     * Média móvel simples dos preços de fechamento dos últimos 200 dias.
     */
    twoHundredDayAverage?: number | null;

    /**
     * Variação absoluta entre o preço atual e a média de 200 dias.
     */
    twoHundredDayAverageChange?: number | null;

    /**
     * Variação percentual entre o preço atual e a média de 200 dias.
     */
    twoHundredDayAverageChangePercent?: number | null;

    /**
     * Timestamp da última atualização dos dados do índice na fonte (aplicável
     * principalmente a índices, como `^BVSP`). Formato ISO 8601.
     */
    updatedAt?: string | null;

    /**
     * O intervalo (`interval`) efetivamente utilizado pela API para retornar os dados
     * históricos, caso solicitado.
     */
    usedInterval?: string | null;

    /**
     * O período (`range`) efetivamente utilizado pela API para retornar os dados
     * históricos, caso solicitado.
     */
    usedRange?: string | null;

    /**
     * Lista dos valores válidos que podem ser utilizados no parâmetro `interval` para
     * este ativo específico.
     */
    validIntervals?: Array<string>;

    /**
     * Lista dos valores válidos que podem ser utilizados no parâmetro `range` para
     * este ativo específico.
     */
    validRanges?: Array<string>;

    /**
     * Histórico **anual** da Demonstração do Valor Adicionado (DVA). Retornado apenas
     * se `modules` incluir `valueAddedHistory`.
     */
    valueAddedHistory?: Array<QuoteAPI.ValueAddedEntry> | null;

    /**
     * Histórico **trimestral** da Demonstração do Valor Adicionado (DVA). Retornado
     * apenas se `modules` incluir `valueAddedHistoryQuarterly`.
     */
    valueAddedHistoryQuarterly?: Array<QuoteAPI.ValueAddedEntry> | null;
  }

  export namespace Result {
    /**
     * Objeto contendo informações sobre dividendos, JCP e outros eventos corporativos.
     * Retornado apenas se `dividends=true` for especificado na requisição.
     */
    export interface DividendsData {
      /**
       * Lista de proventos pagos em dinheiro (Dividendos e JCP).
       */
      cashDividends?: Array<DividendsData.CashDividend>;

      /**
       * Lista de eventos corporativos (Desdobramento, Grupamento, Bonificação).
       */
      stockDividends?: Array<DividendsData.StockDividend>;

      /**
       * Lista de eventos de subscrição de ações (estrutura não detalhada aqui).
       */
      subscriptions?: Array<unknown>;
    }

    export namespace DividendsData {
      /**
       * Detalhes sobre um pagamento de provento em dinheiro (Dividendo ou JCP).
       */
      export interface CashDividend {
        /**
         * Data em que o pagamento do provento foi aprovado pela empresa. Pode ser uma
         * estimativa em alguns casos. Formato ISO 8601.
         */
        approvedOn?: string;

        /**
         * Ticker do ativo que pagou o provento (ex: `ITSA4`). Pode incluir sufixos
         * específicos relacionados ao evento.
         */
        assetIssued?: string;

        /**
         * Código ISIN (International Securities Identification Number) do ativo
         * relacionado ao provento.
         */
        isinCode?: string | null;

        /**
         * Tipo do provento em dinheiro. Geralmente `DIVIDENDO` ou `JCP` (Juros sobre
         * Capital Próprio).
         */
        label?: string;

        /**
         * Data Com (Ex-Date). Último dia em que era necessário possuir o ativo para ter
         * direito a receber este provento. Pode ser uma estimativa. Formato ISO 8601.
         */
        lastDatePrior?: string;

        /**
         * Data efetiva em que o pagamento foi realizado (ou está previsto). Formato
         * ISO 8601.
         */
        paymentDate?: string | null;

        /**
         * Valor bruto do provento pago por unidade do ativo (por ação, por cota).
         */
        rate?: number;

        /**
         * Descrição do período ou evento ao qual o provento se refere (ex:
         * `1º Trimestre/2023`, `Resultado 2022`).
         */
        relatedTo?: string | null;

        /**
         * Observações adicionais ou informações relevantes sobre o provento.
         */
        remarks?: string | null;
      }

      /**
       * Detalhes sobre um evento corporativo que afeta a quantidade de ações
       * (Desdobramento/Split, Grupamento/Inplit, Bonificação).
       */
      export interface StockDividend {
        /**
         * Data em que o evento foi aprovado. Formato ISO 8601.
         */
        approvedOn?: string;

        /**
         * Ticker do ativo afetado pelo evento.
         */
        assetIssued?: string;

        /**
         * Descrição textual do fator (ex: `1 / 10`, `10 / 1`).
         */
        completeFactor?: string;

        /**
         * Fator numérico do evento.
         *
         * - **Bonificação:** Percentual (ex: 0.1 para 10%).
         * - **Desdobramento/Grupamento:** Fator multiplicativo ou divisor.
         */
        factor?: number;

        /**
         * Código ISIN do ativo.
         */
        isinCode?: string | null;

        /**
         * Tipo do evento: `DESDOBRAMENTO`, `GRUPAMENTO`, `BONIFICACAO`.
         */
        label?: string;

        /**
         * Data Com (Ex-Date). Último dia para possuir o ativo nas condições antigas.
         * Formato ISO 8601.
         */
        lastDatePrior?: string;

        /**
         * Observações adicionais sobre o evento.
         */
        remarks?: string | null;
      }
    }

    /**
     * Representa um ponto na série histórica de preços de um ativo.
     */
    export interface HistoricalDataPrice {
      /**
       * Preço de fechamento ajustado para proventos (dividendos, JCP, bonificações,
       * etc.) e desdobramentos/grupamentos.
       */
      adjustedClose?: number;

      /**
       * Preço de fechamento do ativo no intervalo.
       */
      close?: number;

      /**
       * Data do pregão ou do ponto de dados, representada como um timestamp UNIX (número
       * de segundos desde 1970-01-01 UTC).
       */
      date?: number;

      /**
       * Preço máximo atingido pelo ativo no intervalo.
       */
      high?: number;

      /**
       * Preço mínimo atingido pelo ativo no intervalo.
       */
      low?: number;

      /**
       * Preço de abertura do ativo no intervalo (dia, semana, mês, etc.).
       */
      open?: number;

      /**
       * Volume financeiro negociado no intervalo.
       */
      volume?: number;
    }

    /**
     * Resumo do perfil da empresa. Retornado apenas se `modules` incluir
     * `summaryProfile`.
     */
    export interface SummaryProfile {
      /**
       * Linha 1 do endereço da sede da empresa.
       */
      address1?: string | null;

      /**
       * Linha 2 do endereço da sede da empresa (complemento).
       */
      address2?: string | null;

      /**
       * Cidade da sede da empresa.
       */
      city?: string | null;

      /**
       * Lista de diretores e executivos principais da empresa (estrutura interna do
       * objeto não detalhada aqui).
       */
      companyOfficers?: Array<unknown> | null;

      /**
       * País da sede da empresa.
       */
      country?: string | null;

      /**
       * Número estimado de funcionários em tempo integral.
       */
      fullTimeEmployees?: number | null;

      /**
       * Nome da indústria em que a empresa atua.
       */
      industry?: string | null;

      /**
       * Nome de exibição formatado para a indústria.
       */
      industryDisp?: string | null;

      /**
       * Chave interna ou código para a indústria.
       */
      industryKey?: string | null;

      /**
       * Descrição longa e detalhada sobre as atividades e o negócio da empresa.
       */
      longBusinessSummary?: string | null;

      /**
       * Número de telefone principal da empresa.
       */
      phone?: string | null;

      /**
       * Nome do setor de atuação da empresa.
       */
      sector?: string | null;

      /**
       * Nome de exibição formatado para o setor.
       */
      sectorDisp?: string | null;

      /**
       * Chave interna ou código para o setor.
       */
      sectorKey?: string | null;

      /**
       * Estado ou província da sede da empresa.
       */
      state?: string | null;

      /**
       * URL do website oficial da empresa.
       */
      website?: string | null;

      /**
       * Código Postal (CEP) da sede da empresa.
       */
      zip?: string | null;
    }
  }
}

/**
 * Resposta do endpoint de listagem de cotações (`/api/quote/list`).
 */
export interface QuoteListResponse {
  /**
   * Lista de todos os setores disponíveis que podem ser usados no parâmetro de
   * filtro `sector`.
   */
  availableSectors?: Array<string>;

  /**
   * Lista dos tipos de ativos (`stock`, `fund`, `bdr`) disponíveis que podem ser
   * usados no parâmetro de filtro `type`.
   */
  availableStockTypes?: Array<'stock' | 'fund' | 'bdr'>;

  /**
   * Número da página atual retornada nos resultados.
   */
  currentPage?: number;

  /**
   * Indica se existe uma próxima página de resultados (`true`) ou se esta é a última
   * página (`false`).
   */
  hasNextPage?: boolean;

  /**
   * Lista resumida de índices relevantes (geralmente inclui IBOVESPA).
   */
  indexes?: Array<QuoteListResponse.Index>;

  /**
   * Número de itens (ativos) retornados por página (conforme `limit` ou padrão).
   */
  itemsPerPage?: number;

  /**
   * Lista paginada e filtrada dos ativos solicitados.
   */
  stocks?: Array<QuoteListResponse.Stock>;

  /**
   * Número total de ativos encontrados que correspondem aos filtros aplicados (sem
   * considerar a paginação).
   */
  totalCount?: number;

  /**
   * Número total de páginas existentes para a consulta/filtros aplicados.
   */
  totalPages?: number;
}

export namespace QuoteListResponse {
  /**
   * Resumo de informações de um índice, geralmente retornado em listas.
   */
  export interface Index {
    /**
     * Nome do índice (ex: `IBOVESPA`).
     */
    name?: string;

    /**
     * Ticker do índice (ex: `^BVSP`).
     */
    stock?: string;
  }

  /**
   * Resumo de informações de um ativo (ação, FII, BDR), geralmente retornado em
   * listas.
   */
  export interface Stock {
    /**
     * Variação percentual do preço em relação ao fechamento anterior.
     */
    change?: number;

    /**
     * Preço de fechamento mais recente ou último preço negociado.
     */
    close?: number;

    /**
     * URL para a imagem do logo da empresa/ativo.
     */
    logo?: string;

    /**
     * Capitalização de mercado (Preço x Quantidade de Ações). Pode ser nulo para FIIs
     * ou outros tipos.
     */
    market_cap?: number | null;

    /**
     * Nome do ativo ou empresa (ex: `PETROBRAS PN`).
     */
    name?: string;

    /**
     * Setor de atuação da empresa (ex: `Energy Minerals`, `Finance`). Pode ser nulo ou
     * variar para FIIs.
     */
    sector?: string | null;

    /**
     * Ticker do ativo (ex: `PETR4`, `MXRF11`).
     */
    stock?: string;

    /**
     * Tipo do ativo: `stock` (Ação), `fund` (Fundo Imobiliário/FII), `bdr` (Brazilian
     * Depositary Receipt).
     */
    type?: 'stock' | 'fund' | 'bdr';

    /**
     * Volume financeiro negociado no último pregão ou dia atual.
     */
    volume?: number;
  }
}

export interface QuoteRetrieveParams {
  /**
   * **Obrigatório caso não esteja adicionado como header "Authorization".** Seu
   * token de autenticação pessoal da API Brapi.
   *
   * **Formas de Envio:**
   *
   * 1.  **Query Parameter:** Adicione `?token=SEU_TOKEN` ao final da URL.
   * 2.  **HTTP Header:** Inclua o header `Authorization: Bearer SEU_TOKEN` na sua
   *     requisição.
   *
   * Ambos os métodos são aceitos, mas pelo menos um deles deve ser utilizado.
   * Obtenha seu token em [brapi.dev/dashboard](https://brapi.dev/dashboard).
   */
  token?: string;

  /**
   * **Opcional.** Booleano (`true` ou `false`). Se `true`, inclui informações sobre
   * dividendos e JCP (Juros sobre Capital Próprio) pagos historicamente pelo ativo
   * na chave `dividendsData`.
   */
  dividends?: boolean;

  /**
   * **Opcional.** Booleano (`true` ou `false`). Se `true`, inclui dados
   * fundamentalistas básicos na resposta, como Preço/Lucro (P/L) e Lucro Por Ação
   * (LPA).
   *
   * **Nota:** Para dados fundamentalistas mais completos, utilize o parâmetro
   * `modules`.
   */
  fundamental?: boolean;

  /**
   * **Opcional.** Define a granularidade (intervalo) dos dados históricos de preço
   * (`historicalDataPrice`). Requer que `range` também seja especificado.
   *
   * **Valores Possíveis:**
   *
   * - `1m`, `2m`, `5m`, `15m`, `30m`, `60m`, `90m`, `1h`: Intervalos intraday
   *   (minutos/horas). **Atenção:** Disponibilidade pode variar conforme o `range` e
   *   o ativo.
   * - `1d`: Diário (padrão se `range` for especificado e `interval` omitido).
   * - `5d`: 5 dias.
   * - `1wk`: Semanal.
   * - `1mo`: Mensal.
   * - `3mo`: Trimestral.
   */
  interval?: '1m' | '2m' | '5m' | '15m' | '30m' | '60m' | '90m' | '1h' | '1d' | '5d' | '1wk' | '1mo' | '3mo';

  /**
   * **Opcional.** Uma lista de módulos de dados adicionais, separados por vírgula
   * (`,`), para incluir na resposta. Permite buscar dados financeiros detalhados.
   *
   * **Exemplos:**
   *
   * - `modules=summaryProfile` (retorna perfil da empresa)
   * - `modules=balanceSheetHistory,incomeStatementHistory` (retorna histórico anual
   *   do BP e DRE)
   *
   * Veja a descrição principal do endpoint para a lista completa de módulos e seus
   * conteúdos.
   */
  modules?: Array<
    | 'summaryProfile'
    | 'balanceSheetHistory'
    | 'defaultKeyStatistics'
    | 'balanceSheetHistoryQuarterly'
    | 'incomeStatementHistory'
    | 'incomeStatementHistoryQuarterly'
    | 'financialData'
    | 'financialDataHistory'
    | 'financialDataHistoryQuarterly'
    | 'defaultKeyStatisticsHistory'
    | 'defaultKeyStatisticsHistoryQuarterly'
    | 'valueAddedHistory'
    | 'valueAddedHistoryQuarterly'
    | 'cashflowHistory'
    | 'cashflowHistoryQuarterly'
  >;

  /**
   * **Opcional.** Define o período para os dados históricos de preço
   * (`historicalDataPrice`). Se omitido, apenas a cotação mais recente é retornada
   * (a menos que `interval` seja usado).
   *
   * **Valores Possíveis:**
   *
   * - `1d`: Último dia de pregão (intraday se `interval` for minutos/horas).
   * - `5d`: Últimos 5 dias.
   * - `1mo`: Último mês.
   * - `3mo`: Últimos 3 meses.
   * - `6mo`: Últimos 6 meses.
   * - `1y`: Último ano.
   * - `2y`: Últimos 2 anos.
   * - `5y`: Últimos 5 anos.
   * - `10y`: Últimos 10 anos.
   * - `ytd`: Desde o início do ano atual (Year-to-Date).
   * - `max`: Todo o período histórico disponível.
   */
  range?: '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' | '2y' | '5y' | '10y' | 'ytd' | 'max';
}

export interface QuoteListParams {
  /**
   * **Obrigatório caso não esteja adicionado como header "Authorization".** Seu
   * token de autenticação pessoal da API Brapi.
   *
   * **Formas de Envio:**
   *
   * 1.  **Query Parameter:** Adicione `?token=SEU_TOKEN` ao final da URL.
   * 2.  **HTTP Header:** Inclua o header `Authorization: Bearer SEU_TOKEN` na sua
   *     requisição.
   *
   * Ambos os métodos são aceitos, mas pelo menos um deles deve ser utilizado.
   * Obtenha seu token em [brapi.dev/dashboard](https://brapi.dev/dashboard).
   */
  token?: string;

  /**
   * **Opcional.** Número máximo de ativos a serem retornados por página. O valor
   * padrão pode variar.
   */
  limit?: number;

  /**
   * **Opcional.** Número da página dos resultados a ser retornada, considerando o
   * `limit` especificado. Começa em 1.
   */
  page?: number;

  /**
   * **Opcional.** Termo para buscar ativos por ticker (correspondência parcial). Ex:
   * `PETR` encontrará `PETR4`, `PETR3`.
   */
  search?: string;

  /**
   * **Opcional.** Filtra os resultados por setor de atuação da empresa. Utilize um
   * dos valores retornados em `availableSectors`.
   */
  sector?:
    | 'Retail Trade'
    | 'Energy Minerals'
    | 'Health Services'
    | 'Utilities'
    | 'Finance'
    | 'Consumer Services'
    | 'Consumer Non-Durables'
    | 'Non-Energy Minerals'
    | 'Commercial Services'
    | 'Distribution Services'
    | 'Transportation'
    | 'Technology Services'
    | 'Process Industries'
    | 'Communications'
    | 'Producer Manufacturing'
    | 'Miscellaneous'
    | 'Electronic Technology'
    | 'Industrial Services'
    | 'Health Technology'
    | 'Consumer Durables';

  /**
   * **Opcional.** Campo pelo qual os resultados serão ordenados.
   */
  sortBy?: 'name' | 'close' | 'change' | 'change_abs' | 'volume' | 'market_cap_basic' | 'sector';

  /**
   * **Opcional.** Direção da ordenação: `asc` (ascendente) ou `desc` (descendente).
   * Requer que `sortBy` seja especificado.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * **Opcional.** Filtra os resultados por tipo de ativo.
   */
  type?: 'stock' | 'fund' | 'bdr';
}

export declare namespace Quote {
  export {
    type BalanceSheetEntry as BalanceSheetEntry,
    type CashflowEntry as CashflowEntry,
    type DefaultKeyStatisticsEntry as DefaultKeyStatisticsEntry,
    type FinancialDataEntry as FinancialDataEntry,
    type IncomeStatementEntry as IncomeStatementEntry,
    type ValueAddedEntry as ValueAddedEntry,
    type QuoteRetrieveResponse as QuoteRetrieveResponse,
    type QuoteListResponse as QuoteListResponse,
    type QuoteRetrieveParams as QuoteRetrieveParams,
    type QuoteListParams as QuoteListParams,
  };
}
