import { validate as validateUuid } from "uuid"
import { InvalidUuidError, Uuid } from "../value-objects/uuid.vo"

describe('Uuid Unit Tests', () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate')

  test("should throw error when uuid is invalid", () => {

    expect(() => {
      new Uuid('Invalid-uuid')
    }).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test('should create a valid uuid', () => {
    const uuid = new Uuid()

    expect(uuid.id).toBeDefined()
    expect(validateUuid(uuid.id)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalledTimes(1)

  })

  test('should accept a valid uuid', () => {
    const staticUuid = 'e56c5930-6f43-48d1-a0aa-86c604bc57e8'

    const uuid = new Uuid(staticUuid)

    expect(uuid.id).toBe(staticUuid)
  })
})