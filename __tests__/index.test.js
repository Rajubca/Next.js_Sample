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

  it('renders error message when data fetching fails', () => {
    render(<Home shubhashita={null} language="en" />)

    const errorHeading = screen.getByRole('heading', {
      name: /Error Loading Shubhashita/i,
    })

    expect(errorHeading).toBeInTheDocument()
  })

  it('renders Indian language translation correctly', () => {
    const mockShubhashita = {
      sanskrit: 'सत्यमेव जयते',
      translation: 'ਸੱਚ ਦੀ ਹੀ ਜਿੱਤ ਹੁੰਦੀ ਹੈ' // Punjabi
    }
    const mockLanguage = 'pa'

    render(<Home shubhashita={mockShubhashita} language={mockLanguage} />)

    const translationText = screen.getByText(/ਸੱਚ ਦੀ ਹੀ ਜਿੱਤ ਹੁੰਦੀ ਹੈ/i)
    const languageLabel = screen.getByText(/Translation \(pa\):/i)

    expect(translationText).toBeInTheDocument()
    expect(languageLabel).toBeInTheDocument()
  })
})
