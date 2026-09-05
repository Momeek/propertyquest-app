import { Button } from "@/components/ui/button"
import { Home, Ruler, DollarSign } from "lucide-react"

interface UnitType {
  type: string
  size: string
  priceRange: string
  available: number
}

interface ProjectUnitsProps {
  units: UnitType[]
}

export default function ProjectUnits({ units }: ProjectUnitsProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-6">Available Units</h3>

      <div className="space-y-4">
        {units.map((unit, index) => (
          <div key={index} className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Home className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-lg">{unit.type}</h4>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Ruler className="h-4 w-4 mr-1" />
                    <span>{unit.size}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="font-medium">{unit.priceRange}</span>
                </div>
                <div className="text-sm text-gray-500">{unit.available} units available</div>
                <Button size="sm">Request Details</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Unit Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
            <span className="text-sm">Premium finishes and materials</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
            <span className="text-sm">Floor-to-ceiling windows</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
            <span className="text-sm">Smart home technology</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
            <span className="text-sm">Spacious balconies</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
            <span className="text-sm">High-end kitchen appliances</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
            <span className="text-sm">Custom cabinetry and storage</span>
          </div>
        </div>
      </div>
    </div>
  )
}
