/* eslint-disable @typescript-eslint/no-explicit-any */
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

// https://stackoverflow.com/questions/55127004/how-to-transform-union-type-to-tuple-type
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
	? I
	: never;

type LastOf<T> =
	UnionToIntersection<T extends any ? () => T : never> extends () => infer R ? R : never;

type Push<T extends any[], V> = [...T, V];

type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N
	? []
	: Push<TuplifyUnion<Exclude<T, L>>, L>;

export type Tuple<T, A extends T[] = []> = TuplifyUnion<T>["length"] extends A["length"]
	? [...A]
	: Tuple<T, [T, ...A]>;

export type CreateOptions<Value, Key extends keyof Value = keyof Value> = {
	[key in Key]: Tuple<Value[key]>;
};

export type StringOrUndefinedTuple = [string | undefined, string | undefined]
export type NumberOrUndefinedTuple = [number | undefined, number | undefined]
