export class BodyVerificationError extends Error { }

export function checkBody(body: any, allRequired: boolean) {
  if (typeof body !== 'object') {
    throw new BodyVerificationError('body must be an object');
  }
  if ((allRequired || body.title !== undefined) &&
    (typeof body.title !== "string")
  ) {
    throw new BodyVerificationError("title must be a string");
  }
  if ((allRequired || body.timeSlot !== undefined) &&
    (typeof body.timeSlot !== 'number' || !Number.isInteger(body.timeSlot) || body.timeSlot < 0)
  ) {
    throw new BodyVerificationError('timeSlot must be an integer');
  }
  if ((allRequired || body.weekday !== undefined) &&
    (['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(body.weekday) === -1)
  ) {
    throw new BodyVerificationError('weekday must be one of Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
  }
  if ((allRequired || body.courseType !== undefined) &&
    (['group', 'private'].indexOf(body.courseType) === -1)
  ) {
    throw new BodyVerificationError('courseType must be a string');
  }
  if ((allRequired || body.duration !== undefined) &&
    (typeof body.duration !== 'number' || body.duration <= 0)
  ) {
    throw new BodyVerificationError('duration must be a positive number');
  }
  if ((allRequired || body.weeks !== undefined) &&
    (typeof body.weeks !== 'number' || !Number.isInteger(body.weeks) || body.weeks <= 0)
  ) {
    throw new BodyVerificationError('weeks must be a positive integer');
  }
  if ((allRequired || body.max !== undefined) &&
    (typeof body.max !== 'number' || !Number.isInteger(body.max) || body.max <= 0)
  ) {
    throw new BodyVerificationError('max must be a positive integer');
  }
  if ((allRequired || body.content !== undefined) &&
    (typeof body.content !== 'string' || body.content.length === 0)
  ) {
    throw new BodyVerificationError('content must be a non-empty string');
  }
  if ((allRequired || body.startDay !== undefined) &&
    (typeof body.startDay !== 'string' || body.startDay.length === 0 || /^\d{4}-\d{2}-\d{2}$/.test(body.startDay) === false)
  ) {
    throw new BodyVerificationError('startDay must be a non-empty string in the format YYYY-MM-DD');
  }
  if ((allRequired || body.fee !== undefined) &&
    (typeof body.fee !== 'number' || !Number.isInteger(body.fee) || body.fee < 0)
  ) {
    throw new BodyVerificationError('fee must be a positive integer');
  }
  if ((allRequired || body.timeIdx !== undefined) &&
    (!Array.isArray(body.timeIdx) || body.timeIdx.length === 0 ||
      body.timeIdx.some((x: unknown) => typeof x !== 'number' || !Number.isInteger(x) || x < 0))
  ) {
    throw new BodyVerificationError('timeIdx must be an array of positive integers');
  }
  if ((allRequired || body.usedTableId !== undefined) &&
    (!Array.isArray(body.usedTableId) || body.usedTableId.length === 0 ||
      body.usedTableId.some((x: unknown) => typeof x !== 'number' || !Number.isInteger(x) || x < 0))
  ) {
    throw new BodyVerificationError('usedTableId must be an array of positive integers');
  }
  if ((allRequired || body.coachEmail) &&
    (!Array.isArray(body.coachEmail) || body.coachEmail.length === 0 ||
      body.coachEmail.some((x: unknown) => typeof x !== 'string' || x.length === 0 || /^\S+@\S+\.\S+$/.test(x) === false))
  ) {
    throw new BodyVerificationError('coachEmail must be an array of strings');
  }
}