import { writable } from "svelte/store";
import { DoublesTiers, NatDexTiers, SinglesTiers } from "./tiers";

export enum FilterState {
    Ignore,
    Require,
    Exclude,
}

interface Filters {
    singles: Map<SinglesTiers, FilterState>,
    doubles: Map<DoublesTiers, FilterState>,
    natdex: Map<NatDexTiers, FilterState>,
}

export const filters = writable<Filters>({
    singles: new Map<SinglesTiers, FilterState>([
        [SinglesTiers.AG, FilterState.Ignore],
        [SinglesTiers.Uber, FilterState.Ignore],
        [SinglesTiers.OU, FilterState.Ignore],
        [SinglesTiers.UUBL, FilterState.Ignore],
        [SinglesTiers.UU, FilterState.Ignore],
        [SinglesTiers.RUBL, FilterState.Ignore],
        [SinglesTiers.RU, FilterState.Ignore],
        [SinglesTiers.NUBL, FilterState.Ignore],
        [SinglesTiers.NU, FilterState.Ignore],
        [SinglesTiers.PUBL, FilterState.Ignore],
        [SinglesTiers.PU, FilterState.Ignore],
        [SinglesTiers.ZU, FilterState.Ignore],
        [SinglesTiers.NFE, FilterState.Ignore],
        [SinglesTiers.LC, FilterState.Ignore],
        [SinglesTiers.CAP, FilterState.Exclude],
        [SinglesTiers.CAP_NFE, FilterState.Exclude],
        [SinglesTiers.CAP_LC, FilterState.Exclude],
    ]),

    doubles: new Map<DoublesTiers, FilterState>([
        [DoublesTiers.DUber, FilterState.Ignore],
        [DoublesTiers.DOU, FilterState.Ignore],
        [DoublesTiers.DUU, FilterState.Ignore],
        [DoublesTiers.BelowDUU, FilterState.Ignore],
        [DoublesTiers.NFE, FilterState.Ignore],
        [DoublesTiers.LC, FilterState.Ignore],

    ]),
    natdex: new Map<NatDexTiers, FilterState>([
        [NatDexTiers.AG, FilterState.Ignore],
        [NatDexTiers.Uber, FilterState.Ignore],
        [NatDexTiers.OU, FilterState.Ignore],
        [NatDexTiers.UUBL, FilterState.Ignore],
        [NatDexTiers.UU, FilterState.Ignore],
        [NatDexTiers.RUBL, FilterState.Ignore],
        [NatDexTiers.RU, FilterState.Ignore],
        [NatDexTiers.NFE, FilterState.Ignore],
        [NatDexTiers.LC, FilterState.Ignore],
    ]
    )
}
);
