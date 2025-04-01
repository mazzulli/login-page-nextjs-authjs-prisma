import { getBanks } from "@/app/_data-access/get-banks"
import { Banks } from "@prisma/client"
import { useEffect, useState } from "react"
import { toast } from "@/_hooks/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/_components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/_components/ui/command"
import { FormControl } from "@/_components/ui/form"
import { Button } from "@/_components/ui/button"
import { ChevronsUpDown } from "lucide-react"

interface Props {
    onOpen?: ()=> void
}

const BanksComboBox = ({onOpen}:Props) => {
    const [banks, setBanks] = useState<Banks[]>([])
    const [open, setOpen] = useState(false)
    
    // Fetch banks on component mount
    useEffect(() => {
      const fetchBanks = async () => {
        try {
          const data = await getBanks()
          setBanks(data)
        } catch (error) {
          toast(
            {
              title: "Ops...",
              description: "Can't fetch banks.",
            }
          )
          console.error("ERROR TO FETCH BANKS: ",error)
        }
      }  
      fetchBanks()
    }, [])

    return (
        <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger className={"w-full"} asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={"text-muted-foreground justify-between"}
                          >
                            {field.value ? banks.find((bank) => bank.id === field.value)?.name : "Select a bank"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command className="w-[547]">
                          <CommandInput placeholder="Search bank..." className="w-full p-0" />
                          <CommandList>
                            <CommandEmpty>No bank found.</CommandEmpty>
                            <CommandGroup>
                              {banks.map((bank) => (
                                <CommandItem                                   
                                  value={bank.code + " - " + bank.name}
                                  key={bank.id}
                                  onSelect={() => {
                                    form.setValue("bankId", bank.id)                                              
                                    form.setValue("bankCode", String(bank.code))
                                    form.setValue("bankName", bank.name)
                                    setOpen(false);
                                    onOpen?.()
                                  }}
                                >
                                  {bank.name}                                
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
      );
}
 
export default BanksComboBox;