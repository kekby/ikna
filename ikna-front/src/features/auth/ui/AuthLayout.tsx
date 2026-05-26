import type { PropsWithChildren } from 'react'

type AuthLayoutProps = PropsWithChildren<{
  title: string
  description: string
}>

export const AuthLayout = ({
  children,
  description,
  title,
}: AuthLayoutProps) => {
  return (
    <main className="auth-page">
      <section className="auth-hero" aria-labelledby="auth-title">
        <div className="auth-hero__content">
          <p className="eyebrow">IKNA Cards</p>
          <h1 id="auth-title">{title}</h1>
          <p>{description}</p>
        </div>
      </section>
      <section className="auth-panel" aria-label="Форма авторизации">
        {children}
      </section>
    </main>
  )
}
