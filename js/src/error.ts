type Left<E> = {
  kind: "left";
  value: E;
};

type Right<T> = {
  kind: "right";
  value: T;
};

type EitherValue<T, E> = Left<E> | Right<T>;

export class Either<T, E> {
  private value: EitherValue<T, E>;
  private constructor(v: EitherValue<T, E>) {
    this.value = v;
  }

  static succeed<T>(v: T) {
    return new Either<T, never>({ kind: "right", value: v });
  }

  static fail<Error>(err: Error) {
    return new Either<never, Error>({ kind: "left", value: err });
  }

  bind<Q>(f: (val: T) => Either<Q, E>): Either<Q, E> {
    if (this.value.kind === "left") {
      return new Either<Q, E>(this.value);
    } else {
      return f(this.value.value);
    }
  }

  bindError<Q>(f: (err: E) => Either<T, Q>): Either<T, Q> {
    if (this.value.kind === "right") {
      return new Either<T, Q>(this.value);
    } else {
      return f(this.value.value);
    }
  }

  mapError<Q>(f: (err: E) => Q): Either<T, Q> {
    if (this.value.kind === "right") {
      return new Either<T, Q>(this.value);
    } else {
      return Either.fail(f(this.value.value));
    }
  }

  onSuccess(f: (val: T) => void): this {
    if (this.value.kind === "right") {
      f(this.value.value);
    }

    return this;
  }

  onError(f: (err: E) => void): this {
    if (this.value.kind === "left") {
      f(this.value.value);
    }

    return this;
  }

  isError(): boolean {
    return this.value.kind === "left";
  }

  getError(): E {
    if (!this.isError()) throw new Error("Value wasn't error.");
    return this.value.value as E;
  }

  getValue(): T {
    if (this.isError()) throw new Error("Value was error.");
    return this.value.value as T;
  }

  unwrap(): T | E {
    return this.value.value;
  }

  toString(): string {
    const dir = this.value.kind === "left" ? "Left" : "Right";

    return `${dir}(${this.unwrap()})`;
  }
}
