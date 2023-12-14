import { FormControl, FormGroup } from "@angular/forms";

export type TypedFormGroup<T> = FormGroup<TypedFormProperties<T>>

export type TypedFormProperties<T> = {
  [K in keyof T]: FormControl<T[K]>;
}
