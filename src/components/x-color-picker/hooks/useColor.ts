import { TinyColor } from '@ctrl/tinycolor'
import type { Color } from '../types/x-color-picker'

export function useColor() {
  const transformColor = (data: TinyColor | string, alpha = 1): Color => {
    if (typeof data === 'string') {
      data = new TinyColor(data)
      data.setAlpha(alpha)
    }
    return {
      hsl: data.toHslString(),
      hex: data.toHexString(),
      rgb: data.toRgbString(),
      hsv: data.toHsvString(),
      origin: data,
      // oldHue: data.h || oldHue || hsl.h,
      // source: data.source,
    }
  }

  const formatHexString = (hex: string): string => {
    return hex.replace(/^#/, '').toUpperCase()
  }

  const formatAlphaString = (alpha: number): string => {
    return `${alpha * 100}%`
  }

  const isValidateColorStr = (str: string) => {
    return new TinyColor(str).isValid
  }

  const getContrastingColor = (data: string) => {
    if (!data) {
      return '#fff'
    }
    const col = new TinyColor(data)
    if (col.getAlpha() < 0.3) {
      return 'rgba(0,0,0,0.8)'
    }
    const yiq = (col.toRgb().r * 299 + col.toRgb().g * 587 + col.toRgb().b * 114) / 1000
    return yiq >= 150 ? '#000' : '#fff' // original threshold 128, adjust to match design (more white check)
  }

  return {
    transformColor,
    formatHexString,
    formatAlphaString,
    isValidateColorStr,
    getContrastingColor,
  }
}
