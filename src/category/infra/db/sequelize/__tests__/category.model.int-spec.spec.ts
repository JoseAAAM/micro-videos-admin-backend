import { DataType, Sequelize } from "sequelize-typescript"
import { CategoryModel } from "../category.model"

describe("CategoryModel Integration Test", () => {
  let sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory",
      models: [CategoryModel],
      logging: false,
    })

    await sequelize.sync({ force: true })
  })

  it("mapping props", async () => {
    const attributesMap = CategoryModel.getAttributes()
    const attributes = Object.keys(CategoryModel.getAttributes())

    expect(attributes).toStrictEqual([
      "category_id",
      "name",
      "description",
      "is_active",
      "created_at"
    ])

    const categoryIdAttr = attributesMap.category_id
    expect(categoryIdAttr).toMatchObject({
      field: "category_id",
      fieldName: "category_id",
      primaryKey: true,
      type: DataType.UUID(),
    })

    const nameAttr = attributesMap.name
    expect(nameAttr).toMatchObject({
      field: "name",
      fieldName: "name",
      type: DataType.STRING(255),
      allowNull: false
    })

    const descriptionAttr = attributesMap.description
    expect(descriptionAttr).toMatchObject({
      field: "description",
      fieldName: "description",
      type: DataType.TEXT(),
      allowNull: true
    })

    const isActiveAttr = attributesMap.is_active
    expect(isActiveAttr).toMatchObject({
      field: "is_active",
      fieldName: "is_active",
      type: DataType.BOOLEAN(),
      allowNull: false
    })

    const createdAtAtt = attributesMap.created_at
    expect(createdAtAtt).toMatchObject({
      field: "created_at",
      fieldName: "created_at",
      type: DataType.DATE(3),
      allowNull: false
    })
  })

  it("create", async () => {
    const arrange = {
      category_id: 'e6cbb29e-094a-4d97-8779-8c2eb529f3a8',
      name: "test",
      is_active: true,
      created_at: new Date(),
    }

    const category = await CategoryModel.create(arrange)
    expect(category.toJSON()).toStrictEqual(arrange)
  })
})