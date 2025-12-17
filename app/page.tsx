"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CuisineFilter } from "@/components/cuisine-filter"
import { RestaurantGrid } from "@/components/restaurant-grid"
import { Chatbot } from "@/components/chatbot"
import { Footer } from "@/components/footer"
import { restaurants } from "@/lib/data"

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("All Cities")
  const [selectedCuisine, setSelectedCuisine] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesCity = selectedCity === "All Cities" || restaurant.city === selectedCity
      const matchesCuisine = selectedCuisine === "All" || restaurant.cuisineType === selectedCuisine
      const matchesSearch =
        searchQuery === "" ||
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisineType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.menuItems.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCity && matchesCuisine && matchesSearch
    })
  }, [selectedCity, selectedCuisine, searchQuery])

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <HeroSection />
      <CuisineFilter selectedCuisine={selectedCuisine} onCuisineChange={setSelectedCuisine} />
      <RestaurantGrid restaurants={filteredRestaurants} />
      <Footer />
      <Chatbot />
    </div>
  )
}
