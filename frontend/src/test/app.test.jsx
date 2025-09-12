import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App.jsx'

describe('App', () => {
  it('renders main heading', () => {
    render(<App />)
    expect(screen.getByText('ResumeAI')).toBeInTheDocument()
  })

  it('renders upload and history tabs', () => {
    render(<App />)
    expect(screen.getByText('Upload Resume')).toBeInTheDocument()
    expect(screen.getByText('Analysis History')).toBeInTheDocument()
  })
})