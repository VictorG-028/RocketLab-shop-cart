import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '@/utils/createMockProduts';
import { ProductModel } from 'src/models/Product';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-separator';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product] = useState<ProductModel>(products[parseInt(id || "0")]);

  return (
    <main className="min-w-[450px] bg-gray-50 min-h-screen">
      <section>
        <Navbar routeName={`product/${product.id}`}>
          <>
            <Button 
              onClick={() => navigate('/')}
              className="text-secondary hover:text-primary-dark"
            >
              &larr; Voltar
            </Button>
          </>
        </Navbar>
      </section>

      <section className="container mx-auto p-4">
        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8">
          
          <div className="w-[100%] md:w-1/2 flex justify-center mb-4 md:mb-0 md:mt-16">
            <img 
              src={"../" + product.imageUrl} 
              alt="Imagem do Produto" 
              className="max-w-full h-80 rounded-lg shadow-md"
            />
          </div>
        
          <div className="md:w-1/2 flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg">{product.description}</p>

            <Separator className="bg-primary h-0.5"></Separator>
            <p className="text-lg font-semibold">{product.currency}{product.price.toFixed(2)}</p>
            <Separator className="bg-primary h-0.5"></Separator>

            <p className="text-lg font-semibold">
              Marca:
              <span className="ml-1 text-base">{product.brand}</span>
            </p>
            <p className="text-lg font-semibold">
              Modelo: 
              <span className="ml-1 text-base">{product.model}</span>
            </p>
            <p className="text-lg font-semibold">
              Cor: 
              <span className="ml-1 text-base">{product.color}</span>
            </p>
            <p className="text-lg font-semibold">
              Conectividade: 
              <span className="ml-1 text-base">{product.connectivity}</span>
            </p>
          </div>
        </div>

      </section>
    </main>
  );
}
