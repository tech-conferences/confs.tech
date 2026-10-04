import React, { useEffect, useMemo, useRef, useState } from 'react'
import { connectInfiniteHits } from 'react-instantsearch-dom'
import { Conference } from 'types/conference'

import styles from './ConferenceMap.module.scss'

interface Props {
  hits: Conference[]
}

interface Coordinates {
  lat: number
  lng: number
}

interface CityGroup {
  key: string
  city: string
  country: string
  conferences: Conference[]
  coordinates?: Coordinates
}

interface LeafletMap {
  setView(center: [number, number], zoom: number): LeafletMap
  invalidateSize(): void
  remove(): void
}

interface LeafletLayerGroup {
  addTo(map: LeafletMap): LeafletLayerGroup
  clearLayers(): void
}

interface LeafletMarker {
  bindPopup(content: HTMLElement): LeafletMarker
  addTo(group: LeafletLayerGroup): LeafletMarker
  options?: { conferenceCount?: number }
}

interface LeafletCluster {
  getAllChildMarkers(): LeafletMarker[]
}

interface LeafletApi {
  map(element: HTMLElement, options: { scrollWheelZoom: boolean }): LeafletMap
  tileLayer(
    url: string,
    options: { maxZoom: number; attribution: string },
  ): { addTo(map: LeafletMap): void }
  layerGroup(): LeafletLayerGroup
  markerClusterGroup(options: {
    showCoverageOnHover: boolean
    chunkedLoading: boolean
    maxClusterRadius: number
    iconCreateFunction(cluster: LeafletCluster): unknown
  }): LeafletLayerGroup
  divIcon(options: {
    className: string
    html: string
    iconSize: [number, number]
    iconAnchor: [number, number]
  }): unknown
  marker(
    coordinates: [number, number],
    options: { icon: unknown; title: string; conferenceCount: number },
  ): LeafletMarker
}

declare global {
  interface Window {
    L?: LeafletApi
    __leafletLoading?: Promise<LeafletApi>
  }
}

const GEOCODE_CACHE_KEY = 'confs-tech-city-coordinates-v1'
const geocodeRequests = new Map<string, Promise<Coordinates | null>>()

const ConferenceMap: React.FC<Props> = ({ hits }) => {
  const [expanded, setExpanded] = useState(false)
  const [coordinatesByCity, setCoordinatesByCity] = useState<
    Record<string, Coordinates>
  >({})
  const [mapError, setMapError] = useState(false)
  const [lookupProgress, setLookupProgress] = useState({ done: 0, total: 0 })
  const mapElement = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<LeafletMap | null>(null)
  const markersLayer = useRef<LeafletLayerGroup | null>(null)

  const cityGroups = useMemo(() => {
    const groups = new Map<string, CityGroup>()
    hits.forEach((conference) => {
      const city = conference.city?.trim()
      const country = conference.country?.trim()
      if (!city || !country || city.toLowerCase() === 'online') return

      const key = `${city.toLocaleLowerCase()},${country.toLocaleLowerCase()}`
      const group = groups.get(key) || {
        key,
        city,
        country,
        conferences: [],
      }
      group.conferences.push(conference)
      if (isValidLocation(conference._geoloc)) {
        group.coordinates = conference._geoloc
      }
      groups.set(key, group)
    })
    return Array.from(groups.values())
  }, [hits])

  useEffect(() => {
    let active = true
    const cache = readCoordinateCache()
    const available: Record<string, Coordinates> = { ...cache }
    let remaining = 0
    cityGroups.forEach((group) => {
      const coordinates = group.coordinates || cache[group.key]
      if (coordinates) available[group.key] = coordinates
      else remaining += 1
    })
    setCoordinatesByCity(available)
    setLookupProgress({ done: 0, total: remaining })

    const missing = cityGroups.filter(
      (group) => !group.coordinates && !cache[group.key],
    )
    let nextIndex = 0
    const workers = Array.from(
      { length: Math.min(3, missing.length) },
      async () => {
        while (active && nextIndex < missing.length) {
          const group = missing[nextIndex++]
          const coordinates = await geocodeCity(group)
          if (!active) return
          if (coordinates) {
            cache[group.key] = coordinates
            setCoordinatesByCity((current) => ({
              ...current,
              [group.key]: coordinates,
            }))
          }
          setLookupProgress((current) => ({
            ...current,
            done: current.done + 1,
          }))
          writeCoordinateCache(cache)
        }
      },
    )
    void Promise.all(workers)

    return () => {
      active = false
    }
  }, [cityGroups])

  const locatedGroups = useMemo(
    () =>
      cityGroups
        .map((group) => ({
          ...group,
          coordinates: group.coordinates || coordinatesByCity[group.key],
        }))
        .filter((group): group is CityGroup & { coordinates: Coordinates } =>
          Boolean(group.coordinates),
        ),
    [cityGroups, coordinatesByCity],
  )
  const locatedGroupsRef = useRef(locatedGroups)
  locatedGroupsRef.current = locatedGroups

  useEffect(() => {
    let active = true
    const renderMap = async () => {
      if (!mapElement.current) return
      try {
        const leaflet = await loadLeaflet()
        if (!active || !mapElement.current) return

        const map = leaflet
          .map(mapElement.current, { scrollWheelZoom: false })
          .setView([20, 0], 2)
        mapInstance.current = map
        leaflet
          .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
          })
          .addTo(map)
        const layer = leaflet
          .markerClusterGroup({
            showCoverageOnHover: false,
            chunkedLoading: true,
            maxClusterRadius: 65,
            iconCreateFunction: (cluster) => {
              const count = cluster
                .getAllChildMarkers()
                .reduce(
                  (total, marker) =>
                    total + (marker.options?.conferenceCount || 1),
                  0,
                )
              return leaflet.divIcon({
                className: styles.ClusterMarker,
                html: `<span class="${styles.ClusterPill}">${count}</span>`,
                iconSize: [48, 48],
                iconAnchor: [24, 24],
              })
            },
          })
          .addTo(map)
        markersLayer.current = layer
        renderMarkers(leaflet, layer, locatedGroupsRef.current)
      } catch {
        if (active) setMapError(true)
      }
    }
    void renderMap()
    return () => {
      active = false
      markersLayer.current = null
      mapInstance.current?.remove()
      mapInstance.current = null
    }
  }, [])

  useEffect(() => {
    const leaflet = window.L
    const layer = markersLayer.current
    if (!leaflet || !layer) return
    renderMarkers(leaflet, layer, locatedGroups)
  }, [locatedGroups])

  useEffect(() => {
    if (!expanded) return
    const timer = window.setTimeout(
      () => mapInstance.current?.invalidateSize(),
      250,
    )
    return () => window.clearTimeout(timer)
  }, [expanded])

  const mappedConferenceCount = locatedGroups.reduce(
    (total, group) => total + group.conferences.length,
    0,
  )

  return (
    <section className={styles.MapSection} aria-label='Conference map'>
      <div className={styles.MapHeader}>
        <div>
          <h2>Explore conferences on the map</h2>
          <p>
            {mapError
              ? 'The map could not be loaded. Check your connection and reload.'
              : `${mappedConferenceCount} conferences across ${locatedGroups.length} cities`}
            {!mapError &&
              lookupProgress.done < lookupProgress.total &&
              ` · Locating cities (${lookupProgress.done}/${lookupProgress.total})`}
          </p>
        </div>
        <button
          type='button'
          className={styles.ExpandButton}
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? 'Collapse map' : 'Expand map'}
        </button>
      </div>

      <div
        className={`${styles.MapViewport} ${expanded ? styles.Expanded : ''}`}
      >
        <div ref={mapElement} className={styles.MapCanvas} />
      </div>
    </section>
  )
}

function isValidLocation(
  location?: Conference['_geoloc'],
): location is NonNullable<Conference['_geoloc']> {
  return Boolean(
    location &&
      Number.isFinite(location.lat) &&
      Number.isFinite(location.lng) &&
      Math.abs(location.lat) <= 90 &&
      Math.abs(location.lng) <= 180,
  )
}

function readCoordinateCache(): Record<string, Coordinates> {
  try {
    return JSON.parse(localStorage.getItem(GEOCODE_CACHE_KEY) || '{}')
  } catch {
    return {}
  }
}

function writeCoordinateCache(cache: Record<string, Coordinates>) {
  try {
    localStorage.setItem(GEOCODE_CACHE_KEY, JSON.stringify(cache))
  } catch {
    // Storage can be unavailable in private browsing; the map still works.
  }
}

function geocodeCity(group: CityGroup): Promise<Coordinates | null> {
  const existing = geocodeRequests.get(group.key)
  if (existing) return existing

  const request = fetch(
    `https://photon.komoot.io/api/?q=${encodeURIComponent(
      `${group.city}, ${group.country}`,
    )}&limit=5&lang=en`,
  )
    .then(async (response) => {
      if (!response.ok) return null
      const result = (await response.json()) as {
        features?: Array<{
          geometry?: { coordinates?: [number, number] }
          properties?: { country?: string; city?: string; name?: string }
        }>
      }
      const candidates = (result.features || []).filter((candidate) => {
        const point = candidate.geometry?.coordinates
        return (
          point &&
          point.length === 2 &&
          Number.isFinite(point[0]) &&
          Number.isFinite(point[1])
        )
      })
      const city = group.city.toLocaleLowerCase()
      const feature =
        candidates.find((candidate) => {
          const name = candidate.properties?.city || candidate.properties?.name
          return name?.toLocaleLowerCase() === city
        }) || candidates[0]
      const point = feature?.geometry?.coordinates
      return point ? { lat: point[1], lng: point[0] } : null
    })
    .catch(() => null)
  geocodeRequests.set(group.key, request)
  return request
}

function createPopup(group: CityGroup): HTMLElement {
  const content = document.createElement('div')
  content.className = styles.Popup
  const header = document.createElement('header')
  header.className = styles.PopupHeader
  const heading = document.createElement('h3')
  heading.className = styles.PopupTitle
  heading.textContent = `${group.city}, ${group.country}`
  const summary = document.createElement('span')
  summary.className = styles.PopupSummary
  summary.textContent = `${group.conferences.length} ${group.conferences.length === 1 ? 'conference' : 'conferences'}`
  header.append(heading, summary)
  content.appendChild(header)

  const list = document.createElement('ul')
  list.className = styles.PopupList
  group.conferences.forEach((conference) => {
    const item = document.createElement('li')
    item.className = styles.PopupListItem
    const link = document.createElement('a')
    link.href = conference.url
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.textContent = conference.name
    item.appendChild(link)
    list.appendChild(item)
  })
  content.appendChild(list)
  return content
}

function renderMarkers(
  leaflet: LeafletApi,
  layer: LeafletLayerGroup,
  groups: Array<CityGroup & { coordinates: Coordinates }>,
) {
  layer.clearLayers()
  groups.forEach((group) => {
    const count = group.conferences.length
    const marker = leaflet.marker(
      [group.coordinates.lat, group.coordinates.lng],
      {
        title: `${group.city}, ${group.country}: ${count} conferences`,
        conferenceCount: count,
        icon: leaflet.divIcon({
          className: styles.CityMarker,
          html: `<span class="${styles.MarkerPill}"><span class="${styles.PillCity}">${escapeHtml(group.city)}</span><span class="${styles.PillCount}">${count}</span></span>`,
          iconSize: [Math.min(190, 64 + group.city.length * 7), 38],
          iconAnchor: [Math.min(190, 64 + group.city.length * 7) / 2, 38],
        }),
      },
    )
    marker.bindPopup(createPopup(group)).addTo(layer)
  })
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return entities[character]
  })
}

function loadLeaflet(): Promise<LeafletApi> {
  if (window.L) return Promise.resolve(window.L)
  if (window.__leafletLoading) return window.__leafletLoading

  window.__leafletLoading = new Promise<LeafletApi>((resolve, reject) => {
    addStylesheet(
      'leaflet-css',
      'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    )
    addStylesheet(
      'leaflet-markercluster-css',
      'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css',
    )
    loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js')
      .then(() =>
        loadScript(
          'https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js',
        ),
      )
      .then(() => {
        if (window.L?.markerClusterGroup) resolve(window.L)
        else reject(new Error('Leaflet marker clustering did not initialize'))
      })
      .catch(reject)
  }).catch((error) => {
    window.__leafletLoading = undefined
    throw error
  })
  return window.__leafletLoading
}

function addStylesheet(id: string, href: string) {
  if (document.getElementById(id)) return
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    )
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve()
      else {
        existing.addEventListener('load', () => resolve(), { once: true })
        existing.addEventListener('error', () => reject(new Error(src)), {
          once: true,
        })
      }
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => {
      script.dataset.loaded = 'true'
      resolve()
    }
    script.onerror = () => reject(new Error(src))
    document.body.appendChild(script)
  })
}

export default connectInfiniteHits(ConferenceMap)
