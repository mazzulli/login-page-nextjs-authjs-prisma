"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { User } from "./user-table"
import { MultiSelect } from "./multi-select"

interface UserFormProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
  onSave: (user: User) => void
}

export function UserForm({ user, isOpen, onClose, onSave }: UserFormProps) {
  const [formData, setFormData] = useState<User>({
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    accessType: user?.accessType || [],
    password: user?.password || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: keyof User, value: string | string[]) => {
    setFormData({ ...formData, [field]: value })

    // Clear error when field is edited
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Required name"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Required e-mail"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid e-mail"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Required phone number"
    }

    if (!user && !formData.password) {
      newErrors.password = "Required password"
    } else if (!user && formData.password && formData.password.length < 6) {
      newErrors.password = "The password must be at least 6 characters"
    }

    if (!formData.accessType || formData.accessType.length === 0) {
      newErrors.accessType = "Select at least 1 access type"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">        
        <DialogHeader>
          <DialogTitle>{user ? "Edit user" : "New user"}</DialogTitle>
          <DialogDescription id="user-form">Fill in the form below to {user ? "edit user" : "create a new user"}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>

          {(!user || user.id === "") && (
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="accessType">Access type</Label>
            <MultiSelect
              options={[
                { value: "Administrator", label: "Administrator" },
                { value: "Supervisor", label: "Supervisor" },
                { value: "Invigilator", label: "Invigilator" },
                { value: "Speaking", label: "Speaking" },
              ]}
              selected={formData.accessType}
              onChange={(value) => handleChange("accessType", value)}
            />
            {errors.accessType && <p className="text-sm text-red-500">{errors.accessType}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

