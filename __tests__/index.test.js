import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a shubhashita when props are provided', () => {
    const mockShubhashita = {
      sanskrit: 'Test Sanskrit',
      translation: 'Test Translation'
    }
    const mockLanguage = 'en'

    render(<Home shubhashita={mockShubhashita} language={mockLanguage} />)

    const sanskritHeading = screen.getByRole('heading', {
      name: /Test Sanskrit/i,
    })
    const translationText = screen.getByText(/Test Translation/i)

    expect(sanskritHeading).toBeInTheDocument()
    expect(translationText).toBeInTheDocument()
  })

  it('renders fallback when props are missing', () => {
    render(<Home />)

    const fallbackHeading = screen.getByRole('heading', {
      name: /Hello Next\.js/i,
    })

    expect(fallbackHeading).toBeInTheDocument()
  })
})
