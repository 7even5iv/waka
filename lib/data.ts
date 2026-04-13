export interface Partner {
  id: number;
  name: string;
  category: 'Restaurant' | 'Supermarché';
  city: 'douala' | 'yaounde';
  image: string;
  cover: string;
  desc: string;
  rating: number;
  deliveryTime: string;
  promo?: string;
}

export interface Product {
  id: number;
  partnerId: number;
  name: string;
  price: number;
  desc: string;
  popular?: boolean;
}

export const PARTNERS: Partner[] = [
  { 
    id: 1, 
    name: "Tchop et Yamo", 
    category: "Restaurant", 
    city: "douala", 
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400", 
    cover: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=1200", 
    desc: "Cuisine traditionnelle camerounaise", 
    rating: 4.8, 
    deliveryTime: "25-35 min", 
    promo: "Livraison offerte" 
  },
  { 
    id: 2, 
    name: "Santa Lucia", 
    category: "Supermarché", 
    city: "douala", 
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400", 
    cover: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200", 
    desc: "Prix bas garantis", 
    rating: 4.6, 
    deliveryTime: "30-40 min" 
  },
  { 
    id: 3, 
    name: "Dolly's", 
    category: "Restaurant", 
    city: "yaounde", 
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400", 
    cover: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200", 
    desc: "Burgers artisanaux", 
    rating: 4.9, 
    deliveryTime: "20-30 min", 
    promo: "Burger offert" 
  },
  { 
    id: 4, 
    name: "DOVV", 
    category: "Supermarché", 
    city: "yaounde", 
    image: "https://images.unsplash.com/photo-1518110925492-132e6117a49c?w=400", 
    cover: "https://images.unsplash.com/photo-1518110925492-132e6117a49c?w=1200", 
    desc: "Produits frais et qualité", 
    rating: 4.7, 
    deliveryTime: "25-35 min" 
  },
];

export const PRODUCTS: Product[] = [
  { id: 101, partnerId: 1, name: "BH Complet", price: 1000, desc: "Beignets, Haricots, Bouillie", popular: true },
  { id: 102, partnerId: 1, name: "Poulet DG", price: 3500, desc: "Le classique camerounais", popular: true },
  { id: 103, partnerId: 1, name: "Ndolé", price: 2800, desc: "Pistaches, crevette, boeuf", popular: true },
  { id: 104, partnerId: 1, name: "Poisson Braisé", price: 4000, desc: "Avec plantains et sauce", popular: false },
  
  { id: 201, partnerId: 2, name: "Pâtes Spaghetti", price: 850, desc: "500g", popular: true },
  { id: 202, partnerId: 2, name: "Riz Parfumé", price: 1200, desc: "1kg", popular: true },
  { id: 203, partnerId: 2, name: "Huile d'Olive", price: 2500, desc: "500ml", popular: false },
  { id: 204, partnerId: 2, name: "Lait Concentré", price: 650, desc: "Boîte 380g", popular: false },
  
  { id: 301, partnerId: 3, name: "Burger WAKA", price: 2500, desc: "Double steak, cheddar, sauce spéciale", popular: true },
  { id: 302, partnerId: 3, name: "Burger BBQ", price: 2200, desc: "Steak grillé, sauce BBQ, oignons", popular: true },
  { id: 303, partnerId: 3, name: "Chicken Burger", price: 2100, desc: "Filet de poulet pané, salade", popular: false },
  { id: 304, partnerId: 3, name: "Frites Maison", price: 800, desc: "Pommes de terre fraîches", popular: true },
  
  { id: 401, partnerId: 4, name: "Jus d'Orange", price: 450, desc: "1L", popular: true },
  { id: 402, partnerId: 4, name: "Œufs", price: 950, desc: "Douzaine", popular: true },
  { id: 403, partnerId: 4, name: "Pain de Mie", price: 550, desc: "400g", popular: false },
  { id: 404, partnerId: 4, name: "Mayonnaise", price: 380, desc: "250g", popular: false },
];