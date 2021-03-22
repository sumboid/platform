//
// Copyright © 2020, 2021 Anticrm Platform Contributors.
//
// Licensed under the Eclipse Public License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may
// obtain a copy of the License at https://www.eclipse.org/legal/epl-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//

import { BagOf$, Class$, InstanceOf$, Mixin$, Prop, RefTo$ } from '../dsl'
import core from '../index'
import {
  AllAttributes,
  ArrayOf,
  Attribute,
  Class,
  Classifier,
  ClassifierKind,
  Doc,
  Emb,
  Indices,
  Mixin,
  MODEL_DOMAIN,
  Obj,
  PropertyType,
  Ref,
  RefTo,
  StringProperty,
  Type
} from '@anticrm/core'

@Class$(core.class.Obj, core.class.Obj)
export class TObj implements Obj {
  _class!: Ref<Class<Obj>>
}

@Class$(core.class.Emb, core.class.Obj)
export class TEmb extends TObj implements Emb {
  __embedded!: true
}

@Class$(core.class.Doc, core.class.Obj)
export class TDoc extends TObj implements Doc {
  _class!: Ref<Class<Doc>>
  @Prop() _id!: Ref<Doc>
  @Prop() _mixins?: Ref<Mixin<Doc>>[]
}

@Class$(core.class.Attribute, core.class.Emb, MODEL_DOMAIN)
export class TAttribute extends TEmb implements Attribute {
  @Prop() type!: Type
}

@Class$(core.class.Type, core.class.Emb, MODEL_DOMAIN)
export class TType extends TEmb implements Type {
  @Prop() _default!: PropertyType
}

@Class$(core.class.Classifier, core.class.Doc, MODEL_DOMAIN)
export class TClassifier<T extends Obj> extends TDoc implements Classifier<T> {
  @Prop() _kind!: ClassifierKind

  @BagOf$()
  @InstanceOf$(core.class.Emb)
  _attributes!: AllAttributes<T, Obj>

  @RefTo$(core.class.Class) _extends?: Ref<Classifier<Doc>>
}

@Class$(core.class.Class, core.class.Classifier, MODEL_DOMAIN)
export class TClass<T extends Obj> extends TClassifier<T> implements Class<T> {
  @Prop() _native?: StringProperty
  @Prop() _domain?: StringProperty
}

@Class$(core.class.Mixin, core.class.Class, MODEL_DOMAIN)
export class TMixin<T extends Obj> extends TClass<T> implements Mixin<T> {}

@Class$(core.class.RefTo, core.class.Type, MODEL_DOMAIN)
export class TRefTo extends TType implements RefTo<Doc> {
  @Prop() to!: Ref<Class<Doc>>
}

@Class$(core.class.ArrayOf, core.class.Type, MODEL_DOMAIN)
export class TArrayOf extends TType implements ArrayOf {
  @Prop() of!: Type
}

@Mixin$(core.mixin.Indices, core.class.Mixin)
export class TIndexesClass<T extends Doc> extends TMixin<T> implements Indices {
  @Prop() primary!: StringProperty
}
