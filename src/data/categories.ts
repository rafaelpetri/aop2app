export type Category = {
  id: string;
  name: string;
  icon: string; // Ionicons or MaterialCommunityIcons names
};

export const categories: Category[] = [
  { id: '1', name: 'Lanches', icon: 'fast-food' },
  { id: '2', name: 'Combos', icon: 'restaurant' },
  { id: '3', name: 'Bebidas', icon: 'beer' },
  { id: '4', name: 'Sobremesas', icon: 'ice-cream' },
  { id: '5', name: 'Promoções', icon: 'pricetag' },
];