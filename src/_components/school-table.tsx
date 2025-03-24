"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/_components/ui/table"
import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { SchoolForm } from "@/_components/school-form"
import { PlusCircle, Search, Pencil, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/_components/ui/alert-dialog"
import { useToast } from "@/_components/ui/use-toast"
import { Venue } from "@prisma/client"

export type School = {
  id: string
  name: string
  address: string
  number?: string
  district: string
  city: string
  state: string
  postalCode: string
  createdAt?: string
  updatedAt?: string
}

export function SchoolTable(data:Venue[]) {
  const [schools, setSchools] = useState<Venue[]>(data)
  const [filterValue, setFilterValue] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentSchool, setCurrentShool] = useState<Venue | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [schoolToDelete, setShoolToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  // const filteredSchool = schools.filter((school) => {
  //   if(school.name){ 
  //   school.name.toLowerCase().includes(filterValue.toLowerCase())
  //   }
  // })

  const handleCreateSchool = () => {
    setCurrentShool(null)
    setIsFormOpen(true)    
  }

  const handleEditSchool = (school: Venue) => {
    setCurrentShool(school)
    setIsFormOpen(true)
  }

  const handleDeleteSchool = (schoolId: string) => {
    setShoolToDelete(schoolId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (schoolToDelete) {
      setSchools(schools.filter((schools) => schools.id !== schoolToDelete))
      toast({
        title: "School deleted",
        description: "The school was deleted with success.",
      })
      setIsDeleteDialogOpen(false)
      setShoolToDelete(null)
    }
  }

  const handleSaveSchool = (user: School) => {
    if (user.id) {
      // Edit existing user
      // setSchools(schools.map((u) => (u.id === user.id ? user : u)))
      toast({
        title: "School updated",
        description: "The school informations was updated with success.",
      })
    } else {
      // Add new user
      // const newUser = {
      //   ...user,
      //   id: Math.random().toString(36).substring(2, 9),
      // }
      // setSchools([...schools, newUser])
      toast({
        title: "School created",
        description: "A new school was created with success.",
      })
    }
    setIsFormOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mt-6">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={handleCreateSchool} className="bg-green-700 text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          New School
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchool.length > 0 ? (
              filteredSchool.map((school) => (
                <TableRow key={school.id}>
                  <TableCell className="font-medium">{school.name}</TableCell>
                  <TableCell>{school.address}</TableCell>
                  <TableCell>{school.city}</TableCell>
                  <TableCell>{school.state}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditSchool(school)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteSchool(school.id ?? "")}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No school found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {isFormOpen && (
        <SchoolForm formValues={currentSchool} isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSaveSchool} mode={currentSchool ? "create" : "edit"} />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
            Are you sure you want to delete this user? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

