"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/_components/ui/table"
import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { UserForm } from "@/_components/user-form"
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

// Mock data for demonstration
const initialUsers = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    phone: "(11) 98765-4321",
    accessType: ["Administrator"],
  },
  {
    id: "2",
    name: "Maria Oliveira",
    email: "maria@example.com",
    phone: "(11) 91234-5678",
    accessType: ["Supervisor", "Invigilator"],
  },
  {
    id: "3",
    name: "Carlos Santos",
    email: "carlos@example.com",
    phone: "(11) 99876-5432",
    accessType: ["Invigilator", "Speaking"],
  },
]

export type User = {
  id: string
  name: string
  email: string
  phone: string
  accessType: string[] // Changed from string to string[]
  password?: string
}

export function UserTable() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [filterValue, setFilterValue] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(filterValue.toLowerCase()))

  const handleCreateUser = () => {
    setCurrentUser(null)
    setIsFormOpen(true)
  }

  const handleEditUser = (user: User) => {
    setCurrentUser(user)
    setIsFormOpen(true)
  }

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete))
      toast({
        title: "User deleted",
        description: "The user was deleted with success.",
      })
      setIsDeleteDialogOpen(false)
      setUserToDelete(null)
    }
  }

  const handleSaveUser = (user: User) => {
    if (user.id) {
      // Edit existing user
      setUsers(users.map((u) => (u.id === user.id ? user : u)))
      toast({
        title: "User updated",
        description: "The user informations was updated with success.",
      })
    } else {
      // Add new user
      const newUser = {
        ...user,
        id: Math.random().toString(36).substring(2, 9),
      }
      setUsers([...users, newUser])
      toast({
        title: "User created",
        description: "A new user was created with success.",
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
        <Button onClick={handleCreateUser} className="bg-green-700 text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          New User
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Access Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.accessType.join(", ")}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {isFormOpen && (
        <UserForm user={currentUser} isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSaveUser} />
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

