//
// This file is GENERATED by ast-generator
// DO NOT edit this file manually.
//
// Instead, update the `ast.grammar` file, and regenerate this file.
//
/* eslint-disable */

/**
 * Intended to augment by end users.
 *
 * See https://github.com/nvie/ast-generator/blob/main/README.md#assigning-semantics-meaning-to-nodes
 */
export interface Semantics {}

type BuiltinNodeProps = "children" | "descendants";

const DEBUG = process.env.NODE_ENV !== "production";

function assert(condition: boolean, errmsg: string): asserts condition {
  if (condition) return;
  throw new Error(errmsg);
}

const _nodes = new WeakSet();

function method<T, A extends any[]>(impl: (...args: A) => T) {
  return { enumerable: false, value: impl };
}
function getter<T>(impl: () => T) {
  return { enumerable: false, get: impl };
}

function createNode<N extends Node>(
  base: Omit<N, keyof Semantics | BuiltinNodeProps>
): N {
  const node = base as N;

  const semanticMeth = (key: SemanticMethod) =>
    method((context) => semantics[key](node, context));

  Object.defineProperties(base, {
    range: { enumerable: false },
    children: getter(() => iterChildren(node)),
    descendants: getter(() => iterDescendants(node)),

    check: semanticMeth("check"),
  });

  _nodes.add(node);
  return node;
}

export function isDefinition(value: unknown): value is Definition {
  return isNode(value) && value._kind === "ObjectTypeDefinition";
}

export function isLiveType(value: unknown): value is LiveType {
  return (
    isNode(value) &&
    (value._kind === "LiveMapType" || value._kind === "LiveListType")
  );
}

export function isNonUnionType(value: unknown): value is NonUnionType {
  return (
    isNode(value) &&
    (value._kind === "ArrayType" ||
      value._kind === "ObjectLiteralType" ||
      value._kind === "TypeRef" ||
      isScalarType(value) ||
      isLiveType(value))
  );
}

export function isScalarType(value: unknown): value is ScalarType {
  return (
    isNode(value) &&
    (value._kind === "StringType" ||
      value._kind === "NumberType" ||
      value._kind === "BooleanType" ||
      value._kind === "NullType" ||
      value._kind === "LiteralType")
  );
}

export function isType(value: unknown): value is Type {
  return (
    isNode(value) && (value._kind === "UnionType" || isNonUnionType(value))
  );
}

export type Definition = ObjectTypeDefinition;

export type LiveType = LiveMapType | LiveListType;

export type NonUnionType =
  | ScalarType
  | ArrayType
  | ObjectLiteralType
  | LiveType
  | TypeRef;

export type ScalarType =
  | StringType
  | NumberType
  | BooleanType
  | NullType
  | LiteralType;

export type Type = NonUnionType | UnionType;

export type SemanticProperty = never;
export type SemanticMethod = "check";

type UserDefinedReturnType<K extends SemanticProperty | SemanticMethod> =
  K extends keyof Semantics
    ? Semantics[K] extends (...args: any[]) => infer R
      ? R
      : Semantics[K] extends infer UP
        ? UP
        : never
    : never;

type UserDefinedContext<K extends SemanticProperty | SemanticMethod> =
  K extends keyof Semantics
    ? Semantics[K] extends (context: infer C, ...rest: any[]) => any
      ? C
      : undefined
    : never;

export interface ExhaustiveDispatchMap<T, C> {
  ArrayType(node: ArrayType, context: C): T;
  BooleanType(node: BooleanType, context: C): T;
  Document(node: Document, context: C): T;
  FieldDef(node: FieldDef, context: C): T;
  Identifier(node: Identifier, context: C): T;
  LiteralType(node: LiteralType, context: C): T;
  LiveListType(node: LiveListType, context: C): T;
  LiveMapType(node: LiveMapType, context: C): T;
  NullType(node: NullType, context: C): T;
  NumberType(node: NumberType, context: C): T;
  ObjectLiteralType(node: ObjectLiteralType, context: C): T;
  ObjectTypeDefinition(node: ObjectTypeDefinition, context: C): T;
  StringType(node: StringType, context: C): T;
  TypeName(node: TypeName, context: C): T;
  TypeRef(node: TypeRef, context: C): T;
  UnionType(node: UnionType, context: C): T;
}

type DispatchFn<T, C> = (node: Node, context: C) => T;

interface PartialDispatchMap<T, C>
  extends Partial<ExhaustiveDispatchMap<T, C>> {
  beforeEach?(node: Node, context: C): void;
  afterEach?(node: Node, context: C): void;

  Node?(node: Node, context: C): T;
}

export type PartialDispatcher<T, C> =
  | PartialDispatchMap<T, C>
  | DispatchFn<T, C>;

const NOT_IMPLEMENTED = Symbol();

const stub = (msg: string) => {
  return Object.defineProperty(
    (_node: Node, _context: any): any => {
      throw new Error(msg);
    },
    NOT_IMPLEMENTED,
    { value: NOT_IMPLEMENTED, enumerable: false }
  );
};

const mStub = (name: string) =>
  stub(
    `Semantic method '${name}' is not defined yet. Use 'defineMethod(${JSON.stringify(name)}, { ... })' before calling '.${name}()' on a node.`
  );

const semantics = {
  check: mStub("check"),
};

function dispatch<
  K extends SemanticProperty | SemanticMethod,
  N extends Node,
  R = UserDefinedReturnType<K>,
  C = UserDefinedContext<K>,
>(name: K, node: N, dispatcher: PartialDispatcher<R, C>, context: C): R {
  const handler =
    typeof dispatcher === "function"
      ? dispatcher
      : (dispatcher[node._kind] ?? dispatcher.Node);

  if (handler === undefined) {
    throw new Error(
      `Semantic '${name}' is only partially defined and missing definition for '${node._kind}'`
    );
  }

  if (typeof dispatcher !== "function") dispatcher.beforeEach?.(node, context);
  const rv = handler(node as never, context);
  if (typeof dispatcher !== "function") dispatcher.afterEach?.(node, context);
  return rv;
}

export function defineMethod<
  M extends SemanticMethod,
  R = UserDefinedReturnType<M>,
  C = UserDefinedContext<M>,
>(name: M, dispatcher: PartialDispatcher<R, C>): void {
  if (!semantics.hasOwnProperty(name)) {
    const err = new Error(
      `Unknown semantic method '${name}'. Did you forget to add 'semantic method ${name}()' in your grammar?`
    );
    Error.captureStackTrace(err, defineMethod);
    throw err;
  }

  if (!(NOT_IMPLEMENTED in semantics[name])) {
    const err = new Error(`Semantic method '${name}' is already defined`);
    Error.captureStackTrace(err, defineMethod);
    throw err;
  }

  semantics[name] = (node: Node, context: C) =>
    dispatch(name, node, dispatcher, context);
}

export function defineMethodExhaustively<
  M extends SemanticMethod,
  R = UserDefinedReturnType<M>,
  C = UserDefinedContext<M>,
>(name: M, dispatcher: ExhaustiveDispatchMap<R, C>): void {
  return defineMethod(name, dispatcher);
}

export type Node =
  | ArrayType
  | BooleanType
  | Document
  | FieldDef
  | Identifier
  | LiteralType
  | LiveListType
  | LiveMapType
  | NullType
  | NumberType
  | ObjectLiteralType
  | ObjectTypeDefinition
  | StringType
  | TypeName
  | TypeRef
  | UnionType;

export type ChildrenOf<N extends Node> = {
  ArrayType: Type;
  BooleanType: never;
  Document: Definition;
  FieldDef: Identifier | Type;
  Identifier: never;
  LiteralType: never;
  LiveListType: Type;
  LiveMapType: Type;
  NullType: never;
  NumberType: never;
  ObjectLiteralType: FieldDef;
  ObjectTypeDefinition: TypeName | FieldDef;
  StringType: never;
  TypeName: never;
  TypeRef: TypeName;
  UnionType: NonUnionType;
}[N["_kind"]];

// TODO Define this more elegantly later
export type DescendantsOf<N extends Node> =
  | ChildrenOf<N>
  | ChildrenOf<ChildrenOf<N>>
  | ChildrenOf<ChildrenOf<ChildrenOf<N>>>
  | ChildrenOf<ChildrenOf<ChildrenOf<ChildrenOf<N>>>>
  | ChildrenOf<ChildrenOf<ChildrenOf<ChildrenOf<ChildrenOf<N>>>>>
  | ChildrenOf<ChildrenOf<ChildrenOf<ChildrenOf<ChildrenOf<ChildrenOf<N>>>>>>;

export type Range = [number, number];

export function isRange(thing: unknown): thing is Range {
  return (
    Array.isArray(thing) &&
    thing.length === 2 &&
    typeof thing[0] === "number" &&
    typeof thing[1] === "number"
  );
}

function assertRange(
  range: unknown,
  currentContext: string
): asserts range is Range {
  assert(
    isRange(range),
    `Invalid value for range in "${JSON.stringify(currentContext)}".\nExpected: Range\nGot: ${JSON.stringify(range)}`
  );
}

export function isNode(value: unknown): value is Node {
  return _nodes.has(value as Node);
}

export interface ArrayType extends Semantics {
  _kind: "ArrayType";
  ofType: Type;
  range: Range;
  children: IterableIterator<ChildrenOf<ArrayType>>;
  descendants: IterableIterator<DescendantsOf<ArrayType>>;
}

export function isArrayType(value: unknown): value is ArrayType {
  return isNode(value) && value._kind === "ArrayType";
}

export interface BooleanType extends Semantics {
  _kind: "BooleanType";

  range: Range;
  children: IterableIterator<ChildrenOf<BooleanType>>;
  descendants: IterableIterator<DescendantsOf<BooleanType>>;
}

export function isBooleanType(value: unknown): value is BooleanType {
  return isNode(value) && value._kind === "BooleanType";
}

export interface Document extends Semantics {
  _kind: "Document";
  definitions: Definition[];
  range: Range;
  children: IterableIterator<ChildrenOf<Document>>;
  descendants: IterableIterator<DescendantsOf<Document>>;
}

export function isDocument(value: unknown): value is Document {
  return isNode(value) && value._kind === "Document";
}

export interface FieldDef extends Semantics {
  _kind: "FieldDef";
  name: Identifier;
  optional: boolean;
  type: Type;
  leadingComment: string | null;
  trailingComment: string | null;
  range: Range;
  children: IterableIterator<ChildrenOf<FieldDef>>;
  descendants: IterableIterator<DescendantsOf<FieldDef>>;
}

export function isFieldDef(value: unknown): value is FieldDef {
  return isNode(value) && value._kind === "FieldDef";
}

export interface Identifier extends Semantics {
  _kind: "Identifier";
  name: string;
  range: Range;
  children: IterableIterator<ChildrenOf<Identifier>>;
  descendants: IterableIterator<DescendantsOf<Identifier>>;
}

export function isIdentifier(value: unknown): value is Identifier {
  return isNode(value) && value._kind === "Identifier";
}

export interface LiteralType extends Semantics {
  _kind: "LiteralType";
  value: string | number | boolean;
  range: Range;
  children: IterableIterator<ChildrenOf<LiteralType>>;
  descendants: IterableIterator<DescendantsOf<LiteralType>>;
}

export function isLiteralType(value: unknown): value is LiteralType {
  return isNode(value) && value._kind === "LiteralType";
}

export interface LiveListType extends Semantics {
  _kind: "LiveListType";
  ofType: Type;
  range: Range;
  children: IterableIterator<ChildrenOf<LiveListType>>;
  descendants: IterableIterator<DescendantsOf<LiveListType>>;
}

export function isLiveListType(value: unknown): value is LiveListType {
  return isNode(value) && value._kind === "LiveListType";
}

export interface LiveMapType extends Semantics {
  _kind: "LiveMapType";
  keyType: Type;
  valueType: Type;
  range: Range;
  children: IterableIterator<ChildrenOf<LiveMapType>>;
  descendants: IterableIterator<DescendantsOf<LiveMapType>>;
}

export function isLiveMapType(value: unknown): value is LiveMapType {
  return isNode(value) && value._kind === "LiveMapType";
}

export interface NullType extends Semantics {
  _kind: "NullType";

  range: Range;
  children: IterableIterator<ChildrenOf<NullType>>;
  descendants: IterableIterator<DescendantsOf<NullType>>;
}

export function isNullType(value: unknown): value is NullType {
  return isNode(value) && value._kind === "NullType";
}

export interface NumberType extends Semantics {
  _kind: "NumberType";

  range: Range;
  children: IterableIterator<ChildrenOf<NumberType>>;
  descendants: IterableIterator<DescendantsOf<NumberType>>;
}

export function isNumberType(value: unknown): value is NumberType {
  return isNode(value) && value._kind === "NumberType";
}

export interface ObjectLiteralType extends Semantics {
  _kind: "ObjectLiteralType";
  fields: FieldDef[];
  range: Range;
  children: IterableIterator<ChildrenOf<ObjectLiteralType>>;
  descendants: IterableIterator<DescendantsOf<ObjectLiteralType>>;
}

export function isObjectLiteralType(
  value: unknown
): value is ObjectLiteralType {
  return isNode(value) && value._kind === "ObjectLiteralType";
}

export interface ObjectTypeDefinition extends Semantics {
  _kind: "ObjectTypeDefinition";
  name: TypeName;
  fields: FieldDef[];
  leadingComment: string | null;
  isStatic: boolean;
  range: Range;
  children: IterableIterator<ChildrenOf<ObjectTypeDefinition>>;
  descendants: IterableIterator<DescendantsOf<ObjectTypeDefinition>>;
}

export function isObjectTypeDefinition(
  value: unknown
): value is ObjectTypeDefinition {
  return isNode(value) && value._kind === "ObjectTypeDefinition";
}

export interface StringType extends Semantics {
  _kind: "StringType";

  range: Range;
  children: IterableIterator<ChildrenOf<StringType>>;
  descendants: IterableIterator<DescendantsOf<StringType>>;
}

export function isStringType(value: unknown): value is StringType {
  return isNode(value) && value._kind === "StringType";
}

export interface TypeName extends Semantics {
  _kind: "TypeName";
  name: string;
  range: Range;
  children: IterableIterator<ChildrenOf<TypeName>>;
  descendants: IterableIterator<DescendantsOf<TypeName>>;
}

export function isTypeName(value: unknown): value is TypeName {
  return isNode(value) && value._kind === "TypeName";
}

export interface TypeRef extends Semantics {
  _kind: "TypeRef";
  ref: TypeName;
  asLiveObject: boolean;
  range: Range;
  children: IterableIterator<ChildrenOf<TypeRef>>;
  descendants: IterableIterator<DescendantsOf<TypeRef>>;
}

export function isTypeRef(value: unknown): value is TypeRef {
  return isNode(value) && value._kind === "TypeRef";
}

export interface UnionType extends Semantics {
  _kind: "UnionType";
  members: NonUnionType[];
  range: Range;
  children: IterableIterator<ChildrenOf<UnionType>>;
  descendants: IterableIterator<DescendantsOf<UnionType>>;
}

export function isUnionType(value: unknown): value is UnionType {
  return isNode(value) && value._kind === "UnionType";
}

export function arrayType(ofType: Type, range: Range = [0, 0]): ArrayType {
  DEBUG &&
    (() => {
      assert(
        isType(ofType),
        `Invalid value for "ofType" arg in "ArrayType" call.\nExpected: @Type\nGot:      ${JSON.stringify(ofType)}`
      );
      assertRange(range, "ArrayType");
    })();
  return createNode({
    _kind: "ArrayType",
    ofType,
    range,
  });
}

export function booleanType(range: Range = [0, 0]): BooleanType {
  DEBUG &&
    (() => {
      assertRange(range, "BooleanType");
    })();
  return createNode({
    _kind: "BooleanType",
    range,
  });
}

export function document(
  definitions: Definition[],
  range: Range = [0, 0]
): Document {
  DEBUG &&
    (() => {
      assert(
        Array.isArray(definitions) &&
          definitions.length > 0 &&
          definitions.every((item) => isDefinition(item)),
        `Invalid value for "definitions" arg in "Document" call.\nExpected: @Definition+\nGot:      ${JSON.stringify(definitions)}`
      );
      assertRange(range, "Document");
    })();
  return createNode({
    _kind: "Document",
    definitions,
    range,
  });
}

export function fieldDef(
  name: Identifier,
  optional: boolean,
  type: Type,
  leadingComment: string | null = null,
  trailingComment: string | null = null,
  range: Range = [0, 0]
): FieldDef {
  DEBUG &&
    (() => {
      assert(
        isIdentifier(name),
        `Invalid value for "name" arg in "FieldDef" call.\nExpected: Identifier\nGot:      ${JSON.stringify(name)}`
      );
      assert(
        typeof optional === "boolean",
        `Invalid value for "optional" arg in "FieldDef" call.\nExpected: boolean\nGot:      ${JSON.stringify(optional)}`
      );
      assert(
        isType(type),
        `Invalid value for "type" arg in "FieldDef" call.\nExpected: @Type\nGot:      ${JSON.stringify(type)}`
      );
      assert(
        leadingComment === null || typeof leadingComment === "string",
        `Invalid value for "leadingComment" arg in "FieldDef" call.\nExpected: string?\nGot:      ${JSON.stringify(leadingComment)}`
      );
      assert(
        trailingComment === null || typeof trailingComment === "string",
        `Invalid value for "trailingComment" arg in "FieldDef" call.\nExpected: string?\nGot:      ${JSON.stringify(trailingComment)}`
      );
      assertRange(range, "FieldDef");
    })();
  return createNode({
    _kind: "FieldDef",
    name,
    optional,
    type,
    leadingComment,
    trailingComment,
    range,
  });
}

export function identifier(name: string, range: Range = [0, 0]): Identifier {
  DEBUG &&
    (() => {
      assert(
        typeof name === "string",
        `Invalid value for "name" arg in "Identifier" call.\nExpected: string\nGot:      ${JSON.stringify(name)}`
      );
      assertRange(range, "Identifier");
    })();
  return createNode({
    _kind: "Identifier",
    name,
    range,
  });
}

export function literalType(
  value: string | number | boolean,
  range: Range = [0, 0]
): LiteralType {
  DEBUG &&
    (() => {
      assert(
        typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean",
        `Invalid value for "value" arg in "LiteralType" call.\nExpected: string | number | boolean\nGot:      ${JSON.stringify(value)}`
      );
      assertRange(range, "LiteralType");
    })();
  return createNode({
    _kind: "LiteralType",
    value,
    range,
  });
}

export function liveListType(
  ofType: Type,
  range: Range = [0, 0]
): LiveListType {
  DEBUG &&
    (() => {
      assert(
        isType(ofType),
        `Invalid value for "ofType" arg in "LiveListType" call.\nExpected: @Type\nGot:      ${JSON.stringify(ofType)}`
      );
      assertRange(range, "LiveListType");
    })();
  return createNode({
    _kind: "LiveListType",
    ofType,
    range,
  });
}

export function liveMapType(
  keyType: Type,
  valueType: Type,
  range: Range = [0, 0]
): LiveMapType {
  DEBUG &&
    (() => {
      assert(
        isType(keyType),
        `Invalid value for "keyType" arg in "LiveMapType" call.\nExpected: @Type\nGot:      ${JSON.stringify(keyType)}`
      );
      assert(
        isType(valueType),
        `Invalid value for "valueType" arg in "LiveMapType" call.\nExpected: @Type\nGot:      ${JSON.stringify(valueType)}`
      );
      assertRange(range, "LiveMapType");
    })();
  return createNode({
    _kind: "LiveMapType",
    keyType,
    valueType,
    range,
  });
}

export function nullType(range: Range = [0, 0]): NullType {
  DEBUG &&
    (() => {
      assertRange(range, "NullType");
    })();
  return createNode({
    _kind: "NullType",
    range,
  });
}

export function numberType(range: Range = [0, 0]): NumberType {
  DEBUG &&
    (() => {
      assertRange(range, "NumberType");
    })();
  return createNode({
    _kind: "NumberType",
    range,
  });
}

export function objectLiteralType(
  fields: FieldDef[] = [],
  range: Range = [0, 0]
): ObjectLiteralType {
  DEBUG &&
    (() => {
      assert(
        Array.isArray(fields) && fields.every((item) => isFieldDef(item)),
        `Invalid value for "fields" arg in "ObjectLiteralType" call.\nExpected: FieldDef*\nGot:      ${JSON.stringify(fields)}`
      );
      assertRange(range, "ObjectLiteralType");
    })();
  return createNode({
    _kind: "ObjectLiteralType",
    fields,
    range,
  });
}

export function objectTypeDefinition(
  name: TypeName,
  fields: FieldDef[],
  leadingComment: string | null,
  isStatic: boolean,
  range: Range = [0, 0]
): ObjectTypeDefinition {
  DEBUG &&
    (() => {
      assert(
        isTypeName(name),
        `Invalid value for "name" arg in "ObjectTypeDefinition" call.\nExpected: TypeName\nGot:      ${JSON.stringify(name)}`
      );
      assert(
        Array.isArray(fields) && fields.every((item) => isFieldDef(item)),
        `Invalid value for "fields" arg in "ObjectTypeDefinition" call.\nExpected: FieldDef*\nGot:      ${JSON.stringify(fields)}`
      );
      assert(
        leadingComment === null || typeof leadingComment === "string",
        `Invalid value for "leadingComment" arg in "ObjectTypeDefinition" call.\nExpected: string?\nGot:      ${JSON.stringify(leadingComment)}`
      );
      assert(
        typeof isStatic === "boolean",
        `Invalid value for "isStatic" arg in "ObjectTypeDefinition" call.\nExpected: boolean\nGot:      ${JSON.stringify(isStatic)}`
      );
      assertRange(range, "ObjectTypeDefinition");
    })();
  return createNode({
    _kind: "ObjectTypeDefinition",
    name,
    fields,
    leadingComment,
    isStatic,
    range,
  });
}

export function stringType(range: Range = [0, 0]): StringType {
  DEBUG &&
    (() => {
      assertRange(range, "StringType");
    })();
  return createNode({
    _kind: "StringType",
    range,
  });
}

export function typeName(name: string, range: Range = [0, 0]): TypeName {
  DEBUG &&
    (() => {
      assert(
        typeof name === "string",
        `Invalid value for "name" arg in "TypeName" call.\nExpected: string\nGot:      ${JSON.stringify(name)}`
      );
      assertRange(range, "TypeName");
    })();
  return createNode({
    _kind: "TypeName",
    name,
    range,
  });
}

export function typeRef(
  ref: TypeName,
  asLiveObject: boolean,
  range: Range = [0, 0]
): TypeRef {
  DEBUG &&
    (() => {
      assert(
        isTypeName(ref),
        `Invalid value for "ref" arg in "TypeRef" call.\nExpected: TypeName\nGot:      ${JSON.stringify(ref)}`
      );
      assert(
        typeof asLiveObject === "boolean",
        `Invalid value for "asLiveObject" arg in "TypeRef" call.\nExpected: boolean\nGot:      ${JSON.stringify(asLiveObject)}`
      );
      assertRange(range, "TypeRef");
    })();
  return createNode({
    _kind: "TypeRef",
    ref,
    asLiveObject,
    range,
  });
}

export function unionType(
  members: NonUnionType[],
  range: Range = [0, 0]
): UnionType {
  DEBUG &&
    (() => {
      assert(
        Array.isArray(members) &&
          members.length > 0 &&
          members.every((item) => isNonUnionType(item)),
        `Invalid value for "members" arg in "UnionType" call.\nExpected: @NonUnionType+\nGot:      ${JSON.stringify(members)}`
      );
      assertRange(range, "UnionType");
    })();
  return createNode({
    _kind: "UnionType",
    members,
    range,
  });
}

function* iterChildren<N extends Node>(
  node: N
): IterableIterator<ChildrenOf<N>> {
  switch (node._kind) {
    case "ArrayType":
      yield node.ofType as ChildrenOf<N>;
      break;

    case "Document":
      for (const child of node.definitions) {
        yield child as ChildrenOf<N>;
      }
      break;

    case "FieldDef":
      yield node.name as ChildrenOf<N>;
      yield node.type as ChildrenOf<N>;
      break;

    case "LiveListType":
      yield node.ofType as ChildrenOf<N>;
      break;

    case "LiveMapType":
      yield node.keyType as ChildrenOf<N>;
      yield node.valueType as ChildrenOf<N>;
      break;

    case "ObjectLiteralType":
      for (const child of node.fields) {
        yield child as ChildrenOf<N>;
      }
      break;

    case "ObjectTypeDefinition":
      yield node.name as ChildrenOf<N>;
      for (const child of node.fields) {
        yield child as ChildrenOf<N>;
      }
      break;

    case "TypeRef":
      yield node.ref as ChildrenOf<N>;
      break;

    case "UnionType":
      for (const child of node.members) {
        yield child as ChildrenOf<N>;
      }
      break;
  }
}

function* iterDescendants<N extends Node>(
  node: N
): IterableIterator<DescendantsOf<N>> {
  // Perform breadth-first traversal, not depth-first
  const queue: Node[] = [node];
  while (true) {
    const current = queue.shift();
    if (current === undefined) break; // Done

    yield current as DescendantsOf<N>;
    for (const child of iterChildren(current)) {
      queue.push(child);
    }
  }
}
