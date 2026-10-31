export const contactFields = ['name', 'phone', 'email', 'area'] as const
export type ContactField = (typeof contactFields)[number]

export type ContactError =
  | 'nameRequired'
  | 'nameInvalid'
  | 'phoneRequired'
  | 'phoneInvalid'
  | 'emailRequired'
  | 'emailInvalid'
  | 'areaRequired'

const NAME = /^\p{L}[\p{L}\p{M} .'’-]*\p{L}\.?$/u
const PHONE_CHARS = /^\+?[\d\s().-]+$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Con `+` admite cualquier país (E.164), porque Brownsville es frontera; sin él, formato de EE. UU.
function isPhone(value: string) {
  if (!PHONE_CHARS.test(value)) return false
  const digits = value.replace(/\D/g, '')
  if (value.startsWith('+')) return digits.length >= 8 && digits.length <= 15
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'))
}

export function validateContactField(
  field: ContactField,
  rawValue: string,
): ContactError | undefined {
  const value = rawValue.trim()

  switch (field) {
    case 'name':
      if (!value) return 'nameRequired'
      return NAME.test(value) ? undefined : 'nameInvalid'
    case 'phone':
      if (!value) return 'phoneRequired'
      return isPhone(value) ? undefined : 'phoneInvalid'
    case 'email':
      if (!value) return 'emailRequired'
      return EMAIL.test(value) ? undefined : 'emailInvalid'
    case 'area':
      return value ? undefined : 'areaRequired'
  }
}
