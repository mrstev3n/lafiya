export type LocationsTuning = {
  focus: {
    overviewZoom: number
    activeZoom: number
    x: number
    y: number
  }
  fade: {
    mode: 'linear' | 'radial'
    color: string
    leftOpacity: number
    leftEnd: number
    verticalEnd: number
    rightEnd: number
    radialX: number
    radialY: number
    radialOpening: number
    radialSoftness: number
    radialOpacity: number
  }
}

export const defaultLocationsTuning: LocationsTuning = {
  focus: {
    overviewZoom: 1,
    activeZoom: 1.5,
    x: 50,
    y: 40,
  },
  fade: {
    mode: 'radial',
    color: '#f7f4f2',
    leftOpacity: 0.96,
    leftEnd: 0,
    verticalEnd: 0,
    rightEnd: 0,
    radialX: 85,
    radialY: 52,
    radialOpening: 48,
    radialSoftness: 18,
    radialOpacity: 1,
  },
}
