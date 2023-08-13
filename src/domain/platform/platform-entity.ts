export class Platform {
  constructor(
    readonly id: string,
    readonly icon: string,
    readonly title: string,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}
}
