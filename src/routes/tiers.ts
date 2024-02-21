export enum SinglesTiers {
    AG = "AG",
    Uber = "Uber",
    OU = "OU",
    UU = "UU",
    RU = "RU",
    NU = "NU",
    PU = "PU",
    ZU = "ZU",
    NFE = "NFE",
    LC = "LC",
    CAP = "CAP",
    CAP_NFE = "CAP NFE",
    CAP_LC = "CAP LC",
}

export enum DoublesTiers {
    DUber = "DUber",
    DOU = "DOU",
    DUU = "DUU",
    BelowDUU = "(DUU)",
    NFE = "NFE",
    LC = "LC",
}

export enum NatDexTiers {
    AG = "AG",
    Uber = "Uber",
    OU = "OU",
    UU = "UU",
    RU = "RU",
    NFE = "NFE",
    LC = "LC",
}

export type Tier = SinglesTiers | DoublesTiers | NatDexTiers;
