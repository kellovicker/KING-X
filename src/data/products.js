import blindfolded1 from '../Assets/blindfolded1.jpeg'
import blindfolded2 from '../Assets/blindfolded3.jpeg'
import blindfolded from '../Assets/blindfolded.jpeg'
import Ascension1 from '../Assets/Ascension1.jpeg'
import Ascension2 from '../Assets/Ascension2.jpeg'
import Ascension3 from '../Assets/Ascension3.PNG'
import Tracksuitted1 from '../Assets/Tracksuitted1.jpeg'
import Tracksuitted2 from '../Assets/Tracksuitted2.jpeg'
import Tracksuitted3 from '../Assets/Tracksuitted3.jpeg'

export const products = [
  {
    id: 1,
    name: 'blindfolded king Tee',
    category: 'shirt',
    collection: 'men',
    price: 55000,
    tag: 'New',
    color: '#e8dfd0',
    image: blindfolded1,
    images: [
      blindfolded2,
      blindfolded,
    ],
    desc: 'a statement piece built around quiet confidence, focus, and self-belief.',
  },
  {
    id: 2,
    name: 'The Ascension (Gold Beanie)',
    category: 'cap',
    collection: 'men',
    price: 30000,
    tag: 'new',
    color: '#ddd5c8',
    image: Ascension1,
    images: [
      Ascension2,
      Ascension3,
    ],
    desc: 'A symbol of elevation, protection, and divine strength.',
  },
  {
    id: 3,
    name: 'KING X Sovereign ',
    category: 'Tracksuit',
    collection: 'men',
    price: 80000,
    tag: 'New',
    color: '#e4dbd2',
    image: Tracksuitted1,
    images: [
      Tracksuitted2,
      Tracksuitted3,
    ],
    desc: 'Luxuriously soft silk-blend shirt with a relaxed fit. Pairs perfectly with tailored or casual pieces.',
  },
  {
    id: 4,
    name: 'Cashmere Knit',
    category: 'Tops',
    collection: 'women',
    price: 35000,
    tag: 'New',
    color: '#ead8cc',
    image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=800&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
      'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80',
    ],
    desc: 'Ultra-soft cashmere knit in a boxy, elegant cut. A luxury essential for any season.',
  },
  {
    id: 5,
    name: 'Wide Leg Pants',
    category: 'Bottoms',
    collection: 'women',
    price: 24000,
    tag: null,
    color: '#d8d0c4',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    ],
    desc: 'Flowing wide-leg trousers with a high-rise waist. Effortless movement for the modern woman.',
  },
  {
    id: 6,
    name: 'Evening Blazer',
    category: 'Outerwear',
    collection: 'women',
    price: 52000,
    tag: 'Limited',
    color: '#c8bfb4',
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
      'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80',
    ],
    desc: 'A statement evening blazer with gold-tone button detailing. Structured and sophisticated.',
  },
  {
    id: 7,
    name: 'Merino Crewneck',
    category: 'Tops',
    collection: 'men',
    price: 22000,
    tag: null,
    color: '#e0d8ce',
    image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80',
      'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800&q=80',
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
    ],
    desc: 'Fine merino wool crewneck. Exceptionally soft, temperature-regulating, and timeless.',
  },
  {
    id: 8,
    name: 'Pleated Midi Skirt',
    category: 'Bottoms',
    collection: 'women',
    price: 18000,
    tag: 'New',
    color: '#ddd4c6',
    image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    ],
    desc: 'Elegant pleated midi skirt in a lightweight fabric. Moves beautifully, dresses up or down.',
  },
];

export const collections = [

  {
    id: 'men',
    name: 'Men',
    label: 'blindfolded king Tee',
    desc: 'a statement piece built around quiet confidence, focus, and self-belief.',
    bg: '#3d2e1e',
    image: blindfolded1,
  },
  {
    id: 'women',
    name: 'Women',
    label: 'KING X Sovereign',
    desc: 'Luxuriously soft silk-blend shirt with a relaxed fit. Pairs perfectly with tailored or casual pieces.',
    bg: '#5a4a35',
    image: Tracksuitted3,
  },
];

export const heroSlides = [
  {
    tag: 'New Season · 2025',
    title: ['blindfolded', 'king tee', 'Refined.'],
    sub: 'a statement piece built around quiet confidence, focus, and self-belief.',
    label: 'Shirt',
    image: blindfolded1,
  },
  {
    tag: 'Exclusive Drop',
    title: ['The Ascension', 'Gold Beanie', 'Wear.'],
    sub: 'A symbol of elevation, protection, and divine strength.',
    label: 'Tailored cap',
    image: Ascension1,
  },
  {
    tag: 'Limited Edition',
    title: ['KING X Sovereign ', 'Tracksuitted', 'Intention.'],
    sub: 'Each piece a quiet statement. Each fabric a considered choice.',
    label: 'Silk Blend Shirt',
    image: Tracksuitted1,
  },
];

export const sizes = [  'L', 'XL', 'XXL'];
