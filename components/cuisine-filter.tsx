"use client"

import { cuisineFilters } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Utensils, Flame, Soup, Pizza, Globe, Zap, IceCream, Sparkles } from "lucide-react"

interface CuisineFilterProps {
  selectedCuisine: string
  onCuisineChange: (cuisine: string) => void
}

const cuisineIcons: Record<string, typeof Utensils> = {
  All: Sparkles,
  "North Indian": Flame,
  "South Indian": Soup,
  Chinese: Utensils,
  Italian: Pizza,
  Continental: Globe,
  "Fast Food": Zap,
  Desserts: IceCream,
  Biryani: Flame,
}

export function CuisineFilter({ selectedCuisine, onCuisineChange }: CuisineFilterProps) {
  return (
    <section className="py-6 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-16 lg:top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {cuisineFilters.map((cuisine) => {
            const Icon = cuisineIcons[cuisine] || Utensils
            const isSelected = selectedCuisine === cuisine

            return (
              <button
                key={cuisine}
                onClick={() => onCuisineChange(cuisine)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-medium text-sm",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-105",
                )}
              >
                <Icon className="w-4 h-4" />
                {cuisine}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
