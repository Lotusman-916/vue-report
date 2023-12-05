import type { TinyColor } from '@ctrl/tinycolor'
export interface RGB {
  r: number
  g: number
  b: number
}

export interface RGBA extends RGB {
  a: number
}

export interface HSL {
  h: number
  s: number
  l: number
}

export interface HSLA extends HSL {
  a: number
}

export interface HSV {
  h: number
  s: number
  v: number
}

export interface HSVA extends HSV {
  a: number
}

export interface Color {
  hex: string
  rgb: string
  hsl: string
  hsv: string
  oldHue?: number
  source?: string
  origin?: TinyColor
}

export interface ColorEvent {
  e: Event
  color: Color
}

export abstract class ColorPickerBaseService {
  public abstract setCustomColors(colors: string[]): void

  public abstract getCustomColors(): string[]
}
