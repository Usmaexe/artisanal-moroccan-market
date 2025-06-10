import { Product } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const products: Product[] = [
  {
    id: uuidv4(),
    name: "Hand-Painted Ceramic Bowl",
    slug: "hand-painted-ceramic-bowl",
    description: "This beautiful ceramic bowl is hand-painted by skilled artisans from Fez. The intricate blue and white patterns are inspired by traditional Moroccan designs that have been passed down through generations. Each piece is unique and makes a stunning addition to any home.",
    price: 45,
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa",
      "https://images.unsplash.com/photo-1576020799627-aeac74d58064"
    ],
    category: {
      id: "cat1",
      name: "Pottery & Ceramics",
      slug: "pottery-ceramics",
      description: "Traditional Moroccan pottery and ceramic items handcrafted by skilled artisans.",
      image: "https://images.unsplash.com/photo-1519644273884-c700741eb5f4"
    },
    categoryId: "cat1",
    features: [
      "Hand-painted design",
      "Food safe glazing",
      "Traditional Moroccan patterns",
      "Dishwasher safe"
    ],
    dimensions: "Diameter: 8 inches, Height: 3 inches",
    materials: ["Clay", "Non-toxic glazes"],
    inStock: true,
    artisan: {
      id: "art1",
      name: "Hassan Berrada",
      slug: "hassan-berrada",
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115",
      bio: "Hassan has been creating traditional pottery for over 30 years, learning the craft from his father in Fez. His work is known for its intricate blue patterns and exceptional quality.",
      location: "Fez, Morocco",
      specialty: "Blue and white ceramic pottery"
    },
    artisanId: "art1",
    isFeatured: true,
    isOnSale: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    name: "Handwoven Berber Carpet",
    slug: "handwoven-berber-carpet",
    description: "This authentic Berber carpet is handwoven by women artisans in the Atlas Mountains using traditional techniques. The geometric patterns and natural wool colors reflect the Berber heritage and each carpet takes weeks to complete. This is not just a floor covering but a piece of Moroccan cultural heritage.",
    price: 299,
    images: [
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd",
      "https://images.unsplash.com/photo-1600166898405-da9535204843",
      "https://images.unsplash.com/photo-1594665646796-69b8cb6c7d69"
    ],
    category: {
      id: "cat2",
      name: "Carpets & Rugs",
      slug: "carpets-rugs",
      description: "Traditional Moroccan carpets and rugs handwoven using ancient techniques.",
      image: "https://images.unsplash.com/photo-1600166898405-da9535204843"
    },
    categoryId: "cat2",
    features: [
      "100% natural wool",
      "Hand-knotted by skilled artisans",
      "Authentic Berber design",
      "Natural dyes"
    ],
    dimensions: "6ft x 4ft (183cm x 122cm)",
    materials: ["Wool", "Cotton"],
    inStock: true,
    artisan: {
      id: "art2",
      name: "Fatima Ouazzani",
      slug: "fatima-ouazzani",
      image: "https://images.unsplash.com/photo-1594464275347-a232aee2d9bf",
      bio: "Fatima leads a women's cooperative in the Atlas Mountains where traditional carpet weaving techniques are preserved and passed to younger generations. Her designs combine traditional elements with contemporary aesthetics.",
      location: "Atlas Mountains, Morocco",
      specialty: "Berber carpet weaving"
    },
    artisanId: "art2",
    isFeatured: true,
    isOnSale: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    name: "Moroccan Leather Pouf",
    slug: "moroccan-leather-pouf",
    description: "This handcrafted leather pouf is made in Marrakech using traditional techniques. The intricate embroidery is done by hand, and the pouf is stuffed with sustainable materials. It can serve as an ottoman, extra seating, or a decorative piece in any room.",
    price: 129,
    images: [
      "https://images.unsplash.com/photo-1540638349517-3abd5afc9847",
      "https://images.unsplash.com/photo-1591130975825-6aa29858de2e",
      "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5"
    ],
    category: {
      id: "cat3",
      name: "Leather Goods",
      slug: "leather-goods",
      description: "Handcrafted Moroccan leather products including poufs, bags, and decorative items.",
      image: "https://images.unsplash.com/photo-1585532299082-a8726e36c780"
    },
    categoryId: "cat3",
    features: [
      "Handcrafted genuine leather",
      "Traditional embroidery",
      "Stuffed with sustainable materials",
      "Versatile home decor piece"
    ],
    dimensions: "Diameter: 20 inches, Height: 13 inches",
    materials: ["Genuine leather", "Cotton thread", "Sustainable filling"],
    inStock: true,
    artisan: {
      id: "art3",
      name: "Omar Khalil",
      slug: "omar-khalil",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857",
      bio: "Omar runs a family workshop in Marrakech's leather district, where they've been creating leather goods for four generations. His poufs are known for their durability and intricate designs.",
      location: "Marrakech, Morocco",
      specialty: "Leather crafting and embroidery"
    },
    artisanId: "art3",
    isFeatured: true,
    isOnSale: true,
    salePrice: 99,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    name: "Silver Berber Necklace",
    slug: "silver-berber-necklace",
    description: "This stunning silver necklace is handcrafted by Berber silversmiths using traditional techniques. The intricate designs and amber stones represent cultural symbols important to Berber heritage. Each piece is unique and carries centuries of artistic tradition.",
    price: 85,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401",
      "https://images.unsplash.com/photo-1630283056466-a35f91a26707"
    ],
    category: {
      id: "cat4",
      name: "Jewelry",
      slug: "jewelry",
      description: "Traditional Moroccan jewelry handcrafted in silver and other precious materials.",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338"
    },
    categoryId: "cat4",
    features: [
      "Handcrafted silver",
      "Natural amber stones",
      "Traditional Berber design",
      "Adjustable chain"
    ],
    dimensions: "Chain length: 18 inches",
    materials: ["Silver", "Amber"],
    inStock: true,
    artisan: {
      id: "art4",
      name: "Amina Tahiri",
      slug: "amina-tahiri",
      image: "https://images.unsplash.com/photo-1544717305-996b815c338c",
      bio: "Amina comes from a long line of Berber silversmiths and has been creating jewelry for over 20 years. Her designs blend traditional Berber symbols with contemporary aesthetics, making each piece both timeless and modern.",
      location: "Tiznit, Morocco",
      specialty: "Silver jewelry with amber and turquoise"
    },
    artisanId: "art4",
    isFeatured: true,
    isOnSale: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    name: "Moroccan Mosaic Tile Table",
    slug: "moroccan-mosaic-tile-table",
    description: "This beautiful mosaic table is handcrafted by artisans in Fez. The intricate zellige tilework follows traditional Moroccan patterns and techniques that date back centuries. The table frame is made of sturdy cedar wood, making it perfect for indoor or covered outdoor spaces.",
    price: 249,
    images: [
      "https://images.unsplash.com/photo-1561016444-14f747499547",
      "https://images.unsplash.com/photo-1580644228049-5cc99164ee71",
      "https://images.unsplash.com/photo-1592470034904-1c5e26381a55"
    ],
    category: {
      id: "cat5",
      name: "Home Decor",
      slug: "home-decor",
      description: "Authentic Moroccan home décor items including lanterns, tables, and decorative pieces.",
      image: "https://images.unsplash.com/photo-1596910891038-c2947acbb10f"
    },
    categoryId: "cat5",
    features: [
      "Authentic zellige tilework",
      "Cedar wood frame",
      "Handcrafted by master artisans",
      "Weather-resistant finish"
    ],
    dimensions: "Diameter: 24 inches, Height: 18 inches",
    materials: ["Ceramic tiles", "Cedar wood", "Waterproof grout"],
    inStock: true,
    artisan: {
      id: "art5",
      name: "Yousef Benjelloun",
      slug: "yousef-benjelloun",
      image: "https://images.unsplash.com/photo-1608137050689-b08b643ea4f4",
      bio: "Yousef is a master tile maker from Fez who has been creating zellige mosaics for over 25 years. His workshop combines traditional techniques with contemporary designs, creating pieces that honor Moroccan heritage while fitting into modern homes.",
      location: "Fez, Morocco",
      specialty: "Zellige tilework and mosaic furniture"
    },
    artisanId: "art5",
    isFeatured: false,
    isOnSale: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    name: "Hand-Painted Moroccan Teapot",
    slug: "hand-painted-moroccan-teapot",
    description: "This ornate teapot is a staple of Moroccan hospitality. Hand-crafted from brass and hand-painted with intricate designs, it's perfect for serving traditional Moroccan mint tea. The long curved spout allows tea to be poured from a height, creating a beautiful presentation.",
    price: 65,
    images: [
      "https://images.unsplash.com/photo-1577968897966-3d4325b36b61",
      "https://images.unsplash.com/photo-1590944259990-751c9ab7bdbc",
      "https://images.unsplash.com/photo-1563991655280-cb95c90ca2fb"
    ],
    category: {
      id: "cat5",
      name: "Home Decor",
      slug: "home-decor",
      description: "Authentic Moroccan home décor items including lanterns, tables, and decorative pieces.",
      image: "https://images.unsplash.com/photo-1596910891038-c2947acbb10f"
    },
    categoryId: "cat5",
    features: [
      "Hand-crafted brass",
      "Traditional Moroccan design",
      "Long curved spout for traditional pouring",
      "Heat-resistant handle"
    ],
    dimensions: "Height: 10 inches, Capacity: 24 oz",
    materials: ["Brass", "Non-toxic paint"],
    inStock: true,
    artisan: {
      id: "art6",
      name: "Karim Ziani",
      slug: "karim-ziani",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      bio: "Karim's family has been crafting traditional Moroccan metalwork for generations in Marrakech's medina. His teapots are known for their elegant designs and exceptional craftsmanship.",
      location: "Marrakech, Morocco",
      specialty: "Brass metalwork and teapots"
    },
    artisanId: "art6",
    isFeatured: false,
    isOnSale: true,
    salePrice: 49,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    name: "Handwoven Moroccan Basket",
    slug: "handwoven-moroccan-basket",
    description: "This beautifully woven basket is handcrafted by women artisans using traditional techniques and sustainable palm leaves. With its vibrant colors and patterns, it serves as both a practical storage solution and a decorative piece. Each basket is unique in its pattern and coloring.",
    price: 59,
    images: [
      "https://images.unsplash.com/photo-1606151933174-15b69302ad95",
      "https://images.unsplash.com/photo-1621172715450-53ca41f75ae6",
      "https://images.unsplash.com/photo-1580380182404-81f3cc6d76bf"
    ],
    category: {
      id: "cat5",
      name: "Home Decor",
      slug: "home-decor",
      description: "Authentic Moroccan home décor items including lanterns, tables, and decorative pieces.",
      image: "https://images.unsplash.com/photo-1596910891038-c2947acbb10f"
    },
    categoryId: "cat5",
    features: [
      "Handwoven from sustainable palm leaves",
      "Natural vegetable dyes",
      "Sturdy construction",
      "Multi-purpose storage"
    ],
    dimensions: "Diameter: 14 inches, Height: 12 inches",
    materials: ["Palm leaves", "Natural vegetable dyes"],
    inStock: true,
    artisan: {
      id: "art7",
      name: "Samira Lahlou",
      slug: "samira-lahlou",
      image: "https://images.unsplash.com/photo-1541823709867-1b206113eafd",
      bio: "Samira leads a women's cooperative in southern Morocco that specializes in traditional basket weaving. Through her work, she helps preserve ancient techniques while providing sustainable income for rural women.",
      location: "Tiznit, Morocco",
      specialty: "Palm leaf basket weaving"
    },
    artisanId: "art7",
    isFeatured: false,
    isOnSale: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    name: "Moroccan Argan Oil Set",
    slug: "moroccan-argan-oil-set",
    description: "This premium set includes 100% pure Argan oil and Argan oil-based products, all ethically sourced from women's cooperatives in Morocco. Argan oil is renowned for its moisturizing and healing properties, used for centuries in Moroccan beauty routines.",
    price: 75,
    images: [
      "https://images.unsplash.com/photo-1570194065650-d68fcec4800d",
      "https://images.unsplash.com/photo-1617897903246-719242758050",
      "https://images.unsplash.com/photo-1617897903246-719242758050"
    ],
    category: {
      id: "cat6",
      name: "Beauty & Wellness",
      slug: "beauty-wellness",
      description: "Natural Moroccan beauty products including Argan oil, black soap, and traditional cosmetics.",
      image: "https://images.unsplash.com/photo-1570194065650-d68fcec4800d"
    },
    categoryId: "cat6",
    features: [
      "100% pure Argan oil",
      "Cold-pressed and unrefined",
      "Ethically sourced from women's cooperatives",
      "Multi-purpose for skin, hair, and nails"
    ],
    dimensions: "3 bottles: 2oz each",
    materials: ["Organic Argan oil", "Glass bottles"],
    inStock: true,
    artisan: {
      id: "art8",
      name: "Nadia Amrani",
      slug: "nadia-amrani",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56",
      bio: "Nadia runs a women's cooperative in southwestern Morocco that specializes in traditional Argan oil production. Their products support sustainable harvesting practices and provide fair employment for local women.",
      location: "Essaouira, Morocco",
      specialty: "Natural Argan oil products"
    },
    artisanId: "art8",
    isFeatured: false,
    isOnSale: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const getProducts = () => products;

export const getProductBySlug = (slug: string) => {
  return products.find(product => product.slug === slug);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured);
};

export const getProductsByCategory = (categorySlug: string) => {
  return products.filter(product => product.category.slug === categorySlug);
};

export const getCategories = () => {
  return products.map(product => product.category)
    .filter((category, index, self) => 
      index === self.findIndex((c) => (
        c.id === category.id
      ))
    );
}; 