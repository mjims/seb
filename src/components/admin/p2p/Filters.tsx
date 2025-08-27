// components/admin/Transactions/Filters.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { format } from 'date-fns'
import { useState } from 'react'

export default function P2PFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [date, setDate] = useState<Date | undefined>(
    searchParams.get('date') ? new Date(searchParams.get('date')!) : undefined
  )

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) params.set('status', value)
    else params.delete('status')
    router.push(`/admin/transactions?${params.toString()}`)
  }

  const handleDateChange = (date: Date | undefined) => {
    setDate(date)
    const params = new URLSearchParams(searchParams)
    if (date) params.set('date', format(date, 'yyyy-MM-dd'))
    else params.delete('date')
    router.push(`/admin/transactions?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Select
        value={searchParams.get('status') || ''}
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="w-[180px] bg-red">
          <SelectValue placeholder="Filtrer par statut" />
        </SelectTrigger>
        <SelectContent className='bg-white'>
          <SelectItem value=" ">Tous les statuts</SelectItem>
          <SelectItem value="completed">Complétées</SelectItem>
          <SelectItem value="pending">En attente</SelectItem>
          <SelectItem value="failed">Échouées</SelectItem>
          <SelectItem value="refunded">Remboursées</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Filtrer par date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}