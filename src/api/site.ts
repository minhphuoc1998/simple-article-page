
export interface Site {
  id: string
  siteName: string
  origin: string
  url: string
  logo: string
}

export const getSiteList = (
): Site[] => {
  return [
    {
      id: '1', siteName: 'VnExpress', origin: 'vnexpress.net', url: 'https://vnexpress.net/', logo: 'https://vnexpress.net/favicon.ico'
    },
    {
      id: '2', siteName: 'Tuoi Tre', origin: 'tuoitre.vn', url: 'https://tuoitre.vn/', logo: 'https://tuoitre.vn/favicon.ico'
    }
  ]
}
