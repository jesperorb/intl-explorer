/**
 * Makes every property of an object optional, even nested properties.
 */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends Readonly<infer U>[]
    ? Readonly<DeepPartial<U>>[]
    : DeepPartial<T[P]>;
};

/**
 * Ensures that the consumer can override any prop of the model
 * and that the return type of the factory matches the type
 * of the stub.
 * @example
 * ```
 * type Person = { firstName: string, lastName: string };
 * export const person: Factory<Person> = (overrides = {}) => ({
 *    firstName: "A default first name",
 *    lastName: "A default last name",
 *    // Any overrides from consumer
 *    ...overrides
 * })
 * ```
 */
export type Factory<Model> = (props?: DeepPartial<Model>) => Model;