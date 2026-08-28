export type HeroTuning = {
  photo: {
    scale: number
    x: number
    y: number
  }
  shade: {
    startColor: string
    startOpacity: number
    solidEnd: number
    midColor: string
    midOpacity: number
    midPosition: number
    softColor: string
    softOpacity: number
    softPosition: number
    end: number
  }
  composition: {
    x: number
    y: number
  }
  signature: {
    x: number
    y: number
    stroke: number
  }
  tablet: {
    photoScale: number
    photoX: number
    photoY: number
    shadeColor: string
    shadeStartOpacity: number
    shadeEndOpacity: number
    compositionX: number
    compositionY: number
    signatureX: number
    signatureY: number
    signatureStroke: number
  }
  mobile: {
    photoScale: number
    photoX: number
    photoY: number
    shadeColor: string
    shadeStartOpacity: number
    shadeEndOpacity: number
    compositionX: number
    compositionY: number
    signatureX: number
    signatureY: number
    signatureStroke: number
  }
}
