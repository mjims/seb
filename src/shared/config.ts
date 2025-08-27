export const appConfig = {
  name: 'Sebpay',
  description:
    'Votre solution de paiement mobile money panafricaine. Rapide, sécurisé, et conçu pour l’Afrique.',
  url: new URL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3003'
      : 'https://sebpay.com',
  ),
};
export enum AppCookies {
  ACCESS_TOKEN = 'sebpay_access_token',
  REFRESH_TOKEN = 'sebpay_refresh_token',
}

export enum DateFormat {
  YYYY = 'YYYY',
  MM = 'MM',
  LT = 'HH:mm',
  LTS = 'HH:mm:ss',
  LL = 'D MMMM YYYY',
  LLL = 'D MMMM YYYY HH:mm',
  LLLL = 'ddd DD MMMM YYYY HH:mm',
  DATE = 'DD/MM/YYYY',
  DAY_MONTH_YEAR = 'DD-MM-YYYY',
  MONTH_YEAR = 'MM-YYYY',
  API_DATE = 'YYYY-MM-DD',
  API_DATETIME = 'YYYY-MM-DD HH:mm:ss',
  DATETIME = 'DD/MM/YYYY HH:mm:ss',
  DATEPICKER_MONTH_YEAR = 'MM/YYYY',
  DATEPICKER_DATETIME = 'DD/MM/YYYY HH:mm',
}
