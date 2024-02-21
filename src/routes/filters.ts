import { writable } from "svelte/store";
import { DoublesTiers, NatDexTiers, SinglesTiers } from "./tiers";

interface Filters {
    singles: Map<SinglesTiers, boolean>,
    doubles: Map<DoublesTiers, boolean>,
    natdex: Map<NatDexTiers, boolean>,
}

export const filters = writable<Filters>({
    singles: new Map<SinglesTiers, boolean>([
        [SinglesTiers.AG, true],
        [SinglesTiers.Uber, true],
        [SinglesTiers.OU, true],
        [SinglesTiers.UUBL, true],
        [SinglesTiers.UU, true],
        [SinglesTiers.RUBL, true],
        [SinglesTiers.RU, true],
        [SinglesTiers.NUBL, true],
        [SinglesTiers.NU, true],
        [SinglesTiers.PUBL, true],
        [SinglesTiers.PU, true],
        [SinglesTiers.ZU, true],
        [SinglesTiers.NFE, true],
        [SinglesTiers.LC, true],
        [SinglesTiers.CAP, false],
        [SinglesTiers.CAP_NFE, false],
        [SinglesTiers.CAP_LC, false],
    ]),

    doubles: new Map<DoublesTiers, boolean>([
        [DoublesTiers.DUber, true],
        [DoublesTiers.DOU, true],
        [DoublesTiers.DUU, true],
        [DoublesTiers.BelowDUU, true],
        [DoublesTiers.NFE, true],
        [DoublesTiers.LC, true],

    ]),
    natdex: new Map<NatDexTiers, boolean>([
        [NatDexTiers.AG, true],
        [NatDexTiers.Uber, true],
        [NatDexTiers.OU, true],
        [NatDexTiers.UUBL, true],
        [NatDexTiers.UU, true],
        [NatDexTiers.RUBL, true],
        [NatDexTiers.RU, true],
        [NatDexTiers.NFE, true],
        [NatDexTiers.LC, true],
    ]
    )
}
);
