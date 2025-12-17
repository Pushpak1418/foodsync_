"use client"

import { X, Star, Clock, MapPin, Award } from "lucide-react"
import Image from "next/image"
import type { Restaurant } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface MenuPreviewProps {
  restaurant: Restaurant
  isOpen: boolean
  onClose: () => void
}

export function MenuPreview({ restaurant, isOpen, onClose }: MenuPreviewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
        {/* Header Image */}
        <div className="relative h-48 sm:h-56">
          <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm text-white hover:bg-black/40"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-2xl font-bold mb-2">{restaurant.name}</h2>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{restaurant.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{restaurant.city}</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {restaurant.cuisineType}
              </Badge>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-14rem)]">
          <h3 className="text-lg font-bold text-foreground mb-4">Menu</h3>

          <div className="space-y-4">
            {restaurant.menuItems.map((item, index) => (
              <div
                key={item.name}
                className="flex gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors duration-300 animate-in fade-in slide-in-from-right-4"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-1">
                    {item.isVeg ? (
                      <div className="w-5 h-5 border-2 border-green-500 rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 border-2 border-red-500 rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        {item.isBestseller && (
                          <Badge className="bg-accent/20 text-accent-foreground text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            Bestseller
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold text-foreground">₹{item.price}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
