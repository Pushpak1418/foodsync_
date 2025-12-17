"use client"

import { useState } from "react"
import { Search, MapPin, Menu, X, ShoppingBag, User, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cities } from "@/lib/data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NavbarProps {
  selectedCity: string
  onCityChange: (city: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function Navbar({ selectedCity, onCityChange, searchQuery, onSearchChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">Smart Food</h1>
              <p className="text-xs text-muted-foreground -mt-1">Finder</p>
            </div>
          </div>

          {/* City Selector & Search - Desktop */}
          <div className="hidden lg:flex items-center gap-4 flex-1 max-w-2xl mx-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-2 h-11 bg-secondary/50 border-border/50 hover:bg-secondary transition-all duration-300"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium">{selectedCity}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {cities.map((city) => (
                  <DropdownMenuItem
                    key={city}
                    onClick={() => onCityChange(city)}
                    className={`cursor-pointer transition-colors ${
                      selectedCity === city ? "bg-primary/10 text-primary font-medium" : ""
                    }`}
                  >
                    {city}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-11 bg-secondary/50 border-border/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Actions - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300"
            >
              <Heart className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300"
            >
              <ShoppingBag className="w-5 h-5" />
            </Button>
            <Button className="ml-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 h-10 shadow-md hover:shadow-lg transition-all duration-300">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-secondary/50">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{selectedCity}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {cities.map((city) => (
                    <DropdownMenuItem key={city} onClick={() => onCityChange(city)}>
                      {city}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-secondary/50"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                <Heart className="w-4 h-4 mr-2" />
                Favorites
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Cart
              </Button>
            </div>

            <Button className="w-full bg-primary">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
