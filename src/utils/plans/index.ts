export type PlanDetailsProps = {
    maxServices: number
}

export type PlansProps = {
    BASIC: PlanDetailsProps;
    PROFESSIONAL: PlanDetailsProps;
}

export const PLANS = {
    BASIC: {
        maxServices: 3
    },
    PROFESSIONAL: {
        maxServices: 50
    }
}

export const subscriptionPlans = [
    {
        id: "BASIC",
        name: "Basic",
        description: "Perfect for smaller business",
        oldPrice: "50,00 €",
        price: "27,90 €",
        features: [
            `Includes up to ${PLANS["BASIC"].maxServices} services`,
            "Support 9 AM – 6 PM",
            "Unlimited Appointments",
        ]

    },
    {
        id: "PROFESSIONAL",
        name: "Professional",
        description: "Perfect for Bigger business",
        oldPrice: "100,00 €",
        price: "97,90 €",
        features: [
            `Includes up to ${PLANS["PROFESSIONAL"].maxServices} services`,
            "Support available all day",
            "Unlimited Appointments",
        ]

    }
]