import { NextResponse } from 'next/server'

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  topics: string[]
  updated_at: string
  fork: boolean
}

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME || 'mohdzaid'
    const token = process.env.GITHUB_TOKEN

    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=20`,
      { headers }
    )

    if (!response.ok) {
      throw new Error('GitHub API error')
    }

    const repos: GitHubRepo[] = await response.json()

    const normalizedRepos = repos
      .filter(repo => !repo.fork)
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description',
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
        topics: repo.topics || [],
        updatedAt: repo.updated_at,
      }))

    return NextResponse.json({ repos: normalizedRepos })
  } catch (error) {
    console.error('GitHub fetch error:', error)
    return NextResponse.json({ 
      repos: [],
      error: 'Failed to fetch GitHub repos'
    }, { status: 500 })
  }
}
