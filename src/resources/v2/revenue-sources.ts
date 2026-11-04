// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class RevenueSources extends APIResource {
  /**
   * Receita por segmento de empresas da B3, BDRs, FIIs e Fiagros, por exercício
   * social, a partir das demonstrações anuais. Cada segmento tem uma atividade
   * padrão, para comparar empresas.
   *
   * `segments` traz os segmentos como a empresa publica, com o crescimento sobre o
   * ano anterior e o link do documento. `activities` soma os segmentos por
   * atividade, com a parte de cada uma na soma dos segmentos.
   *
   * Para ETFs e outros fundos, `lookThrough` mostra a exposição às atividades pela
   * carteira mais recente: o peso de cada ação, BDR ou FII na carteira vezes a parte
   * de cada atividade na receita da empresa.
   *
   * Com `period=quarterly`, `quarters` traz cada trimestre das empresas da B3: a
   * receita acumulada no ano por segmento e, em `quarterValue`, a receita dos 3
   * meses. O 4º trimestre vem das demonstrações anuais.
   *
   * Concessões de energia, saneamento, gás e rodovias registram o investimento na
   * rede como receita de construção. Use `growthExConstruction` para comparar o
   * crescimento sem ela.
   *
   * Planos Startup e Pro. FIIs, Fiagros e fundos só no plano Pro. PETR4, MGLU3,
   * VALE3 e ITUB4 permitem testes gratuitos, sem token.
   *
   * @example
   * ```ts
   * const revenueSource =
   *   await client.v2.revenueSources.retrieve();
   * ```
   */
  retrieve(
    query: RevenueSourceRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<RevenueSourceRetrieveResponse> {
    return this._client.get('/api/v2/revenue-sources', { query, ...options });
  }

  /**
   * Lista das atividades usadas nas fontes de receita. Os códigos têm níveis
   * separados por ponto: uma atividade inclui as atividades filhas.
   *
   * Não precisa de token.
   *
   * @example
   * ```ts
   * const response =
   *   await client.v2.revenueSources.activities();
   * ```
   */
  activities(
    query: RevenueSourceActivitiesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<RevenueSourceActivitiesResponse> {
    return this._client.get('/api/v2/revenue-sources/activities', { query, ...options });
  }

  /**
   * Todos os emissores com receita em uma atividade e nas atividades filhas, com o
   * crescimento por exercício. A receita de vários segmentos do mesmo emissor é
   * somada.
   *
   * Para concessões, o crescimento não usa a receita de construção (`basis` =
   * `exConstruction`) quando ela é conhecida em todos os segmentos. Nos demais
   * casos, `flags` traz `includes-construction`.
   *
   * Os valores ficam na moeda de cada emissor. Compare o crescimento, não os
   * valores. Receitas que já aparecem em uma controlada listada ficam de fora.
   *
   * Bancos e seguradoras não entram: suas receitas não se comparam. Pedir essas
   * atividades retorna erro 400.
   *
   * Planos Startup e Pro. FIIs, Fiagros e fundos só no plano Pro. PETR4, MGLU3,
   * VALE3 e ITUB4 permitem testes gratuitos, sem token.
   *
   * @example
   * ```ts
   * const response = await client.v2.revenueSources.compare({
   *   activity: 'energy.electricity.distribution',
   * });
   * ```
   */
  compare(
    query: RevenueSourceCompareParams,
    options?: RequestOptions,
  ): APIPromise<RevenueSourceCompareResponse> {
    return this._client.get('/api/v2/revenue-sources/compare', { query, ...options });
  }
}

export interface RevenueSourceRetrieveResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<RevenueSourceRetrieveResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace RevenueSourceRetrieveResponse {
  export interface Result {
    /**
     * true quando o ticker pedido mudou de nome.
     */
    changed: boolean;

    /**
     * CNPJ do fundo. null para empresas.
     */
    cnpj: string | null;

    /**
     * Código do emissor na B3.
     */
    issuerCode: string | null;

    /**
     * Só para fundos: exposição da carteira às atividades das empresas, FIIs e BDRs
     * que o fundo tem.
     */
    lookThrough: Result.LookThrough | null;

    name: string | null;

    requestedSymbol: string;

    /**
     * Ticker atual, ou o CNPJ quando o fundo não tem ticker.
     */
    symbol: string;

    /**
     * `company` (empresa da B3), `bdr`, `fii`, `fiagro` ou `fund` (ETF ou outro fundo,
     * com a exposição pela carteira). null quando não há dados.
     */
    type: 'company' | 'bdr' | 'fii' | 'fiagro' | 'fund' | null;

    /**
     * Exercícios do mais recente para o mais antigo. Vazio para fundos e com
     * `period=quarterly`.
     */
    years: Array<Result.Year>;

    /**
     * Só com `period=quarterly`: trimestres do mais recente para o mais antigo.
     */
    quarters?: Array<Result.Quarter>;
  }

  export namespace Result {
    /**
     * Só para fundos: exposição da carteira às atividades das empresas, FIIs e BDRs
     * que o fundo tem.
     */
    export interface LookThrough {
      /**
       * Atividades da maior para a menor.
       */
      activities: Array<LookThrough.Activity>;

      /**
       * Parte da carteira com fontes de receita, em fração (0.06 = 6%). A soma de
       * `weight` das atividades é igual a `coverage`.
       */
      coverage: number;

      /**
       * Valor das posições com fontes de receita, em reais.
       */
      coveredValue: number;

      /**
       * Valor das posições da carteira, em reais.
       */
      portfolioValue: number;

      /**
       * Data da carteira usada.
       */
      referenceDate: string;
    }

    export namespace LookThrough {
      export interface Activity {
        activity: string;

        activityLabel: string;

        /**
         * Até 5 posições que mais pesam na atividade.
         */
        holdings: Array<Activity.Holding>;

        /**
         * Exposição da carteira à atividade, em fração (0.06 = 6%).
         */
        weight: number;
      }

      export namespace Activity {
        export interface Holding {
          /**
           * Exercício das receitas usadas para esta posição.
           */
          fiscalYear: number;

          issuerCode: string;

          /**
           * Peso da posição na carteira, em fração (0.06 = 6%).
           */
          portfolioWeight: number;

          symbol: string;

          /**
           * Peso da atividade que vem desta posição, em fração da carteira.
           */
          weight: number;
        }
      }
    }

    export interface Year {
      /**
       * Soma por atividade, da maior para a menor.
       */
      activities: Array<Year.Activity>;

      currency: string;

      /**
       * Exercício social. Empresas com exercício fora do ano civil usam o ano em que o
       * exercício termina.
       */
      fiscalYear: number;

      periodEnd: string;

      /**
       * Segmentos do maior para o menor.
       */
      segments: Array<Year.Segment>;

      /**
       * Soma dos segmentos. Pode passar da receita total quando os segmentos vendem
       * entre si ou são de receita bruta.
       */
      segmentsTotal: number;

      /**
       * `ok`: segmentos lidos. `no-segments`: a empresa não divulga segmentos, e a lista
       * traz a receita total. `review`: há segmentos com alerta de leitura.
       */
      status: 'ok' | 'no-segments' | 'review';

      /**
       * Conferência dos segmentos com a receita total.
       */
      totalCheck: Year.TotalCheck | null;
    }

    export namespace Year {
      export interface Activity {
        activity: string;

        activityLabel: string;

        /**
         * Crescimento da atividade, em fração. null quando falta o valor anterior de algum
         * segmento.
         */
        growth: number | null;

        /**
         * Número de segmentos somados.
         */
        segments: number;

        /**
         * Parte da soma de todos os segmentos, em fração (0.06 = 6%).
         */
        share: number;

        /**
         * Soma dos segmentos desta atividade.
         */
        value: number;
      }

      export interface Segment {
        /**
         * Código da atividade do segmento.
         */
        activity: string;

        activityLabel: string;

        /**
         * Tipo de divisão: `business` (segmento de negócio), `product` (linha de produto
         * ou serviço), `whole` (empresa sem segmentos: receita líquida total) ou
         * `fii-income` (receitas de FIIs e Fiagros).
         */
        axis: string;

        currency: string;

        /**
         * Alertas sobre o valor. `unchecked`: a soma dos segmentos não confere com a
         * receita total. `relabeled`: uma conferência moveu o valor para outro segmento.
         * `reviewed`: uma pessoa conferiu o segmento. `label-disputed`: duas leituras
         * deram nomes diferentes ao segmento. `reviewed-by-model`: duas leituras
         * discordaram e uma terceira leitura automática confirmou o segmento. `duplicate`:
         * a mesma receita aparece em uma controlada listada. `includes-construction`: o
         * valor inclui receita de construção. `gross`: o valor é receita bruta, antes de
         * impostos e devoluções.
         */
        flags: Array<string>;

        /**
         * Crescimento sobre o ano anterior, em fração (0.06 = 6%).
         */
        growth: number | null;

        /**
         * Crescimento sem a receita de construção, em fração (0.06 = 6%).
         */
        growthExConstruction: number | null;

        /**
         * Nome do segmento como a empresa publica.
         */
        member: string;

        /**
         * Receita do ano anterior sem a receita de construção.
         */
        priorExConstruction: number | null;

        /**
         * `same-filing` quando o valor anterior vem do mesmo documento. `previous-filing`
         * quando vem do documento do ano anterior.
         */
        priorFrom: 'same-filing' | 'previous-filing' | null;

        /**
         * Receita do exercício anterior.
         */
        priorValue: number | null;

        /**
         * `exact` quando o segmento tem só esta atividade. `mixed` quando ele junta
         * atividades e esta é a principal.
         */
        scope: 'exact' | 'mixed';

        source: Segment.Source;

        /**
         * Receita do exercício, na moeda `currency`.
         */
        value: number;

        /**
         * Receita sem a receita de construção de concessões, quando a atividade tem essa
         * receita.
         */
        valueExConstruction: number | null;
      }

      export namespace Segment {
        export interface Source {
          /**
           * Protocolo ou número do documento na origem.
           */
          documentId: string;

          /**
           * Documento de origem: `dfp` (demonstrações anuais na CVM), `itr` (demonstrações
           * trimestrais na CVM), `10-K`, `20-F` ou `40-F` (relatório anual na SEC) ou
           * `fii-quarterly` (informes trimestrais de FIIs na CVM).
           */
          form: string;

          /**
           * Página do valor no documento, quando conhecida.
           */
          page: number | null;

          /**
           * Página do valor do ano anterior, quando conhecida.
           */
          priorPage: number | null;

          /**
           * Link do documento.
           */
          url: string | null;
        }
      }

      /**
       * Conferência dos segmentos com a receita total.
       */
      export interface TotalCheck {
        /**
         * Diferença entre `sum` e `total`, ou `grossTotal` quando existe.
         */
        diff: number | null;

        /**
         * Soma dos segmentos lidos, com as eliminações entre segmentos.
         */
        sum: number;

        /**
         * Receita total publicada.
         */
        total: number | null;

        /**
         * true quando a soma confere com a receita total, ou com `grossTotal`.
         */
        verified: boolean;

        /**
         * Receita bruta publicada, quando os segmentos são de receita bruta.
         */
        grossTotal?: number;
      }
    }

    export interface Quarter {
      currency: string;

      fiscalYear: number;

      /**
       * Meses acumulados de 1º de janeiro até `periodEnd`: 3, 6, 9 ou 12. O 4º trimestre
       * vem das demonstrações anuais.
       */
      months: number;

      periodEnd: string;

      quarter: number;

      /**
       * Segmentos do maior para o menor.
       */
      segments: Array<Quarter.Segment>;

      /**
       * Soma dos segmentos, acumulada no ano.
       */
      segmentsTotal: number;

      /**
       * `ok`: segmentos lidos. `no-segments`: a empresa não divulga segmentos, e a lista
       * traz a receita total. `review`: há segmentos com alerta de leitura.
       */
      status: 'ok' | 'no-segments' | 'review';

      /**
       * Conferência dos segmentos com a receita total acumulada no ano.
       */
      totalCheck: Quarter.TotalCheck | null;
    }

    export namespace Quarter {
      export interface Segment {
        /**
         * Código da atividade do segmento.
         */
        activity: string;

        activityLabel: string;

        /**
         * Tipo de divisão: `business` (segmento de negócio), `product` (linha de produto
         * ou serviço), `whole` (empresa sem segmentos: receita líquida total) ou
         * `fii-income` (receitas de FIIs e Fiagros).
         */
        axis: string;

        currency: string;

        /**
         * Alertas sobre o valor. `unchecked`: a soma dos segmentos não confere com a
         * receita total. `relabeled`: uma conferência moveu o valor para outro segmento.
         * `reviewed`: uma pessoa conferiu o segmento. `label-disputed`: duas leituras
         * deram nomes diferentes ao segmento. `reviewed-by-model`: duas leituras
         * discordaram e uma terceira leitura automática confirmou o segmento. `duplicate`:
         * a mesma receita aparece em uma controlada listada. `includes-construction`: o
         * valor inclui receita de construção. `gross`: o valor é receita bruta, antes de
         * impostos e devoluções.
         */
        flags: Array<string>;

        /**
         * Crescimento do acumulado sobre o mesmo período do ano anterior, em fração (0.06
         * = 6%).
         */
        growth: number | null;

        /**
         * Crescimento sem a receita de construção, em fração (0.06 = 6%).
         */
        growthExConstruction: number | null;

        /**
         * Nome do segmento como a empresa publica.
         */
        member: string;

        /**
         * Receita do ano anterior sem a receita de construção.
         */
        priorExConstruction: number | null;

        /**
         * `same-filing` quando o valor anterior vem do mesmo documento. `previous-filing`
         * quando vem do documento do ano anterior.
         */
        priorFrom: 'same-filing' | 'previous-filing' | null;

        /**
         * Receita acumulada no mesmo período do ano anterior.
         */
        priorValue: number | null;

        /**
         * Receita dos 3 meses do trimestre: o acumulado menos o acumulado do trimestre
         * anterior. null quando os segmentos mudam entre os dois trimestres ou falta o
         * trimestre anterior.
         */
        quarterValue: number | null;

        /**
         * `exact` quando o segmento tem só esta atividade. `mixed` quando ele junta
         * atividades e esta é a principal.
         */
        scope: 'exact' | 'mixed';

        source: Segment.Source;

        /**
         * Receita acumulada no ano até `periodEnd`, na moeda `currency`.
         */
        value: number;

        /**
         * Receita sem a receita de construção de concessões, quando a atividade tem essa
         * receita.
         */
        valueExConstruction: number | null;
      }

      export namespace Segment {
        export interface Source {
          /**
           * Protocolo ou número do documento na origem.
           */
          documentId: string;

          /**
           * Documento de origem: `dfp` (demonstrações anuais na CVM), `itr` (demonstrações
           * trimestrais na CVM), `10-K`, `20-F` ou `40-F` (relatório anual na SEC) ou
           * `fii-quarterly` (informes trimestrais de FIIs na CVM).
           */
          form: string;

          /**
           * Página do valor no documento, quando conhecida.
           */
          page: number | null;

          /**
           * Página do valor do ano anterior, quando conhecida.
           */
          priorPage: number | null;

          /**
           * Link do documento.
           */
          url: string | null;
        }
      }

      /**
       * Conferência dos segmentos com a receita total acumulada no ano.
       */
      export interface TotalCheck {
        /**
         * Diferença entre `sum` e `total`, ou `grossTotal` quando existe.
         */
        diff: number | null;

        /**
         * Soma dos segmentos lidos, com as eliminações entre segmentos.
         */
        sum: number;

        /**
         * Receita total publicada.
         */
        total: number | null;

        /**
         * true quando a soma confere com a receita total, ou com `grossTotal`.
         */
        verified: boolean;

        /**
         * Receita bruta publicada, quando os segmentos são de receita bruta.
         */
        grossTotal?: number;
      }
    }
  }
}

export interface RevenueSourceActivitiesResponse {
  activities: Array<RevenueSourceActivitiesResponse.Activity>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace RevenueSourceActivitiesResponse {
  export interface Activity {
    /**
     * Classe ou divisão CNAE mais próxima. É uma referência.
     */
    cnae: string | null;

    code: string;

    /**
     * false para bancos e seguradoras, cujas receitas não se comparam. `compare`
     * recusa essas atividades.
     */
    comparable: boolean;

    /**
     * true para concessões que registram o investimento na rede como receita de
     * construção. O crescimento em `compare` não usa essa receita.
     */
    constructionRevenue: boolean;

    label: string;

    /**
     * Código da atividade mãe. null no primeiro nível.
     */
    parent: string | null;
  }
}

export interface RevenueSourceCompareResponse {
  activity: RevenueSourceCompareResponse.Activity;

  /**
   * Emissores com receita na atividade, do maior para o menor crescimento no último
   * exercício. Compare o crescimento: os valores podem estar em moedas diferentes.
   */
  issuers: Array<RevenueSourceCompareResponse.Issuer>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace RevenueSourceCompareResponse {
  export interface Activity {
    /**
     * Classe ou divisão CNAE mais próxima. É uma referência.
     */
    cnae: string | null;

    code: string;

    /**
     * false para bancos e seguradoras, cujas receitas não se comparam. `compare`
     * recusa essas atividades.
     */
    comparable: boolean;

    /**
     * true para concessões que registram o investimento na rede como receita de
     * construção. O crescimento em `compare` não usa essa receita.
     */
    constructionRevenue: boolean;

    label: string;

    /**
     * Código da atividade mãe. null no primeiro nível.
     */
    parent: string | null;
  }

  export interface Issuer {
    currency: string;

    issuerCode: string;

    latestGrowth: number | null;

    latestValue: number;

    latestYear: number;

    name: string;

    type: 'company' | 'bdr' | 'fii' | 'fiagro';

    /**
     * Exercícios do mais recente para o mais antigo.
     */
    years: Array<Issuer.Year>;
  }

  export namespace Issuer {
    export interface Year {
      /**
       * `exConstruction` quando o crescimento não usa a receita de construção.
       * `reported` nos demais casos.
       */
      basis: 'reported' | 'exConstruction';

      fiscalYear: number;

      /**
       * Alertas sobre o valor. `unchecked`: a soma dos segmentos não confere com a
       * receita total. `relabeled`: uma conferência moveu o valor para outro segmento.
       * `reviewed`: uma pessoa conferiu o segmento. `label-disputed`: duas leituras
       * deram nomes diferentes ao segmento. `reviewed-by-model`: duas leituras
       * discordaram e uma terceira leitura automática confirmou o segmento. `duplicate`:
       * a mesma receita aparece em uma controlada listada. `includes-construction`: o
       * valor inclui receita de construção. `gross`: o valor é receita bruta, antes de
       * impostos e devoluções.
       */
      flags: Array<string>;

      /**
       * Crescimento sobre o ano anterior, em fração (0.06 = 6%).
       */
      growth: number | null;

      /**
       * Receita do ano anterior, na mesma base de `growth`.
       */
      priorValue: number | null;

      /**
       * Segmentos somados, como a empresa publica.
       */
      segments: Array<string>;

      source: Year.Source;

      /**
       * Receita da atividade no exercício, na moeda do emissor.
       */
      value: number;

      /**
       * Receita sem a receita de construção. Preenchido quando `basis` é
       * `exConstruction`.
       */
      valueExConstruction: number | null;
    }

    export namespace Year {
      export interface Source {
        /**
         * Protocolo ou número do documento na origem.
         */
        documentId: string;

        /**
         * Documento de origem: `dfp` (demonstrações anuais na CVM), `itr` (demonstrações
         * trimestrais na CVM), `10-K`, `20-F` ou `40-F` (relatório anual na SEC) ou
         * `fii-quarterly` (informes trimestrais de FIIs na CVM).
         */
        form: string;

        /**
         * Página do valor no documento, quando conhecida.
         */
        page: number | null;

        /**
         * Link do documento.
         */
        url: string | null;
      }
    }
  }
}

export interface RevenueSourceRetrieveParams {
  /**
   * CNPJs de fundos separados por vírgula, com ou sem pontuação. Use para fundos sem
   * ticker.
   */
  cnpjs?: string;

  /**
   * Último exercício social. Padrão: o mais recente disponível.
   */
  endYear?: number;

  /**
   * `annual` (padrão): exercícios em `years`. `quarterly`: trimestres em `quarters`,
   * com a receita acumulada no ano e a receita dos 3 meses. Só para empresas da B3
   * com exercício de janeiro a dezembro.
   */
  period?: 'annual' | 'quarterly';

  /**
   * Primeiro exercício social. Padrão: o mais antigo disponível.
   */
  startYear?: number;

  /**
   * Tickers separados por vírgula: ações, BDRs, FIIs, Fiagros ou ETFs. Máximo de 20.
   * PETR3 e PETR4 retornam a mesma empresa.
   */
  symbols?: string;
}

export interface RevenueSourceActivitiesParams {
  /**
   * Código de uma atividade. Retorna só ela e as atividades filhas. Padrão: todas.
   */
  activity?: string;
}

export interface RevenueSourceCompareParams {
  /**
   * Código da atividade. Inclui as atividades filhas. Veja os códigos em
   * `/api/v2/revenue-sources/activities`.
   */
  activity: string;

  /**
   * Último exercício social. Padrão: o mais recente disponível.
   */
  endYear?: number;

  /**
   * Primeiro exercício social. Padrão: o mais antigo disponível.
   */
  startYear?: number;
}

export declare namespace RevenueSources {
  export {
    type RevenueSourceRetrieveResponse as RevenueSourceRetrieveResponse,
    type RevenueSourceActivitiesResponse as RevenueSourceActivitiesResponse,
    type RevenueSourceCompareResponse as RevenueSourceCompareResponse,
    type RevenueSourceRetrieveParams as RevenueSourceRetrieveParams,
    type RevenueSourceActivitiesParams as RevenueSourceActivitiesParams,
    type RevenueSourceCompareParams as RevenueSourceCompareParams,
  };
}
