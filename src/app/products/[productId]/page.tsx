import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/ProductDetailView";
import { designedProducts, getDesignedProductById } from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export function generateStaticParams() {
  return designedProducts.map((product) => ({
    productId: product.id,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = getDesignedProductById(productId);

  if (!product) {
    return {
      title: "Product Not Found | Stikkymag",
    };
  }

  return {
    title: `${product.title} | Stikkymag`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = getDesignedProductById(productId);

  if (!product) {
    notFound();
  }

  const relatedProducts = designedProducts.filter(
    (relatedProduct) => relatedProduct.id !== product.id,
  );

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
}
