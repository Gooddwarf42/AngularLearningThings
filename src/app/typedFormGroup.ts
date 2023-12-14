import { FormControl, FormGroup } from "@angular/forms";

export type TypedFormGroup<T> = FormGroup<TypedFormProperties<T>>

export type TypedFormProperties<T> = {
  [K in keyof T]: FormControl<T[K]>;
}

export function nameOf<T>(key: keyof T): string {
  return key as string;
}

export function nameOfFigo<T>(): { [K in keyof T as K & string]: K } {
  return new Proxy(
    {},
    {
      get(target, property: keyof T & string, receiver): string {
        return property;
      }
    }
  ) as { [K in keyof T as K & string]: K };
}
