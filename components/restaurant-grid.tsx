"use client"

import type { Restaurant } from "@/lib/data"
import { RestaurantCard } from "./restaurant-card"
import { Frown } from "lucide-react"

interface RestaurantGridProps {
  restaurants: Restaurant[]
}

export function RestaurantGrid({ restaurants }: RestaurantGridProps) {
  if (restaurants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
          <Frown className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">No restaurants found</h3>
        <p className="text-muted-foreground max-w-md">
          We couldn't find any restaurants matching your criteria. Try changing your filters or search query.
        </p>
      </div>
    )
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{restaurants.length} Restaurants Found</h2>
            <p className="text-muted-foreground text-sm mt-1">Explore our curated selection of restaurants</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
