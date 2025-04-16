import { BookUserIcon, CalendarIcon, MapPinIcon, UserRound } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select"
import { cn } from "@/_lib/utils"
import { formatDate } from "date-fns"
import { Calendar } from "@/_components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/ui/popover"
import React from "react";
import { getCollaborators } from "@/app/_data-access/get-collaborators";

const DataTableFilters = () => {
    const [startDate, setStartDate] = React.useState<Date>()
    const [endDate, setEndDate] = React.useState<Date>()
    
    return ( 
        <>
            {/* FILTER BY COLLABORATORS */}
            <Select>
            <SelectTrigger className="w-[180px]">
            <UserRound />
            <SelectValue placeholder="Collaborator" />
            </SelectTrigger>
            <SelectContent>
                {
                    
                }
            <SelectItem value="light">John</SelectItem>
            <SelectItem value="dark">Danilo</SelectItem>
            <SelectItem value="system">Andreia</SelectItem>
            </SelectContent>
        </Select>

        {/* FILTER BY CATEGORY/COLLABORATOR TYPE */}
        <Select>
            <SelectTrigger className="w-[180px]">
            <BookUserIcon />
            <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="Supervisor">Supervisor</SelectItem>
            <SelectItem value="Invigilator">Invigilator</SelectItem>
            <SelectItem value="Speaking">Speaking</SelectItem>
            </SelectContent>
        </Select>
        
        {/* FILTER BY PERIOD */}
        {/* FILTER BY START DATE */}
        <Popover>
            <PopoverTrigger asChild>
            <Button
                variant={"outline"}
                className={cn(
                "w-[240px] justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
                )}
            >
                <CalendarIcon />
                {startDate ? formatDate(startDate, "yyyy/MM/dd") : <span>Initial date</span>}
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
            />
            </PopoverContent>
        </Popover>

        {/* FILTER BY END DATE */}
        <Popover>
            <PopoverTrigger asChild>
            <Button
                variant={"outline"}
                className={cn(
                "w-[240px] justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
                )}
            >
                <CalendarIcon />
                {endDate ? formatDate(endDate, "yyyy/MM/dd") : <span>Final date</span>}
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
            />
            </PopoverContent>
        </Popover>

        {/* FILTER BY VENUE */}
        <Select>
            <SelectTrigger className="w-[180px]">
            <MapPinIcon/>
            <SelectValue placeholder="Venue" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="Supervisor">Puc</SelectItem>
            <SelectItem value="Invigilator">Mackenzie</SelectItem>
            <SelectItem value="Speaking">USP</SelectItem>
            </SelectContent>
        </Select> 
      </>      
     );
}
 
export default DataTableFilters;