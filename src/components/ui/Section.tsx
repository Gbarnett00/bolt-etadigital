import { ReactNode } from 'react';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Section({
  children,
  className = '',
  containerSize = 'xl',
  spacing = 'lg'
}: SectionProps) {
  const spacingStyles = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-20',
    lg: 'py-20 md:py-24',
    xl: 'py-24 md:py-32',
  };

  return (
    <section className={`overflow-x-hidden ${spacingStyles[spacing]} ${className}`}>
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}
