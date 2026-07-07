const BEST_FOR_LABELS = {
  quick: 'Quick lunch',
  lunch: 'Quick lunch',
  breakfast: 'Quick breakfast',
  cheap: 'Cheap eats',
  budget: 'Cheap eats',
  'late night': 'Late night',
  late: 'Late night',
  night: 'Late night',
  hangout: 'Group hangout',
  'group hangout': 'Group hangout',
  study: 'Study session',
  'treat yourself': 'Treat yourself',
  premium: 'Treat yourself',
  dinner: 'Dinner plans',
  'sit-down': 'Sit-down meal',
  filling: 'Filling meal',
  healthy: 'Healthy pick',
}

export function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
}

export function getBestForLabels(spot) {
  const source = Array.isArray(spot?.bestFor) && spot.bestFor.length > 0 ? spot.bestFor : spot?.tags || []
  const labels = source
    .map((value) => BEST_FOR_LABELS[normalizeText(value)] || value)
    .filter(Boolean)

  return [...new Set(labels)]
}

export function buildSearchSuggestions(spots = []) {
  const suggestions = spots.flatMap((spot) => [
    spot?.name,
    spot?.cuisine,
    ...(spot?.tags || []),
    ...getBestForLabels(spot),
  ])

  return [...new Set(suggestions.filter(Boolean))].sort((left, right) => left.localeCompare(right))
}

export function estimateWalkingMinutes(distance) {
  if (!distance) return Number.POSITIVE_INFINITY

  const match = String(distance).match(/\d+(?:\.\d+)?/)
  if (!match) return Number.POSITIVE_INFINITY

  const blocks = Number.parseFloat(match[0])
  if (Number.isNaN(blocks)) return Number.POSITIVE_INFINITY

  return blocks * 4
}

export function isSpotOpen(hours, referenceDate = new Date()) {
  if (!hours || String(hours).toLowerCase() === 'closed') return false

  try {
    const currentMinutes = referenceDate.getHours() * 60 + referenceDate.getMinutes()
    const [startStr, endStr] = String(hours).split('-')
    if (!startStr || !endStr) return false

    const parseTimeToMinutes = (timeStr) => {
      const cleanStr = timeStr.trim().toUpperCase()
      const isPM = cleanStr.includes('PM')
      const isAM = cleanStr.includes('AM')

      const timeParts = cleanStr.replace(/[AMP]/g, '').trim().split(':')
      let hoursValue = Number.parseInt(timeParts[0], 10)
      let minutesValue = timeParts[1] ? Number.parseInt(timeParts[1], 10) : 0

      if (Number.isNaN(hoursValue) || Number.isNaN(minutesValue)) return Number.NaN

      if (isPM && hoursValue !== 12) hoursValue += 12
      if (isAM && hoursValue === 12) hoursValue = 0

      return hoursValue * 60 + minutesValue
    }

    const startMinutes = parseTimeToMinutes(startStr)
    const endMinutes = parseTimeToMinutes(endStr)
    if (Number.isNaN(startMinutes) || Number.isNaN(endMinutes)) return false

    if (endMinutes < startMinutes) {
      return currentMinutes >= startMinutes || currentMinutes <= endMinutes
    }

    return currentMinutes >= startMinutes && currentMinutes <= endMinutes
  } catch (error) {
    return false
  }
}
