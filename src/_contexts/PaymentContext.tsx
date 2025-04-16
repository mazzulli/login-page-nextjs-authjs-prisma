'use client'

import { createContext, useContext, useState } from "react";

type Payment = {
    id: string
    collaboratorName: string
    date: string
    venueName: string
    YLE: number
    ABR1: number
    ABP1: number
    CRP1: number
    CRR1: number
    Supervisor: number
    Invigilator: number
    Speaking: number
}

type Collaborator = {
    id: string
    name: string
}
  
type Venue = {
    id: string
    name: string
}

type PaymentContextType = {    
    collaborators: Collaborator[]
    venues: Venue[]
    payments: Payment[]
    loading: boolean
    collaboratorId: string | null
    startDate: Date | undefined
    endDate: Date | undefined
    venueId: string | null
    setCollaboratorId: (id: string | null) => void
    setStartDate: (date: Date | undefined) => void
    setEndDate: (date: Date | undefined) => void
    setVenueId: (id: string | null) => void
    resetFilters: () => void
}


const initialValue = {
    isOpenModal: false,
    setIsOpenModal: () => {},
}

export const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function usePayments() {
    const context = useContext(PaymentContext)
    if (context === undefined) {
      throw new Error("usePayments must be used within a PaymentsProvider")
    }
    return context
}

export const PaymentContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpenModal, setIsOpenModal] = useState(initialValue.isOpenModal);

    return (
        <PaymentContext.Provider value={{ isOpenModal, setIsOpenModal }}>
            {children}
        </PaymentContext.Provider>
    )
}
