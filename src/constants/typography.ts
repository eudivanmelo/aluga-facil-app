export const TYPOGRAPHY = {
  'heading/large': {
    fontFamily: 'Inter',
    fontWeight: '700' as const,
    fontSize: 24,
    lineHeight: 29,
  },
  'heading/small': {
    fontFamily: 'Inter',
    fontWeight: '600' as const,
    fontSize: 16,
    lineHeight: 19,
  },
  'body/medium': {
    fontFamily: 'Inter',
    fontWeight: '500' as const,
    fontSize: 14,
    lineHeight: 17,
  },
  'body/small': {
    fontFamily: 'Inter',
    fontWeight: '400' as const,
    fontSize: 12,
    lineHeight: 15,
  },
  'label/tiny': {
    fontFamily: 'Inter',
    fontWeight: '400' as const,
    fontSize: 10,
    lineHeight: 12,
  },
} as const;

export type TypographyVariant = keyof typeof TYPOGRAPHY;