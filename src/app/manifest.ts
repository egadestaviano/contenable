import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Contenable',
    short_name: 'Contenable',
    description: 'Smart Article Search Platform',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/globe.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
