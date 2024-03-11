'use client'
import React from 'react'

// 리액트 쿼리를 사용하기 위한 준비
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Header from '@/components/Header/Header'

const queryClinet = new QueryClient()


const PageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClinet}>
            <Header />
            {children}
        </QueryClientProvider>

    )
}

export default PageLayout