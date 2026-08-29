import styles from './HeartLine.module.css'

type HeartLineProps = {
  className?: string
  variant?: 'heart' | 'wave'
}

const paths = {
  heart: 'M4 183 C135 211 270 234 405 231 C548 227 675 186 808 180 C930 174 1032 199 1150 209 C1242 217 1305 207 1350 191 C1390 174 1430 143 1430 104 C1430 78 1415 65 1395 65 C1375 65 1361 79 1354 104 C1344 77 1327 64 1306 64 C1280 64 1265 81 1268 104 C1271 143 1304 173 1350 191 C1425 220 1495 225 1577 223 C1760 221 1903 169 2071 121',
  wave: 'M18 151 C135 165 248 166 355 149 C444 135 508 108 576 105 C635 103 663 130 697 145 C730 160 761 153 781 130 C803 105 812 70 841 68 C869 66 884 101 871 125 C858 151 824 159 799 143 C773 126 776 91 803 79 C829 67 858 82 874 107 C902 150 949 165 1011 154 C1138 132 1260 111 1422 123',
} as const

const viewBoxes = {
  heart: { desktop: '0 0 2106 352', mobile: '1030 38 760 230' },
  wave: { desktop: '0 0 1440 240', mobile: '570 38 650 190' },
} as const

export function HeartLine({ className, variant = 'heart' }: HeartLineProps) {
  const path = paths[variant]
  const viewBox = viewBoxes[variant]

  return (
    <span
      aria-hidden="true"
      className={[styles.line, className].filter(Boolean).join(' ')}
      data-variant={variant}
    >
      <svg className={styles.desktop} preserveAspectRatio="xMidYMid meet" viewBox={viewBox.desktop}>
        <path d={path} pathLength="100" />
      </svg>
      <svg className={styles.mobile} preserveAspectRatio="xMidYMid slice" viewBox={viewBox.mobile}>
        <path d={path} pathLength="100" />
      </svg>
    </span>
  )
}
