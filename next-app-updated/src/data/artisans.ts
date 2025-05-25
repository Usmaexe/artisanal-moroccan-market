// filepath: src/data/artisans.ts
import { Artisan } from "@/types";

export const artisans: Artisan[] = [
  {
    id: "art1",
    name: "Hassan Berrada",
    slug: "hassan-berrada",
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115",
    bio: "Hassan has been creating traditional pottery for over 30 years, learning the craft from his father in Fez. His work is known for its intricate blue patterns and exceptional quality.",
    location: "Fez, Morocco",
    specialty: "Blue and white ceramic pottery",
    story: "Growing up in the ancient pottery district of Fez, Hassan was surrounded by the art of ceramics from an early age. At just 12 years old, he began apprenticing with his father, learning techniques that have been passed down through generations. Today, Hassan leads a workshop where he continues these traditions while training new artisans in the craft. His work has been exhibited internationally, bringing Moroccan ceramic traditions to a global audience."
  },
  {
    id: "art2",
    name: "Fatima Ouazzani",
    slug: "fatima-ouazzani",
    image: "https://images.unsplash.com/photo-1594464275347-a232aee2d9bf",
    bio: "Fatima leads a women's cooperative in the Atlas Mountains where traditional carpet weaving techniques are preserved and passed to younger generations. Her designs combine traditional elements with contemporary aesthetics.",
    location: "Atlas Mountains, Morocco",
    specialty: "Berber carpet weaving",
    story: "Fatima founded the Atlas Women's Weaving Cooperative after learning traditional techniques from her grandmother. What began as a small group of five weavers has grown into a cooperative of over 30 women from surrounding villages. The cooperative has revitalized interest in traditional Berber designs among younger generations and provides sustainable income for women in the region."
  },
  {
    id: "art3",
    name: "Omar Khalil",
    slug: "omar-khalil",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857",
    bio: "Omar runs a family workshop in Marrakech's leather district, where they've been creating leather goods for four generations. His poufs are known for their durability and intricate designs.",
    location: "Marrakech, Morocco",
    specialty: "Leather crafting and embroidery",
    story: "The Khalil family workshop sits in the heart of Marrakech's famous tannery district, where the distinctive smell of the natural tanning process fills the air. Omar represents the fourth generation of leather craftsmen in his family, using techniques that have remained largely unchanged for centuries. His workshop employs fifteen skilled artisans, many of whom have been with the family business for decades."
  },
  {
    id: "art4",
    name: "Amina Tahiri",
    slug: "amina-tahiri",
    image: "https://images.unsplash.com/photo-1544717305-996b815c338c",
    bio: "Amina comes from a long line of Berber silversmiths and has been creating jewelry for over 20 years. Her designs blend traditional Berber symbols with contemporary aesthetics, making each piece both timeless and modern.",
    location: "Tiznit, Morocco",
    specialty: "Silver jewelry with amber and turquoise",
    story: "In the silver city of Tiznit, Amina works from a small studio that once belonged to her grandfather. Breaking tradition in a male-dominated craft, she became one of the first women silversmiths in her community. Amina's jewelry tells stories through symbols - triangles representing mountains, zigzag lines for water, and circles for the sun. Each piece connects the wearer to Berber cultural heritage while embodying contemporary elegance."
  },
  {
    id: "art5",
    name: "Yousef Benjelloun",
    slug: "yousef-benjelloun",
    image: "https://images.unsplash.com/photo-1608137050689-b08b643ea4f4",
    bio: "Yousef is a master tile maker from Fez who has been creating zellige mosaics for over 25 years. His workshop combines traditional techniques with contemporary designs, creating pieces that honor Moroccan heritage while fitting into modern homes.",
    location: "Fez, Morocco",
    specialty: "Zellige tilework and mosaic furniture",
    story: "Yousef's journey with zellige began as a mathematical fascination. The geometric precision required to create these intricate patterns captivated him from an early age. After studying architecture, he returned to Fez to apprentice with master artisans, learning to hand-cut tiles and assemble them into the stunning mosaics that adorn Morocco's most beautiful buildings."
  },
  {
    id: "art6",
    name: "Karim Ziani",
    slug: "karim-ziani",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    bio: "Karim's family has been crafting traditional Moroccan metalwork for generations in Marrakech's medina. His teapots are known for their elegant designs and exceptional craftsmanship.",
    location: "Marrakech, Morocco",
    specialty: "Brass metalwork and teapots",
    story: "The rhythmic sound of hammers striking metal has been the soundtrack to Karim's life since childhood. In his family's workshop near Marrakech's famous Jemaa el-Fnaa square, he learned to transform flat sheets of brass into elegant vessels for Morocco's beloved mint tea. Each teapot requires over 20 hours of meticulous work - hammering, engraving, soldering, and polishing."
  },
  {
    id: "art7",
    name: "Samira Lahlou",
    slug: "samira-lahlou",
    image: "https://images.unsplash.com/photo-1541823709867-1b206113eafd",
    bio: "Samira leads a women's cooperative in southern Morocco that specializes in traditional basket weaving. Through her work, she helps preserve ancient techniques while providing sustainable income for rural women.",
    location: "Tiznit, Morocco",
    specialty: "Palm leaf basket weaving",
    story: "What began as a small gathering of women weaving baskets under a tree has grown into a thriving cooperative under Samira's leadership. After completing her business studies, Samira returned to her village determined to create economic opportunities that would allow women to earn income while maintaining their traditional lifestyles. The cooperative now includes over 40 weavers who sustainably harvest palm leaves from local oases."
  },
  {
    id: "art8",
    name: "Nadia Amrani",
    slug: "nadia-amrani",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56",
    bio: "Nadia runs a women's cooperative in southwestern Morocco that specializes in traditional Argan oil production. Their products support sustainable harvesting practices and provide fair employment for local women.",
    location: "Essaouira, Morocco",
    specialty: "Natural Argan oil products",
    story: "The 'liquid gold' of Morocco has transformed the lives of women in Nadia's community. After working for an international development organization, Nadia returned to her hometown near Essaouira to establish an Argan oil cooperative that would ensure fair compensation for the women's labor-intensive work. The process of producing pure Argan oil remains largely unchanged - each kernel is still cracked by hand between stones before being cold-pressed into oil."
  }
];

// Function to get all artisans
export const getArtisans = () => artisans;

// Function to get an artisan by slug
export const getArtisanBySlug = (slug: string) => {
  return artisans.find(artisan => artisan.slug === slug);
};

// Function to get an artisan by ID
export const getArtisanById = (id: string) => {
  return artisans.find(artisan => artisan.id === id);
};

// Function to get artisans by location
export const getArtisansByLocation = (location: string) => {
  return artisans.filter(artisan => artisan.location.includes(location));
};

// Function to get artisans by specialty
export const getArtisansBySpecialty = (specialty: string) => {
  return artisans.filter(artisan => 
    artisan.specialty.toLowerCase().includes(specialty.toLowerCase())
  );
};

// Get featured artisans
export const getFeaturedArtisans = () => {
  // Return the first 4 artisans as featured
  return artisans.slice(0, 4);
};