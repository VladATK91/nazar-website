import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Flame } from 'lucide-react'
import { IMAGES } from '../assets/images'

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Badge helpers ─── */
function Badge({ label, type }) {
  const styles = {
    V: 'border-emerald-700/50 text-emerald-500',
    VG: 'border-emerald-700/50 text-emerald-400',
    GF: 'border-amber-700/50 text-amber-500',
    N: 'border-red-800/50 text-red-400',
    CHEF: 'border-gold-border text-gold',
    SIG: 'border-gold/50 text-gold bg-gold-muted',
  }
  return (
    <span className={`text-[0.55rem] font-sans font-semibold border px-1.5 py-0.5 tracking-wider ${styles[type] || styles.V}`}>
      {label}
    </span>
  )
}

function MenuItem({ name, description, price, tags = [], chef, signature }) {
  return (
    <div className="flex justify-between gap-4 py-4 border-b border-gold-border last:border-0 group hover:bg-white/[0.01] transition-colors -mx-1 px-1">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-display text-ink text-lg font-light leading-tight">{name}</span>
          {signature && <Badge label="Signature" type="SIG" />}
          {chef && <Badge label="Chef's Special" type="CHEF" />}
          {tags.includes('V') && <Badge label="V" type="V" />}
          {tags.includes('VG') && <Badge label="VG" type="VG" />}
          {tags.includes('GF') && <Badge label="GF" type="GF" />}
          {tags.includes('N') && <Badge label="N" type="N" />}
        </div>
        {description && (
          <p className="text-ink-muted text-xs font-sans font-light leading-relaxed">{description}</p>
        )}
      </div>
      {price && (
        <span className="font-display text-gold text-lg font-light shrink-0 ml-4">
          {typeof price === 'object' ? (
            <span className="text-sm">{price.small && `${price.small}`}{price.large && ` / ${price.large}`}</span>
          ) : `£${price}`}
        </span>
      )}
    </div>
  )
}

function MenuSection({ title, subtitle, items }) {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h3 className="font-display text-gold text-2xl font-light mb-1">{title}</h3>
        {subtitle && <p className="text-ink-muted text-xs font-sans">{subtitle}</p>}
        <div className="gold-line mt-3" />
      </div>
      <div>
        {items.map((item, i) => (
          <MenuItem key={i} {...item} />
        ))}
      </div>
    </div>
  )
}

/* ─── MENU DATA ─── */
const tabs = [
  { id: 'food', label: 'À La Carte' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'kids', label: 'Kids' },
  { id: 'private', label: 'Private Dining' },
]

const foodSections = [
  {
    title: 'Mezze — Starters',
    subtitle: 'All mezze dishes include warm Turkish bread brushed with marinated herb butter',
    items: [
      { name: 'Mix Olives', description: 'Marinated mix olives with herbs and spices', price: '4.9', tags: ['V', 'VG', 'GF'] },
      { name: 'Cacik', description: 'Hung yoghurt mixed with diced cucumber, a touch of garlic and mint', price: '5.9', tags: ['V', 'GF'] },
      { name: 'Hummus', description: 'Purée of chickpeas blended with tahini, lemon juice, herbs and a gentle hint of garlic', price: '6.9', tags: ['V', 'VG', 'GF', 'N'] },
      { name: 'Saksuka', description: 'Aubergine, peppers and onions gently baked with herbs, a touch of garlic, and olive oil, finished with fresh dill', price: '5.9', tags: ['V', 'VG', 'GF'] },
      { name: 'Baba Ganoush', description: 'Purée of grilled aubergines blended with tahini, hung yoghurt, herbs, and a gentle hint of garlic', price: '6.9', tags: ['V', 'GF', 'N'] },
      { name: 'Beyaz Peynir', description: 'Creamy, tangy traditional feta cheese', price: '6.9', tags: ['V', 'GF'] },
      { name: 'Selection of Mezze', description: 'A curated assortment of five mezze, recommended by our head chef', price: '17.9', tags: [] },
      { name: 'Garlic King Prawns', description: 'Succulent king prawns sautéed with mixed peppers in rich garlic and homemade tomato sauce', price: '9.5', tags: ['GF'] },
      { name: 'Calamari', description: 'Lightly coated squid, fried until golden. Served with tartar sauce', price: '8.9', tags: [] },
      { name: 'Sautéed Lamb Liver', description: 'Tender lamb liver, lightly coated in flour, sautéed with garlic and herbs for a rich, savoury finish. Served with red onion salad', price: '9.5', tags: [] },
      { name: 'Hummus Kavurma', description: 'Sizzling lamb pieces, pan-fried with aromatic herbs and spices, served on homemade hummus', price: '9.9', tags: ['GF', 'N'] },
      { name: 'Sigara Börek', description: 'Crispy hand-rolled filo pastries filled with feta and spinach. Served with sweet chilli sauce', price: '8.5', tags: ['V'] },
      { name: 'Boneless Chicken Wings', description: 'Golden fried boneless chicken wings in crunchy breadcrumbs, coated in sweet chilli sauce', price: '8.9', tags: [] },
      { name: 'Creamy Garlic Mushrooms', description: 'Sautéed mushrooms in garlic butter and double cream, topped with melted cheddar, parmesan and fresh parsley', price: '8.9', tags: ['GF'] },
      { name: 'Halloumi Fries', description: 'Golden and crisp halloumi fries. Served with sweet chilli', price: '8.5', tags: ['V'] },
      { name: 'Sucuk & Halloumi', description: 'Grilled halloumi and spicy Turkish sausage. Served with a salad garnish', price: '8.5', tags: ['GF'] },
      { name: 'Falafel', description: 'Golden Mediterranean-style falafel from chickpeas and broad beans, seasoned with herbs and spices. Served with hummus', price: '8.5', tags: ['V', 'VG', 'N'] },
      { name: 'İçli Köfte', description: 'Stuffed fine bulgur with minced lamb, minced onions, dressed with red butter sauce. Served with yoghurt and pickles', price: '12.9', tags: [], chef: true, signature: true },
      { name: 'Mini Lahmacun', description: 'Freshly baked Turkish flatbread topped with seasoned minced lamb, tomatoes, onions, peppers and a hint of garlic', price: '7.9', tags: [] },
      { name: 'Mixed Hot Mezze', description: 'Calamari, sucuk, falafel, halloumi, sigara börek', price: '22.9', tags: [] },
    ]
  },
  {
    title: 'Charcoal Grill',
    subtitle: 'All charcoal-grilled dishes can be served without flatbread on request. Swap rice for chips £1.90',
    items: [
      { name: 'Chicken Shish', description: 'Charcoal-grilled marinated chicken breast, tender and juicy', price: { small: '£17.90', large: '£22.90' }, tags: [] },
      { name: 'Lamb Shish', description: 'Charcoal-grilled prime lamb cubes, succulently marinated with our unique blend of spices', price: { small: '£19.90', large: '£23.90' }, tags: [] },
      { name: 'Adana Kebab', description: 'Hand-seasoned minced lamb skewer with bold Anatolian flavour', price: { small: '£17.90', large: '£22.90' }, tags: [] },
      { name: 'Chicken Wings', description: 'Charcoal-grilled wings, smoky and full of flavour', price: '17.9', tags: [] },
      { name: 'Lamb Ribs', description: 'Succulent lamb ribs, slow-grilled and charcoal-finished to perfection', price: '24.9', tags: [] },
      { name: 'Lamb Chops', description: 'Finest cut lamb chops cooked on charcoal, seasoned with our unique blend of spices', price: '26.9', tags: [], chef: true },
      { name: 'Beyti', description: 'A charcoal-grilled minced kebab inspired by Adana. Choose from Chicken / Lamb / Adana', price: '21.9', tags: [] },
      { name: 'Chops & Ribs', description: 'A generous combination of lamb chops and ribs, cooked on charcoal', price: '26.9', tags: [] },
      { name: 'Mix Shish', description: 'A tender selection of chicken and lamb skewers, cooked on charcoal. Choose from Chicken / Lamb', price: { small: '£23.90', large: '' }, tags: [] },
      { name: 'Mixed Grill', description: 'Chicken shish, lamb shish and Adana kebab, cooked on charcoal', price: '25.9', tags: [], signature: true },
      { name: 'Chicken Feast', description: 'Chicken shish, chicken wings and chicken beyti', price: '25.9', tags: [] },
      { name: 'Sarma Beyti', description: 'Your choice of tender chicken with melted cheese, or perfectly chargrilled lamb, wrapped in warm flatbread on creamy hung yoghurt with signature sauce and sizzling hot butter', price: '23.9', tags: [] },
      { name: 'Iskender Kebab', description: 'Sliced grilled meat on diced bread layered with hung yoghurt and signature sauce with sizzling hot butter. Choose Chicken / Lamb', price: '23.9', tags: [] },
      { name: 'Ali Nazik', description: 'Lean, tender meat cubes served on baba ganoush, finished with sizzling melted butter. Served with salad', price: '22.9', tags: [] },
      { name: 'İçli Köfte', description: 'Stuffed fine bulgur with minced lamb, minced onions, dressed with red butter sauce. Served with yoghurt and pickles', price: '21.9', tags: [], signature: true },
      { name: 'The Nazar Feast', description: 'The ultimate charcoal sharing platter — lamb shish, chicken shish, ×8 lamb ribs, ×12 chicken wings, chicken beyti, lamb beyti. Served with rice, salad and steakhouse chips', price: '110', tags: [] },
    ]
  },
  {
    title: 'Oven Specials',
    subtitle: '',
    items: [
      { name: 'Casserole', description: 'Slow oven-cooked chicken or lamb with seasonal vegetables, finished in homemade tomato sauce with aromatic herbs and spices. Choose Chicken or Lamb', price: '19.9', tags: ['GF'] },
      { name: 'Meat Moussaka', description: 'A classic baked dish of seasonal vegetables and minced lamb, finished with tomato sauce, béchamel and melted cheese. Served with rice and salad', price: '19.9', tags: ['GF'] },
      { name: 'Kleftiko', description: 'Tender lamb shank, slow oven cooked on the bone with seasonal vegetables in its own rich gravy. Served over creamy mashed potato', price: '21.9', tags: ['GF'] },
    ]
  },
  {
    title: 'Burgers',
    subtitle: 'All served with chips',
    items: [
      { name: 'Angus Burger', description: 'Juicy Angus beef patty topped with melted cheddar, red onion marmalade, crisp lettuce, fresh tomato and burger sauce', price: '17.9', tags: [] },
      { name: 'Peri Peri Chicken Burger', description: 'Grilled peri peri chicken breast with crisp lettuce, fresh tomato, crispy fried onions and mayonnaise', price: '16.9', tags: [] },
      { name: 'Falafel & Halloumi Burger', description: 'Golden falafel and grilled halloumi with crisp lettuce, fresh tomato, pickled cucumber, onion rings and mayonnaise', price: '16.9', tags: ['V'] },
    ]
  },
  {
    title: 'Pasta',
    subtitle: '',
    items: [
      { name: 'Penne Arrabiata', description: 'Penne pasta in authentic tomato sauce with chilli flakes, finished with parmesan', price: '17.5', tags: ['V'] },
      { name: 'Linguine Bolognese', description: 'Linguine in a rich beef bolognese sauce, finished with parmesan shavings', price: '18.5', tags: [] },
      { name: 'Spicy Chicken Pasta', description: 'Chicken, garlic butter, mixed peppers, white wine sauce. Choose from creamy or rich pasta sauce', price: '18.9', tags: [], chef: true },
      { name: 'Mushroom Tagliatelle', description: 'Fresh tagliatelle tossed in a creamy white mushroom sauce, finished with parmesan', price: '15.9', tags: ['V'] },
    ]
  },
  {
    title: 'Vegetarian',
    subtitle: '',
    items: [
      { name: 'Vegetarian Moussaka', description: 'Layers of aubergine, potato and courgette, topped with béchamel sauce, mozzarella and cheddar. Served with rice', price: '18.9', tags: ['GF', 'V'] },
      { name: 'Falafel', description: 'Crispy Mediterranean-style chickpea and broad bean patties. Served with hummus, rice and salad', price: '17.9', tags: ['V', 'N'] },
      { name: 'Vegetarian Kebab', description: 'Charcoal-grilled mushrooms, aubergine, onion, courgette and mixed peppers with halloumi and tomato sauce. Served with rice and salad', price: '20.9', tags: ['GF', 'V'] },
    ]
  },
  {
    title: 'Fish',
    subtitle: '',
    items: [
      { name: 'Grilled Salmon', description: 'Grilled salmon with mashed potato and vegetables', price: '21.9', tags: ['GF'] },
      { name: 'Grilled Sea Bass', description: 'Grilled sea bass with mashed potato and vegetables', price: '21.9', tags: ['GF'] },
      { name: 'Prawns Güveç', description: 'Succulent king prawns cooked with mixed peppers in a rich garlic and homemade tomato sauce. Served with rice', price: '20.9', tags: ['GF'] },
    ]
  },
  {
    title: 'Salads',
    subtitle: '',
    items: [
      { name: 'Nazar Salad', description: 'Mint, tomato, cucumber, spring onion and avocado, finished with sumac, olive oil and pomegranate dressing', price: '8.9', tags: ['V'] },
      { name: 'Mozzarella Salad', description: 'Fresh mozzarella with Mediterranean leaves, wild rocket, cherry tomatoes, dressed with olive oil and lemon. Add grilled chicken +£2.50', price: '10.9', tags: ['V', 'GF'] },
      { name: "Shepherd's Salad", description: 'Chopped seasonal vegetables with pomegranate and feta cheese dressing. Add grilled chicken +£2.50', price: '9.9', tags: ['V', 'GF'] },
    ]
  },
  {
    title: 'Sides',
    subtitle: '',
    items: [
      { name: 'Rice', price: '2.9', tags: ['V', 'GF'] },
      { name: 'Mashed Potato', price: '3.9', tags: ['V', 'GF'] },
      { name: 'Steakhouse Chips', price: '4.9', tags: ['V', 'GF'] },
      { name: 'Turkish Bread', price: '2.9', tags: ['V'] },
    ]
  },
]

const drinksSections = [
  {
    title: 'Cocktails',
    subtitle: '',
    items: [
      { name: 'Piña Colada', description: 'Smooth rum, sweet Malibu, cream, and pineapple juice, finished with simple syrup', price: '12.5' },
      { name: 'Rum Punch', description: 'Dark rum, orange juice, lime juice, sugar syrup, grenadine syrup, Angostura bitters', price: '12.5' },
      { name: 'Mojito', description: 'Strawberry / Raspberry / Passion fruit. White rum, fresh lime juice, muddled mint, simple syrup, topped with soda', price: '12.5' },
      { name: 'Long Island Iced Tea', description: 'Vodka, gin, tequila, triple sec, and white rum, shaken with fresh lime and simple syrup, topped with coke', price: '13.5' },
      { name: 'Pornstar Martini', description: 'Vanilla vodka, exotic Passoa, passion fruit purée and simple syrup, served with a chilled shot of prosecco', price: '13.5' },
      { name: 'Espresso Martini / Hazelnut', description: 'Vanilla vodka, Kahlúa, fresh espresso, and simple syrup. Add hazelnut syrup for the Hazelnut Martini', price: '12.5' },
      { name: 'Aperol Spritz', description: 'Refreshing Aperol, fresh orange, touch of soda water, topped with chilled prosecco', price: '12.5' },
      { name: 'Frozen Strawberry Daiquiri', description: 'Rum, fresh strawberries, strawberry purée, strawberry syrup, and lime juice', price: '12.5' },
    ]
  },
  {
    title: 'Mocktails',
    subtitle: '',
    items: [
      { name: 'Frozen Piña Colada', description: 'Cream, pineapple juice, and crushed ice', price: '6.9' },
      { name: 'Frozen Daiquiri', description: 'Lime / Strawberry / Raspberry. Sweet purée, fresh lime, sugar, topped with soda water', price: '6.9' },
      { name: 'Mojito', description: 'Lime / Strawberry / Raspberry. Muddled mint, fresh lime, and sugar, topped with soda water', price: '6.9' },
      { name: 'Nazar Special', description: 'Fresh berries, orange juice, mango juice, pineapple juice and grenadine', price: '6.9' },
    ]
  },
  {
    title: 'Red Wine',
    subtitle: '175ml / 250ml / Bottle',
    items: [
      { name: 'House Red', price: { small: '£6.90 / £8.00', large: '£19.90' } },
      { name: 'Umbrele Pinot Noir, Romania', description: 'Soft, welcoming autumn fruits with generous soft fruit flavours', price: { small: '£8.50', large: '£20.90' } },
      { name: 'Murphy Vineyards Shiraz, Australia', description: 'Cherry red with hints of dark plum and chocolate. Seamlessly balanced with sweet lifted fruit', price: { small: '£8.90', large: '£24.90' } },
      { name: 'El Chivo Merlot, Chile', description: 'Bright cherry, raspberry, and plum with light spice. Smooth, medium-bodied with a clean, rounded finish', price: { small: '£8.90', large: '£24.90' } },
      { name: 'Kavaklidere Ancyra Öküzgözü, Turkey', description: 'Easy drinking, fruity and refreshing. Full of plum, red cherry and mild spicy notes', price: { small: '£8.50 / £9.90', large: '£29.00' } },
      { name: 'El Supremo Malbec, Mendoza', description: 'Packed with blueberry, blackcurrant and plum with a complex, delicious finish', price: { small: '£9.90', large: '£27.90' } },
      { name: 'Primitivo Miopasso, Puglia', description: 'Ripe dark berries with warming notes of vanilla, herbs, and gentle spice. Velvety tannins', price: { small: '£9.90', large: '£27.90' } },
      { name: 'Doluca Sarafin Cabernet Sauvignon, Turkey', description: 'Bold, structured with powerful tannins. Defined blackcurrant, cedar, tobacco and pepper notes', price: { large: '£40.00' } },
    ]
  },
  {
    title: 'White Wine',
    subtitle: '175ml / 250ml / Bottle',
    items: [
      { name: 'House White', price: { small: '£7.00 / £7.50', large: '£19.90' } },
      { name: 'Cette Nuit Sauvignon Blanc, France', description: 'Bright citrus, vibrant apple fruit flavours and a zesty twang', price: { small: '£8.50', large: '£20.90' } },
      { name: 'Pinot Grigio Bella Modella, Italy', description: 'Light and vibrant with zesty citrus, notes of green apple, pineapple and refreshing acidity', price: { small: '£8.50', large: '£22.90' } },
      { name: 'Aloe Tree Chenin Blanc, South Africa', description: 'Aromas of apples and guava with fresh acidity. Modern style from Swartland', price: { small: '£8.50', large: '£23.90' } },
      { name: 'Vilacetinho Vinho Verde, Portugal', description: 'Fabulously fresh citrussy wine with aromas of orchard fruit and subtle tropical hints', price: { small: '£9.50', large: '£26.90' } },
      { name: 'Sauvignon Blanc, New Zealand', description: 'Mouth-watering, ripe tropical fruit with a twist of crisp citrus from Marlborough', price: { small: '£10.50', large: '£28.90' } },
      { name: 'Kavaklidere Ancyra, Turkey', description: 'Dry white with lively aromas of green apple, lime, and fresh pear. Crisp acidity and minerality', price: { small: '£7.00 / £9.50', large: '£29.00' } },
    ]
  },
  {
    title: 'Rosé & Sparkling',
    subtitle: '',
    items: [
      { name: 'House Rosé', price: { small: '£7.00 / £8.00', large: '£19.90' } },
      { name: 'Pinot Grigio Blush Bella Modella, Italy', description: 'Fresh raspberries and wild strawberries. Crisp, light and fragrant', price: { small: '£8.50', large: '£21.90' } },
      { name: 'Jules Cotes de Provence Rosé, France', description: 'Refined aromas of white peach and citrus with a well-balanced, rounded palate', price: { small: '£12.00', large: '£34.00' } },
      { name: 'Contarini Prosecco Brut NV', description: 'Easy drinking, refreshing with apple and pear on the nose', price: { large: '£28.00' } },
      { name: 'Autreau-Roualet Brut NV Champagne', description: 'Refined with aromas of white peach and citrus. Fruity and crunchy with great length', price: { large: '£59.90' } },
      { name: 'Moët & Chandon Brut Impérial', description: 'Predominantly Pinot characteristics. The world\'s most celebrated champagne', price: { large: '£89.00' } },
      { name: 'Laurent-Perrier Rosé Brut', description: '100% Pinot Noir. Glorious pink with rounded red fruit flavours. Limited availability', price: { large: '£125.00' } },
    ]
  },
  {
    title: 'Spirits & Raki',
    subtitle: '25ml / 50ml',
    items: [
      { name: 'Raki — Tekirdag Gold Series', description: 'The signature Turkish spirit', price: { small: '£8.00 / 350ml £45', large: '700ml £75' } },
      { name: 'Hendricks Gin', price: { large: '£8.50' } },
      { name: 'Brockmans Gin', price: { large: '£9.00' } },
      { name: 'Bombay Sapphire', price: { large: '£8.50' } },
      { name: 'Grey Goose Vodka', price: { small: '£5.90', large: '£9.00' } },
      { name: 'Ciroc Vodka', price: { small: '£5.90', large: '£9.00' } },
      { name: 'Woodford Reserve', price: { small: '£5.90', large: '£9.50' } },
      { name: 'Jack Daniel\'s', price: { small: '£5.50', large: '£8.50' } },
      { name: 'Jameson', price: { small: '£5.50', large: '£8.50' } },
      { name: 'Hennessy Cognac', price: { small: '£8.50', large: '£10.50' } },
    ]
  },
  {
    title: 'Beers & Ciders',
    subtitle: '',
    items: [
      { name: 'Efes 4.8%', description: 'Turkish lager — half pint or bottle', price: { small: '£5.00', large: '£7.50' } },
      { name: 'Peroni Nastro 5%', description: 'Italian lager — half pint or bottle', price: { small: '£5.00', large: '£7.50' } },
      { name: 'Asahi 5%', description: '33cl bottle', price: '5' },
      { name: 'Peroni 0.0%', description: '33cl — alcohol free', price: '5' },
      { name: 'Kopparberg Strawberry & Lime 4%', description: '500ml', price: '6' },
      { name: 'Magners Original 4.5%', description: '568ml', price: '6' },
    ]
  },
  {
    title: 'Soft Drinks & Hot Drinks',
    subtitle: '',
    items: [
      { name: 'Turkish Coffee', price: '4' },
      { name: 'Americano', price: '4' },
      { name: 'Café Latte / Flat White / Cappuccino', price: '4' },
      { name: 'English Breakfast Tea', price: '3' },
      { name: 'Fresh Mint / Chamomile / Earl Grey', price: '3.5' },
      { name: 'Espresso', price: '3' },
      { name: 'Coke / Diet / Zero — glass', price: '3.9' },
      { name: 'Ayran', description: 'Traditional Turkish yoghurt drink', price: '3' },
      { name: 'Şalgam', description: 'Turnip water — a Turkish classic', price: '3' },
      { name: 'Still / Sparkling Water 330ml', price: '2.5' },
      { name: 'Still / Sparkling Water 750ml', price: '4.9' },
    ]
  },
]

const dessertSections = [
  {
    title: 'Desserts',
    subtitle: '',
    items: [
      { name: 'Baklava', description: 'Golden brown filo dough with a thick middle layer of crushed pistachio nuts, topped with syrup and a sprinkle of pistachios. Served with ice cream', price: '8.9', tags: ['N'] },
      { name: 'Pistachio Cake', description: 'Dense and moist pistachio flavoured sponge with pistachio crème pâtissière cream filling', price: '8.9', tags: ['N'] },
      { name: 'Red Velvet Cake', description: 'A red velvet sponge layered with cream cheese filling', price: '8.9', tags: [] },
      { name: 'Carrot Cake', description: 'Moist carrot cake sponge with crushed walnuts, diced pineapple and butter cream cheese filling', price: '8.9', tags: ['N'] },
      { name: 'Hazelnut Cake', description: 'Light chocolate sponge, fresh cream and chocolate flavoured cream, roasted crushed hazelnuts and gianduja filling', price: '8.9', tags: ['N'] },
      { name: 'Ice Cream', description: 'Luxury double chocolate / Madagascan vanilla / Strawberries & cream — 3 scoops', price: '6.9', tags: [] },
    ]
  },
  {
    title: 'After-Dinner Drinks',
    subtitle: '',
    items: [
      { name: 'Irish Coffee', price: '7.9' },
      { name: 'Tia Maria Coffee', price: '5.5' },
      { name: 'Brandy Coffee', price: '6.5' },
      { name: 'Baileys Coffee', price: '7.5' },
      { name: 'Turkish Coffee', price: '3.5' },
      { name: 'Sambuca / Limoncello / Baileys / Disaronno', description: '50ml', price: '6.5' },
      { name: 'Jägermeister / B52', description: '50ml', price: '6.5' },
    ]
  },
]

const kidsSections = [
  {
    title: 'Kids Menu — 2 Courses + Drink',
    subtitle: '£9.90 per child · All mains served with garnish and chips',
    items: [
      { name: 'Fish Fingers', description: 'Gluten-free option available', tags: [] },
      { name: 'Chicken Shish', description: 'Tender marinated grilled chicken', tags: [] },
      { name: 'Chicken Wings', tags: [] },
      { name: 'Chicken Nuggets', tags: [] },
    ]
  },
  {
    title: 'Included',
    subtitle: '',
    items: [
      { name: 'Drink', description: 'Choice of blackcurrant or orange juice', tags: [] },
      { name: 'Dessert', description: 'Ice cream — choice of vanilla, chocolate or strawberry', tags: [] },
    ]
  },
]

const privateSections = [
  {
    title: 'Private Dining Set Menu',
    subtitle: '3 courses · £59 per person',
    items: []
  },
  {
    title: 'Starters — Choose one',
    subtitle: '',
    items: [
      { name: 'Hummus', description: 'Chickpea purée with tahini, lemon juice, olive oil and garlic', tags: ['V', 'VG'] },
      { name: 'Garlic Prawns', description: 'Prawns cooked with tomato sauce, garlic, red and green peppers' },
      { name: 'Butterfly King Prawns', description: 'Deep fried king prawns served with garnish and sweet chilli sauce', tags: ['GF'] },
      { name: 'Sucuk & Halloumi', description: 'Grilled halloumi cheese with Turkish spicy sausage' },
    ]
  },
  {
    title: 'Main Course — Choose one',
    subtitle: '',
    items: [
      { name: 'Ali Nazik', description: 'Tender chunks of meat grilled over charcoal, on a layer of yoghurt and smoked mixed peppers and aubergine. Served with rice and salad' },
      { name: 'Kleftiko', description: 'Oven cooked lamb shank with vegetables and tomato sauce. Served with mashed potato and salad' },
      { name: 'Mixed Grill', description: 'Adana skewer, a chicken skewer and a lamb skewer', tags: ['GF'] },
      { name: 'Vegetarian Moussaka', description: 'Layers of aubergine with courgette, red and green peppers baked in the oven. Served with rice and salad', tags: ['V'] },
    ]
  },
  {
    title: 'Dessert — Choose one',
    subtitle: '',
    items: [
      { name: 'Baklava', description: 'Golden brown filo dough with crushed pistachio, topped with syrup. Served with ice cream', tags: ['N'] },
      { name: 'Pistachio Cake', description: 'Dense and moist pistachio sponge with pistachio crème pâtissière', tags: ['N'] },
      { name: 'Red Velvet Cake', description: 'Red velvet sponge layered with cream cheese filling' },
      { name: 'Carrot Cake', description: 'Moist carrot cake with crushed walnuts, diced pineapple and butter cream cheese filling', tags: ['N'] },
      { name: 'Hazelnut Cake', description: 'Chocolate sponge, fresh cream, roasted crushed hazelnuts and gianduja filling', tags: ['N'] },
      { name: 'Ice Cream', description: 'Luxury double chocolate / Madagascan vanilla / Strawberries & cream — 3 scoops' },
    ]
  },
]

const menuData = {
  food: foodSections,
  drinks: drinksSections,
  desserts: dessertSections,
  kids: kidsSections,
  private: privateSections,
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('food')

  return (
    <main>
      {/* ── Page Header ── */}
      <section className="relative page-header-pt pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.adana}
            alt="Nazar menu"
            className="w-full h-full object-cover opacity-12"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 to-[#0A0A0A]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="label-gold mb-4">Bedford · Turkish Kitchen + Bar</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="heading-xl text-gold-gradient mb-4">Our Menu</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-ink-muted font-sans font-light max-w-lg leading-relaxed">
              Every dish prepared fresh daily from the finest ingredients. Halal certified. All major allergens handled — please speak to our team before ordering.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex items-center gap-4 mt-4 text-xs font-sans text-ink-muted">
              <span className="flex items-center gap-1.5"><span className="text-emerald-500 border border-emerald-700/50 px-1.5 py-0.5 text-[0.55rem] font-semibold tracking-wider">V</span> Vegetarian</span>
              <span className="flex items-center gap-1.5"><span className="text-emerald-400 border border-emerald-700/50 px-1.5 py-0.5 text-[0.55rem] font-semibold tracking-wider">VG</span> Vegan</span>
              <span className="flex items-center gap-1.5"><span className="text-amber-500 border border-amber-700/50 px-1.5 py-0.5 text-[0.55rem] font-semibold tracking-wider">GF</span> Gluten Free</span>
              <span className="flex items-center gap-1.5"><span className="text-red-400 border border-red-800/50 px-1.5 py-0.5 text-[0.55rem] font-semibold tracking-wider">N</span> Contains Nuts</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Tab Navigation ── */}
      <section className="sticky top-20 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-gold-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex overflow-x-auto gap-0 py-4" style={{ scrollbarWidth: 'none' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`menu-tab shrink-0 ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Menu Content ── */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === 'private' && (
                <div className="mb-12 p-8 border border-gold-border bg-gold-muted">
                  <p className="label-gold mb-2">Private Dining</p>
                  <h2 className="font-display text-gold text-3xl font-light mb-3">Set Menu · £59 per person</h2>
                  <p className="text-ink-muted font-sans font-light text-sm leading-relaxed max-w-2xl">
                    Our private dining set menu is designed for special occasions and group bookings. Three courses with a curated selection of our finest dishes. Enquire via our Reservations page to discuss bespoke options. A 10% service charge will be added to your bill.
                  </p>
                </div>
              )}

              <div className="grid lg:grid-cols-2 gap-x-16">
                {menuData[activeTab].map((section, i) => (
                  <div key={i} className={section.items.length === 0 ? 'lg:col-span-2' : ''}>
                    <MenuSection {...section} />
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gold-border">
                <p className="text-ink-faint text-xs font-sans leading-relaxed">
                  A 10% discretionary service charge will be added to your bill. All prices include VAT. Items are subject to availability.
                  For food allergies or intolerances, please speak to a member of our team before ordering. Our kitchen handles all 14 major allergens.
                  All meats are Halal certified. To maintain service quality, we kindly ask each guest to order a main meal.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}
