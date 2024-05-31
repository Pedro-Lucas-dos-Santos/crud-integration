"use client"
import ProdutosServices from "@/services/produtos";
import React, { useEffect, useState } from "react";

type Produto = {
    id: number;
    name: string;
    category: string;
    price: number;
};

export default function Produtos() {
    const [produtos, setProdutos] = useState<Produto[]>([])

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")

    const buscarProdutos = async () => {
        await ProdutosServices()
        .listarProdutos()
        .then((response) => {
            setProdutos(response.produtos)
        })
    }

    const criarProduto = async (produto: any) => {
        const response = await ProdutosServices().criarProduto(produto)
        console.log(response)
        buscarProdutos()
    }

    useEffect(() => {
        buscarProdutos()
    }, [])

    return (
        <div className="flex justify-center gap-7 m-2">
          {produtos.map((produto) => {
            return (
             <div 
             key={produto.id}
             className={` bg-purple-600 rounded-md h-64 w-64 
             flex flex-col justify-center items-center 
             text-white`}
             >
                <div><strong>Nome:</strong> {produto.name}</div>
                <div><strong>Categoria:</strong> {produto.category}</div>
                <div><strong>Preço:</strong> {produto.price}</div>
             </div>
            )
          })}

          <div>
            <form 
                className="flex flex-col gap-3" 
                onSubmit={(event) => 
                    {event.preventDefault()

                    criarProduto({
                    name,
                    category, 
                    price
                })}
                }>
                <div>
                    Nome: 
                    <input 
                    className="bg-red-100"
                    onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    Categoria: 
                    <input 
                    className="bg-red-100"
                    onChange={(event) => setCategory(event.target.value)}
                    />
                </div>
                <div>
                    Preço: 
                    <input 
                    type="number" 
                    className="bg-red-100"
                    onChange={(event) => setPrice(event.target.value)}
                    />
                    </div>
                <button type="submit" className="bg-black text-white p-[10px] rounded-md">Criar produto</button>
            </form>
          </div>
        </div>
    )
}