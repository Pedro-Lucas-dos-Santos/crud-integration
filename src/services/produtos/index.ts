import { request } from "@/http"
import React from "react";

export default function ProdutosServices() {

    const listarProdutos = async () => {
        try {
            const api = await request.get("/produtos")
            console.log(api)

            return api.data
        } catch (error) {
            console.log(error)
        }
    }

    const criarProduto = async (dados: any) => {
        try {
            const api = await request.post("/create/produto", dados)

            return api.data
        } catch (error) {
            console.log(error)
        }
    }

    return { listarProdutos, criarProduto }; 
}