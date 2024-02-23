export enum SinglesTiers {
    AG = "AG",
    Uber = "Uber",
    OU = "OU",
    UUBL = "UUBL",
    UU = "UU",
    RUBL = "RUBL",
    RU = "RU",
    NUBL = "NUBL",
    NU = "NU",
    PUBL = "PUBL",
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
}

export enum NatDexTiers {
    AG = "AG",
    Uber = "Uber",
    OU = "OU",
    UUBL = "UUBL",
    UU = "UU",
    RUBL = "RUBL",
    RU = "RU",
    NFE = "NFE",
    LC = "LC",
}

export type Tier = SinglesTiers | DoublesTiers | NatDexTiers;
