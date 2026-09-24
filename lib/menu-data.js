// Placeholder menu data. Swap freely — nothing else in the app depends on
// these exact names, only on category slugs matching route params.

export const categories = [
  { slug: 'hot-drinks', name: 'Hot Drinks', icon: 'Coffee' },
  { slug: 'cold-drinks', name: 'Cold Drinks', icon: 'CupSoda' },
  { slug: 'appetizers', name: 'Appetizers', icon: 'UtensilsCrossed' },
];

export const items = [
  { id: 'espresso', category: 'hot-drinks', name: 'Espresso', price: 3.0, icon: 'Coffee' },
  { id: 'cappuccino', category: 'hot-drinks', name: 'Cappuccino', price: 4.0, icon: 'Coffee' },
  { id: 'cafe-latte', category: 'hot-drinks', name: 'Cafe Latte', price: 4.5, icon: 'Coffee' },
  { id: 'hot-chocolate', category: 'hot-drinks', name: 'Hot Chocolate', price: 4.0, icon: 'Milk' },
  { id: 'green-tea', category: 'hot-drinks', name: 'Green Tea', price: 3.5, icon: 'Leaf' },

  { id: 'iced-latte', category: 'cold-drinks', name: 'Iced Latte', price: 4.5, icon: 'CupSoda' },
  { id: 'lemonade', category: 'cold-drinks', name: 'Fresh Lemonade', price: 3.5, icon: 'GlassWater' },
  { id: 'iced-tea', category: 'cold-drinks', name: 'Iced Tea', price: 3.5, icon: 'CupSoda' },
  { id: 'milkshake', category: 'cold-drinks', name: 'Milkshake', price: 5.0, icon: 'IceCreamCone' },
  { id: 'sparkling-water', category: 'cold-drinks', name: 'Sparkling Water', price: 2.5, icon: 'GlassWater' },

  { id: 'bruschetta', category: 'appetizers', name: 'Bruschetta', price: 6.0, icon: 'Sandwich' },
  { id: 'garlic-bread', category: 'appetizers', name: 'Garlic Bread', price: 4.5, icon: 'Sandwich' },
  { id: 'caesar-salad', category: 'appetizers', name: 'Caesar Salad', price: 7.0, icon: 'Salad' },
  { id: 'soup-of-day', category: 'appetizers', name: 'Soup of the Day', price: 5.5, icon: 'Soup' },
  { id: 'loaded-fries', category: 'appetizers', name: 'Loaded Fries', price: 6.5, icon: 'UtensilsCrossed' },
];

const highlyRatedIds = ['cappuccino', 'iced-latte', 'bruschetta', 'caesar-salad', 'milkshake', 'garlic-bread'];

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}

export function getItemsByCategory(slug) {
  return items.filter((i) => i.category === slug);
}

export function getHighlyRated() {
  return highlyRatedIds.map((id) => items.find((i) => i.id === id)).filter(Boolean);
}

export function getItem(id) {
  return items.find((i) => i.id === id);
}
