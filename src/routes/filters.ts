import { writable } from "svelte/store";
import { DoublesTiers, NatDexTiers, SinglesTiers } from "./tiers";


export enum FilterState {
    Allow,
    Require,
    Exclude,
}

export enum AttributeKind {
    Stats,
    Weight,
    Height,
    Type,
    Ability,
    EggGroups,
}

type Stat = "hp" | "atk" | "def" | "spa" | "spd" | "spe" | "bst";

export interface StatAttribute {
    kind: AttributeKind.Stats,
    stat: Stat,
    evaluator: (a: number) => boolean
}

export interface WeightAttribute {
    kind: AttributeKind.Weight,
    evaluator: (a: number) => boolean
}

export interface HeightAttribute {
    kind: AttributeKind.Height,
    evaluator: (a: number) => boolean
}

export interface TypeAttribute {
    kind: AttributeKind.Type,
    type: string,
}


export interface AbilityAttribute {
    kind: AttributeKind.Ability,
    ability: string,
}

export interface EggAttribute {
    kind: AttributeKind.EggGroups,
    group: string,

}

export type Attribute = StatAttribute | WeightAttribute | HeightAttribute | TypeAttribute | AbilityAttribute | EggAttribute;

export interface AttributeFilter {
    attribute: Attribute,
    filter: FilterState,
}

interface Filters {
    singles: Map<SinglesTiers, FilterState>,
    doubles: Map<DoublesTiers, FilterState>,
    natdex: Map<NatDexTiers, FilterState>,

    attribute: Map<HTMLElement, AttributeFilter>,
}

export const filters = writable<Filters>({
    singles: new Map<SinglesTiers, FilterState>([
        [SinglesTiers.AG, FilterState.Allow],
        [SinglesTiers.Uber, FilterState.Allow],
        [SinglesTiers.OU, FilterState.Allow],
        [SinglesTiers.UUBL, FilterState.Allow],
        [SinglesTiers.UU, FilterState.Allow],
        [SinglesTiers.RUBL, FilterState.Allow],
        [SinglesTiers.RU, FilterState.Allow],
        [SinglesTiers.NUBL, FilterState.Allow],
        [SinglesTiers.NU, FilterState.Allow],
        [SinglesTiers.PUBL, FilterState.Allow],
        [SinglesTiers.PU, FilterState.Allow],
        [SinglesTiers.ZU, FilterState.Allow],
        [SinglesTiers.NFE, FilterState.Allow],
        [SinglesTiers.LC, FilterState.Allow],
        [SinglesTiers.CAP, FilterState.Exclude],
        [SinglesTiers.CAP_NFE, FilterState.Exclude],
        [SinglesTiers.CAP_LC, FilterState.Exclude],
    ]),

    doubles: new Map<DoublesTiers, FilterState>([
        [DoublesTiers.DUber, FilterState.Allow],
        [DoublesTiers.DOU, FilterState.Allow],
        [DoublesTiers.DUU, FilterState.Allow],
        [DoublesTiers.BelowDUU, FilterState.Allow],

    ]),
    natdex: new Map<NatDexTiers, FilterState>([
        [NatDexTiers.AG, FilterState.Allow],
        [NatDexTiers.Uber, FilterState.Allow],
        [NatDexTiers.OU, FilterState.Allow],
        [NatDexTiers.UUBL, FilterState.Allow],
        [NatDexTiers.UU, FilterState.Allow],
        [NatDexTiers.RUBL, FilterState.Allow],
        [NatDexTiers.RU, FilterState.Allow],
        [NatDexTiers.NFE, FilterState.Allow],
        [NatDexTiers.LC, FilterState.Allow],
    ]),
    attribute: new Map()
}
);
