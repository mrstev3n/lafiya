import styles from './HeartLine.module.css'

type HeartLineProps = {
  className?: string
}

export function HeartLine({ className }: HeartLineProps) {
  return (
    <svg
      aria-hidden="true"
      className={[styles.line, className].filter(Boolean).join(' ')}
      preserveAspectRatio="none"
      viewBox="0 0 1200 180"
    >
      <path d="M0 142C183 155 326 154 454 133C548 118 626 87 689 72C738 60 771 70 786 93C798 111 794 135 775 139C750 143 728 112 742 84C754 59 783 49 806 62C824 72 834 94 829 115C824 139 847 144 874 139C970 122 1061 119 1200 126" />
    </svg>
  )
}
