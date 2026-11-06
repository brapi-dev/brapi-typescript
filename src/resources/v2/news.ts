// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Notícias de empresas da B3 e do mercado, com resumo, sentimento, importância e ativos citados.
 */
export class News extends APIResource {
  /**
   * Uma notícia pelo ID ou pelo slug, com a matéria completa em Markdown. Os
   * títulos, resumos e matérias são escritos por inteligência artificial a partir
   * das matérias listadas em `sources`. Cada notícia junta as matérias de vários
   * veículos sobre o mesmo fato.
   *
   * @example
   * ```ts
   * const news = await client.v2.news.retrieve(
   *   'petrobras-aprova-dividendos-de-r-20-bilhoes-a3f9c1',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<NewsRetrieveResponse> {
    return this._client.get(path`/api/v2/news/${id}`, options);
  }

  /**
   * Notícias sobre empresas e ativos da B3: resultados, proventos, fusões,
   * captações, recomendações e outros fatos. Os títulos, resumos e matérias são
   * escritos por inteligência artificial a partir das matérias listadas em
   * `sources`. Cada notícia junta as matérias de vários veículos sobre o mesmo fato.
   *
   * Use `tickers` para ver as notícias de ativos específicos. Um ticker de ação
   * também traz as notícias das outras classes da mesma empresa. As notícias vêm da
   * mais recente para a mais antiga. Para a próxima página, envie `nextCursor` no
   * parâmetro `cursor`.
   *
   * @example
   * ```ts
   * const news = await client.v2.news.list();
   * ```
   */
  list(
    query: NewsListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NewsListResponse> {
    return this._client.get('/api/v2/news', { query, ...options });
  }

  /**
   * Notícias de economia e mercado: juros, Selic, inflação, câmbio, contas públicas,
   * política e o Ibovespa, no Brasil e na América Latina. Os títulos, resumos e
   * matérias são escritos por inteligência artificial a partir das matérias listadas
   * em `sources`. Cada notícia junta as matérias de vários veículos sobre o mesmo
   * fato.
   *
   * As notícias vêm da mais recente para a mais antiga. Para a próxima página, envie
   * `nextCursor` no parâmetro `cursor`.
   *
   * @example
   * ```ts
   * const response = await client.v2.news.market();
   * ```
   */
  market(
    query: NewsMarketParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NewsMarketResponse> {
    return this._client.get('/api/v2/news/market', { query, ...options });
  }
}

export interface NewsStory {
  id: string;

  /**
   * Matéria completa em Markdown. Vem só com `includeArticle=true` ou na consulta de
   * uma notícia. `null` enquanto a matéria não foi escrita.
   */
  article: string | null;

  /**
   * Quando a matéria foi escrita, em ISO 8601.
   */
  articleWrittenAt: string | null;

  /**
   * Ativos sobre os quais a notícia trata ou que ela afeta.
   */
  assets: Array<NewsStory.Asset>;

  /**
   * Uma frase sobre a notícia.
   */
  description: string | null;

  eventType:
    | 'earnings'
    | 'dividends'
    | 'guidance'
    | 'mna'
    | 'financing'
    | 'buyback'
    | 'rating'
    | 'analyst'
    | 'management'
    | 'legal_regulatory'
    | 'operations'
    | 'market_move'
    | 'macro'
    | 'other';

  /**
   * De 1 (pequena) a 5 (move o mercado).
   */
  importance: number;

  /**
   * Pontos principais.
   */
  keyPoints: Array<string>;

  /**
   * Data e hora da primeira publicação, em ISO 8601.
   */
  publishedAt: string;

  /**
   * `company` para notícias de empresas e ativos. `market` para economia, juros,
   * câmbio, política e o índice.
   */
  scope: 'company' | 'market';

  /**
   * Sentimento da notícia.
   */
  sentiment: NewsStory.Sentiment;

  slug: string;

  /**
   * Matérias dos veículos usadas para escrever a notícia.
   */
  sources: Array<NewsStory.Source>;

  /**
   * Resumo da notícia.
   */
  summary: string;

  title: string;

  /**
   * Temas da notícia.
   */
  topics: Array<string>;

  /**
   * Última mudança no conteúdo, em ISO 8601.
   */
  updatedAt: string;

  /**
   * Página da notícia na brapi.
   */
  url: string;
}

export namespace NewsStory {
  export interface Asset {
    name: string;

    /**
     * Por que a notícia afeta o ativo.
     */
    reason: string | null;

    /**
     * `primary` quando a notícia é sobre o ativo. `secondary` quando o ativo é
     * afetado.
     */
    relevance: 'primary' | 'secondary';

    /**
     * Efeito provável da notícia no ativo.
     */
    sentiment: 'positive' | 'negative' | 'neutral' | null;

    /**
     * Ticker principal do ativo.
     */
    ticker: string;

    /**
     * Todos os tickers do ativo citados na notícia.
     */
    tickers: Array<string>;

    /**
     * Tipo do ativo: `stock`, `fii`, `fiagro`, `fiinfra`, `fidc`, `fip`, `etf`, `bdr`,
     * `index` ou `currency`.
     */
    type: 'stock' | 'fii' | 'fiagro' | 'fiinfra' | 'fidc' | 'fip' | 'etf' | 'bdr' | 'index' | 'currency';
  }

  /**
   * Sentimento da notícia.
   */
  export interface Sentiment {
    label: 'positive' | 'negative' | 'neutral' | 'mixed';

    /**
     * De -1 (muito negativa) a 1 (muito positiva).
     */
    score: number;
  }

  export interface Source {
    /**
     * Nome do veículo.
     */
    name: string;

    /**
     * Data e hora de publicação no veículo, em ISO 8601.
     */
    publishedAt: string;

    /**
     * Título da matéria no veículo.
     */
    title: string;

    /**
     * Link da matéria no veículo.
     */
    url: string;
  }
}

export interface NewsRetrieveResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * A notícia encontrada, com a matéria completa.
   */
  results: Array<NewsStory>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export interface NewsListResponse {
  /**
   * Cursor da próxima página, para o parâmetro `cursor`. `null` na última página.
   */
  nextCursor: string | null;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<NewsStory>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export interface NewsMarketResponse {
  /**
   * Cursor da próxima página, para o parâmetro `cursor`. `null` na última página.
   */
  nextCursor: string | null;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<NewsStory>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export interface NewsListParams {
  /**
   * Cursor da próxima página. Use o valor de `nextCursor` da resposta anterior, com
   * os mesmos filtros.
   */
  cursor?: string;

  /**
   * Tipos de evento separados por vírgula: `earnings` (resultados), `dividends`
   * (proventos), `guidance` (projeções), `mna` (fusões e aquisições), `financing`
   * (captações e dívida), `buyback` (recompra), `rating` (nota de crédito),
   * `analyst` (recomendações), `management` (gestão), `legal_regulatory` (jurídico e
   * regulação), `operations` (operações), `market_move` (movimento de mercado),
   * `macro` (macroeconomia), `other` (outros).
   */
  eventTypes?:
    | 'earnings'
    | 'dividends'
    | 'guidance'
    | 'mna'
    | 'financing'
    | 'buyback'
    | 'rating'
    | 'analyst'
    | 'management'
    | 'legal_regulatory'
    | 'operations'
    | 'market_move'
    | 'macro'
    | 'other';

  /**
   * Publicadas a partir desta data (`YYYY-MM-DD`) ou data e hora ISO 8601. Sem fuso,
   * vale o horário de Brasília.
   */
  from?: string;

  /**
   * `true` inclui a matéria completa em Markdown no campo `article`. Padrão:
   * `false`.
   */
  includeArticle?: 'true' | 'false';

  /**
   * Máximo de notícias por página. Padrão: 20.
   */
  limit?: number;

  /**
   * Importância mínima, de 1 (pequena) a 5 (move o mercado). Padrão: 1.
   */
  minImportance?: number;

  /**
   * Sentimento da notícia, separado por vírgula: `positive`, `negative`, `neutral`
   * ou `mixed`.
   */
  sentiment?: 'positive' | 'negative' | 'neutral' | 'mixed';

  /**
   * Tickers separados por vírgula. Máximo de 20. Um ticker de ação também traz as
   * notícias das outras classes da mesma empresa (PETR4 inclui PETR3). Sem
   * `tickers`, traz notícias de todas as empresas.
   */
  tickers?: string;

  /**
   * Publicadas até esta data (inclui o dia inteiro) ou até esta data e hora
   * ISO 8601. Sem fuso, vale o horário de Brasília.
   */
  to?: string;
}

export interface NewsMarketParams {
  /**
   * Cursor da próxima página. Use o valor de `nextCursor` da resposta anterior, com
   * os mesmos filtros.
   */
  cursor?: string;

  /**
   * Tipos de evento separados por vírgula: `earnings` (resultados), `dividends`
   * (proventos), `guidance` (projeções), `mna` (fusões e aquisições), `financing`
   * (captações e dívida), `buyback` (recompra), `rating` (nota de crédito),
   * `analyst` (recomendações), `management` (gestão), `legal_regulatory` (jurídico e
   * regulação), `operations` (operações), `market_move` (movimento de mercado),
   * `macro` (macroeconomia), `other` (outros).
   */
  eventTypes?:
    | 'earnings'
    | 'dividends'
    | 'guidance'
    | 'mna'
    | 'financing'
    | 'buyback'
    | 'rating'
    | 'analyst'
    | 'management'
    | 'legal_regulatory'
    | 'operations'
    | 'market_move'
    | 'macro'
    | 'other';

  /**
   * Publicadas a partir desta data (`YYYY-MM-DD`) ou data e hora ISO 8601. Sem fuso,
   * vale o horário de Brasília.
   */
  from?: string;

  /**
   * `true` inclui a matéria completa em Markdown no campo `article`. Padrão:
   * `false`.
   */
  includeArticle?: 'true' | 'false';

  /**
   * Máximo de notícias por página. Padrão: 20.
   */
  limit?: number;

  /**
   * Importância mínima, de 1 (pequena) a 5 (move o mercado). Padrão: 1.
   */
  minImportance?: number;

  /**
   * Sentimento da notícia, separado por vírgula: `positive`, `negative`, `neutral`
   * ou `mixed`.
   */
  sentiment?: 'positive' | 'negative' | 'neutral' | 'mixed';

  /**
   * Publicadas até esta data (inclui o dia inteiro) ou até esta data e hora
   * ISO 8601. Sem fuso, vale o horário de Brasília.
   */
  to?: string;
}

export declare namespace News {
  export {
    type NewsStory as NewsStory,
    type NewsRetrieveResponse as NewsRetrieveResponse,
    type NewsListResponse as NewsListResponse,
    type NewsMarketResponse as NewsMarketResponse,
    type NewsListParams as NewsListParams,
    type NewsMarketParams as NewsMarketParams,
  };
}
