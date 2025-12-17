"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Clock, ChevronRight, Award, Percent } from "lucide-react"
import type { Restaurant } from "@/lib/data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MenuPreview } from "./menu-preview"

interface RestaurantCardProps {
  restaurant: Restaurant
  index: number
}

export function RestaurantCard({ restaurant, index }: RestaurantCardProps) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      <Card
        className="group overflow-hidden border-border/50 bg-card hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 cursor-pointer animate-in fade-in slide-in-from-bottom-4"
        style={{ animationDelay: `${index * 75}ms` }}
        onClick={() => setShowMenu(true)}
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {restaurant.isPromoted && (
              <Badge className="bg-accent text-accent-foreground font-medium">
                <Award className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            {restaurant.discount && (
              <Badge className="bg-primary text-primary-foreground font-medium">
                <Percent className="w-3 h-3 mr-1" />
                {restaurant.discount}
              </Badge>
            )}
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-card/90 backdrop-blur-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-sm text-foreground">{restaurant.rating}</span>
          </div>

          {/* Delivery Time */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-card/90 backdrop-blur-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{restaurant.deliveryTime}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
            <span className="text-muted-foreground text-sm font-medium shrink-0">{restaurant.priceRange}</span>
          </div>

          <p className="text-muted-foreground text-sm mb-3">
            {restaurant.cuisineType} • {restaurant.city}
          </p>

          {/* Quick Menu Preview */}
          <div className="space-y-2 mb-4">
            {restaurant.menuItems.slice(0, 2).map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                {item.isVeg ? (
                  <div className="w-4 h-4 border-2 border-green-500 rounded-sm flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                ) : (
                  <div className="w-4 h-4 border-2 border-red-500 rounded-sm flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                  </div>
                )}
                <span className="text-muted-foreground truncate">{item.name}</span>
                {item.isBestseller && (
                  <Badge variant="secondary" className="text-xs py-0 px-1.5 shrink-0">
                    Bestseller
                  </Badge>
                )}
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            className="w-full justify-between text-primary hover:text-primary hover:bg-primary/10 group/btn"
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu(true)
            }}
          >
            <span>View Full Menu</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </Card>

      <MenuPreview restaurant={restaurant} isOpen={showMenu} onClose={() => setShowMenu(false)} />
    </>
  )
}
