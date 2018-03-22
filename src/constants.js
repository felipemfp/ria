export const PER_PAGE = 10

export const CLASSIFICATION = { 
  APPROVED: 1,
  REPROVED: 2,
  DROPOUT: 3
}

export const DATASETS = {
    GERAL: 'geral',
    FIC: 'fic',
    TECNOLOGIA: 'tecnologia'
}

export const DATASET_GROUPS = {
  GERAL: [DATASETS.GERAL],
  ESPECIFICOS: [DATASETS.FIC, DATASETS.TECNOLOGIA]
}

export const MINIMUM_WAGE = 937