import { Uuid } from "../../../shared/domain/value-objects/uuid.vo"
import { Category } from "../category.entity"

describe('Category Unit Test', () => {
  let validateSpy: any

  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate")
  })

  describe('constructor', () => {
    test('should create a category with default values', () => {
      const category = new Category({
        name: "Movie"
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBeTruthy()
      expect(category.created_at).toBeInstanceOf(Date)
    })

    test("should create a category with all values", () => {
      const created_at = new Date()

      const category = new Category({
        name: 'Movie',
        description: "Movie description",
        is_active: false,
        created_at,
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.is_active).toBeFalsy()
      expect(category.created_at).toBe(created_at)
    })

    test("should create a category with name and description", () => {
      const category = new Category({
        name: 'Movie',
        description: "Movie description",
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.is_active).toBeTruthy()
      expect(category.created_at).toBeInstanceOf(Date)
    })
  })

  describe('category_id field', () => {
    const arrange = [
      {
        category_id: null
      },
      {
        category_id: undefined
      },
      {
        category_id: new Uuid()
      }
    ]

    test.each(arrange)('id = %j', ({ category_id }) => {
      const category = new Category({
        name: "Movie",
        category_id: category_id as any
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id)
      }
    })
  })

  describe('create command', () => {
    test('should create a category complete', () => {
      const category = Category.create({
        name: "Movie",
        description: "Movie description",
        is_active: false,
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.is_active).toBeFalsy()
      expect(category.created_at).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    test('should create a category only with name', () => {
      const category = Category.create({
        name: "Movie",
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBeTruthy()
      expect(category.created_at).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
  })

  test('should activate a category', () => {
    const category = new Category({
      name: "Movie",
      is_active: false,
    })

    category.activate()

    expect(category.is_active).toBeTruthy()
  })

  test('should deactivate a category', () => {
    const category = new Category({
      name: "Movie",
      is_active: true,
    })

    category.deactivate()

    expect(category.is_active).toBeFalsy()
  })

  test('should change category name', () => {
    const category = Category.create({
      name: "Movie",
    })

    category.changeName('Books')

    expect(category.name).toBe('Books')
    expect(validateSpy).toHaveBeenCalledTimes(2)
  })

  test('should change category description', () => {
    const category = Category.create({
      name: "Movie",
      description: 'Movie description'
    })

    category.changeDescription('Books description')

    expect(category.description).toBe('Books description')
    expect(validateSpy).toHaveBeenCalledTimes(2)
  })

  test('should return category json', () => {
    const category = new Category({
      name: 'Movie',
      description: "Movie description",
      is_active: false,
      created_at: new Date(),
    })

    expect(category.toJSON()).toHaveProperty("name")
    expect(category.toJSON()).toHaveProperty("description")
    expect(category.toJSON()).toHaveProperty("is_active")
    expect(category.toJSON()).toHaveProperty("created_at")
    expect(category.toJSON()).toHaveProperty("category_id")
  })
})