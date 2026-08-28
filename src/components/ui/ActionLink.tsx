import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon.tsx'
import styles from './ActionLink.module.css'

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  tone?: 'primary' | 'secondary' | 'light'
  withArrow?: boolean
}

export function ActionLink({
  children,
  className,
  tone = 'primary',
  withArrow = false,
  ...props
}: ActionLinkProps) {
  return (
    <a
      className={[styles.link, styles[tone], className].filter(Boolean).join(' ')}
      {...props}
    >
      <span>{children}</span>
      {withArrow ? <Icon name="arrow" width="1.1rem" /> : null}
    </a>
  )
}
