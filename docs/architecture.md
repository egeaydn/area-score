# Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User Browser                        │
│                                                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Next.js App (Client)                  │  │
│  │                                                     │  │
│  │  ┌──────────────┐  ┌─────────────┐               │  │
│  │  │ TurkeyMap    │  │ ProvinceCard │               │  │
│  │  │ Component    │  │   Component  │               │  │
│  │  └──────┬───────┘  └──────┬──────┘               │  │
│  │         │                  │                       │  │
│  │         │   ┌──────────────┴───────────────┐      │  │
│  │         │   │   Custom Hooks (SWR)         │      │  │
│  │         └───┤  • useProvinceInfo           │      │  │
│  │             │  • useWeather                │      │  │
│  │             └──────┬────────────┬──────────┘      │  │
│  │                    │            │                  │  │
│  └────────────────────┼────────────┼─────────────────┘  │
│                       │            │                     │
└───────────────────────┼────────────┼─────────────────────┘
                        │            │
        ┌───────────────┘            └──────────────┐
        │                                           │
        ▼                                           ▼
┌───────────────┐                        ┌──────────────────┐
│  TürkiyeAPI   │                        │  Next.js API     │
│  (External)   │                        │  Route (Proxy)   │
│               │                        │  /api/weather    │
└───────────────┘                        └────────┬─────────┘
                                                  │
                                                  ▼
                                         ┌─────────────────┐
                                         │  OpenWeather    │
                                         │  API (External) │
                                         └─────────────────┘
```

## Data Flow

### 1. Map Interaction Flow

```
User hovers over province
    ↓
turkey-map-react triggers onProvinceHover
    ↓
Parent component receives province name
    ↓
useProvinceInfo(provinceName) hook called
    ↓
SWR checks cache
    ├─ Cache hit → Return cached data immediately
    └─ Cache miss → Fetch from TürkiyeAPI
        ↓
        Store in cache with 1-hour TTL
        ↓
        Return data to component
    ↓
ProvinceCard displays province info
```

### 2. Weather Data Flow

```
Province selected
    ↓
useWeather(cityName) hook called
    ↓
SWR checks cache
    ├─ Cache hit → Return cached data immediately
    └─ Cache miss → Fetch from /api/weather
        ↓
        Next.js API route receives request
        ↓
        Server-side fetch to OpenWeather API
        (API key hidden from client)
        ↓
        Response cached with Cache-Control headers
        (60s max-age, 300s stale-while-revalidate)
        ↓
        Return data to client
    ↓
WeatherWidget displays weather info
```

## Component Hierarchy

```
app/
├── layout.tsx (Root layout)
└── page.tsx (Home page)
    ├── TurkeyMapWrapper
    │   └── TurkeyMap (from turkey-map-react)
    │       └── [Event handlers]
    │
    └── ProvinceCard (conditional render)
        ├── ProvinceInfo
        └── WeatherWidget
```

## State Management

### Local State (React useState)
- Current hovered province
- Current selected province
- UI states (loading, error)

### Server State (SWR)
- Province data cache
- Weather data cache
- Automatic revalidation
- Deduplication

### No Global State Needed
- Simple app, no complex state sharing
- Props drilling is minimal
- Context API not necessary

## Caching Strategy

### Province Data (Long Cache)
```typescript
useSWR(url, fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 3600000, // 1 hour
  revalidateOnReconnect: false
})
```

**Reasoning**: Province data changes rarely (population, districts, etc.)

### Weather Data (Short Cache)
```typescript
useSWR(url, fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 600000, // 10 minutes
  refreshInterval: 300000    // 5 minutes
})
```

**Reasoning**: Weather changes frequently, need fresh data

### API Response Headers
```typescript
res.setHeader(
  'Cache-Control',
  'public, s-maxage=60, stale-while-revalidate=300'
)
```

- `public`: CDN can cache
- `s-maxage=60`: Fresh for 60 seconds
- `stale-while-revalidate=300`: Serve stale for 300s while revalidating

## Error Handling

### API Errors
- Network failures → Show error message, retry button
- 404 Not Found → "Province not found" message
- Rate limiting → Show warning, suggest waiting
- Server errors → Generic error message

### Component Error Boundaries
- Not critical for this app size
- Can add if needed for production

## Performance Optimizations

1. **Request Deduplication**: SWR prevents duplicate requests
2. **Lazy Loading**: Components load on-demand
3. **Memoization**: React.memo for expensive components
4. **Code Splitting**: Next.js automatic code splitting
5. **Image Optimization**: Next.js Image component (if images added)
6. **Prefetching**: Can prefetch popular cities on hover

## Security Considerations

1. **API Key Protection**: OpenWeather key only on server
2. **Rate Limiting**: Proxy prevents direct API abuse
3. **Input Validation**: Sanitize city names before API calls
4. **CORS**: Next.js API routes handle CORS properly
5. **No Sensitive Data**: No user data, no auth needed
