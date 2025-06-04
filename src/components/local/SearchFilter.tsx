"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFilterProps {
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: { status: string; priority: string }) => void;
}

export default function SearchFilter({
  onSearchChange,
  onFilterChange,
}: SearchFilterProps) {
  return (
    <div className='mb-6 flex space-x-4'>
      <Input
        placeholder='Search tasks...'
        onChange={(e) => onSearchChange(e.target.value)}
        className='max-w-xs'
      />
      <Select
        onValueChange={(value) =>
          onFilterChange({ status: value, priority: "" })
        }
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Filter by Status' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Statuses</SelectItem>
          <SelectItem value='pending'>Pending</SelectItem>
          <SelectItem value='in-progress'>In Progress</SelectItem>
          <SelectItem value='completed'>Completed</SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) =>
          onFilterChange({ status: "", priority: value })
        }
        
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Filter by Priority' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Priorities</SelectItem>
          <SelectItem value='low'>Low</SelectItem>
          <SelectItem value='medium'>Medium</SelectItem>
          <SelectItem value='high'>High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
