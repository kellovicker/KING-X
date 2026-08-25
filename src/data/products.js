import blindfolded1 from '../Assets/blindfolded1.jpeg'
import blindfolded2 from '../Assets/blindfolded3.jpeg'
import blindfolded from '../Assets/blindfolded.jpeg'
import Ascension1 from '../Assets/Ascension1.jpeg'
import Ascension2 from '../Assets/Ascension2.jpeg'
import Ascension3 from '../Assets/Ascension3.PNG'
import Tracksuitted1 from '../Assets/Tracksuitted1.jpeg'
import Tracksuitted2 from '../Assets/Tracksuitted2.jpeg'
import Tracksuitted3 from '../Assets/Tracksuitted3.jpeg'
import Tracksuitted4 from '../Assets/Tracksuitted4.jpeg'
import Tracksuitted5 from '../Assets/Tracksuitted5.jpeg'
import Tracksuitted6 from '../Assets/Tracksuitted6.jpeg'
import tenis1 from '../Assets/tenis1.jpeg'
import tenis2 from '../Assets/tenis2.jpeg'
import elegance from '../Assets/KING X elegance 2.jpeg'
import elegance2 from '../Assets/KING X elegance 3.jpeg'
import elegance3 from '../Assets/KING X elegance 4.jpeg'
import elegance4 from '../Assets/KING X elegance.jpeg'
import regent from '../Assets/slide.jpeg'
import Sovereign from '../Assets/KING X Sovereign series jersey.jpeg'
import Sovereign1 from '../Assets/Sovereign.jpeg'
import hunt from '../Assets/KING X the Hunt limited polo shirt.jpeg'
import Dynasty from '../Assets/The Dynasty Trouser.jpeg'
import Crown from '../Assets/The crown Trouser.jpeg'
import Throne from '../Assets/The throne trouser.jpeg'
import Beanie from '../Assets/The revelation Beanie.jpeg'
import wrapped from '../Assets/The wrapped King Tee.jpeg'
import Tracksuitted7 from '../Assets/KING X Zip up+ side pocket pants 2.jpeg'
import Tracksuitted8 from '../Assets/KING X Zip up+ side pocket pants.jpeg'

export const products = [
  // {
  //   id: 1,
  //   name: 'blindfolded king Tee',
  //   category: 'shirt',
  //   collection: 'men',
  //   price: 55000,
  //   tag: 'New',
  //   color: '#e8dfd0',
  //   image: blindfolded1,
  //   images: [
  //     blindfolded2,
  //     blindfolded,
  //   ],
  //   desc: 'a statement piece built around quiet confidence, focus, and self-belief.',
  // },
  {
    id: 2,
    name: 'The Ascension (Gold Beanie)',
    category: 'cap',
    collection: 'men',
    price: 25000,
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
    name: 'Sovereign track suit',
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
    name: 'Tennis wear',
    category: 'fitness',
    collection: 'women',
    price: 30000,
    tag: 'New',
    color: '#ead8cc',
    image: tenis1,
    colors: [                  
    { name: 'red', hex: '#ff0000' },
    { name: 'Black', hex: '#1a1a1a' },
  ],
    images: [
      tenis2,
      tenis1,

    ],
    desc: 'Ultra-soft cashmere knit in a boxy, elegant cut. A luxury essential for any season.',
  },
  {
    id: 5,
    name: 'KING X Zip up+ side pocket pants',
    category: 'fitness',
    collection: 'women',
    price: 30000,
    tag: 'new',
    color: '#d8d0c4',
    image: Tracksuitted6,
    images: [
      Tracksuitted5,
      Tracksuitted4,
      Tracksuitted7,
      Tracksuitted8,
    ],
    desc: 'Flowing wide-leg trousers with a high-rise waist. Effortless movement for the modern woman.',
  },
  {
    id: 6,
    name: ' KING X elegance',
    category: '2pics',
    collection: 'women',
    price: 25000,
    tag: 'new',
    color: '#d8d0c4',
    image: elegance,
    images: [
      elegance2,
      elegance3,
      elegance4
    ],
  },
  {
    id: 7,
    name: ' KING X Regent Series ',
    category: 'Jersey',
    collection: 'unisex',
    price: 45000,
    tag: 'new',
    color: '#d8d0c4',
    image: regent,
    images: [
      regent,
      regent,
    ],
  },
  {
    id: 8,
    name: ' KING X Sovereign Series ',
    category: 'Jersey',
    collection: 'unisex',
    price: 40000,
    tag: 'new',
    color: '#d8d0c4',
    image: Sovereign,
    images: [
      Sovereign1,
    ],
  },
  {
    id: 9,
    name: ' KING X Hunt Limited Polo ',
    category: 'polo',
    collection: 'unisex',
    price: 50000,
    tag: 'new',
    color: '#d8d0c4',
    image: hunt,
    images: [
      hunt,
    ],
  }, 
  {
    id: 11,
    name: ' The Dynasty Trouser ',
    category: 'trouser',
    collection: 'men',
    price: 50000,
    tag: 'new',
    color: '#d8d0c4',
    image: Dynasty,
    images: [
      Dynasty,
    ],
  },
  {
    id: 12,
    name: ' The Crown Trouser ',
    category: 'trouser',
    collection: 'men',
    price: 50000,
    tag: 'new',
    color: '#d8d0c4',
    image: Crown,
    images: [
      Crown,
    ],
  },
  {
    id: 13,
    name: ' The revelation Beanie ',
    category: 'cap',
    collection: 'unisex',
    price: 20000,
    tag: 'new',
    color: '#d8d0c4',
    image: Beanie,
    images: [
      Beanie,
    ],
  },
  {
    id: 13,
    name: ' The Throne trouser ',
    category: 'trouser',
    collection: 'men',
    price: 50000,
    tag: 'new',
    color: '#d8d0c4',
    image: Throne,
    images: [
      Throne,
    ],
  },
  {
    id: 14,
    name: ' The Wrapped King Tee ',
    category: 'polo',
    collection: 'men',
    price: 40000,
    tag: 'new',
    color: '#d8d0c4',
    image: wrapped,
    images: [
      wrapped,
      blindfolded2,
      blindfolded1,
      blindfolded
    ],
  },
  //   {
  //   id: 15,
  //   name: ' The Wrapped King Tee ',
  //   category: 'polo',
  //   collection: 'men',
  //   price: 40000,
  //   tag: 'new',
  //   color: '#d8d0c4',
  //   image: wrapped,
  //   images: [
  //     wrapped,
  //   ],
  // },
  
  // {
  //   id: 6,
  //   name: 'Evening Blazer',
  //   category: 'Outerwear',
  //   collection: 'women',
  //   price: 52000,
  //   tag: 'Limited',
  //   color: '#c8bfb4',
  //   image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&q=80',
  //   images: [
  //     'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80',
  //     'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
  //     'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80',
  //   ],
  //   desc: 'A statement evening blazer with gold-tone button detailing. Structured and sophisticated.',
  // },
  // {
  //   id: 7,
  //   name: 'Merino Crewneck',
  //   category: 'Tops',
  //   collection: 'men',
  //   price: 22000,
  //   tag: null,
  //   color: '#e0d8ce',
  //   image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&q=80',
  //   images: [
  //     'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80',
  //     'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800&q=80',
  //     'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
  //   ],
  //   desc: 'Fine merino wool crewneck. Exceptionally soft, temperature-regulating, and timeless.',
  // },
  // {
  //   id: 8,
  //   name: 'Pleated Midi Skirt',
  //   category: 'Bottoms',
  //   collection: 'women',
  //   price: 18000,
  //   tag: 'New',
  //   color: '#ddd4c6',
  //   image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80',
  //   images: [
  //     'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&q=80',
  //     'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
  //     'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
  //   ],
  //   desc: 'Elegant pleated midi skirt in a lightweight fabric. Moves beautifully, dresses up or down.',
  // },
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
    label: 'Sovereign track suit',
    desc: 'Elegant pieces for every occasion',
    bg: '#5a4a35',
    image: Tracksuitted1,
  },
];

export const heroSlides = [
  {
     tag: 'New Season · 2025',
    title: [' Regent Series ', 'KING X', 'Refined.'],
    sub: 'a statement piece built around quiet confidence, focus, and self-belief.',
    label: 'Jersey',
    image: regent, 
  },
  {
    tag: 'Exclusive Drop',
    title: ['The Ascension', 'Gold Beanie', 'Wear.'],
    sub: 'A symbol of elevation, protection, and divine strength.',
    label: 'Tailored cap',
    image: Ascension1,
  },
  
  {
    tag: 'New Season · 2025',
    title: ['blindfolded', 'king tee', 'Refined.'],
    sub: 'a statement piece built around quiet confidence, focus, and self-belief.',
    label: 'Shirt',
    image: blindfolded1,
  },
  {
    tag: 'Limited Edition',
    title: ['KING X Sovereign ', 'Tracksuitted', 'Intention.'],
    sub: 'Each piece a quiet statement. Each fabric a considered choice.',
    label: 'Silk Blend Shirt',
    image: Tracksuitted2,
  },
];

export const sizes = ['L', 'XL', 'XXL'];
