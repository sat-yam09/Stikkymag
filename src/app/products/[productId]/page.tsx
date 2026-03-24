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
