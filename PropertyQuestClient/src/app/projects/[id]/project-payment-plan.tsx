interface PaymentPlan {
  booking: string
  construction: Array<{
    milestone: string
    percentage: string
  }>
  handover: string
}

interface ProjectPaymentPlanProps {
  paymentPlan: PaymentPlan
}

export default function ProjectPaymentPlan({ paymentPlan }: ProjectPaymentPlanProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-6">Payment Plan</h3>

      <div className="space-y-6">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          <div className="relative pl-12 pb-8">
            <div className="absolute left-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              1
            </div>
            <div>
              <h4 className="font-medium text-lg">Booking</h4>
              <p className="text-gray-500 mb-2">Initial payment to secure your unit</p>
              <div className="bg-primary/10 text-primary font-medium px-4 py-2 rounded-md inline-block">
                {paymentPlan.booking}
              </div>
            </div>
          </div>

          {paymentPlan.construction.map((milestone, index) => (
            <div key={index} className="relative pl-12 pb-8">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                {index + 2}
              </div>
              <div>
                <h4 className="font-medium text-lg">{milestone.milestone}</h4>
                <p className="text-gray-500 mb-2">Construction milestone payment</p>
                <div className="bg-primary/10 text-primary font-medium px-4 py-2 rounded-md inline-block">
                  {milestone.percentage}
                </div>
              </div>
            </div>
          ))}

          <div className="relative pl-12">
            <div className="absolute left-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              {paymentPlan.construction.length + 2}
            </div>
            <div>
              <h4 className="font-medium text-lg">Handover</h4>
              <p className="text-gray-500 mb-2">Final payment upon completion</p>
              <div className="bg-primary/10 text-primary font-medium px-4 py-2 rounded-md inline-block">
                {paymentPlan.handover}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Payment Plan Benefits</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              <span>Flexible payment schedule aligned with construction progress</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              <span>Lower initial investment compared to completed properties</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              <span>Potential for capital appreciation during construction period</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              <span>Option for customization during early construction phases</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

