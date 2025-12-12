// Weather API proxy route
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.OPENWEATHER_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city') || 'Istanbul';

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)},TR&appid=${API_KEY}&units=metric&lang=tr`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Weather data fetch failed' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Set cache headers for optimal performance
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
