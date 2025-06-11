import { Metadata } from "next";
import axios from "axios";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const response = await axios.get(`http://localhost:5000/api/products?slug=${params.slug}`);
    const product = response.data[0];
    
    if (!product) {
      return {
        title: "Product Not Found",
        description: "The product you're looking for does not exist."
      };
    }
    
    return {
      title: `${product.name} | Moroccan Artisans`,
      description: product.description.substring(0, 160)
    };
  } catch (err) {
    return {
      title: "Product",
      description: "Product details"
    };
  }
}