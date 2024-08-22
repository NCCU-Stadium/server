export class BodyVerificationError extends Error {}

interface BodyRequiredRaw {
  title: string
  timeSlot: 'Morning' | 'Afternoon' | 'Night'
  weekday:
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday'
  courseType: 'Group' | 'Private'
  duration: number
  weeks: number
  max: number
  content: string
  startDay: string
  fee: number
  timeIdx: number[]
  usedTableId: number[]
  coachEmail: string[]
}

type BodyOptionalRaw = Partial<BodyRequiredRaw>

type BodyRequired = Omit<BodyRequiredRaw, 'startDay'> & { startDay: Date }

type BodyOptional = Omit<BodyOptionalRaw, 'startDay'> & { startDay?: Date }

export function checkBody<T extends BodyRequiredRaw>(
  body: T,
  allRequired: true
): BodyRequired
export function checkBody<T extends BodyOptionalRaw>(
  body: T,
  allRequired: false
): BodyOptional
export function checkBody<T extends BodyOptionalRaw | BodyRequiredRaw>(
  body: T,
  allRequired: boolean
) {
  if (typeof body !== 'object' || body === null) {
    throw new BodyVerificationError('body must be an object')
  }
  if (
    (allRequired || body.title !== undefined) &&
    typeof body.title !== 'string'
  ) {
    throw new BodyVerificationError('title must be a string')
  }
  if (
    (allRequired || body.timeSlot !== undefined) &&
    ['Morning', 'Afternoon', 'Night'].indexOf(body.timeSlot as string) === -1
  ) {
    throw new BodyVerificationError(
      'timeSlot must be one of Morning, Afternoon or Night'
    )
  }
  if (
    (allRequired || body.weekday !== undefined) &&
    [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ].indexOf(body.weekday as string) === -1
  ) {
    throw new BodyVerificationError(
      'weekday must be one of Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday'
    )
  }
  if (
    (allRequired || body.courseType !== undefined) &&
    ['Group', 'Private'].indexOf(body.courseType as string) === -1
  ) {
    throw new BodyVerificationError('courseType must be a string')
  }
  if (
    (allRequired || body.duration !== undefined) &&
    (typeof body.duration !== 'number' ||
      !Number.isInteger(body.duration) ||
      body.duration <= 0)
  ) {
    throw new BodyVerificationError('duration must be a positive number')
  }
  if (
    (allRequired || body.weeks !== undefined) &&
    (typeof body.weeks !== 'number' ||
      !Number.isInteger(body.weeks) ||
      body.weeks <= 0)
  ) {
    throw new BodyVerificationError('weeks must be a positive integer')
  }
  if (
    (allRequired || body.max !== undefined) &&
    (typeof body.max !== 'number' ||
      !Number.isInteger(body.max) ||
      body.max <= 0)
  ) {
    throw new BodyVerificationError('max must be a positive integer')
  }
  if (
    (allRequired || body.content !== undefined) &&
    (typeof body.content !== 'string' || body.content.length === 0)
  ) {
    throw new BodyVerificationError('content must be a non-empty string')
  }
  if (
    (allRequired || body.startDay !== undefined) &&
    (typeof body.startDay !== 'string' ||
      body.startDay.length === 0 ||
      /^\d{4}-\d{2}-\d{2}$/.test(body.startDay) === false)
  ) {
    throw new BodyVerificationError(
      'startDay must be a non-empty string in the format YYYY-MM-DD'
    )
  } else if (body.startDay !== undefined) {
    // @ts-ignore
    body.startDay = new Date(body.startDay)
  }
  if (
    (allRequired || body.fee !== undefined) &&
    (typeof body.fee !== 'number' ||
      !Number.isInteger(body.fee) ||
      body.fee < 0)
  ) {
    throw new BodyVerificationError('fee must be a positive integer')
  }
  if (
    (allRequired || body.timeIdx !== undefined) &&
    (!Array.isArray(body.timeIdx) ||
      body.timeIdx.length === 0 ||
      body.timeIdx.some(
        (x: unknown) => typeof x !== 'number' || !Number.isInteger(x) || x < 0
      ))
  ) {
    throw new BodyVerificationError(
      'timeIdx must be an array of positive integers'
    )
  }
  if (
    (allRequired || body.usedTableId !== undefined) &&
    (!Array.isArray(body.usedTableId) ||
      body.usedTableId.length === 0 ||
      body.usedTableId.some(
        (x: unknown) => typeof x !== 'number' || !Number.isInteger(x) || x < 0
      ))
  ) {
    throw new BodyVerificationError(
      'usedTableId must be an array of positive integers'
    )
  }
  if (
    (allRequired || body.coachEmail) &&
    (!Array.isArray(body.coachEmail) ||
      body.coachEmail.length === 0 ||
      body.coachEmail.some(
        (x: unknown) =>
          typeof x !== 'string' ||
          x.length === 0 ||
          /^\S+@\S+\.\S+$/.test(x) === false
      ))
  ) {
    throw new BodyVerificationError('coachEmail must be an array of strings')
  }
  return body
}

export function weekday2num(weekday: string): number {
  switch (weekday) {
    case 'Monday':
      return 1
    case 'Tuesday':
      return 2
    case 'Wednesday':
      return 3
    case 'Thursday':
      return 4
    case 'Friday':
      return 5
    case 'Saturday':
      return 6
    case 'Sunday':
      return 0
    default:
      throw new Error('Invalid weekday')
  }
}
