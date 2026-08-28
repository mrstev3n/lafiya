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
}
